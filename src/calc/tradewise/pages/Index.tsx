import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Globe, FileText, TrendingUp, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calculator,
      title: "Smart Pricing Calculator",
      description: "AI-powered cost breakdown for all 11 Incoterms with dynamic markup suggestions"
    },
    {
      icon: Globe,
      title: "Global Trade Intelligence",
      description: "Real-time freight rates, currency conversion, and route optimization"
    },
    {
      icon: FileText,
      title: "Legal Clause Generator",
      description: "Auto-generated contract clauses compliant with ICC Incoterms® 2020"
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "AI analysis of liability distribution and risk mitigation strategies"
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description: "Historical data analysis and competitive pricing recommendations"
    },
    {
      icon: Zap,
      title: "Instant Export",
      description: "Professional PDF reports and Excel exports ready for contracts"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TradeCalc Pro</h1>
                <p className="text-sm text-gray-500">Incoterms® Export Calculator</p>
              </div>
            </div>
            <Button onClick={() => navigate('/calculator')} className="bg-primary-600 hover:bg-primary-700">
              Launch Calculator
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered
            <span className="text-primary-600 block">Export Price Calculator</span>
          </h1>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Calculate precise export prices using Incoterms® 2020 rules with AI-driven recommendations, 
            legal clause generation, and comprehensive risk analysis for international trade professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/calculator')} 
              size="lg" 
              className="bg-primary-600 hover:bg-primary-700 text-lg px-8 py-3"
            >
              Start Calculating
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything You Need for Export Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-primary-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Incoterms Preview */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            All 11 Incoterms® 2020 Supported
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['EXW', 'FCA', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP', 'FAS', 'FOB', 'CFR', 'CIF'].map((term) => (
              <div key={term} className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-8 h-8 bg-primary-600 rounded text-white text-sm font-bold flex items-center justify-center mx-auto mb-2">
                  {term[0]}
                </div>
                <p className="font-semibold text-gray-900">{term}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Optimize Your Export Pricing?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of trade professionals using AI-powered export calculations
          </p>
          <Button 
            onClick={() => navigate('/calculator')} 
            size="lg" 
            variant="secondary" 
            className="text-lg px-8 py-3"
          >
            Launch Calculator Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center">
                <Calculator className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">TradeCalc Pro</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 TradeCalc Pro. Incoterms® is a registered trademark of ICC.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
