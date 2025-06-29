import React from 'react';
import { Link } from 'react-router-dom';

const Calculators = () => (
  <>
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-primary-700">Export-Import Cost Calculator – Calculate Duties, Taxes & Shipping with Ease</h1>
      <ul className="list-disc pl-6 space-y-3 text-base text-gray-700">
        <li>
          Instantly estimates the total landed cost of importing or exporting goods, including product value, freight, insurance, customs duties, and applicable taxes.
        </li>
        <li>
          Provides detailed cost breakdowns for GST, IGST, CESS, and other charges based on destination country and product type.
        </li>
        <li>
          Supports real-time currency conversion, allowing users to view results in multiple currencies for global transactions.
        </li>
        <li>
          Allows users to download the final cost summary as a PDF or share it via email for business use or documentation.
        </li>
      </ul>
    </div>
    <div className="max-w-2xl mx-auto mt-10 mb-16 flex flex-col md:flex-row gap-6">
      <div className="flex-1 bg-white border rounded-lg shadow p-6 flex flex-col items-center justify-between">
        <h2 className="text-lg font-semibold mb-4 text-primary-800 text-center">Incoterms®-Based Price Calculator</h2>
        <Link to="/resources/calculators/incoterms" className="mt-auto px-6 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors">Calculate</Link>
      </div>
      <div className="flex-1 bg-white border rounded-lg shadow p-6 flex flex-col items-center justify-between">
        <h2 className="text-lg font-semibold mb-4 text-primary-800 text-center">Total Landed Cost (TLC) Calculator</h2>
        <Link to="/resources/calculators/tlc" className="mt-auto px-6 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors">Calculate</Link>
      </div>
    </div>
  </>
);

export default Calculators; 