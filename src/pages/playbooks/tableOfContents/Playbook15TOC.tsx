import React from "react";

const Playbook15TOC = () => (
  <nav className="mb-8 bg-gray-50 border rounded-lg p-4 text-justify">
    <h2 className="text-lg font-semibold mb-2 flex items-center">
      {/* Book icon SVG */}
      <svg className="w-5 h-5 mr-2 text-purple-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5V6.5A2.5 2.5 0 016.5 4H20v13M4 19.5V21a1 1 0 001 1h14a1 1 0 001-1v-1.5" />
      </svg>
      Table of Contents
    </h2>
    <ul className="list-disc pl-6 space-y-1 text-justify">
      <li><a href="#part-1">Part I: The Strategic Foundation of Global Trade</a>
        <ul className="list-decimal pl-6">
          <li><a href="#1-1">Chapter 1: Architecting Your Global Expansion: The Export Business Plan</a>
            <ul className="list-disc pl-6">
              <li><a href="#1-1-1">1.1 The 'Why' and 'What' of an Export Plan</a></li>
              <li><a href="#1-1-2">1.2 Section I: The Export Policy Commitment & Company Analysis</a>
                <ul className="list-disc pl-6">
                  <li><a href="#1-1-2-1">1.2.1 The Export Policy Commitment Statement</a></li>
                  <li><a href="#1-1-2-2">1.2.2 Company Readiness Assessment (Internal Audit)</a></li>
                  <li><a href="#1-1-2-3">1.2.3 Product/Service Export-Readiness</a></li>
                </ul>
              </li>
              <li><a href="#1-1-3">1.3 Section II: Market Research & Entry Strategy</a>
                <ul className="list-disc pl-6">
                  <li><a href="#1-1-3-1">1.3.1 Developing Research Questions</a></li>
                  <li><a href="#1-1-3-2">1.3.2 Market Identification and Prioritization</a></li>
                  <li><a href="#1-1-3-3">1.3.3 Competitive Analysis</a></li>
                  <li><a href="#1-1-3-4">1.3.4 Market Entry Strategy</a></li>
                </ul>
              </li>
              <li><a href="#1-1-4">1.4 Section III: The Marketing & Sales Component</a>
                <ul className="list-disc pl-6">
                  <li><a href="#1-1-4-1">1.4.1 Target Customer Profile</a></li>
                  <li><a href="#1-1-4-2">1.4.2 Pricing Strategy</a></li>
                  <li><a href="#1-1-4-3">1.4.3 Promotion and Sales Channels</a></li>
                </ul>
              </li>
              <li><a href="#1-1-5">1.5 Section IV: Operations, Logistics, and Legal</a>
                <ul className="list-disc pl-6">
                  <li><a href="#1-1-5-1">1.5.1 Order Fulfillment and Documentation</a></li>
                  <li><a href="#1-1-5-2">1.5.2 Logistics and Transportation</a></li>
                  <li><a href="#1-1-5-3">1.5.3 Legal and Compliance</a></li>
                </ul>
              </li>
              <li><a href="#1-1-6">1.6 Section V: The Financial Plan & Budget</a>
                <ul className="list-disc pl-6">
                  <li><a href="#1-1-6-1">1.6.1 Export Budget</a></li>
                  <li><a href="#1-1-6-2">1.6.2 Financial Projections</a></li>
                  <li><a href="#1-1-6-3">1.6.3 Funding Request</a></li>
                </ul>
              </li>
              <li><a href="#1-1-7">1.7 Section VI: Management, Monitoring & Forward Planning</a>
                <ul className="list-disc pl-6">
                  <li><a href="#1-1-7-1">1.7.1 Implementation Schedule</a></li>
                  <li><a href="#1-1-7-2">1.7.2 KPIs and Monitoring</a></li>
                  <li><a href="#1-1-7-3">1.7.3 Forward Planning</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li><a href="#1-2">Chapter 2: Scaling Your Export Business</a>
            <ul className="list-disc pl-6">
              <li><a href="#1-2-1">2.1 The Philosophy of Scaling: Beyond Ad-Hoc Sales</a></li>
              <li><a href="#1-2-2">2.2 Strategy 1: Market Diversification</a>
                <ul className="list-disc pl-6">
                  <li><a href="#1-2-2-1">2.2.1 The Rationale for Diversification</a></li>
                  <li><a href="#1-2-2-2">2.2.2 A Systematic Approach to Diversification</a></li>
                </ul>
              </li>
              <li><a href="#1-2-3">2.3 Strategy 2: Operational Scaling and Automation</a>
                <ul className="list-disc pl-6">
                  <li><a href="#1-2-3-1">2.3.1 Building a Global Team and Optimizing Logistics</a></li>
                  <li><a href="#1-2-3-2">2.3.2 The Critical Role of Automation in Export Operations</a></li>
                </ul>
              </li>
              <li><a href="#1-2-4">2.4 Strategy 3: Leveraging Government and Institutional Support</a></li>
            </ul>
          </li>
          <li><a href="#1-3">Chapter 3: Forging Global Alliances: Agents, Distributors, and Strategic Partnerships</a>
            <ul className="list-disc pl-6">
              <li><a href="#1-3-1">3.1 The Strategic Importance of Local Partners</a></li>
              <li><a href="#1-3-2">3.2 Finding and Selecting the Right Partner: A Methodical Approach</a>
                <ul className="list-disc pl-6">
                  <li><a href="#1-3-2-1">3.2.1 Initial Screening and Evaluation</a></li>
                  <li><a href="#1-3-2-2">3.2.2 Legal and Compliance Due Diligence</a></li>
                </ul>
              </li>
              <li><a href="#1-3-3">3.3 Formalizing the Partnership: Agreements and MOUs</a>
                <ul className="list-disc pl-6">
                  <li><a href="#1-3-3-1">3.3.1 The International Distribution Agreement</a></li>
                  <li><a href="#1-3-3-2">3.3.2 The Memorandum of Understanding (MOU)</a></li>
                </ul>
              </li>
              <li><a href="#1-3-4">3.4 Managing the Partnership for Long-Term Success</a></li>
              <li><a href="#1-3-5">3.5 Navigating the End of the Partnership: Termination</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li><a href="#part-2">Part II: The Regulatory and Compliance Framework</a>
        <ul className="list-decimal pl-6">
          <li><a href="#2-1">Chapter 6: The Exporter's Legal Compass: Mastering Compliance and Controls</a>
            <ul className="list-disc pl-6">
              <li><a href="#2-1-1">6.1 The "Why" of Export Controls: A Geopolitical Primer</a></li>
              <li><a href="#2-1-2">6.2 The U.S. Export Control Regime: Navigating the EAR</a>
                <ul className="list-disc pl-6">
                  <li><a href="#2-1-2-1">6.2.1 The Core Compliance Process</a></li>
                  <li><a href="#2-1-2-2">6.2.2 Key Prohibited Parties Lists</a></li>
                </ul>
              </li>
              <li><a href="#2-1-3">6.3 The E.U. Export Control Regime: The Dual-Use Regulation</a>
                <ul className="list-disc pl-6">
                  <li><a href="#2-1-3-1">6.3.1 The Core Compliance Process</a></li>
                  <li><a href="#2-1-3-2">6.3.2 Types of Authorizations</a></li>
                </ul>
              </li>
              <li><a href="#2-1-4">6.4 Practical Compliance and Best Practices</a></li>
            </ul>
          </li>
          <li><a href="#2-2">Chapter 7: Overcoming Obstacles: Dealing with Trade Barriers and Disputes</a>
            <ul className="list-disc pl-6">
              <li><a href="#2-2-1">7.1 Understanding the Landscape of Trade Barriers</a></li>
              <li><a href="#2-2-2">7.2 Strategic Solutions for Overcoming Trade Barriers</a></li>
              <li><a href="#2-2-3">7.3 Handling International Trade Disputes</a>
                <ul className="list-disc pl-6">
                  <li><a href="#2-2-3-1">7.3.1 The Nature of Trade Disputes</a></li>
                  <li><a href="#2-2-3-2">7.3.2 The WTO Dispute Settlement Mechanism</a></li>
                  <li><a href="#2-2-3-3">7.3.3 The Reality of Enforcement</a></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li><a href="#part-3">Part III: The Digital Exporter's Toolkit</a>
        <ul className="list-decimal pl-6">
          <li><a href="#3-1">Chapter 10: The Art of Digital Persuasion: Lead Generation and Nurturing</a>
            <ul className="list-disc pl-6">
              <li><a href="#3-1-1">10.1 Creating Export-Ready Product Listings</a>
                <ul className="list-disc pl-6">
                  <li><a href="#3-1-1-1">10.1.1 Key Components of a High-Converting Listing</a></li>
                </ul>
              </li>
              <li><a href="#3-1-2">10.2 Social Media for Exporters: Mastering LinkedIn B2B Outreach</a>
                <ul className="list-disc pl-6">
                  <li><a href="#3-1-2-1">10.2.1 The Strategic Outreach Process</a></li>
                </ul>
              </li>
              <li><a href="#3-1-3">10.3 The Exporter's Email & Lead Nurturing Playbook</a>
                <ul className="list-disc pl-6">
                  <li><a href="#3-1-3-1">10.3.1 Building the Nurture Sequence</a></li>
                  <li><a href="#3-1-3-2">10.3.2 Crafting Effective Nurturing Emails</a></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
);

export default Playbook15TOC; 