import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Hash, DollarSign, BarChart3 } from 'lucide-react';

interface ProductInfoFormProps {
  data: {
    name: string;
    sku: string;
    quantity: number;
    costPerUnit: number;
    hsCode: string;
  };
  onUpdate: (data: any) => void;
}

const ProductInfoForm: React.FC<ProductInfoFormProps> = ({ data, onUpdate }) => {
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
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <Package className="h-5 w-5 text-primary-600 mr-2" />
              <Label htmlFor="productName" className="text-sm font-medium text-primary-600">
                Product Name *
              </Label>
            </div>
            <Input
              id="productName"
              placeholder="e.g., Widget Pro 2024"
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="bg-white border-primary-200 focus:border-primary-400"
            />
          </CardContent>
        </Card>

        <Card className="bg-primary-50 border-primary-200">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <Hash className="h-5 w-5 text-primary-600 mr-2" />
              <Label htmlFor="sku" className="text-sm font-medium text-primary-600">
                SKU/Product Code
              </Label>
            </div>
            <Input
              id="sku"
              placeholder="e.g., WP-2024-001"
              value={data.sku}
              onChange={(e) => handleChange('sku', e.target.value)}
              className="bg-white border-primary-200 focus:border-primary-400"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary-50 border-primary-200">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <BarChart3 className="h-5 w-5 text-primary-600 mr-2" />
              <Label htmlFor="quantity" className="text-sm font-medium text-primary-600">
                Quantity of Units *
              </Label>
            </div>
            <Input
              id="quantity"
              type="number"
              min="1"
              placeholder="e.g., 1000"
              value={data.quantity || ''}
              onChange={(e) => handleNumberChange('quantity', e.target.value)}
              className="bg-white border-primary-200 focus:border-primary-400"
            />
          </CardContent>
        </Card>

        <Card className="bg-primary-50 border-primary-200">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <DollarSign className="h-5 w-5 text-primary-600 mr-2" />
              <Label htmlFor="costPerUnit" className="text-sm font-medium text-primary-600">
                Cost Per Unit (EXW/FOB) *
              </Label>
            </div>
            <Input
              id="costPerUnit"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 25.50"
              value={data.costPerUnit || ''}
              onChange={(e) => handleNumberChange('costPerUnit', e.target.value)}
              className="bg-white border-primary-200 focus:border-primary-400"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-primary-50 border-primary-200">
        <CardContent className="p-4">
          <div className="flex items-center mb-3">
            <Hash className="h-5 w-5 text-primary-600 mr-2" />
            <Label htmlFor="hsCode" className="text-sm font-medium text-primary-600">
              HS Code (Harmonized System)
            </Label>
          </div>
          <Input
            id="hsCode"
            placeholder="e.g., 8471.30.0100"
            value={data.hsCode}
            onChange={(e) => handleChange('hsCode', e.target.value)}
            className="bg-white border-primary-200 focus:border-primary-400"
          />
          <p className="text-xs text-primary-600 mt-1">
            International classification code for customs and duties
          </p>
        </CardContent>
      </Card>

      {/* Summary Display */}
      {data.name && data.quantity > 0 && data.costPerUnit > 0 && (
        <Card className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Product Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="opacity-80">Product:</span>
                <div className="font-medium">{data.name}</div>
              </div>
              <div>
                <span className="opacity-80">Total Value:</span>
                <div className="font-medium text-lg">
                  ${(data.quantity * data.costPerUnit).toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductInfoForm;
