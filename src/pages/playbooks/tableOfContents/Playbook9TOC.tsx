import React from 'react';

const toc = [
  { id: 'part-1', label: 'Part I: The Regulatory and Administrative Landscape', subsections: [
    { id: '1-1', label: '1.1 The Legal Bedrock: The Customs Act, 1962' },
    { id: '1-2', label: '1.2 The Governing Bodies: Navigating the Hierarchy' },
    { id: '1-3', label: '1.3 The Digital Backbone: ICEGATE and the Single Window System' },
  ]},
  { id: 'part-2', label: 'Part II: The Core Clearance Process: A Step-by-Step Guide', subsections: [
    { id: '2-1', label: '2.1 The Import Clearance Process' },
    { id: '2-2', label: '2.2 The Export Clearance Process' },
    { id: '2-3', label: '2.3 The Customs Broker: Your Essential Partner' },
  ]},
  { id: 'part-3', label: 'Part III: The Financials of Trade: Valuation, Duties, and Tariffs', subsections: [
    { id: '3-1', label: '3.1 The Foundation of Duty: Classification and Valuation' },
    { id: '3-2', label: '3.2 Deconstructing the Import Duty Calculation' },
    { id: '3-3', label: '3.3 Protective and Trade-Remedial Duties' },
    { id: '3-4', label: '3.4 Leveraging Free Trade Agreements (FTAs)' },
  ]},
  { id: 'part-4', label: 'Part IV: India's Foreign Trade Policy (FTP) 2023: Schemes and Incentives', subsections: [
    { id: '4-1', label: '4.1 Overview of FTP 2023' },
    { id: '4-2', label: '4.2 Duty Remission and Exemption Schemes' },
    { id: '4-3', label: '4.3 Capital Goods and Export Obligation' },
    { id: '4-4', label: '4.4 Emerging Areas and Exporter Recognition' },
  ]},
  { id: 'part-5', label: 'Part V: Advanced Customs Procedures and Special Cargo', subsections: [
    { id: '5-1', label: '5.1 Warehousing and Deferred Duty' },
    { id: '5-2', label: '5.2 Specialized Import Schemes' },
    { id: '5-3', label: '5.3 Handling Special and Sensitive Goods' },
  ]},
  { id: 'part-6', label: 'Part VI: Compliance, Risk, and Dispute Resolution', subsections: [
    { id: '6-1', label: '6.1 The Role of the Risk Management System (RMS)' },
    { id: '6-2', label: '6.2 Managing Customs Disputes' },
    { id: '6-3', label: '6.3 Refunds and Post-Clearance Audits' },
  ]},
  { id: 'part-7', label: 'Part VII: Practical Toolkit and Appendices', subsections: [
    { id: '7-1', label: 'Appendix A: Comprehensive Documentation Checklists' },
    { id: '7-2', label: 'Appendix B: Annotated Document Samples' },
    { id: '7-3', label: 'Appendix C: Process Flowcharts' },
    { id: '7-4', label: 'Appendix D: Key Acronyms and Glossary' },
  ]},
];

const Playbook9TOC = ({ onTocClick, activeSection }) => (
  <nav className="mb-8 bg-white border rounded-lg shadow-lg p-4 max-h-[420px] overflow-y-auto">
    <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
    <ul className="list-disc pl-6 space-y-1">
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

export default Playbook9TOC; 