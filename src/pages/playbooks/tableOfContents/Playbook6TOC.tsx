import React from 'react';

const toc = [
  {
    id: 'part-i-foundations-of-global-trade-language',
    label: 'Part I: The Foundations of Global Trade Language',
    children: [
      {
        id: 'introduction-to-incoterms-2020',
        label: 'Chapter 1: Introduction to Incoterms® 2020: The DNA of International Sales Contracts',
        children: [
          { id: 'what-are-incoterms', label: '1.1 What are Incoterms®? More Than Just Three-Letter Acronyms' },
          { id: 'three-pillars', label: '1.2 The Three Pillars: Defining Obligations, Allocating Costs, and Transferring Risk' },
          { id: 'critical-boundaries', label: '1.3 The Critical Boundaries: What Incoterms® Do Not Cover' },
          { id: 'two-families-of-rules', label: '1.4 The Two Families of Rules: Understanding the Distinction' },
        ],
      },
      { id: 'table-1-1', label: 'Table 1.1: Incoterms® 2020 At-a-Glance' },
    ],
  },
  {
    id: 'part-ii-deep-dive-11-rules',
    label: 'Part II: A Deep Dive into the 11 Rules',
    children: [
      {
        id: 'comprehensive-guide-incoterms-2020',
        label: 'Chapter 2: The Comprehensive Guide to the Incoterms® 2020 Rules',
        children: [
          { id: 'exw-ex-works', label: '2.1 EXW – Ex Works (...named place of delivery)' },
          { id: 'fca-free-carrier', label: '2.2 FCA – Free Carrier (...named place of delivery)' },
          { id: 'cpt-carriage-paid-to', label: '2.3 CPT – Carriage Paid To (...named place of destination)' },
          { id: 'cip-carriage-insurance-paid', label: '2.4 CIP – Carriage and Insurance Paid To (...named place of destination)' },
          { id: 'dap-delivered-at-place', label: '2.5 DAP – Delivered at Place (...named place of destination)' },
          { id: 'dpu-delivered-place-unloaded', label: '2.6 DPU – Delivered at Place Unloaded (...named place of destination)' },
          { id: 'ddp-delivered-duty-paid', label: '2.7 DDP – Delivered Duty Paid (...named place of destination)' },
          { id: 'fas-free-alongside-ship', label: '2.8 FAS – Free Alongside Ship (...named port of shipment)' },
          { id: 'fob-free-on-board', label: '2.9 FOB – Free on Board (...named port of shipment)' },
          { id: 'cfr-cost-freight', label: '2.10 CFR – Cost and Freight (...named port of destination)' },
          { id: 'cif-cost-insurance-freight', label: '2.11 CIF – Cost, Insurance, and Freight (...named port of destination)' },
        ],
      },
      { id: 'table-2-1', label: 'Table 2.1: The Master Incoterms® 2020 Responsibility Matrix' },
    ],
  },
  {
    id: 'part-iii-navigating-modern-trade-landscape',
    label: 'Part III: Navigating the Modern Trade Landscape',
    children: [
      {
        id: 'evolution-of-rules',
        label: 'Chapter 3: The Evolution of the Rules: Key Changes from Incoterms® 2010 to 2020',
        children: [
          { id: 'dat-to-dpu', label: '3.1 From DAT to DPU: More Than a Name Change' },
          { id: 'fca-solution', label: '3.2 The FCA Solution: Resolving the Bill of Lading Dilemma' },
          { id: 'new-standard-insurance', label: '3.3 A New Standard for Insurance: The Divergence of CIP and CIF' },
          { id: 'accommodating-modern-logistics', label: '3.4 Accommodating Modern Logistics: Provisions for Own Transport' },
          { id: 'enhanced-clarity', label: '3.5 Enhanced Clarity: Consolidated Cost Listings and Security Requirements' },
        ],
      },
      { id: 'table-3-1', label: 'Table 3.1: Incoterms® 2010 vs. 2020: A Comparative Analysis' },
      {
        id: 'strategic-selection',
        label: 'Chapter 4: Strategic Selection: Choosing the Right Incoterm® for Your Business',
        children: [
          { id: 'sellers-perspective', label: '4.1 A Seller\'s Perspective: Maximizing Control and Minimizing Risk' },
          { id: 'buyers-perspective', label: '4.2 A Buyer\'s Perspective: Optimizing Costs and Ensuring Supply Chain Security' },
          { id: 'container-conundrum', label: '4.3 The Container Conundrum: Why FCA is the New FOB for Containerized Freight' },
          { id: 'incoterms-letters-credit', label: '4.4 Incoterms® and Letters of Credit: Aligning Trade Terms with Financial Instruments' },
        ],
      },
    ],
  },
  {
    id: 'part-iv-risk-management-legal-context',
    label: 'Part IV: Risk Management and Legal Context',
    children: [
      {
        id: 'documentation-customs-compliance',
        label: 'Chapter 5: Documentation, Customs, and Compliance',
        children: [
          { id: 'essential-paper-trail', label: '5.1 The Essential Paper Trail: Key Documents in an International Transaction' },
          { id: 'navigating-customs', label: '5.2 Navigating Customs: Export and Import Clearance Responsibilities' },
          { id: 'insurance-obligations', label: '5.3 Insurance Obligations Under CIF and CIP: A Legal and Practical Analysis' },
        ],
      },
      { id: 'table-5-1', label: 'Table 5.1: Documentation & Customs Checklist by Incoterm® Group' },
      {
        id: 'avoiding-costly-mistakes',
        label: 'Chapter 6: Avoiding Costly Mistakes: Common Pitfalls and Real-World Case Studies',
        children: [
          { id: 'top-10-incoterms-errors', label: '6.1 The Top 10 Incoterms® Errors and How to Prevent Them' },
          { id: 'case-study-analysis', label: '6.2 Case Study Analysis: Lessons from Real-World Disputes' },
        ],
      },
    ],
  },
  {
    id: 'part-v-broader-legal-commercial-context',
    label: 'Part V: The Broader Legal and Commercial Context',
    children: [
      {
        id: 'integrating-incoterms-sales-contract',
        label: 'Chapter 7: Beyond the Three Letters: Integrating Incoterms® into Your Sales Contract',
        children: [
          { id: 'sales-contract-master-document', label: '7.1 The Sales Contract as the Master Document' },
          { id: 'defining-transfer-title', label: '7.2 Defining Transfer of Title: Sample Clauses and Best Practices' },
          { id: 'preparing-unexpected', label: '7.3 Preparing for the Unexpected: The Force Majeure Clause' },
          { id: 'governing-law-dispute-resolution', label: '7.4 Governing Law and Dispute Resolution' },
          { id: 'practice-modifying-incoterms', label: '7.5 The Practice of Modifying Incoterms®: Benefits and Dangers' },
        ],
      },
    ],
  },
  {
    id: 'part-vi-appendices-resources',
    label: 'Part VI: Appendices and Resources',
    children: [
      { id: 'appendix-a', label: 'Appendix A: Glossary of International Trade Terminology' },
      { id: 'appendix-b', label: 'Appendix B: Sample Cost Allocation (A9/B9) for FCA Incoterms® 2020' },
      { id: 'appendix-c', label: 'Appendix C: Recommended Resources and Further Reading' },
      { id: 'appendix-d', label: 'Appendix D: Frequently Asked Questions (FAQ)' },
      { id: 'appendix-e', label: 'Appendix E: Visual Guides to Incoterms® 2020' },
    ],
  },
];

function renderToc(items, onTocClick, activeSection, level = 0) {
  return (
    <ul className={level === 0 ? 'list-disc pl-6 space-y-1' : 'list-circle pl-4 space-y-1'}>
      {items.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => onTocClick(item.id)}
            className={`text-primary-700 underline hover:text-primary-900 transition-colors ${activeSection === item.id ? 'font-bold' : ''}`}
          >
            {item.label}
          </button>
          {item.children && renderToc(item.children, onTocClick, activeSection, level + 1)}
        </li>
      ))}
    </ul>
  );
}

const Playbook6TOC = ({ onTocClick, activeSection }) => (
  <nav className="mb-8 bg-gray-50 border rounded-lg p-4">
    <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {renderToc(toc, onTocClick, activeSection)}
    </div>
  </nav>
);

export default Playbook6TOC; 