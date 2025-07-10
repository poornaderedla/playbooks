import React from 'react';

const toc = [
  { id: 'intro', label: 'Introduction: Beyond the Domestic Market' },
  { id: 'part-1', label: 'Part 1: The Foundation: Strategic Market and Competitor Analysis', subs: [
    { id: '1-1', label: '1.1 Frameworks for Strategic Market Selection' },
    { id: '1-2', label: '1.2 Deep-Dive Competitor Analysis: Knowing Your Battlefield' },
    { id: '1-3', label: '1.3 Understanding Market Share and Positioning' },
  ]},
  { id: 'part-2', label: 'Part 2: Product Adaptation: Going Global by Acting Local', subs: [
    { id: '2-1', label: '2.1 The Twin Drivers of Adaptation: Culture and Compliance' },
    { id: '2-2', label: '2.2 Case Studies in Adaptation: A Gallery of Success and Failure' },
    { id: '2-3', label: '2.3 The Regulatory Gauntlet: A Regional Compliance Guide' },
  ]},
  { id: 'part-3', label: 'Part 3: Mastering Export Pricing: A Comparative Strategy Guide', subs: [
    { id: '3-1', label: '3.1 The Five Pillars of Export Pricing: A Comparative Overview' },
    { id: '3-2', label: '3.2 Cost-Plus Pricing: The Foundation' },
    { id: '3-3', label: '3.3 Competitive Pricing: The Market Follower' },
    { id: '3-4', label: '3.4 Penetration Pricing: The Market Grab' },
    { id: '3-5', label: '3.5 Price Skimming: The Innovator\'s Reward' },
    { id: '3-6', label: '3.6 Value-Based Pricing: The Customer-Centric Approach' },
  ]},
  { id: 'part-4', label: 'Part 4: The Mechanics: Calculating Your Price and Managing Financial Risk', subs: [
    { id: '4-1', label: '4.1 Calculating Your Landed Cost: A Step-by-Step Guide' },
    { id: '4-2', label: '4.2 Understanding the Distribution Channel: Factoring in Margins' },
    { id: '4-3', label: '4.3 Managing Foreign Exchange (Forex) Risk' },
  ]},
  { id: 'part-5', label: 'Part 5: Navigating the Global Legal Landscape of Pricing', subs: [
    { id: '5-1', label: '5.1 Anti-Dumping and Countervailing Duties: The Price Floor' },
    { id: '5-2', label: '5.2 Predatory Pricing: The Intent to Harm' },
    { id: '5-3', label: '5.3 Transfer Pricing: The Internal Rulebook' },
  ]},
  { id: 'part-6', label: 'Part 6: The Exporter\'s Toolkit: Checklists, Templates, and Resources', subs: [
    { id: '6-1', label: '6.1 Actionable Checklists' },
    { id: '6-2', label: '6.2 Essential Templates' },
    { id: '6-3', label: '6.3 Curated Resources for the U.S. Exporter' },
  ]},
];

const BookIcon = () => (
  <span className="inline-block align-middle mr-2 text-xl" role="img" aria-label="book">
    📖
  </span>
);

const Playbook4TOC = ({ onTocClick, activeSection }) => (
  <nav className="mb-8 bg-gray-50 border rounded-lg p-4">
    <h2 className="text-lg font-semibold mb-2 flex items-center"><BookIcon /> Table of Contents</h2>
    <ul className="space-y-2">
      {toc.map((section) => (
        <li key={section.id}>
          <button
            onClick={() => onTocClick(section.id)}
            className={`w-full text-left px-2 py-2 rounded font-semibold text-base transition-colors truncate ${activeSection === section.id ? 'bg-purple-100 text-purple-700 toc-active' : 'hover:bg-gray-100'}`}
          >
            {section.label}
          </button>
          {section.subs && (
            <ul className="ml-4 mt-1 space-y-1">
              {section.subs.map((sub) => (
                <li key={sub.id}>
                  <button
                    onClick={() => onTocClick(sub.id)}
                    className={`w-full text-left px-2 py-1 rounded text-sm font-medium transition-colors truncate ${activeSection === sub.id ? 'bg-purple-100 text-purple-700 toc-active' : 'hover:bg-gray-100'}`}
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

export default Playbook4TOC; 