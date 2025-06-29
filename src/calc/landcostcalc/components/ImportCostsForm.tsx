import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Receipt, Building, Truck, Warehouse, Package } from 'lucide-react';

interface ImportCostsFormProps {
  data: {
    importDuties: number;
    dutiesType: string;
    vatGst: number;
    vatGstType: string;
    vatReclaimable: boolean;
    customsBrokerFees: number;
    localHandling: number;
    inlandFreightDestination: number;
    warehousing: number;
  };
  onUpdate: (data: any) => void;
}

const ImportCostsForm: React.FC<ImportCostsFormProps> = ({ data, onUpdate }) => {
  const handleChange = (field: string, value: string | number | boolean) => {
    onUpdate({ [field]: value });
  };

  const handleNumberChange = (field: string, value: string) => {
    // Remove leading zeros and convert to number
    const cleanValue = value.replace(/^0+/, '') || '0';
    const numValue = parseFloat(cleanValue) || 0;
    onUpdate({ [field]: numValue });
  };

  return (
    <div className="space-y-6">
      {/* Import Duties & Tariffs */}
      <Card className="bg-primary-50 border-primary-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg text-primary-600">
            <Globe className="h-5 w-5 mr-2" />
            Import Duties & Tariffs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="dutiesType" className="text-sm text-primary-600">
              Duty Calculation Method
            </Label>
            <Select 
              value={data.dutiesType} 
              onValueChange={(value) => handleChange('dutiesType', value)}
            >
              <SelectTrigger className="mt-2 bg-white border-primary-200 focus:border-primary-400">
                <SelectValue placeholder="Select duty type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage Rate</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="importDuties" className="text-sm text-primary-600">
              {data.dutiesType === 'percentage' ? 'Duty Rate (%)' : 'Duty Amount'}
            </Label>
            <Input
              id="importDuties"
              type="number"
              step="0.01"
              min="0"
              placeholder={data.dutiesType === 'percentage' ? "e.g., 12.5" : "e.g., 500.00"}
              value={data.importDuties || ''}
              onChange={(e) => handleNumberChange('importDuties', e.target.value)}
              className="mt-2 bg-white border-primary-200 focus:border-primary-400"
            />
            <p className="text-xs text-primary-600 mt-1">
              Check with customs or use HS code lookup for accurate rates
            </p>
          </div>
        </CardContent>
      </Card>

      {/* VAT/GST */}
      <Card className="bg-primary-50 border-primary-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg text-primary-600">
            <Receipt className="h-5 w-5 mr-2" />
            VAT / GST
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="vatGstType" className="text-sm text-primary-600">
              VAT/GST Calculation Method
            </Label>
            <Select 
              value={data.vatGstType} 
              onValueChange={(value) => handleChange('vatGstType', value)}
            >
              <SelectTrigger className="mt-2 bg-white border-primary-200 focus:border-primary-400">
                <SelectValue placeholder="Select VAT/GST type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage Rate</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="vatGst" className="text-sm text-primary-600">
              {data.vatGstType === 'percentage' ? 'VAT/GST Rate (%)' : 'VAT/GST Amount'}
            </Label>
            <Input
              id="vatGst"
              type="number"
              step="0.01"
              min="0"
              placeholder={data.vatGstType === 'percentage' ? "e.g., 20.0" : "e.g., 300.00"}
              value={data.vatGst || ''}
              onChange={(e) => handleNumberChange('vatGst', e.target.value)}
              className="mt-2 bg-white border-primary-200 focus:border-primary-400"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="vatReclaimable"
              checked={data.vatReclaimable}
              onCheckedChange={(checked) => handleChange('vatReclaimable', checked)}
              className="border-primary-300"
            />
            <Label htmlFor="vatReclaimable" className="text-sm text-primary-600">
              VAT/GST is reclaimable (reduces effective cost)
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Service Fees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary-50 border-primary-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg text-primary-600">
              <Building className="h-5 w-5 mr-2" />
              Customs Broker Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="customsBrokerFees" className="text-sm text-primary-600">
              Brokerage & Documentation
            </Label>
            <Input
              id="customsBrokerFees"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 125.00"
              value={data.customsBrokerFees || ''}
              onChange={(e) => handleNumberChange('customsBrokerFees', e.target.value)}
              className="mt-2 bg-white border-primary-200 focus:border-primary-400"
            />
            <p className="text-xs text-primary-600 mt-1">
              Customs clearance and documentation fees
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary-50 border-primary-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg text-primary-600">
              <Package className="h-5 w-5 mr-2" />
              Local Handling
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="localHandling" className="text-sm text-primary-600">
              Port/Airport Handling
            </Label>
            <Input
              id="localHandling"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 85.00"
              value={data.localHandling || ''}
              onChange={(e) => handleNumberChange('localHandling', e.target.value)}
              className="mt-2 bg-white border-primary-200 focus:border-primary-400"
            />
            <p className="text-xs text-primary-600 mt-1">
              Terminal handling, container fees
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary-50 border-primary-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg text-primary-600">
              <Truck className="h-5 w-5 mr-2" />
              Inland Freight (Destination)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="inlandFreightDestination" className="text-sm text-primary-600">
              Port to Final Destination
            </Label>
            <Input
              id="inlandFreightDestination"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 200.00"
              value={data.inlandFreightDestination || ''}
              onChange={(e) => handleNumberChange('inlandFreightDestination', e.target.value)}
              className="mt-2 bg-white border-primary-200 focus:border-primary-400"
            />
            <p className="text-xs text-primary-600 mt-1">
              Final mile delivery to your facility
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary-50 border-primary-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg text-primary-600">
              <Warehouse className="h-5 w-5 mr-2" />
              Warehousing & Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="warehousing" className="text-sm text-primary-600">
              Storage & Distribution
            </Label>
            <Input
              id="warehousing"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 150.00"
              value={data.warehousing || ''}
              onChange={(e) => handleNumberChange('warehousing', e.target.value)}
              className="mt-2 bg-white border-primary-200 focus:border-primary-400"
            />
            <p className="text-xs text-primary-600 mt-1">
              Temporary storage, handling, distribution
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Import Costs Summary */}
      <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-primary-600 mb-2">📊 Import Costs Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-primary-600">Import Duties:</span>
              <span className="float-right font-medium">${data.importDuties.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-primary-600">VAT/GST:</span>
              <span className="float-right font-medium">${data.vatGst.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-primary-600">Broker Fees:</span>
              <span className="float-right font-medium">${data.customsBrokerFees.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-primary-600">Local Handling:</span>
              <span className="float-right font-medium">${data.localHandling.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-primary-600">Inland Freight:</span>
              <span className="float-right font-medium">${data.inlandFreightDestination.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-primary-600">Warehousing:</span>
              <span className="float-right font-medium">${data.warehousing.toFixed(2)}</span>
            </div>
            <div className="col-span-2 border-t pt-2">
              <span className="text-primary-600 font-semibold">Total Import Costs:</span>
              <span className="float-right font-bold text-lg">
                ${(data.importDuties + data.vatGst + data.customsBrokerFees + data.localHandling + data.inlandFreightDestination + data.warehousing).toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportCostsForm;
