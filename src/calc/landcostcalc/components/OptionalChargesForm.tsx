import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CreditCard, Package, Users } from 'lucide-react';

interface OptionalChargesFormProps {
  data: {
    compliance: number;
    bankingFees: number;
    packaging: number;
    commission: number;
  };
  onUpdate: (data: any) => void;
}

const OptionalChargesForm: React.FC<OptionalChargesFormProps> = ({ data, onUpdate }) => {
  const handleChange = (field: string, value: number) => {
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
              <Shield className="h-5 w-5 mr-2" />
              Compliance & Inspection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="compliance" className="text-sm text-primary-600">
              Regulatory Compliance Fees
            </Label>
            <Input
              id="compliance"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 75.00"
              value={data.compliance || ''}
              onChange={(e) => handleNumberChange('compliance', e.target.value)}
              className="mt-2 bg-white border-primary-200 focus:border-primary-400"
            />
            <p className="text-xs text-primary-600 mt-1">
              FDA, CE marking, product testing, inspections
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary-50 border-primary-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg text-primary-600">
              <CreditCard className="h-5 w-5 mr-2" />
              Banking & Finance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="bankingFees" className="text-sm text-primary-600">
              L/C, Wire Transfer, Finance Fees
            </Label>
            <Input
              id="bankingFees"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 125.00"
              value={data.bankingFees || ''}
              onChange={(e) => handleNumberChange('bankingFees', e.target.value)}
              className="mt-2 bg-white border-primary-200 focus:border-primary-400"
            />
            <p className="text-xs text-primary-600 mt-1">
              Letter of credit, bank charges, financing costs
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary-50 border-primary-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg text-primary-600">
              <Package className="h-5 w-5 mr-2" />
              Packaging & Labeling
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="packaging" className="text-sm text-primary-600">
              Special Packaging Requirements
            </Label>
            <Input
              id="packaging"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 50.00"
              value={data.packaging || ''}
              onChange={(e) => handleNumberChange('packaging', e.target.value)}
              className="mt-2 bg-white border-primary-200 focus:border-primary-400"
            />
            <p className="text-xs text-primary-600 mt-1">
              Export packaging, labels, marking requirements
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary-50 border-primary-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg text-primary-600">
              <Users className="h-5 w-5 mr-2" />
              Agent & Commission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="commission" className="text-sm text-primary-600">
              Agent Fees & Commissions
            </Label>
            <Input
              id="commission"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 200.00"
              value={data.commission || ''}
              onChange={(e) => handleNumberChange('commission', e.target.value)}
              className="mt-2 bg-white border-primary-200 focus:border-primary-400"
            />
            <p className="text-xs text-primary-600 mt-1">
              Sales agent fees, buying office commissions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Optional Charges Summary */}
      <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-primary-600 mb-2">📊 Optional Charges Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-primary-600">Compliance:</span>
              <span className="float-right font-medium">${data.compliance.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-primary-600">Banking Fees:</span>
              <span className="float-right font-medium">${data.bankingFees.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-primary-600">Packaging:</span>
              <span className="float-right font-medium">${data.packaging.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-primary-600">Commission:</span>
              <span className="float-right font-medium">${data.commission.toFixed(2)}</span>
            </div>
            <div className="col-span-2 border-t pt-2">
              <span className="text-primary-600 font-semibold">Total Optional Charges:</span>
              <span className="float-right font-bold text-lg">
                ${(data.compliance + data.bankingFees + data.packaging + data.commission).toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <Card className="bg-primary-50 border-primary-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-primary-600 mb-2">💡 Pro Tips for Optional Charges</h3>
          <ul className="text-sm text-primary-600 space-y-1">
            <li>• <strong>Compliance costs</strong> vary by product category and destination country</li>
            <li>• <strong>Banking fees</strong> are typically 0.1% - 0.5% of transaction value</li>
            <li>• <strong>Packaging costs</strong> can be significant for fragile or regulated items</li>
            <li>• <strong>Agent commissions</strong> are usually 3% - 10% of order value</li>
            <li>• Consider these costs when negotiating final pricing with customers</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default OptionalChargesForm;
