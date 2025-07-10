import React, { useState, useRef, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const sections = [
  { id: 'part-1', label: 'Part I: Foundations of Global Trade Documentation', subs: [
    { id: '1-1', label: 'Chapter 1: The Strategic Role of Documentation in Global Trade' },
  ]},
  { id: 'part-2', label: 'Part II: The Core Commercial & Logistical Documents', subs: [
    { id: '2-1', label: 'Chapter 2: The Commercial Invoice: The Master Document' },
    { id: '2-2', label: 'Chapter 3: The Export Packing List: The "What\'s in the Box" Guide' },
    { id: '2-3', label: 'Chapter 4: The Certificate of Origin (CoO): Proving Provenance' },
  ]},
  { id: 'part-3', label: 'Part III: The Contract of Carriage & Transport Documents', subs: [
    { id: '3-1', label: 'Chapter 5: The Bill of Lading (B/L): The Key to Ocean Freight' },
    { id: '3-2', label: 'Chapter 6: The Air Waybill (AWB): The Contract for Air Freight' },
  ]},
  { id: 'part-4', label: 'Part IV: Specialized & Ancillary Documents', subs: [
    { id: '4-1', label: 'Chapter 7: Facilitating the Shipment: SLI, Inspection & Insurance' },
    { id: '4-2', label: 'Chapter 8: Facilitating Payment: Letters of Credit & Bills of Exchange' },
  ]},
  { id: 'part-5', label: 'Part V: Regional Compliance Deep Dives', subs: [
    { id: '5-1', label: 'Chapter 9: Exporting from India: A Documentation Masterclass' },
    { id: '5-2', label: 'Chapter 10: Navigating Major Economic Blocs: EU, US, & China' },
  ]},
  { id: 'part-6', label: 'Part VI: The Future of Trade Documentation', subs: [
    { id: '6-1', label: 'Chapter 11: Digital Transformation and the Future of Trade Docs' },
  ]},
  { id: 'part-7', label: 'Part VII: Appendices', subs: [
    { id: '7-1', label: 'Appendix A: Master Document Checklist & Glossary' },
    { id: '7-2', label: 'Appendix B: Common Errors & Penalties Matrix' },
    { id: '7-3', label: 'Appendix C: Editable Document Templates' },
  ]},
  { id: 'conclusion', label: 'Conclusion', subs: [] },
];

const sectionIds = [
  'part-1', '1-1',
  'part-2', '2-1', '2-2', '2-3',
  'part-3', '3-1', '3-2',
  'part-4', '4-1', '4-2',
  'part-5', '5-1', '5-2',
  'part-6', '6-1',
  'part-7', '7-1', '7-2', '7-3',
  'conclusion',
];

const Playbook8 = () => {
  const [activeSection, setActiveSection] = useState('part-1');
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef(null);
  const tocRef = useRef(null);
  const [progress, setProgress] = useState(0);

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

  return (
    <div className="font-sans bg-gray-50 min-h-screen w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 mt-4 font-serif truncate">The Definitive Playbook for Essential Export-Import Documentation</h1>
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
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleTocClick(section.id)}
                    className={`w-full text-left px-2 py-2 rounded font-semibold text-base transition-colors truncate ${activeSection === section.id ? 'bg-purple-100 text-purple-700 toc-active' : 'hover:bg-gray-100'}`}
                  >
                    {section.label}
                  </button>
                  {section.subs && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {section.subs.map((sub) => (
                        <li key={sub.id}>
                          <button
                            onClick={() => handleTocClick(sub.id)}
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
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleTocClick(section.id)}
                    className={`w-full text-left px-2 py-2 rounded font-semibold text-base transition-colors truncate ${activeSection === section.id ? 'bg-purple-100 text-purple-700 toc-active' : 'hover:bg-gray-100'}`}
                  >
                    {section.label}
                  </button>
                  {section.subs && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {section.subs.map((sub) => (
                        <li key={sub.id}>
                          <button
                            onClick={() => handleTocClick(sub.id)}
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
          {/* Example: First section, expand as needed */}
          <section id="part-1" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part I: Foundations of Global Trade Documentation</h2>
          </section>
          <section id="1-1" className="mb-8">
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">Chapter 1: The Strategic Role of Documentation in Global Trade</h3>
            <h4 className="font-semibold mt-5 mb-2 truncate">Introduction: Beyond Paperwork - Documents as the Lifeblood of Commerce</h4>
            <p>In the intricate world of international trade, goods cross borders, payments traverse continents, and ownership is transferred between parties who may never meet. The entire architecture of this global system rests upon a foundation of precise and standardized documentation. To view these documents as mere paperwork or a bureaucratic necessity is to fundamentally misunderstand their role. They are the lifeblood of commerce, the central nervous system that connects the physical flow of goods with the financial flow of money and the legal transfer of ownership and risk.</p>
            <p>Accurate documentation is not simply a compliance task; it is a critical component of strategic business management. Errors, inconsistencies, or omissions in this paperwork are among the most common and costly sources of failure in international trade, leading directly to shipment delays, customs penalties, payment disputes, and damaged customer relationships. Conversely, mastery of documentation provides a significant competitive advantage, enabling smoother logistics, faster payments, and lower costs. This playbook is designed to serve as a definitive, one-stop reference, guiding exporters and importers through the complexities of this critical domain, transforming a potential liability into a strategic asset.</p>
            <h4 className="font-semibold mt-5 mb-2 truncate">The Three Pillars of Trade Documentation: Legal, Financial, and Logistical</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Legal Pillar:</b> International trade documents are legally binding instruments. The Commercial Invoice acts as a formal bill of sale and a legal declaration to customs authorities. The Bill of Lading is a contract of carriage that also functions as a document of title, representing legal ownership of the goods themselves. An error on these documents is not just a clerical mistake; it can constitute a breach of contract or a violation of customs law, exposing a company to significant legal disputes, fines, and in cases of fraud, even criminal prosecution.</li>
              <li><b>Financial Pillar:</b> Documentation is the key that unlocks payment in global trade. When a transaction is financed using a Letter of Credit (L/C), banks deal exclusively in documents, not the underlying goods. The exporter is paid only when they present a set of documents that strictly complies with the terms of the L/C. Any discrepancy can give the bank grounds to refuse payment, placing the entire value of the transaction at risk. Similarly, a Bill of Exchange is a formal, legally recognized order from the seller to the buyer to pay a specific amount on a specific date, providing a more secure basis for credit than a simple invoice.</li>
              <li><b>Logistical Pillar:</b> Documents provide the essential instructions that guide every participant in the supply chain. A Shipper's Letter of Instruction (SLI) serves as the "mission briefing" for the freight forwarder, detailing how and where to move the cargo. An Export Packing List tells the warehouse staff, carrier, and customs officials exactly what is inside each package, enabling efficient handling and inspection. The Bill of Lading or Air Waybill provides the carrier with the consignee's details and the final destination, acting as the contract for the physical movement of the goods.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2 truncate">Visualizing the Process: The Export-Import Documentation Flowchart</h4>
            <ol className="list-decimal pl-6 mb-2">
              <li><b>Negotiation & Quotation:</b> The process begins when a potential buyer sends an inquiry. The seller responds with a Proforma Invoice, which is a preliminary bill of sale that acts as a formal quote. It outlines the goods, prices, and terms, forming the blueprint for the entire transaction.</li>
              <li><b>Order Confirmation:</b> If the buyer accepts the terms, they issue a Purchase Order (PO). The seller confirms the order, and if payment is via Letter of Credit, the buyer arranges for their bank to issue the Letter of Credit (L/C) based on the Proforma Invoice.</li>
              <li><b>Pre-Shipment & Production:</b> As the goods are manufactured, the buyer may arrange for a pre-shipment inspection by a third-party agency, which will issue an Inspection Certificate to verify quality and quantity.</li>
              <li><b>Shipment Booking:</b> The exporter prepares a Shipper's Letter of Instruction (SLI) and provides it to their chosen freight forwarder. This document contains all the necessary information for the forwarder to book transportation and prepare other documents.</li>
              <li><b>Inland Transit:</b> The goods are transported from the factory to the port or airport. This domestic leg of the journey is often covered by an Inland Bill of Lading or a similar transport document.</li>
              <li><b>Export Customs Clearance:</b> Before the goods can be loaded, the exporter or their freight forwarder must file an Export Declaration with the customs authorities of the exporting country. In India, this is the Shipping Bill; in the U.S., this involves filing Electronic Export Information (EEI) in the Automated Export System (AES).</li>
              <li><b>Cargo Loading & International Transit:</b> Once cleared by customs, the goods are loaded onto the vessel or aircraft. The international carrier (or their agent) then issues the primary transport document: a Bill of Lading (B/L) for ocean freight or an Air Waybill (AWB) for air freight. This document serves as the contract of carriage for the international journey.</li>
              <li><b>Document Dispatch:</b> The exporter assembles the full set of original shipping documents. This typically includes the Commercial Invoice, Export Packing List, Certificate of Origin, the original Bill of Lading (or copy of the AWB), and an Insurance Certificate (if applicable). These documents are sent to the importer, often via a bank if payment is under an L/C or Documentary Collection, as the documents are required to secure payment.</li>
              <li><b>Import Customs Clearance:</b> Upon the goods' arrival in the importing country, the importer or their customs broker uses the received set of documents to file an Import Declaration with the local customs authority (e.g., a Bill of Entry in India, a Single Administrative Document (SAD) in the EU). Based on the Commercial Invoice, customs assesses the applicable duties and taxes.</li>
              <li><b>Cargo Release:</b> After duties are paid and customs gives the "all clear," the importer must claim the goods from the carrier. For ocean freight, this requires surrendering at least one original, properly endorsed Bill of Lading to the shipping line. For air freight, the named consignee simply needs to prove their identity.</li>
              <li><b>Final Payment Settlement:</b> The presentation and acceptance of the documents, either by the buyer or their bank, triggers the final financial settlement according to the agreed payment terms.</li>
            </ol>
            <p>The interconnected nature of this process reveals a critical principle: the "domino effect" of documentation errors. The flowchart demonstrates a sequential and dependent process where each document informs the next. For instance, the information on the SLI is used to create the Bill of Lading, and the details on the Proforma Invoice become the basis for the final Commercial Invoice. An error made in an early-stage document—the first domino to fall—will inevitably be copied to subsequent documents. Since every party in the chain (forwarder, carrier, customs, bank) relies on the accuracy of the documents they receive, a single typo, incorrect value, or mismatched quantity can trigger a cascade of logistical, financial, and legal failures down the line. This underscores the paramount importance of a "get it right the first time" approach, with meticulous focus on the foundational documents prepared at the start of the transaction.</p>
            <h4 className="font-semibold mt-5 mb-2 truncate">Table 1.1: Core Document Comparison Matrix</h4>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Document Name</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Primary Purpose</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Issued By</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Key Legal Characteristic</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Is it a Document of Title?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Commercial Invoice</td>
                    <td className="border border-gray-300 px-3 py-2">Financial: Bill of sale, customs valuation, payment request.</td>
                    <td className="border border-gray-300 px-3 py-2">Exporter (Seller)</td>
                    <td className="border border-gray-300 px-3 py-2">A legal declaration of value and a bill for the goods.</td>
                    <td className="border border-gray-300 px-3 py-2">No</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Export Packing List</td>
                    <td className="border border-gray-300 px-3 py-2">Logistical: Physical inventory of shipment contents for handling and inspection.</td>
                    <td className="border border-gray-300 px-3 py-2">Exporter (Seller)</td>
                    <td className="border border-gray-300 px-3 py-2">A detailed list of the physical contents and packaging of a shipment.</td>
                    <td className="border border-gray-300 px-3 py-2">No</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Bill of Lading (Ocean)</td>
                    <td className="border border-gray-300 px-3 py-2">Legal & Logistical: Receipt for goods, contract of carriage, and document of title.</td>
                    <td className="border border-gray-300 px-3 py-2">Carrier (Shipping Line)</td>
                    <td className="border border-gray-300 px-3 py-2">Represents legal ownership of the goods. Can be negotiable.</td>
                    <td className="border border-gray-300 px-3 py-2">Yes</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Air Waybill (Air)</td>
                    <td className="border border-gray-300 px-3 py-2">Logistical: Receipt for goods and contract of carriage.</td>
                    <td className="border border-gray-300 px-3 py-2">Carrier (Airline) / Forwarder</td>
                    <td className="border border-gray-300 px-3 py-2">A non-negotiable transport contract. Does not represent ownership.</td>
                    <td className="border border-gray-300 px-3 py-2">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section id="part-2" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part II: The Core Commercial & Logistical Documents</h2>
          </section>
          <section id="2-1" className="mb-8">
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">Chapter 2: The Commercial Invoice: The Master Document</h3>
            <p>The Commercial Invoice is the single most important document in any export-import transaction. It is far more than a simple bill; it is a multifunctional, legally binding document that serves as the primary statement of the transaction between the seller and the buyer. Its accuracy and completeness are paramount, as it forms the foundation for customs clearance, payment settlement, and logistical execution.</p>
            <h4 className="font-semibold mt-5 mb-2 truncate">2.1 The Triple-Crown Responsibility of the Commercial Invoice</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>For Customs Authorities:</b> The Commercial Invoice is the principal document used by customs agencies worldwide to determine the value of the goods for the assessment of import duties, taxes (like VAT), and other fees. An inaccurate value, a vague product description, or an incorrect country of origin can lead to incorrect duty calculations, shipment delays, customs audits, severe financial penalties, and even accusations of fraud against the importer. It is a formal, legal declaration to government authorities, and its contents are subject to intense scrutiny.</li>
              <li><b>For Payment and Finance:</b> As the official bill of sale, the Commercial Invoice is the primary document used to request and secure payment. Its role is especially critical in transactions involving a Letter of Credit (L/C). Under the rules of L/Cs, banks make payment based on the presentation of documents that strictly conform to the L/C's terms. Any discrepancy between the Commercial Invoice and the L/C—be it a misspelled name, a different shipping port, or a value that is off by a single cent—can give the bank legal grounds to refuse payment, leaving the exporter with unpaid goods potentially stranded in a foreign port.</li>
              <li><b>For Logistics and Handling:</b> The Commercial Invoice is used by freight forwarders, carriers, warehouse operators, and the final buyer to verify that the goods being shipped match the original purchase order. It must be perfectly consistent with the details on the Export Packing List and the Bill of Lading or Air Waybill. Discrepancies between these documents are a major red flag that can trigger physical inspections and logistical delays.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2 truncate">2.2 Anatomy of a Commercial Invoice: A Field-by-Field Masterclass</h4>
            <ol className="list-decimal pl-6 mb-2">
              <li><b>Exporter / Seller / Shipper Details:</b> This section must contain the full legal name, complete address (street, city, country, postal code), and contact information (phone, email) of the party selling and shipping the goods. Including a tax identification number, such as a VAT number in the UK or an EORI number in the EU, is often required.</li>
              <li><b>Consignee / Importer / Sold-To Details:</b> This identifies the party to whom the goods are being shipped and who is ultimately responsible for receiving them. It is crucial to provide their full legal name and complete address. In some cases, the "Sold To" party (the buyer) may be different from the "Ship To" party (the final consignee). If so, both must be clearly identified in separate fields.</li>
              <li><b>Invoice Number and Date:</b> Every invoice must have a unique reference number, assigned by the exporter. A simple sequential system (e.g., 2024-001, 2024-002) is common and essential for accounting and auditing purposes. The date of issue must also be clearly stated.</li>
              <li><b>Reference Numbers:</b> To link the shipment to the underlying commercial agreement, this section should include the buyer's Purchase Order (PO) number, the sales contract number, or, if applicable, the Letter of Credit (L/C) number. This cross-referencing is vital for both payment and auditing.</li>
              <li><b>Incoterms® (Terms of Sale):</b> This is one of the most critical fields. It must state the agreed-upon Incoterms® 2020 rule that governs the transaction. This rule defines the precise point at which the risk and responsibility for the goods transfer from the seller to the buyer. It is not enough to state the rule (e.g., "FOB"); you must also specify the named place (e.g., "FOB, Port of Shanghai"). This determines who pays for which part of the transport journey.</li>
              <li><b>Terms of Payment and Currency:</b> This field specifies how and when the exporter will be paid (e.g., "Payment in Advance via Wire Transfer," "L/C at 60 Days from B/L Date," "Net 30 Days"). The currency of the transaction (e.g., USD, EUR, JPY) must be explicitly stated to avoid any ambiguity.</li>
              <li><b>Reason for Export:</b> The purpose of the shipment must be declared (e.g., "Commercial Sale," "Warranty Replacement," "Gift," "Samples for No Commercial Value"). This declaration affects how customs authorities will treat the shipment. For example, a commercial sale is subject to duties, while a warranty replacement may not be, though it still requires a value for customs purposes.</li>
              <li><b>Goods Description:</b> This is a high-risk area for errors. The description must be in plain language and detailed enough for a customs officer with no prior knowledge of the product to understand what it is. A good description answers three questions: What is it? What is it made of? What is its intended use? Vague descriptions like "spare parts," "electronics," or "textiles" are unacceptable and a primary cause of customs delays. Each distinct type of product must be listed as a separate line item.</li>
              <li><b>Harmonized System (HS) Code:</b> For each line item, the corresponding Harmonized System (HS) code must be listed. This is an internationally standardized system of names and numbers to classify traded products. Customs authorities use the HS code to determine the correct duty and tax rate. At a minimum, the first six digits of the code, which are internationally standardized, are required. Using an incorrect HS code is a major compliance error that can lead to significant penalties.</li>
              <li><b>Country of Origin (COO):</b> This declares the country where the goods were manufactured, produced, or grown. It is not necessarily the country from which the goods are being shipped. For example, if a shirt made in Vietnam is shipped from a warehouse in Singapore, the COO is Vietnam. The COO is critical for determining eligibility for Free Trade Agreements (FTAs) and for the application of any trade remedies, such as anti-dumping duties.</li>
              <li><b>Quantity, Unit of Measure, Unit Price, and Total Value:</b> Each line item must show the quantity of goods, the unit of measure (e.g., pieces, kilograms, liters), the price per unit, and the extended total value for that line (quantity x unit price). The invoice must then show a grand total value for the entire shipment.</li>
              <li><b>Weight and Package Details:</b> The invoice should summarize the physical aspects of the shipment, including the total number and type of packages (e.g., 10 cartons, 2 pallets), the total gross weight (goods + packaging), and the total net weight (goods only). This information must be consistent with the Packing List and the Bill of Lading/Air Waybill.</li>
              <li><b>Miscellaneous Charges:</b> Any additional charges that are part of the total transaction value but are not included in the unit price of the goods must be itemized separately. This can include costs for freight, insurance, special export packing, or inland transport, depending on the agreed Incoterm.</li>
              <li><b>Declaration and Signature:</b> The invoice must conclude with a legally binding declaration statement, such as: "I hereby certify that the information on this invoice is true and correct, and the contents and value of this shipment are as stated." This must be signed and dated by an authorized representative of the exporting company. The signature confirms the authenticity and accuracy of the document.</li>
            </ol>
            <h4 className="font-semibold mt-5 mb-2 truncate">2.3 The Perils of Inaccuracy: Common Errors and Their Consequences</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Valuation Errors (The #1 Pitfall):</b> This is the most scrutinized area by customs and carries the highest risk.
                <ul className="list-disc pl-6">
                  <li><b>Undervaluing:</b> Intentionally declaring a lower value to evade duties is considered customs fraud. This is the most serious offense and can result in penalties up to the full domestic value of the merchandise, seizure and forfeiture of the goods, and even criminal charges including imprisonment for the responsible individuals. Customs agencies use sophisticated databases and cross-referencing to detect undervaluation patterns.</li>
                  <li><b>Omission of Dutiable "Assists":</b> An "assist" is anything the buyer provides to the seller free of charge or at a reduced cost for use in producing the merchandise, such as tools, dies, molds, or engineering work done outside the country of import. The value of these assists is part of the dutiable value of the goods and must be declared. Failing to do so is a common and costly error.</li>
                  <li><b>Incorrect Handling of Discounts and Samples:</b> All goods entering a country must have a declared customs value, even if they are provided free of charge as samples or replacements. This value should be the fair market price of the item. Simply stating "$0" or "No Commercial Value" is incorrect and can lead to delays and penalties. Discounts must also be legitimate and properly documented.</li>
                </ul>
              </li>
              <li><b>Description and Classification Errors:</b>
                <ul className="list-disc pl-6">
                  <li><b>Vague or Misleading Descriptions:</b> Using ambiguous terms like "promotional materials" or "machine parts" forces customs to halt the shipment for inspection to determine what the goods actually are. This guarantees delays and may lead to penalties if the actual goods are found to be different from what was implied.</li>
                  <li><b>Incorrect HS Codes:</b> This directly leads to the miscalculation of duties. If the error results in an underpayment of duty, it can be treated as negligence or gross negligence, leading to penalties of two to four times the loss of revenue. If it results in an overpayment, the importer loses money unnecessarily.</li>
                </ul>
              </li>
              <li><b>Country of Origin Errors:</b> Falsely declaring the country of origin, especially to avoid punitive tariffs like anti-dumping duties (e.g., claiming Chinese goods are from Vietnam), is a fraudulent act with severe consequences, including forfeiture of the goods and massive penalties.</li>
              <li><b>Inconsistencies Across Documents:</b> Any discrepancy between the quantity, weight, value, or description on the Commercial Invoice and the information on the Packing List or Bill of Lading is an immediate red flag for customs. This signals poor control and documentation practices and is one of the most common triggers for a full customs examination of the cargo.</li>
            </ul>
            <p>The legal framework surrounding these errors is unforgiving. In the United States, for example, 19 U.S.C. § 1592 grants Customs and Border Protection (CBP) the authority to issue civil penalties for the entry of goods by means of false statements. Penalties for non-revenue loss violations (e.g., an incorrect description that doesn't affect the duty rate) can still range from 20% to 40% of the goods' value for negligence or gross negligence. In the EU, while penalties vary by member state, they are designed to be "effective, proportionate and dissuasive" and can include substantial fines.</p>
            <p>A crucial point often overlooked by exporters is that while they are the ones who prepare the Commercial Invoice, it is the importer who is legally responsible to their own country's customs authority for the accuracy of the declaration made based on that invoice. The penalties for fraud, gross negligence, or negligence are levied against the Importer of Record. This dynamic creates a significant risk for the importer, who is reliant on the diligence of their foreign supplier. This reality necessitates a proactive approach from importers; they cannot afford to be passive recipients of documentation. They must actively engage with their suppliers, providing clear instructions, compliant templates, and even training on their country's specific customs requirements to protect themselves from the severe legal and financial consequences of a faulty Commercial Invoice.</p>
            <h4 className="font-semibold mt-5 mb-2 truncate">Table 2.1: Incoterms® 2020 Responsibility Chart</h4>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Incoterm Rule</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Seller's Responsibilities</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Buyer's Responsibilities</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Point of Risk Transfer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">EXW (Ex Works)</td>
                    <td className="border border-gray-300 px-3 py-2">Make goods available at own premises.</td>
                    <td className="border border-gray-300 px-3 py-2">All transport, export/import clearance, costs, and risks.</td>
                    <td className="border border-gray-300 px-3 py-2">When goods are placed at buyer's disposal at seller's premises.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">FCA (Free Carrier)</td>
                    <td className="border border-gray-300 px-3 py-2">Deliver goods to the carrier nominated by the buyer at a named place; handles export clearance.</td>
                    <td className="border border-gray-300 px-3 py-2">Main carriage, import clearance, all costs after delivery to carrier.</td>
                    <td className="border border-gray-300 px-3 py-2">When goods are delivered to the buyer's nominated carrier.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">CPT (Carriage Paid To)</td>
                    <td className="border border-gray-300 px-3 py-2">Contract and pay for carriage to the named destination; handles export clearance.</td>
                    <td className="border border-gray-300 px-3 py-2">Assumes risk during main carriage; handles import clearance.</td>
                    <td className="border border-gray-300 px-3 py-2">When goods are delivered to the first carrier contracted by the seller.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">CIP (Carriage and Insurance Paid To)</td>
                    <td className="border border-gray-300 px-3 py-2">Same as CPT, plus must obtain and pay for extensive cargo insurance.</td>
                    <td className="border border-gray-300 px-3 py-2">Assumes risk during main carriage; handles import clearance.</td>
                    <td className="border border-gray-300 px-3 py-2">When goods are delivered to the first carrier contracted by the seller.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">DAP (Delivered at Place)</td>
                    <td className="border border-gray-300 px-3 py-2">Deliver goods to the named destination place, ready for unloading; handles export clearance.</td>
                    <td className="border border-gray-300 px-3 py-2">Unloading at destination; handles import clearance and duties.</td>
                    <td className="border border-gray-300 px-3 py-2">When goods arrive at the named destination, ready for unloading.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">DPU (Delivered at Place Unloaded)</td>
                    <td className="border border-gray-300 px-3 py-2">Deliver goods to the named destination, unload them; handles export clearance.</td>
                    <td className="border border-gray-300 px-3 py-2">Handles import clearance and duties.</td>
                    <td className="border border-gray-300 px-3 py-2">When goods are unloaded at the named destination place.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">DDP (Delivered Duty Paid)</td>
                    <td className="border border-gray-300 px-3 py-2">Maximum obligation: Delivers goods to destination, cleared for import, with all duties paid.</td>
                    <td className="border border-gray-300 px-3 py-2">Unloading at destination.</td>
                    <td className="border border-gray-300 px-3 py-2">When goods arrive at the named destination, cleared for import.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">FAS (Free Alongside Ship)</td>
                    <td className="border border-gray-300 px-3 py-2">Deliver goods alongside the vessel nominated by the buyer at the named port of shipment.</td>
                    <td className="border border-gray-300 px-3 py-2">Loading, main carriage, import clearance, all costs/risks from alongside ship.</td>
                    <td className="border border-gray-300 px-3 py-2">When goods are placed alongside the vessel at the port of shipment.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">FOB (Free On Board)</td>
                    <td className="border border-gray-300 px-3 py-2">Deliver goods on board the vessel nominated by the buyer at the named port of shipment.</td>
                    <td className="border border-gray-300 px-3 py-2">Main carriage, import clearance, all costs/risks from on board the vessel.</td>
                    <td className="border border-gray-300 px-3 py-2">When goods are placed on board the vessel at the port of shipment.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">CFR (Cost and Freight)</td>
                    <td className="border border-gray-300 px-3 py-2">Contract and pay for costs and freight to bring goods to the named port of destination.</td>
                    <td className="border border-gray-300 px-3 py-2">Assumes risk from on board the vessel; handles import clearance.</td>
                    <td className="border border-gray-300 px-3 py-2">When goods are placed on board the vessel at the port of shipment.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">CIF (Cost, Insurance and Freight)</td>
                    <td className="border border-gray-300 px-3 py-2">Same as CFR, plus must obtain and pay for minimum level cargo insurance.</td>
                    <td className="border border-gray-300 px-3 py-2">Assumes risk from on board the vessel; handles import clearance.</td>
                    <td className="border border-gray-300 px-3 py-2">When goods are placed on board the vessel at the port of shipment.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section id="3-1" className="mb-8">
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">Chapter 3: The Export Packing List: The "What's in the Box" Guide</h3>
            <p>While the Commercial Invoice details the financial aspects of a transaction, the Export Packing List focuses on the physical reality of the shipment. It is a comprehensive, itemized inventory of the contents of each package, designed to be a practical guide for every party involved in the physical handling of the cargo.</p>
            <h4 className="font-semibold mt-5 mb-2 truncate">3.1 Purpose and Importance</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>For Freight Forwarders and Carriers:</b> The Packing List is essential for logistical planning. The detailed weights and dimensions allow the freight forwarder to calculate the required cargo space and to prepare the Bill of Lading or Air Waybill accurately.</li>
              <li><b>For Customs Officials:</b> This is arguably its most critical role. A detailed Packing List enables customs authorities to conduct targeted inspections efficiently. If they decide to examine a specific item, the Packing List tells them precisely which box or pallet to open, avoiding the need to unpack and search the entire shipment. This can save the importer significant time and money in inspection fees and demurrage charges.</li>
              <li><b>For the Consignee (Importer):</b> The Packing List is the primary tool for the receiving party to verify that the goods they have received match what was ordered and shipped. It allows them to check for any shortages or discrepancies upon arrival.</li>
              <li><b>For Insurance Claims:</b> In the unfortunate event of loss or damage during transit, a detailed Packing List is a required document for filing an insurance claim. It provides clear evidence of the shipment's contents and how they were packaged.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2 truncate">3.2 Anatomy of an Export Packing List</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Header Information:</b> Must include full shipper and consignee details (name, address, contact), the date of shipment, and clear references to the corresponding Commercial Invoice number and transport document number (Bill of Lading or Air Waybill number).</li>
              <li><b>Package-Level Details:</b> For each package in the shipment, the list must provide:
                <ul className="list-disc pl-6">
                  <li>A unique package number or mark (e.g., "Box 1 of 10," "Pallet 2 of 5").</li>
                  <li>The type of packaging used (e.g., cardboard box, wooden crate, drum, pallet).</li>
                  <li>The precise dimensions of the package (Length x Width x Height).</li>
                  <li>The Net Weight (weight of the contents only) and Gross Weight (weight of contents plus packaging).</li>
                  <li>Any shipping marks and numbers that appear on the exterior of the package for identification.</li>
                </ul>
              </li>
              <li><b>Item-Level Details:</b> Within the description of each package, there must be a detailed list of the items contained inside that specific package, including the quantity of each item.</li>
              <li><b>Shipment Totals:</b> The document must conclude with a summary for the entire shipment, including:
                <ul className="list-disc pl-6">
                  <li>Total number of packages.</li>
                  <li>Total Gross Weight.</li>
                  <li>Total Net Weight.</li>
                  <li>Total volume (cubic measurement) of the entire shipment.</li>
                </ul>
              </li>
              <li><b>Authentication:</b> The Packing List should be signed and dated by an authorized representative of the exporter.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2 truncate">3.3 The Doctrine of Absolute Consistency</h4>
            <p>The single most critical best practice for preparing a Packing List is ensuring it is in perfect alignment with the Commercial Invoice and the Bill of Lading/Air Waybill. Any discrepancy—in quantities, weights, descriptions, or package counts—is a major red flag for customs authorities. This inconsistency immediately increases the perceived risk of the shipment, making it a prime candidate for a time-consuming and expensive physical inspection.</p>
            <p>For example, if the Commercial Invoice declares 1,000 units of "Product A" and the Packing List shows a total of 1,000 units, but the Bill of Lading declares a gross weight that is significantly different from the total gross weight on the Packing List, customs may suspect that the shipment contains undeclared items or that the documentation is fraudulent. This will likely trigger a hold and a full examination of the cargo.</p>
            <p>The Packing List is not merely an internal document; it is a strategic tool for mitigating customs intervention. Customs authorities worldwide operate on a system of risk assessment, as they cannot physically inspect every shipment that crosses their borders. They use the data and documents provided by the trader to triage risk and decide which shipments warrant closer scrutiny. A clear, professional, highly detailed, and—above all—consistent set of documents signals a diligent and organized trader, thereby lowering the shipment's risk profile. Conversely, a sloppy, vague, or inconsistent Packing List suggests a lack of control and raises suspicion.</p>
            <p>Furthermore, a well-structured Packing List can significantly reduce the impact of an inspection if one is selected. By clearly indicating which items are in which specific numbered package, the exporter enables customs to perform a targeted examination. If an officer wants to verify "Product X," a good Packing List will direct them to "Box 7 of 10." Without this level of detail, they may be forced to de-van the entire container to find the item, a process that can take days and result in substantial labor, demurrage, and port storage charges for the importer. Therefore, investing the time to create a flawless Packing List is a direct and worthwhile investment in reducing the probability of costly logistical delays.</p>
          </section>
          <section id="4-1" className="mb-8">
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">Chapter 4: The Certificate of Origin (CoO): Proving Provenance</h3>
            <p>The Certificate of Origin (CoO) is a formal document that attests to the country where the goods in a shipment were produced, manufactured, or processed. This certification of provenance is critically important because, in the world of international trade, a product's "nationality" determines how it is treated by the importing country's customs authority.</p>
            <h4 className="font-semibold mt-5 mb-2 truncate">4.1 The Strategic Importance of Origin</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Tariff and Duty Determination:</b> The rate of import duty applied to a product often depends on where it comes from. Many countries apply different tariff rates to goods from different countries.</li>
              <li><b>Trade Agreement Eligibility:</b> It is the key document used to claim preferential tariff treatment (i.e., reduced or zero duties) under Free Trade Agreements (FTAs).</li>
              <li><b>Trade Remedy Application:</b> It is used to enforce trade remedies such as anti-dumping duties, which are extra tariffs imposed on goods sold at less than fair market value, or countervailing duties, which are imposed to offset foreign government subsidies. These duties are country-specific.</li>
              <li><b>Import Quotas and Sanctions:</b> It helps enforce quantitative restrictions (quotas) on goods from certain countries or complete prohibitions (embargoes/sanctions).</li>
              <li><b>Letter of Credit Compliance:</b> A CoO is often a required document under the terms of a Letter of Credit.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2 truncate">4.2 Non-Preferential vs. Preferential CoOs: A Critical Distinction</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Non-Preferential Certificate of Origin (NP-CoO):</b> This is the standard or "ordinary" CoO.
                <ul className="list-disc pl-6">
                  <li><b>Purpose:</b> It simply certifies the country of origin of the goods for general trade purposes without conferring any special tariff benefits. It is used primarily for statistical purposes or to comply with sanctions or quota requirements.</li>
                  <li><b>Issuance:</b> NP-CoOs are typically issued by a country's Chamber of Commerce upon application by the exporter, who must provide supporting evidence like a commercial invoice that states the country of manufacture.</li>
                </ul>
              </li>
              <li><b>Preferential Certificate of Origin (P-CoO):</b> This is a specialized and high-stakes document.
                <ul className="list-disc pl-6">
                  <li><b>Purpose:</b> It is used specifically to claim preferential treatment—reduced or zero import duties—for goods being traded between countries that have a Free Trade Agreement (FTA) in place.</li>
                  <li><b>Requirements:</b> To qualify for a P-CoO, the goods must meet the specific and often complex "rules of origin" stipulated in the text of that particular FTA. These rules define the minimum level of local production or transformation required for a product to be considered "originating."</li>
                  <li><b>Legal Risk:</b> Making a false declaration on a P-CoO to wrongly claim duty benefits is a serious customs offense, often treated as fraud or gross negligence, and can lead to severe penalties, including back-payment of duties with interest and substantial fines.</li>
                </ul>
              </li>
            </ul>
            <p>The ability to leverage FTAs through proper use of Preferential CoOs can be a powerful competitive weapon. An exporter who can correctly document their product's eligibility for an FTA can offer a lower landed cost to their buyer compared to a competitor from a country without such an agreement. This transforms the documentation process from a mere compliance task into a core component of a company's sales and marketing strategy. Businesses that actively research FTAs in their target markets and ensure their products meet the necessary rules of origin can create a significant and sustainable price advantage.</p>
            <h4 className="font-semibold mt-5 mb-2 truncate">4.3 A Practical Guide to Major Preferential Origin Schemes</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>The USMCA (United States-Mexico-Canada Agreement) Certification of Origin:</b>
                <ul className="list-decimal pl-6">
                  <li>The USMCA, which replaced NAFTA, streamlined the origin certification process. It does not require a specific, government-prescribed form. Instead, the claim for preferential treatment is based on a "Certification of Origin" that contains a set of nine minimum data elements.</li>
                  <li>This certification can be placed on the commercial invoice or any other document accompanying the shipment, or it can be a standalone document.</li>
                  <li>A key feature of the USMCA is that the certification can be completed by the exporter, the producer, or the importer of the goods.</li>
                  <li>Step-by-Step Data Elements:
                    <ol className="list-decimal pl-6">
                      <li>Certifier: Identify whether the certifier is the importer, exporter, or producer.</li>
                      <li>Certifier Details: Full name, address, and contact information of the certifying party.</li>
                      <li>Exporter Details: Full details of the exporter (if different from the certifier).</li>
                      <li>Producer Details: Full details of the producer (if different from the certifier). This can be marked "Available upon request" to protect confidentiality.</li>
                      <li>Importer Details: Full details of the importer (if known).</li>
                      <li>Description of Goods & HS Code: A description sufficient to identify the goods and their 6-digit HS Tariff Classification.</li>
                      <li>Origin Criterion: A critical field where the certifier indicates the specific rule (A, B, C, or D) under which the good qualifies as originating.</li>
                      <li>Blanket Period: If the certification is to cover multiple shipments of identical goods, a period of up to 12 months can be specified.</li>
                      <li>Authorized Signature & Date: The certification must be signed and dated by the certifier, accompanied by a declaration statement.</li>
                    </ol>
                  </li>
                </ul>
              </li>
              <li><b>The EUR.1 Movement Certificate (EU Trade Agreements):</b>
                <ul className="list-decimal pl-6">
                  <li>The EUR.1 is a formal certificate used to claim preferential duty rates for trade between the EU (and the UK post-Brexit, under the EU-UK Trade and Cooperation Agreement) and numerous partner countries.</li>
                  <li>Unlike the USMCA, the EUR.1 is a standardized, official form that must be obtained from and certified by a designated authority, typically the Chamber of Commerce or the customs authority in the exporting country.</li>
                  <li>Application and Issuance Process:
                    <ol className="list-decimal pl-6">
                      <li>The exporter obtains a blank EUR.1 form.</li>
                      <li>The exporter completes the form with details of the exporter, consignee, country of origin, destination country, transport details, and a detailed description of the goods.</li>
                      <li>The exporter must provide the issuing authority with proof that the goods meet the preferential origin rules of the specific trade agreement. This proof often takes the form of a supplier's declaration.</li>
                      <li>The authority verifies the application and evidence, then stamps and signs the EUR.1, authenticating it.</li>
                      <li>The original EUR.1 must accompany the shipment to be presented to customs in the importing country.</li>
                    </ol>
                  </li>
                  <li>Special Cases: The form has provisions for special circumstances. If the certificate is applied for after the goods have already shipped, it must be marked "Issued Retrospectively." If the original is lost, a "Duplicate" can be issued, but it requires proof of the original issuance.</li>
                </ul>
              </li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2 truncate">4.4 Obtaining a General Certificate of Origin</h4>
            <p>For both non-preferential and preferential CoOs, the general process involves the exporter submitting an application to the designated issuing body. This application must be accompanied by supporting evidence of the goods' origin, most commonly the commercial invoice which should clearly state the country of manufacture, or a declaration from the manufacturer. The issuing body reviews the documents and, if satisfied, stamps and signs the certificate, thereby validating it for use in international trade.</p>
          </section>
          <section id="part-4" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part IV: Specialized & Ancillary Documents</h2>
            <p>Beyond the core commercial and transport documents, a range of specialized paperwork is often required to facilitate a shipment, communicate with partners, manage risk, and secure payment. This chapter covers the most important of these ancillary documents.</p>
          </section>
          <section id="7-1" className="mb-8">
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">Chapter 7: Facilitating the Shipment: SLI, Inspection & Insurance</h3>
            <h4 className="font-semibold mt-5 mb-2 truncate">7.1 The Shipper's Letter of Instruction (SLI): Your Forwarder's Blueprint</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Purpose and Importance:</b> The SLI is designed to prevent misunderstandings and errors that can arise from verbal or informal email communications. It serves as the forwarder's "mission briefing" and is the source document they use to prepare the Bill of Lading or Air Waybill, book the freight, and file the export declaration. A properly completed SLI ensures that all parties are aligned and helps to assign responsibility if an error occurs.</li>
              <li><b>Legal Standing:</b> In many jurisdictions, particularly the United States, a signed SLI can also serve as a limited Power of Attorney. This authorizes the freight forwarder to act as the exporter's agent for specific tasks, most notably for filing the Electronic Export Information (EEI) with the Automated Export System (AES) for customs and export control purposes.</li>
              <li><b>Key Information:</b> A comprehensive SLI contains a wealth of information, effectively acting as a cover sheet for the entire document package. Key fields include:
                <ul className="list-disc pl-6">
                  <li>Full details of the shipper, ultimate consignee, and notify party.</li>
                  <li>The freight forwarder's information.</li>
                  <li>Export control information, such as the exporter's EIN and the product's Schedule B / HTS number.</li>
                  <li>A detailed description of the cargo, including piece count, weights, and dimensions.</li>
                  <li>Instructions on freight payment (e.g., prepaid by shipper or collect from consignee).</li>
                  <li>The agreed-upon Incoterm.</li>
                  <li>Instructions on whether to arrange cargo insurance.</li>
                  <li>Any special handling instructions, especially for hazardous materials.</li>
                </ul>
              </li>
            </ul>
            <p>The use of a formal SLI for every shipment is a critical best practice. It creates a "single source of truth" for the logistical arrangements. If the freight forwarder makes an error that deviates from the SLI, the document serves as the exporter's proof of the correct instructions. Conversely, if the SLI itself contains an error, the responsibility lies with the exporter. This formalizes the relationship and is a cornerstone of professional export management.</p>
            <h4 className="font-semibold mt-5 mb-2 truncate">7.2 The Inspection Certificate: Verifying Quality and Compliance</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Definition:</b> An Inspection Certificate is a trade document issued by an independent third-party inspection agency (such as SGS or Bureau Veritas) or a government authority. It certifies that the goods have been examined and have been found to conform to the specifications outlined in the sales contract or the regulations of the importing country.</li>
              <li><b>When is it Required?</b>
                <ol className="list-decimal pl-6">
                  <li><b>At the Buyer's Request:</b> An importer, especially when dealing with a new supplier or high-value goods, will often mandate a Pre-Shipment Inspection (PSI). This is a crucial risk management tool for the buyer, ensuring that the quality, quantity, and specifications of the goods are verified before they are shipped and paid for. This protects the buyer from receiving substandard, incorrect, or damaged products.</li>
                  <li><b>By the Importing Country's Government:</b> Many countries, particularly in Africa, Asia, and Latin America, have mandatory PSI programs for certain categories of goods. This is done to verify valuation (to prevent duty evasion), ensure compliance with national safety and quality standards, and prevent the import of substandard products. Goods subject to these programs cannot be cleared through customs without a valid inspection certificate.</li>
                  <li><b>As a Condition of a Letter of Credit:</b> To provide an additional layer of security, a Letter of Credit may stipulate the presentation of a clean inspection certificate as a prerequisite for payment.</li>
                </ol>
              </li>
              <li><b>Types of Inspection Certificates:</b> The main distinction is between an Official Inspection Certificate, which is mandated by a government authority for customs clearance, and a Commercial Inspection Certificate, which is requested by the buyer as part of the commercial contract. The certificate will detail the findings of the inspection, confirming aspects like product quality, quantity, and packing integrity.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2 truncate">7.3 The Cargo Insurance Certificate: Managing Transit Risk</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Purpose and Function:</b> It is important to note that the certificate is not the insurance policy itself; rather, it is evidence of an underlying policy (often an "open policy" that covers all of an exporter's shipments). The certificate summarizes the key details of the coverage for a single consignment.</li>
              <li><b>Key Information:</b> A typical insurance certificate will state the name of the insured party, the details of the vessel or flight, a description of the insured goods, the total insured value, the terms of coverage (e.g., "Institute Cargo Clauses A - All Risks"), and the contact information for filing a claim.</li>
              <li><b>When is it Required?</b>
                <ul className="list-disc pl-6">
                  <li><b>Under CIF and CIP Incoterms:</b> When the seller is responsible for arranging and paying for insurance under the terms of sale (Cost, Insurance and Freight; Carriage and Insurance Paid To), they must provide the buyer with an insurance certificate as proof of this coverage.</li>
                  <li><b>For Letter of Credit Transactions:</b> L/Cs almost always require the presentation of an insurance certificate to protect the financial interests of the buyer and the banks involved in the transaction.</li>
                  <li><b>As a Prudent Risk Management Practice:</b> Even when not contractually required, insuring international shipments is a fundamental aspect of sound financial risk management for either the buyer or the seller, depending on where risk transfers under the chosen Incoterm.</li>
                </ul>
              </li>
            </ul>
          </section>
          <section id="8-1" className="mb-8">
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">Chapter 8: Facilitating Payment: Letters of Credit & Bills of Exchange</h3>
            <h4 className="font-semibold mt-5 mb-2 truncate">8.1 The Letter of Credit (L/C): The Bank's Conditional Guarantee</h4>
            <ul className="list-disc pl-6 mb-2">
              <li>A Letter of Credit (also known as a Documentary Credit) is one of the most secure payment methods available for international trade, offering protection to both the seller and the buyer. It is a formal, legally binding undertaking issued by a bank (the "issuing bank") on behalf of the buyer, promising to pay the seller a specified sum of money, provided the seller presents a set of documents that strictly comply with the terms and conditions stipulated in the L/C.</li>
              <li><b>The Principle of Strict Compliance:</b> This is the absolute, unyielding rule governing L/Cs. Banks deal in documents only, not in the physical goods. Their sole responsibility is to examine the presented documents (Commercial Invoice, Bill of Lading, Certificate of Origin, etc.) and determine if they conform perfectly to the requirements of the L/C. If the documents are compliant, the bank is obligated to pay. If there is even a minor discrepancy—a typo, a missing signature, a date that is off by one day—the bank has the right to refuse payment.</li>
            </ul>
            <p>The Letter of Credit fundamentally transforms the role of export documentation. The documents cease to be merely logistical or customs-related paperwork; they become the financial triggers that release payment. When a transaction is governed by an L/C, the entire documentation process must be meticulously reverse-engineered from the L/C's requirements. The Letter of Credit itself becomes the ultimate blueprint, dictating the precise content, wording, and format of every other document in the set. Success in an L/C transaction is a testament to an exporter's mastery of documentation.</p>
            <h4 className="font-semibold mt-5 mb-2 truncate">8.2 The Bill of Exchange (BoE): The Formal Order to Pay</h4>
            <ul className="list-disc pl-6 mb-2">
              <li>A Bill of Exchange (also known as a Draft) is a written, unconditional order from one party (the seller, or "drawer") to another (the buyer, or "drawee"), requiring the drawee to pay a specified sum of money on demand or at a fixed future date to the drawer or to a third party ("payee").</li>
              <li><b>Role in International Trade:</b> The BoE is a more formal and legally stronger instrument than a commercial invoice. It is a key component of a payment method known as Documentary Collection. In this process, the exporter's bank sends the shipping documents (including the critical Bill of Lading) to the importer's bank, accompanied by a Bill of Exchange.
                <ul className="list-disc pl-6">
                  <li><b>Sight Draft (Documents Against Payment - D/P):</b> If the BoE is a "sight draft," the importer's bank will only release the shipping documents to the importer after the importer makes immediate payment.</li>
                  <li><b>Time Draft (Documents Against Acceptance - D/A):</b> If the BoE is a "time draft" (e.g., "pay 60 days after sight"), the bank will release the documents after the importer formally "accepts" the draft, which creates a legally binding obligation for them to pay on the future due date.</li>
                </ul>
              </li>
            </ul>
            <p>The Bill of Exchange provides the exporter with a legally enforceable debt instrument, offering more security than shipping on open account terms, but less security than a confirmed Letter of Credit.</p>
          </section>
          <section id="part-5" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part V: Regional Compliance Deep Dives</h2>
            <p>While the core principles of trade documentation are global, their practical application varies significantly by country and economic bloc. This section provides a focused guide to the specific compliance requirements for exporting from India and importing into the world's major markets: the European Union, the United States, and China.</p>
          </section>
          <section id="9-1" className="mb-8">
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">Chapter 9: Exporting from India: A Documentation Masterclass</h3>
            <p>Navigating the documentation landscape for exporting from India requires an understanding of the roles of key regulatory bodies—the Directorate General of Foreign Trade (DGFT), the Reserve Bank of India (RBI), and Indian Customs—and the specific documents they mandate.</p>
            <h4 className="font-semibold mt-5 mb-2 truncate">9.1 Foundational Registrations</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Importer-Exporter Code (IEC):</b> Issued by the DGFT, the IEC is a mandatory 10-digit code that serves as the primary business identification number for any company or individual engaging in import or export activities. No export or import can be conducted without a valid IEC.</li>
              <li><b>Registration-cum-Membership Certificate (RCMC):</b>
                <ul className="list-disc pl-6">
                  <li><b>Purpose:</b> The RCMC is a certificate that validates an exporter's registration with the appropriate Export Promotion Council (EPC) or Commodity Board that oversees their specific product line (e.g., the Apparel Export Promotion Council for garments, the Spices Board for spices). If a product is not covered by a specific council, the RCMC is obtained from the Federation of Indian Exporters Organisation (FIEO).</li>
                  <li><b>Benefits:</b> While not mandatory for all exports, the RCMC is essential for availing various benefits and schemes under India's Foreign Trade Policy, such as the Export Promotion Capital Goods (EPCG) scheme. It also provides access to market intelligence, buyer-seller meets, and government liaison services offered by the councils.</li>
                  <li><b>Application:</b> The application for an RCMC is now a streamlined online process through the DGFT's common e-RCMC portal. Applicants must have a valid IEC, PAN, and GST registration, and submit the application along with required documents to the relevant council.</li>
                </ul>
              </li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2 truncate">9.2 GST Compliance for Exports</h4>
            <ul className="list-decimal pl-6 mb-2">
              <li><b>Export with Payment of IGST:</b> The exporter prepares a GST-compliant export invoice, charges the applicable Integrated GST (IGST) on the transaction, and pays this tax to the government. After the goods have been successfully exported (as verified by the customs-filed Shipping Bill), the exporter can claim a refund of the IGST paid. This route is administratively simpler but can temporarily block the exporter's working capital.</li>
              <li><b>Export under Bond or Letter of Undertaking (LUT):</b> This is the preferred route for most regular exporters. An eligible exporter can file a Letter of Undertaking (LUT) with the GST authorities via the online GST portal. Once the LUT is accepted, the exporter can export goods or services for the entire financial year without paying IGST on their export invoices. They can then claim a refund of the accumulated Input Tax Credit (ITC) on their business inputs. This method significantly improves cash flow as no funds are locked up in tax payments. The LUT is a formal declaration promising to meet all export requirements under GST law.</li>
            </ul>
            <p>An Export Invoice under GST has specific mandatory fields beyond a typical invoice, including the exporter's GSTIN, the buyer's details, a clear endorsement stating the type of export (e.g., "SUPPLY MEANT FOR EXPORT ON PAYMENT OF INTEGRATED TAX" or "SUPPLY MEANT FOR EXPORT UNDER BOND OR LETTER OF UNDERTAKING WITHOUT PAYMENT OF INTEGRATED TAX"), and the Shipping Bill number and date.</p>
            <h4 className="font-semibold mt-5 mb-2 truncate">9.3 Foreign Exchange Compliance (FEMA)</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Purpose:</b> This is a mandatory declaration made by the exporter, typically as part of the Shipping Bill. It serves as a legal undertaking to the Reserve Bank of India (RBI) that the full value of the exported goods will be received in foreign currency and repatriated to India through an authorized dealer (bank) within a stipulated time frame, which is generally nine months from the date of export.</li>
              <li><b>Importance:</b> This declaration is a critical tool for the RBI to monitor the country's foreign exchange inflows, manage its forex reserves, and prevent illegal activities like money laundering.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2 truncate">9.4 Customs Clearance: The Shipping Bill</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Filing via ICEGATE:</b> The filing of the Shipping Bill is done electronically through the Indian Customs Electronic Gateway (ICEGATE), the national portal for all customs-related filings. While exporters can self-file, most utilize the services of a licensed Customs House Agent (CHA) to navigate the complexities of the filing process.</li>
              <li><b>Content:</b> The Shipping Bill contains comprehensive details about the shipment, including exporter/importer details, cargo description, HS codes, value, weight, GST information, and the FEMA declaration. Once filed and assessed by customs, an "Out of Charge" order is given, and the goods are cleared for loading. The Shipping Bill number is a critical reference that links the customs transaction with the GST and banking processes.</li>
            </ul>
          </section>
          <section id="10-1" className="mb-8">
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">Chapter 10: Navigating Major Economic Blocs: EU, US, & China</h3>
            <h4 className="font-semibold mt-5 mb-2 truncate">10.1 Importing into the European Union (EU)</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>EORI Number (Economic Operator Registration and Identification):</b> This is a unique identification number mandatory for any business that lodges a customs declaration to import goods into or export goods from the EU. An exporter based outside the EU will need to obtain an EORI number if they are acting as the declarant (for example, under DDP Incoterms). The number is valid throughout all EU member states.</li>
              <li><b>The EU Customs Declaration Process:</b>
                <ol className="list-decimal pl-6">
                  <li>Pre-Arrival Declaration: An electronic Entry Summary Declaration (ENS) must be lodged before the goods arrive.</li>
                  <li>Customs Declaration: Upon arrival, a formal customs declaration must be submitted.</li>
                  <li>Assessment and Clearance: Customs authorities assess the declaration, verify documents, and calculate duties and VAT.</li>
                  <li>Payment and Release: Once duties are paid and all checks are complete, the goods are released for free circulation within the EU.</li>
                </ol>
              </li>
              <li><b>Key EU Documents:</b>
                <ul className="list-disc pl-6">
                  <li>Single Administrative Document (SAD): This is the standard, harmonized form used for import, export, and transit declarations across the EU and several neighboring countries. While mostly electronic now, it standardizes the data required for customs clearance.</li>
                  <li>T1 and T2 Transit Documents: These are crucial for moving goods through the EU customs territory under customs control without paying duties at each internal border. The T1 document is used for non-EU goods (e.g., goods arriving in Rotterdam and moving by road to Poland before being cleared). The T2 document is used for EU goods that are transiting through a non-EU country (e.g., goods moving from Italy to Ireland via Switzerland).</li>
                </ul>
              </li>
              <li><b>Penalties:</b> The EU framework allows member states to impose their own penalties for customs contraventions, which must be "effective, proportionate, and dissuasive." These can range from warning letters to significant financial penalties, especially for serious errors involving large amounts of duty or the removal of goods from customs control.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2 truncate">10.2 Importing into the United States (US)</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Importer Security Filing (ISF 10+2):</b> This is a critical, mandatory pre-shipment requirement for all ocean cargo destined for the U.S. It is a security filing, separate from the customs entry declaration.
                <ul className="list-disc pl-6">
                  <li><b>The "10":</b> The importer or their agent is responsible for electronically filing 10 data elements with U.S. Customs and Border Protection (CBP) at least 24 hours before the cargo is loaded onto the vessel at the foreign port. These elements include seller, buyer, manufacturer, ship-to party, country of origin, and HS code, among others.</li>
                  <li><b>The "+2":</b> The ocean carrier is responsible for filing two additional data elements—the vessel stow plan and container status messages—with CBP.</li>
                </ul>
              </li>
              <li><b>Purpose & Penalties:</b> The ISF is a vital security tool that allows CBP to analyze risk and target high-risk shipments before they even set sail for the U.S. Failure to file a timely, accurate, and complete ISF can result in a liquidated damages penalty of $5,000 per violation, plus cargo holds and inspections.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2 truncate">10.3 Importing into China</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>China Customs Declaration Procedure:</b> The import declaration is typically handled by a licensed agent or customs broker in China on behalf of the importer. The process involves submitting a declaration form along with a full set of documents, including the B/L, invoice, packing list, and any required licenses or certificates.</li>
              <li><b>China Compulsory Certification (CCC) Mark:</b> This is a mandatory safety and quality mark for a wide range of products before they can be imported, sold, or used in China. Product categories requiring the CCC mark include many electronics, automotive parts, and household appliances. To obtain the mark, products must undergo testing in accredited laboratories in China, and the manufacturing facility must pass a factory audit conducted by Chinese officials. The CCC mark must be physically present on the product.</li>
              <li><b>GACC Registration and the "Single Window":</b> China has implemented a "Single Window" system to streamline trade-related filings. A key part of this is the mandatory registration with GACC for all overseas manufacturers of food and beverage products intended for export to China. The registration must be completed through the CIFER (China Import Food Enterprise Registration) system, which is part of the Single Window platform. The GACC registration number must be displayed on the product's packaging.</li>
              <li><b>Penalties:</b> China's customs law provides for strict penalties for non-compliance, including fines, confiscation of goods, and, in cases of smuggling or intentional fraud, potential criminal liability.</li>
            </ul>
          </section>
          <section id="part-6" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part VI: The Future of Trade Documentation</h2>
            <p>The world of international trade documentation, long dominated by paper, couriers, and manual processes, is on the cusp of a profound digital transformation. Driven by the need for greater efficiency, enhanced security, and improved sustainability, the industry is moving from paper to pixels. This chapter explores the key technologies and trends shaping the future of trade documentation.</p>
          </section>
          <section id="11-1" className="mb-8">
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">11.1 The Inevitable Shift from Paper to Pixels</h3>
            <p>The traditional, paper-based documentation process is notoriously slow, costly, and prone to error. Original documents like Bills of Lading must be physically couriered around the world, a process that can take days or weeks and costs the global trade industry billions of dollars annually. This reliance on paper creates significant inefficiencies, increases the risk of fraud, and has a substantial environmental impact. The digitization of these processes promises to streamline transactions, reduce costs, and create a more secure and transparent trading environment.</p>
          </section>
          <section id="11-2" className="mb-8">
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">11.2 The Electronic Bill of Lading (eB/L)</h3>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Benefits:</b> The advantages of adopting eB/Ls are immense.
                <ul className="list-disc pl-6">
                  <li><b>Speed:</b> An eB/L can be transferred from seller to buyer or bank to bank in minutes, rather than the days or weeks required for a courier to deliver a paper document. This dramatically accelerates the entire transaction lifecycle.</li>
                  <li><b>Cost Reduction:</b> eB/Ls eliminate the costs associated with printing, handling, and couriering paper documents, which can save the industry billions of dollars annually.</li>
                  <li><b>Enhanced Security:</b> Using technologies like public key infrastructure and blockchain, eB/Ls are significantly more secure than paper documents. They are resistant to forgery, tampering, and theft, greatly reducing the risk of fraud.</li>
                  <li><b>Transparency and Sustainability:</b> eB/Ls provide a clear, real-time audit trail of all actions and transfers, improving transparency. They also eliminate the need for paper, reducing the environmental footprint of global trade.</li>
                </ul>
              </li>
              <li><b>Challenges to Adoption:</b> Despite these clear benefits, the widespread adoption of eB/Ls has been slow. The primary hurdles are not technological but rather legal and commercial.
                <ul className="list-disc pl-6">
                  <li><b>Legal Recognition:</b> The biggest challenge is the fragmented legal landscape. For an eB/L to function as a document of title, the national laws of all relevant jurisdictions (exporter's, importer's, and carrier's countries) must recognize an electronic record as legally equivalent to a paper B/L. While progress is being made, this legal recognition is not yet universal.</li>
                  <li><b>Interoperability:</b> Several secure platforms exist for issuing and managing eB/Ls (e.g., Bolero, essDOCS, CargoX, WaveBL). However, these platforms have historically been closed ecosystems. For an eB/L to be truly effective, a document issued on one platform must be seamlessly transferable to a party using a different platform. A lack of interoperability has been a major barrier to adoption.</li>
                  <li><b>Resistance to Change:</b> The shipping industry is deeply rooted in tradition, and many stakeholders are accustomed to paper-based processes. Overcoming this inertia requires education, training, and a clear demonstration of the benefits.</li>
                </ul>
              </li>
              <li><b>Real-World Adoption:</b> Progress is accelerating. Major carriers like HMM have successfully conducted interoperable eB/L transactions, and industry bodies like the Digital Container Shipping Association (DCSA) are actively working to establish universal standards to overcome the interoperability challenge.</li>
            </ul>
          </section>
          <section id="11-3" className="mb-8">
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">11.3 Digital Certificates of Origin (e-CoO)</h3>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Process and Benefits:</b> An electronic Certificate of Origin (e-CoO) allows an exporter to apply for, and a Chamber of Commerce to issue, a certified CoO through a secure online portal. This eliminates the need for physical paperwork, courier fees, and manual processing.
                <ul className="list-disc pl-6">
                  <li><b>Faster Issuance:</b> e-COOs can be issued in hours instead of days.</li>
                  <li><b>Lower Costs:</b> Eliminates courier and administrative fees.</li>
                  <li><b>Enhanced Security:</b> Digital e-COOs are protected by security features such as optical watermarking, QR codes, and online verification portals, making them much harder to forge than paper documents. Customs officials or banks can instantly verify the authenticity of an e-CoO through the issuing Chamber's website.</li>
                </ul>
              </li>
            </ul>
          </section>
          <section id="11-4" className="mb-8">
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">11.4 Blockchain: The Ultimate Trust Machine?</h3>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Applications in Trade Documentation:</b>
                <ul className="list-disc pl-6">
                  <li><b>Immutable Records:</b> Once a document like an eB/L or a Commercial Invoice is registered on a blockchain, it cannot be altered or deleted without the consensus of the network participants. This creates a single, verifiable version of the truth that all parties can trust.</li>
                  <li><b>Smart Contracts:</b> Blockchain enables the use of "smart contracts"—self-executing programs that automatically trigger actions when certain conditions are met. For example, a smart contract could be programmed to automatically release payment from the buyer to the seller the moment the blockchain registers that the goods have been delivered and accepted at the destination port. This could automate and secure the payment process, potentially reducing the need for traditional instruments like Letters of Credit.</li>
                  <li><b>End-to-End Visibility:</b> By creating a shared ledger, blockchain can provide all authorized parties (shipper, carrier, customs, buyer, bank) with real-time, end-to-end visibility of the shipment's status and the associated documentation, dramatically increasing transparency and reducing disputes.</li>
                </ul>
              </li>
            </ul>
            <p>The future of trade documentation is not about a single technology but about creating an interconnected ecosystem. The primary challenge is not inventing the technology itself, but rather building the global legal and technical standards that will allow these digital systems to be trusted and to interoperate seamlessly across borders. The successful adoption of eB/Ls, for instance, hinges on two parallel efforts: first, the legal effort, spearheaded by initiatives like the UN's Model Law on Electronic Transferable Records (MLETR), which provides countries with a template to update their national laws to recognize electronic documents; and second, the technical effort, driven by industry groups like the DCSA, to create standards that allow different eB/L platforms to communicate with each other. The evolution of trade documentation will therefore be driven as much by lawyers, diplomats, and standards bodies as it will be by software engineers.</p>
          </section>
          <section id="part-7" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part VII: Appendices</h2>
          </section>
          <section id="appendix-a" className="mb-8">
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">Appendix A: Master Document Checklist & Glossary</h3>
            <h4 className="font-semibold mt-5 mb-2 truncate">Master Export Document Checklist</h4>
            <ul className="list-none pl-0 mb-4">
              <li className="mb-1"><input type="checkbox" disabled /> Commercial Invoice: The primary bill of sale and customs valuation document.</li>
              <li className="mb-1"><input type="checkbox" disabled /> Export Packing List: Detailed inventory of the shipment's physical contents.</li>
              <li className="mb-1"><input type="checkbox" disabled /> Bill of Lading (B/L) or Air Waybill (AWB): The contract of carriage from the international carrier.</li>
              <li className="mb-1"><input type="checkbox" disabled /> Proforma Invoice: Used for the initial quotation and to arrange financing.</li>
              <li className="mb-1"><input type="checkbox" disabled /> Certificate of Origin (CoO): Required by many countries to prove where the goods were manufactured.</li>
              <li className="ml-6 mb-1"><input type="checkbox" disabled /> Non-Preferential CoO (for general purposes)</li>
              <li className="ml-6 mb-1"><input type="checkbox" disabled /> Preferential CoO (e.g., USMCA, EUR.1) to claim FTA benefits.</li>
              <li className="mb-1"><input type="checkbox" disabled /> Shipper's Letter of Instruction (SLI): Instructions to the freight forwarder.</li>
              <li className="mb-1"><input type="checkbox" disabled /> Cargo Insurance Certificate: Proof of insurance, especially under CIF/CIP Incoterms or L/C.</li>
              <li className="mb-1"><input type="checkbox" disabled /> Export Declaration: (e.g., Shipping Bill in India, AES Filing in the US).</li>
              <li className="mb-1"><input type="checkbox" disabled /> Import Declaration: (e.g., Bill of Entry in India, SAD in the EU).</li>
              <li className="mb-1"><input type="checkbox" disabled /> Inspection Certificate: If required by the buyer or importing country.</li>
              <li className="mb-1"><input type="checkbox" disabled /> Phytosanitary Certificate: For exports of plants and plant-based products.</li>
              <li className="mb-1"><input type="checkbox" disabled /> Dangerous Goods Declaration (DGD): For any shipment containing hazardous materials.</li>
              <li className="mb-1"><input type="checkbox" disabled /> Export/Import Licenses: For controlled or restricted goods.</li>
              <li className="mb-1"><input type="checkbox" disabled /> Letter of Credit (L/C): If this is the agreed payment method.</li>
              <li className="mb-1"><input type="checkbox" disabled /> Bill of Exchange (Draft): If used for payment, typically with a documentary collection.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2 truncate">Glossary of Key Terms</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Air Waybill (AWB):</b> A non-negotiable transport document issued by an air carrier that serves as a contract of carriage and a receipt for goods. It is not a document of title.</li>
              <li><b>Bill of Exchange (BoE):</b> A written order from a seller (drawer) to a buyer (drawee) to pay a specified sum of money at a specified time. A key instrument in documentary collections.</li>
              <li><b>Bill of Lading (B/L):</b> A legal document issued by an ocean carrier that serves as a receipt for goods, a contract of carriage, and a document of title, meaning it represents ownership of the goods.</li>
              <li><b>Certificate of Origin (CoO):</b> A document that certifies the country in which the goods were manufactured or produced. It is used by customs authorities to determine tariff rates and eligibility for trade agreements.</li>
              <li><b>Commercial Invoice:</b> The primary bill of sale between the exporter and the importer, used by customs for valuation and duty assessment.</li>
              <li><b>Consignee:</b> The person or company named in the transport documents as the party to whom the goods are to be delivered.</li>
              <li><b>Customs Broker:</b> A licensed individual or company that clears goods through customs on behalf of an importer or exporter.</li>
              <li><b>Demurrage/Detention:</b> Fees charged by a carrier when cargo or equipment (like a container) is not moved or returned within the allotted free time.</li>
              <li><b>EORI Number (Economic Operator Registration and Identification):</b> A unique identification number required for businesses trading with or within the European Union.</li>
              <li><b>Freight Forwarder:</b> A company that organizes shipments for individuals or corporations to get goods from the manufacturer or producer to a market, customer or final point of distribution.</li>
              <li><b>Harmonized System (HS) Code:</b> An internationally standardized system of names and numbers to classify traded products, used by customs authorities to assess duties.</li>
              <li><b>Incoterms®:</b> A set of 11 internationally recognized rules published by the International Chamber of Commerce which define the responsibilities of sellers and buyers for the delivery of goods under sales contracts.</li>
              <li><b>Letter of Credit (L/C):</b> A financial instrument issued by a bank that guarantees payment to a seller on behalf of a buyer, provided the seller presents compliant shipping documents.</li>
              <li><b>Packing List:</b> A document that provides a detailed inventory of the contents of a shipment, including weights, dimensions, and piece counts for each package.</li>
              <li><b>Proforma Invoice:</b> A preliminary bill of sale sent to buyers in advance of a shipment or delivery of goods, used as a quote and to arrange financing.</li>
              <li><b>Shipper:</b> The person or company sending the goods; the exporter or consignor.</li>
              <li><b>Shipper's Letter of Instruction (SLI):</b> A document from the shipper to their freight forwarder providing detailed instructions for a specific shipment.</li>
            </ul>
          </section>
          <section id="appendix-b" className="mb-8">
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">Appendix B: Common Errors & Penalties Matrix</h3>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Document</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Common Error</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Potential Consequences</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Typical Culpability Level</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">How to Prevent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Commercial Invoice</td>
                    <td className="border border-gray-300 px-3 py-2">Undervaluing goods to evade duties.</td>
                    <td className="border border-gray-300 px-3 py-2">Severe fines (up to domestic value of goods), seizure/forfeiture of goods, criminal charges, loss of import privileges.</td>
                    <td className="border border-gray-300 px-3 py-2">Fraud</td>
                    <td className="border border-gray-300 px-3 py-2">Implement a strict valuation policy. Never use dual invoices. Declare fair market value for all items, including samples.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Commercial Invoice</td>
                    <td className="border border-gray-300 px-3 py-2">Incorrect HS Code classification leading to duty underpayment.</td>
                    <td className="border border-gray-300 px-3 py-2">Back-payment of duties plus interest, penalties (e.g., 2-4x duty loss in the US).</td>
                    <td className="border border-gray-300 px-3 py-2">Negligence / Gross Negligence</td>
                    <td className="border border-gray-300 px-3 py-2">Use official tariff schedules. Consult a customs broker or trade advisor for complex products. Maintain a classification database.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Commercial Invoice</td>
                    <td className="border border-gray-300 px-3 py-2">Vague or inaccurate goods description.</td>
                    <td className="border border-gray-300 px-3 py-2">Customs hold, physical inspection, shipment delays, potential re-classification and penalties.</td>
                    <td className="border border-gray-300 px-3 py-2">Negligence</td>
                    <td className="border border-gray-300 px-3 py-2">Provide a clear, detailed description: What is it? What is it made of? What is its intended use? Avoid generic terms.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Commercial Invoice</td>
                    <td className="border border-gray-300 px-3 py-2">Failure to declare "assists" or other dutiable costs.</td>
                    <td className="border border-gray-300 px-3 py-2">Back-payment of duties plus interest, penalties for undervaluation.</td>
                    <td className="border border-gray-300 px-3 py-2">Negligence / Gross Negligence</td>
                    <td className="border border-gray-300 px-3 py-2">Establish a process to track all costs associated with production, including molds, tooling, or engineering work provided to the supplier.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Bill of Lading (B/L)</td>
                    <td className="border border-gray-300 px-3 py-2">Inaccurate piece count or weight.</td>
                    <td className="border border-gray-300 px-3 py-2">Carrier liability disputes, customs holds for discrepancy with invoice/packing list, potential penalties.</td>
                    <td className="border border-gray-300 px-3 py-2">Negligence</td>
                    <td className="border border-gray-300 px-3 py-2">Verify cargo count and weight before loading. Ensure consistency with the packing list.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Bill of Lading (B/L)</td>
                    <td className="border border-gray-300 px-3 py-2">Incorrectly claused (e.g., marked "Clean" when goods are damaged).</td>
                    <td className="border border-gray-300 px-3 py-2">Exposes carrier to claims for pre-shipment damage; can lead to payment rejection under an L/C.</td>
                    <td className="border border-gray-300 px-3 py-2">N/A (Carrier Error)</td>
                    <td className="border border-gray-300 px-3 py-2">Shipper should inspect the B/L upon receipt to ensure it accurately reflects the cargo's condition.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Certificate of Origin</td>
                    <td className="border border-gray-300 px-3 py-2">False declaration of origin to wrongly claim FTA benefits.</td>
                    <td className="border border-gray-300 px-3 py-2">Severe penalties for duty evasion, back-payment of all duties that should have been paid, loss of FTA privileges.</td>
                    <td className="border border-gray-300 px-3 py-2">Fraud</td>
                    <td className="border border-gray-300 px-3 py-2">Conduct thorough origin analysis based on the specific FTA's rules of origin. Maintain all supporting documentation (e.g., supplier declarations, production records).</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Packing List</td>
                    <td className="border border-gray-300 px-3 py-2">Inconsistency with Commercial Invoice (e.g., different quantities).</td>
                    <td className="border border-gray-300 px-3 py-2">Immediate red flag for customs, high likelihood of physical inspection, shipment delays, demurrage charges.</td>
                    <td className="border border-gray-300 px-3 py-2">Negligence</td>
                    <td className="border border-gray-300 px-3 py-2">Cross-check every detail (quantities, weights, marks) against the Commercial Invoice before finalizing documents. Use a single source of data to generate both.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">ISF (10+2) Filing (US)</td>
                    <td className="border border-gray-300 px-3 py-2">Late or non-filing.</td>
                    <td className="border border-gray-300 px-3 py-2">$5,000 liquidated damages penalty per violation, cargo holds, increased scrutiny on future shipments.</td>
                    <td className="border border-gray-300 px-3 py-2">Strict Liability</td>
                    <td className="border border-gray-300 px-3 py-2">Work with a reliable customs broker or forwarder. Establish clear communication protocols with the supplier to get required data well before the 24-hour loading deadline.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section id="appendix-c" className="mb-8">
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">Appendix C: Editable Document Templates</h3>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Commercial Invoice Templates:</b>
                <ul className="list-disc pl-6">
                  <li>Microsoft Office provides customizable invoice templates for Word and Excel.</li>
                  <li>Specialized business service providers like Bill.com and Invoice Simple offer downloadable and editable commercial invoice templates designed for international trade.</li>
                  <li>The U.S. Department of Commerce provides a sample commercial invoice with instructions via its export.gov portal.</li>
                </ul>
              </li>
              <li><b>Export Packing List Templates:</b>
                <ul className="list-disc pl-6">
                  <li>Carriers like FedEx provide downloadable PDF packing list forms.</li>
                  <li>Logistics service providers and online form repositories offer templates in various formats (XLSX, PDF) that can be customized.</li>
                  <li>Shipping Solutions offers a library of free, downloadable export forms, including packing lists.</li>
                </ul>
              </li>
              <li><b>Certificate of Origin Templates:</b>
                <ul className="list-disc pl-6">
                  <li>A generic Certificate of Origin form is available from sources like Shipping Solutions and IncoDocs.</li>
                  <li>For the USMCA, U.S. Customs and Border Protection (CBP) provides a fillable PDF template that contains all the minimum required data elements.</li>
                  <li>Blank EUR.1 forms must typically be obtained from an authorized Chamber of Commerce.</li>
                </ul>
              </li>
              <li><b>Transport Document Templates:</b>
                <ul className="list-disc pl-6">
                  <li>While Bills of Lading and Air Waybills are issued by the carrier, templates and examples can be useful for understanding the required information. Examples of B/L forms are available from carriers like XPO and government bodies.</li>
                  <li>IATA provides standard (fillable and non-fillable) Dangerous Goods Declaration forms, which are essential for shipping hazardous materials.</li>
                </ul>
              </li>
              <li><b>Comprehensive Form Libraries:</b>
                <ul className="list-disc pl-6">
                  <li>Websites like Shipping Solutions provide a centralized library of many of the most common export documents, including the Shipper's Letter of Instruction (SLI), Bank Draft forms, and the BIS-711 form.</li>
                </ul>
              </li>
            </ul>
            <p className="mt-4">Users should always verify that any template used meets the specific requirements of the importing country and the terms of their commercial transaction.</p>
          </section>
          <section id="conclusion" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Conclusion</h2>
            <p>The journey of goods across international borders is paved with documents. This playbook has systematically deconstructed the essential paperwork of export-import trade, revealing that these documents are far more than administrative formalities. They are the legal, financial, and logistical instruments that enable global commerce, manage risk, and ensure compliance.</p>
            <p>The analysis underscores several critical conclusions for any entity engaged in international trade:</p>
            <ol className="list-decimal pl-6 mb-2">
              <li><b>Accuracy is Paramount and Non-Negotiable:</b> The "domino effect" of a single error on a foundational document like a Commercial Invoice or Shipper's Letter of Instruction can trigger a catastrophic chain reaction of customs delays, financial penalties, and payment rejections. The principle of absolute consistency across all documents is the bedrock of successful trade operations.</li>
              <li><b>Documentation is a Strategic Function, Not a Clerical Task:</b> Mastery of documentation provides a distinct competitive advantage. Understanding and leveraging preferential Certificates of Origin can directly reduce the landed cost of goods, making an exporter's products more competitive. Choosing the correct type of Bill of Lading (Straight vs. Order) is a fundamental risk management decision that dictates control over the cargo and payment security.</li>
              <li><b>Compliance is a Shared Responsibility:</b> While the exporter typically prepares the majority of the documents, the importer bears the ultimate legal responsibility for the accuracy of the import declaration made to their own government. This interdependent relationship necessitates proactive communication and collaboration, transforming the supply chain from a series of handoffs into a true partnership.</li>
              <li><b>The Digital Transformation is Accelerating:</b> The shift from paper-based processes to digital solutions like the Electronic Bill of Lading (eB/L) and Digital Certificates of Origin (e-CoO) is irreversible. While challenges in legal recognition and interoperability remain, the benefits in speed, security, and cost-efficiency are compelling. Businesses that embrace this digital transformation will gain a significant operational edge in the years to come.</li>
            </ol>
            <p>Ultimately, navigating the world of export-import documentation requires diligence, precision, and a strategic mindset. By treating documentation not as a burden but as a critical business function, companies can mitigate risks, enhance efficiency, and unlock the full potential of the global marketplace.</p>
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">Works Cited</h3>
            <ol className="list-decimal pl-6 mb-2" style={{ fontSize: '0.95em' }}>
              <li>What happens if a commercial invoice is wrong? - airSlate, accessed June 26, 2025, <a href="https://www.airslate.com/how-to/online-forms/197837-what-happens-if-a-commercial-invoice-is-wrong" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.airslate.com/how-to/online-forms/197837-what-happens-if-a-commercial-invoice-is-wrong</a></li>
              <li>Commercial Invoice. What it is, parts, types and how to make it. - Across Logistics, accessed June 26, 2025, <a href="https://acrosslogistics.com/blog/en/commercial-invoice" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://acrosslogistics.com/blog/en/commercial-invoice</a></li>
              <li>What Is a Commercial Invoice? A Complete Guide - Tofu, accessed June 26, 2025, <a href="https://tofu.com/blog/what-is-a-commercial-invoice" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://tofu.com/blog/what-is-a-commercial-invoice</a></li>
              <li>Bill of Lading: Meaning, Types, Example, and Purpose - Investopedia, accessed June 26, 2025, <a href="https://www.investopedia.com/terms/b/billoflading.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.investopedia.com/terms/b/billoflading.asp</a></li>
              <li>Bill of Lading Explained: A Guide to Understanding the BOL - Reship, accessed June 26, 2025, <a href="https://www.reship.com/blog/the-abcs-of-shipping-understanding-the-bill-of-lading" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.reship.com/blog/the-abcs-of-shipping-understanding-the-bill-of-lading</a></li>
              <li>Bill Of Lading Meaning: Purpose & How It Works - Vector, accessed June 26, 2025, <a href="https://www.withvector.com/blog/bill-of-lading-what-is-it-and-whats-its-purpose/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.withvector.com/blog/bill-of-lading-what-is-it-and-whats-its-purpose/</a></li>
              <li>Bill of Lading Importance Of, Error Consequences, and Effective Solutions - MeetLogistics, accessed June 26, 2025, <a href="https://meetlogistics.com/english/bill-of-lading/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://meetlogistics.com/english/bill-of-lading/</a></li>
              <li>An Inaccurate Bill of Lading Can Put You at Risk | Worldwide Express, accessed June 26, 2025, <a href="https://www.wwex.com/shipping-resources/freight-resources/inaccurate-bill-of-lading" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.wwex.com/shipping-resources/freight-resources/inaccurate-bill-of-lading</a></li>
              <li>Commercial Invoice Sample | export.gov, accessed June 26, 2025, <a href="https://legacy.export.gov/article?id=Commercial-Invoice" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://legacy.export.gov/article?id=Commercial-Invoice</a></li>
              <li>8 Common Mistakes to Avoid in Bill of Lading Preparation - FreightAmigo, accessed June 26, 2025, <a href="https://www.freightamigo.com/blog/8-common-mistakes-to-avoid-in-bill-of-lading-preparation/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.freightamigo.com/blog/8-common-mistakes-to-avoid-in-bill-of-lading-preparation/</a></li>
              <li>What is bill of exchange: Meaning, types, benefits, and example - Sell on Amazon, accessed June 26, 2025, <a href="https://sell.amazon.in/grow-your-business/amazon-global-selling/blogs/bill-of-exchange" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://sell.amazon.in/grow-your-business/amazon-global-selling/blogs/bill-of-exchange</a></li>
              <li>What Is a Bill of Exchange? - Investopedia, accessed June 26, 2025, <a href="https://www.investopedia.com/terms/b/billofexchange.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.investopedia.com/terms/b/billofexchange.asp</a></li>
              <li>What is a Shipper's Letter of Instruction? - Dimerco, accessed June 26, 2025, <a href="https://dimerco.com/what-is-a-shippers-letter-of-instruction/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://dimerco.com/what-is-a-shippers-letter-of-instruction/</a></li>
              <li>The Essential Guide to Export Packing Lists: Templates, Best Practices, and Digital Solutions - FreightAmigo, accessed June 26, 2025, <a href="https://www.freightamigo.com/blog/the-essential-guide-to-export-packing-lists-templates-best-practices-and-digital-solutions/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.freightamigo.com/blog/the-essential-guide-to-export-packing-lists-templates-best-practices-and-digital-solutions/</a></li>
              <li>12 Documents Required for Exporting - Shipping Solutions, accessed June 26, 2025, <a href="https://www.shippingsolutions.com/blog/documents-required-for-international-shipping" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.shippingsolutions.com/blog/documents-required-for-international-shipping</a></li>
              <li>Process Flow Chart - EXPORT | PDF - Scribd, accessed June 26, 2025, <a href="https://www.scribd.com/doc/55934453/Process-Flow-Chart-EXPORT" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.scribd.com/doc/55934453/Process-Flow-Chart-EXPORT</a></li>
              <li>Export Shipping Documentation Checklist - Globexship, accessed June 26, 2025, <a href="https://globexship.com/resources/export-shipping-documentation-checklist/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://globexship.com/resources/export-shipping-documentation-checklist/</a></li>
              <li>Import Processes and Procedure - SMEinfo Portal, accessed June 26, 2025, <a href="https://www.smeinfo.com.my/import/import-processes-and-procedure/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.smeinfo.com.my/import/import-processes-and-procedure/</a></li>
              <li>How Does the Proforma Invoice Fit in the Export Process? - Shipping Solutions, accessed June 26, 2025, <a href="https://www.shippingsolutions.com/blog/how-does-the-proforma-invoice-fit-in-the-sales-process" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.shippingsolutions.com/blog/how-does-the-proforma-invoice-fit-in-the-sales-process</a></li>
              <li>What is a Certificate of Inspection: Types, Benefits, and How to Obtain It - Credlix, accessed June 26, 2025, <a href="https://www.credlix.com/blogs/what-is-a-certificate-of-inspection-types-benefits-and-how-to-obtain-it" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.credlix.com/blogs/what-is-a-certificate-of-inspection-types-benefits-and-how-to-obtain-it</a></li>
              <li>What Is A Shipper's Letter of Instruction (SLI) and How To Complete It, accessed June 26, 2025, <a href="https://icecargo.com.au/shippers-letter-of-instruction/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://icecargo.com.au/shippers-letter-of-instruction/</a></li>
              <li>How to file 'ICEGATE Bill of Entry' and Check Status with Easy Steps, accessed June 26, 2025, <a href="https://blog.tatanexarc.com/logistics/icegate-bill-of-entry/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://blog.tatanexarc.com/logistics/icegate-bill-of-entry/</a></li>
              <li>What is the Shipper's Letter of Instruction? - EXIM Blog, accessed June 26, 2025, <a href="https://grow.exim.gov/blog/shippers-letter-of-instruction-0" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://grow.exim.gov/blog/shippers-letter-of-instruction-0</a></li>
              <li>How to Properly Complete an Air Waybill (AWB): A Comprehensive Guide - FreightAmigo, accessed June 26, 2025, <a href="https://www.freightamigo.com/blog/how-to-properly-complete-an-air-waybill-awb-a-comprehensive-guide/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.freightamigo.com/blog/how-to-properly-complete-an-air-waybill-awb-a-comprehensive-guide/</a></li>
              <li>The single administrative document (SAD) - European Commission, accessed June 26, 2025, <a href="https://taxation-customs.ec.europa.eu/single-administrative-document-sad_en" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://taxation-customs.ec.europa.eu/single-administrative-document-sad_en</a></li>
              <li>Download Free Export Forms - Shipping Solutions, accessed June 26, 2025, <a href="https://www.shippingsolutions.com/free-downloadable-export-forms" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.shippingsolutions.com/free-downloadable-export-forms</a></li>
              <li>Functions and Features of Air Waybill - Cargoflash, accessed June 26, 2025, <a href="https://www.cargoflash.com/blog/air-waybill-overview-features" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.cargoflash.com/blog/air-waybill-overview-features</a></li>
              <li>Commercial invoice vs bill of lading - ClearTax, accessed June 26, 2025, <a href="https://cleartax.in/s/commercial-invoice-vs-bill-of-lading" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://cleartax.in/s/commercial-invoice-vs-bill-of-lading</a></li>
              <li>Bill of Lading vs. Packing Slip: Their Key Differences - Inbound Logistics, accessed June 26, 2025, <a href="https://www.inboundlogistics.com/articles/bill-of-lading-vs-packing-slip/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.inboundlogistics.com/articles/bill-of-lading-vs-packing-slip/</a></li>
              <li>Commercial Invoice and Packing List: The Ultimate Guide, accessed June 26, 2025, <a href="https://www.usebase.io/commercial-invoice-and-packing-list/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.usebase.io/commercial-invoice-and-packing-list/</a></li>
              <li>Complete Guide to Commercial Invoices | Zonos Docs, accessed June 26, 2025, <a href="https://zonos.com/docs/guides/commercial-invoices" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://zonos.com/docs/guides/commercial-invoices</a></li>
              <li>Commercial invoice requirements when clearing or filing entry documents with U.S. Customs and Border Protection, accessed June 26, 2025, <a href="https://cbpcomplaints.cbp.gov/s/article/Article-1175?language=en_US" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://cbpcomplaints.cbp.gov/s/article/Article-1175?language=en_US</a></li>
              <li>The Hidden Costs of Falsifying Commercial Invoice Values - Zonos, accessed June 26, 2025, <a href="https://zonos.com/blog/commercial-invoice-fraud" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://zonos.com/blog/commercial-invoice-fraud</a></li>
              <li>Penalties & Liquidated Damages - Tuttle Law, accessed June 26, 2025, <a href="https://www.tuttlelaw.com/subjects/penalties.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.tuttlelaw.com/subjects/penalties.html</a></li>
              <li>How to Prepare a Commercial Invoice for Global Shipments | DHL Malaysia, accessed June 26, 2025, <a href="https://www.dhl.com/discover/en-my/logistics-advice/essential-guides/how-to-prepare-a-commercial-invoice" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.dhl.com/discover/en-my/logistics-advice/essential-guides/how-to-prepare-a-commercial-invoice</a></li>
              <li>19 CFR 142.6 -- Invoice requirements. - eCFR, accessed June 26, 2025, <a href="https://www.ecfr.gov/current/title-19/chapter-I/part-142/subpart-A/section-142.6" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.ecfr.gov/current/title-19/chapter-I/part-142/subpart-A/section-142.6</a></li>
              <li>Customs documents | FedEx, accessed June 26, 2025, <a href="https://www.fedex.com/en-us/shipping/international/create-documents.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.fedex.com/en-us/shipping/international/create-documents.html</a></li>
              <li>How to Make a Commercial Invoice: Guide for Businesses with ..., accessed June 26, 2025, <a href="https://www.freshbooks.com/hub/invoicing/make-commercial-invoice" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.freshbooks.com/hub/invoicing/make-commercial-invoice</a></li>
              <li>+11.2 Sample Commercial Invoice - Tennant Company, accessed June 26, 2025, <a href="https://www.tennantco.com/content/dam/resources/web-content/supplier-documents/sample-commercial-invoice.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.tennantco.com/content/dam/resources/web-content/supplier-documents/sample-commercial-invoice.pdf</a></li>
              <li>Commercial Invoice, accessed June 26, 2025, <a href="https://www.tnt.com/dam/tnt_express_media/global_media_library/images/customs-clearance/commercial-invoice-template-jan-18.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.tnt.com/dam/tnt_express_media/global_media_library/images/customs-clearance/commercial-invoice-template-jan-18.pdf</a></li>
              <li>Customs online - Using the EORI number - Zoll, accessed June 26, 2025, <a href="https://www.zoll.de/EN/Businesses/Movement-of-goods/Import/Duties-and-taxes/EORI-number/Using-the-EORI-number/using-the-eori-number_node.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.zoll.de/EN/Businesses/Movement-of-goods/Import/Duties-and-taxes/EORI-number/Using-the-EORI-number/using-the-eori-number_node.html</a></li>
              <li>What is a commercial invoice and how do I fill it in? - FedEx, accessed June 26, 2025, <a href="https://www.fedex.com/en-at/customer-support/faq/sending/shipping-documents/what-is-a-commercial-invoice.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.fedex.com/en-at/customer-support/faq/sending/shipping-documents/what-is-a-commercial-invoice.html</a></li>
              <li>The 7 Top Mistakes Importers Must Avoid | AFC International, accessed June 26, 2025, <a href="https://www.afcinternationalllc.com/customs-brokerage-news/the-7-top-mistakes-importers-must-avoid/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.afcinternationalllc.com/customs-brokerage-news/the-7-top-mistakes-importers-must-avoid/</a></li>
              <li>19 CFR § 141.86 - Contents of invoices and general requirements. - Law.Cornell.Edu, accessed June 26, 2025, <a href="https://www.law.cornell.edu/cfr/text/19/141.86" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.law.cornell.edu/cfr/text/19/141.86</a></li>
              <li>Commercial invoice mistakes and how to fix them | Zonos Docs, accessed June 26, 2025, <a href="https://zonos.com/docs/guides/commercial-invoice-for-replacement-items" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://zonos.com/docs/guides/commercial-invoice-for-replacement-items</a></li>
              <li>Customs-Related Mistakes Guide - C.H. Robinson, accessed June 26, 2025, <a href="https://www.chrobinson.com/en-us/resources/resource-center/guides/9-most-common-customs-mistakes/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.chrobinson.com/en-us/resources/resource-center/guides/9-most-common-customs-mistakes/</a></li>
              <li>Why Following Your Chinese Supplier's Tariff Advice Could Land YOU in Jail, accessed June 26, 2025, <a href="https://harris-sliwoski.com/chinalawblog/why-following-your-chinese-suppliers-tariff-advice-could-land-you-in-jail/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://harris-sliwoski.com/chinalawblog/why-following-your-chinese-suppliers-tariff-advice-could-land-you-in-jail/</a></li>
              <li>US Customs – Fool Me Once or Not at All? Understanding Customs Fraud, Penalties and what not to do., accessed June 26, 2025, <a href="https://lgi.laufer.com/insights/us-customs-fool-me-once-or-not-at-all-understanding-customs-fraud-penalties-and-what-not-to-do/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://lgi.laufer.com/insights/us-customs-fool-me-once-or-not-at-all-understanding-customs-fraud-penalties-and-what-not-to-do/</a></li>
              <li>How Tariff Increases Are Driving Customs Fraud and DOJ Enforcement Risks, accessed June 26, 2025, <a href="https://www.dynamisllp.com/knowledge/tariff-increases-customs-fraud-enforcement-risks" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.dynamisllp.com/knowledge/tariff-increases-customs-fraud-enforcement-risks</a></li>
              <li>The Most Common Documentation Mistakes and How to Avoid Them - Blog | Blair Consular Services, accessed June 26, 2025, <a href="https://www.blairconsular.com/en-gb/news-and-blog/blog/entry/352/avoid-most-common-documentation-mistakes" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.blairconsular.com/en-gb/news-and-blog/blog/entry/352/avoid-most-common-documentation-mistakes</a></li>
              <li>Civil penalties for contraventions of customs law (Customs Notice 301) - GOV.UK, accessed June 26, 2025, <a href="https://www.gov.uk/guidance/civil-penalties-for-contraventions-of-customs-law-customs-notice-301" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.gov.uk/guidance/civil-penalties-for-contraventions-of-customs-law-customs-notice-301</a></li>
              <li>EUR-Lex - 52013PC0883R(02) - EN - European Union, accessed June 26, 2025, <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:52013PC0884R(03)" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:52013PC0884R(03)</a></li>
              <li>Export packing lists – 10 crucial details to include in 2025 - GWP Group, accessed June 26, 2025, <a href="https://www.gwp.co.uk/guides/export-packing-lists/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.gwp.co.uk/guides/export-packing-lists/</a></li>
              <li>Packing List Sample - Shipping Solutions, accessed June 26, 2025, <a href="https://www.shippingsolutions.com/packing-list-sample" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.shippingsolutions.com/packing-list-sample</a></li>
              <li>Packing List Template - Nuvocargo, accessed June 26, 2025, <a href="https://www.nuvocargo.com/blog-posts/packing-list-template" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.nuvocargo.com/blog-posts/packing-list-template</a></li>
              <li>PACKING LIST - FedEx, accessed June 26, 2025, <a href="https://www.fedex.com/gtm/pdf/UPL.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.fedex.com/gtm/pdf/UPL.pdf</a></li>
              <li>Shipping Packing List - Fill Online, Printable, Fillable, Blank | pdfFiller, accessed June 26, 2025, <a href="https://shipping-packing-list-template.pdffiller.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://shipping-packing-list-template.pdffiller.com/</a></li>
              <li>Packing list: Definition, types and how to complete them - Mecalux, accessed June 26, 2025, <a href="https://www.mecalux.com/blog/packing-list" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.mecalux.com/blog/packing-list</a></li>
              <li>Packing List - Shipping Solutions, accessed June 26, 2025, <a href="https://www.shippingsolutions.com/packing-list" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.shippingsolutions.com/packing-list</a></li>
              <li>5 Common Misconceptions About Shipping Packing Lists: What You Need to Know, accessed June 26, 2025, <a href="https://www.freightamigo.com/blog/5-common-misconceptions-about-shipping-packing-lists-what-you-need-to-know/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.freightamigo.com/blog/5-common-misconceptions-about-shipping-packing-lists-what-you-need-to-know/</a></li>
              <li>A Retailer's Guide to EU Customs Declarations & Clearance - Hurricane Commerce, accessed June 26, 2025, <a href="https://hurricanecommerce.com/a-retailers-guide-to-eu-customs-declarations-clearance/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://hurricanecommerce.com/a-retailers-guide-to-eu-customs-declarations-clearance/</a></li>
              <li>Certificate of Origin (CO): Definition, Types, and How to Get One, accessed June 26, 2025, <a href="https://www.investopedia.com/terms/c/certificate-of-origin.asp" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.investopedia.com/terms/c/certificate-of-origin.asp</a></li>
              <li>Overview - Singapore Customs, accessed June 26, 2025, <a href="https://www.customs.gov.sg/businesses/certificates-of-origin/overview/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.customs.gov.sg/businesses/certificates-of-origin/overview/</a></li>
              <li>Create a Certificate of Origin [Free Template] - IncoDocs, accessed June 26, 2025, <a href="https://incodocs.com/template/certificate_of_origin" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://incodocs.com/template/certificate_of_origin</a></li>
              <li>Origin documents: difference between preferential and non-preferential explained, accessed June 26, 2025, <a href="https://www.pincvision.com/news/oorsprongsdocumenten-het-verschil-tussen-preferentieel-en-niet-preferentieel-uitgelegd" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.pincvision.com/news/oorsprongsdocumenten-het-verschil-tussen-preferentieel-en-niet-preferentieel-uitgelegd</a></li>
              <li>How to Complete a Certificate of Origin | Shannon Chamber, accessed June 26, 2025, <a href="https://www.shannonchamber.ie/services/certificates-of-origin/how-to-complete-a-certificate-of-origin/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.shannonchamber.ie/services/certificates-of-origin/how-to-complete-a-certificate-of-origin/</a></li>
              <li>Preferential and non-preferential origin - Revenue, accessed June 26, 2025, <a href="https://www.revenue.ie/en/customs/businesses/origin/preferential-nonpreferential/index.aspx" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.revenue.ie/en/customs/businesses/origin/preferential-nonpreferential/index.aspx</a></li>
              <li>USMCA Certificate of Origin Instructions and Guidelines - Print Friendly, accessed June 26, 2025, <a href="https://www.printfriendly.com/document/usmca-certificate-of-origin-instructions-guidelines" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.printfriendly.com/document/usmca-certificate-of-origin-instructions-guidelines</a></li>
              <li>USMCA Certificate of Origin Filling Software and How to Complete It - Shipping Solutions, accessed June 26, 2025, <a href="https://www.shippingsolutions.com/blog/usmca-certificate-of-origin" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.shippingsolutions.com/blog/usmca-certificate-of-origin</a></li>
              <li>USMCA Certificate of Origin - Sample USMCA Form & Expert Guidance, accessed June 26, 2025, <a href="https://www.usmcacertificate.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.usmcacertificate.com/</a></li>
              <li>How to Fill Out Certification of Origin Under CUSMA/USMCA/T-MEC | PCB USA, accessed June 26, 2025, <a href="https://www.pcbusa.com/post/how-to-fill-out-certification-of-origin-under-cusma-usmca-t-mec" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.pcbusa.com/post/how-to-fill-out-certification-of-origin-under-cusma-usmca-t-mec</a></li>
              <li>EUR 1 Movement Certificate Instructions and Details - Print Friendly, accessed June 26, 2025, <a href="https://www.printfriendly.com/document/eur-1-movement-certificate-instructions-details" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.printfriendly.com/document/eur-1-movement-certificate-instructions-details</a></li>
              <li>EUR1 Movement Certificate | International - LCCI - London Chamber of Commerce, accessed June 26, 2025, <a href="https://www.londonchamber.co.uk/international-trade/trade-documentation/eur1-movement-certificate/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.londonchamber.co.uk/international-trade/trade-documentation/eur1-movement-certificate/</a></li>
              <li>EUR1 certificates - Chamber International, accessed June 26, 2025, <a href="https://www.chamber-international.com/exporting-chamber-international/documentation-for-export-and-import/eur-1-certificates/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.chamber-international.com/exporting-chamber-international/documentation-for-export-and-import/eur-1-certificates/</a></li>
              <li>What Is An EUR1 Certificate? | [Read Everything Here] - Pro Carrier, accessed June 26, 2025, <a href="https://weareprocarrier.com/news/article/what-is-an-eur1-certificate?refererSource=wearedg" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://weareprocarrier.com/news/article/what-is-an-eur1-certificate?refererSource=wearedg</a></li>
              <li>EUR1 Certificate. What it is and who issues it., accessed June 26, 2025, <a href="https://acrosslogistics.com/blog/en/eur1-certificate" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://acrosslogistics.com/blog/en/eur1-certificate</a></li>
              <li>Completing Movement Certificates EUR.1 and EUR-MED for export - Tolletaten, accessed June 26, 2025, <a href="https://www.toll.no/en/corporate/export/duty-free-status-or-lower-duties-when-exporting-to-other-countries/completing-movement-certificates-eur1-and-eur-med-for-export-" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.toll.no/en/corporate/export/duty-free-status-or-lower-duties-when-exporting-to-other-countries/completing-movement-certificates-eur1-and-eur-med-for-export-</a></li>
              <li>HOW TO COMPLETE A MOVEMENT CERTIFICATE EUR 1 FORM - Thames Valley Chamber of Commerce, accessed June 26, 2025, <a href="https://www.thamesvalleychamber.co.uk/wp-content/uploads/2024/02/HowTo-EURmovement-Certificate-2021-pdf.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.thamesvalleychamber.co.uk/wp-content/uploads/2024/02/HowTo-EURmovement-Certificate-2021-pdf.pdf</a></li>
              <li>Certificates of Origin - Twin Cities North Chamber of Commerce, accessed June 26, 2025, <a href="https://www.twincitiesnorth.org/certificates-of-origin/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.twincitiesnorth.org/certificates-of-origin/</a></li>
              <li>Bill of Lading: Features, Functions, and Types - Danil Hristich, accessed June 26, 2025, <a href="https://danil-hristich.com/en/bill-of-lading-features-functions-and-types/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://danil-hristich.com/en/bill-of-lading-features-functions-and-types/</a></li>
              <li>Non-Negotiable Bill of Lading - Shipthis Freight Glossary, accessed June 26, 2025, <a href="https://www.shipthis.co/glossary/non-negotiable-bol" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.shipthis.co/glossary/non-negotiable-bol</a></li>
              <li>What is a negotiable bill of lading (NBL)? - Freight Right, accessed June 26, 2025, <a href="https://www.freightright.com/kb/negotiable-bill-of-lading-nbl" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.freightright.com/kb/negotiable-bill-of-lading-nbl</a></li>
              <li>Common Mistakes To Avoid In Bill Of Lading - FasterCapital, accessed June 26, 2025, <a href="https://fastercapital.com/topics/common-mistakes-to-avoid-in-bill-of-lading.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://fastercapital.com/topics/common-mistakes-to-avoid-in-bill-of-lading.html</a></li>
              <li>Bill Of Lading Legal Requirements: A Complete Guide - Vector, accessed June 26, 2025, <a href="https://www.withvector.com/blog/bill-of-lading-legal-requirements-what-you-need-to-know/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.withvector.com/blog/bill-of-lading-legal-requirements-what-you-need-to-know/</a></li>
              <li>Examples Of The Consequences Of Inaccurate Or Incomplete Bill Of Lading - FasterCapital, accessed June 26, 2025, <a href="https://fastercapital.com/topics/examples-of-the-consequences-of-inaccurate-or-incomplete-bill-of-lading.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://fastercapital.com/topics/examples-of-the-consequences-of-inaccurate-or-incomplete-bill-of-lading.html</a></li>
              <li>CBP Penalties – Reidel Law Firm – Texas Based, Global Reach, accessed June 26, 2025, <a href="https://reidellawfirm.com/cbp-penalties/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://reidellawfirm.com/cbp-penalties/</a></li>
              <li>Ocean House Bill of Lading Frequently Asked Questions, accessed June 26, 2025, <a href="https://www.cbp.gov/trade/automated/ohbol-faq" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.cbp.gov/trade/automated/ohbol-faq</a></li>
              <li>ISF Enforcement: Penalties, Filing Errors, and Mitigation - Shapiro, accessed June 26, 2025, <a href="https://www.shapiro.com/isf-enforcement-penalties-filing-errors-and-mitigation/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.shapiro.com/isf-enforcement-penalties-filing-errors-and-mitigation/</a></li>
              <li>Mitigation Guidelines: Fines, Penalties, Forfeitures and Liquidated Damages - U.S. Customs and Border Protection, accessed June 26, 2025, <a href="https://www.cbp.gov/sites/default/files/documents/icp069_3.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.cbp.gov/sites/default/files/documents/icp069_3.pdf</a></li>
              <li>How to fill in an Air Waybill | United Kingdom - FedEx, accessed June 26, 2025, <a href="https://www.fedex.com/en-gb/shipping-channel/customs-clearance/air-waybill.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.fedex.com/en-gb/shipping-channel/customs-clearance/air-waybill.html</a></li>
              <li>Fill an Air Waybill Like a Pro: 2023 Ultimate Guide - ddpch, accessed June 26, 2025, <a href="https://ddpch.com/how-to-fill-an-air-waybill-a-step-by-step-guide/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://ddpch.com/how-to-fill-an-air-waybill-a-step-by-step-guide/</a></li>
              <li>How to Read and Interpret an Air Waybill: A Step-by-Step Guide, accessed June 26, 2025, <a href="https://wefreight.com/how-to-read-air-waybill/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://wefreight.com/how-to-read-air-waybill/</a></li>
              <li>What is an Airway Bill (AWB) and How to Fill in Step by Steps - Professional China Shipping Forwarder & Broker | Mbmlog, accessed June 26, 2025, <a href="https://mbmlog.com/what-is-an-airway-bill-awb-and-why-business-owners-need-it/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://mbmlog.com/what-is-an-airway-bill-awb-and-why-business-owners-need-it/</a></li>
              <li>Air waybill preparation - United Cargo, accessed June 26, 2025, <a href="https://www.unitedcargo.com/en/us/learn/how-to-ship/air-waybill-preparation.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.unitedcargo.com/en/us/learn/how-to-ship/air-waybill-preparation.html</a></li>
              <li>How to Complete an Air Waybill | Lynden Air Cargo, accessed June 26, 2025, <a href="https://www.lynden.com/lac/resources/how-to-complete-an-air-waybill/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.lynden.com/lac/resources/how-to-complete-an-air-waybill/</a></li>
              <li>Guide to Completing a Paper Air Waybill - Southwest Cargo, accessed June 26, 2025, <a href="https://www.swacargo.com/swacargo_com_ui/pdf/Universal_airwaybills_Conditions_2.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.swacargo.com/swacargo_com_ui/pdf/Universal_airwaybills_Conditions_2.pdf</a></li>
              <li>Air Waybill examples (completed) - Dg & Safety Online, accessed June 26, 2025, <a href="https://www.dgsafety.com/images/2023_Air_Waybills_example.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.dgsafety.com/images/2023_Air_Waybills_example.pdf</a></li>
              <li>Common Mistakes To Avoid When Filling Out An Airway Bill - FasterCapital, accessed June 26, 2025, <a href="https://fastercapital.com/topics/common-mistakes-to-avoid-when-filling-out-an-airway-bill.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://fastercapital.com/topics/common-mistakes-to-avoid-when-filling-out-an-airway-bill.html</a></li>
              <li>Shipper's Letter of Instruction (SLI) Definition | UPS Supply Chain Solutions - United States, accessed June 26, 2025, <a href="https://www.ups.com/us/en/supplychain/resources/glossary-term/shippers-letter-of-instruction" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.ups.com/us/en/supplychain/resources/glossary-term/shippers-letter-of-instruction</a></li>
              <li>Inspection Certificate Definition | NTS - Nationwide Transport Services, accessed June 26, 2025, <a href="https://ntslogistics.com/glossary/meaning-of-inspection-certificate/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://ntslogistics.com/glossary/meaning-of-inspection-certificate/</a></li>
              <li>Inspection Certificate - Export and Import - Meegle, accessed June 26, 2025, <a href="https://www.meegle.com/en_us/topics/export-import/inspection-certificate" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.meegle.com/en_us/topics/export-import/inspection-certificate</a></li>
              <li>Inspection Certificate - Exporting Made Easy, accessed June 26, 2025, <a href="https://www.exportingmadeeasy.com/glossary/inspection-certificate" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.exportingmadeeasy.com/glossary/inspection-certificate</a></li>
              <li>Special Documents - International Trade Administration, accessed June 26, 2025, <a href="https://www.trade.gov/special-documents" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.trade.gov/special-documents</a></li>
              <li>What Is an Inspection Certificate? A Complete Guide - EJET Sourcing, accessed June 26, 2025, <a href="https://www.ejet.com/inspection-certificate/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.ejet.com/inspection-certificate/</a></li>
              <li>Cargo Insurance Document (CID) - Cross-Border Paperless Trade Database, accessed June 26, 2025, <a href="https://www.digitalizetrade.org/ktdde/trade-documents/CID" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.digitalizetrade.org/ktdde/trade-documents/CID</a></li>
              <li>Definition and Meaning of Cargo Insurance Certificate in Shipping Terms - Pazago Blogs, accessed June 26, 2025, <a href="https://blog.pazago.com/post/cargo-insurance-certificate" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://blog.pazago.com/post/cargo-insurance-certificate</a></li>
              <li>Insurance Certificates 101: Everything Beginners Need to Know - YQN, accessed June 26, 2025, <a href="https://resources.yqn.com/insurance-certificates-logistics-insurance-guide/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://resources.yqn.com/insurance-certificates-logistics-insurance-guide/</a></li>
              <li>What is an Insurance Certificate? - DHL Freight Connections, accessed June 26, 2025, <a href="https://dhl-freight-connections.com/en/logistics-dictionary/insurance-certificate/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://dhl-freight-connections.com/en/logistics-dictionary/insurance-certificate/</a></li>
              <li>How Certificates of Insurance Affect Your Cargo Insurance Claim - Trade Risk Guaranty, accessed June 26, 2025, <a href="https://traderiskguaranty.com/trgpeak/certificates-of-insurance-affect-your-claim/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://traderiskguaranty.com/trgpeak/certificates-of-insurance-affect-your-claim/</a></li>
              <li>bill of exchange | Wex | US Law | LII / Legal Information Institute, accessed June 26, 2025, <a href="https://www.law.cornell.edu/wex/bill_of_exchange" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.law.cornell.edu/wex/bill_of_exchange</a></li>
              <li>Exploring The Purpose & Benefits Of RCMC Registration For Indian Exporters-Online, accessed June 26, 2025, <a href="https://udyogsuvidhakendra.in/rcmc-registration" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://udyogsuvidhakendra.in/rcmc-registration</a></li>
              <li>What is RCMC Certificate- All you Need to Know - DGFT Guru, accessed June 26, 2025, <a href="https://www.dgftguru.com/what-is-rcmc-certificate-all-you-need-to-know/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.dgftguru.com/what-is-rcmc-certificate-all-you-need-to-know/</a></li>
              <li>e-Registration Cum Membership Certificate (RCMC) - Directorate General of Foreign Trade | Ministry of Commerce and Industry | Government of India, accessed June 26, 2025, <a href="https://www.dgft.gov.in/CP/?opt=e-rcmc" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.dgft.gov.in/CP/?opt=e-rcmc</a></li>
              <li>RCMC Registration: A Guide for Indian Exporters - Infinity app, accessed June 26, 2025, <a href="https://www.infinityapp.in/blog/rcmc-registration-a-guide-for-indian-exporters" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.infinityapp.in/blog/rcmc-registration-a-guide-for-indian-exporters</a></li>
              <li>RCMC Registration in India: Process, Documents, and Benefits | IndiaFilings.com, accessed June 26, 2025, <a href="https://www.indiafilings.com/rcmc-registration" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.indiafilings.com/rcmc-registration</a></li>
              <li>GST Export Invoice - Exporting under Bond or LUT - GST Billing Software, accessed June 26, 2025, <a href="https://www.billingsoftware.in/export_under_lut_bond.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.billingsoftware.in/export_under_lut_bond.html</a></li>
              <li>GST Export Invoice Format - Sleek Bill, accessed June 26, 2025, <a href="https://sleekbill.in/gst-export-invoice-format/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://sleekbill.in/gst-export-invoice-format/</a></li>
              <li>What is LUT (Letter of Undertaking) in GST - Drip Capital, accessed June 26, 2025, <a href="https://www.dripcapital.com/en-in/resources/blog/lut-in-gst" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.dripcapital.com/en-in/resources/blog/lut-in-gst</a></li>
              <li>GST LUT Form: A Comprehensive Guide for Exporters - IndiaFilings, accessed June 26, 2025, <a href="https://www.indiafilings.com/learn/gst-lut-form-a-comprehensive-guide-for-exporters/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.indiafilings.com/learn/gst-lut-form-a-comprehensive-guide-for-exporters/</a></li>
              <li>Letter of Undertaking (LUT) Under GST - How To File? - Tax2win, accessed June 26, 2025, <a href="https://tax2win.in/guide/letter-of-undertaking-lut-under-gst" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://tax2win.in/guide/letter-of-undertaking-lut-under-gst</a></li>
              <li>Export Invoice Format Under Gst // Pice, accessed June 26, 2025, <a href="https://piceapp.com/blogs/export-invoice-format-under-gst/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://piceapp.com/blogs/export-invoice-format-under-gst/</a></li>
              <li>What is the FEMA declaration form for outward remittance? - Karbon Business, accessed June 26, 2025, <a href="https://www.karboncard.com/blog/fema-declaration-form-for-outward-remittance" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.karboncard.com/blog/fema-declaration-form-for-outward-remittance</a></li>
              <li>FEMA Declaration: An Important Document to Export from India, accessed June 26, 2025, <a href="https://www.credlix.com/blogs/fema-declaration-an-important-document-to-export-from-india" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.credlix.com/blogs/fema-declaration-an-important-document-to-export-from-india</a></li>
              <li>FAQ's On ICEGATE, accessed June 26, 2025, <a href="https://www.icegate.gov.in/help/faq" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.icegate.gov.in/help/faq</a></li>
              <li>Economic Operators' Registration and Identification System (EORI) - Revenue, accessed June 26, 2025, <a href="https://www.revenue.ie/en/customs/businesses/electronic-systems/eori-system.aspx" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.revenue.ie/en/customs/businesses/electronic-systems/eori-system.aspx</a></li>
              <li>Import process - Customs online - Zoll, accessed June 26, 2025, <a href="https://www.zoll.de/EN/Businesses/Movement-of-goods/Mail-Internet/Shipments-from-a-non-EU-country/Import-process/import-process_node.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.zoll.de/EN/Businesses/Movement-of-goods/Mail-Internet/Shipments-from-a-non-EU-country/Import-process/import-process_node.html</a></li>
              <li>Customs procedure for import to the EU - CombineGoodz.com, accessed June 26, 2025, <a href="https://www.combinegoodz.com/blog/Customs-procedure-for-import-to-the-EU/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.combinegoodz.com/blog/Customs-procedure-for-import-to-the-EU/</a></li>
              <li>EU - Import Requirements and Documentation - International Trade Administration, accessed June 26, 2025, <a href="https://www.trade.gov/country-commercial-guides/eu-import-requirements-and-documentation" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.trade.gov/country-commercial-guides/eu-import-requirements-and-documentation</a></li>
              <li>How to submit an import declaration - Finnish Customs - Tulli, accessed June 26, 2025, <a href="https://tulli.fi/en/businesses/import/how-to-submit-an-import-declaration" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://tulli.fi/en/businesses/import/how-to-submit-an-import-declaration</a></li>
              <li>EU Customs Clearance: A Step-by-Step Guide for Businesses - The InstaCarrier, accessed June 26, 2025, <a href="https://blog.instacarrier.eu/eu-customs-clearance-a-step-by-step-guide-for-businesses/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://blog.instacarrier.eu/eu-customs-clearance-a-step-by-step-guide-for-businesses/</a></li>
              <li>Customs declaration - European Commission - Taxation and Customs Union, accessed June 26, 2025, <a href="https://taxation-customs.ec.europa.eu/customs/customs-procedures-import-and-export/customs-operations/customs-declaration_en" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://taxation-customs.ec.europa.eu/customs/customs-procedures-import-and-export/customs-operations/customs-declaration_en</a></li>
              <li>Customs clearance documents and procedures - European Commission's trade, accessed June 26, 2025, <a href="https://trade.ec.europa.eu/access-to-markets/en/content/customs-clearance-documents-and-procedures" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://trade.ec.europa.eu/access-to-markets/en/content/customs-clearance-documents-and-procedures</a></li>
              <li>The Single Administrative Document - Brexit Information, accessed June 26, 2025, <a href="http://brexitlegalguide.co.uk/the-singe-administrative-document/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>http://brexitlegalguide.co.uk/the-singe-administrative-document/</a></li>
              <li>T2 customs document | Transport / Export & Transit | Derijke.com, accessed June 26, 2025, <a href="https://derijke.com/en/t2-document" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://derijke.com/en/t2-document</a></li>
              <li>WHAT ARE THE T1 And T2 DOCUMENTS? – ERAKSONS LOGISTICS, accessed June 26, 2025, <a href="https://www.eraksons.com/logistic/what-are-the-t1-and-t2-documents/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.eraksons.com/logistic/what-are-the-t1-and-t2-documents/</a></li>
              <li>10 + 2 - Wikipedia, accessed June 26, 2025, <a href="https://en.wikipedia.org/wiki/10_%2B_2" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://en.wikipedia.org/wiki/10_%2B_2</a></li>
              <li>Importer Security Filing and Additional Carrier Requirements - Public Intelligence, accessed June 26, 2025, <a href="https://info.publicintelligence.net/10+2%20Customs%20Headquarters%20Presentation.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://info.publicintelligence.net/10+2%20Customs%20Headquarters%20Presentation.pdf</a></li>
              <li>Importer Security Filing (ISF) – 10+2 | What You Need to Know - Shapiro, accessed June 26, 2025, <a href="https://www.shapiro.com/resources/what-you-need-to-know-about-importer-security-filing-isf-102/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.shapiro.com/resources/what-you-need-to-know-about-importer-security-filing-isf-102/</a></li>
              <li>What Data Elements are Required on an ISF 10+2 Filing? - AFC International, accessed June 26, 2025, <a href="https://www.afcinternationalllc.com/customs-brokerage-news/what-data-elements-are-required-on-an-isf-102-filing/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.afcinternationalllc.com/customs-brokerage-news/what-data-elements-are-required-on-an-isf-102-filing/</a></li>
              <li>Importer Security Filing (ISF): What Is It and Who's Responsible for Filing, accessed June 26, 2025, <a href="https://www.shippingsolutions.com/blog/importer-security-filing-isf" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.shippingsolutions.com/blog/importer-security-filing-isf</a></li>
              <li>ISF (Importer Security Filing). U.S. import regulations - Across Logistics, accessed June 26, 2025, <a href="https://acrosslogistics.com/blog/en/isf-importer-security-filing" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://acrosslogistics.com/blog/en/isf-importer-security-filing</a></li>
              <li>How Blockchain is Redefining Global Trade Documentation ..., accessed June 26, 2025, <a href="https://yodaplus.com/blog/how-blockchain-is-transforming-global-trade-documentation/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://yodaplus.com/blog/how-blockchain-is-transforming-global-trade-documentation/</a></li>
              <li>Import customs procedures in China - Santandertrade.com, accessed June 26, 2025, <a href="https://santandertrade.com/en/portal/analyse-markets/china/customs-procedures" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://santandertrade.com/en/portal/analyse-markets/china/customs-procedures</a></li>
              <li>Operational procedures for importing from China - VIPUTRANS, accessed June 26, 2025, <a href="https://www.viputrans.com/operational-procedures-for-importing-from-china" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.viputrans.com/operational-procedures-for-importing-from-china</a></li>
              <li>How to Handle the Declaration Formalities for Goods Imported for Contracting Foreign Projects? - China Customs, accessed June 26, 2025, <a href="http://english.customs.gov.cn/statics/7686637e-2be5-4450-b829-83a00ff96908.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>http://english.customs.gov.cn/statics/7686637e-2be5-4450-b829-83a00ff96908.html</a></li>
              <li>Customs Clearance Guide for International Passengers - China Customs, accessed June 26, 2025, <a href="http://english.customs.gov.cn/statics/88707c1e-aa4e-40ca-a968-bdbdbb565e4f.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>http://english.customs.gov.cn/statics/88707c1e-aa4e-40ca-a968-bdbdbb565e4f.html</a></li>
              <li>What is CCC - MPR China Certification, accessed June 26, 2025, <a href="https://www.china-certification.com/en/what-is-ccc/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.china-certification.com/en/what-is-ccc/</a></li>
              <li>CCC Mark Certification - Intertek, accessed June 26, 2025, <a href="https://www.intertek.com/product-certification-marks/ccc/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.intertek.com/product-certification-marks/ccc/</a></li>
              <li>China Compulsory Certificate - Wikipedia, accessed June 26, 2025, <a href="https://en.wikipedia.org/wiki/China_Compulsory_Certificate" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://en.wikipedia.org/wiki/China_Compulsory_Certificate</a></li>
              <li>All You Need to Know About GACC Single Window Registration for F&B Manufacturers, accessed June 26, 2025, <a href="https://www.eusmecentre.org.cn/publications/all-you-need-to-know-about-gacc-single-window-registration-for-fb-manufacturers/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.eusmecentre.org.cn/publications/all-you-need-to-know-about-gacc-single-window-registration-for-fb-manufacturers/</a></li>
              <li>China Operates on Single Window - Scarbrough Global, accessed June 26, 2025, <a href="https://scarbroughglobal.com/china-operates-on-single-window/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://scarbroughglobal.com/china-operates-on-single-window/</a></li>
              <li>table of contents, accessed June 26, 2025, <a href="https://www.singlewindow.cn/fs/STADOCROOT/7A/35/A7/FEBD9D4A8C542A163D5EF262C6.pdf?_rnd=1665985460447&_downloadmode=1&filename=The%20operation%20manual%20of%20china%20import%20food%20enterprise%20registration(enterprise).pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.singlewindow.cn/fs/STADOCROOT/7A/35/A7/FEBD9D4A8C542A163D5EF262C6.pdf?_rnd=1665985460447&_downloadmode=1&filename=The%20operation%20manual%20of%20china%20import%20food%20enterprise%20registration(enterprise).pdf</a></li>
              <li>General Administration of Customs China - GACC CIFER System, accessed June 26, 2025, <a href="https://www.gacc.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.gacc.app/</a></li>
              <li>[No.124] Decree of the General Administration of Customs of the People's Republic of China No. 124, accessed June 26, 2025, <a href="http://english.customs.gov.cn/statics/53a77dc4-c835-460a-b773-f5f7cef63a33.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>http://english.customs.gov.cn/statics/53a77dc4-c835-460a-b773-f5f7cef63a33.html</a></li>
              <li>Regulations of the People's Republic of China on Implementing Customs Administrative Penalty, accessed June 26, 2025, <a href="http://english.customs.gov.cn/statics/4440eff0-0440-4876-8f8a-9c8f16be4355.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>http://english.customs.gov.cn/statics/4440eff0-0440-4876-8f8a-9c8f16be4355.html</a></li>
              <li>Customs Law of the People's Republic of China, accessed June 26, 2025, <a href="https://www.caea.gov.cn/english/n6759372/c6793478/content.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.caea.gov.cn/english/n6759372/c6793478/content.html</a></li>
              <li>Electronic bills of lading can revolutionize international trade | ITC, accessed June 26, 2025, <a href="https://www.intracen.org/news-and-events/news/electronic-bills-of-lading-can-revolutionize-international-trade" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.intracen.org/news-and-events/news/electronic-bills-of-lading-can-revolutionize-international-trade</a></li>
              <li>Electronic Bill of Lading | 5 Challenges to Overcome | eBOL, accessed June 26, 2025, <a href="https://www.propelapps.com/blog/electronic-bill-of-lading-and-5-challenges-to-overcome" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.propelapps.com/blog/electronic-bill-of-lading-and-5-challenges-to-overcome</a></li>
              <li>How Electronic Bill of Lading (eBL) Technology Will Change the World of Shipping | by Zornitsa Monova | INDUSTRIA | Medium, accessed June 26, 2025, <a href="https://medium.com/industria-tech/how-electronic-bill-of-lading-ebl-technology-will-change-the-world-of-shipping-9ebc6cbcf064" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://medium.com/industria-tech/how-electronic-bill-of-lading-ebl-technology-will-change-the-world-of-shipping-9ebc6cbcf064</a></li>
              <li>Electronic Bills of Lading Case Studies | WaveBL Platform, accessed June 26, 2025, <a href="https://wavebl.com/case-studies/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://wavebl.com/case-studies/</a></li>
              <li>The State of the Art of the Electronic Bill of Lading - Software de Transportes e Logística, accessed June 26, 2025, <a href="https://transportersystems.com/docs/electronic-bill-lading.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://transportersystems.com/docs/electronic-bill-lading.pdf</a></li>
              <li>HMM celebrates landmark electronic bill of lading transaction - Splash247, accessed June 26, 2025, <a href="https://splash247.com/hmm-celebrates-landmark-electronic-bill-of-lading-transaction/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://splash247.com/hmm-celebrates-landmark-electronic-bill-of-lading-transaction/</a></li>
              <li>Case Studies Of Successful Through Bills Of Lading Implementation - FasterCapital, accessed June 26, 2025, <a href="https://fastercapital.com/topics/case-studies-of-successful-through-bills-of-lading-implementation.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://fastercapital.com/topics/case-studies-of-successful-through-bills-of-lading-implementation.html</a></li>
              <li>What is an Electronic Certificate of Origin (e-CO)? | - CustomsCity, accessed June 26, 2025, <a href="https://customscity.com/what-is-an-electronic-certificate-of-origin-e-co/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://customscity.com/what-is-an-electronic-certificate-of-origin-e-co/</a></li>
              <li>Understand what a Certificate of Origin is and how it works | Wilson Sons, accessed June 26, 2025, <a href="https://wilsonsons.com.br/en/blog/understand-what-a-certificate-of-origin-is-and-how-it-works/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://wilsonsons.com.br/en/blog/understand-what-a-certificate-of-origin-is-and-how-it-works/</a></li>
              <li>Blockchain in trade finance: Challenges and opportunities - ICC Academy, accessed June 26, 2025, <a href="https://academy.iccwbo.org/digital-trade/article/blockchain-in-trade-finance-challenges-and-opportunities/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://academy.iccwbo.org/digital-trade/article/blockchain-in-trade-finance-challenges-and-opportunities/</a></li>
              <li>Glossary of International Shipping Terms - CSL Express Line, accessed June 26, 2025, <a href="https://www.cslexp.com/single-post/shipping-terms-glossary" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.cslexp.com/single-post/shipping-terms-glossary</a></li>
              <li>Glossary Of International Shipping Terms | ODFL, accessed June 26, 2025, <a href="https://www.odfl.com/content/dam/odfl/us/en/documents/resources/International_Shipping_Terms.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.odfl.com/content/dam/odfl/us/en/documents/resources/International_Shipping_Terms.pdf</a></li>
              <li>International Trade Definitions - U.S. Census Bureau, accessed June 26, 2025, <a href="https://www.census.gov/foreign-trade/reference/definitions/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.census.gov/foreign-trade/reference/definitions/</a></li>
              <li>Free invoice template - Microsoft Create, accessed June 26, 2025, <a href="https://create.microsoft.com/en-us/templates/invoices" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://create.microsoft.com/en-us/templates/invoices</a></li>
              <li>Commercial invoice template | Free download - Bill.com, accessed June 26, 2025, <a href="https://www.bill.com/business-templates/commercial-invoice" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.bill.com/business-templates/commercial-invoice</a></li>
              <li>Downloadable Free Invoice Templates, accessed June 26, 2025, <a href="https://www.invoicesimple.com/invoice-template" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.invoicesimple.com/invoice-template</a></li>
              <li>Sample Certificate of Origin Form - Shipping Solutions, accessed June 26, 2025, <a href="https://www.shippingsolutions.com/certificate-of-origin-sample" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.shippingsolutions.com/certificate-of-origin-sample</a></li>
              <li>Certification of Origin Template - U.S. Customs and Border Protection, accessed June 26, 2025, <a href="https://www.cbp.gov/document/guidance/certification-origin-template" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.cbp.gov/document/guidance/certification-origin-template</a></li>
              <li>bill-of-lading-template.pdf, accessed June 26, 2025, <a href="https://www.gov.mb.ca/agriculture/food-and-ag-processing/starting-a-food-business/pubs/bill-of-lading-template.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.gov.mb.ca/agriculture/food-and-ag-processing/starting-a-food-business/pubs/bill-of-lading-template.pdf</a></li>
              <li>Uniform Bill of Lading Sample, accessed June 26, 2025, <a href="https://ors.sc.gov/sites/scors/files/Documents/Regulatory/transportation/Class%20E/Uniform%20BIll%20of%20Lading%20Sample.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://ors.sc.gov/sites/scors/files/Documents/Regulatory/transportation/Class%20E/Uniform%20BIll%20of%20Lading%20Sample.pdf</a></li>
              <li>BILL OF LADING - First Choice Transportation, accessed June 26, 2025, <a href="https://firstchoicetransportation.net/wp-content/uploads/2021/10/Blank-BOL.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://firstchoicetransportation.net/wp-content/uploads/2021/10/Blank-BOL.pdf</a></li>
              <li>STRAIGHT BILL OF LADING - XPO, accessed June 26, 2025, <a href="https://www.xpo.com/cdn/files/s1/Bill-of-Lading-Form_2024.pdf" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.xpo.com/cdn/files/s1/Bill-of-Lading-Form_2024.pdf</a></li>
              <li>What is a Dangerous Goods Declaration Form For Shippers? - Shippo, accessed June 26, 2025, <a href="https://goshippo.com/shipping/dangerous-goods-declaration-dgd" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://goshippo.com/shipping/dangerous-goods-declaration-dgd</a></li>
              <li>What is a Dangerous Goods Declaration Form For Shippers? - Shippo, accessed June 26, 2025, <a href="https://goshippo.com/shipping/dangerous-goods-declaration-dgd/" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://goshippo.com/shipping/dangerous-goods-declaration-dgd/</a></li>
              <li>Download Free Export Forms - Shipping Solutions, accessed June 26, 2025, <a href="https://www.shippingsolutions.com/free-downloadable-export-forms" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://www.shippingsolutions.com/free-downloadable-export-forms</a></li>
            </ol>
          </section>
        </main>
      </div>
  </div>
);
};

export default Playbook8; 