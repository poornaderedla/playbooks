import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Calculator, PieChart, BarChart3 } from 'lucide-react';

interface CalculationResultsProps {
  results: {
    totalLandedCost: number;
    costPerUnit: number;
    breakEvenPrice: number;
    profit: number;
    profitPerUnit: number;
    profitMargin: number;
    breakdown: {
      productCost: number;
      originCosts: number;
      insurance: number;
      importCosts: number;
      optionalCharges: number;
    };
    percentageBreakdown: {
      productCost: number;
      originCosts: number;
      insurance: number;
      importCosts: number;
      optionalCharges: number;
    };
  };
  currency: string;
}

const CalculationResults: React.FC<CalculationResultsProps> = ({ results, currency }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getCurrencySymbol = (currencyCode: string) => {
    const symbols = {
      USD: '$', EUR: '€', GBP: '£', CNY: '¥', JPY: '¥',
      CAD: 'C$', AUD: 'A$', CHF: 'Fr', SEK: 'kr', NOK: 'kr'
    };
    return symbols[currencyCode] || currencyCode;
  };

  const getProfitColor = (margin: number) => {
    if (margin > 20) return 'text-green-600';
    if (margin > 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProfitBadgeVariant = (margin: number) => {
    if (margin > 20) return 'default';
    if (margin > 10) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="space-y-4">
      {/* Main Results Card */}
      <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-xl">
            <Calculator className="h-6 w-6 mr-2" />
            Total Landed Cost
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">
              {formatCurrency(results.totalLandedCost)}
            </div>
            <div className="text-sm opacity-90">
              {formatCurrency(results.costPerUnit)} per unit
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="opacity-80 mb-1">Break-even Price:</div>
                <div className="font-semibold text-lg">
                  {formatCurrency(results.breakEvenPrice)}
                </div>
              </div>
              <div>
                <div className="opacity-80 mb-1">Profit per Unit:</div>
                <div className={`font-semibold text-lg ${results.profitPerUnit > 0 ? 'text-green-200' : 'text-red-200'}`}>
                  {formatCurrency(results.profitPerUnit)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profit Analysis */}
      {results.profit !== 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Profit Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Profit:</span>
              <span className={`font-semibold ${results.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(results.profit)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Profit Margin:</span>
              <Badge variant={getProfitBadgeVariant(results.profitMargin)}>
                {results.profitMargin.toFixed(1)}%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">ROI Status:</span>
              <span className={getProfitColor(results.profitMargin)}>
                {results.profitMargin > 20 ? 'Excellent' : 
                 results.profitMargin > 10 ? 'Good' : 
                 results.profitMargin > 0 ? 'Low' : 'Loss'}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cost Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <PieChart className="h-5 w-5 mr-2 text-blue-600" />
            Cost Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Product Cost</span>
              <span className="font-medium">
                {formatCurrency(results.breakdown.productCost)} 
                <span className="text-gray-500 ml-1">
                  ({results.percentageBreakdown.productCost.toFixed(1)}%)
                </span>
              </span>
            </div>
            <Progress value={results.percentageBreakdown.productCost} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Origin Costs</span>
              <span className="font-medium">
                {formatCurrency(results.breakdown.originCosts)} 
                <span className="text-gray-500 ml-1">
                  ({results.percentageBreakdown.originCosts.toFixed(1)}%)
                </span>
              </span>
            </div>
            <Progress value={results.percentageBreakdown.originCosts} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Insurance</span>
              <span className="font-medium">
                {formatCurrency(results.breakdown.insurance)} 
                <span className="text-gray-500 ml-1">
                  ({results.percentageBreakdown.insurance.toFixed(1)}%)
                </span>
              </span>
            </div>
            <Progress value={results.percentageBreakdown.insurance} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Import Costs</span>
              <span className="font-medium">
                {formatCurrency(results.breakdown.importCosts)} 
                <span className="text-gray-500 ml-1">
                  ({results.percentageBreakdown.importCosts.toFixed(1)}%)
                </span>
              </span>
            </div>
            <Progress value={results.percentageBreakdown.importCosts} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Optional Charges</span>
              <span className="font-medium">
                {formatCurrency(results.breakdown.optionalCharges)} 
                <span className="text-gray-500 ml-1">
                  ({results.percentageBreakdown.optionalCharges.toFixed(1)}%)
                </span>
              </span>
            </div>
            <Progress value={results.percentageBreakdown.optionalCharges} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg text-green-800">
            <BarChart3 className="h-5 w-5 mr-2" />
            Quick Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong>Largest cost component:</strong> {
                Object.entries(results.percentageBreakdown).reduce((a, b) => 
                  results.percentageBreakdown[a[0]] > results.percentageBreakdown[b[0]] ? a : b
                )[0].replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
              } ({
                Object.entries(results.percentageBreakdown).reduce((a, b) => 
                  results.percentageBreakdown[a[0]] > results.percentageBreakdown[b[0]] ? a : b
                )[1].toFixed(1)
              }%)
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong>Cost per unit:</strong> {formatCurrency(results.costPerUnit)} 
              {results.profitMargin > 0 && (
                <span className="text-green-600 ml-1">
                  (Margin: {results.profitMargin.toFixed(1)}%)
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <strong>Break-even price:</strong> {formatCurrency(results.breakEvenPrice)} to cover all costs
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculationResults;
