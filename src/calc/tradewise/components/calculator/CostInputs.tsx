import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CostBreakdown, Incoterm } from '@/types/calculator';
import { Calculator, AlertTriangle, TrendingUp } from 'lucide-react';

interface CostInputsProps {
  costs: CostBreakdown;
  selectedIncoterm: Incoterm | null;
  onUpdate: (costs: CostBreakdown) => void;
}

const CostInputs: React.FC<CostInputsProps> = ({ costs, selectedIncoterm, onUpdate }) => {
  const [includeInsurance, setIncludeInsurance] = React.useState(false);
  const [autoCalculate, setAutoCalculate] = React.useState(true);

  const handleInputChange = (field: keyof CostBreakdown, value: number) => {
    onUpdate({
      ...costs,
      [field]: value
    });
  };

  const calculateSubtotal = () => {
    return costs.manufacturing + costs.packaging + costs.loading + 
           costs.freight + costs.insurance + costs.customs + costs.delivery;
  };

  const calculateFinalPrice = () => {
    const subtotal = calculateSubtotal();
    return subtotal * (1 + costs.markup / 100);
  };

  // Auto-suggest costs based on Incoterm
  useEffect(() => {
    if (autoCalculate && selectedIncoterm && costs.manufacturing > 0) {
      const baseCost = costs.manufacturing;
      const suggestions: Partial<CostBreakdown> = {};

      switch (selectedIncoterm.code) {
        case 'EXW':
          suggestions.packaging = baseCost * 0.02;
          suggestions.loading = 0;
          suggestions.freight = 0;
          suggestions.insurance = 0;
          suggestions.customs = 0;
          suggestions.delivery = 0;
          break;
        case 'FCA':
          suggestions.packaging = baseCost * 0.02;
          suggestions.loading = baseCost * 0.01;
          suggestions.freight = 0;
          suggestions.insurance = 0;
          suggestions.customs = baseCost * 0.005;
          suggestions.delivery = 0;
          break;
        case 'FOB':
          suggestions.packaging = baseCost * 0.02;
          suggestions.loading = baseCost * 0.015;
          suggestions.freight = 0;
          suggestions.insurance = 0;
          suggestions.customs = baseCost * 0.005;
          suggestions.delivery = baseCost * 0.01;
          break;
        case 'CIF':
          suggestions.packaging = baseCost * 0.02;
          suggestions.loading = baseCost * 0.015;
          suggestions.freight = baseCost * 0.08;
          suggestions.insurance = baseCost * 0.005;
          suggestions.customs = baseCost * 0.005;
          suggestions.delivery = baseCost * 0.01;
          break;
        case 'DDP':
          suggestions.packaging = baseCost * 0.02;
          suggestions.loading = baseCost * 0.015;
          suggestions.freight = baseCost * 0.08;
          suggestions.insurance = baseCost * 0.005;
          suggestions.customs = baseCost * 0.02;
          suggestions.delivery = baseCost * 0.03;
          break;
        default:
          suggestions.packaging = baseCost * 0.02;
          suggestions.loading = baseCost * 0.01;
          suggestions.freight = baseCost * 0.06;
          suggestions.insurance = baseCost * 0.003;
          suggestions.customs = baseCost * 0.01;
          suggestions.delivery = baseCost * 0.02;
      }

      onUpdate({
        ...costs,
        ...suggestions
      });
    }
  }, [autoCalculate, selectedIncoterm, costs.manufacturing]);

  const getCostCategory = (field: keyof CostBreakdown): 'seller' | 'buyer' | 'variable' => {
    if (!selectedIncoterm) return 'variable';
    
    const sellerCosts = selectedIncoterm.costIncludes.join(' ').toLowerCase();
    
    switch (field) {
      case 'manufacturing':
      case 'packaging':
        return 'seller';
      case 'loading':
        return sellerCosts.includes('loading') || selectedIncoterm.code !== 'EXW' ? 'seller' : 'buyer';
      case 'freight':
        return sellerCosts.includes('freight') || sellerCosts.includes('carriage') ? 'seller' : 'buyer';
      case 'insurance':
        return sellerCosts.includes('insurance') ? 'seller' : 'buyer';
      case 'customs':
        return selectedIncoterm.code === 'DDP' ? 'seller' : 'buyer';
      case 'delivery':
        return selectedIncoterm.code === 'DDP' || selectedIncoterm.code === 'DAP' ? 'seller' : 'buyer';
      default:
        return 'variable';
    }
  };

  const costFields = [
    { key: 'manufacturing' as keyof CostBreakdown, label: 'Manufacturing Cost', required: true },
    { key: 'packaging' as keyof CostBreakdown, label: 'Packaging & Labeling' },
    { key: 'loading' as keyof CostBreakdown, label: 'Loading/Handling' },
    { key: 'freight' as keyof CostBreakdown, label: 'Freight/Transport' },
    { key: 'insurance' as keyof CostBreakdown, label: 'Insurance' },
    { key: 'customs' as keyof CostBreakdown, label: 'Customs/Duties' },
    { key: 'delivery' as keyof CostBreakdown, label: 'Final Delivery' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Cost Breakdown
        </h2>
        <p className="text-gray-600">
          Enter all costs associated with your {selectedIncoterm?.code} shipment
        </p>
      </div>

      {/* Controls */}
      <Card className="bg-primary-50 border-primary-200">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Switch
                checked={autoCalculate}
                onCheckedChange={setAutoCalculate}
                id="auto-calculate"
              />
              <Label htmlFor="auto-calculate" className="text-sm font-medium">
                Auto-suggest costs based on {selectedIncoterm?.code}
              </Label>
            </div>
            {selectedIncoterm && (
              <Badge variant="secondary">
                {selectedIncoterm.code} - {selectedIncoterm.name}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Cost Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>Direct Costs</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {costFields.map((field) => {
              const category = getCostCategory(field.key);
              return (
                <div key={field.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={field.key} className="text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-primary-500 ml-1">*</span>}
                    </Label>
                    <Badge 
                      variant={category === 'seller' ? 'default' : category === 'buyer' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {category === 'seller' ? 'Seller' : category === 'buyer' ? 'Buyer' : 'Variable'}
                    </Badge>
                  </div>
                  <Input
                    id={field.key}
                    type="number"
                    value={costs[field.key] || ''}
                    onChange={(e) => handleInputChange(field.key, parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Pricing Strategy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Pricing Strategy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Markup Percentage</Label>
                <span className="text-sm font-semibold text-primary-600">{costs.markup}%</span>
              </div>
              <Slider
                value={[costs.markup]}
                onValueChange={(value) => handleInputChange('markup', value[0])}
                max={100}
                min={0}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Cost Summary */}
            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-semibold text-gray-900">Cost Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Markup ({costs.markup}%):</span>
                  <span className="font-medium">${(calculateSubtotal() * costs.markup / 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Final Price:</span>
                  <span className="text-primary-600">${calculateFinalPrice().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warnings */}
      {selectedIncoterm && (
        <Card className="border-primary-200 bg-primary-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary-900">
              <AlertTriangle className="h-5 w-5" />
              <span>Cost Allocation Notes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-primary-900 mb-2">Seller Pays:</h4>
                <ul className="space-y-1">
                  {selectedIncoterm.sellerResponsibility.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-primary-800">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary-900 mb-2">Buyer Pays:</h4>
                <ul className="space-y-1">
                  {selectedIncoterm.buyerResponsibility.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-primary-800">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CostInputs;
