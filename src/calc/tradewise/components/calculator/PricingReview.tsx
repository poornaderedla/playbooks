import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  CalculatorData, AIRecommendation, LegalClause 
} from '@/types/calculator';
import { 
  TrendingUp, AlertTriangle, FileText, Download, 
  Mail, DollarSign, Shield, Truck, Brain 
} from 'lucide-react';

interface PricingReviewProps {
  data: CalculatorData;
  onUpdate: (data: Partial<CalculatorData>) => void;
}

const PricingReview: React.FC<PricingReviewProps> = ({ data, onUpdate }) => {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Calculate final price
  const calculateFinalPrice = () => {
    const subtotal = Object.values(data.costs).reduce((sum, cost, index) => {
      // Skip markup in subtotal
      if (index === Object.keys(data.costs).length - 1) return sum;
      return sum + cost;
    }, 0);
    return subtotal * (1 + data.costs.markup / 100);
  };

  // Mock AI Recommendations
  const aiRecommendations: AIRecommendation[] = [
    {
      type: 'optimization',
      title: 'Freight Cost Optimization',
      description: `Your freight cost of $${data.costs.freight.toLocaleString()} seems high for this route. Consider consolidating shipments or negotiating better rates.`,
      impact: 'Potential savings: 15-20%'
    },
    {
      type: 'warning',
      title: 'Insurance Coverage',
      description: `${data.selectedIncoterm?.code} requires minimum insurance. Your current coverage may be insufficient for high-value goods.`,
      impact: 'Risk exposure: High'
    },
    {
      type: 'suggestion',
      title: 'Alternative Incoterm',
      description: `Consider FCA instead of ${data.selectedIncoterm?.code} for better cost control and risk distribution.`,
      impact: 'Cost reduction: 8-12%'
    }
  ];

  // Mock Legal Clauses
  const legalClauses: LegalClause[] = [
    {
      title: 'Delivery Terms',
      content: `Delivery shall be completed when the goods are delivered in accordance with ${data.selectedIncoterm?.code} ${data.selectedIncoterm?.name} (Incoterms® 2020) at ${data.shipmentDetails.destination}.`,
      category: 'delivery'
    },
    {
      title: 'Risk Transfer',
      content: `Risk of loss or damage to the goods passes from Seller to Buyer ${data.selectedIncoterm?.riskTransfer}.`,
      category: 'risk'
    },
    {
      title: 'Insurance Obligations',
      content: `${data.selectedIncoterm?.code === 'CIF' || data.selectedIncoterm?.code === 'CIP' 
        ? 'Seller shall procure insurance coverage as specified in Incoterms® 2020.' 
        : 'Buyer is responsible for arranging insurance coverage as deemed necessary.'}`,
      category: 'insurance'
    }
  ];

  const handleExportPDF = () => {
    setIsGeneratingReport(true);
    // Simulate PDF generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      // In a real app, this would trigger PDF download
      console.log('PDF export completed');
    }, 2000);
  };

  const finalPrice = calculateFinalPrice();
  const profitMargin = (finalPrice - (finalPrice / (1 + data.costs.markup / 100))) / finalPrice * 100;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Pricing Review & AI Analysis
        </h2>
        <p className="text-gray-600">
          Review your calculation and get AI-powered recommendations
        </p>
      </div>

      {/* Price Summary */}
      <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <DollarSign className="h-6 w-6 text-primary-600" />
            <span>Final Export Price</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total Price</p>
              <p className="text-3xl font-bold text-primary-600">
                ${finalPrice.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">{data.shipmentDetails.currency}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Profit Margin</p>
              <p className="text-2xl font-bold text-primary-600">
                {profitMargin.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500">After markup</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Price per kg</p>
              <p className="text-2xl font-bold text-primary-600">
                ${(finalPrice / data.shipmentDetails.weight).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">Per kilogram</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="breakdown" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="legal">Legal Clauses</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Detailed Cost Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(data.costs).map(([key, value]) => {
                  if (key === 'markup') return null;
                  const percentage = (value / (finalPrice / (1 + data.costs.markup / 100))) * 100;
                  return (
                    <div key={key} className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </span>
                          <span className="font-semibold">${value.toLocaleString()}</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% of total cost</p>
                      </div>
                    </div>
                  );
                })}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center p-3 bg-primary-50 rounded-lg">
                    <span className="font-bold">Total with {data.costs.markup}% markup:</span>
                    <span className="font-bold text-primary-600 text-xl">${finalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>AI-Powered Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  rec.type === 'warning' ? 'bg-primary-50 border-primary-400' :
                  rec.type === 'optimization' ? 'bg-primary-50 border-primary-400' :
                  'bg-primary-50 border-primary-400'
                }`}>
                  <div className="flex items-start space-x-3">
                    {rec.type === 'warning' ? 
                      <AlertTriangle className="h-5 w-5 text-primary-500 mt-0.5" /> :
                      <TrendingUp className="h-5 w-5 text-primary-500 mt-0.5" />
                    }
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{rec.title}</h4>
                        <Badge variant={
                          rec.type === 'warning' ? 'destructive' :
                          rec.type === 'optimization' ? 'default' : 'secondary'
                        }>
                          {rec.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{rec.description}</p>
                      {rec.impact && (
                        <p className="text-xs font-medium text-gray-600">{rec.impact}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Generated Legal Clauses</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {legalClauses.map((clause, index) => (
                <div key={index} className="p-4 bg-primary-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{clause.title}</h4>
                    <Badge variant="outline">{clause.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{clause.content}</p>
                </div>
              ))}
              <div className="bg-primary-50 p-4 rounded-lg">
                <p className="text-xs text-primary-800">
                  <strong>Note:</strong> These clauses are generated based on Incoterms® 2020 rules. 
                  Please review with legal counsel before using in contracts.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Export Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleExportPDF}
                  disabled={isGeneratingReport}
                  className="w-full flex items-center space-x-2"
                >
                  {isGeneratingReport ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Generating PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span>Download PDF Report</span>
                    </>
                  )}
                </Button>
                <Button variant="outline" className="w-full flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Quote</span>
                </Button>
                <Button variant="outline" className="w-full flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Export to Excel</span>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quote Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Incoterm:</span>
                  <span className="font-medium">{data.selectedIncoterm?.code} - {data.selectedIncoterm?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Route:</span>
                  <span className="font-medium">{data.shipmentDetails.origin} → {data.shipmentDetails.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">{data.shipmentDetails.weight.toLocaleString()} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Value:</span>
                  <span className="font-medium">${data.shipmentDetails.value.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Export Price:</span>
                  <span className="text-primary-600">${finalPrice.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PricingReview;
