import React, { useState, useRef, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const sections = [
  {
    id: 'part-i-foundations-of-global-trade-language',
    label: 'Part I: The Foundations of Global Trade Language',
    subs: [
      {
        id: 'introduction-to-incoterms-2020',
        label: 'Chapter 1: Introduction to Incoterms® 2020: The DNA of International Sales Contracts',
        subs: [
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
    subs: [
      {
        id: 'comprehensive-guide-incoterms-2020',
        label: 'Chapter 2: The Comprehensive Guide to the Incoterms® 2020 Rules',
        subs: [
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
    subs: [
      {
        id: 'evolution-of-rules',
        label: 'Chapter 3: The Evolution of the Rules: Key Changes from Incoterms® 2010 to 2020',
        subs: [
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
        subs: [
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
    subs: [
      {
        id: 'documentation-customs-compliance',
        label: 'Chapter 5: Documentation, Customs, and Compliance',
        subs: [
          { id: 'essential-paper-trail', label: '5.1 The Essential Paper Trail: Key Documents in an International Transaction' },
          { id: 'navigating-customs', label: '5.2 Navigating Customs: Export and Import Clearance Responsibilities' },
          { id: 'insurance-obligations', label: '5.3 Insurance Obligations Under CIF and CIP: A Legal and Practical Analysis' },
        ],
      },
      { id: 'table-5-1', label: 'Table 5.1: Documentation & Customs Checklist by Incoterm® Group' },
      {
        id: 'avoiding-costly-mistakes',
        label: 'Chapter 6: Avoiding Costly Mistakes: Common Pitfalls and Real-World Case Studies',
        subs: [
          { id: 'top-10-incoterms-errors', label: '6.1 The Top 10 Incoterms® Errors and How to Prevent Them' },
          { id: 'case-study-analysis', label: '6.2 Case Study Analysis: Lessons from Real-World Disputes' },
        ],
      },
    ],
  },
  {
    id: 'part-v-broader-legal-commercial-context',
    label: 'Part V: The Broader Legal and Commercial Context',
    subs: [
      {
        id: 'integrating-incoterms-sales-contract',
        label: 'Chapter 7: Beyond the Three Letters: Integrating Incoterms® into Your Sales Contract',
        subs: [
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
    subs: [
      { id: 'appendix-a', label: 'Appendix A: Glossary of International Trade Terminology' },
      { id: 'appendix-b', label: 'Appendix B: Sample Cost Allocation (A9/B9) for FCA Incoterms® 2020' },
      { id: 'appendix-c', label: 'Appendix C: Recommended Resources and Further Reading' },
      { id: 'appendix-d', label: 'Appendix D: Frequently Asked Questions (FAQ)' },
      { id: 'appendix-e', label: 'Appendix E: Visual Guides to Incoterms® 2020' },
    ],
  },
];

// Flatten all ids for scroll tracking
const flattenIds = (arr) => arr.flatMap(s => [s.id, ...(s.subs ? flattenIds(s.subs) : [])]);
const sectionIds = flattenIds(sections);

const Playbook6 = () => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef(null);
  const tocRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let found = false;
      const lastSectionId = sectionIds[sectionIds.length - 1];
      
      // Check if we're at the very end of the content
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px tolerance
        
        if (isAtBottom) {
          setActiveSection(lastSectionId);
          found = true;
        }
      }
      
      // If not at bottom, check for sections in view
      if (!found) {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 120) {
              setActiveSection(sectionIds[i]);
              found = true;
              break;
            }
          }
        }
      }
      
      // If still no section found, keep the last section highlighted
      if (!found) setActiveSection(lastSectionId || '');
      
      if (tocRef.current) {
        const activeBtn = tocRef.current.querySelector('.toc-active');
        if (activeBtn && typeof activeBtn.scrollIntoView === 'function') {
          activeBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }

      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        const totalScrollable = scrollHeight - clientHeight;
        const percent = totalScrollable > 0 ? Math.min(100, Math.max(0, (scrollTop / totalScrollable) * 100)) : 0;
        setProgress(percent);
      }
    };
    const contentNode = contentRef.current;
    const tocNode = tocRef.current;
    if (contentNode) contentNode.addEventListener('scroll', handleScroll, true);
    if (tocNode) tocNode.addEventListener('scroll', handleScroll, true);
    document.addEventListener('scroll', handleScroll, true);
    return () => {
      if (contentNode) contentNode.removeEventListener('scroll', handleScroll, true);
      if (tocNode) tocNode.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  const handleTocClick = (id) => {
    setTocOpen(false);
    const el = document.getElementById(id);
    if (el && contentRef.current) {
      contentRef.current.scrollTo({
        top: el.offsetTop - 24,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  // Recursive TOC rendering
  const renderToc = (items, level = 0) => (
    <ul className={level === 0 ? 'space-y-2' : 'ml-4 mt-1 space-y-1'}>
      {items.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => handleTocClick(item.id)}
            className={`w-full text-left px-2 py-2 rounded font-semibold text-base transition-colors truncate ${activeSection === item.id ? 'bg-purple-100 text-purple-700 toc-active' : 'hover:bg-gray-100'}`}
            style={{ fontWeight: level > 0 ? 500 : 700, fontSize: level > 0 ? '0.95em' : '1em' }}
          >
            {item.label}
          </button>
          {item.subs && renderToc(item.subs, level + 1)}
        </li>
      ))}
    </ul>
  );

  // Recursive content rendering
  const renderContent = (items, level = 0) => (
    <>
      {items.map((item) => (
        <section id={item.id} key={item.id} className={`mb-8 ${level === 0 ? '' : 'ml-4'}`}>
          <h2 className={`font-bold mb-3 truncate ${level === 0 ? 'text-xl' : 'text-lg'}`}>{item.label}</h2>
          {item.subs && renderContent(item.subs, level + 1)}
          {!item.subs && <p>Content coming soon...</p>}
        </section>
      ))}
    </>
  );

  return (
    <div className="font-sans bg-gray-50 min-h-screen w-full">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-6 mt-4 font-serif">The Incoterms® 2020 Playbook: A Comprehensive Guide for Global Trade</h1>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 h-[80vh] md:h-[85vh]">
        {/* Sidebar TOC */}
        <aside className="lg:w-1/4 w-full flex-shrink-0 mb-4 lg:mb-0">
          {/* Mobile TOC toggle */}
          <div className="lg:hidden flex justify-between items-center mb-2">
            <span className="font-bold text-base truncate">📖 Table of Contents</span>
            <button onClick={() => setTocOpen(!tocOpen)} className="px-3 py-1 rounded bg-primary-100 text-primary-700 font-semibold">{tocOpen ? 'Close' : 'Open'}</button>
          </div>
          <div
            ref={tocRef}
            className={`bg-white border rounded-lg shadow-lg p-4 max-h-[70vh] overflow-y-auto hidden lg:block ${tocOpen ? '!block' : ''}`}
            style={{ maxHeight: '70vh', overflowY: 'auto' }}
          >
            <div className="sticky top-0 z-20 bg-white pb-2 mb-2">
              <span className="font-bold text-base flex items-center truncate">📖 Table of Contents</span>
            </div>
            {renderToc(sections)}
          </div>
          {/* Mobile TOC drawer */}
          {tocOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-30" onClick={() => setTocOpen(false)} />
          )}
          <div
            className={`lg:hidden fixed top-0 left-0 z-50 w-3/4 max-w-xs h-full bg-white border-r shadow-lg p-4 transition-transform duration-300 ${tocOpen ? 'translate-x-0' : '-translate-x-full'}`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <div className="sticky top-0 z-20 bg-white pb-2 mb-2">
              <span className="font-bold text-base flex items-center truncate">📖 Table of Contents</span>
            </div>
            {renderToc(sections)}
          </div>
          {/* Reading Progress Bar (Desktop) */}
          <div className="mt-4 hidden lg:block">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">Reading Progress</span>
              <span className="text-xs font-semibold text-gray-700">{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          {/* Reading Progress Bar (Mobile) */}
          <div className="mt-4 lg:hidden">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">Reading Progress</span>
              <span className="text-xs font-semibold text-gray-700">{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </aside>
        {/* Main Content */}
        <main
          ref={contentRef}
          className="flex-1 bg-white rounded-lg shadow p-4 md:p-6 overflow-y-auto h-full text-justify"
          style={{ scrollBehavior: 'smooth', fontFamily: 'Inter, sans-serif', textAlign: 'justify', textJustify: 'inter-word' }}
        >
          {/* Part I: Foundations of Global Trade Language */}
          <section id="part-i-foundations-of-global-trade-language" className="mb-8">
            <h2 className="text-xl font-bold mb-3 truncate">Part I: The Foundations of Global Trade Language</h2>
            
            {/* Chapter 1 */}
            <section id="introduction-to-incoterms-2020" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Chapter 1: Introduction to Incoterms® 2020: The DNA of International Sales Contracts</h2>
              
              {/* 1.1 */}
              <section id="what-are-incoterms" className="mb-6 ml-4">
                <h2 className="text-lg font-bold mb-3 truncate">1.1 What are Incoterms®? More Than Just Three-Letter Acronyms</h2>
                <p>In the complex world of international commerce, clarity and precision are paramount. Misunderstandings between buyers and sellers separated by vast distances, different languages, and divergent legal systems can lead to costly delays, disputes, and damaged business relationships. To mitigate these risks, the global business community relies on a standardized set of rules known as Incoterms®, an abbreviation for International Commercial Terms.</p>
                <p>Published by the International Chamber of Commerce (ICC), the Incoterms® rules are a set of eleven pre-defined, three-letter trade terms that provide a universal language for international sales transactions. First introduced in 1936, they have been periodically updated to reflect the evolution of global trade, with the current version being Incoterms® 2020, which came into effect on January 1, 2020. Their purpose is to provide a globally accepted framework that clearly defines the respective responsibilities of sellers and buyers, thereby reducing the potential for legal complications and fostering confidence in the global trading system.</p>
                <p>It is essential to understand that the use of Incoterms® is entirely voluntary; they are not international law or legislation. However, their universal acceptance by governments, legal authorities, and businesses worldwide makes them a fundamental component of international trade. They become legally binding and enforceable only when they are explicitly incorporated into a contract for the sale of goods.</p>
                <p>A critical aspect of using these rules correctly is the need to specify the version being used. While the ICC recommends using Incoterms® 2020, parties to a contract are free to agree upon an earlier version, such as Incoterms® 2010. Failure to specify the year (e.g., writing only "FOB Shanghai") can create significant ambiguity. If no year is stated in a contract created after January 1, 2020, the Incoterms® 2020 rules will generally be assumed to apply by default. The correct format is always:</p>
                <p className="font-semibold">[Incoterm® rule][Named port/place/point] Incoterms® 2020.</p>
              </section>

              {/* 1.2 */}
              <section id="three-pillars" className="mb-6 ml-4">
                <h2 className="text-lg font-bold mb-3 truncate">1.2 The Three Pillars: Defining Obligations, Allocating Costs, and Transferring Risk</h2>
                <p>The power and utility of the Incoterms® rules rest on three foundational pillars that govern the physical and financial journey of goods from seller to buyer. Understanding these pillars is the first step to mastering the rules.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Pillar 1: Obligations (Who does what?)</b> The rules provide a detailed checklist of tasks, clearly assigning responsibility for each to either the seller or the buyer. These obligations encompass the entire logistical chain, including arranging for transportation, obtaining cargo insurance, handling export and import customs clearance, and providing the necessary documentation to prove delivery and facilitate payment. For example, under a DDP (Delivered Duty Paid) term, the seller is obligated to handle virtually every task, whereas under an EXW (Ex Works) term, the buyer is responsible for almost everything.</li>
                  <li><b>Pillar 2: Cost Allocation (Who pays for what?)</b> Each Incoterm® rule precisely allocates the various costs incurred during a shipment. This includes the costs of inland transport at origin and destination, export and import duties and taxes, terminal handling charges (THC) at ports or airports, and the main freight for sea, air, or land transport. The Incoterms® 2020 revision made a significant improvement in this area by consolidating all cost-related provisions into a single, comprehensive article (A9 for the seller, B9 for the buyer) for each rule. This "one-stop list of costs" provides greater clarity and helps prevent disputes over unexpected charges.</li>
                  <li><b>Pillar 3: Risk Transfer (Who is responsible if goods are lost or damaged?)</b> This is arguably the most critical and frequently misunderstood function of the Incoterms® rules. Each rule defines a single, precise point in the shipping journey where the risk of loss or damage to the goods transfers from the seller to the buyer. This point of risk transfer is the pivot around which the entire transaction turns. For instance, under an FOB (Free on Board) term, risk transfers the moment the goods are loaded on board the vessel at the port of origin. If the ship sinks mid-voyage, the loss is borne by the buyer. Conversely, under a DAP (Delivered at Place) term, risk does not transfer until the goods arrive at the named destination, ready for unloading. If the truck carrying the goods crashes en route, the loss is borne by the seller. A failure to understand this critical point can expose a party to catastrophic financial loss.</li>
                </ul>
              </section>

              {/* 1.3 */}
              <section id="critical-boundaries" className="mb-6 ml-4">
                <h2 className="text-lg font-bold mb-3 truncate">1.3 The Critical Boundaries: What Incoterms® Do Not Cover</h2>
                <p>Just as important as knowing what Incoterms® do is understanding what they do not do. They are an essential part of a sales contract, but they are not a complete contract of sale in themselves. Several crucial aspects of an international transaction fall outside their scope and must be explicitly defined elsewhere in the commercial agreement. Overlooking these boundaries is a common and costly error.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Transfer of Title or Ownership:</b> This is the most pervasive misconception about Incoterms®. The rules do not, under any circumstances, govern the transfer of legal ownership of the goods from the seller to the buyer. The point of risk transfer is not the same as the point of title transfer. Ownership is a separate legal matter that must be explicitly addressed in the sales contract, typically through a "Retention of Title" (RoT) clause, which might state that the seller retains ownership until payment has been received in full.</li>
                  <li><b>Price, Payment Method, and Timing:</b> Incoterms® do not regulate the price of the goods, the currency of payment, or the payment terms. Whether the payment is made via a Letter of Credit, Documentary Collection, Open Account, or Cash in Advance is a separate commercial agreement between the parties and is not dictated by the chosen Incoterm®.</li>
                  <li><b>Breach of Contract and Liabilities:</b> The rules do not address the consequences of a breach of contract. Issues such as product quality, conformity with specifications, delays in delivery, or liability for defective products are outside the scope of Incoterms®. These matters must be detailed in the main body of the sales contract, including clauses on warranties, liabilities, dispute resolution, and governing law.</li>
                  <li><b>Force Majeure:</b> The Incoterms® rules do not provide for situations where a party is prevented from fulfilling their obligations due to events beyond their reasonable control, such as wars, strikes, or natural disasters. A specific force majeure clause must be included in the sales contract to define these events and their consequences.</li>
                </ul>
              </section>

              {/* 1.4 */}
              <section id="two-families-of-rules" className="mb-6 ml-4">
                <h2 className="text-lg font-bold mb-3 truncate">1.4 The Two Families of Rules: Understanding the Distinction</h2>
                <p>The eleven Incoterms® 2020 rules are organized into two distinct categories based on the mode of transport. This classification is a fundamental starting point for selecting the appropriate rule, as using a term from the wrong category can lead to significant risk and confusion.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Group 1: Rules for Any Mode or Modes of Transport (7 Rules)</b> This group contains the most modern and versatile terms, designed to function across any combination of transport methods, including air, road, rail, and, critically, containerized sea freight. These rules are:
                    <ul className="list-disc pl-6">
                      <li>EXW – Ex Works</li>
                      <li>FCA – Free Carrier</li>
                      <li>CPT – Carriage Paid To</li>
                      <li>CIP – Carriage and Insurance Paid To</li>
                      <li>DAP – Delivered at Place</li>
                      <li>DPU – Delivered at Place Unloaded</li>
                      <li>DDP – Delivered Duty Paid</li>
                    </ul>
                  </li>
                  <li><b>Group 2: Rules for Sea and Inland Waterway Transport (4 Rules)</b> This group contains the four "maritime-only" rules. These are traditional terms designed for situations where the seller delivers goods directly to a vessel, such as when loading loose bulk cargo (e.g., grain, coal) or oversized, non-containerized items. They are generally considered unsuitable and highly risky for modern containerized shipments. These rules are:
                    <ul className="list-disc pl-6">
                      <li>FAS – Free Alongside Ship</li>
                      <li>FOB – Free on Board</li>
                      <li>CFR – Cost and Freight</li>
                      <li>CIF – Cost, Insurance, and Freight</li>
                    </ul>
                  </li>
                </ul>
                <p>The choice of an Incoterm® should be viewed as a strategic business decision, not a mere technicality. It directly impacts a company's costs, logistical control, cash flow, and risk exposure. An experienced importer with high shipping volumes and strong relationships with freight forwarders may prefer an "F" term like FCA to control the main freight and negotiate better rates. In contrast, a novice importer might prefer a "D" term like DAP, where the seller manages the complexities of transport to the destination.</p>
                <p>A particularly crucial area of nuance lies within the "C" group terms (CFR, CIF, CPT, CIP). Under these rules, the seller arranges and pays for carriage to the named destination, which can lead a buyer to mistakenly believe the seller is responsible for the goods until they arrive. However, the risk of loss or damage transfers to the buyer much earlier, at the point of origin, when the goods are handed over to the first carrier. If a shipment under CIF terms is lost at sea, it is the buyer's loss, and their recourse is to file a claim against the insurance policy that the seller was obligated to purchase on their behalf. This disconnect between the division of cost and the transfer of risk is a primary source of disputes and underscores the need for a deep understanding of each rule's mechanics.</p>
              </section>
            </section>

            {/* Table 1.1 */}
            <section id="table-1-1" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Table 1.1: Incoterms® 2020 At-a-Glance</h2>
              <p>The following table provides a high-level overview of the eleven rules, their transport mode, and a brief summary of the seller's and buyer's primary responsibilities. It serves as a quick reference to orient users before the detailed analysis in the subsequent chapters.</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Incoterm®</th>
                      <th className="border px-2 py-1">Full Name</th>
                      <th className="border px-2 py-1">Mode of Transport</th>
                      <th className="border px-2 py-1">Brief Description of Seller's Responsibility</th>
                      <th className="border px-2 py-1">Brief Description of Buyer's Responsibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">EXW</td>
                      <td className="border px-2 py-1">Ex Works</td>
                      <td className="border px-2 py-1">Any Mode</td>
                      <td className="border px-2 py-1">Minimum Obligation: Makes goods available at own premises.</td>
                      <td className="border px-2 py-1">Maximum Obligation: Arranges and pays for all transport, loading, and customs.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">FCA</td>
                      <td className="border px-2 py-1">Free Carrier</td>
                      <td className="border px-2 py-1">Any Mode</td>
                      <td className="border px-2 py-1">Delivers goods, cleared for export, to the buyer's nominated carrier.</td>
                      <td className="border px-2 py-1">Arranges and pays for main carriage and all subsequent costs.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">CPT</td>
                      <td className="border px-2 py-1">Carriage Paid To</td>
                      <td className="border px-2 py-1">Any Mode</td>
                      <td className="border px-2 py-1">Arranges and pays for carriage to a named destination.</td>
                      <td className="border px-2 py-1">Bears risk from the point goods are handed to the first carrier at origin.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">CIP</td>
                      <td className="border px-2 py-1">Carriage and Insurance Paid To</td>
                      <td className="border px-2 py-1">Any Mode</td>
                      <td className="border px-2 py-1">Arranges and pays for carriage and "all-risks" insurance to destination.</td>
                      <td className="border px-2 py-1">Bears risk from the point goods are handed to the first carrier at origin.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">DAP</td>
                      <td className="border px-2 py-1">Delivered at Place</td>
                      <td className="border px-2 py-1">Any Mode</td>
                      <td className="border px-2 py-1">Delivers goods to a named destination, ready for unloading.</td>
                      <td className="border px-2 py-1">Responsible for unloading and import customs clearance/duties.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">DPU</td>
                      <td className="border px-2 py-1">Delivered at Place Unloaded</td>
                      <td className="border px-2 py-1">Any Mode</td>
                      <td className="border px-2 py-1">Delivers and unloads goods at a named destination.</td>
                      <td className="border px-2 py-1">Responsible for import customs clearance and duties.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">DDP</td>
                      <td className="border px-2 py-1">Delivered Duty Paid</td>
                      <td className="border px-2 py-1">Any Mode</td>
                      <td className="border px-2 py-1">Maximum Obligation: Delivers goods to destination, cleared for import, duties paid.</td>
                      <td className="border px-2 py-1">Minimal obligation; simply receives the goods.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">FAS</td>
                      <td className="border px-2 py-1">Free Alongside Ship</td>
                      <td className="border px-2 py-1">Sea/Waterway Only</td>
                      <td className="border px-2 py-1">Delivers goods alongside the buyer's nominated vessel at the origin port.</td>
                      <td className="border px-2 py-1">Arranges and pays for loading, main carriage, and all subsequent costs.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">FOB</td>
                      <td className="border px-2 py-1">Free on Board</td>
                      <td className="border px-2 py-1">Sea/Waterway Only</td>
                      <td className="border px-2 py-1">Delivers goods loaded on board the buyer's nominated vessel at the origin port.</td>
                      <td className="border px-2 py-1">Arranges and pays for main carriage and all subsequent costs.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">CFR</td>
                      <td className="border px-2 py-1">Cost and Freight</td>
                      <td className="border px-2 py-1">Sea/Waterway Only</td>
                      <td className="border px-2 py-1">Arranges and pays for freight to a named destination port.</td>
                      <td className="border px-2 py-1">Bears risk from the moment goods are on board the vessel at origin.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">CIF</td>
                      <td className="border px-2 py-1">Cost, Insurance, and Freight</td>
                      <td className="border px-2 py-1">Sea/Waterway Only</td>
                      <td className="border px-2 py-1">Arranges and pays for freight and minimum-level insurance to destination port.</td>
                      <td className="border px-2 py-1">Bears risk from the moment goods are on board the vessel at origin.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </section>

          {/* Part II: A Deep Dive into the 11 Rules */}
          <section id="part-ii-deep-dive-11-rules" className="mb-8">
            <h2 className="text-xl font-bold mb-3 truncate">Part II: A Deep Dive into the 11 Rules</h2>
            
            {/* Chapter 2 */}
            <section id="comprehensive-guide-incoterms-2020" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Chapter 2: The Comprehensive Guide to the Incoterms® 2020 Rules</h2>
              <p>This chapter forms the core of the playbook, providing a detailed, practical analysis of each of the eleven Incoterms® 2020 rules. Each section is structured identically to allow for easy comparison, covering the official definition, a breakdown of obligations, the precise points of risk and cost transfer, strategic applications, common pitfalls to avoid, and key documentation requirements.</p>
              
              {/* 2.1 EXW */}
              <section id="exw-ex-works" className="mb-6 ml-4">
                <h2 className="text-lg font-bold mb-3 truncate">2.1 EXW – Ex Works (...named place of delivery)</h2>
                
                <h3 className="font-semibold mb-2">Official Definition</h3>
                <p>EXW represents the absolute minimum obligation for the seller. The seller fulfills their delivery obligation by making the goods available to the buyer at the seller's own premises (e.g., factory, warehouse) or at another named place. A crucial feature of this rule is that the seller is not responsible for loading the goods onto the buyer's collecting vehicle, nor are they required to clear the goods for export.</p>
                
                <h3 className="font-semibold mb-2">Obligations Breakdown</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller's Obligations (A1-A10):</b> The seller must provide the goods and a commercial invoice in conformity with the contract of sale. Their primary duty is to place the goods at the buyer's disposal at the agreed point within the named place of delivery on the agreed date or within the agreed period. The goods must be appropriately packaged for transport. The seller has no obligation to arrange for transport or insurance. They must, however, provide the buyer (at the buyer's request, risk, and cost) with assistance in obtaining any documents and information needed for export and import formalities.</li>
                  <li><b>Buyer's Obligations (B1-B10):</b> The buyer bears almost all responsibilities. They must take delivery of the goods as soon as they are made available. The buyer is responsible for arranging and paying for all stages of transport, from loading at the seller's premises to the final destination. This includes all export, transit, and import customs clearance procedures, as well as obtaining all necessary licenses and authorizations. The buyer bears all risks of loss or damage to the goods from the moment they are placed at their disposal.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Risk Transfer</h3>
                <p>The risk of loss or damage transfers from the seller to the buyer at the earliest possible point in the transaction: the moment the goods are made available at the named place of delivery. This means risk transfers before the goods are loaded onto the truck. If the goods are damaged while being loaded, it is at the buyer's risk.</p>
                
                <h3 className="font-semibold mb-2">Cost Allocation</h3>
                <p>The cost division is simple: the seller pays only for checking, marking, and packaging the goods. The buyer pays for everything else, including: loading at the origin, pre-carriage (inland transport in the export country), export customs duties and taxes, origin terminal charges, main carriage freight, insurance (if desired), destination terminal charges, import customs clearance, import duties and taxes, and on-carriage to the final destination.</p>
                
                <h3 className="font-semibold mb-2">Strategic Use</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>For the Seller:</b> EXW is the most favorable term for a seller, especially one who is new to exporting or wishes to have no involvement in the logistics process. It effectively turns an international sale into a domestic one from their perspective.</li>
                  <li><b>For the Buyer:</b> A buyer might choose EXW if they have a strong logistics presence in the seller's country and can manage export formalities efficiently, or if they are consolidating goods from multiple suppliers in that country. By controlling the entire logistics chain, a sophisticated buyer can potentially achieve significant cost savings.</li>
                  <li><b>Recommended Application:</b> Due to the significant risks for the buyer related to export clearance, EXW is most safely used for domestic trade or for trade within a single customs union (like the EU) where formal export/import procedures are not required.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Common Pitfalls</h3>
                <ol className="list-decimal pl-6 mb-2">
                  <li><b>The Export Clearance Trap:</b> This is the most significant danger of using EXW for international trade. The buyer is responsible for completing export customs formalities in the seller's country. However, in many jurisdictions, only a company legally established in that country can act as the "Exporter of Record." If the buyer is not established there, they may be physically unable to complete the clearance, leaving the goods stranded at the seller's factory. The seller may be forced to step in and assist, incurring unforeseen costs and legal responsibilities. For this reason, traders are strongly encouraged to use FCA instead of EXW for international shipments.</li>
                  <li><b>The Loading Risk Ambiguity:</b> The rule states that the buyer is responsible for loading. In practice, it is often the seller's warehouse staff and equipment (e.g., forklift) that load the buyer's truck. If goods are damaged during this process, a dispute is almost inevitable, as the seller performed an action that was technically the buyer's risk and responsibility. To address this, parties sometimes use the variant "EXW Loaded," but this modification can create further ambiguity regarding the transfer of risk if not meticulously defined in the sales contract.</li>
                  <li><b>Lack of Proof of Export for VAT/GST:</b> The seller has no role in the export and receives no transport document (like a Bill of Lading) as evidence that the goods have actually left the country. This can create serious problems for the seller when trying to prove the export for the purpose of obtaining a Value-Added Tax (VAT) or Goods and Services Tax (GST) refund or exemption.</li>
                </ol>
                
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p>The seller's only documentation obligation is to provide a commercial invoice. The buyer is responsible for arranging and obtaining all necessary transport documents, export licenses, and import permits.</p>
              </section>

              {/* 2.2 FCA */}
              <section id="fca-free-carrier" className="mb-6 ml-4">
                <h2 className="text-lg font-bold mb-3 truncate">2.2 FCA – Free Carrier (...named place of delivery)</h2>
                
                <h3 className="font-semibold mb-2">Official Definition</h3>
                <p>FCA is a highly flexible and widely recommended rule where the seller delivers the goods, cleared for export, to the carrier nominated by the buyer at a named place. It is designed for any mode of transport and is particularly well-suited for modern, containerized logistics.</p>
                
                <h3 className="font-semibold mb-2">Obligations Breakdown</h3>
                <p>The FCA rule has two distinct scenarios for delivery, and it is critical for the parties to specify which one applies in their contract.</p>
                <ol className="list-decimal pl-6 mb-2">
                  <li><b>Delivery at the Seller's Premises:</b> If the named place is the seller's factory or warehouse, the seller is deemed to have delivered the goods once they are loaded onto the means of transport provided by the buyer's carrier. In this scenario, the seller is responsible for the act of loading.</li>
                  <li><b>Delivery at Another Named Place:</b> If the named place is another location, such as a freight forwarder's warehouse, a port terminal, or an airport, the seller is responsible for transporting the goods to that place. Delivery is completed when the goods are placed at the disposal of the buyer's carrier on the seller's arriving means of transport, ready for unloading. In this scenario, the seller is not responsible for unloading their truck.</li>
                </ol>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller's Obligations (A1-A10):</b> The seller must provide the goods and commercial invoice, package the goods, and deliver them according to one of the two scenarios above. Crucially, the seller must carry out and pay for all export customs formalities.</li>
                  <li><b>Buyer's Obligations (B1-B10):</b> The buyer must nominate a carrier and contract for the main carriage of the goods at their own expense. They must take delivery at the agreed point and bear all risks and costs from that point onwards, including any destination terminal charges and all import formalities and duties.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Risk Transfer</h3>
                <p>Risk transfers from the seller to the buyer at the precise moment delivery is completed at the named place.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li>If at the seller's premises, risk transfers when the goods are loaded onto the buyer's carrier.</li>
                  <li>If at another named place, risk transfers when the goods are on the seller's vehicle, ready for unloading by the buyer's carrier.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Cost Allocation</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller Pays:</b> Export packaging, loading charges (only if delivery is at their own premises), inland transport to the named place, and export clearance fees/taxes.</li>
                  <li><b>Buyer Pays:</b> Unloading from the seller's vehicle (if delivery is at another named place), origin terminal handling charges (if applicable), main carriage freight, insurance (if desired), and all costs from the point of delivery to the final destination, including import clearance and duties.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Strategic Use</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>The Recommended Rule for Container Shipments:</b> FCA is the term the ICC strongly recommends for containerized shipments, especially for sea freight, as a replacement for the commonly misused FOB. It aligns the point of risk transfer with the practical reality of modern logistics, where containers are handed over to carriers at inland terminals, not passed over a ship's rail.</li>
                  <li><b>Buyer Control:</b> FCA is ideal for buyers who want to control the main transport leg to negotiate better freight rates with their own preferred carriers. It gives them control over costs and logistics without the export clearance burdens of EXW.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">The 2020 FCA Update: The Bill of Lading Solution</h3>
                <p>A major barrier to the adoption of FCA for sea freight was the issue of payment by Letter of Credit (L/C), which often requires the seller to present an "on-board" Bill of Lading (B/L) to the bank to get paid. Under the old FCA rules, the seller could not easily obtain this document because they delivered the goods to the carrier before they were loaded on the vessel.</p>
                <p>Incoterms® 2020 introduced a groundbreaking change to address this. Article A6/B6 of FCA now includes an option where the parties can agree that the buyer will instruct its carrier to issue a transport document with an on-board notation to the seller after the goods have been loaded. The seller is then obligated to tender this document to the buyer (usually via the banks). This change removes a key reason for misusing FOB and makes FCA a fully viable and correct choice for L/C-financed container shipments.</p>
                
                <h3 className="font-semibold mb-2">Common Pitfalls</h3>
                <ol className="list-decimal pl-6 mb-2">
                  <li><b>Vague Named Place:</b> This is a critical point of potential conflict. A contract stating merely "FCA Shanghai" is dangerously ambiguous. Does it mean the seller's factory in a Shanghai suburb, or a specific container yard at the Port of Shanghai? The difference determines who pays for the inland transport from the factory to the port and who bears the risk during that journey. The contract must specify the exact address of the named place.</li>
                  <li><b>Forgetting to Agree on the B/L Option:</b> The new Bill of Lading provision is not automatic. It is an option that must be explicitly agreed upon in the sales contract. If a seller needs an on-board B/L for their L/C but fails to include this agreement in the contract, the buyer has no obligation to provide it, potentially blocking the seller's payment.</li>
                  <li><b>Confusion over Loading/Unloading:</b> Parties must be clear about which of the two delivery scenarios they are using. If delivery is at the seller's premises, the seller loads. If it's at a forwarder's warehouse, the buyer's carrier unloads the seller's truck and then loads the main carriage. Misunderstanding this can lead to disputes over who is responsible for damage during these operations and who pays for the labor and equipment.</li>
                </ol>
                
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p>The seller must provide the commercial invoice and the usual proof of delivery (e.g., a forwarder's cargo receipt). They are also responsible for obtaining and providing all documentation necessary for export clearance. If the B/L option is invoked, the seller will also receive and tender the on-board Bill of Lading.</p>
              </section>

              {/* 2.3 CPT */}
              <section id="cpt-carriage-paid-to" className="mb-6 ml-4">
                <h2 className="text-lg font-bold mb-3 truncate">2.3 CPT – Carriage Paid To (...named place of destination)</h2>
                
                <h3 className="font-semibold mb-2">Official Definition</h3>
                <p>Under CPT, the seller delivers the goods to a carrier nominated by the seller themselves. The seller must contract for and pay the costs of carriage necessary to bring the goods to the named place of destination. This rule can be used for any mode of transport.</p>
                
                <h3 className="font-semibold mb-2">Obligations Breakdown</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller's Obligations (A1-A10):</b> The seller must provide the goods and invoice, package them, and arrange the contract of carriage at their own expense to the named destination. They must hand over the goods to this first carrier on the agreed date. The seller is also responsible for completing and paying for all export clearance formalities.</li>
                  <li><b>Buyer's Obligations (B1-B10):</b> The buyer must take delivery of the goods when they have been handed to the first carrier and receive them from the carrier at the named destination. The buyer is responsible for all import clearance formalities and for paying all import duties and taxes. The buyer has no obligation to the seller to make a contract of carriage or insurance.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">The "C" Term Paradox: Risk vs. Cost</h3>
                <p>CPT exemplifies the critical paradox inherent in all four "C" group terms. While the seller pays for carriage to the destination, the risk of loss or damage transfers to the buyer at the origin.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Risk Transfer:</b> Risk transfers from the seller to the buyer when the goods are delivered to the first carrier in the transport chain, not when they reach the destination. If the seller uses a trucker to take the goods to an airport, risk transfers when the goods are handed to the trucker, not the airline.</li>
                  <li><b>Cost Allocation:</b> The seller pays for all costs up to the named destination, including export clearance, origin charges, and the main freight contract. The buyer pays for any costs after arrival at the destination (unless included in the freight contract), as well as import clearance and duties.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Strategic Use</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller Convenience:</b> CPT is convenient for a seller who wants to provide a "delivered" price to their customer to make the sale more attractive, but does not want to bear the risk of loss during the main transit. The freight cost is built into the sales price.</li>
                  <li><b>Multimodal Shipments:</b> Like FCA, CPT is well-suited for multimodal and containerized transport.</li>
                  <li><b>Buyer's Perspective:</b> A buyer might accept a CPT term if they are less experienced in arranging international freight or if the seller can secure a better freight rate due to higher shipping volumes. However, the buyer must be acutely aware that they are "on-risk" for a journey they did not arrange.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Common Pitfalls</h3>
                <ol className="list-decimal pl-6 mb-2">
                  <li><b>Misunderstanding the Risk Transfer Point:</b> This is the single biggest pitfall of all C-terms. A buyer sees "CPT Buyer's Warehouse, Chicago" and assumes the seller is responsible until the goods arrive in Chicago. This is incorrect. If the container falls off the ship in the Atlantic, it is the buyer's loss. The buyer's only recourse would be against the carrier (a difficult process) as there is no automatic insurance obligation on the seller.</li>
                  <li><b>Lack of Control over Carriage:</b> The buyer has no control over the carrier selection, the transit time, or the service level. The seller, having already made the sale, is incentivized to choose the cheapest, and potentially slowest or least reliable, carrier to maximize their profit. This can lead to delays and poor service for the buyer.</li>
                  <li><b>Ambiguity of "Destination":</b> The contract must clearly state the named place of destination. It is also crucial to clarify which costs at the destination are included in the seller's freight contract. For example, are destination terminal handling charges (THC) included? If not, the buyer will face an unexpected bill upon arrival.</li>
                </ol>
                
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p>The seller must provide the commercial invoice and the "usual" transport document for the carriage they have arranged (e.g., Bill of Lading, Air Waybill, etc.). This document must be provided to the buyer to allow them to claim the goods from the carrier at the destination. The seller also handles all export documentation.</p>
              </section>

              {/* 2.4 CIP */}
              <section id="cip-carriage-insurance-paid" className="mb-6 ml-4">
                <h2 className="text-lg font-bold mb-3 truncate">2.4 CIP – Carriage and Insurance Paid To (...named place of destination)</h2>
                
                <h3 className="font-semibold mb-2">Official Definition</h3>
                <p>CIP is identical to CPT in almost every respect, with one critical addition: the seller must also contract for cargo insurance cover against the buyer's risk of loss or damage to the goods during the carriage. Like CPT, it can be used for any mode of transport.</p>
                
                <h3 className="font-semibold mb-2">Obligations Breakdown</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller's Obligations (A1-A10):</b> The seller's obligations are the same as under CPT (provide goods, arrange and pay for carriage to destination, clear for export), with the additional duty to obtain and pay for cargo insurance for the buyer's benefit.</li>
                  <li><b>Buyer's Obligations (B1-B10):</b> The buyer's obligations are the same as under CPT (take delivery from the first carrier, receive goods at destination, clear for import).</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Risk and Cost Transfer</h3>
                <p>The points of risk and cost transfer are the same as in CPT.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Risk Transfer:</b> Risk transfers from the seller to the buyer when the goods are delivered to the first carrier at the origin.</li>
                  <li><b>Cost Allocation:</b> The seller pays for carriage and insurance to the named destination. The buyer is responsible for import-related costs.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">The 2020 CIP Update: A Higher Standard of Insurance</h3>
                <p>Incoterms® 2020 introduced a major change to the insurance requirement under CIP.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li>The seller must now obtain insurance coverage compliant with Institute Cargo Clauses (A), which is a comprehensive, "all-risks" level of cover (subject to specified exclusions).</li>
                  <li>This is an upgrade from the Incoterms® 2010 rules, which only required minimum cover (Clause C). This change was made to reflect the fact that CIP is often used for high-value manufactured goods, which warrant better insurance protection.</li>
                  <li>The insurance must cover, at a minimum, 110% of the invoice value of the goods.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Strategic Use</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>For Buyers:</b> CIP offers the buyer significant protection. They benefit from a seller-arranged transport contract and a high-level, "all-risks" insurance policy. This is particularly valuable for high-value goods or for buyers who do not have their own global insurance policy.</li>
                  <li><b>For Sellers:</b> Offering a CIP term can be a strong selling point, as it provides the buyer with a convenient, low-risk (from an insurance perspective) solution. The cost of the freight and the higher insurance premium are factored into the seller's price.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Common Pitfalls</h3>
                <ol className="list-decimal pl-6 mb-2">
                  <li><b>The Risk Transfer Misconception (Again):</b> Even with insurance, the fundamental C-term paradox remains. The buyer must understand that if the goods are lost or damaged in transit, their primary recourse is not against the seller, but against the insurance company via the policy the seller provided. The seller fulfilled their delivery obligation by shipping the goods.</li>
                  <li><b>Assuming Insurance Covers Everything:</b> "All-risks" (Clause A) coverage is comprehensive, but it is not absolute. It has standard exclusions (e.g., for improper packing, inherent vice, delay). Buyers should review the policy to understand its limitations.</li>
                  <li><b>Insufficient Insurance Value:</b> The default requirement is 110% of the invoice value. However, the buyer's true loss might include lost profits or other consequential damages. If the buyer needs higher coverage, they must either negotiate this with the seller or arrange their own supplementary insurance ("top-up" cover).</li>
                </ol>
                
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p>In addition to the commercial invoice and transport document required under CPT, the seller under CIP must also provide the buyer with the insurance policy or certificate. This document is crucial as it enables the buyer to make a claim against the insurer if necessary. The seller must also handle all export documentation.</p>
              </section>

              {/* 2.5 DAP */}
              <section id="dap-delivered-at-place" className="mb-6 ml-4">
                <h2 className="text-lg font-bold mb-3 truncate">2.5 DAP – Delivered at Place (...named place of destination)</h2>
                
                <h3 className="font-semibold mb-2">Official Definition</h3>
                <p>DAP is a "D" group or "arrival" term. The seller delivers the goods—and transfers risk—when the goods are placed at the disposal of the buyer on the arriving means of transport, ready for unloading at the named place of destination. This rule can be used for any mode of transport.</p>
                
                <h3 className="font-semibold mb-2">Obligations Breakdown</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller's Obligations (A1-A10):</b> The seller bears all costs and risks involved in bringing the goods to the named destination. This includes arranging and paying for all transport legs (pre-carriage, main carriage, on-carriage) up to the agreed point. The seller must also handle all export clearance formalities. The seller is not responsible for unloading the goods from the arriving vehicle.</li>
                  <li><b>Buyer's Obligations (B1-B10):</b> The buyer's primary responsibilities are to unload the goods from the arriving means of transport and to carry out and pay for all import customs formalities, including duties, taxes, and any required permits.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Risk Transfer</h3>
                <p>Risk transfers from the seller to the buyer at a very late stage: when the goods arrive at the named place of destination and are made available to the buyer on the arriving transport, ready for unloading. If the goods are damaged at any point before reaching this destination, it is the seller's loss and responsibility.</p>
                
                <h3 className="font-semibold mb-2">Cost Allocation</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller Pays:</b> Export packing, all transport costs to the named destination, export clearance, and any origin or transit terminal charges.</li>
                  <li><b>Buyer Pays:</b> The cost of unloading at the destination, all import clearance costs, customs duties, and taxes.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Strategic Use</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Buyer Convenience with Control:</b> DAP is an excellent option for buyers who want the seller to handle the complexities and risks of transportation to their country, but who want to maintain control over the import customs process. This is often preferable to DDP, as the buyer is typically in a better position to handle their own country's customs procedures.</li>
                  <li><b>Seller's "Door-to-Door" Service:</b> For sellers, offering DAP terms can be a competitive advantage, as it provides a nearly "door-to-door" service for the buyer, simplifying their logistics.</li>
                  <li><b>Multimodal Flexibility:</b> DAP is ideal for multimodal transport where goods are delivered directly to the buyer's premises or another inland point.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Common Pitfalls</h3>
                <ol className="list-decimal pl-6 mb-2">
                  <li><b>Unloading Costs:</b> The rule clearly states the buyer is responsible for unloading. However, the cost of unloading may be included in the seller's contract of carriage (e.g., with a courier company). It is vital for the parties to clarify in the sales contract who will ultimately bear this cost to avoid disputes upon arrival.</li>
                  <li><b>Delays in Import Clearance:</b> If the buyer fails to clear the goods for import in a timely manner, the arriving vehicle may be delayed. Any resulting costs, such as truck detention or storage fees, are for the buyer's account (provided the seller gave the buyer the necessary documents in time).</li>
                  <li><b>Precise "Named Place":</b> As with all destination-based terms, the named place of destination must be specified with absolute precision. "DAP Chicago" is insufficient. It should be "DAP Buyer's Warehouse, 123 Main Street, Chicago, IL, USA, Incoterms® 2020."</li>
                </ol>
                
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p>The seller must provide the commercial invoice and any transport document required to allow the buyer to take delivery of the goods. The seller handles export documentation, while the buyer is responsible for all import documentation.</p>
              </section>

              {/* 2.6 DPU */}
              <section id="dpu-delivered-place-unloaded" className="mb-6 ml-4">
                <h2 className="text-lg font-bold mb-3 truncate">2.6 DPU – Delivered at Place Unloaded (...named place of destination)</h2>
                
                <h3 className="font-semibold mb-2">Official Definition</h3>
                <p>DPU is a new rule in Incoterms® 2020, replacing the former DAT (Delivered at Terminal). It is the only Incoterm that requires the seller to unload the goods at the destination. The seller delivers—and transfers risk—when the goods, once unloaded from the arriving means of transport, are placed at the disposal of the buyer at the named place of destination.</p>
                
                <h3 className="font-semibold mb-2">Obligations Breakdown</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller's Obligations (A1-A10):</b> The seller's obligations are identical to DAP, with the crucial addition that the seller must also arrange and pay for the unloading of the goods at the named place of destination. The seller bears all risks associated with the transport and the unloading process.</li>
                  <li><b>Buyer's Obligations (B1-B10):</b> The buyer's obligations are to take delivery once the goods are unloaded and to carry out and pay for all import customs formalities, including duties and taxes.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Risk Transfer</h3>
                <p>Risk transfers from the seller to the buyer at the moment the goods have been successfully unloaded from the arriving transport at the named place of destination. This is the latest point of risk transfer of any Incoterm except DDP.</p>
                
                <h3 className="font-semibold mb-2">Cost Allocation</h3>
                <p>The cost allocation is the same as DAP, except that the seller now also pays for the unloading at the destination.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller Pays:</b> All transport costs to the destination, export clearance, and unloading charges.</li>
                  <li><b>Buyer Pays:</b> All import clearance costs, customs duties, and taxes.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">The Change from DAT to DPU</h3>
                <p>The ICC replaced DAT with DPU to increase flexibility and remove confusion. The term "Terminal" in DAT was often misinterpreted as being limited to a formal transport hub like a port or airport terminal. The rule was always intended to cover any place, including the buyer's premises. The change to "Place Unloaded" makes this explicit and clarifies that the destination can be anywhere the seller is able to unload the goods.</p>
                
                <h3 className="font-semibold mb-2">Strategic Use</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Consolidated Containers:</b> DPU is particularly useful for consolidated containers (LCL - Less than Container Load) with multiple consignees. The seller's carrier can unload the container at a terminal and segregate the goods, making them available to the individual buyers.</li>
                  <li><b>Specialized Handling:</b> It is the correct term to use when the seller needs to be responsible for unloading due to specialized equipment or expertise required, for example, delivering and unloading heavy machinery at a construction site.</li>
                  <li><b>Seller Control:</b> It gives the seller complete control over the logistics chain up to and including unloading.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Common Pitfalls</h3>
                <ol className="list-decimal pl-6 mb-2">
                  <li><b>Seller's Ability to Unload:</b> The primary pitfall is for a seller to agree to DPU without confirming they have the means and capability to safely unload the goods at the destination. If the seller cannot arrange for unloading, they will be in breach of contract. In such cases, DAP is the more appropriate term.</li>
                  <li><b>Import Clearance Delays:</b> As with DAP, if the buyer delays import clearance, the seller may incur storage and demurrage costs at the destination terminal while waiting for the goods to be cleared before they can be moved to the final place of delivery and unloaded. The contract should specify who bears these costs.</li>
                </ol>
                
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p>The seller must provide the commercial invoice and a delivery order or transport document that allows the buyer to take possession of the goods after unloading. The seller handles export documentation, and the buyer handles import documentation.</p>
              </section>

              {/* 2.7 DDP */}
              <section id="ddp-delivered-duty-paid" className="mb-6 ml-4">
                <h2 className="text-lg font-bold mb-3 truncate">2.7 DDP – Delivered Duty Paid (...named place of destination)</h2>
                
                <h3 className="font-semibold mb-2">Official Definition</h3>
                <p>DDP represents the maximum obligation for the seller. The seller delivers the goods when they are placed at the disposal of the buyer, cleared for import, on the arriving means of transport, ready for unloading at the named place of destination. The seller bears all costs and risks involved in bringing the goods to the destination, including all export and import duties and taxes.</p>
                
                <h3 className="font-semibold mb-2">Obligations Breakdown</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller's Obligations (A1-A10):</b> The seller is responsible for everything. They must arrange and pay for all transport, handle both export and import customs clearance, and pay all export and import duties and taxes (including non-recoverable VAT/GST in the buyer's country).</li>
                  <li><b>Buyer's Obligations (B1-B10):</b> The buyer's only obligations are to take delivery of the goods and, typically, to unload them from the arriving vehicle (unless the named place is a terminal where unloading is part of the transport contract, or if DPU is used in conjunction).</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Risk Transfer</h3>
                <p>Risk transfers from the seller to the buyer when the goods are placed at the buyer's disposal at the named destination, cleared for import, and ready for unloading.</p>
                
                <h3 className="font-semibold mb-2">Cost Allocation</h3>
                <p>The seller pays for everything except, typically, the final unloading. This includes all transport, export clearance, import clearance, and all duties and taxes in both countries.</p>
                
                <h3 className="font-semibold mb-2">Strategic Use</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Buyer's Ultimate Convenience:</b> From a buyer's perspective, DDP appears to be the most "hassle-free" option. They receive a single, all-inclusive price and do not have to deal with shipping or customs. It is popular for e-commerce shipments or when a buyer has no import experience.</li>
                  <li><b>Seller's Market Entry Tool:</b> A sophisticated seller with a strong logistics network and knowledge of the target market's customs regime can use DDP as a powerful marketing tool to offer a seamless, landed-cost service to foreign customers.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Common Pitfalls</h3>
                <p>DDP is fraught with peril, particularly for the seller, but also carries hidden risks for the buyer.</p>
                <ol className="list-decimal pl-6 mb-2">
                  <li><b>The Seller as Importer of Record:</b> This is the biggest challenge. To clear goods for import, the seller must act as the Importer of Record (IOR) in the buyer's country. This may require the seller to be legally registered there, have a tax identification number, and be licensed to import. Many sellers are not, making DDP impossible to execute legally.</li>
                  <li><b>Unpredictable Import Costs:</b> The seller is responsible for all import duties and taxes. These can be complex, subject to change, and difficult to calculate accurately in advance, especially VAT or GST which may or may not be recoverable by the seller. A miscalculation can erase the seller's profit margin.</li>
                  <li><b>Buyer's Lack of Control:</b> While seemingly convenient, the buyer under DDP gives up all control over the supply chain. The seller is incentivized to use the slowest and cheapest carrier to save money, which can lead to significant delays and poor visibility for the buyer. If customs issues arise, the buyer is powerless to intervene, even though it is their production line that is waiting for the goods.</li>
                  <li><b>The "DDP, VAT Unpaid" Variant:</b> Because of the difficulty for foreign sellers to handle VAT/GST, parties often agree to the modification "DDP, VAT Unpaid." This means the seller handles import clearance and duties, but the buyer is responsible for paying the VAT. While practical, this variation must be clearly and precisely worded in the contract to avoid ambiguity.</li>
                </ol>
                
                <h3 className="font-semibold mb-2">Recommendation</h3>
                <p>For the reasons above, DDP should be used with extreme caution. In most cases, DAP or DPU are better alternatives. They provide the buyer with a similar level of service regarding transport but leave the critical import clearance process in the hands of the party best equipped to handle it: the buyer.</p>
                
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p>The seller is responsible for all export and import documentation, including the commercial invoice, transport documents, and any documents required to clear customs in both countries.</p>
              </section>

              {/* 2.8 FAS */}
              <section id="fas-free-alongside-ship" className="mb-6 ml-4">
                <h2 className="text-lg font-bold mb-3 truncate">2.8 FAS – Free Alongside Ship (...named port of shipment)</h2>
                
                <h3 className="font-semibold mb-2">Official Definition</h3>
                <p>FAS is the first of the four "maritime-only" rules. The seller delivers when the goods are placed alongside the vessel (e.g., on a quay or a barge) nominated by the buyer at the named port of shipment. From that moment, the buyer bears all costs and risks.</p>
                
                <h3 className="font-semibold mb-2">Obligations Breakdown</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller's Obligations (A1-A10):</b> The seller must provide the goods and invoice, package them, and transport them to the named port of shipment. They must place the goods alongside the buyer's nominated ship at the specified loading point. The seller is also responsible for clearing the goods for export.</li>
                  <li><b>Buyer's Obligations (B1-B10):</b> The buyer must nominate a vessel and contract for the main sea carriage. They are responsible for arranging and paying for the loading of the goods onto the vessel, the main freight, insurance, and all subsequent costs, including import clearance and duties.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Risk Transfer</h3>
                <p>Risk transfers from the seller to the buyer at the moment the goods are placed alongside the ship at the origin port. If the goods are damaged on the quay while waiting to be loaded, or during the loading operation itself, it is at the buyer's risk.</p>
                
                <h3 className="font-semibold mb-2">Cost Allocation</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller Pays:</b> Export packing, pre-carriage to the port, and export clearance.</li>
                  <li><b>Buyer Pays:</b> Origin terminal handling charges, loading charges (stowing), main sea freight, insurance, and all destination costs including unloading and import clearance.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Strategic Use</h3>
                <p>FAS is intended for specific types of non-containerized cargo, typically heavy-lift items or bulk commodities (like minerals or grains) that are delivered to the quayside for subsequent loading by specialized port equipment arranged by the buyer or their carrier. It is not appropriate for containerized goods.</p>
                
                <h3 className="font-semibold mb-2">Common Pitfalls</h3>
                <ol className="list-decimal pl-6 mb-2">
                  <li><b>Unsuitable for Containers:</b> Using FAS for container shipments is a mistake. Containers are not typically delivered "alongside" a vessel; they are delivered to a container yard (CY) or terminal, often days before the ship arrives. Using FAS in this context creates a dangerous gap in responsibility.</li>
                  <li><b>Delays and Demurrage:</b> If the buyer's nominated vessel is delayed, the goods may be left sitting on the quay for an extended period. The seller may have fulfilled their delivery obligation, but they could incur storage or demurrage charges at the port, leading to disputes over who should pay.</li>
                  <li><b>Damage During Loading:</b> Since risk transfers before loading, any damage that occurs while the goods are being lifted from the quay and placed onto the ship is the buyer's responsibility. This can be a contentious point.</li>
                </ol>
                
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p>The seller provides the commercial invoice, export documentation, and a proof of delivery document showing the goods were placed alongside the vessel (e.g., a dock receipt). The buyer is responsible for securing the Bill of Lading from the carrier once the goods are loaded.</p>
              </section>

              {/* 2.9 FOB */}
              <section id="fob-free-on-board" className="mb-6 ml-4">
                <h2 className="text-lg font-bold mb-3 truncate">2.9 FOB – Free on Board (...named port of shipment)</h2>
                
                <h3 className="font-semibold mb-2">Official Definition</h3>
                <p>FOB is one of the oldest and most widely known, yet frequently misused, trade terms. Under this maritime-only rule, the seller delivers the goods—and transfers risk—when the goods are loaded on board the vessel nominated by the buyer at the named port of shipment.</p>
                
                <h3 className="font-semibold mb-2">Obligations Breakdown</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller's Obligations (A1-A10):</b> The seller is responsible for providing the goods and invoice, packaging, transporting the goods to the port of shipment, paying for origin terminal handling charges, and loading the goods on board the vessel. The seller must also clear the goods for export.</li>
                  <li><b>Buyer's Obligations (B1-B10):</b> The buyer must nominate a vessel and contract for the main sea carriage. Once the goods are on board, the buyer is responsible for all subsequent costs and risks, including the main freight, insurance, unloading at the destination, and import clearance.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Risk Transfer</h3>
                <p>Risk transfers from the seller to the buyer at the precise moment the goods are safely on board the vessel at the named port of shipment. This is a critical distinction from FAS, where risk transfers before loading.</p>
                
                <h3 className="font-semibold mb-2">Cost Allocation</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller Pays:</b> Export packing, pre-carriage to the port, origin terminal handling charges, loading (stowage) costs, and export clearance.</li>
                  <li><b>Buyer Pays:</b> Main sea freight, insurance, and all destination costs including unloading and import clearance.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Strategic Use</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Bulk and Non-Containerized Cargo:</b> FOB is the correct term to use for non-containerized sea freight, such as bulk cargo (oil, grain) or large project cargo, where the seller is responsible for the loading process.</li>
                  <li><b>Buyer Control over Freight:</b> Like FCA, FOB is an "F" term that gives the buyer control over the main carriage, allowing them to choose their carrier and negotiate freight rates, which can lead to cost savings.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Common Pitfalls</h3>
                <ol className="list-decimal pl-6 mb-2">
                  <li><b>The Container Conundrum (The Biggest FOB Mistake):</b> The most common and dangerous error in modern trade is using FOB for containerized shipments. In practice, a seller delivering a container does not load it "on board" a vessel. They hand it over to the carrier's custody at a container yard (CY) or terminal, often days before the ship's arrival. If the seller agrees to "FOB," their risk technically continues until the container is lifted onto the ship. During the time the container is sitting in the terminal—a period over which the seller has no control—they are responsible for any loss or damage. This creates a significant, often uninsured, risk gap. The correct term for containerized shipments is FCA.</li>
                  <li><b>Disputes over "On Board":</b> The term "on board" seems simple, but it can be a source of dispute. Does it mean once the goods cross the ship's rail, or once they are safely stowed and secured in the hold? The Incoterms® 2020 rules clarify it means when the goods are physically placed on board. The sales contract should be even more specific if necessary.</li>
                </ol>
                
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p>The seller provides the commercial invoice and export documentation. Since the seller is responsible for loading, they are in a position to obtain the on-board Bill of Lading from the carrier, which is a key shipping document and often required for payment.</p>
              </section>

              {/* 2.10 CFR */}
              <section id="cfr-cost-freight" className="mb-6 ml-4">
                <h2 className="text-lg font-bold mb-3 truncate">2.10 CFR – Cost and Freight (...named port of destination)</h2>
                
                <h3 className="font-semibold mb-2">Official Definition</h3>
                <p>CFR is a maritime-only "C" term. The seller delivers the goods on board the vessel at the port of origin. The seller must also contract for and pay the costs and freight necessary to bring the goods to the named port of destination.</p>
                
                <h3 className="font-semibold mb-2">Obligations Breakdown</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller's Obligations (A1-A10):</b> The seller's obligations are the same as under FOB (deliver to port, load on board, clear for export), with the additional duty to arrange and pay for the main sea freight to the named destination port.</li>
                  <li><b>Buyer's Obligations (B1-B10):</b> The buyer must accept delivery when the goods are loaded on board at origin and receive them from the carrier at the destination port. The buyer is responsible for any costs after arrival at the destination port (e.g., unloading, import clearance, duties) and for arranging and paying for insurance if they desire it.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">The "C" Term Paradox: Risk vs. Cost</h3>
                <p>Like CPT, CFR demonstrates the critical disconnect between cost and risk.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Risk Transfer:</b> Risk transfers from the seller to the buyer when the goods are on board the vessel at the port of shipment (origin), just like FOB.</li>
                  <li><b>Cost Allocation:</b> The seller pays for freight all the way to the port of destination.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Strategic Use</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller Convenience for Bulk Shipments:</b> CFR is often used in the sale of bulk commodities where the seller, who may have significant shipping volume, can secure favorable freight rates. They offer a single price that includes freight to the buyer's port, which can be commercially attractive.</li>
                  <li><b>Not for Containers:</b> Like FOB, CFR is not appropriate for containerized shipments. The correct term for a container shipment where the seller arranges freight is CPT.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Common Pitfalls</h3>
                <ol className="list-decimal pl-6 mb-2">
                  <li><b>Misunderstanding Risk Transfer:</b> As with all C-terms, the primary pitfall is the buyer's failure to understand that they bear the risk of loss or damage during the entire sea voyage, even though the seller paid for the freight. If the ship sinks, it is the buyer's loss, and they have no automatic insurance recourse unless they purchased their own policy.</li>
                  <li><b>Unloading Costs:</b> The seller's freight contract may or may not include the cost of unloading at the destination port. This is a frequent source of disputes. The sales contract must be explicit about who is responsible for destination terminal handling and unloading charges.</li>
                </ol>
                
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p>The seller must provide the commercial invoice, export documentation, and the "usual" transport document, typically a clean on-board Bill of Lading, to enable the buyer to claim the goods at the destination.</p>
              </section>

              {/* 2.11 CIF */}
              <section id="cif-cost-insurance-freight" className="mb-6 ml-4">
                <h2 className="text-lg font-bold mb-3 truncate">2.11 CIF – Cost, Insurance, and Freight (...named port of destination)</h2>
                
                <h3 className="font-semibold mb-2">Official Definition</h3>
                <p>CIF is a maritime-only rule identical to CFR, with one key addition: the seller must also procure and pay for marine insurance against the buyer's risk of loss or damage to the goods during the carriage.</p>
                
                <h3 className="font-semibold mb-2">Obligations Breakdown</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Seller's Obligations (A1-A10):</b> The seller's obligations are the same as under CFR (deliver on board, clear for export, pay for freight to destination), with the additional duty to obtain and pay for cargo insurance for the buyer's benefit.</li>
                  <li><b>Buyer's Obligations (B1-B10):</b> The buyer's obligations are the same as under CFR.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Risk and Cost Transfer</h3>
                <p>The points of risk and cost transfer are the same as in CFR.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Risk Transfer:</b> Risk transfers from the seller to the buyer when the goods are on board the vessel at the port of shipment (origin).</li>
                  <li><b>Cost Allocation:</b> The seller pays for freight and insurance to the named port of destination.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Insurance Requirement</h3>
                <p>Incoterms® 2020 maintained the long-standing insurance requirement for CIF.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li>The seller is only required to obtain minimum-level insurance cover, compliant with Institute Cargo Clauses (C) or similar. Clause C provides "named perils" coverage, which is much less comprehensive than the "all-risks" Clause A required for CIP.</li>
                  <li>This level of cover is considered appropriate for the bulk commodity trades where CIF is typically used.</li>
                  <li>The insurance must cover, at a minimum, 110% of the invoice value of the goods.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Strategic Use</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Traditional Commodity Trading:</b> CIF is a cornerstone of international commodity trading. It provides a standard package where the price includes the goods, the freight, and a basic level of insurance cover.</li>
                  <li><b>Convenience for Inexperienced Buyers:</b> For buyers who are new to international trade or who ship infrequently, CIF offers a convenient package, as the seller handles both freight and insurance arrangements.</li>
                  <li><b>Not for Containers:</b> Like FOB and CFR, CIF is not suitable for containerized goods. The correct term for a container shipment where the seller arranges freight and insurance is CIP.</li>
                </ul>
                
                <h3 className="font-semibold mb-2">Common Pitfalls</h3>
                <ol className="list-decimal pl-6 mb-2">
                  <li><b>The Risk Transfer Misconception:</b> The pitfall is the same as for all C-terms. If the goods are damaged in transit, the buyer's recourse is against the insurance policy, not the seller. The seller's obligation was fulfilled by shipping conforming goods and providing the policy.</li>
                  <li><b>Inadequate Insurance:</b> The minimum Clause C coverage required by CIF is very limited. It does not cover many common risks. A buyer of higher-value goods who accepts CIF without understanding this is dangerously under-insured. The buyer should always assess if this minimum cover is sufficient and, if not, either negotiate for higher cover from the seller (e.g., Clause A) or purchase their own additional insurance.</li>
                  <li><b>Seller's Choice of Insurer:</b> The seller chooses the insurance company. They are incentivized to choose the cheapest option, which may not be the most reputable or easy to claim against. The buyer has no control over this choice.</li>
                </ol>
                
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p>In addition to the commercial invoice and Bill of Lading required under CFR, the seller under CIF must also provide the buyer with the insurance policy or certificate. This document must be endorsable so that the buyer can file a claim.</p>
              </section>
            </section>

            {/* Table 2.1 */}
            <section id="table-2-1" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Table 2.1: The Master Incoterms® 2020 Responsibility Matrix</h2>
              <p>This matrix provides a detailed, comparative view of where key responsibilities and costs lie for the seller (S) and the buyer (B) across the entire shipping journey for all eleven Incoterms® 2020 rules. It is an essential tool for quick reference during negotiations.</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Responsibility</th>
                      <th className="border px-2 py-1">EXW</th>
                      <th className="border px-2 py-1">FCA</th>
                      <th className="border px-2 py-1">FAS</th>
                      <th className="border px-2 py-1">FOB</th>
                      <th className="border px-2 py-1">CFR</th>
                      <th className="border px-2 py-1">CIF</th>
                      <th className="border px-2 py-1">CPT</th>
                      <th className="border px-2 py-1">CIP</th>
                      <th className="border px-2 py-1">DAP</th>
                      <th className="border px-2 py-1">DPU</th>
                      <th className="border px-2 py-1">DDP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Export Packaging & Marking</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Loading at Origin</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">S¹</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Inland Transport (Origin)</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Export Customs Clearance</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Origin Terminal Charges</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Loading on Main Carriage</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Main Carriage (Freight)</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Insurance</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">S²</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">S³</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Destination Terminal Charges</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B⁴</td>
                      <td className="border px-2 py-1">B⁴</td>
                      <td className="border px-2 py-1">B⁴</td>
                      <td className="border px-2 py-1">B⁴</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Inland Transport (Destination)</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">S</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Unloading at Destination</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">S</td>
                      <td className="border px-2 py-1">B</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Import Customs Clearance</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">S</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Import Duties & Taxes</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">B</td>
                      <td className="border px-2 py-1">S</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Point of Risk Transfer</td>
                      <td className="border px-2 py-1">Seller's Premises</td>
                      <td className="border px-2 py-1">At Named Place</td>
                      <td className="border px-2 py-1">Alongside Ship</td>
                      <td className="border px-2 py-1">On Board Vessel</td>
                      <td className="border px-2 py-1">On Board Vessel</td>
                      <td className="border px-2 py-1">On Board Vessel</td>
                      <td className="border px-2 py-1">At First Carrier</td>
                      <td className="border px-2 py-1">At First Carrier</td>
                      <td className="border px-2 py-1">At Destination</td>
                      <td className="border px-2 py-1">At Destination (Unloaded)</td>
                      <td className="border px-2 py-1">At Destination</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-sm">
                <h4 className="font-semibold mb-2">Matrix Footnotes:</h4>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Under FCA, the seller (S) is only responsible for loading if the named place is their own premises. If the named place is another location (e.g., a forwarder's warehouse), the buyer (B) is responsible for unloading the seller's vehicle.</li>
                  <li>Under CIF, the seller (S) is obligated to arrange and pay for insurance for the buyer's benefit, but only at a minimum level of cover (Institute Cargo Clauses C). Risk transfers to the buyer at the origin.</li>
                  <li>Under CIP, the seller (S) is obligated to arrange and pay for insurance for the buyer's benefit at a comprehensive, "all-risks" level of cover (Institute Cargo Clauses A). Risk transfers to the buyer at the origin.</li>
                  <li>Under the "C" terms (CFR, CIF, CPT, CIP), the seller's freight contract may or may not include destination terminal charges. This is a common point of dispute and must be clarified in the sales contract. If not included in the freight contract, the responsibility falls to the buyer (B).</li>
                </ol>
              </div>
            </section>
          </section>

          {/* Part III: Navigating the Modern Trade Landscape */}
          <section id="part-iii-navigating-modern-trade-landscape" className="mb-8">
            <h2 className="text-xl font-bold mb-3 truncate">Part III: Navigating the Modern Trade Landscape</h2>
            {/* Chapter 3 */}
            <section id="evolution-of-rules" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Chapter 3: The Evolution of the Rules: Key Changes from Incoterms® 2010 to 2020</h2>
              <section id="dat-to-dpu" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">3.1 From DAT to DPU: More Than a Name Change</h3>
                <p>One of the most visible changes in the 2020 rules was the replacement of the term Delivered at Terminal (DAT) with Delivered at Place Unloaded (DPU). This was more than a simple cosmetic update; it was a substantive clarification designed to resolve a common point of confusion.</p>
                <p>The previous term, DAT, required the seller to deliver the goods unloaded at a named "terminal" at the destination. However, the word "terminal" was frequently misinterpreted as being restricted to a formal transport hub like a seaport container yard, an airport cargo building, or a railhead. This created confusion when the parties intended for the delivery and unloading to occur at another location, such as the buyer's own warehouse or a construction site.</p>
                <p>The ICC addressed this ambiguity by renaming the rule to DPU. The key change is the replacement of "Terminal" with "Place," explicitly confirming that the destination can be any agreed-upon place, whether covered or not, that has the facilities to unload the goods. This change enhances the rule's flexibility and aligns it with real-world commercial practices where final delivery and unloading often happen outside of traditional terminals. DPU remains the only Incoterm® rule that obligates the seller to bear the risk and cost of unloading the goods at the destination.</p>
              </section>
              <section id="fca-solution" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">3.2 The FCA Solution: Resolving the Bill of Lading Dilemma</h3>
                <p>Perhaps the most significant practical change in Incoterms® 2020 was the amendment to the Free Carrier (FCA) rule to address a long-standing problem related to Letters of Credit (L/C) and containerized sea freight.</p>
                <p>The historical problem was a mismatch between commercial practice and payment requirements. For decades, sellers were advised to use FCA (not FOB) for containerized goods, as delivery typically occurs when the container is handed to a carrier at an inland terminal, not when it is loaded "on board" a vessel. However, a common requirement of L/C transactions is for the seller to present an "on-board" Bill of Lading (B/L) to the bank to secure payment. Under the old FCA rule, the seller, having completed delivery before the container was loaded onto the ship, could not easily obtain this specific document from the carrier. This predicament often forced sellers to revert to using the technically incorrect and risky FOB term simply to satisfy the bank's documentary requirements.</p>
                <p>Incoterms® 2020 provides an elegant solution. A new option has been added to the FCA rule (in articles A6/B6) that allows the buyer and seller to agree in their sales contract that the buyer will instruct its carrier to issue an on-board Bill of Lading to the seller after the goods have been loaded onto the vessel. This allows the seller to meet the L/C requirements while still using the logistically correct Incoterm®. This change is a direct response to market needs and is intended to encourage the proper use of FCA for container shipments.</p>
              </section>
              <section id="new-standard-insurance" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">3.3 A New Standard for Insurance: The Divergence of CIP and CIF</h3>
                <p>The 2020 rules introduced a crucial differentiation in the level of insurance coverage required under the two terms that obligate the seller to purchase insurance: Carriage and Insurance Paid To (CIP) and Cost, Insurance, and Freight (CIF).</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>CIP:</b> The required level of insurance has been significantly increased. The seller must now arrange for a higher level of "all-risks" insurance, compliant with Institute Cargo Clauses (A) or similar comprehensive coverage. This change reflects the common use of CIP for higher-value manufactured goods and containerized cargo, which warrant more robust protection against a wider range of risks.</li>
                  <li><b>CIF:</b> This maritime-only rule retains the lower, minimum-cover requirement of Institute Cargo Clauses (C). This is considered sufficient for the typical use of CIF in the trade of bulk commodities, where price is often the primary driver and parties are accustomed to this level of cover.</li>
                </ul>
                <p>Parties using either term remain free to negotiate a different level of insurance cover in their sales contract, but these are the new default positions. This change necessitates that traders review their insurance practices to ensure compliance, particularly when using CIP.</p>
              </section>
              <section id="accommodating-modern-logistics" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">3.4 Accommodating Modern Logistics: Provisions for Own Transport</h3>
                <p>The Incoterms® 2010 rules were drafted with the underlying assumption that the carriage of goods between the seller and buyer would always be outsourced to a third-party carrier. Incoterms® 2020 updated this perspective to reflect the reality that businesses sometimes use their own transport assets to deliver or collect goods.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>FCA:</b> The buyer may use their own vehicle to collect the goods from the seller's premises.</li>
                  <li><b>DAP, DPU, and DDP:</b> The seller may use their own vehicle to deliver the goods to the named destination.</li>
                </ul>
                <p>This change brings the rules in line with contemporary logistics practices and provides clarity for transactions where parties handle transport in-house.</p>
              </section>
              <section id="enhanced-clarity" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">3.5 Enhanced Clarity: Consolidated Cost Listings and Security Requirements</h3>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Consolidated Costs:</b> One of the most user-friendly updates is the aggregation of all cost allocations into a single article, A9/B9 "Allocation of Costs," for each rule. In previous versions, costs were scattered across several articles, making it difficult for users to get a complete picture of their financial responsibilities. The new format provides a comprehensive "one-stop list of costs," allowing buyers and sellers to see at a glance all the expenses for which they are responsible under a given term. This helps prevent surprises, such as disputes over which party should pay for terminal handling charges (THC).</li>
                  <li><b>Explicit Security Requirements:</b> Reflecting the heightened focus on supply chain security in the 21st century, the 2020 rules now explicitly address security-related obligations and their associated costs. These requirements are clearly detailed in articles A4 (Carriage) and A7 (Export/Import Clearance) of each rule, and the related costs are listed in the A9/B9 cost article. This ensures that both parties are aware of their responsibilities for security-related clearances, screenings, and information sharing.</li>
                </ul>
              </section>
            </section>
            {/* Table 3.1 */}
            <section id="table-3-1" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Table 3.1: Incoterms® 2010 vs. 2020: A Comparative Analysis</h2>
              <p>This table summarizes the key changes and their practical impact on traders.</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Feature</th>
                      <th className="border px-2 py-1">Incoterms® 2010 Rule</th>
                      <th className="border px-2 py-1">Incoterms® 2020 Rule</th>
                      <th className="border px-2 py-1">Practical Implication for Traders</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Delivery Unloaded</td>
                      <td className="border px-2 py-1">DAT (Delivered at Terminal): Delivery at a named "terminal," unloaded.</td>
                      <td className="border px-2 py-1">DPU (Delivered at Place Unloaded): Replaces DAT. Delivery at any named "place," unloaded.</td>
                      <td className="border px-2 py-1">Provides greater flexibility for the destination point, clarifying that delivery is not limited to transport terminals. Sellers must ensure they can unload at the specified place.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">FCA & Letters of Credit</td>
                      <td className="border px-2 py-1">FCA (Free Carrier): Seller delivers to carrier at origin. No provision for obtaining an on-board Bill of Lading.</td>
                      <td className="border px-2 py-1">FCA (Free Carrier): Adds an option for the buyer to instruct their carrier to issue an on-board Bill of Lading to the seller.</td>
                      <td className="border px-2 py-1">Solves a major practical problem, making FCA the correct and viable choice for containerized sea freight paid by Letter of Credit, reducing the misuse of FOB.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Insurance for CIP</td>
                      <td className="border px-2 py-1">CIP (Carriage and Insurance Paid To): Seller must provide minimum insurance cover (Institute Cargo Clauses C).</td>
                      <td className="border px-2 py-1">CIP (Carriage and Insurance Paid To): Seller must provide comprehensive, "all-risks" insurance cover (Institute Cargo Clauses A).</td>
                      <td className="border px-2 py-1">Buyers of manufactured or high-value goods under CIP receive significantly better default insurance protection. Sellers must account for the higher premium cost.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Insurance for CIF</td>
                      <td className="border px-2 py-1">CIF (Cost, Insurance, and Freight): Seller must provide minimum insurance cover (Institute Cargo Clauses C).</td>
                      <td className="border px-2 py-1">CIF (Cost, Insurance, and Freight): Requirement for minimum cover (Institute Cargo Clauses C) is unchanged.</td>
                      <td className="border px-2 py-1">No change in practice for CIF users, maintaining its suitability for bulk commodity trades where this level of cover is standard.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Arrangement of Transport</td>
                      <td className="border px-2 py-1">Assumed to be by a third-party carrier.</td>
                      <td className="border px-2 py-1">FCA, DAP, DPU, DDP: Explicitly allow for transport using the buyer's or seller's own means of transport.</td>
                      <td className="border px-2 py-1">The rules now formally recognize and accommodate in-house logistics capabilities, providing clarity for businesses that do not outsource all transport.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Cost Allocation</td>
                      <td className="border px-2 py-1">Costs were listed under various relevant articles.</td>
                      <td className="border px-2 py-1">All costs are now consolidated in a single article (A9/B9) for each rule.</td>
                      <td className="border px-2 py-1">Greatly improves user-friendliness and transparency. Parties can see a complete list of their cost responsibilities in one place, reducing the risk of disputes over unforeseen charges.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Security Obligations</td>
                      <td className="border px-2 py-1">Security requirements were less explicit.</td>
                      <td className="border px-2 py-1">Security-related obligations and their associated costs are clearly detailed in articles A4/A7 and A9/B9.</td>
                      <td className="border px-2 py-1">Provides clear guidance on which party is responsible for security-related tasks and costs, reflecting the increased importance of supply chain security.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            {/* Chapter 4 */}
            <section id="strategic-selection" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Chapter 4: Strategic Selection: Choosing the Right Incoterm® for Your Business</h2>
              <p>Understanding the definition of each Incoterm® is only the first step. True mastery lies in applying this knowledge strategically to align with your company's capabilities, risk appetite, and commercial objectives. The choice of rule is a negotiation point that can significantly impact profitability and supply chain efficiency. This chapter provides a framework for making that strategic choice.</p>
              
              <section id="sellers-perspective" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">4.1 A Seller's Perspective: Maximizing Control and Minimizing Risk</h3>
                <p>For a seller (exporter), the primary goals are often to get paid promptly, minimize liability for the goods once they leave the factory, and maintain control where it is commercially advantageous.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Minimum Risk Strategy (The "E" and "F" Terms):</b>
                    <ul className="list-disc pl-6">
                      <li><b>EXW (Ex Works):</b> Places the least responsibility on the seller. It is attractive for its simplicity but should be used with caution for international sales due to the seller's lack of control over export and the potential difficulty in obtaining proof of export for tax purposes.</li>
                      <li><b>FCA (Free Carrier):</b> Often the most advantageous term for a sophisticated seller. The seller fulfills their obligation in their own country, transferring risk early. They are responsible for export clearance, which they are best positioned to handle, but they are not responsible for the costs and risks of the main international transit. This provides a clean cut-off point for both risk and cost.</li>
                    </ul>
                  </li>
                  <li><b>Customer-Friendly Strategy (The "C" Terms):</b>
                    <ul className="list-disc pl-6">
                      <li><b>CPT (Carriage Paid To) & CIP (Carriage and Insurance Paid To):</b> These terms allow the seller to offer a price that includes transportation to the buyer's country, which can be a powerful sales tool. The seller can leverage their shipping volume to get competitive freight rates and include the cost (plus a margin) in the sale price. Crucially, while the seller pays for the freight, the risk of loss during transit passes to the buyer at the origin. This combination makes C-terms a popular choice for sellers who want to provide a value-added service without retaining transit risk. CIP is particularly strong, as offering "all-risks" insurance is a significant benefit to the buyer.</li>
                      <li><b>CFR (Cost and Freight) & CIF (Cost, Insurance, and Freight):</b> These are the maritime equivalents of CPT and CIP and serve the same strategic purpose for sellers of non-containerized goods.</li>
                    </ul>
                  </li>
                  <li><b>Maximum Control Strategy (The "D" Terms):</b>
                    <ul className="list-disc pl-6">
                      <li><b>DAP (Delivered at Place) & DPU (Delivered at Place Unloaded):</b> These terms should be used when the seller has a competitive advantage in managing the entire logistics chain to the destination country and wants to offer a "landed" price (excluding import duties). This can be a key differentiator, especially if the seller has reliable logistics partners in the buyer's region.</li>
                      <li><b>DDP (Delivered Duty Paid):</b> This term should only be considered by highly experienced sellers with a deep understanding of the import country's customs and tax regulations, and preferably a legal presence there. While it offers the buyer the ultimate convenience, it exposes the seller to the maximum level of cost, risk, and complexity.</li>
                    </ul>
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3">Seller's Strategic Selection Flowchart</h4>
                  <div className="bg-white p-4 rounded border">
                    <div className="text-sm font-mono">
                      <div className="mb-2">A [Start]</div>
                      <div className="ml-4 mb-2">↓</div>
                      <div className="ml-4 mb-2">B {`{Do you want to handle export clearance?}`}</div>
                      <div className="ml-8 mb-2">├─ No → C [Use EXW]</div>
                      <div className="ml-8 mb-2">└─ Yes → D {`{Do you want to pay for the main international transport?}`}</div>
                      <div className="ml-12 mb-2">├─ No → E {`{Mode of Transport?}`}</div>
                      <div className="ml-16 mb-2">├─ Any Mode/Container → F [Use FCA]</div>
                      <div className="ml-16 mb-2">└─ Sea (Non-containerized) → G {`{Deliver alongside or on board?}`}</div>
                      <div className="ml-20 mb-2">├─ Alongside → H [Use FAS]</div>
                      <div className="ml-20 mb-2">└─ On Board → I [Use FOB]</div>
                      <div className="ml-12 mb-2">└─ Yes → J {`{Do you want to bear the risk during main transport?}`}</div>
                      <div className="ml-16 mb-2">├─ No (Risk transfers at origin) → K {`{Mode of Transport?}`}</div>
                      <div className="ml-20 mb-2">├─ Any Mode/Container → L {`{Arrange insurance for buyer?}`}</div>
                      <div className="ml-24 mb-2">├─ No → M [Use CPT]</div>
                      <div className="ml-24 mb-2">└─ Yes → N [Use CIP]</div>
                      <div className="ml-20 mb-2">└─ Sea (Non-containerized) → O {`{Arrange insurance for buyer?}`}</div>
                      <div className="ml-24 mb-2">├─ No → P [Use CFR]</div>
                      <div className="ml-24 mb-2">└─ Yes → Q [Use CIF (Minimum Cover)]</div>
                      <div className="ml-16 mb-2">└─ Yes (Risk transfers at destination) → R {`{Do you want to handle import clearance and duties?}`}</div>
                      <div className="ml-20 mb-2">├─ No → S {`{Are you responsible for unloading?}`}</div>
                      <div className="ml-24 mb-2">├─ No → T [Use DAP]</div>
                      <div className="ml-24 mb-2">└─ Yes → U [Use DPU]</div>
                      <div className="ml-20 mb-2">└─ Yes → V [Use DDP]</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    <b>Note:</b> This flowchart helps sellers systematically evaluate their preferences for export clearance, transport costs, risk bearing, and import responsibilities to select the most appropriate Incoterm® for their business strategy.
                  </p>
                </div>
              </section>

              <section id="buyers-perspective" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">4.2 A Buyer's Perspective: Optimizing Costs and Ensuring Supply Chain Security</h3>
                <p>For a buyer (importer), the strategic objectives often revolve around achieving the lowest total landed cost, ensuring timely and secure delivery, and maintaining control over the supply chain.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Maximum Control & Cost Optimization (The "F" Terms):</b>
                    <ul className="list-disc pl-6">
                      <li><b>FCA (Free Carrier):</b> This is often the most strategic choice for a sophisticated buyer. By nominating their own carrier, the buyer gains full control over the main transport leg. They can leverage their own freight contracts to secure lower costs, choose faster or more reliable carriers, and have direct access to tracking information. This control over logistics is a powerful tool for managing inventory and production schedules.</li>
                      <li><b>FOB (Free on Board):</b> Serves the same purpose as FCA for buyers of non-containerized sea freight.</li>
                    </ul>
                  </li>
                  <li><b>Convenience Strategy (The "C" and "D" Terms):</b>
                    <ul className="list-disc pl-6">
                      <li><b>CIP (Carriage and Insurance Paid To) & CIF (Cost, Insurance, and Freight):</b> These terms are attractive to buyers who are less experienced or who ship low volumes and cannot get competitive freight rates themselves. The seller handles the logistics, and the buyer has the security of a pre-arranged insurance policy. However, the buyer must accept that the freight cost is likely marked up by the seller and that they have no control over the carrier or transit time. They must also understand that they bear the transit risk.</li>
                      <li><b>DAP (Delivered at Place) & DPU (Delivered at Place Unloaded):</b> These are excellent "middle-ground" terms for buyers. They offer the convenience of the seller managing the entire risky journey to the buyer's country, but they leave the crucial final step—import customs clearance—in the buyer's control. The buyer is best equipped to deal with their own country's customs authorities, making this a much safer arrangement than DDP.</li>
                      <li><b>DDP (Delivered Duty Paid):</b> While DDP offers maximum convenience and cost certainty, it comes with significant hidden risks for the buyer. As discussed, the buyer loses all control over the shipping process and is exposed to delays caused by the seller's choice of cheap carriers or their potential incompetence in handling import formalities. A savvy buyer will often prefer DAP and manage their own import clearance to ensure compliance and supply chain reliability.</li>
                    </ul>
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3">Buyer's Strategic Selection Flowchart</h4>
                  <div className="bg-white p-4 rounded border">
                    <div className="text-sm font-mono">
                      <div className="mb-2">A [Start]</div>
                      <div className="ml-4 mb-2">↓</div>
                      <div className="ml-4 mb-2">B {`{Do you want to arrange and pay for the main international transport?}`}</div>
                      <div className="ml-8 mb-2">├─ Yes → C {`{Do you want to handle export clearance in the seller's country?}`}</div>
                      <div className="ml-12 mb-2">├─ Yes → D [Use EXW (Caution: High risk and complexity for buyer)]</div>
                      <div className="ml-12 mb-2">└─ No → E {`{Mode of Transport?}`}</div>
                      <div className="ml-16 mb-2">├─ Any Mode/Container → F [Use FCA]</div>
                      <div className="ml-16 mb-2">└─ Sea (Non-containerized) → G {`{Risk transfer alongside or on board?}`}</div>
                      <div className="ml-20 mb-2">├─ Alongside → H [Use FAS]</div>
                      <div className="ml-20 mb-2">└─ On Board → I [Use FOB]</div>
                      <div className="ml-8 mb-2">└─ No → J {`{Do you want to bear the risk during main transport?}`}</div>
                      <div className="ml-12 mb-2">├─ Yes (Risk transfers at origin) → K {`{Mode of Transport?}`}</div>
                      <div className="ml-16 mb-2">├─ Any Mode/Container → L {`{Do you need the seller to arrange insurance?}`}</div>
                      <div className="ml-20 mb-2">├─ No → M [Use CPT]</div>
                      <div className="ml-20 mb-2">└─ Yes → N [Use CIP]</div>
                      <div className="ml-16 mb-2">└─ Sea (Non-containerized) → O {`{Do you need the seller to arrange insurance?}`}</div>
                      <div className="ml-20 mb-2">├─ No → P [Use CFR]</div>
                      <div className="ml-20 mb-2">└─ Yes → Q [Use CIF (Minimum Cover)]</div>
                      <div className="ml-12 mb-2">└─ No (Risk transfers at destination) → R {`{Do you want to handle import clearance and duties?}`}</div>
                      <div className="ml-16 mb-2">├─ Yes → S {`{Do you want to be responsible for unloading?}`}</div>
                      <div className="ml-20 mb-2">├─ Yes → T [Use DAP]</div>
                      <div className="ml-20 mb-2">└─ No → U [Use DPU]</div>
                      <div className="ml-16 mb-2">└─ No → V [Use DDP]</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    <b>Note:</b> This flowchart helps buyers systematically evaluate their preferences for transport arrangement, risk bearing, and import responsibilities to select the most appropriate Incoterm® for their business strategy.
                  </p>
                </div>
              </section>

              <section id="container-conundrum" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">4.3 The Container Conundrum: Why FCA is the New FOB for Containerized Freight</h3>
                <p>One of the most persistent and dangerous mistakes in international trade is the use of the maritime term FOB for containerized shipments. While historically common, this practice creates a significant and often uninsured "responsibility gap" for the seller. The ICC has been unequivocal in recommending FCA as the correct replacement.</p>
                <p>The logic is rooted in the physical reality of container logistics:</p>
                <ol className="list-decimal pl-6 mb-2">
                  <li><b>The Point of Handover:</b> A seller of containerized goods does not deliver them by hoisting them over a ship's rail. Instead, they deliver the sealed container to a carrier at an inland location, typically a port's container yard (CY) or a freight forwarder's depot. This is the true point where the seller loses physical control of the goods.</li>
                  <li><b>The FOB Risk Gap:</b> The FOB rule states that risk only transfers from the seller to the buyer when the goods are "on board the vessel." This means that if a seller agrees to "FOB," they remain liable for the container for the entire period it sits in the terminal—which can be several days—waiting to be loaded. During this time, the container is outside the seller's control but still at their risk. If the container is damaged by a terminal operator, dropped during loading, or stolen from the yard, the seller is financially responsible.</li>
                  <li><b>The FCA Solution:</b> The FCA rule perfectly aligns with this reality. When "FCA [named port terminal]" is used, the seller delivers the goods to the carrier at the terminal. Risk transfers to the buyer at that logical point of handover. The seller is no longer exposed to risks within the terminal over which they have no control.</li>
                  <li><b>The 2020 B/L Change:</b> As discussed in Chapter 3, the Incoterms® 2020 update to FCA, which allows the seller to obtain an on-board Bill of Lading, removes the last major practical reason for sellers to misuse FOB for container shipments paid by Letter of Credit.</li>
                </ol>
                <p>In summary, for any shipment involving a container, whether by sea, road, or rail, FCA is the more appropriate and safer term than FOB. Using FOB exposes the seller to unnecessary risk, while FCA correctly reflects the logistical process and provides a clear and fair point of risk transfer.</p>
              </section>

              <section id="incoterms-letters-credit" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">4.4 Incoterms® and Letters of Credit: Aligning Trade Terms with Financial Instruments</h3>
                <p>A Letter of Credit (L/C) is a common payment method in international trade that provides security to both buyer and seller. However, its mechanism relies on the strict compliance of documents. A failure to align the chosen Incoterm® with the documentary requirements of the L/C is a frequent cause of payment delays and disputes.</p>
                <p>The core issue is that an L/C will specify a set of documents that the seller must present to a bank to prove they have fulfilled their obligations and to trigger payment. A key document is almost always a transport document, such as an on-board Bill of Lading.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Favorable Terms for L/Cs:</b> The "C" terms (CIF, CFR, CIP, CPT) are generally well-suited for L/C transactions. Under these rules, the seller is responsible for arranging the main carriage and therefore has a direct contractual relationship with the carrier. This makes it straightforward for the seller to obtain the required transport document from the carrier to present to the bank.</li>
                  <li><b>The FCA Solution:</b> As detailed previously, the 2020 update to FCA makes it a much more secure choice for L/C-financed container shipments. By agreeing to the on-board B/L option, the parties can ensure the seller receives the document needed for the L/C presentation.</li>
                  <li><b>Problematic Terms for L/Cs:</b>
                    <ul className="list-disc pl-6">
                      <li><b>EXW:</b> The seller has no involvement in transport and receives no transport document, making it extremely difficult to satisfy L/C requirements.</li>
                      <li><b>"D" Terms (DAP, DPU, DDP):</b> With these terms, delivery occurs late in the journey. This creates a risk for the buyer that the seller could present documents and get paid under the L/C before the goods have actually been delivered to the final destination.</li>
                    </ul>
                  </li>
                </ul>
                <p>Therefore, when payment is to be made by Letter of Credit, the parties must ensure the chosen Incoterm® allows the seller to obtain the specific documents required by the L/C in a timely manner. The "C" terms and the updated FCA rule are the most reliable choices for this purpose.</p>
              </section>
            </section>
          </section>

          {/* Part IV: Risk Management and Legal Context */}
          <section id="part-iv-risk-management-legal-context" className="mb-8">
            <h2 className="text-xl font-bold mb-3 truncate">Part IV: Risk Management and Legal Context</h2>
            
            {/* Chapter 5 */}
            <section id="documentation-customs-compliance" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Chapter 5: Documentation, Customs, and Compliance</h2>
              <p>Successfully navigating an international trade transaction requires more than just moving goods; it demands meticulous management of documentation, customs procedures, and compliance with various regulations. The Incoterms® rules provide a clear framework for assigning these critical responsibilities.</p>
              
              <section id="essential-paper-trail" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">5.1 The Essential Paper Trail: Key Documents in an International Transaction</h3>
                <p>Every international shipment is accompanied by a trail of documents that serve distinct but interconnected purposes: proving the sale, facilitating transport, clearing customs, satisfying payment terms, and proving compliance. While the specific documents required can vary by country and product, a typical transaction involves the following:</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Commercial Invoice:</b> The primary document of the sale, issued by the seller to the buyer. It contains a description of the goods, quantities, price per unit, total value, and the agreed Incoterm®. It is used by customs authorities to determine duties and taxes.</li>
                  <li><b>Packing List:</b> A detailed list of the contents of each package in the shipment, including weights, dimensions, and markings. It is used by carriers, customs, and the buyer to verify the shipment's contents.</li>
                  <li><b>Transport Document:</b> This document is issued by the carrier and serves as a contract of carriage, a receipt for the goods, and, in some cases, a document of title. The type depends on the mode of transport:
                    <ul className="list-disc pl-6">
                      <li><b>Bill of Lading (B/L):</b> For sea freight. A negotiable B/L also acts as a document of title, meaning whoever holds the original document can claim the goods.</li>
                      <li><b>Sea Waybill:</b> A non-negotiable document for sea freight.</li>
                      <li><b>Air Waybill (AWB):</b> For air freight.</li>
                      <li><b>CMR Note / Rail Consignment Note:</b> For road and rail transport.</li>
                    </ul>
                  </li>
                  <li><b>Insurance Policy or Certificate:</b> Required under CIF and CIP terms, this document provides evidence of insurance coverage and is needed by the buyer to file a claim in case of loss or damage.</li>
                  <li><b>Certificate of Origin (COO):</b> A document that certifies the country in which the goods were manufactured. It is often required by customs authorities to determine eligibility for preferential tariff rates under free trade agreements.</li>
                  <li><b>Export/Import Licenses:</b> Government-issued permits that authorize the export or import of specific goods (e.g., military items, certain technologies, agricultural products).</li>
                </ul>
                <p>The chosen Incoterm® rule dictates which party is responsible for obtaining and providing these documents, particularly the transport document and any licenses required for export or import clearance.</p>
              </section>

              <section id="navigating-customs" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">5.2 Navigating Customs: Export and Import Clearance Responsibilities</h3>
                <p>Every Incoterm® rule explicitly states which party—the seller or the buyer—is responsible for carrying out and paying for the customs formalities required for both export from the origin country and import into the destination country.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Export Clearance:</b> This is the process of declaring the goods to the customs authority in the country of origin and obtaining official permission to ship them.
                    <ul className="list-disc pl-6">
                      <li>Under EXW, this is the buyer's responsibility.</li>
                      <li>Under all ten other terms (FCA, FAS, FOB, CPT, CIP, CFR, CIF, DAP, DPU, DDP), this is the seller's responsibility. This is a key reason why FCA is generally preferable to EXW for international sales.</li>
                    </ul>
                  </li>
                  <li><b>Import Clearance:</b> This is the process of declaring the goods to the customs authority in the country of destination, paying any applicable duties and taxes, and obtaining release of the goods.
                    <ul className="list-disc pl-6">
                      <li>Under DDP, this is the seller's responsibility.</li>
                      <li>Under all ten other terms (EXW, FCA, FAS, FOB, CPT, CIP, CFR, CIF, DAP, DPU), this is the buyer's responsibility.</li>
                    </ul>
                  </li>
                </ul>
                <p>This clear division of responsibility is fundamental. A failure by the responsible party to properly handle customs clearance can result in significant delays, storage fees, fines, and even seizure of the goods.</p>
              </section>

              <section id="insurance-obligations" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">5.3 Insurance Obligations Under CIF and CIP: A Legal and Practical Analysis</h3>
                <p>CIF and CIP are the only two Incoterms® that place an obligation on the seller to purchase insurance for the benefit of the buyer. This feature is often misunderstood.</p>
                <p>It is crucial to remember that under both terms, the seller is "off-risk" during the main transit. Risk transfers to the buyer at the origin (on board the vessel for CIF, at the first carrier for CIP). The insurance policy is therefore the buyer's primary, and often only, means of recourse if the goods are lost or damaged during the journey for which the seller paid freight. The seller's obligation is to provide the policy, not to guarantee safe arrival.</p>
                <p>As detailed in Chapter 3, the level of required coverage differs significantly:</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>CIF:</b> Requires minimum cover under Institute Cargo Clauses (C). This is a "named perils" policy that covers major events like fire, explosion, and the vessel sinking or stranding, but it does not cover many common causes of loss, such as theft, water damage from heavy weather, or damage during loading/unloading.</li>
                  <li><b>CIP:</b> Requires comprehensive cover under Institute Cargo Clauses (A). This is an "all-risks" policy that covers any loss or damage from any external cause, except for a list of specific exclusions (e.g., willful misconduct of the assured, ordinary leakage, inherent vice, delay).</li>
                </ul>
                <p><b>Practical Advice for Buyers:</b></p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Review the Coverage:</b> Never assume the default insurance is sufficient. A buyer of high-value electronics accepting CIF terms is likely severely underinsured.</li>
                  <li><b>Negotiate for Higher Cover:</b> If using CIF, the buyer should consider negotiating with the seller to provide Clause (A) coverage, for which the buyer would typically pay the extra premium.</li>
                  <li><b>Arrange Top-Up Insurance:</b> Alternatively, the buyer can purchase their own supplementary insurance policy to "top up" the seller's minimum cover to a comprehensive level.</li>
                </ul>
              </section>
            </section>

            {/* Table 5.1 */}
            <section id="table-5-1" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Table 5.1: Documentation & Customs Checklist by Incoterm® Group</h2>
              <p>This checklist simplifies the operational responsibilities for documentation and customs based on the Incoterm® group.</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Task</th>
                      <th className="border px-2 py-1">Group E (EXW)</th>
                      <th className="border px-2 py-1">Group F (FCA, FAS, FOB)</th>
                      <th className="border px-2 py-1">Group C (CPT, CIP, CFR, CIF)</th>
                      <th className="border px-2 py-1">Group D (DAP, DPU, DDP)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Arrange Transport Document</td>
                      <td className="border px-2 py-1">Buyer</td>
                      <td className="border px-2 py-1">Buyer</td>
                      <td className="border px-2 py-1">Seller</td>
                      <td className="border px-2 py-1">Seller</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Arrange Insurance</td>
                      <td className="border px-2 py-1">Buyer</td>
                      <td className="border px-2 py-1">Buyer</td>
                      <td className="border px-2 py-1">Seller (CIF/CIP only)¹</td>
                      <td className="border px-2 py-1">Seller²</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Handle Export Clearance</td>
                      <td className="border px-2 py-1">Buyer</td>
                      <td className="border px-2 py-1">Seller</td>
                      <td className="border px-2 py-1">Seller</td>
                      <td className="border px-2 py-1">Seller</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Handle Import Clearance</td>
                      <td className="border px-2 py-1">Buyer</td>
                      <td className="border px-2 py-1">Buyer</td>
                      <td className="border px-2 py-1">Buyer</td>
                      <td className="border px-2 py-1">Seller (DDP only)³</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-sm">
                <h4 className="font-semibold mb-2">Checklist Footnotes:</h4>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Under CIF, the seller must provide minimum cover. Under CIP, the seller must provide all-risks cover. For CFR and CPT, neither party is obligated to insure.</li>
                  <li>Under the "D" terms, the seller bears the risk until destination, so they will typically insure for their own protection, but they are not obligated to provide a policy for the buyer's benefit.</li>
                  <li>Under DAP and DPU, import clearance is the buyer's responsibility.</li>
                </ol>
              </div>
            </section>

            {/* Chapter 6 */}
            <section id="avoiding-costly-mistakes" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Chapter 6: Avoiding Costly Mistakes: Common Pitfalls and Real-World Case Studies</h2>
              <p>Theoretical knowledge of the Incoterms® rules is valuable, but understanding how they are misused in practice is essential for effective risk management. This chapter outlines the most common errors made by traders and illustrates the consequences through real-world examples.</p>
              
              <section id="top-10-incoterms-errors" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">6.1 The Top 10 Incoterms® Errors and How to Prevent Them</h3>
                <p>Based on analysis of trade disputes and expert commentary, the following represent the most frequent and costly mistakes made by importers and exporters:</p>
                <ol className="list-decimal pl-6 mb-2">
                  <li><b>Using a Sea Term (FOB, CIF) for Containerized/Multimodal Transport:</b> As detailed in Chapter 4, this is arguably the most common error. It creates a risk gap for the seller and misaligns the rule with modern logistics. <b>Prevention:</b> Use FCA, CPT, or CIP for any shipment involving a container.</li>
                  <li><b>Failing to Specify the Named Place with Precision:</b> Using vague locations like "FCA Hamburg" or "DAP New York" is a recipe for disaster. It creates ambiguity about which party is responsible for inland transport and terminal charges. <b>Prevention:</b> Always specify a full and exact address or terminal location (e.g., "FCA, Container Terminal Altenwerder, Hamburg, Germany Incoterms® 2020").</li>
                  <li><b>Misunderstanding the Risk/Cost Transfer Point in "C" Terms:</b> Buyers frequently assume that because the seller pays for freight (under CPT/CFR/CIF/CIP), the seller also bears the risk until destination. This is incorrect; risk transfers at origin. <b>Prevention:</b> Both parties must understand that C-terms are "shipment contracts," not "arrival contracts." The buyer is responsible for transit risk and should ensure adequate insurance is in place.</li>
                  <li><b>Confusing Incoterms® with Transfer of Title:</b> Many traders mistakenly believe the Incoterm® determines when ownership of the goods passes. It does not. <b>Prevention:</b> The transfer of title must be explicitly defined in a separate clause within the sales contract.</li>
                  <li><b>Using DDP Without Understanding Import Regulations:</b> A seller agrees to DDP without realizing they cannot legally act as the Importer of Record in the buyer's country or without knowing the correct duties and taxes. <b>Prevention:</b> Sellers should only use DDP if they have expertise and legal standing in the destination country. Buyers should be wary of DDP as it removes their control over a critical part of their supply chain. DAP or DPU are often safer alternatives.</li>
                  <li><b>Using EXW for International Shipments:</b> A buyer agrees to EXW and then discovers they cannot handle export clearance in the seller's country. <b>Prevention:</b> EXW should be avoided for cross-border trade unless the buyer has a confirmed agent in the origin country to handle exports. FCA is the recommended alternative.</li>
                  <li><b>Not Specifying the Incoterms® Version:</b> The contract simply states "CIF Singapore." This creates ambiguity as to whether the 2010, 2020, or even an earlier version applies, which can have significant implications (e.g., for insurance under CIP). <b>Prevention:</b> Always specify the version, e.g., "Incoterms® 2020".</li>
                  <li><b>Assuming the Seller's Minimum Insurance under CIF/CIP is Sufficient:</b> A buyer of sensitive electronics accepts CIF terms, and the goods are damaged by a cause not covered under the minimal Clause C insurance. <b>Prevention:</b> Buyers must assess the value and nature of their goods and determine if the default insurance is adequate. If not, they must negotiate for higher cover or purchase their own.</li>
                  <li><b>Failing to Align the Incoterm® with L/C Requirements:</b> A seller agrees to an Incoterm® that makes it difficult to obtain the specific transport document required by the buyer's Letter of Credit, leading to payment rejection. <b>Prevention:</b> Before finalizing the contract, ensure the chosen Incoterm® (ideally a C-term or the updated FCA) allows the seller to procure the exact documents stipulated in the L/C.</li>
                  <li><b>Misunderstanding Who Pays for Terminal Handling Charges (THC):</b> Under C-terms, it is often unclear whether the seller's freight payment includes THC at the destination. The buyer arrives to collect their goods and is hit with an unexpected bill from the terminal. <b>Prevention:</b> The sales contract should explicitly state which party is responsible for THC at both the origin and destination ports/terminals.</li>
                </ol>
              </section>

              <section id="case-study-analysis" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">6.2 Case Study Analysis: Lessons from Real-World Disputes</h3>
                <p>Analyzing past disputes provides invaluable lessons in risk management. The following cases illustrate how seemingly minor details in a contract can have major financial consequences.</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Case 1: The MRI Machine (CIF vs. Retention of Title)</h4>
                  <ul className="list-disc pl-6 mb-2">
                    <li><b>Scenario:</b> A German seller sold an MRI machine to a US buyer under "CIF New York" terms. The contract also contained a "retention of title" clause, stating the seller retained ownership until paid in full. The machine was in good working order when shipped but arrived damaged. The buyer's insurer sued the seller, arguing that because the seller still "owned" the machine, they were responsible for the damage.</li>
                    <li><b>Analysis:</b> This case highlights the crucial distinction between risk and title. Under the CIF Incoterm®, the risk of loss or damage passed from the seller to the buyer the moment the machine was loaded onto the vessel in Germany. The fact that the seller retained legal title as security for payment does not override the explicit risk transfer provision of the chosen Incoterm®. The damage occurred during the sea voyage, which was at the buyer's risk. The buyer's proper recourse was to file a claim under the marine insurance policy that the seller was obligated to provide under the CIF term.</li>
                    <li><b>Lesson:</b> The Incoterm® rule for risk transfer operates independently of the contractual clause for title transfer. Do not assume that retaining title also means retaining risk.</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Case 2: The Gummy Oil (CFR and Quality Inspection)</h4>
                  <ul className="list-disc pl-6 mb-2">
                    <li><b>Scenario:</b> An Ecuadorian buyer purchased gasoline from a seller under "CFR La Libertad" terms. The contract specified that the quality (gum content) was to be determined by an independent inspection at the port of departure in Houston. The inspection in Houston certified the gasoline as conforming. Upon arrival in Ecuador, the buyer conducted their own test and found the quality had deteriorated and the gum content was too high. The buyer rejected the shipment.</li>
                    <li><b>Analysis:</b> Under the CFR Incoterm®, risk transfers from the seller to the buyer when the goods are loaded on board the vessel at the port of origin. The contract specified that the determinative quality inspection was to take place at this point. Since the gasoline passed the inspection in Houston, the seller fulfilled their contractual obligation to ship conforming goods. The risk of the product deteriorating during the subsequent sea voyage was borne by the buyer.</li>
                    <li><b>Lesson:</b> The point of risk transfer is also the point where the seller's responsibility for the condition of the goods typically ends, provided they conform to the contract at that moment. If a buyer wants to ensure quality upon arrival, they must either negotiate for a D-group (arrival) term or include a specific contractual clause to that effect.</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Case 3: The Filthy Beans (C&F and Regulatory Rejection)</h4>
                  <ul className="list-disc pl-6 mb-2">
                    <li><b>Scenario:</b> A US buyer purchased beans from a seller in Hong Kong under "C&F Portland" terms (C&F is an older, but functionally identical, term for CFR). The goods were shipped with quality certificates from an independent agency. Upon arrival, the US Food and Drug Administration (FDA) inspected the beans, found them to be "filthy," and detained the shipment. The buyer rejected the goods.</li>
                    <li><b>Analysis:</b> This case reinforces the lesson from the "Gummy Oil" case and adds a regulatory dimension. The seller's obligation under a C-term is to deliver goods of the contractually agreed quality to the vessel at the port of shipment. They are not responsible for ensuring the goods meet the specific regulatory or import requirements of the buyer's country upon arrival. The risk of the goods failing an import inspection by a government agency like the FDA falls squarely on the buyer.</li>
                    <li><b>Lesson:</b> Buyers must be aware that under E, F, and C group terms, they bear the risk of import compliance. It is the buyer's responsibility to know their country's import regulations and ensure the goods they are purchasing will be admissible. If a buyer wants to place this responsibility on the seller, they must negotiate a DDP contract.</li>
                  </ul>
                </div>
              </section>
            </section>
          </section>

          {/* Part V: The Broader Legal and Commercial Context */}
          <section id="part-v-broader-legal-commercial-context" className="mb-8">
            <h2 className="text-xl font-bold mb-3 truncate">Part V: The Broader Legal and Commercial Context</h2>
            
            {/* Chapter 7 */}
            <section id="integrating-incoterms-sales-contract" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Chapter 7: Beyond the Three Letters: Integrating Incoterms® into Your Sales Contract</h2>
              <p>While the Incoterms® rules are a powerful tool for defining key aspects of a sale, they are not a substitute for a well-drafted international sales contract. A robust contract will incorporate the chosen Incoterm® and then build upon it, addressing the critical commercial and legal issues that the rules do not cover.</p>
              
              <section id="sales-contract-master-document" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">7.1 The Sales Contract as the Master Document</h3>
                <p>The sales contract is the supreme document governing the relationship between the buyer and seller. The Incoterm® rule is just one clause within that larger agreement. This has an important implication: the sales contract can be used to modify or clarify the standard application of an Incoterm® rule to better suit the specific transaction. For example, the contract can specify a higher level of insurance cover under CIF than the default Clause (C), or it can explicitly state who pays for destination terminal handling charges under a C-term. However, this must be done with great care to avoid creating ambiguity.</p>
              </section>

              <section id="defining-transfer-title" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">7.2 Defining Transfer of Title: Sample Clauses and Best Practices</h3>
                <p>As established, Incoterms® do not govern the transfer of ownership. This must be handled separately in the contract. A common method for sellers to protect themselves against non-payment is the Retention of Title (RoT) clause. This clause stipulates that the seller retains legal ownership of the goods until the buyer has paid the purchase price in full, even though the risk of loss may have already passed to the buyer under the chosen Incoterm®.</p>
                <p>There are two main types of RoT clauses:</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Simple RoT Clause:</b> The seller retains title to the specific goods supplied until they are paid for.
                    <ul className="list-disc pl-6">
                      <li><b>Sample Wording:</b> "Title to the Products shall pass from the Seller to the Buyer only upon receipt by the Seller of payment in full of the purchase price. Risk of loss or damage to the Products shall pass from the Seller to the Buyer in accordance with the agreed Incoterm® 2020 rule."</li>
                    </ul>
                  </li>
                  <li><b>Extended RoT Clause:</b> The seller seeks to extend their ownership rights to include the proceeds from any resale of the goods by the buyer, or to any new products created by combining the goods with others. These clauses are more complex and their enforceability varies significantly between legal jurisdictions.</li>
                </ul>
                <p>Including a clear RoT clause is a critical risk management tool for sellers offering credit terms to their buyers.</p>
              </section>

              <section id="preparing-unexpected" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">7.3 Preparing for the Unexpected: The Force Majeure Clause</h3>
                <p>International trade is vulnerable to disruption from events beyond the control of either party. The Incoterms® rules do not address such events. Therefore, a comprehensive sales contract must include a Force Majeure clause.</p>
                <p>This clause excuses a party from liability for non-performance or delay if their failure is caused by a specified, unforeseeable, and unavoidable event. A well-drafted force majeure clause should include:</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>A Definition of Force Majeure Events:</b> This can be a general definition (e.g., "any event beyond the party's reasonable control") or a specific list of events (e.g., "acts of God, war, hostilities, invasion, earthquake, flood, fire, plague, embargo, act of government...").</li>
                  <li><b>Notification Requirements:</b> The affected party must promptly notify the other party of the event and its expected duration.</li>
                  <li><b>Mitigation Duties:</b> The affected party must use reasonable efforts to mitigate the effects of the event and resume performance.</li>
                  <li><b>Consequences:</b> The clause should state the outcome, which is typically a suspension of obligations for the duration of the event, and may allow for termination of the contract if the event continues for a prolonged period (e.g., more than 60 or 90 days).</li>
                </ul>
                <p>Without a force majeure clause, parties may be forced to rely on the default, and often uncertain, legal doctrines of "frustration" or "impossibility" under the contract's governing law.</p>
              </section>

              <section id="governing-law-dispute-resolution" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">7.4 Governing Law and Dispute Resolution</h3>
                <p>In the event of a disagreement, which country's laws will apply? And where will the dispute be heard—in a court or through arbitration? The Incoterms® rules are silent on these critical questions. The sales contract must specify:</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Governing Law Clause:</b> This clause names the body of law that will be used to interpret the contract (e.g., "This contract shall be governed by and construed in accordance with the laws of England and Wales").</li>
                  <li><b>Dispute Resolution Clause:</b> This clause specifies the method and location for resolving disputes. It may stipulate litigation in a specific court (e.g., "the courts of New York") or, increasingly in international trade, binding arbitration under the rules of an institution like the ICC International Court of Arbitration or the London Court of International Arbitration.</li>
                </ul>
                <p>Including these clauses provides legal certainty and a clear path forward if a dispute arises, preventing costly preliminary battles over jurisdiction.</p>
              </section>

              <section id="practice-modifying-incoterms" className="mb-6 ml-4">
                <h3 className="font-semibold mb-2">7.5 The Practice of Modifying Incoterms®: Benefits and Dangers</h3>
                <p>Parties are free to adapt the Incoterms® rules to their specific needs by adding qualifications. Common examples include:</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>"FOB Stowed and Trimmed":</b> Extends the seller's responsibility beyond simply loading to also include stowing and securing the cargo in the vessel's hold.</li>
                  <li><b>"EXW Loaded":</b> Clarifies that the seller is responsible for loading the goods onto the buyer's vehicle, shifting this risk and cost from the buyer to the seller.</li>
                  <li><b>"DDP, VAT Unpaid":</b> A common variation where the seller handles all transport and import duties, but the buyer is responsible for paying the Value-Added Tax in the destination country.</li>
                </ul>
                <p>While these modifications can provide useful flexibility, they must be approached with caution. The primary benefit of using Incoterms® is their universal, standardized meaning. Careless modifications can introduce ambiguity and uncertainty, potentially leading to the very disputes the rules are designed to prevent. If a rule is modified, the contract must clearly and precisely define the exact division of costs, risks, and obligations intended by the variation to ensure both parties have the same understanding.</p>
              </section>
            </section>
          </section>

          {/* Part VI: Appendices and Resources */}
          <section id="part-vi-appendices-resources" className="mb-8">
            <h2 className="text-xl font-bold mb-3 truncate">Part VI: Appendices and Resources</h2>
            
            {/* Appendix A */}
            <section id="glossary-international-trade" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Appendix A: Glossary of International Trade Terminology</h2>
              <ul className="list-disc pl-6 mb-2">
                <li><b>Bill of Lading (B/L):</b> A document issued by a carrier to a shipper, serving as a contract of carriage, a receipt for cargo, and, if negotiable, a document of title.</li>
                <li><b>Carrier:</b> Any party who, in a contract of carriage, undertakes to perform or to procure the performance of transport by rail, road, air, sea, inland waterway, or by a combination of such modes.</li>
                <li><b>Customs Clearance:</b> The administrative procedures required to allow goods to enter (import) or leave (export) a country.</li>
                <li><b>Demurrage:</b> A charge payable to the owner of a chartered ship or to a terminal on failure to load or discharge the ship or container within the time agreed.</li>
                <li><b>Exporter of Record (EOR):</b> The entity or individual in the country of export who is responsible for ensuring compliance with all export regulations.</li>
                <li><b>Freight Forwarder:</b> An agent who acts on behalf of importers, exporters, or other companies to organize the safe, efficient, and cost-effective transportation of goods.</li>
                <li><b>Importer of Record (IOR):</b> The entity or individual in the country of import who is responsible for ensuring compliance with all import regulations and for paying duties and taxes.</li>
                <li><b>Institute Cargo Clauses (ICC):</b> Standard sets of clauses for use in marine insurance policies, published by the Institute of London Underwriters. The main clauses are (A) - All Risks, (B) - Named Perils (broader), and (C) - Named Perils (basic).</li>
                <li><b>Letter of Credit (L/C):</b> A commitment by a bank on behalf of a buyer that payment will be made to a seller, provided that the terms and conditions stated in the L/C have been met.</li>
                <li><b>Multimodal Transport:</b> The transportation of goods under a single contract but performed with at least two different modes of transport (e.g., truck and ship).</li>
                <li><b>Terminal Handling Charges (THC):</b> Fees charged by port or airport terminals for the handling of cargo at the origin and destination.</li>
              </ul>
            </section>

            {/* Appendix B */}
            <section id="sample-cost-allocation-fca" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Appendix B: Sample Cost Allocation (A9/B9) for FCA Incoterms® 2020</h2>
              <p>To illustrate the level of detail provided in the Incoterms® 2020 rules, below is a summary of the cost allocation articles for the FCA rule.</p>
              
              <section className="mb-4 ml-4">
                <h3 className="font-semibold mb-2">A9 The Seller's Obligations: Allocation of Costs</h3>
                <p>The seller must pay:</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>(a)</b> All costs relating to the goods until they have been delivered in accordance with A2 (Delivery), other than costs payable by the buyer as envisaged in B9.</li>
                  <li><b>(b)</b> The costs of providing the usual proof to the buyer that the goods have been delivered.</li>
                  <li><b>(c)</b> The costs of export clearance formalities, as well as all duties, taxes, and other charges payable upon export.</li>
                  <li><b>(d)</b> The buyer for all costs and charges related to providing assistance in obtaining documents and information needed for import clearance.</li>
                </ul>
              </section>

              <section className="mb-4 ml-4">
                <h3 className="font-semibold mb-2">B9 The Buyer's Obligations: Allocation of Costs</h3>
                <p>The buyer must pay:</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>(a)</b> All costs relating to the goods from the time they have been delivered in accordance with A2 (Delivery).</li>
                  <li><b>(b)</b> The seller for all costs and charges incurred by the seller in providing assistance in obtaining documents and information.</li>
                  <li><b>(c)</b> Any duties, taxes, and other charges payable upon import or transit.</li>
                  <li><b>(d)</b> Any additional costs incurred if they fail to nominate a carrier or if the nominated carrier fails to take the goods into its charge.</li>
                </ul>
              </section>
            </section>

            {/* Appendix C */}
            <section id="recommended-resources" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Appendix C: Recommended Resources and Further Reading</h2>
              <p>For the most authoritative and complete information, users should always refer to the official publications of the International Chamber of Commerce (ICC).</p>
              <ul className="list-disc pl-6 mb-2">
                <li><b>Official ICC Incoterms® 2020 Publication (No. 723E):</b> The definitive rule book. It is essential for anyone regularly involved in international trade. Available for purchase from the ICC Store (store.iccwbo.org).</li>
                <li><b>ICC Guide to Incoterms® 2020 (No. 819E):</b> A companion guide that provides detailed commentary, explanations, and practical advice on applying the rules.</li>
                <li><b>ICC Academy:</b> Offers online courses and certifications on Incoterms® 2020, providing structured training for professionals.</li>
                <li><b>National Trade Promotion Organizations:</b> Government bodies such as the U.S. International Trade Administration (trade.gov) or Scottish Enterprise provide valuable guidance and resources for exporters and importers.</li>
              </ul>
            </section>

            {/* Appendix D */}
            <section id="frequently-asked-questions" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Appendix D: Frequently Asked Questions (FAQ)</h2>
              <ul className="list-disc pl-6 mb-2">
                <li><b>Q: Can we still use Incoterms® 2010 after January 1, 2020?</b>
                  <ul className="list-disc pl-6">
                    <li><b>A:</b> Yes. Parties are free to use any version of the Incoterms® rules. However, it is crucial to explicitly state the chosen version in the sales contract (e.g., "CIF Rotterdam, Incoterms® 2010") to avoid ambiguity.</li>
                  </ul>
                </li>
                <li><b>Q: Do Incoterms® apply to domestic trade?</b>
                  <ul className="list-disc pl-6">
                    <li><b>A:</b> Yes. The rules are designed to be used for both international and domestic transactions. The text is written so that obligations related to export/import clearance only apply where such formalities are relevant.</li>
                  </ul>
                </li>
                <li><b>Q: Which Incoterms® rules work best with Letters of Credit?</b>
                  <ul className="list-disc pl-6">
                    <li><b>A:</b> The "C" terms (CIF, CIP, CFR, CPT) are generally recommended because the seller arranges carriage and can easily obtain the necessary transport documents. The updated FCA rule, with its on-board Bill of Lading option, is now also an excellent choice for L/C-financed container shipments.</li>
                  </ul>
                </li>
                <li><b>Q: Do Incoterms® determine when I can recognize revenue for accounting purposes?</b>
                  <ul className="list-disc pl-6">
                    <li><b>A:</b> Not directly. Revenue recognition is governed by accounting standards like GAAP or IFRS. However, the point of risk transfer as defined by the Incoterm® rule is a key factor that accountants consider when determining when control of the asset has passed and revenue can be recognized.</li>
                  </ul>
                </li>
                <li><b>Q: How do the rules handle cargo security costs?</b>
                  <ul className="list-disc pl-6">
                    <li><b>A:</b> Incoterms® 2020 explicitly allocates responsibility for security-related requirements and costs. These are detailed in articles A4/A7 and A9/B9 of each rule, generally assigning the responsibility to the party who arranges the relevant stage of transport.</li>
                  </ul>
                </li>
                <li><b>Q: Do Incoterms® cover the transfer of ownership/title?</b>
                  <ul className="list-disc pl-6">
                    <li><b>A:</b> No. This is a critical point of misunderstanding. The rules are silent on when title to the goods passes from seller to buyer. This must be dealt with separately in the sales contract.</li>
                  </ul>
                </li>
              </ul>
            </section>

            {/* Appendix E */}
            <section id="visual-guides-incoterms" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Appendix E: Visual Guides to Incoterms® 2020</h2>
              <p>To aid in understanding, the following visual concepts are proposed for creating infographics and charts.</p>
              <ul className="list-disc pl-6 mb-2">
                <li><b>The Incoterms® Spectrum of Responsibility:</b>
                  <ul className="list-disc pl-6">
                    <li>A linear infographic from left to right, starting with EXW and ending with DDP.</li>
                    <li>A sliding scale above the line shows "Buyer's Responsibility" decreasing from left to right, while a scale below shows "Seller's Responsibility" increasing.</li>
                    <li>This visually represents the progressive shift of obligations from the buyer to the seller across the eleven terms.</li>
                  </ul>
                </li>
                <li><b>The Journey of Goods Map:</b>
                  <ul className="list-disc pl-6">
                    <li>A visual map showing the key stages of an international shipment: Seller's Premises {'->'} Origin Port/Terminal {'->'} Main Carriage (Vessel/Plane) {'->'} Destination Port/Terminal {'->'} Buyer's Premises.</li>
                    <li>Flags or markers would be placed on the map to show the precise point of risk transfer for key Incoterms® like FCA, FOB, CIP, and DPU, making the abstract concept of risk transfer tangible.</li>
                  </ul>
                </li>
                <li><b>Risk Transfer Thermometer:</b>
                  <ul className="list-disc pl-6">
                    <li>A vertical thermometer-style graphic for each Incoterm®.</li>
                    <li>The thermometer is divided into sections representing the seller's risk (e.g., blue at the bottom) and the buyer's risk (e.g., gold at the top).</li>
                    <li>The line between the colors would be placed at the corresponding point of risk transfer. For EXW, the blue section would be tiny. For DDP, it would fill almost the entire thermometer. This provides an immediate visual cue of the risk allocation for each term.</li>
                  </ul>
                </li>
              </ul>
            </section>
          </section>


        </main>
      </div>
    </div>
  );
};

export default Playbook6; 