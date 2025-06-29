import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ShipmentDetails as ShipmentDetailsType } from '@/types/calculator';

interface ShipmentDetailsProps {
  details: ShipmentDetailsType;
  onUpdate: (details: ShipmentDetailsType) => void;
}

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'CAD', 'AUD', 'CHF'];

const countries = [
  'United States', 'China', 'Germany', 'Japan', 'United Kingdom', 
  'France', 'India', 'Italy', 'Brazil', 'Canada', 'South Korea',
  'Spain', 'Australia', 'Mexico', 'Indonesia', 'Netherlands',
  'Saudi Arabia', 'Turkey', 'Taiwan', 'Belgium', 'Argentina',
  'Thailand', 'Bangladesh', 'Egypt', 'Nigeria', 'Malaysia',
  'South Africa', 'Philippines', 'Chile', 'Finland', 'Romania'
];

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({ details, onUpdate }) => {
  const handleInputChange = (field: keyof ShipmentDetailsType, value: string | number) => {
    onUpdate({
      ...details,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Shipment Details
        </h2>
        <p className="text-gray-600">
          Provide information about your product and shipping requirements
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Origin and Destination */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Route</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="origin">Origin Country/Port</Label>
              <Select value={details.origin} onValueChange={(value) => handleInputChange('origin', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select origin country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="destination">Destination Country/Port</Label>
              <Select value={details.destination} onValueChange={(value) => handleInputChange('destination', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Product Information */}
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="weight">Total Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={details.weight || ''}
                onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                placeholder="Enter total weight"
              />
            </div>

            <div>
              <Label htmlFor="value">Product Value</Label>
              <div className="flex space-x-2">
                <Input
                  id="value"
                  type="number"
                  value={details.value || ''}
                  onChange={(e) => handleInputChange('value', parseFloat(e.target.value) || 0)}
                  placeholder="Enter product value"
                  className="flex-1"
                />
                <Select value={details.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="hsCode">HS Code (Optional)</Label>
              <Input
                id="hsCode"
                value={details.hsCode}
                onChange={(e) => handleInputChange('hsCode', e.target.value)}
                placeholder="e.g., 8517.12.00"
              />
              <p className="text-xs text-gray-500 mt-1">
                Harmonized System code for customs classification
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Description */}
      <Card>
        <CardHeader>
          <CardTitle>Product Description (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={details.productDescription || ''}
            onChange={(e) => handleInputChange('productDescription', e.target.value)}
            placeholder="Describe your product for more accurate cost calculations and risk assessment..."
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Summary */}
      {details.origin && details.destination && details.weight > 0 && details.value > 0 && (
        <Card className="bg-primary-50 border-primary-200">
          <CardHeader>
            <CardTitle className="text-primary-900">Shipment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-semibold text-primary-900">Route:</p>
                <p className="text-primary-800">{details.origin} → {details.destination}</p>
              </div>
              <div>
                <p className="font-semibold text-primary-900">Weight:</p>
                <p className="text-primary-800">{details.weight.toLocaleString()} kg</p>
              </div>
              <div>
                <p className="font-semibold text-primary-900">Value:</p>
                <p className="text-primary-800">{details.currency} {details.value.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-semibold text-primary-900">Value/kg:</p>
                <p className="text-primary-800">{details.currency} {(details.value / details.weight).toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ShipmentDetails;
