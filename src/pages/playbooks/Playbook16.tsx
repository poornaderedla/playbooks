import React, { useRef, useState, useEffect } from "react";
import { Progress } from '@/components/ui/progress';

// Table of Contents structure for Incoterms® 2020 Playbook
const sections = [
  { id: 'part-1', label: 'Part I: The Foundations of Global Trade Contracts', subs: [
    { id: '1-1', label: '1.1 Introduction to the Incoterms® Rules' },
    { id: '1-2', label: '1.2 The Architecture of Incoterms® 2020' },
  ]},
  { id: 'part-2', label: 'Part II: A Definitive Guide to the 11 Incoterms® 2020 Rules', subs: [
    { id: '2-1', label: '2.1 Rules for Any Mode or Modes of Transport', subs: [
      { id: '2-1-1', label: '2.1.1 EXW | Ex Works' },
      { id: '2-1-2', label: '2.1.2 FCA | Free Carrier' },
      { id: '2-1-3', label: '2.1.3 CPT | Carriage Paid To' },
      { id: '2-1-4', label: '2.1.4 CIP | Carriage and Insurance Paid To' },
      { id: '2-1-5', label: '2.1.5 DAP | Delivered at Place' },
      { id: '2-1-6', label: '2.1.6 DPU | Delivered at Place Unloaded' },
      { id: '2-1-7', label: '2.1.7 DDP | Delivered Duty Paid' },
    ]},
    { id: '2-2', label: '2.2 Rules for Sea and Inland Waterway Transport', subs: [
      { id: '2-2-1', label: '2.2.1 FAS | Free Alongside Ship' },
      { id: '2-2-2', label: '2.2.2 FOB | Free On Board' },
      { id: '2-2-3', label: '2.2.3 CFR | Cost and Freight' },
      { id: '2-2-4', label: '2.2.4 CIF | Cost Insurance and Freight' },
    ]},
  ]},
  { id: 'part-3', label: 'Part III: Navigating the Transition: Key Changes from Incoterms® 2010', subs: [
    { id: '3-1', label: '3.1 From DAT to DPU: Broadening the Scope of Delivery Unloaded' },
    { id: '3-2', label: '3.2 The FCA Rule and the On-Board Bill of Lading' },
    { id: '3-3', label: '3.3 Differentiated Insurance Levels: The Upgraded CIP Requirement vs. CIF' },
    { id: '3-4', label: '3.4 Enhanced Clarity on Cost Allocation and Security' },
    { id: '3-5', label: '3.5 Recognition of Own Means of Transport' },
  ]},
  { id: 'part-4', label: 'Part IV: Strategic Selection: Choosing the Appropriate Incoterm® Rule', subs: [
    { id: '4-1', label: '4.1 Key Factors for Consideration' },
    { id: '4-2', label: '4.2 Decision-Making Guide for Exporters and Importers' },
  ]},
  { id: 'part-5', label: 'Part V: In-Depth Analysis and Common Pitfalls by Rule Group', subs: [
    { id: '5-1', label: '5.1 The Perils of Minimum Obligation: A Critical Analysis of EXW' },
    { id: '5-2', label: '5.2 The Container Conundrum: Why FCA Must Replace FOB for Containerized Freight' },
    { id: '5-3', label: '5.3 "C" Terms Demystified: Shipment vs. Arrival Contracts' },
    { id: '5-4', label: "5.4 Maximum Obligation, Maximum Risk: A Seller's Guide to the \"D\" Terms" },
  ]},
  { id: 'part-6', label: 'Part VI: The Ecosystem of International Trade: Incoterms® in Practice', subs: [
    { id: '6-1', label: '6.1 Aligning Incoterms® with Letters of Credit (L/Cs)' },
    { id: '6-2', label: '6.2 Insurance Obligations and Strategic Considerations' },
  ]},
  { id: 'part-7', label: 'Part VII: Recommendations and Best Practices for Modern Commerce', subs: [
    { id: '7-1', label: '7.1 Contractual Best Practices' },
    { id: '7-2', label: '7.2 Final Recommendations for Containerized Freight' },
    { id: '7-3', label: '7.3 Concluding Remarks' },
  ]},
  { id: 'references', label: 'References' },
];

const getSectionIds = (sections) => {
  let ids = [];
  for (const section of sections) {
    ids.push(section.id);
    if (section.subs) ids = ids.concat(getSectionIds(section.subs));
  }
  return ids;
};
const sectionIds = getSectionIds(sections);

const Playbook16 = () => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef(null);
  const tocRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Scrollspy: update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      let found = false;
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
      if (!found) setActiveSection(sectionIds[0]);
      // Auto-scroll TOC to keep active in view
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

  // Smooth scroll to section
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
  const renderToc = (sections, level = 0) => (
    <ul className={level === 0 ? 'space-y-2' : 'ml-4 mt-1 space-y-1'}>
      {sections.map((section) => (
        <li key={section.id}>
          <button
            onClick={() => handleTocClick(section.id)}
            className={`w-full text-left px-2 py-2 rounded font-semibold text-base transition-colors truncate ${activeSection === section.id ? 'bg-blue-100 text-blue-700 toc-active' : 'hover:bg-gray-100'}`}
          >
            {section.label}
          </button>
          {section.subs && renderToc(section.subs, level + 1)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="font-sans bg-gray-50 min-h-screen w-full">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`body { font-family: 'Inter', sans-serif; }`}</style>
      <h1 className="text-lg md:text-xl font-bold text-center mb-6 mt-4 font-serif break-words">Incoterms® 2020: A Comprehensive Legal and Commercial Analysis for International Trade Professionals</h1>
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
          <div className="mt-4 hidden lg:block">
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
          {/* Part I */}
          <section id="part-1" className="mb-8">
            <h2 className="text-xl font-bold mb-4">Part I: The Foundations of Global Trade Contracts</h2>
            <section id="1-1" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">1.1 Introduction to the Incoterms® Rules</h3>
              <p>The Incoterms® rules, an abbreviation of "International Commercial Terms," represent a cornerstone of modern global commerce. Published by the International Chamber of Commerce (ICC), they comprise a set of eleven standardized, three-letter trade terms designed to provide a universal framework for interpreting the most common obligations in contracts for the sale of goods. Their primary function is to precisely clarify the allocation of tasks, costs, and, most critically, the transfer of risk between sellers and buyers in international and domestic transactions. By establishing a common language, these rules mitigate the potential for costly misunderstandings, legal complications, and commercial disputes that can arise from differing national interpretations of trade practices.</p>
              <p>The history of the Incoterms® rules reflects the evolution of global trade itself. First published in 1936, they have been periodically revised—in 1957, 1967, 1976, 1980, 1990, 2000, and 2010—to adapt to new commercial realities, transport technologies, and security considerations. The current version, Incoterms® 2020, entered into force on January 1, 2020, and incorporates changes that account for modern practices such as containerization, increased security requirements, and varied insurance needs.</p>
              <p>It is crucial to understand the legal standing of these rules. Incoterms® are not law; they are a set of voluntary terms that become legally binding only when they are explicitly incorporated into a sales contract. The ICC recommends a specific format for this incorporation to ensure clarity and enforceability: [Chosen Incoterms® rule][Named port, place or point] Incoterms® 2020. For example, "CIF Los Angeles Incoterms® 2020". While the 2020 version is the current standard, parties are free to use previous editions, such as Incoterms® 2010, provided they clearly specify the chosen version in their contract.</p>
              <p>Equally important is understanding what the Incoterms® rules do not cover. Official publications and expert guidance repeatedly emphasize their limitations to prevent a common and perilous assumption: that an Incoterm® rule constitutes a complete contract of sale. The rules do not address several fundamental aspects of a transaction, including:</p>
              <ul className="list-disc pl-5">
                <li>Transfer of title or ownership of the goods.</li>
                <li>The contract price or method of payment.</li>
                <li>Remedies for breach of contract.</li>
                <li>Force majeure events or hardship provisions.</li>
                <li>Intellectual property rights.</li>
              </ul>
              <p>These critical elements must be explicitly defined in the overarching sales agreement. Relying solely on an Incoterm® rule creates a legal vacuum, leaving parties exposed to significant ambiguity and potential disputes over core contractual obligations.</p>
              <p>The official Incoterms® 2020 rules and their accompanying explanatory guides are published by the ICC and are protected by copyright. Professionals seeking to master their application should consult these primary sources, such as the ICC Guide to Incoterms® 2020, and may benefit from official training offered by the ICC Academy or resources like the official Incoterms® 2020 mobile application.</p>
            </section>
            <section id="1-2" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">1.2 The Architecture of Incoterms® 2020</h3>
              <p>The structure of the Incoterms® 2020 rules is deliberately designed for clarity and comparative analysis. Each of the eleven rules is organized into a symmetrical framework of ten articles, labeled A1 through A10 for the seller's obligations and B1 through B10 for the buyer's corresponding obligations. This A/B structure provides a mirror image of the transaction, allowing each party to see its responsibilities in direct relation to its counterparty's.</p>
              <p>The 2020 revision introduced significant architectural changes aimed at improving user-friendliness and preventing common errors. These adjustments are not merely cosmetic; they represent a strategic effort by the ICC to make the rules more intuitive and align them with the logical flow of a commercial transaction. A key change was the reordering of the articles to elevate the prominence of the most critical elements: delivery and risk. The sequence is now as follows:</p>
              <ul className="list-disc pl-5">
                <li>A1/B1: General obligations</li>
                <li>A2/B2: Delivery/Taking delivery</li>
                <li>A3/B3: Transfer of risks</li>
                <li>A4/B4: Carriage</li>
                <li>A5/B5: Insurance</li>
                <li>A6/B6: Delivery/transport document</li>
                <li>A7/B7: Export/import clearance</li>
                <li>A8/B8: Checking/packaging/marking</li>
                <li>A9/B9: Allocation of costs</li>
                <li>A10/B10: Notices</li>
              </ul>
              <p>This reordering places the act of "delivery" (A2/B2)—the point at which risk transfers—at the forefront, immediately followed by the article on the transfer of risks itself (A3/B3). This structure helps users focus on the central purpose of the rules.</p>
              <p>Furthermore, the Incoterms® 2020 publication introduced a "horizontal" presentation for the first time. This format groups all like articles together (e.g., all A3/B3 articles for all eleven rules), enabling users to easily compare how a specific obligation, such as risk transfer or insurance, is handled across the different rules. This comparative view is an invaluable tool for selecting the most appropriate rule. The consolidation of all costs into a single, comprehensive article (A9/B9) for each rule is another major enhancement designed to prevent disputes over unforeseen charges. By understanding the logic behind these structural improvements, users can leverage the Incoterms® 2020 framework not just as a set of definitions, but as a proactive risk management tool.</p>
            </section>
          </section>
          {/* Part II - 2.1.1 only */}
          <section id="part-2" className="mb-8">
            <h2 className="text-xl font-bold mb-4">Part II: A Definitive Guide to the 11 Incoterms® 2020 Rules</h2>
            <p>The eleven Incoterms® 2020 rules are divided into two distinct categories based on the mode of transport. This initial classification is the first and most crucial step in selecting the correct term for a transaction.</p>
            {/* 2.1 */}
            <section id="2-1" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">2.1 Rules for Any Mode or Modes of Transport</h3>
              <p>This category comprises seven rules designed for the modern logistics environment. They are suitable for any mode of transport, including road, rail, air, and sea, and are particularly appropriate for multimodal journeys and containerized freight.</p>
              {/* 2.1.1 EXW */}
              <section id="2-1-1" className="mb-4">
                <h4 className="font-semibold mb-1">2.1.1 EXW | Ex Works (...insert place of delivery)</h4>
                <ul className="list-disc pl-5">
                  <li><b>Obligations:</b> This rule represents the minimum obligation for the seller. The seller's duty is fulfilled when they make the goods available to the buyer, suitably packaged for transport, at a named place, which is typically the seller's factory or warehouse. Crucially, the seller is not responsible for loading the goods onto the buyer's collecting vehicle or for clearing the goods for export. The seller is not responsible for loading the goods onto the buyer's collecting vehicle or for clearing the goods for export.</li>
                  <li><b>Risk Transfer:</b> Risk transfers from the seller to the buyer at the moment the goods are placed at the buyer's disposal at the named place, before any loading takes place.</li>
                  <li><b>Cost Allocation:</b> The seller's costs are limited to checking and packaging the goods. The buyer bears all other costs and risks, including loading, all transportation, export and import clearance, duties, and insurance.</li>
                </ul>
              </section>
              {/* 2.1.2 FCA */}
              <section id="2-1-2" className="mb-4">
                <h4 className="font-semibold mb-1">2.1.2 FCA | Free Carrier (...insert named place of delivery)</h4>
                <ul className="list-disc pl-5">
                  <li><b>Obligations:</b> The seller is responsible for delivering the goods, cleared for export, to a carrier nominated by the buyer at a precisely specified named place. The rule distinguishes between two delivery scenarios:</li>
                  <ol className="list-decimal pl-5">
                    <li>Delivery at the Seller's Premises: The seller loads the goods onto the buyer's provided means of transport. Delivery is complete, and risk transfers, once the goods are loaded.</li>
                    <li>Delivery at Another Named Place: The seller transports the goods to another location (e.g., a freight forwarder's warehouse or a terminal). Delivery is complete when the goods, still on the seller's arriving vehicle, are placed at the disposal of the buyer's carrier, ready for unloading. The seller is not responsible for unloading the goods from their vehicle.</li>
                  </ol>
                  <li><b>Risk Transfer:</b> Risk transfers to the buyer at the named point of delivery, which depends on which of the two scenarios above applies.</li>
                  <li><b>Cost Allocation:</b> The seller pays for export packaging, loading (if at their own premises), pre-carriage to the named place, and all export clearance formalities. The buyer pays for the main carriage, insurance, unloading (if delivery is not at the seller's premises), import clearance, and all subsequent costs.</li>
                </ul>
              </section>
              {/* 2.1.3 CPT */}
              <section id="2-1-3" className="mb-4">
                <h4 className="font-semibold mb-1">2.1.3 CPT | Carriage Paid To (...insert place of destination)</h4>
                <ul className="list-disc pl-5">
                  <li><b>Obligations:</b> The seller contracts and pays for the freight to transport the goods to a named place of destination. However, the seller "delivers" the goods to its own contracted carrier at a point of origin.</li>
                  <li><b>Risk Transfer:</b> This rule contains a critical division between risk and cost that is often misunderstood. Risk transfers from the seller to the buyer at the origin, when the goods are handed over to the first carrier nominated by the seller. Risk does not transfer at the destination.</li>
                  <li><b>Cost Allocation:</b> The seller pays for export clearance and the cost of carriage to the named destination. The buyer bears all risks from the moment the goods are handed to the first carrier and is responsible for arranging insurance (which is optional), paying for import clearance, and any costs upon arrival at the destination unless they are included in the seller's contract of carriage.</li>
                </ul>
              </section>
              {/* 2.1.4 CIP */}
              <section id="2-1-4" className="mb-4">
                <h4 className="font-semibold mb-1">2.1.4 CIP | Carriage and Insurance Paid To (...insert place of destination)</h4>
                <ul className="list-disc pl-5">
                  <li><b>Obligations:</b> The seller's obligations are the same as under CPT, with one major addition: the seller must also contract and pay for cargo insurance to cover the buyer's risk during carriage.</li>
                  <li><b>Risk Transfer:</b> The point of risk transfer is identical to CPT. It passes from seller to buyer at the origin when the goods are delivered to the first carrier.</li>
                  <li><b>Cost Allocation:</b> The seller pays for export clearance, carriage to the named destination, and the cost of the insurance policy. The buyer is responsible for import clearance and duties.</li>
                  <li><b>Insurance Level:</b> A key change in Incoterms® 2020 is the mandated insurance level for CIP. The seller must obtain a high level of cover compliant with Institute Cargo Clauses (A) or an equivalent "all risks" policy, for at least 110% of the invoice value. This reflects the common use of CIP for higher-value manufactured goods.</li>
                </ul>
              </section>
              {/* 2.1.5 DAP */}
              <section id="2-1-5" className="mb-4">
                <h4 className="font-semibold mb-1">2.1.5 DAP | Delivered at Place (...insert named place of destination)</h4>
                <ul className="list-disc pl-5">
                  <li><b>Obligations:</b> The seller is responsible for delivering the goods to the named place of destination. Delivery occurs when the goods are placed at the disposal of the buyer on the arriving means of transport, ready for unloading.</li>
                  <li><b>Risk Transfer:</b> Risk transfers from the seller to the buyer at the named destination, at the moment the goods are available for unloading.</li>
                  <li><b>Cost Allocation:</b> The seller bears all costs and risks associated with transporting the goods to the named destination. The buyer is responsible for unloading the goods and for handling all import clearance formalities, including the payment of duties and taxes.</li>
                </ul>
              </section>
              {/* 2.1.6 DPU */}
              <section id="2-1-6" className="mb-4">
                <h4 className="font-semibold mb-1">2.1.6 DPU | Delivered at Place Unloaded (...insert named place of destination)</h4>
                <ul className="list-disc pl-5">
                  <li><b>Obligations:</b> The seller is responsible for delivering the goods to the named place of destination and also for unloading them from the arriving means of transport. DPU is the only Incoterm® rule that obligates the seller to unload the goods at the destination.</li>
                  <li><b>Risk Transfer:</b> Risk transfers from the seller to the buyer once the goods have been successfully unloaded at the named place of destination.</li>
                  <li><b>Cost Allocation:</b> The seller bears all costs and risks of transport to the destination, including the cost and risk of the unloading operation. The buyer is responsible for all import clearance formalities, duties, and taxes.</li>
                </ul>
              </section>
              {/* 2.1.7 DDP */}
              <section id="2-1-7" className="mb-4">
                <h4 className="font-semibold mb-1">2.1.7 DDP | Delivered Duty Paid (...insert place of destination)</h4>
                <ul className="list-disc pl-5">
                  <li><b>Obligations:</b> This rule imposes the maximum level of obligation on the seller. The seller is responsible for delivering the goods to the named place of destination, cleared for import, and ready for unloading.</li>
                  <li><b>Risk Transfer:</b> Risk transfers at the named place of destination, just before unloading begins.</li>
                  <li><b>Cost Allocation:</b> The seller bears all costs and all risks to bring the goods to the destination. This includes all transport costs, export clearance, and, critically, all import clearance formalities, duties, taxes (like VAT), and other official charges in the buyer's country.</li>
                </ul>
              </section>
            </section>
            {/* 2.2 */}
            <section id="2-2" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">2.2 Rules for Sea and Inland Waterway Transport</h3>
              <p>This specialized group of four rules is intended only for maritime or inland waterway transport where goods are not containerized (e.g., bulk commodities or break-bulk cargo) and are delivered directly to the vessel. Their use for containerized freight is strongly discouraged.</p>
              {/* 2.2.1 FAS */}
              <section id="2-2-1" className="mb-4">
                <h4 className="font-semibold mb-1">2.2.1 FAS | Free Alongside Ship (...insert name of port of loading)</h4>
                <ul className="list-disc pl-5">
                  <li><b>Obligations:</b> The seller fulfills their obligation by delivering the goods, cleared for export, alongside the vessel nominated by the buyer at the named port of shipment. This can be on a quay or a barge.</li>
                  <li><b>Risk Transfer:</b> Risk transfers to the buyer at the moment the goods are placed alongside the ship.</li>
                  <li><b>Cost Allocation:</b> The seller pays for all costs up to the point of placing the goods alongside the vessel. The buyer is responsible for the cost of loading the goods onto the vessel, the main carriage, insurance, and all subsequent costs.</li>
                </ul>
              </section>
              {/* 2.2.2 FOB */}
              <section id="2-2-2" className="mb-4">
                <h4 className="font-semibold mb-1">2.2.2 FOB | Free On Board (...insert named port of loading)</h4>
                <ul className="list-disc pl-5">
                  <li><b>Obligations:</b> The seller delivers the goods, cleared for export, by placing them on board the vessel nominated by the buyer at the named port of shipment.</li>
                  <li><b>Risk Transfer:</b> Risk transfers from the seller to the buyer once the goods are physically on board the vessel.</li>
                  <li><b>Cost Allocation:</b> The seller is responsible for all costs until the goods are loaded on board, including any terminal handling and loading charges. The buyer pays for the main sea freight, insurance, unloading, and import clearance.</li>
                </ul>
              </section>
              {/* 2.2.3 CFR */}
              <section id="2-2-3" className="mb-4">
                <h4 className="font-semibold mb-1">2.2.3 CFR | Cost and Freight (...insert named port of destination)</h4>
                <ul className="list-disc pl-5">
                  <li><b>Obligations:</b> The seller delivers the goods on board the vessel at the port of shipment. The seller must also contract for and pay the freight costs required to bring the goods to the named port of destination.</li>
                  <li><b>Risk Transfer:</b> As with FOB, risk transfers when the goods are on board the vessel at the port of shipment. It does not transfer at the destination port.</li>
                  <li><b>Cost Allocation:</b> The seller pays for export clearance, loading, and the main sea freight to the destination. The buyer bears the risk for the main voyage and is responsible for arranging insurance (which is optional) and paying for import clearance and duties.</li>
                </ul>
              </section>
              {/* 2.2.4 CIF */}
              <section id="2-2-4" className="mb-4">
                <h4 className="font-semibold mb-1">2.2.4 CIF | Cost Insurance and Freight (...insert named port of destination)</h4>
                <ul className="list-disc pl-5">
                  <li><b>Obligations:</b> The seller's obligations are the same as under CFR, with the additional requirement that the seller must procure and pay for marine insurance to cover the buyer's risk of loss or damage during the main carriage.</li>
                  <li><b>Risk Transfer:</b> The point of risk transfer is identical to FOB and CFR. It passes to the buyer when the goods are on board the vessel at the port of shipment.</li>
                  <li><b>Cost Allocation:</b> The seller pays for export clearance, loading, main sea freight, and insurance to the destination port. The buyer is responsible for import clearance and duties.</li>
                  <li><b>Insurance Level:</b> Incoterms® 2020 maintains the default minimum insurance level for CIF as Institute Cargo Clauses (C) or an equivalent "named perils" policy. Parties can, and often should, agree to a higher level of cover in the sales contract.</li>
                </ul>
                <p>The distinction between the "C" terms (CPT, CIP, CFR, CIF) and all other terms reveals a fundamental conceptual divide that is a frequent source of commercial disputes. The "C" terms are legally considered "shipment contracts" and exhibit a dual nature: the seller's cost responsibility for carriage extends to the named destination, but the risk of loss or damage to the goods transfers to the buyer at the point of origin. A party seeing "CIF Los Angeles" in a contract may intuitively but incorrectly assume the seller is responsible for the goods until they arrive in Los Angeles. In reality, if the vessel sinks mid-Pacific, the loss falls on the buyer, whose recourse is to file a claim with the insurance policy arranged by the seller. This creates a scenario where the buyer bears the risk of a transport arrangement made by the seller, a disconnect that necessitates clear contractual provisions regarding acceptable carriers and routes.</p>
                <p>In contrast, the "D" terms (DAP, DPU, DDP) are true "arrival contracts". Here, the point of delivery and the point of risk transfer are one and the same: the named destination. The seller's obligation is not fulfilled until the goods have safely arrived. While this seems straightforward, the seemingly minor variations between them—who unloads (the buyer in DAP, the seller in DPU) and who handles import clearance (the buyer in DAP/DPU, the seller in DDP)—represent significant shifts in operational capability, cost, and regulatory risk. The choice between these rules is therefore not merely a cost calculation but a strategic decision about which party is better equipped to manage specific logistical and legal challenges at the destination.</p>
              </section>
            </section>
          </section>
          {/* Part III */}
          <section id="part-3" className="mb-8">
            <h2 className="text-xl font-bold mb-4">Part III: Navigating the Transition: Key Changes from Incoterms® 2010</h2>
            <p>The Incoterms® 2020 revision introduced several substantive changes designed to address well-documented, real-world commercial problems and align the rules more closely with modern trade practices. These targeted adjustments highlight areas of historical friction and risk, providing valuable guidance for today's traders.</p>
            {/* 3.1 */}
            <section id="3-1" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">3.1 From DAT to DPU: Broadening the Scope of Delivery Unloaded</h3>
              <p>The 2020 rules replaced the term DAT (Delivered at Terminal) with a new term, DPU (Delivered at Place Unloaded). This change was prompted by feedback that the word "Terminal" was too restrictive and caused confusion. Parties frequently needed to arrange for delivery and unloading at locations other than a formal transport terminal, such as a factory, a warehouse, or a construction site. The new term DPU accommodates this need by clarifying that the named place of destination can be any place, whether covered or not, so long as the goods can be unloaded there. The fundamental obligation of the seller to deliver and unload the goods at their own risk and cost remains the same as it was under DAT. In a logical restructuring, the new DPU rule is now placed after DAP (Delivered at Place), as delivery under DAP (ready for unloading) logically precedes delivery under DPU (unloaded).</p>
            </section>
            {/* 3.2 */}
            <section id="3-2" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">3.2 The FCA Rule and the On-Board Bill of Lading: A Solution for L/C Transactions</h3>
              <p>A significant practical challenge under previous Incoterms® versions involved the use of the Free Carrier (FCA) rule in conjunction with payment by Letter of Credit (L/C). For containerized shipments, FCA is the correct rule, with delivery occurring when the seller hands the goods over to the buyer's carrier, often at an inland terminal. However, L/Cs frequently require the presentation of an on-board bill of lading for the seller to get paid. Since the seller's involvement ended before the container was loaded onto the vessel, they could not guarantee obtaining this document, creating a payment risk. This dilemma led many traders to incorrectly use the Free on Board (FOB) rule for container shipments simply to meet the L/C requirement, thereby creating a dangerous "risk gap".</p>
              <p>Incoterms® 2020 provides a direct solution to this problem. The FCA rule, in articles A6/B6, now includes an optional mechanism. The buyer and seller can agree that the buyer will instruct its carrier to issue a bill of lading with an on-board notation to the seller after the goods have been loaded on the vessel. The seller can then present this document to the bank. This change was specifically designed to facilitate L/C transactions and encourage the correct application of FCA for containerized goods.</p>
            </section>
            {/* 3.3 */}
            <section id="3-3" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">3.3 Differentiated Insurance Levels: The Upgraded CIP Requirement vs. CIF</h3>
              <p>The only two Incoterms® rules that mandate the seller to purchase insurance for the buyer's risk are Cost, Insurance, and Freight (CIF) and Carriage and Insurance Paid To (CIP). Under the 2010 rules, both required a minimum level of insurance cover, corresponding to Institute Cargo Clauses (C).</p>
              <p>Incoterms® 2020 introduces a crucial differentiation to better reflect commercial practice:</p>
              <ul className="list-disc pl-5">
                <li><b>CIP:</b> The default insurance requirement has been elevated to a comprehensive, "all-risks" level of cover, compliant with Institute Cargo Clauses (A) or a similar high-level policy. This change acknowledges that CIP is typically used for manufactured goods, which often have a higher value and require more extensive protection.</li>
                <li><b>CIF:</b> This rule retains the minimum cover requirement of Institute Cargo Clauses (C) as the default. This is because CIF is predominantly used in the maritime trade of bulk commodities, where Clause C coverage is the long-standing market standard.</li>
              </ul>
              <p>In both cases, the parties remain free to negotiate a different level of insurance cover in their sales contract, but the new default for CIP provides a much stronger baseline of protection for the buyer.</p>
            </section>
            {/* 3.4 */}
            <section id="3-4" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">3.4 Enhanced Clarity on Cost Allocation and Security</h3>
              <p>In response to frequent disputes, particularly regarding terminal handling charges (THC) that carriers were charging back to sellers, Incoterms® 2020 significantly improves the clarity of cost allocation. All costs for which each party is responsible are now consolidated in a single article, A9/B9, for each rule. This provides a comprehensive "one-stop-shop" list, making it easier for parties to understand their full financial obligations upfront.</p>
              <p>Reflecting the modern security environment, the 2020 rules also give greater prominence to security-related requirements. Specific security obligations for transport and customs clearance are now explicitly detailed in articles A4 (Carriage) and A7 (Export/Import Clearance), with the associated costs clearly allocated in the A9/B9 cost article.</p>
            </section>
            {/* 3.5 */}
            <section id="3-5" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">3.5 Recognition of Own Means of Transport</h3>
              <p>Previous versions of the Incoterms® rules implicitly assumed that the carriage of goods would always be performed by a third-party carrier hired for the purpose. Incoterms® 2020 modernizes this by explicitly recognizing that a buyer or seller may wish to use their own means of transport to move the goods. This provision applies to the buyer under the FCA rule and to the seller under the D-group rules (DAP, DPU, and DDP), reflecting the practical reality of modern supply chains.</p>
            </section>
          </section>
          {/* Part IV */}
          <section id="part-4" className="mb-8">
            <h2 className="text-xl font-bold mb-4">Part IV: Strategic Selection: Choosing the Appropriate Incoterm® Rule</h2>
            <p>Defining the Incoterms® rules is only the first step; their true value lies in their strategic selection and application. Choosing the right rule is a critical commercial decision that directly impacts cost, control, and liability in an international transaction. It requires a careful assessment of several interdependent factors.</p>
            {/* 4.1 */}
            <section id="4-1" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">4.1 Key Factors for Consideration</h3>
              <p>A comprehensive analysis must weigh the following elements to align the chosen Incoterm® rule with the specific circumstances of the sale, the capabilities of the parties, and their respective strategic objectives.</p>
              <ul className="list-disc pl-5">
                <li><b>Mode of Transport:</b> This is the initial and most fundamental decision point. The rules are explicitly divided into two categories. Four rules—FAS, FOB, CFR, and CIF—are designed exclusively for sea and inland waterway transport of non-containerized goods. The other seven—EXW, FCA, CPT, CIP, DAP, DPU, and DDP—are flexible and can be used for any mode of transport, including air, road, rail, and multimodal containerized shipments. Using a sea-only rule for a container shipment is a common and high-risk error.</li>
                <li><b>Control and Convenience:</b> The parties must decide who is in the best position to manage the logistics chain. An importer desiring maximum control over freight costs and carrier selection would favor an F-group rule like FCA or FOB, or even EXW. Conversely, an exporter wishing to offer a value-added, "door-to-door" service would select a D-group rule like DAP or DDP, managing the transport to the buyer's location.</li>
                <li><b>Cost Allocation and Bargaining Power:</b> The Incoterm® rule is a key component of the overall price negotiation. A DDP price will be significantly higher than an EXW price for the same goods, as the seller builds all transport and customs costs into their quote. A buyer opting for EXW may achieve a lower unit price but must accurately budget for all subsequent transport and clearance costs, which can be difficult to predict. The final choice is a commercial negotiation reflecting the bargaining power and preferences of each party.</li>
                <li><b>Risk Appetite and Management:</b> Each rule defines the precise point at which the risk of loss or damage to the goods transfers from seller to buyer. A risk-averse seller will prefer terms that transfer risk early in their own country, such as EXW or FCA. A risk-averse buyer will prefer D-group terms, where the seller retains risk until the goods arrive at the destination.</li>
                <li><b>Experience and Capabilities of the Parties:</b> The operational and regulatory capacity of each party is paramount. An inexperienced importer should avoid EXW, as it requires them to navigate export procedures in a foreign country—a task for which they are ill-equipped. Similarly, an exporter unfamiliar with the import regulations of the buyer's country should avoid DDP, which would make them responsible for customs clearance, duties, and taxes abroad.</li>
                <li><b>Nature of the Goods:</b> The characteristics of the cargo can influence the choice. High-value, fragile, or perishable goods may lead parties to select terms that grant them greater control over the choice of carrier and the level of insurance coverage.</li>
                <li><b>Relationship Between Parties:</b> The level of trust between the buyer and seller can be a deciding factor. Terms at the extremes of the responsibility spectrum, such as EXW and DDP, often require a high degree of confidence and a well-established relationship to function smoothly.</li>
              </ul>
            </section>
            {/* 4.2 */}
            <section id="4-2" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">4.2 Decision-Making Guide for Exporters and Importers</h3>
              <p>The selection process can be simplified by following a logical sequence of questions. The answers will guide the parties to a shortlist of appropriate rules.</p>
              <ol className="list-decimal pl-5 mb-2">
                <li><b>Step 1: Determine the Mode of Transport.</b>
                  <ul className="list-disc pl-5">
                    <li>Is the shipment non-containerized cargo delivered directly to a vessel at a port (e.g., bulk grain, oil)?<br/>If yes, consider the four sea and inland waterway rules: FAS, FOB, CFR, CIF.</li>
                    <li>Does the shipment involve any other mode of transport (air, road, rail), multimodal transport, or containerized sea freight?<br/>If yes, you must use one of the seven "any mode" rules: EXW, FCA, CPT, CIP, DAP, DPU, DDP.</li>
                  </ul>
                </li>
                <li><b>Step 2: Decide on the Division of Responsibilities (Who does what?).</b>
                  <ul className="list-disc pl-5">
                    <li><b>For the Exporter (Seller):</b> How much do you want to handle?
                      <ul className="list-disc pl-5">
                        <li>Minimum: I will only package the goods and make them available at my factory. The buyer handles everything else. → <b>EXW</b></li>
                        <li>Origin Logistics: I will handle loading (at my premises), inland transport in my country, and export customs clearance, delivering to the buyer's chosen carrier. → <b>FCA</b></li>
                        <li>Main Carriage Paid: I will do everything in FCA, and I will also contract and pay for the main international transport to the destination. → <b>CPT</b> (or <b>CIP</b> if I also arrange insurance).</li>
                        <li>Delivery to Destination: I will handle everything to get the goods to the named destination, ready for unloading. The buyer handles unloading and import. → <b>DAP</b></li>
                        <li>Delivery and Unloading: I will handle everything to get the goods to the named destination, and I will also unload them. The buyer handles import. → <b>DPU</b></li>
                        <li>Maximum (Door-to-Door): I will handle everything, including transport, unloading, and all import customs formalities and duties. → <b>DDP</b></li>
                      </ul>
                    </li>
                    <li><b>For the Importer (Buyer):</b> How much do you want to handle?
                      <ul className="list-disc pl-5">
                        <li>Maximum: I want full control and will handle everything from the seller's factory door onwards. → <b>EXW</b></li>
                        <li>Main Carriage Control: I want to control the main international transport. The seller will handle export clearance and deliver to my carrier in the origin country. → <b>FCA</b> (for any mode) or <b>FOB</b> (for non-containerized sea freight).</li>
                        <li>Risk from Origin, Seller Pays Freight: I want the seller to arrange and pay for transport, but I am willing to accept the risk of loss from the point of shipment at origin. → <b>CPT/CFR</b> (if I arrange my own insurance) or <b>CIP/CIF</b> (if I want the seller to arrange insurance).</li>
                        <li>Delivery to Destination, I Unload: I want the seller to bear the risk and cost until the goods arrive at the destination, ready for unloading. I will handle unloading and import clearance. → <b>DAP</b></li>
                        <li>Delivery to Destination, Seller Unloads: I want the seller to bear the risk and cost until the goods arrive and are unloaded. I will handle import clearance. → <b>DPU</b></li>
                        <li>Minimum (Hassle-Free): I want the goods delivered to my door with all transport and customs formalities handled by the seller. → <b>DDP</b></li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ol>
              <p>To facilitate a direct comparison, the following table provides a consolidated overview of the key obligations under each of the eleven rules.</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-xs md:text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-1">Incoterm® Rule</th>
                      <th className="border px-2 py-1">Group</th>
                      <th className="border px-2 py-1">Valid Modes of Transport</th>
                      <th className="border px-2 py-1">Point of Delivery (Risk Transfer)</th>
                      <th className="border px-2 py-1">Seller's Carriage Obligation</th>
                      <th className="border px-2 py-1">Seller's Insurance Obligation</th>
                      <th className="border px-2 py-1">Seller's Export Clearance</th>
                      <th className="border px-2 py-1">Buyer's Import Clearance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border px-2 py-1">EXW</td><td className="border px-2 py-1">E</td><td className="border px-2 py-1">Any Mode</td><td className="border px-2 py-1">Seller's premises (not loaded)</td><td className="border px-2 py-1">None</td><td className="border px-2 py-1">None</td><td className="border px-2 py-1">Provides assistance only</td><td className="border px-2 py-1">Yes</td></tr>
                    <tr><td className="border px-2 py-1">FCA</td><td className="border px-2 py-1">F</td><td className="border px-2 py-1">Any Mode</td><td className="border px-2 py-1">At seller's premises (loaded) or another named place (ready for unloading)</td><td className="border px-2 py-1">None (arranges pre-carriage to named place)</td><td className="border px-2 py-1">None</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes</td></tr>
                    <tr><td className="border px-2 py-1">CPT</td><td className="border px-2 py-1">C</td><td className="border px-2 py-1">Any Mode</td><td className="border px-2 py-1">When goods handed to first carrier at origin</td><td className="border px-2 py-1">Yes, to named destination</td><td className="border px-2 py-1">None</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes</td></tr>
                    <tr><td className="border px-2 py-1">CIP</td><td className="border px-2 py-1">C</td><td className="border px-2 py-1">Any Mode</td><td className="border px-2 py-1">When goods handed to first carrier at origin</td><td className="border px-2 py-1">Yes, to named destination</td><td className="border px-2 py-1">Yes (Clauses A - All Risks)</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes</td></tr>
                    <tr><td className="border px-2 py-1">DAP</td><td className="border px-2 py-1">D</td><td className="border px-2 py-1">Any Mode</td><td className="border px-2 py-1">At named destination, ready for unloading</td><td className="border px-2 py-1">Yes, to named destination</td><td className="border px-2 py-1">None (but bears risk to destination)</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes</td></tr>
                    <tr><td className="border px-2 py-1">DPU</td><td className="border px-2 py-1">D</td><td className="border px-2 py-1">Any Mode</td><td className="border px-2 py-1">At named destination, after unloading</td><td className="border px-2 py-1">Yes, to named destination</td><td className="border px-2 py-1">None (but bears risk to destination)</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes</td></tr>
                    <tr><td className="border px-2 py-1">DDP</td><td className="border px-2 py-1">D</td><td className="border px-2 py-1">Any Mode</td><td className="border px-2 py-1">At named destination, cleared for import, ready for unloading</td><td className="border px-2 py-1">Yes, to named destination</td><td className="border px-2 py-1">None (but bears risk to destination)</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes</td></tr>
                    <tr><td className="border px-2 py-1">FAS</td><td className="border px-2 py-1">F</td><td className="border px-2 py-1">Sea/Inland Waterway</td><td className="border px-2 py-1">Alongside vessel at port of shipment</td><td className="border px-2 py-1">None (arranges pre-carriage to port)</td><td className="border px-2 py-1">None</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes</td></tr>
                    <tr><td className="border px-2 py-1">FOB</td><td className="border px-2 py-1">F</td><td className="border px-2 py-1">Sea/Inland Waterway</td><td className="border px-2 py-1">On board vessel at port of shipment</td><td className="border px-2 py-1">None (arranges pre-carriage and loading)</td><td className="border px-2 py-1">None</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes</td></tr>
                    <tr><td className="border px-2 py-1">CFR</td><td className="border px-2 py-1">C</td><td className="border px-2 py-1">Sea/Inland Waterway</td><td className="border px-2 py-1">On board vessel at port of shipment</td><td className="border px-2 py-1">Yes, to named destination port</td><td className="border px-2 py-1">None</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes</td></tr>
                    <tr><td className="border px-2 py-1">CIF</td><td className="border px-2 py-1">C</td><td className="border px-2 py-1">Sea/Inland Waterway</td><td className="border px-2 py-1">On board vessel at port of shipment</td><td className="border px-2 py-1">Yes, to named destination port</td><td className="border px-2 py-1">Yes (Clauses C - Minimum Cover)</td><td className="border px-2 py-1">Yes</td><td className="border px-2 py-1">Yes</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
          </section>
          {/* Part V */}
          <section id="part-5" className="mb-8">
            <h2 className="text-xl font-bold mb-4">Part V: In-Depth Analysis and Common Pitfalls by Rule Group</h2>
            <p>While the definitions provide a clear framework, practical application often reveals recurring patterns of misuse and misunderstanding. A deeper analysis of the rule groups highlights specific risks and strategic considerations that are essential for sound commercial practice.</p>
            {/* 5.1 */}
            <section id="5-1" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">5.1 The Perils of Minimum Obligation: A Critical Analysis of EXW</h3>
              <p>On its face, the Ex Works (EXW) rule appears highly attractive to sellers, as it represents the absolute minimum level of obligation, cost, and risk. However, for the buyer, EXW is fraught with hidden costs and substantial operational and legal risks, making it an inadvisable choice in most international transactions.</p>
              <p>The buyer's responsibilities under EXW begin at the seller's doorstep and are extensive. A primary risk involves loading. The seller has no obligation to load the goods onto the buyer's collecting vehicle. If the seller does assist with loading—a common practical courtesy—any damage that occurs during this process is at the buyer's risk.</p>
              <p>The most significant hurdle is export clearance. The buyer, typically a non-resident entity, is responsible for completing all export customs formalities in the seller's country. This is often practically difficult and can even be legally impossible. For instance, regulations in the European Union and other jurisdictions may require the export declarant to be a resident entity, a condition a foreign buyer cannot meet. This leaves the buyer dependent on the seller's assistance, which the seller is not obligated to provide beyond supplying basic information.</p>
              <p>Furthermore, the seemingly low unit price of an EXW transaction is often deceptive. The buyer is exposed to a cascade of subsequent costs that are difficult to estimate accurately from abroad, including origin terminal handling charges, export documentation fees, and the costs of resolving any customs issues in a foreign country.</p>
              <p>For these reasons, the Free Carrier (FCA) rule, specifically at the seller's premises, is almost always a superior alternative to EXW. FCA places the responsibility for the two tasks best performed by the seller—loading the goods and clearing them for export—squarely on the seller. This aligns responsibility with capability, clarifies costs, and removes a major source of risk for the buyer, while still allowing the buyer to maintain control over the main international carriage.</p>
            </section>
            {/* 5.2 */}
            <section id="5-2" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">5.2 The Container Conundrum: Why FCA Must Replace FOB for Containerized Freight</h3>
              <p>One of the most persistent and dangerous errors in the application of Incoterms® rules is the habitual use of Free on Board (FOB) for containerized sea freight. While historically common, this practice is fundamentally misaligned with the realities of modern container logistics and creates a significant and unnecessary "risk gap" for the seller.</p>
              <p>The core of the problem lies in the definition of delivery. Under FOB, delivery occurs—and risk transfers—only when the goods are physically loaded "on board" the vessel. However, in modern container shipping, the seller does not deliver the container to the vessel. Instead, the container is delivered to the carrier at a container yard (CY) or container freight station (CFS), often located inland or at the port terminal, frequently days before the vessel is scheduled to be loaded.</p>
              <p>This disconnect creates a period of profound ambiguity. After the seller has handed the container over to the buyer's carrier at the terminal, the seller loses all physical control. Yet, under the terms of FOB, the seller remains on risk for any loss or damage to the container until it is lifted and placed on the ship. If the container is dropped by a crane at the terminal, damaged in the storage yard, or washed away in a storm before loading, the seller is technically liable but has no operational control or contractual relationship with the terminal operator to manage that risk.</p>
              <p>The ICC has explicitly and repeatedly advised against this practice. Successive editions of the Incoterms® rules, including the 2020 version and supplementary guidance, strongly state that for containerized goods, FCA should be used instead of FOB. The FCA rule is the solution because it perfectly matches the logistical reality. When using "FCA [named container terminal]", delivery occurs and risk transfers precisely when the seller hands the container over to the buyer's carrier at that terminal. This eliminates the risk gap entirely, aligning the transfer of risk with the transfer of physical control.</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-xs md:text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-1">Aspect</th>
                      <th className="border px-2 py-1">FCA (Free Carrier)...named terminal</th>
                      <th className="border px-2 py-1">FOB (Free on Board)...named port of shipment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border px-2 py-1">Appropriate Cargo</td><td className="border px-2 py-1">All modes, especially recommended for containerized goods</td><td className="border px-2 py-1">Non-containerized cargo (e.g., bulk, break-bulk)</td></tr>
                    <tr><td className="border px-2 py-1">Point of Delivery</td><td className="border px-2 py-1">When goods are handed over to the buyer's carrier at the named inland point or terminal.</td><td className="border px-2 py-1">When goods are placed on board the vessel at the port of shipment.</td></tr>
                    <tr><td className="border px-2 py-1">Point of Risk Transfer</td><td className="border px-2 py-1">When goods are handed over to the buyer's carrier at the named inland point or terminal.</td><td className="border px-2 py-1">When goods are placed on board the vessel at the port of shipment.</td></tr>
                    <tr><td className="border px-2 py-1">Alignment with Container Logistics</td><td className="border px-2 py-1">High. Risk transfers when control is lost by the seller.</td><td className="border px-2 py-1">Low. Seller loses control at the terminal but remains on risk until the container is loaded on the vessel, creating a "risk gap".</td></tr>
                    <tr><td className="border px-2 py-1">Responsibility for Origin Terminal Handling Charges (THC)</td><td className="border px-2 py-1">Clearly the buyer's responsibility as part of the main carriage contract.</td><td className="border px-2 py-1">Ambiguous and a frequent source of disputes. Seller is responsible for costs until on board.</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
            {/* 5.3 */}
            <section id="5-3" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">5.3 "C" Terms Demystified: Shipment vs. Arrival Contracts</h3>
              <p>A fundamental conceptual error that plagues users of Incoterms® is the failure to distinguish between "shipment" contracts and "arrival" contracts. This confusion is most acute with the "C" group of rules: CPT, CIP, CFR, and CIF.</p>
              <p>These four rules are all shipment contracts. This means the seller fulfills their primary delivery obligation at the point of shipment in the country of origin, not upon arrival at the destination. Under CPT and CIP, delivery occurs when the goods are handed to the first carrier. Under CFR and CIF, delivery occurs when the goods are loaded on board the vessel. From that moment, the risk of loss or damage during the main transit passes to the buyer. The seller is considered to have performed their delivery duty even if the goods are subsequently lost, damaged, or delayed, and indeed, even if they never arrive at all. The buyer's recourse in case of in-transit loss is not against the seller for non-delivery, but against the carrier (under the contract of carriage) or the insurance company (under the policy arranged by the seller in CIP/CIF, or their own policy).</p>
              <p>This is often misunderstood because the "C" terms also require the seller to contract and pay for carriage to a named destination. This creates the counter-intuitive "two-point" system where costs and risks are split.</p>
              <p>In stark contrast, the "D" group of rules—DAP, DPU, and DDP—are true arrival contracts. Under these terms, the seller's delivery obligation is only fulfilled when the goods physically arrive at the named place of destination. The seller bears all risks of the entire journey.</p>
              <p>The practical consequences of this misunderstanding are severe. A buyer operating under a CIF contract who believes it is an arrival contract may fail to make a timely insurance claim after an in-transit loss, incorrectly assuming it is the seller's responsibility to resolve. Clarifying this distinction is essential for proper risk management.</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-xs md:text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-2 py-1">Aspect</th>
                      <th className="border px-2 py-1">"C" Group (CPT, CIP, CFR, CIF)</th>
                      <th className="border px-2 py-1">"D" Group (DAP, DPU, DDP)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border px-2 py-1">Contract Type</td><td className="border px-2 py-1">Shipment Contract</td><td className="border px-2 py-1">Arrival Contract</td></tr>
                    <tr><td className="border px-2 py-1">Point of Delivery / Risk Transfer</td><td className="border px-2 py-1">At origin (when handed to carrier or on board vessel)</td><td className="border px-2 py-1">At destination (ready for unloading, unloaded, or cleared for import)</td></tr>
                    <tr><td className="border px-2 py-1">Seller's Carriage Obligation</td><td className="border px-2 py-1">Contracts and pays for carriage to named destination.</td><td className="border px-2 py-1">Contracts and pays for carriage to named destination.</td></tr>
                    <tr><td className="border px-2 py-1">Who bears risk during main carriage?</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Seller</td></tr>
                    <tr><td className="border px-2 py-1">Seller's Delivery Obligation Fulfilled?</td><td className="border px-2 py-1">Yes, at the point of shipment, regardless of whether goods arrive.</td><td className="border px-2 py-1">No, only fulfilled when goods safely arrive at the destination.</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
            {/* 5.4 */}
            <section id="5-4" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">5.4 Maximum Obligation, Maximum Risk: A Seller's Guide to the "D" Terms</h3>
              <p>The "D" group rules (DAP, DPU, DDP) place significant responsibility on the seller to deliver goods deep into the buyer's country. While attractive to buyers seeking convenience, they carry substantial risks for sellers that must be carefully managed.</p>
              <p>Under DAP and DPU, the buyer is still responsible for the critical and often complex task of import customs clearance. If the buyer fails to clear the goods in a timely manner, any resulting demurrage or storage costs are for the buyer's account, provided the seller has fulfilled their obligations. The key difference between the two is unloading: the buyer's responsibility under DAP, the seller's under DPU. A seller agreeing to DPU must ensure their carrier is capable, insured, and legally permitted to unload at the buyer's specified location.</p>
              <p>The Delivered Duty Paid (DDP) rule represents a true minefield for the unprepared seller. By agreeing to DDP, the seller effectively becomes the importer of record in the buyer's country, a role that extends far beyond simply arranging freight. This entails several major risks:</p>
              <ul className="list-disc pl-5">
                <li><b>Import Compliance:</b> The seller must have expert knowledge of the destination country's customs laws, tariff classifications, import licensing, and tax regulations (e.g., VAT, GST). This is often impractical for a foreign entity.</li>
                <li><b>Financial Risk:</b> The seller is exposed to unpredictable costs, such as fluctuating duty rates and currency exchange risk on tax payments. To mitigate this, sellers often add a substantial contingency buffer to their DDP price, which can make the buyer's total landed cost higher than if they had managed the import themselves.</li>
                <li><b>The Liability Paradox:</b> A particularly insidious risk is that while the contract places the responsibility on the seller, the customs authorities in the buyer's country will legally pursue the buyer—the resident entity—for any compliance failures, such as unpaid duties or customs fraud committed by the seller's agent. This leaves the buyer liable for actions over which they had no control, making DDP a risky proposition for both parties.</li>
              </ul>
              <p>Given these challenges, DAP or DPU are almost always preferable to DDP. These rules allow the seller to provide a high level of customer service by delivering to the destination while leaving the complex and country-specific task of import clearance to the party best equipped to handle it: the buyer.</p>
            </section>
          </section>
          {/* Part VI */}
          <section id="part-6" className="mb-8">
            <h2 className="text-xl font-bold mb-4">Part VI: The Ecosystem of International Trade: Incoterms® in Practice</h2>
            <p>The Incoterms® rules do not operate in a vacuum. They are a component of a larger ecosystem of contracts and practices, most notably payment mechanisms like Letters of Credit (L/Cs) and insurance contracts. Misalignment between the chosen Incoterm® rule and these ancillary arrangements is a major source of financial loss and dispute.</p>
            {/* 6.1 */}
            <section id="6-1" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">6.1 Aligning Incoterms® with Letters of Credit (L/Cs)</h3>
              <p>Letters of Credit are a common payment method in international trade, especially where trust between parties is limited. They function on a principle of strict documentary compliance, governed by the Uniform Customs and Practice for Documentary Credits (UCP 600). Banks deal only in documents, not in the underlying goods. If the documents presented by the seller (beneficiary) do not comply precisely with the requirements stipulated in the L/C, the bank will refuse payment.</p>
              <p>This documentary-centric environment has profound implications for the choice of Incoterm® rule:</p>
              <ul className="list-disc pl-5">
                <li><b>Why "C" Terms Work Best:</b> The "C" group rules (CFR, CIF, CPT, CIP) are the most compatible with L/Cs. Under these terms, the seller is responsible for contracting the main carriage. This means the seller is in a contractual position to obtain the transport document (e.g., a bill of lading) required by the L/C. Presenting this document to the bank is what triggers payment.</li>
                <li><b>The Problem with "F" Terms:</b> When using "F" group rules (FCA, FOB), the buyer contracts for the main carriage. The seller is therefore not a party to the contract of carriage and has no inherent right to demand a transport document from the carrier. This can place the seller's payment under the L/C at the mercy of the buyer and the buyer's carrier, a highly precarious position. While the Incoterms® 2020 update to FCA provides a mechanism to address this, it requires specific agreement and cooperation from the buyer and their carrier.</li>
                <li><b>The Impracticality of "D" Terms:</b> The "D" group rules are fundamentally incompatible with standard L/C structures. Delivery occurs at the end of the journey. If an L/C calls for a transport document to trigger payment, the seller would be paid long before fulfilling their delivery obligation under the Incoterm® rule. Conversely, if the L/C requires proof of final delivery signed by the buyer, this gives an unscrupulous buyer the power to simply refuse to provide the receipt, thereby blocking payment and defeating the security purpose of the L/C.</li>
              </ul>
            </section>
            {/* 6.2 */}
            <section id="6-2" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">6.2 Insurance Obligations and Strategic Considerations</h3>
              <p>Insurance is another critical area where the choice of Incoterm® has direct consequences. It is a common misconception that all Incoterms® rules address insurance. In fact, only two do.</p>
              <ul className="list-disc pl-5">
                <li><b>Mandatory Insurance (CIF and CIP):</b> Only CIF and CIP obligate the seller to procure insurance for the benefit of the buyer. As detailed previously, the required level of cover differs significantly between the two. CIF defaults to the highly restrictive Institute Cargo Clauses (C), which covers only a short list of major casualties like fire or the vessel sinking. This is often inadequate for manufactured goods. CIP, by contrast, now mandates comprehensive Institute Cargo Clauses (A) ("all risks") cover. A significant pitfall for buyers under CIF is assuming the default coverage is sufficient. They must proactively assess their risk and either negotiate for a higher level of cover in the sales contract or arrange their own supplementary "top-up" insurance.</li>
                <li><b>Implicit Insurance Decisions (All Other Terms):</b> For the remaining nine Incoterms® rules, neither party has an obligation to the other to arrange insurance. However, at every point in the transit, someone bears the risk of loss or damage. Therefore, the party bearing the risk at any given stage must make a commercial decision whether to purchase insurance to cover their exposure.
                  <ul className="list-disc pl-5">
                    <li><b>Example (FOB):</b> The buyer assumes risk the moment the goods are on board the vessel. It is therefore the buyer's responsibility and for their own account to arrange and pay for marine insurance for the main sea voyage.</li>
                    <li><b>Example (DAP):</b> The seller bears the risk of loss or damage for the entire journey until the goods arrive at the named destination. It is the seller's commercial decision whether to insure this significant risk exposure. The buyer has no insurable interest until the goods arrive.</li>
                  </ul>
                </li>
              </ul>
            </section>
          </section>
          {/* Part VII */}
          <section id="part-7" className="mb-8">
            <h2 className="text-xl font-bold mb-4">Part VII: Recommendations and Best Practices for Modern Commerce</h2>
            <p>The effective use of Incoterms® 2020 is not merely about understanding definitions, but about embedding them within robust commercial practices. Adherence to best practices can significantly reduce the risk of disputes, delays, and unexpected costs.</p>
            {/* 7.1 */}
            <section id="7-1" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">7.1 Contractual Best Practices</h3>
              <ul className="list-disc pl-5">
                <li><b>Precision is Paramount:</b> Ambiguity is the enemy of a sound contract. It is imperative to be as precise as possible when incorporating an Incoterm® rule. The contract must clearly state the chosen rule, the specific named port, place, or point of delivery, and the governing version. A clause like "FCA Shanghai Incoterms® 2020" is dangerously vague, as Shanghai has multiple terminals. A better clause would be "FCA Shanghai Yangshan Port Container Terminal Phase 4 Incoterms® 2020".</li>
                <li><b>Integrate, Don't Isolate:</b> The Incoterm® rule is only one part of the sales contract. It must be supported by clear clauses covering all the elements the rules do not address, such as the transfer of title, detailed payment terms, specifications of the goods, warranties, and dispute resolution mechanisms.</li>
                <li><b>Educate Your Team:</b> A frequent cause of disputes is when sales or procurement teams negotiate terms without fully understanding their operational or financial implications. It is essential for companies to provide ongoing training to all staff involved in international transactions to ensure they can select and apply the correct rules effectively.</li>
              </ul>
            </section>
            {/* 7.2 */}
            <section id="7-2" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">7.2 Final Recommendations for Containerized Freight</h3>
              <p>The analysis consistently reveals a critical misalignment between traditional shipping practices and the realities of modern container logistics. To mitigate risk and avoid disputes, the trading community must adapt its habits. The single most important best practice for any party involved in shipping goods in containers is to shift away from the traditional maritime-only rules.</p>
              <ul className="list-disc pl-5">
                <li><b>For Buyers (Importers):</b> Insist on using FCA (Free Carrier) instead of FOB. FCA aligns the transfer of risk with the practical handover of the container to the carrier at the terminal, eliminating the dangerous "risk gap" inherent in FOB.</li>
                <li><b>For Sellers (Exporters):</b> When responsible for arranging the main carriage, use CPT (Carriage Paid To) or CIP (Carriage and Insurance Paid To) instead of CFR or CIF. Like FCA, these terms correctly place the point of delivery and risk transfer at the origin terminal, reflecting the reality of the logistics process.</li>
              </ul>
              <p>Adopting the "any mode" terms (FCA, CPT, CIP) as the default for containerized shipments is the definitive recommendation of the ICC and the logical conclusion of a risk-based analysis of modern trade.</p>
            </section>
            {/* 7.3 */}
            <section id="7-3" className="mb-6">
              <h3 className="text-lg font-semibold mb-2">7.3 Concluding Remarks</h3>
              <p>The Incoterms® 2020 rules are an indispensable instrument for facilitating clear and efficient global trade. They provide a sophisticated and globally recognized language for allocating the fundamental costs and risks of delivering goods from seller to buyer. The 2020 revision has further enhanced this framework, offering greater clarity, addressing practical challenges, and aligning the rules more closely with contemporary commercial practices.</p>
              <p>However, the rules are not a panacea. Their effectiveness is entirely dependent on the diligence, knowledge, and strategic foresight of the traders who use them. Misunderstanding the point of risk transfer, choosing a rule inappropriate for the mode of transport, or failing to integrate the term into a comprehensive sales contract can neutralize their benefits and lead to the very disputes they are designed to prevent. Ultimately, the careful selection of the right Incoterm® rule and its precise incorporation into a well-drafted contract remain cornerstones of successful, profitable, and low-risk international commerce.</p>
            </section>
          </section>
          {/* Works Cited */}
          <section id="references" className="mb-8">
            <h2 className="text-xl font-bold mb-4">Works Cited</h2>
            <div className="overflow-x-auto max-h-96">
              <ol className="list-decimal pl-5 text-sm space-y-1">
                <li>Know Your Incoterms - International Trade Administration, accessed June 29, 2025, <a href="https://www.trade.gov/know-your-incoterms" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.trade.gov/know-your-incoterms</a></li>
                <li>Incoterms® rules - ICC - International Chamber of Commerce, accessed June 29, 2025, <a href="https://iccwbo.org/business-solutions/incoterms-rules/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://iccwbo.org/business-solutions/incoterms-rules/</a></li>
                <li>A Full Breakdown Of Incoterms (International Commercial Terms) - Xeneta, accessed June 29, 2025, <a href="https://www.xeneta.com/blog/incoterms" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.xeneta.com/blog/incoterms</a></li>
                <li>ICC RULES FOR THE USE OF DOMESTIC AND ... - | Makstil, accessed June 29, 2025, <a href="https://www.makstil.com/dam/jcr:41399dcf-de82-4dd2-bbb5-9d33f9e91d74/Incoterms_2020_ENG_Duferco.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">PDF</a></li>
                <li>Avoid the consequences of Incorrect incoterms usage | Noatum Logistics, accessed June 29, 2025, <a href="https://www.noatumlogistics.com/avoid-the-consequences-of-incorrect-incoterms-usage/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.noatumlogistics.com/avoid-the-consequences-of-incorrect-incoterms-usage/</a></li>
                <li>ICC-INCOTERMS-2020.pdf, accessed June 29, 2025, <a href="https://iscosafricashipping.org/wp-content/uploads/2020/02/ICC-INCOTERMS-2020.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">PDF</a></li>
                <li>Incoterms® 2020 English - eBook - ICC Academy, accessed June 29, 2025, <a href="https://academy.iccwbo.org/incoterms/e-books/incoterms-2020-english/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://academy.iccwbo.org/incoterms/e-books/incoterms-2020-english/</a></li>
                <li>Incoterms® 2020 vs 2010: What's changed? - ICC Academy, accessed June 29, 2025, <a href="https://academy.iccwbo.org/incoterms/article/incoterms-2020-vs-2010-whats-changed/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://academy.iccwbo.org/incoterms/article/incoterms-2020-vs-2010-whats-changed/</a></li>
                <li>Incoterms: The Good, The Bad, and The Ambiguous - Inbound Logistics, accessed June 29, 2025, <a href="https://www.inboundlogistics.com/articles/incoterms-the-good-the-bad-and-the-ambiguous/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.inboundlogistics.com/articles/incoterms-the-good-the-bad-and-the-ambiguous/</a></li>
                <li>BASIC OVERVIEW OF THE INCOTERMS® 2020 RULES - DHL, accessed June 29, 2025, <a href="https://www.dhl.com/content/dam/dhl/global/dhl-global-forwarding/documents/pdf/glo-dgf-incoterms-2020-brochure.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">PDF</a></li>
                <li>Guide to the Incoterms 2020 - Key Changes Explained - High Speed Training, accessed June 29, 2025, <a href="https://www.highspeedtraining.co.uk/hub/guide-to-incoterms-2020-changes/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.highspeedtraining.co.uk/hub/guide-to-incoterms-2020-changes/</a></li>
                <li>Incoterms Explained [2025 Ultimate Guide] - Freightos, accessed June 29, 2025, <a href="https://www.freightos.com/freight-resources/incoterms-plain-english-freight-shipping-guide/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.freightos.com/freight-resources/incoterms-plain-english-freight-shipping-guide/</a></li>
                <li>How to avoid the 7 most common Incoterms® mistakes - Maersk, accessed June 29, 2025, <a href="https://www.maersk.com/logistics-explained/customs-and-compliance/2023/10/04/how-to-avoid-the-7-most-common-incoterm-mistakes" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.maersk.com/logistics-explained/customs-and-compliance/2023/10/04/how-to-avoid-the-7-most-common-incoterm-mistakes</a></li>
                <li>6 common mistakes when using Incoterms [UPDATED 2025] - Trade Finance Global, accessed June 29, 2025, <a href="https://www.tradefinanceglobal.com/incoterms/6-common-mistakes-when-using-incoterms/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.tradefinanceglobal.com/incoterms/6-common-mistakes-when-using-incoterms/</a></li>
                <li>Incoterms: Definition, Examples, Rules, Pros & Cons - Investopedia, accessed June 29, 2025, <a href="https://www.investopedia.com/terms/i/incoterms.asp" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.investopedia.com/terms/i/incoterms.asp</a></li>
                <li>ICC Guide to Incoterms® 2020 - ICC Knowledge 2 Go - International Chamber of Commerce, accessed June 29, 2025, <a href="https://2go.iccwbo.org/icc-guide-to-incoterms-2020+book_version-Book/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://2go.iccwbo.org/icc-guide-to-incoterms-2020+book_version-Book/</a></li>
                <li>Incoterms® 2020 - ICC - International Chamber of Commerce, accessed June 29, 2025, <a href="https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/</a></li>
                <li>Incoterms 2020 - 7 key changes - RCM d.o.o., accessed June 29, 2025, <a href="https://www.rcm.si/en/Incoterms-2020-7-key-changes" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.rcm.si/en/Incoterms-2020-7-key-changes</a></li>
                <li>Incoterms 2020 Defined – Guide On The Latest Changes - Velotrade, accessed June 29, 2025, <a href="https://www.velotrade.com/blog/what-is-incoterms-2020/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.velotrade.com/blog/what-is-incoterms-2020/</a></li>
                <li>How to Choose the Right Incoterms - AGI Global Logistics, accessed June 29, 2025, <a href="https://www.agi.global/custom-clearance-hub/how-to-choose-the-right-incoterms" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.agi.global/custom-clearance-hub/how-to-choose-the-right-incoterms</a></li>
                <li>EX Works Incoterms: What EXW Means and Pricing - Guided Imports, accessed June 29, 2025, <a href="https://guidedimports.com/blog/what-does-exw-mean-incoterms/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://guidedimports.com/blog/what-does-exw-mean-incoterms/</a></li>
                <li>INCOTERMS 2020 - Point of Delivery and Transfer of Risk - BRP, accessed June 29, 2025, <a href="https://www.brp.com/content/dam/connectedassets/brp-corporate/images/website/Incoterms%202020.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.brp.com/content/dam/connectedassets/brp-corporate/images/website/Incoterms%202020.pdf</a></li>
                <li>5 reasons why buyers avoid Ex Works - key tips - Blog, accessed June 29, 2025, <a href="https://blog.learnhowtosource.com/avoid-ex-works-is-recommended/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://blog.learnhowtosource.com/avoid-ex-works-is-recommended/</a></li>
                <li>Ex Works Incoterms (EXW) - 2025 Guide - Trade Finance Global, accessed June 29, 2025, <a href="https://www.tradefinanceglobal.com/incoterms/ex-works-exw/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.tradefinanceglobal.com/incoterms/ex-works-exw/</a></li>
                <li>A guide to Incoterms | Clarksons, accessed June 29, 2025, <a href="https://www.clarksons.com/glossary/a-guide-to-incoterms/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.clarksons.com/glossary/a-guide-to-incoterms/</a></li>
                <li>EXW Costs Explained - Shippo-LCL Shipping UK China, accessed June 29, 2025, <a href="https://www.shippo.co.uk/tips-and-tricks/exw-costs-explained/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.shippo.co.uk/tips-and-tricks/exw-costs-explained/</a></li>
                <li>Incoterms 2020 Explained – The Complete Guide - INVEXI, accessed June 29, 2025, <a href="https://invexi.org/press/incoterms-2020-explained-the-complete-guide/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://invexi.org/press/incoterms-2020-explained-the-complete-guide/</a></li>
                <li>FCA (Free Carrier) Incoterms® 2020 Rule - Trade Finance Global, accessed June 29, 2025, <a href="https://www.tradefinanceglobal.com/incoterms/fca-free-carrier/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.tradefinanceglobal.com/incoterms/fca-free-carrier/</a></li>
                <li>Free Carrier (FCA) Guide - Shipping Incoterms® Explained - ShipBob, accessed June 29, 2025, <a href="https://www.shipbob.com/blog/free-carrier-fca/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.shipbob.com/blog/free-carrier-fca/</a></li>
                <li>FCA (Free Carrier) in Incoterms 2020: Practical Guide - Fulfillment-Box, accessed June 29, 2025, <a href="https://fulfillment-box.com/fca-free-carrier-in-incoterms-a-practical-guide-to-getting-it-right/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://fulfillment-box.com/fca-free-carrier-in-incoterms-a-practical-guide-to-getting-it-right/</a></li>
                <li>Incoterms Explained: Cost and Freight (CFR) - DCL Logistics, accessed June 29, 2025, <a href="https://dclcorp.com/blog/shipping/incoterms-cost-and-freight-cfr/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://dclcorp.com/blog/shipping/incoterms-cost-and-freight-cfr/</a></li>
                <li>Incoterms® 2020: CPT or CIP? - ICC Academy, accessed June 29, 2025, <a href="https://academy.iccwbo.org/incoterms/article/incoterms-2020-cpt-or-cip/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://academy.iccwbo.org/incoterms/article/incoterms-2020-cpt-or-cip/</a></li>
                <li>CPT and CIP - C J International, accessed June 29, 2025, <a href="https://www.cjinternational.com/incoterms/carriage-paid-to/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.cjinternational.com/incoterms/carriage-paid-to/</a></li>
                <li>Incoterms CPT vs. CIP: Understanding the Key Differences - Aerodoc, accessed June 29, 2025, <a href="https://www.aerodoc.com/incoterms-cpt-vs-cip-understanding-the-key-differences/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.aerodoc.com/incoterms-cpt-vs-cip-understanding-the-key-differences/</a></li>
                <li>Incoterms 2020 CIP: Spotlight on Carriage and Insurance Paid To - Shipping Solutions, accessed June 29, 2025, <a href="https://www.shippingsolutions.com/blog/incoterms-cip-spotlight-carriage-insurance-paid-to" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.shippingsolutions.com/blog/incoterms-cip-spotlight-carriage-insurance-paid-to</a></li>
                <li>Carriage and Insurance Paid To (CIP) Incoterms® 2020 Rule - Trade Finance Global, accessed June 29, 2025, <a href="https://www.tradefinanceglobal.com/incoterms/cip-carriage-insurance-paid-to/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.tradefinanceglobal.com/incoterms/cip-carriage-insurance-paid-to/</a></li>
                <li>Incoterms® 2020: DPU or DAP? - ICC Academy, accessed June 29, 2025, <a href="https://academy.iccwbo.org/incoterms/article/incoterms-2020-dpu-or-dap/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://academy.iccwbo.org/incoterms/article/incoterms-2020-dpu-or-dap/</a></li>
                <li>Incoterms® 2020: DAP or DDP? - ICC Academy, accessed June 29, 2025, <a href="https://academy.iccwbo.org/incoterms/article/incoterms-2020-dap-or-ddp/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://academy.iccwbo.org/incoterms/article/incoterms-2020-dap-or-ddp/</a></li>
                <li>Incoterm DAP: Definition, challenges and alternatives - SINO Shipping, accessed June 29, 2025, <a href="https://www.sino-shipping.com/incoterm-delivered-at-place-complete-guide/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.sino-shipping.com/incoterm-delivered-at-place-complete-guide/</a></li>
                <li>A Guide to Incoterms - Trade Hub Knowledge Base, accessed June 29, 2025, <a href="https://crossbordertradehub.intertradeireland.com/article-a-simple-guide-to-incoterms" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://crossbordertradehub.intertradeireland.com/article-a-simple-guide-to-incoterms</a></li>
                <li>DAP, DPU and DDP Incoterms®: Difference & Tips for these Incoterms® - IncoDocs, accessed June 29, 2025, <a href="https://incodocs.com/blog/dap-dpu-ddp-incoterms/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://incodocs.com/blog/dap-dpu-ddp-incoterms/</a></li>
                <li>Incoterms Comparison: DDP vs. DAP—What's the Difference? - Shipping Solutions, accessed June 29, 2025, <a href="https://www.shippingsolutions.com/blog/ddp-vs-dap" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.shippingsolutions.com/blog/ddp-vs-dap</a></li>
                <li>Incoterms DPU｜Essential Guide to Delivered at Place Unloaded - Gorto Freight, accessed June 29, 2025, <a href="https://gortofreight.com/incoterms-dpu/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://gortofreight.com/incoterms-dpu/</a></li>
                <li>Incoterms Explained: Delivered at Place Unloaded (DPU) - Customs Support Group, accessed June 29, 2025, <a href="https://www.customssupport.com/delivered-at-place-unloaded-dpu-incoterm-2020/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.customssupport.com/delivered-at-place-unloaded-dpu-incoterm-2020/</a></li>
                <li>DPU Incoterms: What DPU Means & Delivered at Place Unloaded - EdgeCTP, accessed June 29, 2025, <a href="https://edgectp.com/blog/dpu-incoterms-delivered-at-place-unloaded/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://edgectp.com/blog/dpu-incoterms-delivered-at-place-unloaded/</a></li>
                <li>DAP vs. DPU Incoterms: What is the Difference? - Ship4wd, accessed June 29, 2025, <a href="https://ship4wd.com/incoterms/dap-vs-dpu" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://ship4wd.com/incoterms/dap-vs-dpu</a></li>
                <li>DDP Incoterms: Delivery Duty Paid Guide [UPDATED 2025] - Trade Finance Global, accessed June 29, 2025, <a href="https://www.tradefinanceglobal.com/incoterms/ddp-delivery-duty-paid/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.tradefinanceglobal.com/incoterms/ddp-delivery-duty-paid/</a></li>
                <li>Incoterms 2020 DDP: Spotlight on Delivered Duty Paid - Shipping Solutions, accessed June 29, 2025, <a href="https://www.shippingsolutions.com/blog/incoterms-ddp" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.shippingsolutions.com/blog/incoterms-ddp</a></li>
                <li>FCA vs FOB: Key Differences in Shipping Terms 2025 - WareIQ, accessed June 29, 2025, <a href="https://wareiq.com/resources/blogs/fca-vs-fob-key-differences/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://wareiq.com/resources/blogs/fca-vs-fob-key-differences/</a></li>
                <li>Differences Between FAS and FOB Incoterms - Eurosender.com, accessed June 29, 2025, <a href="https://www.eurosender.com/en/incoterms/fob-vs-fas" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.eurosender.com/en/incoterms/fob-vs-fas</a></li>
                <li>Free Alongside Ship (FAS) Definition | UPS Supply Chain Solutions - United States, accessed June 29, 2025, <a href="https://www.ups.com/us/en/supplychain/resources/glossary-term/free-alongside-ship" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.ups.com/us/en/supplychain/resources/glossary-term/free-alongside-ship</a></li>
                <li>Free Alongside Ship (FAS): Definition and Use in Contracts - Investopedia, accessed June 29, 2025, <a href="https://www.investopedia.com/terms/f/fas.asp" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.investopedia.com/terms/f/fas.asp</a></li>
                <li>What Does Free Alongside Ship (FAS) Mean? Incoterms Explained - Pro Carrier, accessed June 29, 2025, <a href="https://weareprocarrier.com/news/article/what-does-free-alongside-ship-fas-mean-incoterms-explained" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://weareprocarrier.com/news/article/what-does-free-alongside-ship-fas-mean-incoterms-explained</a></li>
                <li>Incoterms Defined: What does EXW, FCA, FOB, DAP, DAT, DDP, CPT, CIP, CIF, CFR, or FAS Mean? - Cosmo Sourcing, accessed June 29, 2025, <a href="https://www.cosmosourcing.com/blog/incoterms-defined-fob-exw" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.cosmosourcing.com/blog/incoterms-defined-fob-exw</a></li>
                <li>Free Alongside Ship (FAS) and Free On Board (FOB) - C J International, accessed June 29, 2025, <a href="https://www.cjinternational.com/incoterms/fas-fob/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.cjinternational.com/incoterms/fas-fob/</a></li>
                <li>FOB Incoterms® meaning | Free on Board shipping - Maersk, accessed June 29, 2025, <a href="https://www.maersk.com/logistics-explained/customs-and-compliance/2023/10/05/free-on-board-shipping" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.maersk.com/logistics-explained/customs-and-compliance/2023/10/05/free-on-board-shipping</a></li>
                <li>Shipping Terms FAS, FOB, C&F, CIF - U.S. Grains Council, accessed June 29, 2025, <a href="https://grains.org/wp-content/uploads/2018/01/Chapter-6-Shipping-Terms-FAS-FOB-CF-CIF-20220331-Final.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">PDF</a></li>
                <li>What is the Difference Between FCA and FOB? - Freight Forwarding Company, accessed June 29, 2025, <a href="https://tsfreight.com/difference-between-fca-and-fob/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://tsfreight.com/difference-between-fca-and-fob/</a></li>
                <li>What Are the Costs for Free on Board (FOB) Freights? - Investopedia, accessed June 29, 2025, <a href="https://www.investopedia.com/ask/answers/063015/what-kinds-costs-are-included-free-board-fob-shipping.asp" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.investopedia.com/ask/answers/063015/what-kinds-costs-are-included-free-board-fob-shipping.asp</a></li>
                <li>What is CFR (Cost and Freight)? | Interwf, accessed June 29, 2025, <a href="https://interwf.com/freight-glossary/cfr-cost-and-freight/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://interwf.com/freight-glossary/cfr-cost-and-freight/</a></li>
                <li>What Is Cost and Freight (CFR) in Foreign Trade Contracts? - Investopedia, accessed June 29, 2025, <a href="https://www.investopedia.com/terms/c/cfr.asp" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.investopedia.com/terms/c/cfr.asp</a></li>
                <li>Understanding Cost and Freight CFR - GoFreight, accessed June 29, 2025, <a href="https://www.gofreight.com/blog/education/understanding-cost-and-freight-cfr.html" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.gofreight.com/blog/education/understanding-cost-and-freight-cfr.html</a></li>
                <li>What is CFR? Cost and Freight Shipping, accessed June 29, 2025, <a href="https://www.freightright.com/kb/cfr-cost-and-freight-named-port-of-destination" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.freightright.com/kb/cfr-cost-and-freight-named-port-of-destination</a></li>
                <li>CIF vs CFR Incoterms: Differences and Comparison - Eurosender.com, accessed June 29, 2025, <a href="https://www.eurosender.com/en/incoterms/cif-vs-cfr" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.eurosender.com/en/incoterms/cif-vs-cfr</a></li>
                <li>Understanding CFR vs. CIF - Investopedia, accessed June 29, 2025, <a href="https://www.investopedia.com/ask/answers/072815/what-difference-between-cost-and-freight-cfr-and-cost-insurance-and-freight-cif.asp" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.investopedia.com/ask/answers/072815/what-difference-between-cost-and-freight-cfr-and-cost-insurance-and-freight-cif.asp</a></li>
                <li>CFR and CIF - C J International, accessed June 29, 2025, <a href="https://www.cjinternational.com/incoterms/cfr-and-cif/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.cjinternational.com/incoterms/cfr-and-cif/</a></li>
                <li>CFR vs. CIF Incoterms: What is the Difference? - Ship4wd, accessed June 29, 2025, <a href="https://ship4wd.com/incoterms/cfr-vs-cif" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://ship4wd.com/incoterms/cfr-vs-cif</a></li>
                <li>Incoterms 2020 vs 2010 // Changes Between The 2020 Incoterms ..., accessed June 29, 2025, <a href="https://www.cosmosourcing.com/blog/incoterms-2020-vs-2010-changes-between-the-2020-incoterms-and-the-2010-incoterms" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.cosmosourcing.com/blog/incoterms-2020-vs-2010-changes-between-the-2020-incoterms-and-the-2010-incoterms</a></li>
                <li>Incoterms 2020 now in effect – What are the main changes? - Customs Support, accessed June 29, 2025, <a href="https://www.customssupport.com/insights/incoterms-2020-now-effect-what-are-main-changes" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.customssupport.com/insights/incoterms-2020-now-effect-what-are-main-changes</a></li>
                <li>Beyond the Terms: Understanding the Substantive Differences in Incoterms® 2020, accessed June 29, 2025, <a href="https://millerjohnson.com/beyond-the-terms-understanding-the-substantive-differences-in-incoterms-2020/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://millerjohnson.com/beyond-the-terms-understanding-the-substantive-differences-in-incoterms-2020/</a></li>
                <li>Incoterms Guide [Updated 2025] With Free PDF Download - IncoDocs, accessed June 29, 2025, <a href="https://incodocs.com/blog/incoterms-2020-explained-the-complete-guide/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://incodocs.com/blog/incoterms-2020-explained-the-complete-guide/</a></li>
                <li>Which Incoterm® should I choose for exporting? | hub.info - Hub.Brussels, accessed June 29, 2025, <a href="http://info.hub.brussels/en/guide/growing-your-business-export/which-incoterm-should-i-choose-exporting" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">http://info.hub.brussels/en/guide/growing-your-business-export/which-incoterm-should-i-choose-exporting</a></li>
                <li>What is DDP shipping? meaning, pros + cons, & more | Red Stag Fulfillment, accessed June 29, 2025, <a href="https://redstagfulfillment.com/ddp-shipping/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://redstagfulfillment.com/ddp-shipping/</a></li>
                <li>DDP Incoterms: What it Means and Pricing - Guided Imports, accessed June 29, 2025, <a href="https://guidedimports.com/blog/what-does-ddp-mean-incoterms/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://guidedimports.com/blog/what-does-ddp-mean-incoterms/</a></li>
                <li>Ex Works vs FOB: A Complete Guide to Their Differences, accessed June 29, 2025, <a href="https://blog.anderinger.com/blog/ex-works-vs-fob-a-complete-guide-to-their-differences" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://blog.anderinger.com/blog/ex-works-vs-fob-a-complete-guide-to-their-differences</a></li>
                <li>Choosing the right Incoterm [UPDATED 2025] - Trade Finance Global, accessed June 29, 2025, <a href="https://www.tradefinanceglobal.com/incoterms/choosing-the-right-incoterm/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.tradefinanceglobal.com/incoterms/choosing-the-right-incoterm/</a></li>
                <li>www.tradefinanceglobal.com, accessed June 29, 2025, <a href="https://www.tradefinanceglobal.com/incoterms/choosing-the-right-incoterm/#:~:text=Factors%20to%20consider%20when%20choosing%20Incoterms,-Several%20factors%20influence&text=Some%20key%20considerations%20are%3A,control%20over%20shipping%20and%20insurance." target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.tradefinanceglobal.com/incoterms/choosing-the-right-incoterm/#:~:text=Factors%20to%20consider%20when%20choosing%20Incoterms,-Several%20factors%20influence&text=Some%20key%20considerations%20are%3A,control%20over%20shipping%20and%20insurance.</a></li>
                <li>Ex Works (EXW) Defined Plus Its Pros & Cons - Acquire.Fi, accessed June 29, 2025, <a href="https://www.acquire.fi/glossary/ex-works-exw-defined-pros-and-cons-plus-more-incoterms" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.acquire.fi/glossary/ex-works-exw-defined-pros-and-cons-plus-more-incoterms</a></li>
                <li>Ex Works (EXW): Definition, Pros and Cons, Plus More Incoterms - Investopedia, accessed June 29, 2025, <a href="https://www.investopedia.com/terms/e/exw.asp" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.investopedia.com/terms/e/exw.asp</a></li>
                <li>Potential Pitfalls for Exporters Using Ex Works | Mohawk Global, accessed June 29, 2025, <a href="https://mohawkglobal.com/wp-content/uploads/2020/06/Trubits-pitfalls-exporter-exworks.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">PDF</a></li>
                <li>What is Ex Works Pricing (EXW): Meaning, Pros and Cons, Examples | Priceva, accessed June 29, 2025, <a href="https://priceva.com/blog/ex-works-pricing" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://priceva.com/blog/ex-works-pricing</a></li>
                <li>Ex Works Incoterms: What EXW Means, Benefits, and Examples - EdgeCTP, accessed June 29, 2025, <a href="https://edgectp.com/blog/ex-works-incoterms-what-exw-mean/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://edgectp.com/blog/ex-works-incoterms-what-exw-mean/</a></li>
                <li>FOB: can we please kill its general use? : r/logistics - Reddit, accessed June 29, 2025, <a href="https://www.reddit.com/r/logistics/comments/16srkuh/fob_can_we_please_kill_its_general_use/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.reddit.com/r/logistics/comments/16srkuh/fob_can_we_please_kill_its_general_use/</a></li>
                <li>FOB (Free on Board) - Incoterms® 2020 Rule [UPDATED 2025] - Trade Finance Global, accessed June 29, 2025, <a href="https://www.tradefinanceglobal.com/incoterms/fob-price-free-on-board-meaning/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.tradefinanceglobal.com/incoterms/fob-price-free-on-board-meaning/</a></li>
                <li>FOB Incoterm (Free on Board) - Use and Meaning | iContainers, accessed June 29, 2025, <a href="https://www.icontainers.com/help/incoterms/fob/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.icontainers.com/help/incoterms/fob/</a></li>
                <li>incoterms.2020-guidance-note-containers-and-ports-january2024.pdf - ICC Italia, accessed June 29, 2025, <a href="https://www.iccitalia.org/wp-content/uploads/2024/02/incoterms.2020-guidance-note-containers-and-ports-january2024.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">PDF</a></li>
                <li>INN.LAW Insights – Incoterms® 2020 FCA and CPT – Best practice, accessed June 29, 2025, <a href="https://www.inn.law/en/insights/incoterms-best-practice" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.inn.law/en/insights/incoterms-best-practice</a></li>
                <li>Procurement 101: Mastering Incoterms – Optimizing Cost, Risk, and Efficiency in Global Trade - CADDi, accessed June 29, 2025, <a href="https://us.caddi.com/resources/insights/incoterms" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://us.caddi.com/resources/insights/incoterms</a></li>
                <li>Delivered at Place Unloaded (DPU) Incoterms® 2020 Rule - Trade Finance Global, accessed June 29, 2025, <a href="https://www.tradefinanceglobal.com/incoterms/dpu-delivered-at-place-unloaded/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.tradefinanceglobal.com/incoterms/dpu-delivered-at-place-unloaded/</a></li>
                <li>Disadvantages of Delivered Duty Paid (DDP) Incoterm - Asiana USA, accessed June 29, 2025, <a href="https://www.asianausa.com/the-disadvantages-of-the-delivered-duty-paid-ddp-incoterm/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.asianausa.com/the-disadvantages-of-the-delivered-duty-paid-ddp-incoterm/</a></li>
                <li>What Are the Risks Associated with Using Incoterms DDP? - Bulb, accessed June 29, 2025, <a href="https://www.bulbapp.com/u/what-are-the-risks-associated-with-using-incoterms-ddp" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.bulbapp.com/u/what-are-the-risks-associated-with-using-incoterms-ddp</a></li>
                <li>DDP from China to USA: The Ultimate Guide for 2025 - Dantful, accessed June 29, 2025, <a href="https://www.dantful.com/ddp-from-china-to-usa-the-ultimate-guide-for-2024/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.dantful.com/ddp-from-china-to-usa-the-ultimate-guide-for-2024/</a></li>
                <li>What is DDP and Why It Is Not Good for You, accessed June 29, 2025, <a href="https://www.nonameglobal.com/post/what-is-ddp-and-why-it-is-not-good-for-you" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.nonameglobal.com/post/what-is-ddp-and-why-it-is-not-good-for-you</a></li>
                <li>Buyer Beware: The Hidden Risks of Unpaid Tariffs Under DDP - Harris Sliwoski, accessed June 29, 2025, <a href="https://harris-sliwoski.com/chinalawblog/buyer-beware-the-hidden-risks-of-unpaid-tariffs-under-ddp/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://harris-sliwoski.com/chinalawblog/buyer-beware-the-hidden-risks-of-unpaid-tariffs-under-ddp/</a></li>
                <li>Handling Document Discrepancies | TFG Ultimate Guide - Trade Finance Global, accessed June 29, 2025, <a href="https://www.tradefinanceglobal.com/letters-of-credit/handling-document-discrepancies/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.tradefinanceglobal.com/letters-of-credit/handling-document-discrepancies/</a></li>
                <li>The Link Between Incoterms 2000 and Letter of Credit Documentation Requirement and Payment Risk - ResearchGate, accessed June 29, 2025, <a href="https://www.researchgate.net/publication/242130763_The_Link_Between_Incoterms_2000_and_Letter_of_Credit_Documentation_Requirement_and_Payment_Risk" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.researchgate.net/publication/242130763_The_Link_Between_Incoterms_2000_and_Letter_of_Credit_Documentation_Requirement_and_Payment_Risk</a></li>
                <li>A guide to types of documentary credit | ICC Academy, accessed June 29, 2025, <a href="https://academy.iccwbo.org/trade-finance/article/types-of-documentary-credit-a-comprehensive-guide/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://academy.iccwbo.org/trade-finance/article/types-of-documentary-credit-a-comprehensive-guide/</a></li>
                <li>Incoterms rules & letters of credit, accessed June 29, 2025, <a href="https://www.incotermsexplained.com/incoterms-2020-rules-letters-credit/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.incotermsexplained.com/incoterms-2020-rules-letters-credit/</a></li>
                <li>INCOTERMS IN PRACTICE: HIDDEN RISKS Case Study - Theseus, accessed June 29, 2025, <a href="https://www.theseus.fi/bitstream/handle/10024/135838/Seredyuk_Victoria.pdf;sequence=2" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">PDF</a></li>
                <li>Institute Cargo Clauses A, B and C Differences - James Hallam, accessed June 29, 2025, <a href="https://jameshallam.co.uk/institute-cargo-clauses-a-b-c/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://jameshallam.co.uk/institute-cargo-clauses-a-b-c/</a></li>
                <li>Marine insurance: why institute cargo clauses matter - Sedgwick, accessed June 29, 2025, <a href="https://www.sedgwick.com/blog/marine-insurance-why-institute-cargo-clauses-matter/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.sedgwick.com/blog/marine-insurance-why-institute-cargo-clauses-matter/</a></li>
                <li>The Difference Between Institute Cargo Clauses A, B and C - Hayes Parsons, accessed June 29, 2025, <a href="https://www.hayesparsons.co.uk/the-difference-between-institute-cargo-clauses-a-b-and-c/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://www.hayesparsons.co.uk/the-difference-between-institute-cargo-clauses-a-b-and-c/</a></li>
                <li>Most Frequent Incoterms Errors (and How to Avoid Them) in 2025 - TRADLINX Blogs, accessed June 29, 2025, <a href="https://blogs.tradlinx.com/most-frequent-incoterms-errors-and-how-to-avoid-them-in-2025/" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">https://blogs.tradlinx.com/most-frequent-incoterms-errors-and-how-to-avoid-them-in-2025/</a></li>
              </ol>
            </div>
          </section>
        </main>
      </div>
      <div className="mt-4 lg:hidden">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-700">Reading Progress</span>
          <span className="text-xs font-semibold text-gray-700">{progress.toFixed(0)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

export default Playbook16; 