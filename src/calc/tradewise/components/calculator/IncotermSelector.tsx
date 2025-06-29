import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Ship, Plane, Package } from 'lucide-react';
import { Incoterm } from '@/types/calculator';

const incoterms: Incoterm[] = [
  {
    code: 'EXW',
    name: 'Ex Works',
    description: 'Seller makes goods available at their premises',
    sellerResponsibility: ['Make goods available', 'Provide commercial invoice'],
    buyerResponsibility: ['All transport', 'All insurance', 'Export/import clearance'],
    riskTransfer: 'At seller\'s premises',
    costIncludes: ['Manufacturing cost only'],
    suitableFor: ['Experienced buyers', 'Domestic sales'],
    category: 'any'
  },
  {
    code: 'FCA',
    name: 'Free Carrier',
    description: 'Seller delivers goods to carrier at named place',
    sellerResponsibility: ['Deliver to carrier', 'Export clearance', 'Loading at origin'],
    buyerResponsibility: ['Main transport', 'Insurance', 'Import clearance'],
    riskTransfer: 'When goods delivered to carrier',
    costIncludes: ['Goods', 'Export clearance', 'Pre-carriage'],
    suitableFor: ['Container shipping', 'All transport modes'],
    category: 'any'
  },
  {
    code: 'FOB',
    name: 'Free On Board',
    description: 'Seller delivers when goods pass ship\'s rail',
    sellerResponsibility: ['Deliver to port', 'Export clearance', 'Loading on vessel'],
    buyerResponsibility: ['Main carriage', 'Insurance', 'Import clearance'],
    riskTransfer: 'When goods cross ship\'s rail',
    costIncludes: ['Goods', 'Export clearance', 'Port charges'],
    suitableFor: ['Sea transport only', 'Break bulk cargo'],
    category: 'sea-inland'
  },
  {
    code: 'CIF',
    name: 'Cost, Insurance & Freight',
    description: 'Seller pays freight and insurance to destination port',
    sellerResponsibility: ['Main carriage', 'Minimum insurance', 'Export clearance'],
    buyerResponsibility: ['Import clearance', 'Onward transport', 'Additional insurance'],
    riskTransfer: 'When goods cross ship\'s rail',
    costIncludes: ['Goods', 'Freight', 'Insurance', 'Export clearance'],
    suitableFor: ['Sea transport', 'Traditional trade'],
    category: 'sea-inland'
  },
  {
    code: 'DDP',
    name: 'Delivered Duty Paid',
    description: 'Seller delivers goods cleared for import at destination',
    sellerResponsibility: ['All transport', 'All clearance', 'Import duties', 'Insurance'],
    buyerResponsibility: ['Unloading at destination', 'Storage after delivery'],
    riskTransfer: 'At destination, ready for unloading',
    costIncludes: ['Everything except unloading'],
    suitableFor: ['Door-to-door service', 'High-value goods'],
    category: 'any'
  },
  {
    code: 'CPT',
    name: 'Carriage Paid To',
    description: 'Seller pays freight to named destination',
    sellerResponsibility: ['Main carriage', 'Export clearance'],
    buyerResponsibility: ['Insurance', 'Import clearance', 'Final delivery'],
    riskTransfer: 'When goods delivered to first carrier',
    costIncludes: ['Goods', 'Export clearance', 'Main carriage'],
    suitableFor: ['Multimodal transport', 'Container shipping'],
    category: 'any'
  }
];

interface IncotermSelectorProps {
  selectedIncoterm: Incoterm | null;
  onSelect: (incoterm: Incoterm) => void;
}

const IncotermSelector: React.FC<IncotermSelectorProps> = ({ selectedIncoterm, onSelect }) => {
  const getIcon = (code: string) => {
    switch (code) {
      case 'EXW': return Package;
      case 'FCA': case 'CPT': return Truck;
      case 'FOB': case 'CIF': return Ship;
      case 'DDP': return Plane;
      default: return Package;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Select Your Incoterm
        </h2>
        <p className="text-gray-600">
          Choose the trade term that best fits your transaction requirements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {incoterms.map((incoterm) => {
          const IconComponent = getIcon(incoterm.code);
          const isSelected = selectedIncoterm?.code === incoterm.code;
          
          return (
            <Card 
              key={incoterm.code}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? 'ring-2 ring-primary-500 bg-primary-50' : ''
              }`}
              onClick={() => onSelect(incoterm)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-primary-600' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`h-5 w-5 ${
                        isSelected ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{incoterm.code}</CardTitle>
                      <p className="text-sm text-gray-600">{incoterm.name}</p>
                    </div>
                  </div>
                  <Badge variant={incoterm.category === 'sea-inland' ? 'secondary' : 'default'}>
                    {incoterm.category === 'sea-inland' ? 'Sea/Inland' : 'Any Mode'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">{incoterm.description}</p>
                
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 mb-1">Risk Transfer:</h4>
                  <p className="text-xs text-gray-600">{incoterm.riskTransfer}</p>
                </div>
                
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 mb-1">Seller Handles:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {incoterm.sellerResponsibility.slice(0, 2).map((item, index) => (
                      <li key={index} className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 mb-1">Best For:</h4>
                  <div className="flex flex-wrap gap-1">
                    {incoterm.suitableFor.map((use, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {use}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedIncoterm && (
        <Card className="bg-primary-50 border-primary-200">
          <CardHeader>
            <CardTitle className="text-lg text-primary-900">
              Selected: {selectedIncoterm.code} - {selectedIncoterm.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-primary-900 mb-2">Seller Responsibilities:</h4>
                <ul className="space-y-1">
                  {selectedIncoterm.sellerResponsibility.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-primary-800">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary-900 mb-2">Buyer Responsibilities:</h4>
                <ul className="space-y-1">
                  {selectedIncoterm.buyerResponsibility.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-primary-800">
                      <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IncotermSelector;
