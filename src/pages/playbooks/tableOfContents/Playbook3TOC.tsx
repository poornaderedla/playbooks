import React from 'react';

const toc = [
  { id: 'part-1', label: 'Part I: Strategic Foundations of Global Sourcing', subsections: [
    { id: 'chapter-1', label: 'Chapter 1: Architecting Your Global Sourcing Strategy' },
    { id: '1-1', label: '1.1 Defining Business Objectives: Beyond Cost Reduction' },
    { id: '1-2', label: '1.2 Market Analysis and Country Selection' },
    { id: '1-3', label: '1.3 Developing a Category Strategy: Applying the Kraljic Matrix' },
    { id: '1-4', label: '1.4 Engaging Global Sourcing Specialists and Agencies' },
    { id: 'chapter-2', label: 'Chapter 2: Mastering Online B2B Sourcing Platforms' },
    { id: '2-1', label: '2.1 Deep Dive: Alibaba' },
    { id: '2-2', label: '2.2 Deep Dive: Global Sources' },
    { id: '2-3', label: '2.3 Deep Dive: ThomasNet' },
    { id: '2-4', label: '2.4 Deep Dive: Kompass' },
    { id: '2-5', label: 'Table 2.1: B2B Sourcing Platform Comparison Matrix' },
    { id: 'chapter-3', label: 'Chapter 3: The Art of In-Person Sourcing: Maximizing Trade Shows' },
    { id: '3-1', label: '3.1 Identifying and Preparing for Major International Trade Fairs' },
    { id: '3-2', label: '3.2 On-Site Engagement and Post-Show Follow-Up' },
  ]},
  { id: 'part-2', label: 'Part II: The Comprehensive Vetting Protocol', subsections: [
    { id: 'chapter-4', label: 'Chapter 4: The Comprehensive Vetting Protocol' },
    { id: '4-1', label: '4.1 Phase 1: Initial Screening' },
    { id: '4-2', label: '4.2 Phase 2: Deep-Dive Evaluation - The Supplier Audit' },
    { id: '4-3', label: '4.3 Phase 3: Qualification and Documentation' },
    { id: '4-4', label: '4.4 Visual Guide: The Supplier Onboarding Process Flowchart' },
  ]},
  { id: 'part-3', label: 'Part III: The Transaction: Negotiation, Contracts, and Payment', subsections: [
    { id: 'chapter-5', label: 'Chapter 5: Mastering International Negotiation' },
    { id: '5-1', label: '5.1 Preparation, Strategy, and Tactics' },
    { id: '5-2', label: '5.2 Navigating Cross-Cultural Negotiation Styles' },
    { id: 'chapter-6', label: 'Chapter 6: Structuring the International Sales Agreement' },
    { id: '6-1', label: '6.1 Essential Clauses' },
    { id: '6-2', label: '6.2 Governing Law: Understanding the UN CISG' },
    { id: '6-3', label: 'Template 6.1: Model International Sales Agreement' },
    { id: 'chapter-7', label: 'Chapter 7: Managing International Payments and Costs' },
    { id: '7-1', label: '7.1 A Comparative Guide to Payment Methods' },
    { id: '7-2', label: '7.2 Visual Guide: The Letter of Credit Process Flowchart' },
    { id: '7-3', label: '7.3 Calculating the True Cost: A Guide to Total Cost of Ownership (TCO) for Imports' },
    { id: '7-4', label: 'Template 7.1: Excel-based Landed Cost Calculator' },
  ]},
  { id: 'part-4', label: 'Part IV: Logistics, Customs, and Compliance', subsections: [
    { id: 'chapter-8', label: 'Chapter 8: Demystifying International Shipping and Logistics' },
    { id: '8-1', label: '8.1 Incoterms® 2020: A Rule-by-Rule Breakdown' },
    { id: '8-2', label: '8.2 Table: Incoterms® 2020 Responsibility Matrix' },
    { id: '8-3', label: '8.3 Visual Guide: The International Logistics Process' },
    { id: 'chapter-9', label: 'Chapter 9: Navigating Customs: Documentation and Valuation' },
    { id: '9-1', label: '9.1 Regional Deep Dive: USA' },
    { id: '9-2', label: '9.2 Regional Deep Dive: European Union' },
    { id: '9-3', label: '9.3 Regional Deep Dive: United Kingdom' },
    { id: '9-4', label: '9.4 Regional Deep Dive: India' },
  ]},
  { id: 'part-5', label: 'Part V: Building a Future-Proof Supply Chain', subsections: [
    { id: 'chapter-10', label: 'Chapter 10: Forging a Resilient Supply Chain' },
    { id: '10-1', label: '10.1 The Four Dimensions of Supply Chain Diversification' },
    { id: '10-2', label: '10.2 Visual Guide: A Strategy Map for Supply Chain Diversification' },
    { id: '10-3', label: '10.3 Implementing a Supply Chain Risk Assessment Matrix' },
    { id: '10-4', label: 'Template 10.1: Supply Chain Risk Assessment Matrix' },
    { id: 'chapter-11', label: 'Chapter 11: Leveraging Technology for a Competitive Edge' },
    { id: '11-1', label: '11.1 Supplier Relationship Management (SRM) Systems' },
    { id: '11-2', label: '11.2 ERP Systems in Procurement' },
    { id: '11-3', label: '11.3 The Power of Visibility: Real-Time Logistics and Tracking Platforms' },
  ]},
  { id: 'conclusion', label: 'Conclusion', subsections: [] },
];

const BookIcon = () => (
  <span className="inline-block align-middle mr-2 text-xl" role="img" aria-label="book">
    📖
  </span>
);

const Playbook3TOC = ({ onTocClick, activeSection, tocClassName = '' }) => (
  <nav className="mb-8 bg-white border rounded-lg shadow-lg p-4 max-h-[420px] overflow-y-auto">
    <h2 className="text-lg font-semibold mb-2 flex items-center">
      <BookIcon /> Table of Contents
    </h2>
    <ul className="list-none pl-0 space-y-1">
      {toc.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => onTocClick(item.id)}
            className={`w-full text-left px-2 py-1 rounded transition-colors ${activeSection === item.id ? `${tocClassName} bg-purple-200 text-purple-800 font-semibold` : 'text-gray-900 hover:bg-gray-100'}`}
          >
            {item.label}
          </button>
          {item.subsections && item.subsections.length > 0 && (
            <ul className="list-none pl-4 mt-1 space-y-1">
              {item.subsections.map((sub) => (
                <li key={sub.id}>
                  <button
                    onClick={() => onTocClick(sub.id)}
                    className={`w-full text-left px-2 py-1 rounded transition-colors ${activeSection === sub.id ? `${tocClassName} bg-purple-200 text-purple-800 font-semibold` : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {sub.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

export default Playbook3TOC; 