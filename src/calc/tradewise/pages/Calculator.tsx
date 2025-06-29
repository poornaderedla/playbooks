import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Download, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import IncotermSelector from '../components/calculator/IncotermSelector';
import ShipmentDetails from '../components/calculator/ShipmentDetails';
import CostInputs from '../components/calculator/CostInputs';
import PricingReview from '../components/calculator/PricingReview';
import { CalculatorData, Incoterm } from '../types/calculator';

const Calculator = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({
    selectedIncoterm: null,
    shipmentDetails: {
      origin: '',
      destination: '',
      weight: 0,
      value: 0,
      hsCode: '',
      currency: 'USD'
    },
    costs: {
      manufacturing: 0,
      packaging: 0,
      loading: 0,
      freight: 0,
      insurance: 0,
      customs: 0,
      delivery: 0,
      markup: 15
    },
    finalPrice: 0
  });

  const steps = [
    { number: 1, title: 'Select Incoterm', description: 'Choose the appropriate trade term' },
    { number: 2, title: 'Shipment Details', description: 'Enter product and shipping information' },
    { number: 3, title: 'Cost Breakdown', description: 'Input all associated costs' },
    { number: 4, title: 'Review & Export', description: 'AI analysis and final pricing' }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateCalculatorData = (updates: Partial<CalculatorData>) => {
    setCalculatorData(prev => ({ ...prev, ...updates }));
  };

  const progress = (currentStep / 4) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <IncotermSelector
            selectedIncoterm={calculatorData.selectedIncoterm}
            onSelect={(incoterm: Incoterm) => 
              updateCalculatorData({ selectedIncoterm: incoterm })
            }
          />
        );
      case 2:
        return (
          <ShipmentDetails
            details={calculatorData.shipmentDetails}
            onUpdate={(details) => 
              updateCalculatorData({ shipmentDetails: details })
            }
          />
        );
      case 3:
        return (
          <CostInputs
            costs={calculatorData.costs}
            selectedIncoterm={calculatorData.selectedIncoterm}
            onUpdate={(costs) => 
              updateCalculatorData({ costs })
            }
          />
        );
      case 4:
        return (
          <PricingReview
            data={calculatorData}
            onUpdate={updateCalculatorData}
          />
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return calculatorData.selectedIncoterm !== null;
      case 2:
        return calculatorData.shipmentDetails.origin && 
               calculatorData.shipmentDetails.destination &&
               calculatorData.shipmentDetails.weight > 0 &&
               calculatorData.shipmentDetails.value > 0;
      case 3:
        return calculatorData.costs.manufacturing > 0;
      default:
        return true;
    }
  };

  // Reset calculator function
  const resetCalculator = () => {
    setCalculatorData({
      selectedIncoterm: null,
      shipmentDetails: {
        origin: '',
        destination: '',
        weight: 0,
        value: 0,
        hsCode: '',
        currency: 'USD'
      },
      costs: {
        manufacturing: 0,
        packaging: 0,
        loading: 0,
        freight: 0,
        insurance: 0,
        customs: 0,
        delivery: 0,
        markup: 15
      },
      finalPrice: 0
    });
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button> */}
            <h1 className="text-xl font-semibold text-gray-900">
              Incoterms® Export Calculator
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <CardTitle>Step {currentStep} of 4</CardTitle>
              <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {steps.map((step) => (
                <div 
                  key={step.number}
                  className={`text-center p-3 rounded-lg transition-colors ${
                    step.number === currentStep 
                      ? 'bg-primary-100 border-2 border-primary-500' 
                      : step.number < currentStep 
                        ? 'bg-primary-100 border-2 border-primary-500'
                        : 'bg-gray-100'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${
                    step.number === currentStep 
                      ? 'bg-primary-500 text-white' 
                      : step.number < currentStep 
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-sm">{step.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                </div>
              ))}
            </div>
          </CardHeader>
        </Card>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          
          {currentStep < 4 ? (
            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button className="bg-primary-600 hover:bg-primary-700">
              Export Results
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
