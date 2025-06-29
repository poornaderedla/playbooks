import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Ship, Plane, Shield, Package } from 'lucide-react';

interface OriginCostsFormProps {
  data: {
    inlandFreight: number;
    exportHandling: number;
    internationalFreight: number;
    insurance: number;
    insuranceType: string;
  };
  onUpdate: (data: any) => void;
}

const OriginCostsForm: React.FC<OriginCostsFormProps> = ({ data, onUpdate }) => {
  const handleChange = (field: string, value: string | number) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary-50 border-primary-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg text-primary-600">
              <Truck className="h-5 w-5 mr-2" />
              Inland Freight (Origin)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="inlandFreight" className="text-sm text-primary-600">
              Factory to Port/Airport
            </Label>
            <Input
              id="inlandFreight"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 150.00"
              value={data.inlandFreight || ''}
              onChange={(e) => handleNumberChange('inlandFreight', e.target.value)}
              className="mt-2 bg-white border-primary-200 focus:border-primary-400"
            />
            <p className="text-xs text-primary-600 mt-1">
              Trucking from factory to export terminal
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary-50 border-primary-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg text-primary-600">
              <Package className="h-5 w-5 mr-2" />
              Export Handling
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="exportHandling" className="text-sm text-primary-600">
              Port/Airport Charges
            </Label>
            <Input
              id="exportHandling"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 75.00"
              value={data.exportHandling || ''}
              onChange={(e) => handleNumberChange('exportHandling', e.target.value)}
              className="mt-2 bg-white border-primary-200 focus:border-primary-400"
            />
            <p className="text-xs text-primary-600 mt-1">
              Terminal handling, documentation fees
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-primary-50 border-primary-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg text-primary-600">
            <div className="flex space-x-1 mr-2">
              <Ship className="h-5 w-5" />
              <Plane className="h-4 w-4" />
            </div>
            International Freight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="internationalFreight" className="text-sm text-primary-600">
            Ocean/Air Freight Cost
          </Label>
          <Input
            id="internationalFreight"
            type="number"
            step="0.01"
            min="0"
            placeholder="e.g., 850.00"
            value={data.internationalFreight || ''}
            onChange={(e) => handleNumberChange('internationalFreight', e.target.value)}
            className="mt-2 bg-white border-primary-200 focus:border-primary-400"
          />
          <p className="text-xs text-primary-600 mt-1">
            Main transport from origin to destination port
          </p>
        </CardContent>
      </Card>

      <Card className="bg-primary-50 border-primary-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg text-primary-600">
            <Shield className="h-5 w-5 mr-2" />
            Cargo Insurance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="insuranceType" className="text-sm text-primary-600">
              Insurance Type
            </Label>
            <Select 
              value={data.insuranceType} 
              onValueChange={(value) => handleChange('insuranceType', value)}
            >
              <SelectTrigger className="mt-2 bg-white border-primary-200 focus:border-primary-400">
                <SelectValue placeholder="Select insurance type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage of Cargo Value</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="insurance" className="text-sm text-primary-600">
              {data.insuranceType === 'percentage' ? 'Insurance Rate (%)' : 'Insurance Amount'}
            </Label>
            <Input
              id="insurance"
              type="number"
              step="0.01"
              min="0"
              placeholder={data.insuranceType === 'percentage' ? "e.g., 0.5" : "e.g., 125.00"}
              value={data.insurance || ''}
              onChange={(e) => handleNumberChange('insurance', e.target.value)}
              className="mt-2 bg-white border-primary-200 focus:border-primary-400"
            />
            <p className="text-xs text-primary-600 mt-1">
              {data.insuranceType === 'percentage' 
                ? 'Typically 0.1% - 0.5% of cargo value'
                : 'Fixed insurance premium amount'
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Origin Costs Summary */}
      <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-primary-600 mb-2">📊 Origin Costs Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-primary-600">Inland Freight:</span>
              <span className="float-right font-medium">${data.inlandFreight.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-primary-600">Export Handling:</span>
              <span className="float-right font-medium">${data.exportHandling.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-primary-600">International Freight:</span>
              <span className="float-right font-medium">${data.internationalFreight.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-primary-600">Insurance:</span>
              <span className="float-right font-medium">${data.insurance.toFixed(2)}</span>
            </div>
            <div className="col-span-2 border-t pt-2">
              <span className="text-primary-600 font-semibold">Total Origin Costs:</span>
              <span className="float-right font-bold text-lg">
                ${(data.inlandFreight + data.exportHandling + data.internationalFreight + data.insurance).toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OriginCostsForm;
