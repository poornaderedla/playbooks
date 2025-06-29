import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Target, Calculator } from 'lucide-react';

interface CurrencySettingsFormProps {
  data: {
    selected: string;
    exchangeRate: number;
    markup: number;
    targetProfit: number;
    sellingPrice: number;
  };
  onUpdate: (data: any) => void;
  onCalculate?: () => void;
}

const CurrencySettingsForm: React.FC<CurrencySettingsFormProps> = ({ data, onUpdate, onCalculate }) => {
  const handleChange = (field: string, value: string | number) => {
    onUpdate({ [field]: value });
  };

  const handleNumberChange = (field: string, value: string) => {
    // Remove leading zeros and convert to number
    const cleanValue = value.replace(/^0+/, '') || '0';
    const numValue = parseFloat(cleanValue) || 0;
    onUpdate({ [field]: numValue });
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary-50 border-primary-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg text-primary-600">
              <DollarSign className="h-5 w-5 mr-2" />
              Currency Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="currency" className="text-sm text-primary-600">
              Primary Currency
            </Label>
            <Select 
              value={data.selected} 
              onValueChange={(value) => handleChange('selected', value)}
            >
              <SelectTrigger className="mt-2 bg-white border-primary-200 focus:border-primary-400">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.name} ({currency.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-primary-600 mt-1">
              All calculations will be displayed in this currency
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary-50 border-primary-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg text-primary-600">
              <TrendingUp className="h-5 w-5 mr-2" />
              Exchange Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="exchangeRate" className="text-sm text-primary-600">
              Exchange Rate (if applicable)
            </Label>
            <Input
              id="exchangeRate"
              type="number"
              step="0.0001"
              min="0"
              placeholder="e.g., 1.0000"
              value={data.exchangeRate || ''}
              onChange={(e) => handleNumberChange('exchangeRate', e.target.value)}
              className="mt-2 bg-white border-primary-200 focus:border-primary-400"
            />
            <p className="text-xs text-primary-600 mt-1">
              1.0 if all costs are in the same currency
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary-50 border-primary-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg text-primary-600">
              <Target className="h-5 w-5 mr-2" />
              Markup Percentage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="markup" className="text-sm text-primary-600">
              Desired Markup (%)
            </Label>
            <Input
              id="markup"
              type="number"
              step="0.1"
              min="0"
              placeholder="e.g., 15.0"
              value={data.markup || ''}
              onChange={(e) => handleNumberChange('markup', e.target.value)}
              className="mt-2 bg-white border-primary-200 focus:border-primary-400"
            />
            <p className="text-xs text-primary-600 mt-1">
              Markup over total landed cost for break-even pricing
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary-50 border-primary-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg text-primary-600">
              <Calculator className="h-5 w-5 mr-2" />
              Target Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="targetProfit" className="text-sm text-primary-600">
              Target Profit per Unit
            </Label>
            <Input
              id="targetProfit"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 5.00"
              value={data.targetProfit || ''}
              onChange={(e) => handleNumberChange('targetProfit', e.target.value)}
              className="mt-2 bg-white border-primary-200 focus:border-primary-400"
            />
            <p className="text-xs text-primary-600 mt-1">
              Absolute profit target per unit (optional)
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-primary-50 border-primary-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg text-primary-600">
            <DollarSign className="h-5 w-5 mr-2" />
            Current Selling Price
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="sellingPrice" className="text-sm text-primary-600">
            Current/Planned Selling Price per Unit
          </Label>
          <Input
            id="sellingPrice"
            type="number"
            step="0.01"
            min="0"
            placeholder="e.g., 35.00"
            value={data.sellingPrice || ''}
            onChange={(e) => handleNumberChange('sellingPrice', e.target.value)}
            className="mt-2 bg-white border-primary-200 focus:border-primary-400"
          />
          <p className="text-xs text-primary-600 mt-1">
            Enter your selling price to calculate actual profit margins
          </p>
        </CardContent>
      </Card>

      {/* Calculate TLC Button */}
      {onCalculate && (
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-primary-600 mb-4">Ready to Calculate Total Landed Cost?</h3>
            <p className="text-sm text-primary-600 mb-6">
              All required information has been entered. Click below to calculate your total landed cost and profit analysis.
            </p>
            <Button 
              onClick={onCalculate}
              className="bg-gradient-to-r from-primary-600 to-primary-600 hover:from-primary-600 hover:to-primary-600 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Calculate Total Landed Cost
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Currency Settings Summary */}
      <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-primary-600 mb-2">📊 Currency & Pricing Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-primary-600">Currency:</span>
              <span className="float-right font-medium">{data.selected}</span>
            </div>
            <div>
              <span className="text-primary-600">Exchange Rate:</span>
              <span className="float-right font-medium">{data.exchangeRate.toFixed(4)}</span>
            </div>
            <div>
              <span className="text-primary-600">Markup:</span>
              <span className="float-right font-medium">{data.markup.toFixed(1)}%</span>
            </div>
            <div>
              <span className="text-primary-600">Target Profit:</span>
              <span className="float-right font-medium">${data.targetProfit.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-primary-600">Selling Price:</span>
              <span className="float-right font-medium">${data.sellingPrice.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Strategy Tips */}
      <Card className="bg-primary-50 border-primary-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-primary-600 mb-2">💡 Pricing Strategy Tips</h3>
          <ul className="text-sm text-primary-600 space-y-1">
            <li>• <strong>Markup vs. Margin:</strong> 20% markup = 16.7% margin</li>
            <li>• <strong>Currency risk:</strong> Consider hedging for volatile currencies</li>
            <li>• <strong>Competitive pricing:</strong> Research market rates for similar products</li>
            <li>• <strong>Volume discounts:</strong> Higher quantities may reduce per-unit TLC</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencySettingsForm;
