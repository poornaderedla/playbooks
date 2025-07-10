import React from 'react';
import { Link } from 'react-router-dom';

const playbooks = [
  { title: 'The Definitive Playbook for Export Market Identification and Entry', path: '/resources/playbooks/1' },
  { title: 'Global Trade Playbook_Indian Focus', path: '/resources/playbooks/2' },
  { title: 'Global Sourcing and Procurement Playbook', path: '/resources/playbooks/3' },
  { title: 'Export Product and Pricing Playbook', path: '/resources/playbooks/4' },
  { title: 'International Logistics Playbook Development', path: '/resources/playbooks/5' },
  { title: 'Incoterms 2020 _ Comprehensive Export Guide', path: '/resources/playbooks/6' },
  { title: 'Export Payment and Finance Playbook', path: '/resources/playbooks/7' },
  { title: 'Export-Import Documentation_Comprehensive Playbook', path: '/resources/playbooks/8' },
  { title: 'Indian Customs Clearance Playbook', path: '/resources/playbooks/9' },
  { title: 'India FTA Playbook_Comprehensive Guide', path: '/resources/playbooks/10' },
  { title: 'Cross-border E-commerce Global Playbook', path: '/resources/playbooks/11' },
  { title: 'International Trade Risk Management Playbook', path: '/resources/playbooks/12' },
  { title: 'Export-Import Playbook _USA & EU', path: '/resources/playbooks/13' },
  { title: 'Indian Exporter Registration Playbook', path: '/resources/playbooks/14' },
  { title: 'Export_import playbook development guide', path: '/resources/playbooks/15' },
  { title: 'Incoterms® 2020: A Comprehensive Legal and Commercial Analysis for International Trade Professionals', path: '/resources/playbooks/16' },
  { title: 'Export-Import operational playbooks development', path: '/resources/playbooks/17' },
];

const Playbooks = () => (
  <>
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-primary-700">Export-Import Playbooks – Step-by-Step Guides for Success</h1>
      <ul className="list-disc pl-6 space-y-3 text-base text-gray-700">
        <li>Comprehensive guides covering every stage of the export-import process.</li>
        <li>Actionable checklists, templates, and best practices for exporters and importers.</li>
        <li>Expert tips to avoid common pitfalls and ensure compliance with regulations.</li>
        <li>Downloadable resources for easy reference and implementation.</li>
      </ul>
    </div>
    <div className="max-w-5xl mx-auto mt-10 mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {playbooks.map((pb, idx) => (
        <div key={idx} className="flex-1 bg-white border rounded-lg shadow p-6 flex flex-col items-center justify-between">
          <h2 className="text-lg font-semibold mb-4 text-primary-800 text-center">{pb.title}</h2>
          <Link to={pb.path} className="mt-auto px-6 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors">View</Link>
        </div>
      ))}
    </div>
  </>
);

export default Playbooks; 