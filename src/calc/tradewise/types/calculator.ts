
export interface Incoterm {
  code: string;
  name: string;
  description: string;
  sellerResponsibility: string[];
  buyerResponsibility: string[];
  riskTransfer: string;
  costIncludes: string[];
  suitableFor: string[];
  category: 'any' | 'sea-inland';
}

export interface ShipmentDetails {
  origin: string;
  destination: string;
  weight: number;
  value: number;
  hsCode: string;
  currency: string;
  productDescription?: string;
}

export interface CostBreakdown {
  manufacturing: number;
  packaging: number;
  loading: number;
  freight: number;
  insurance: number;
  customs: number;
  delivery: number;
  markup: number;
}

export interface CalculatorData {
  selectedIncoterm: Incoterm | null;
  shipmentDetails: ShipmentDetails;
  costs: CostBreakdown;
  finalPrice: number;
}

export interface AIRecommendation {
  type: 'warning' | 'suggestion' | 'optimization';
  title: string;
  description: string;
  impact?: string;
}

export interface LegalClause {
  title: string;
  content: string;
  category: 'delivery' | 'risk' | 'payment' | 'insurance';
}
