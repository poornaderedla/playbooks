import React from 'react';

const toc = [
  {
    id: 'part-i-foundations-of-global-logistics',
    label: 'Part I: Foundations of Global Logistics',
    children: [
      {
        id: 'assembling-your-team',
        label: '1. Assembling Your Team: Your Logistics Partners and the Global Trade Ecosystem',
        children: [
          {
            id: 'the-core-intermediaries',
            label: '1.1 The Core Intermediaries: Defining the Roles of Freight Forwarders and Customs Brokers',
            children: [
              { id: 'the-freight-forwarder', label: '1.1.1 The Freight Forwarder: Architect of the Shipment' },
              { id: 'the-customs-broker', label: '1.1.2 The Customs Broker: Guardian of the Border' },
            ],
          },
          { id: 'the-integrated-solution', label: '1.2 The Integrated Solution: Understanding Third-Party Logistics (3PL) Providers' },
          { id: 'the-convergence-of-services', label: '1.3 The Convergence of Services and the Rise of the "One-Stop-Shop"' },
          { id: 'guide-to-vetting', label: '1.4 A Guide to Vetting and Selecting Your Logistics Partner' },
          { id: 'understanding-credentials', label: '1.5 Understanding Credentials: The Importance of Licensing and Accreditation' },
        ],
      },
      { id: 'table-1-1', label: 'Table 1.1: Freight Forwarder vs. Customs Broker vs. 3PL Provider: A Comparative Overview' },
      { id: 'table-1-2', label: 'Table 1.2: Vetting Your Logistics Partner: A Comprehensive Checklist' },
    ],
  },
  {
    id: 'the-language-of-trade',
    label: '2. The Language of Trade: A Deep Dive into Incoterms® 2020',
    children: [
      { id: 'the-framework-explained', label: '2.1 The Framework Explained: What Incoterms® Do (and Do Not) Cover' },
      { id: 'scope-of-coverage', label: '2.1.1 Scope of Coverage: Defining Obligations' },
      { id: 'critical-exclusions', label: '2.1.2 Critical Exclusions: What Is Not Covered' },
      { id: 'the-11-incoterms-rules', label: '2.2 The 11 Incoterms® Rules: A Detailed Breakdown' },
      { id: 'group-1', label: '2.2.1 Group 1: Rules for Any Mode(s) of Transport' },
      { id: 'group-2', label: '2.2.2 Group 2: Rules for Sea and Inland Waterway Transport' },
      { id: 'key-changes-incoterms-2020', label: '2.3 Key Changes in Incoterms® 2020' },
      { id: 'strategic-selection', label: '2.4 Strategic Selection: Choosing the Right Incoterm' },
      { id: 'table-2-1', label: 'Table 2.1: Incoterms® 2020: A Comprehensive Chart of Responsibility, Cost, and Risk Transfer' },
      { id: 'table-2-2', label: 'Table 2.2: Scenario-Based Incoterm Selection Guide' },
    ],
  },
  {
    id: 'part-ii-the-physical-journey',
    label: 'Part II: The Physical Journey - Transport and Handling',
    children: [
      {
        id: 'choosing-your-mode',
        label: '3. Choosing Your Mode: A Strategic Analysis of International Transport',
        children: [
          { id: 'four-pillars-of-global-movement', label: '3.1 The Four Pillars of Global Movement: A Comparative Overview' },
          { id: 'table-3-1', label: 'Table 3.1: A Comparative Analysis of International Transportation Modes' },
          { id: 'ocean-freight-masterclass', label: '3.2 Ocean Freight Masterclass: The Workhorse of Global Trade' },
          { id: 'containerized-cargo-services', label: '3.2.1 Containerized Cargo Services' },
          { id: 'specialized-ocean-services', label: '3.2.2 Specialized Ocean Services' },
          { id: 'air-freight-masterclass', label: '3.3 Air Freight Masterclass: The Premium Choice for Speed' },
          { id: 'overland-transport', label: '3.4 Overland Transport: Road and Rail Freight' },
          { id: 'mapping-global-commerce', label: '3.5 Mapping Global Commerce: Major Trade Lanes, Ports, and Chokepoints' },
          { id: 'table-3-2', label: 'Table 3.2: Ocean Freight Service Selection Guide' },
          { id: 'table-3-3', label: 'Table 3.3: Air Freight Service Selection Guide' },
        ],
      },
      {
        id: 'preparing-your-cargo',
        label: '4. Preparing Your Cargo: Best Practices in Packaging, Labeling, and Stowage',
        children: [
          { id: 'science-of-protection', label: '4.1 The Science of Protection: International Packaging Standards' },
          { id: 'communicating-with-care', label: '4.2 Communicating with Care: A Visual Guide to Handling Marks and Labels' },
          { id: 'art-of-the-stow', label: '4.3 The Art of the Stow: Best Practices for Cargo Stowage and Load Planning' },
          { id: 'closer-look-container-types', label: '4.4 A Closer Look: Container Types, Dimensions, and Capacities' },
          { id: 'table-4-1', label: 'Table 4.1: ISO 780 Pictorial Handling Marks: A Visual Guide' },
          { id: 'table-4-2', label: 'Table 4.2: Shipping Container Specifications and Use Cases' },
          { id: 'table-4-3', label: 'Table 4.3: Export Packaging Compliance Checklist' },
        ],
      },
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

const Playbook5TOC = ({ onTocClick, activeSection }) => (
  <nav className="mb-8 bg-gray-50 border rounded-lg p-4">
    <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {renderToc(toc, onTocClick, activeSection)}
    </div>
  </nav>
);

export default Playbook5TOC; 