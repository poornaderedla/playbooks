import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Download, Share2, HelpCircle, Globe, DollarSign, Package, Truck, FileText, BarChart3, PieChart, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import ProductInfoForm from '../components/ProductInfoForm';
import OriginCostsForm from '../components/OriginCostsForm';
import ImportCostsForm from '../components/ImportCostsForm';
import OptionalChargesForm from '../components/OptionalChargesForm';
import CurrencySettingsForm from '../components/CurrencySettingsForm';
import CalculationResults from '../components/CalculationResults';
import AIRecommendations from '../components/AIRecommendations';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('product');
  const [completionStatus, setCompletionStatus] = useState({
    product: false,
    origin: false,
    import: false,
    optional: false,
    currency: false
  });

  const [calculationData, setCalculationData] = useState({
    product: {
      name: '',
      sku: '',
      quantity: 1,
      costPerUnit: 0,
      hsCode: ''
    },
    origin: {
      inlandFreight: 0,
      exportHandling: 0,
      internationalFreight: 0,
      insurance: 0,
      insuranceType: 'percentage'
    },
    import: {
      importDuties: 0,
      dutiesType: 'percentage',
      vatGst: 0,
      vatGstType: 'percentage',
      vatReclaimable: false,
      customsBrokerFees: 0,
      localHandling: 0,
      inlandFreightDestination: 0,
      warehousing: 0
    },
    optional: {
      compliance: 0,
      bankingFees: 0,
      packaging: 0,
      commission: 0
    },
    currency: {
      selected: 'USD',
      exchangeRate: 1,
      markup: 0,
      targetProfit: 0,
      sellingPrice: 0
    }
  });

  const [results, setResults] = useState(null);
  const [showAI, setShowAI] = useState(false);

  // Check completion status
  useEffect(() => {
    setCompletionStatus({
      product: !!(calculationData.product.name && calculationData.product.quantity > 0 && calculationData.product.costPerUnit > 0),
      origin: !!(calculationData.origin.internationalFreight > 0),
      import: !!(calculationData.import.importDuties >= 0),
      optional: true, // Optional section is always considered complete
      currency: !!(calculationData.currency.selected)
    });
  }, [calculationData]);

  const getProgressPercentage = () => {
    const completed = Object.values(completionStatus).filter(Boolean).length;
    return (completed / Object.keys(completionStatus).length) * 100;
  };

  const calculateTLC = () => {
    try {
      const { product, origin, import: importCosts, optional, currency } = calculationData;
      
      // Base product cost
      const productCost = product.costPerUnit * product.quantity;
      
      // Origin costs
      const originTotal = origin.inlandFreight + origin.exportHandling + origin.internationalFreight;
      
      // Insurance calculation
      const insuranceAmount = origin.insuranceType === 'percentage' 
        ? (productCost * origin.insurance / 100)
        : origin.insurance;
      
      // Import duties
      const dutiesAmount = importCosts.dutiesType === 'percentage'
        ? (productCost * importCosts.importDuties / 100)
        : importCosts.importDuties;
      
      // VAT/GST
      const vatAmount = importCosts.vatGstType === 'percentage'
        ? ((productCost + dutiesAmount) * importCosts.vatGst / 100)
        : importCosts.vatGst;
      
      // Import costs total
      const importTotal = dutiesAmount + vatAmount + importCosts.customsBrokerFees + 
                         importCosts.localHandling + importCosts.inlandFreightDestination + 
                         importCosts.warehousing;
      
      // Optional charges
      const optionalTotal = optional.compliance + optional.bankingFees + 
                           optional.packaging + optional.commission;
      
      // Total Landed Cost
      const totalLandedCost = productCost + originTotal + insuranceAmount + importTotal + optionalTotal;
      const costPerUnit = totalLandedCost / product.quantity;
      
      // Markup calculations
      const markupAmount = currency.markup > 0 ? (totalLandedCost * currency.markup / 100) : 0;
      const breakEvenPrice = costPerUnit + (markupAmount / product.quantity);
      
      const profit = currency.sellingPrice > 0 ? 
        (currency.sellingPrice * product.quantity) - totalLandedCost : 0;
      
      const calculatedResults = {
        totalLandedCost,
        costPerUnit,
        breakEvenPrice,
        profit,
        profitPerUnit: profit / product.quantity,
        profitMargin: currency.sellingPrice > 0 ? (profit / (currency.sellingPrice * product.quantity)) * 100 : 0,
        breakdown: {
          productCost,
          originCosts: originTotal,
          insurance: insuranceAmount,
          importCosts: importTotal,
          optionalCharges: optionalTotal
        },
        percentageBreakdown: {
          productCost: (productCost / totalLandedCost) * 100,
          originCosts: (originTotal / totalLandedCost) * 100,
          insurance: (insuranceAmount / totalLandedCost) * 100,
          importCosts: (importTotal / totalLandedCost) * 100,
          optionalCharges: (optionalTotal / totalLandedCost) * 100
        }
      };
      
      setResults(calculatedResults);
      setShowAI(true);
      
      toast({
        title: "✅ Calculation Complete",
        description: `Total Landed Cost: ${currency.selected} ${totalLandedCost.toFixed(2)} | Margin: ${calculatedResults.profitMargin.toFixed(1)}%`,
      });
    } catch (error) {
      toast({
        title: "❌ Calculation Error",
        description: "Please check your inputs and try again.",
        variant: "destructive",
      });
    }
  };

  const updateCalculationData = (section, data) => {
    setCalculationData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const resetCalculator = () => {
    setCalculationData({
      product: { name: '', sku: '', quantity: 1, costPerUnit: 0, hsCode: '' },
      origin: { inlandFreight: 0, exportHandling: 0, internationalFreight: 0, insurance: 0, insuranceType: 'percentage' },
      import: { importDuties: 0, dutiesType: 'percentage', vatGst: 0, vatGstType: 'percentage', vatReclaimable: false, customsBrokerFees: 0, localHandling: 0, inlandFreightDestination: 0, warehousing: 0 },
      optional: { compliance: 0, bankingFees: 0, packaging: 0, commission: 0 },
      currency: { selected: 'USD', exchangeRate: 1, markup: 0, targetProfit: 0, sellingPrice: 0 }
    });
    setResults(null);
    setShowAI(false);
    setActiveTab('product');
  };

  const nextTab = () => {
    const tabs = ['product', 'origin', 'import', 'optional', 'currency'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const prevTab = () => {
    const tabs = ['product', 'origin', 'import', 'optional', 'currency'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const getTabIcon = (tab, isCompleted) => {
    const iconProps = { className: `h-4 w-4 ${isCompleted ? 'text-primary-600' : 'text-gray-400'}` };
    switch (tab) {
      case 'product': return <Package {...iconProps} />;
      case 'origin': return <Truck {...iconProps} />;
      case 'import': return <Globe {...iconProps} />;
      case 'optional': return <FileText {...iconProps} />;
      case 'currency': return <DollarSign {...iconProps} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-primary-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              Total Landed Cost Calculator Pro
            </h1>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={resetCalculator} className="hover:bg-primary-50 hover:border-primary-200">
                Reset
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-primary-50" onClick={() => {}}>
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-primary-50" onClick={() => {}}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Main Calculator */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-t-lg">
                <CardTitle className="flex items-center text-2xl text-gray-800">
                  <div className="bg-gradient-to-br from-primary-600 to-primary-600 p-2 rounded-lg mr-3">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  Smart Cost Input Wizard
                </CardTitle>
                <p className="text-gray-600">AI-guided step-by-step cost calculation with real-time optimization</p>
              </CardHeader>
              
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-5 mb-6 bg-primary-100 p-1 rounded-xl">
                    {['product', 'origin', 'import', 'optional', 'currency'].map((tab) => (
                      <TabsTrigger 
                        key={tab}
                        value={tab} 
                        className="flex items-center space-x-2 text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm relative"
                      >
                        {getTabIcon(tab, completionStatus[tab])}
                        <span className="hidden sm:inline capitalize">{tab}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="product">
                    <ProductInfoForm 
                      data={calculationData.product} 
                      onUpdate={(data) => updateCalculationData('product', data)} 
                    />
                  </TabsContent>

                  <TabsContent value="origin">
                    <OriginCostsForm 
                      data={calculationData.origin} 
                      onUpdate={(data) => updateCalculationData('origin', data)} 
                    />
                  </TabsContent>

                  <TabsContent value="import">
                    <ImportCostsForm 
                      data={calculationData.import} 
                      onUpdate={(data) => updateCalculationData('import', data)} 
                    />
                  </TabsContent>

                  <TabsContent value="optional">
                    <OptionalChargesForm 
                      data={calculationData.optional} 
                      onUpdate={(data) => updateCalculationData('optional', data)} 
                    />
                  </TabsContent>

                  <TabsContent value="currency">
                    <CurrencySettingsForm 
                      data={calculationData.currency} 
                      onUpdate={(data) => updateCalculationData('currency', data)}
                      onCalculate={calculateTLC}
                    />
                  </TabsContent>
                </Tabs>

                {/* Enhanced Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    onClick={prevTab}
                    disabled={activeTab === 'product'}
                    className="px-6"
                  >
                    ← Previous
                  </Button>
                  
                  {activeTab !== 'currency' && (
                    <Button 
                      variant="outline" 
                      onClick={nextTab}
                      disabled={activeTab === 'currency'}
                      className="px-6"
                    >
                      Next →
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Results Sidebar */}
          <div className="space-y-6">
            {results && <CalculationResults results={results} currency={calculationData.currency.selected} />}
            {showAI && <AIRecommendations data={calculationData} results={results} />}
            
            {/* Enhanced Help Card */}
            <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg text-primary-600">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Expert Guidance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/70 rounded-lg p-3">
                  <p className="text-sm text-primary-600 mb-2">
                    <strong>💡 Pro Tip:</strong> Total Landed Cost includes ALL expenses from origin to destination - helping you determine true profitability and competitive pricing.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="border-primary-300 text-primary-600 hover:bg-primary-50 text-xs">
                    📚 Guide
                  </Button>
                  <Button variant="outline" size="sm" className="border-primary-300 text-primary-600 hover:bg-primary-50 text-xs">
                    🎥 Tutorial
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Disclaimer */}
            <Alert className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 shadow-sm">
              <AlertTriangle className="h-4 w-4 text-primary-600" />
              <AlertDescription className="text-primary-600 text-xs">
                <strong>⚠️ Important Disclaimer:</strong> These are AI-powered estimates for planning purposes. Final charges may vary based on customs inspection, carrier invoices, and regulatory changes. Always consult with your freight forwarder for binding quotes.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
