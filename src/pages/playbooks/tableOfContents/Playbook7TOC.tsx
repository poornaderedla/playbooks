import React from 'react';

const toc = [
  { id: 'section-1', label: 'Section 1' },
  { id: 'section-2', label: 'Section 2' },
  { id: 'section-3', label: 'Section 3' },
];

const Playbook7TOC = ({ onTocClick, activeSection }) => (
  <nav className="mb-8 bg-gray-50 border rounded-lg p-4">
    <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
    <ul className="list-disc pl-6 space-y-1">
      {toc.map((item) => (
        <li key={item.id}>
          <button onClick={() => onTocClick(item.id)} className={`text-primary-700 underline hover:text-primary-900 transition-colors ${activeSection === item.id ? 'font-bold' : ''}`}>{item.label}</button>
        </li>
      ))}
    </ul>
  </nav>
);

export default Playbook7TOC; 