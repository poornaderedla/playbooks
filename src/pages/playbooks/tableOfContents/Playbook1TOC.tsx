import React from 'react';

const toc = [
  { id: 'part-1', label: 'Part 1: The Strategic Foundation for Global Expansion', subsections: [
    { id: '1-1', label: '1.1 Beyond Borders: Why a Systematic Export Strategy is Non-Negotiable' },
    { id: '1-2', label: '1.2 Assessing Your Export Readiness: An Internal Audit' },
  ]},
  { id: 'part-2', label: 'Part 2: Mastering Export Market Research: The Art and Science of Data', subsections: [
    { id: '2-1', label: '2.1 The Two Pillars of Research: Secondary and Primary' },
    { id: '2-2', label: '2.2 Secondary (Desk) Research: Uncovering Global Opportunities from Your Office' },
    { id: '2-3', label: '2.3 Primary (Field) Research: Gaining Invaluable On-the-Ground Insight' },
  ]},
  { id: 'part-3', label: 'Part 3: The Three-Stage Market Selection Framework', subsections: [
    { id: '3-1', label: '3.1 Stage 1: High-Level Screening of Potential Markets' },
    { id: '3-2', label: '3.2 Stage 2: In-Depth Assessment of Target Markets' },
    { id: '3-3', label: '3.3 Stage 3: Drawing Conclusions and Finalizing Your Target Market(s)' },
  ]},
  { id: 'part-4', label: 'Part 4: Acquiring and Vetting Your International Partners', subsections: [
    { id: '4-1', label: '4.1 Channels for Finding Your First Buyer' },
    { id: '4-2', label: '4.2 The Critical Importance of Due Diligence: A Vetting Checklist' },
    { id: '4-3', label: '4.3 Formal Screening: Using International Watchlists' },
  ]},
  { id: 'part-5', label: 'Part 5: The Digital Frontier: Direct-to-Consumer (D2C) Exporting', subsections: [
    { id: '5-1', label: '5.1 Building Your Global E-commerce Storefront' },
    { id: '5-2', label: '5.2 Mastering E-commerce Localization: Beyond Translation' },
    { id: '5-3', label: '5.3 International SEO: Ensuring Global Visibility' },
    { id: '5-4', label: '5.4 Integrating a Multi-Currency Payment Gateway' },
    { id: '5-5', label: '5.5 Logistics for E-commerce: International Shipping for Small Businesses' },
  ]},
  { id: 'part-6', label: 'Part 6: Sealing the Deal: Contracts, Payments, and Logistics', subsections: [
    { id: '6-1', label: '6.1 The International Sales Contract: Your Legal Shield' },
    { id: '6-2', label: '6.2 International Payment Methods: Balancing Risk and Competitiveness' },
    { id: '6-3', label: '6.3 Understanding Your Shipping Obligations: A Guide to Incoterms® 2020' },
  ]},
  { id: 'part-7', label: "Part 7: The Exporter's Toolkit: Templates and Checklists", subsections: [] },
];

const Playbook1TOC = ({ onTocClick, activeSection }) => (
  <nav className="mb-8 bg-white border rounded-lg shadow-lg p-4 max-h-[420px] overflow-y-auto text-justify">
    <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
    <ul className="list-disc pl-6 space-y-1 text-justify">
      {toc.map((item) => (
        <li key={item.id}>
          <button onClick={() => onTocClick(item.id)} className={`text-primary-700 underline hover:text-primary-900 transition-colors ${activeSection === item.id ? 'font-bold' : ''}`}>{item.label}</button>
          {item.subsections && item.subsections.length > 0 && (
            <ul className="list-disc pl-6 space-y-1">
              {item.subsections.map((sub) => (
                <li key={sub.id}>
                  <button onClick={() => onTocClick(sub.id)} className={`text-primary-700 underline hover:text-primary-900 transition-colors ${activeSection === sub.id ? 'font-bold' : ''}`}>{sub.label}</button>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

export default Playbook1TOC; 