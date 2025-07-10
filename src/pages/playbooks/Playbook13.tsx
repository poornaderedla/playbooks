import React, { useState, useRef, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const sections = [
  { id: 'introduction', label: 'Introduction', subs: [] },
  { id: 'part-1', label: 'Part I: Exporting to the United States of America', subs: [
    { id: '1-1', label: '1. Foundational Requirements for U.S. Imports' },
    { id: '1-2', label: '2. The U.S. Customs Entry Process: A Step-by-Step Guide' },
    { id: '1-3', label: '3. U.S. Documentation Deep Dive' },
    { id: '1-4', label: '4. Navigating U.S. Partner Government Agencies (PGAs)' },
    { id: '1-5', label: '5. U.S. Tariffs, Duties, and Post-Clearance' },
  ]},
  { id: 'part-2', label: 'Part II: Exporting to the European Union', subs: [
    { id: '2-1', label: '1. Foundational Requirements for EU Imports' },
    { id: '2-2', label: '2. The EU Customs Entry Process: A Step-by-Step Guide' },
    { id: '2-3', label: '3. EU Documentation Deep Dive' },
    { id: '2-4', label: '4. Navigating EU Product Compliance & Safety Regimes' },
    { id: '2-5', label: '5. EU Tariffs, Duties, and Post-Clearance' },
  ]},
  { id: 'part-3', label: 'Part III: Playbook Implementation & Resources', subs: [
    { id: '3-1', label: '1. Building a Digital-First Compliance Strategy with SEO' },
    { id: '3-2', label: '2. Legal Disclaimer & Best Practices' },
    { id: '3-3', label: '3. Glossary of Terms' },
    { id: '3-4', label: '4. Appendix - Sample Documents' },
  ]},
];

const sectionIds = [
  'introduction',
  'part-1', '1-1', '1-2', '1-3', '1-4', '1-5',
  'part-2', '2-1', '2-2', '2-3', '2-4', '2-5',
  'part-3', '3-1', '3-2', '3-3', '3-4',
];

const Playbook13 = () => {
  const [activeSection, setActiveSection] = useState('introduction');
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
      <h1 className="text-xl md:text-2xl font-bold text-center mb-6 mt-4 font-serif truncate">The Definitive Playbook for U.S. and EU Imports: A Comprehensive Guide for Global Businesses</h1>
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
          style={{ scrollBehavior: 'smooth', textAlign: 'justify', textJustify: 'inter-word' }}
        >
          {/* Content Sections */}
          <section id="introduction" className="mb-8">
            <h2 className="text-lg font-bold mb-3">Introduction</h2>
            <h3 className="text-base font-semibold mt-4 mb-2">The Global Trade Dichotomy: Navigating Two Titans</h3>
            <p>For any business engaged in international trade, the United States and the European Union represent the two largest and most lucrative consumer markets in the world. However, gaining access to these markets requires navigating two distinct and fundamentally different customs and regulatory environments. This playbook serves as the ultimate, comprehensive guide for businesses seeking to master the complexities of importing into both regions. It is designed to be a definitive one-stop reference, providing the technical precision, legal context, and practical, actionable advice needed for compliant and efficient market entry.</p>
            <p>The core philosophies underpinning these two trading blocs create a global trade dichotomy that every exporter must understand:</p>
            <ul className="list-disc ml-6 mt-2">
              <li><b>The U.S. System:</b> The United States operates on a principle of "Informed Compliance" and "Reasonable Care". Established under the Customs Modernization Act ("Mod Act"), this framework shifts the primary legal responsibility for the correct declaration of goods—their classification, valuation, and origin—directly onto the importer of record. This model is not passive; it demands that businesses take active, diligent steps to understand and comply with all applicable laws. It is a system built on shared responsibility between the government (U.S. Customs and Border Protection - CBP) and the trade community, where CBP provides guidance and the importer is expected to use it to ensure accuracy.</li>
              <li><b>The EU System:</b> The European Union operates as a single, harmonized customs union managed by the Directorate-General for Taxation and Customs Union (DG TAXUD). This system is characterized by a highly structured, regulation-driven framework that is uniformly applied across its 27 Member States. Compliance in the EU is less about demonstrating a subjective standard of care and more about strict adherence to codified procedures, meticulous data requirements, and pre-market product safety mandates. Once goods clear customs in any single Member State, they are considered in "free circulation" and can move throughout the EU without further customs intervention.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">Structure of the Playbook</h4>
            <p>This playbook is structured in three parts to provide a clear, comparative, and exhaustive analysis of these two systems.</p>
            <ul className="list-disc ml-6 mt-2">
              <li><b>Part I: Exporting to the United States of America</b> offers a complete walkthrough of the U.S. import process, from foundational legal principles and entry procedures to the critical role of Partner Government Agencies (PGAs) and post-clearance obligations.</li>
              <li><b>Part II: Exporting to the European Union</b> provides a parallel guide to the EU's unique and harmonized customs environment, focusing on its mandatory registrations, electronic declaration systems, and non-negotiable product compliance regimes.</li>
              <li><b>Part III: Playbook Implementation & Resources</b> delivers actionable tools, including a digital strategy guide, a comprehensive legal disclaimer, a glossary of essential terms, and an appendix of sample documents to help businesses integrate this knowledge into their daily operations.</li>
            </ul>
            <p>By understanding the distinct requirements and philosophies of both markets, businesses can build robust, resilient, and compliant supply chains, unlocking the full potential of global trade.</p>
          </section>
          <section id="part-1" className="mb-8">
            <h2 className="text-lg font-bold mb-3">Part I: Exporting to the United States of America</h2>
            <p>This part provides a complete walkthrough of the U.S. import process, from foundational legal requirements to post-clearance activities, with a focus on practical application for businesses.</p>
            <h3 id="1-1" className="text-base font-semibold mt-4 mb-2">Section 1: Foundational Requirements for U.S. Imports</h3>
            <p>Before a single shipment can arrive at a U.S. port of entry, businesses must establish a compliant foundation. This section covers the essential legal and administrative prerequisites for importing into the United States.</p>
            <h4 className="font-semibold mt-5 mb-2">1.1 The Principle of "Reasonable Care": Understanding Your Legal Obligation</h4>
            <p>The entire U.S. import process is built upon the central legal pillar of "Reasonable Care," a principle established by the Customs Modernization Act ("Mod Act"). This act fundamentally altered the relationship between importers and U.S. Customs and Border Protection (CBP) by shifting the legal responsibility for correctly classifying, valuing, and declaring imported merchandise squarely onto the importer of record. This is not a passive role; it requires active, diligent effort to ensure that the information provided to CBP is accurate and complete.</p>
            <h5 className="font-semibold mt-4 mb-1">What Constitutes "Reasonable Care"?</h5>
            <ul className="list-disc ml-6 mb-2">
              <li>Having a comprehensive understanding of the terms of the transaction, including the relationship between the buyer and seller.</li>
              <li>Possessing detailed knowledge of the imported merchandise, including its composition, country of origin, and intended use.</li>
              <li>Ensuring that the declared customs value is accurate and reflects the price actually paid or payable.</li>
              <li>Correctly determining the Harmonized Tariff Schedule (HTS) classification for the goods.</li>
              <li>Seeking guidance from subject matter experts, such as licensed customs brokers, trade attorneys, or consultants, especially when dealing with complex products or regulations.</li>
            </ul>
            <p>CBP publishes a wide array of resources, most notably the Informed Compliance Publications (ICPs), to help the trade community understand their obligations. Consulting and relying on these official publications is considered a key component of exercising reasonable care.</p>
            <h5 className="font-semibold mt-4 mb-1">Consequences of Failure</h5>
            <p>The failure to exercise reasonable care can have severe consequences. CBP may issue monetary penalties, which can be substantial, particularly in cases of gross negligence or fraud. Furthermore, non-compliance can lead to significant delays in cargo release, increased scrutiny on future shipments, and, in the most serious cases, referral for criminal investigation and enforcement. Therefore, compliance is not merely about filling out forms correctly; it is about demonstrating a proactive and documented process to ascertain and provide accurate information to CBP. An importer's internal processes, record-keeping, and choice of partners are all subject to CBP scrutiny under this standard.</p>
            <h4 className="font-semibold mt-5 mb-2">1.2 Obtaining an Importer ID Number (Customs Assigned Number)</h4>
            <p>To track all import transactions, CBP requires every importer to have a unique identification number. This number must be provided on all customs entry forms.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>For Businesses:</b> The default importer number is the Employer Identification Number (EIN) assigned by the Internal Revenue Service (IRS). Any U.S.-based business should use its EIN for customs purposes.</li>
              <li><b>For Individuals or Foreign Entities:</b> If a business is not registered with the IRS or an individual is importing goods, a Social Security Number (SSN) can be used.</li>
              <li><b>Requesting a CBP-Assigned Number:</b> For foreign entities or others who do not have an EIN or SSN, a unique importer number can be requested directly from CBP. This is done by completing and submitting CBP Form 5106, the "Create/Update Importer Identity Form." This form establishes the importer's identity with CBP and allows them to assign a number for use on all future entries.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">1.3 The Role of the U.S. Customs Broker: When and Why You Need One</h4>
            <p>A U.S. Customs Broker is a private individual or company licensed by CBP to act as an agent for importers, handling the complex process of clearing goods through customs. While using a broker is not always mandatory, it is often a critical strategic decision.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>When a Broker is Optional:</b> For informal entries, which are typically shipments valued at less than US$2,500, an importer is permitted to clear the goods themselves without hiring a broker.</li>
              <li><b>When a Broker is Mandatory:</b> For formal entries, which are required for all commercial shipments valued at more than US$2,500, the law effectively requires the services of a licensed U.S. Customs Broker to navigate the intricate filing requirements.</li>
            </ul>
            <p>Even when not legally required, engaging a customs broker is a tangible and powerful way for an importer to demonstrate the exercise of "reasonable care." The import process is multifaceted, involving complex tariff classification, valuation methodologies, and a web of Partner Government Agency (PGA) regulations. A licensed broker is an expert in these areas. By entrusting the entry process to a professional, the importer shows they are taking diligent steps to ensure compliance. The cost of a broker's service should always be weighed against the potentially far greater costs of non-compliance, including penalties, delays, and legal fees. The ultimate responsibility for the accuracy of the declaration always remains with the importer, even when a broker is used.</p>
            <h4 className="font-semibold mt-5 mb-2">1.4 Securing a Customs Bond: A Financial Guarantee</h4>
            <p>A customs bond is a contract between three parties—the importer (the principal), a surety company, and CBP—that serves as a financial guarantee to the U.S. government. It ensures that all duties, taxes, fees, and any potential penalties will be paid in full, even if the importer is unable to pay.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>When is a Bond Required?</b> A customs bond is a mandatory requirement for all formal entries. It is also required for shipments of any value that are subject to the requirements of other Partner Government Agencies. Bonds are generally not required for informal entries.</li>
              <li><b>Types of Bonds:</b>
                <ul className="list-disc ml-6">
                  <li><b>Single Transaction Bond (STB):</b> This bond covers a single, specific import shipment. It is best suited for businesses that import infrequently (e.g., fewer than three times per year).</li>
                  <li><b>Continuous Bond:</b> This bond covers all of an importer's shipments at all U.S. ports of entry for a full year. It is far more cost-effective and efficient for businesses that import regularly.</li>
                </ul>
              </li>
              <li><b>How to Obtain a Bond:</b> Customs bonds must be obtained from a U.S. Treasury-licensed surety company. A customs broker typically facilitates this process for their clients and can help determine the appropriate bond type and amount. In some cases, a broker may permit an importer to use the broker's own continuous bond to secure a transaction.</li>
            </ul>
            {/* Section 2: The U.S. Customs Entry Process: A Step-by-Step Guide */}
            <h3 id="1-2" className="text-base font-semibold mt-4 mb-2">2. The U.S. Customs Entry Process: A Step-by-Step Guide</h3>
            <p>The journey of a commercial shipment through U.S. customs follows a structured, time-sensitive sequence of events. Understanding this process is key to avoiding costly delays and ensuring a smooth clearance.</p>
            <h4 className="font-semibold mt-5 mb-2">2.1 Pre-Arrival: Importer Security Filing (ISF 10+2) for Ocean Freight</h4>
            <p>For any goods arriving in the U.S. via ocean vessel, the customs process begins long before the ship reaches port. The Importer Security Filing (ISF), commonly known as "10+2," is a mandatory pre-arrival data submission designed to help CBP screen for high-risk cargo and enhance maritime security.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Who Files:</b> The ISF Importer (typically the owner, purchaser, or consignee of the goods) or their designated agent (such as a customs broker or freight forwarder) is responsible for the timely and accurate filing of the ISF.</li>
              <li><b>Filing Deadline:</b> The ISF must be electronically submitted to CBP at least 24 hours before the cargo is laden aboard the vessel at the foreign port of departure. This is a strict deadline, and failure to comply can result in significant penalties (up to $5,000 per violation) and increased cargo inspections.</li>
              <li><b>Required Data (The "10+2"):</b> The filing consists of two sets of data:
                <ul className="list-disc ml-6">
                  <li>10 Data Elements from the Importer: (1) Manufacturer/supplier name and address, (2) Seller name and address, (3) Buyer name and address, (4) Ship-to name and address, (5) Container stuffing location, (6) Consolidator name and address, (7) Importer of record number, (8) Consignee number, (9) Country of origin, and (10) Commodity HTS number.</li>
                  <li>2 Data Elements from the Carrier: (1) Vessel stow plan and (2) Container status messages. These are transmitted directly to CBP by the ocean carrier.</li>
                </ul>
              </li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">2.2 Arrival and Presentation of Goods</h4>
            <p>Upon the shipment's arrival at a U.S. port of entry, a new set of timelines and responsibilities begins.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Carrier Notification:</b> It is the responsibility of the shipping line or airline to notify the importer or their designated consignee that the goods have arrived. CBP does not provide arrival notifications.</li>
              <li><b>Time Limits for Entry:</b> The importer has 15 calendar days from the date of arrival to file the official customs entry documents. If this deadline is missed, the goods are considered unclaimed and will be moved by CBP to a General Order (G.O.) Warehouse. Storage charges at a G.O. warehouse are notoriously high and accrue daily. If the goods remain in G.O. for six months, they are subject to be sold at a government auction.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">2.3 Entry Types: A Detailed Comparison</h4>
            <p>The type of customs entry required is primarily determined by the commercial value of the shipment. This choice dictates the level of documentation, the need for a customs broker, and the requirement for a bond. The existence of three distinct value-based tiers is a unique feature of the U.S. system, creating different compliance pathways for different types of trade, particularly for the e-commerce sector.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Formal Entry (Entry Type 01):</b> This is the standard procedure for high-value commercial shipments.
                <ul className="list-disc ml-6">
                  <li><b>Value Threshold:</b> Mandatory for all commercial shipments with a value exceeding US$2,500. It is also required for personal shipments over this value and for any shipment containing goods subject to PGA requirements, quotas, or trade remedies, regardless of value.</li>
                  <li><b>Process:</b> A complex, two-part process requiring the filing of entry documents for release followed by an entry summary for duty assessment. It legally necessitates the expertise of a licensed customs broker.</li>
                  <li><b>Bond:</b> A customs bond is always required.</li>
                  <li><b>Liquidation:</b> The final calculation and assessment of duties (liquidation) occurs after the entry is filed and can take place long after the goods have been released into U.S. commerce.</li>
                </ul>
              </li>
              <li><b>Informal Entry (Entry Type 11):</b> This is a streamlined process for lower-value shipments.
                <ul className="list-disc ml-6">
                  <li><b>Value Threshold:</b> Applies to personal and commercial shipments valued at less than US$2,500.</li>
                  <li><b>Process:</b> Features simplified paperwork and procedures. The importer can often handle the clearance directly with a CBP officer at the port of entry, who may assist with classification and form completion.</li>
                  <li><b>Bond:</b> A customs bond is not required.</li>
                  <li><b>Liquidation:</b> Duties are calculated and finalized immediately ("on the spot") at the time of clearance.</li>
                  <li><b>Exclusions:</b> This procedure cannot be used for goods subject to quotas, anti-dumping duties, or countervailing duties. Certain high-risk or PGA-regulated products may also be excluded by a port director and forced into a formal entry.</li>
                </ul>
              </li>
              <li><b>Section 321 De Minimis Entry (Entry Type 86):</b> This provision is a major facilitator for the global e-commerce industry.
                <ul className="list-disc ml-6">
                  <li><b>Value Threshold:</b> An administrative exemption from both duty and tax for shipments with a fair retail value of US$800 or less, imported by one person on one day.</li>
                  <li><b>Process:</b> A highly streamlined electronic process. Shipments can be cleared directly off the carrier's manifest or through a specific electronic filing known as an "Entry Type 86".</li>
                  <li><b>Exclusions:</b> The de minimis exemption does not apply to goods that require inspection as a condition of release, goods subject to anti-dumping/countervailing duties, or goods subject to quota.</li>
                </ul>
              </li>
            </ul>
            <div className="overflow-x-auto mb-4">
              <div className="text-sm font-semibold mb-2">Table: USA - Entry Types at a Glance</div>
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Feature</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Section 321 (Type 86)</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Informal Entry (Type 11)</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Formal Entry (Type 01)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Value Threshold</td>
                    <td className="border border-gray-300 px-3 py-2">US$800 or less</td>
                    <td className="border border-gray-300 px-3 py-2">US$801−US$2,500</td>
                    <td className="border border-gray-300 px-3 py-2">Over US$2,500</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Duties & Taxes</td>
                    <td className="border border-gray-300 px-3 py-2">None</td>
                    <td className="border border-gray-300 px-3 py-2">Applicable duties & taxes apply</td>
                    <td className="border border-gray-300 px-3 py-2">Applicable duties & taxes apply</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Customs Broker</td>
                    <td className="border border-gray-300 px-3 py-2">Not required</td>
                    <td className="border border-gray-300 px-3 py-2">Optional</td>
                    <td className="border border-gray-300 px-3 py-2">Required</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Customs Bond</td>
                    <td className="border border-gray-300 px-3 py-2">Not required</td>
                    <td className="border border-gray-300 px-3 py-2">Not required</td>
                    <td className="border border-gray-300 px-3 py-2">Mandatory</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Documentation Level</td>
                    <td className="border border-gray-300 px-3 py-2">Minimal (Manifest or Type 86)</td>
                    <td className="border border-gray-300 px-3 py-2">Simplified</td>
                    <td className="border border-gray-300 px-3 py-2">Full (Entry & Entry Summary)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Typical Use Case</td>
                    <td className="border border-gray-300 px-3 py-2">E-commerce, couriers, mail</td>
                    <td className="border border-gray-300 px-3 py-2">Low-value commercial goods</td>
                    <td className="border border-gray-300 px-3 py-2">Standard commercial shipments</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4 className="font-semibold mt-5 mb-2">2.4 Filing the Entry: CBP Form 3461 and CBP Form 7501</h4>
            <p>For a formal entry, the filing process is divided into two distinct electronic steps, both managed through CBP's Automated Commercial Environment (ACE) portal.</p>
            <ol className="list-decimal ml-6 mb-2">
              <li><b>Step 1: Securing Release of the Merchandise.</b> The importer's broker files CBP Form 3461, the "Application and Special Permit for Immediate Delivery," or an electronic equivalent. This filing, accompanied by the commercial invoice and evidence of the right to make entry (e.g., the bill of lading), is what CBP uses to determine if the merchandise can be physically released from its custody at the port.</li>
              <li><b>Step 2: Filing the Entry Summary.</b> Within 10 working days of the goods' release, the broker must file the comprehensive Entry Summary, CBP Form 7501. This document contains all the detailed information necessary for CBP to assess duties, collect trade statistics, and verify compliance with all import requirements. The estimated duties must be deposited with CBP at the time of this filing.</li>
            </ol>
            <h4 className="font-semibold mt-5 mb-2">2.5 Cargo Examination, Release, and Liquidation</h4>
            <p>After the entry is filed, the shipment moves to the final stages of the customs process.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Examination:</b> CBP has the absolute right to examine any shipment entering the country. An examination can range from a simple review of the submitted documents to an intensive physical inspection of the cargo, where containers are opened and contents are verified against the packing list and invoice.</li>
              <li><b>Release:</b> If the entry is in order and no legal or regulatory violations are found during examination (or if examination is waived), CBP will issue a release, and the shipment is cleared to leave the port and enter U.S. commerce.</li>
              <li><b>Liquidation:</b> This is the final, legally binding step in the entry process. CBP reviews the entry summary and makes its final determination of the amount of duties and taxes owed. For formal entries, this can occur months or even up to a year after the goods have been released. If CBP's calculation differs from the estimated duties paid, the importer will either receive a bill for additional duties or a refund for overpayment. This finality is what "closes the books" on a specific import transaction.</li>
            </ul>
            {/* Section 3: U.S. Documentation Deep Dive */}
            <h3 id="1-3" className="text-base font-semibold mt-4 mb-2">3. U.S. Documentation Deep Dive</h3>
            <p>The accuracy and completeness of documentation are the bedrock of a compliant import program. Errors or omissions on these key documents are the most common cause of delays, examinations, and penalties.</p>
            <h4 className="font-semibold mt-5 mb-2">3.1 The Commercial Invoice: The Cornerstone Document</h4>
            <p>The Commercial Invoice is the single most important document in the U.S. import process. It is not merely a bill of sale; it is a legal declaration that provides CBP with the essential information needed to determine the shipment's admissibility, classify the goods, establish the customs value, and assess the correct duties and taxes. The accuracy of this document directly dictates the financial and operational outcome of the customs clearance. Any error—a vague description leading to misclassification, an incorrect value, a missing country of origin—will result in an incorrect duty calculation, leading to either underpayment (risking penalties) or overpayment (eroding profit margins). A poorly prepared invoice is also a primary red flag for CBP, significantly increasing the likelihood of a time-consuming and costly cargo examination.</p>
            <h5 className="font-semibold mt-4 mb-1">Key Required Elements:</h5>
            <p>A compliant commercial invoice for U.S. customs must contain the following information in English:</p>
            <ol className="list-decimal ml-6 mb-2">
              <li><b>Parties to the Transaction:</b> The full name and address of the seller (shipper), the buyer (sold-to party), and the ultimate consignee (ship-to party, if different).</li>
              <li><b>Invoice Details:</b> A unique invoice number and the date of issuance.</li>
              <li><b>Shipment Details:</b> The mode of transport and the carrier's tracking number (Bill of Lading or Air Waybill number).</li>
              <li><b>Country of Origin:</b> The country where the goods were manufactured, produced, or grown. This is not the country from which the goods were shipped.</li>
              <li><b>Detailed Description of Goods:</b> This is one of the most critical fields. Vague descriptions like "parts" or "electronics" are unacceptable. The description must be precise enough for CBP to classify the product without ambiguity. It should answer: What is the item? What is it made of? What is its intended use? Include part or model numbers where applicable.</li>
              <li><b>Quantity and Unit of Measure:</b> The number of units for each line item (e.g., pieces, dozens, kilograms).</li>
              <li><b>Value:</b> The unit price and total price for each line item, as well as the total invoice value.</li>
              <li><b>Currency of Settlement:</b> The currency in which the transaction will be paid (e.g., USD, EUR).</li>
              <li><b>Terms of Sale (Incoterms):</b> The agreed-upon Incoterm (e.g., FOB, CIF, DDP) that defines the responsibilities of the seller and buyer.</li>
              <li><b>Harmonized Tariff Schedule (HTS) Code:</b> While the importer is ultimately responsible for classification, including the 10-digit HTSUS number on the invoice is a best practice that facilitates clearance.</li>
            </ol>
            <p>A visual example of a correctly completed Commercial Invoice, with each of these fields highlighted and explained, is an essential tool for any import compliance program.</p>
            <h4 className="font-semibold mt-5 mb-2">3.2 The Packing List: The Shipment's Inventory</h4>
            <p>The Packing List is a supplementary document that provides a detailed inventory of the shipment's contents. It must align perfectly with the information on the Commercial Invoice.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Purpose:</b> Its primary function is to detail the contents, quantity, weight, and dimensions of each individual package within the shipment.</li>
              <li><b>Function:</b> The Packing List is used by CBP to physically verify the cargo during an examination. It is also used by freight forwarders to create the Bill of Lading and by the consignee at the destination to tally the received goods against their purchase order.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">3.3 The Bill of Lading (BOL) / Air Waybill (AWB): Title and Contract</h4>
            <p>This document is the legal contract between the shipper and the carrier, and it is essential for taking possession of the goods.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Definition:</b> The BOL (for ocean freight) or AWB (for air freight) is a multi-functional, legally binding document issued by the carrier. It serves as:
                <ol className="list-decimal ml-6">
                  <li>A receipt confirming the carrier has taken possession of the goods.</li>
                  <li>A contract of carriage outlining the terms and conditions of transport.</li>
                  <li>A document of title to the goods, meaning the holder of the original document has the right to claim the cargo.</li>
                </ol>
              </li>
              <li><b>Importance:</b> The importer or their agent must present the original BOL or AWB (or an electronic "telex release" for ocean freight) to the carrier at the destination to secure the release of the cargo.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">3.4 Certificate of Origin (COO): Proving Where Goods Are Made</h4>
            <p>A Certificate of Origin is a formal document that attests to the country where the imported goods were manufactured, produced, or grown.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Purpose:</b> While not required for all imports, the COO is critically important in specific situations.</li>
              <li><b>Function:</b> Its primary use is to claim preferential duty rates under Free Trade Agreements (FTAs). For example, to benefit from the zero-duty provisions of the United States-Mexico-Canada Agreement (USMCA), an importer must have a valid certification of origin. COOs are also used to enforce trade remedies, such as anti-dumping or countervailing duties, which are specific to goods from certain countries.</li>
            </ul>
            {/* Section 4: Navigating U.S. Partner Government Agencies (PGAs) */}
            <h3 id="1-4" className="text-base font-semibold mt-4 mb-2">4. Navigating U.S. Partner Government Agencies (PGAs)</h3>
            <p>While CBP manages the entry of all goods, many products are also subject to the regulations of other federal agencies. These Partner Government Agencies (PGAs), also known as Other Government Agencies (OGAs), have their own distinct set of rules, and compliance with them is a non-negotiable prerequisite for importation. PGA compliance is not an extension of customs compliance; it is a parallel and often more stringent regulatory hurdle that must be cleared before CBP will grant final release. A shipment can be perfectly compliant with all CBP rules regarding value and classification yet be refused entry by the Food and Drug Administration (FDA) for improper labeling. For any regulated product, the importer's first compliance question should not be "What is the duty rate?" but rather, "Which PGA(s) regulate this product, and what are their specific pre-market and at-entry requirements?"</p>
            <h4 className="font-semibold mt-5 mb-2">4.1 Introduction to the PGA Ecosystem and ACE</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>What are PGAs?</b> PGAs are specialized U.S. government bodies responsible for protecting public health, safety, the environment, and domestic agriculture. They collaborate with CBP, which acts as the enforcement arm at the border.</li>
              <li><b>The Role of ACE:</b> The Automated Commercial Environment (ACE) is the U.S. government's "single window" for trade processing. It allows importers and their brokers to submit all required data for both CBP and participating PGAs through a single, unified electronic system, streamlining the clearance process.</li>
              <li><b>Impact on Imports:</b> PGA involvement adds layers of complexity to the import process. It can introduce requirements for special permits, licenses, pre-market approvals, and additional data submissions at the time of entry. This can lead to increased costs, potential delays for inspection, and the ultimate risk of refusal of entry. If a PGA refuses a shipment, CBP is legally bound to prevent those goods from entering U.S. commerce.</li>
            </ul>
            <div className="overflow-x-auto mb-4">
              <div className="text-sm font-semibold mb-2">Table: Key Partner Government Agencies (PGAs) and Regulated Products</div>
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Agency (Full Name & Acronym)</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Regulated Products (Examples)</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Key Requirement Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Food and Drug Administration (FDA)</td>
                    <td className="border border-gray-300 px-3 py-2">Food, beverages, dietary supplements, drugs, medical devices, cosmetics, radiation-emitting electronics</td>
                    <td className="border border-gray-300 px-3 py-2">Facility Registration, Prior Notice</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Department of Agriculture (USDA)</td>
                    <td className="border border-gray-300 px-3 py-2">Live animals, meat, poultry, eggs, plants, seeds, wood, fruits, vegetables</td>
                    <td className="border border-gray-300 px-3 py-2">Import Permit, Phytosanitary Certificate</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Environmental Protection Agency (EPA)</td>
                    <td className="border border-gray-300 px-3 py-2">Vehicles, engines, pesticides, chemicals, ozone-depleting substances</td>
                    <td className="border border-gray-300 px-3 py-2">Declaration Form (3520-1), TSCA Certification</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Consumer Product Safety Commission (CPSC)</td>
                    <td className="border border-gray-300 px-3 py-2">Toys, children's products, apparel, household goods, electronics</td>
                    <td className="border border-gray-300 px-3 py-2">Certificate of Conformity (GCC/CPC)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Bureau of Alcohol, Tobacco, Firearms and Explosives (ATF)</td>
                    <td className="border border-gray-300 px-3 py-2">Alcoholic beverages, tobacco products, firearms, ammunition, explosives</td>
                    <td className="border border-gray-300 px-3 py-2">Permit, Special Taxes</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Fish and Wildlife Service (FWS)</td>
                    <td className="border border-gray-300 px-3 py-2">Wildlife, animal products (leather, fur), plants listed under CITES</td>
                    <td className="border border-gray-300 px-3 py-2">Declaration Form (3-177), CITES Permit</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h4 className="font-semibold mt-5 mb-2">4.2 Food & Drug Administration (FDA): Protecting Public Health</h4>
            <ol className="list-decimal ml-6 mb-2">
              <li><b>Facility Registration:</b> Any foreign facility that manufactures, processes, packs, or holds food for consumption in the United States must be registered with the FDA. This registration must be renewed every two years.</li>
              <li><b>Designation of a U.S. Agent:</b> As part of the registration process, each foreign facility must designate a U.S. Agent. This agent must reside or maintain a place of business in the U.S. and serves as the primary point of communication between the FDA and the foreign facility.</li>
              <li><b>Prior Notice (PN):</b> For every shipment of food destined for the U.S., the importer or their agent must submit a Prior Notice to the FDA. This electronic submission provides the FDA with advance information about the shipment. It must be submitted and confirmed by the FDA before the shipment arrives at the U.S. port. A shipment arriving without a valid PN will be refused entry and held at the port at the importer's expense.</li>
              <li><b>Labeling and Compliance:</b> All imported products must comply with the same labeling regulations as domestic products. This includes requirements for nutrition facts, ingredient lists, allergen declarations, and country of origin marking. Misbranded or adulterated products will be detained.</li>
              <li><b>Entry Screening and Examination:</b> The FDA uses a sophisticated automated screening system called PREDICT to analyze every import entry and assign a risk score. Shipments identified as high-risk are flagged for further review or physical examination. Even low-risk shipments may be randomly selected for examination to verify compliance.</li>
              <li><b>Detention and Refusal:</b> If the FDA finds that a product appears to be in violation of U.S. law (e.g., it is contaminated, mislabeled, or from an unregistered facility), the agency will issue a "Notice of FDA Action" to detain the shipment. The importer is given an opportunity to submit evidence to overcome the violation or to bring the product into compliance (e.g., by relabeling). If the issues cannot be resolved, the FDA will refuse entry, and the product must be destroyed or exported from the U.S. within 90 days.</li>
            </ol>
            <h4 className="font-semibold mt-5 mb-2">4.3 Department of Agriculture (USDA): Safeguarding U.S. Agriculture</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Animal and Plant Health Inspection Service (APHIS):</b> This is the key USDA division for most importers.
                <ul className="list-disc ml-6">
                  <li><b>Permits:</b> APHIS requires import permits for many goods, including live animals, animal products (e.g., certain dairy, unprocessed hides), plants, seeds, and certain fruits and vegetables. Importers must apply for these permits in advance through the APHIS eFile system.</li>
                  <li><b>Phytosanitary/Health Certificates:</b> Many plant and animal products require a government-issued certificate from the country of export, attesting that the goods are free from specific pests or diseases.</li>
                  <li><b>Wood Packaging Material (WPM):</b> APHIS enforces the ISPM 15 standard, which requires all solid wood packaging material (e.g., pallets, crates, dunnage) to be heat-treated or fumigated and marked with an official IPPC stamp to prevent the spread of wood-boring pests.</li>
                </ul>
              </li>
              <li><b>Food Safety and Inspection Service (FSIS):</b> FSIS is responsible for ensuring the safety of imported meat, poultry, and egg products. The requirements are exceptionally strict:
                <ul className="list-disc ml-6">
                  <li><b>Equivalency:</b> Products may only be imported from countries whose food safety inspection systems have been officially determined by FSIS to be "equivalent" to the U.S. system.</li>
                  <li><b>Establishment Certification:</b> The specific foreign establishment that produced the goods must also be certified as eligible to export to the U.S.</li>
                  <li><b>Re-inspection:</b> Every shipment of meat, poultry, and egg products is subject to mandatory re-inspection by FSIS personnel at an approved official import inspection facility upon arrival in the U.S. before it can be released into commerce.</li>
                </ul>
              </li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">4.4 Environmental Protection Agency (EPA): Environmental Protection</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Vehicles and Engines:</b> The EPA enforces strict emission standards under the Clean Air Act.
                <ul className="list-disc ml-6">
                  <li><b>Requirement:</b> Nearly all imported vehicles and engines (including cars, trucks, motorcycles, and nonroad engines like generators) must be certified to meet EPA emission standards.</li>
                  <li><b>EPA Form 3520-1:</b> For any vehicle not imported by its original manufacturer, the importer must complete and submit EPA Form 3520-1, "Declaration Form - Importation of Motor Vehicles," to CBP at the time of entry. This form declares the basis for the vehicle's admission, such as being U.S.-certified, qualifying for an exemption, or being imported for modification.</li>
                  <li><b>Non-Conforming Vehicles:</b> A vehicle that does not meet U.S. standards generally cannot be imported. Exceptions exist for temporary importations (e.g., for racing, display, or repair) with prior EPA approval, or for permanent importation if the vehicle is modified to meet all standards by an EPA-certified Independent Commercial Importer (ICI).</li>
                </ul>
              </li>
              <li><b>Chemicals and Pesticides:</b>
                <ul className="list-disc ml-6">
                  <li><b>Toxic Substances Control Act (TSCA):</b> Importers of chemical substances, mixtures, or articles containing them must certify at the time of entry that the shipment either complies with all applicable TSCA rules or is not subject to TSCA. This is a positive or negative declaration required for each import.</li>
                  <li><b>Pesticides:</b> Importing pesticides is regulated under the Federal Insecticide, Fungicide, and Rodenticide Act (FIFRA) and requires specific EPA registrations and reporting.</li>
                </ul>
              </li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">4.5 Consumer Product Safety Commission (CPSC): Ensuring Product Safety</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Key Requirement: Certificate of Conformity:</b> The cornerstone of CPSC import compliance is the requirement for a written certificate of conformity. This document, which must accompany the shipment and be provided to CBP and CPSC upon request, certifies that the product complies with all applicable CPSC safety rules.
                <ul className="list-disc ml-6">
                  <li><b>General Certificate of Conformity (GCC):</b> For general-use (non-children's) products. The importer must issue a GCC based on a test of each product or a "reasonable testing program." This testing can be done by any laboratory, including the manufacturer's own in-house lab.</li>
                  <li><b>Children's Product Certificate (CPC):</b> For any product designed or intended primarily for children 12 years of age or younger. The importer must issue a CPC, and this certification must be based on passing test results from a CPSC-accepted third-party laboratory. This is a critical and non-negotiable requirement.</li>
                </ul>
              </li>
              <li><b>Import Surveillance:</b> The CPSC works very closely with CBP at U.S. ports of entry to target and examine shipments of consumer products deemed to be high-risk. Using a risk-based methodology, CPSC can request that CBP hold a shipment for examination. If a product is found to be non-compliant, it will be detained and refused entry.</li>
            </ul>
            {/* Section 5: U.S. Tariffs, Duties, and Post-Clearance */}
            <h3 id="1-5" className="text-base font-semibold mt-4 mb-2">5. U.S. Tariffs, Duties, and Post-Clearance</h3>
            <p>The final phase of the import process involves the calculation and payment of duties and the long-term responsibilities of the importer.</p>
            <h4 className="font-semibold mt-5 mb-2">5.1 Classifying Your Product with the Harmonized Tariff Schedule (HTS)</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>What it is:</b> The HTSUS is the official U.S. legal document that provides the applicable tariff rates and statistical categories for all merchandise imported into the country. It is maintained and published by the U.S. International Trade Commission (USITC). The system is based on the international 6-digit Harmonized System (HS) but is expanded to 10 digits to provide U.S.-specific detail.</li>
              <li><b>Structure of an HTS Code:</b> The 10-digit code is hierarchical:
                <ul className="list-disc ml-6">
                  <li>Digits 1-2 (Chapter): Broad product category (e.g., Chapter 61: Articles of apparel, knitted or crocheted).</li>
                  <li>Digits 3-4 (Heading): A more specific group within the chapter (e.g., 61.09: T-shirts, singlets...).</li>
                  <li>Digits 5-6 (Subheading): A further refinement. These first 6 digits constitute the international HS code.</li>
                  <li>Digits 7-8 (U.S. Tariff Rate Line): A U.S.-specific subdivision that determines the duty rate.</li>
                  <li>Digits 9-10 (Statistical Suffix): Used for trade data collection.</li>
                </ul>
              </li>
              <li><b>How to Find the Correct HTS Code:</b>
                <ol className="list-decimal ml-6">
                  <li>Use the Official HTS Search Tool: The USITC provides a searchable online version of the HTSUS.</li>
                  <li>Consult the General Rules of Interpretation (GRIs): The HTSUS includes six GRIs that provide the legal framework for classification, which are essential for classifying complex goods, kits, or sets.</li>
                  <li>Search the CROSS Database: The Customs Rulings Online Search System (CROSS) is a database of past legally binding rulings issued by CBP on product classification. Searching for products similar to yours can provide excellent guidance.</li>
                  <li>Seek Expert Advice: A licensed customs broker is an expert in tariff classification. For ultimate certainty, an importer can formally request a binding ruling from CBP, which provides a definitive, legally binding classification for a specific product before it is imported.</li>
                </ol>
              </li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">5.2 Calculating and Paying Duties, Taxes, and Fees</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Duty Calculation:</b> The process involves three steps:
                <ol className="list-decimal ml-6">
                  <li>Determine the Customs Value: For most transactions, this is the "transaction value"—the price actually paid or payable for the goods when sold for exportation to the United States.</li>
                  <li>Find the Duty Rate: Locate the 10-digit HTS code in the HTSUS. The "Rates of Duty" column will provide the applicable rate.</li>
                  <li>Calculate the Duty: Apply the duty rate to the customs value.</li>
                </ol>
              </li>
              <li><b>Types of Duty Rates:</b> The HTSUS specifies three types of duty rates:
                <ul className="list-disc ml-6">
                  <li>Ad Valorem: The most common type, expressed as a percentage of the customs value (e.g., 3.5%).</li>
                  <li>Specific: A fixed amount per unit of quantity (e.g., $0.10 per kilogram).</li>
                  <li>Compound: A combination of an ad valorem rate and a specific rate (e.g., 2% + $0.05 per piece).</li>
                </ul>
              </li>
              <li><b>Other Fees:</b> In addition to duties, most formal entries are subject to other fees, including:
                <ul className="list-disc ml-6">
                  <li>Merchandise Processing Fee (MPF): A fee calculated as a percentage of the value of the goods, with a minimum and maximum amount per entry.</li>
                  <li>Harbor Maintenance Fee (HMF): A fee collected on ocean freight imports to fund the maintenance of U.S. ports and harbors.</li>
                </ul>
              </li>
              <li><b>Payment:</b> The importer of record is responsible for paying all duties and fees. This is typically handled by the customs broker, who will pay CBP on the importer's behalf through the Automated Clearinghouse (ACH) system and then invoice the importer.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">5.3 Record-Keeping Requirements</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Legal Mandate:</b> U.S. customs law requires importers to maintain all records related to their import transactions for a period of five years from the date of entry.</li>
              <li><b>What to Keep:</b> The record-keeping requirement is comprehensive. It includes all entry documents (Commercial Invoice, Packing List, Bill of Lading, CBP Form 7501), proof of payment, transportation documents, and any PGA-related permits, licenses, or certificates.</li>
              <li><b>Importance:</b> Meticulous record-keeping is a fundamental component of demonstrating "reasonable care." In the event of a CBP audit, which can occur years after the import date, the importer must be able to produce these records to substantiate the information declared on the entry.</li>
            </ul>
          </section>
          <section id="part-2" className="mb-8">
            <h2 className="text-lg font-bold mb-3">Part II: Exporting to the European Union</h2>
            <p>This part provides a comprehensive guide to the EU's unique and harmonized customs environment, which operates under a different philosophy and set of procedures than the U.S. system.</p>
            {/* Section 1: Foundational Requirements for EU Imports */}
            <h3 id="2-1" className="text-base font-semibold mt-4 mb-2">1. Foundational Requirements for EU Imports</h3>
            <p>Successfully entering the EU market requires understanding its structure as a single economic bloc and fulfilling several mandatory upfront registration requirements.</p>
            <h4 className="font-semibold mt-5 mb-2">1.1 The EU Customs Union: Principles of a Single Market</h4>
            <p>The European Union operates as a single customs union, a concept that is foundational to all trade with the bloc. This structure has two primary implications for importers:</p>
            <ol className="list-decimal ml-6 mb-2">
              <li><b>Free Circulation:</b> Once goods from a non-EU country have been imported into any one of the 27 Member States—meaning they have cleared customs, and all applicable duties and taxes have been paid—they are considered to be in "free circulation." These goods acquire the status of "Union goods" and can then be moved to any other EU Member State without any further customs formalities or the payment of additional customs duties.</li>
              <li><b>Common Customs Tariff:</b> All 27 Member States apply the exact same set of tariff rates, known as the Common Customs Tariff, to goods imported from outside the EU. This ensures that the duty cost for importing a product is the same whether it enters through Rotterdam, Hamburg, or Le Havre.</li>
            </ol>
            <p>The rules and procedures governing this system are set at the EU level by the Directorate-General for Taxation and Customs Union (DG TAXUD) and are then implemented by the national customs authorities of each Member State (e.g., German Zoll, French Douane). This creates a unified, harmonized, and highly regulated environment.</p>
            <h4 className="font-semibold mt-5 mb-2">1.2 Mandatory EORI Number Registration: Your Key to EU Trade</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>What it is:</b> An EORI number is a unique identifier assigned by a national customs authority to a business (an "economic operator") to track all of its customs-related activities across the entire EU.</li>
              <li><b>Requirement:</b> An EORI number is mandatory for any business that lodges a customs declaration to import goods into or export goods from the EU. Without an EORI number, a customs declaration cannot be filed, and goods cannot be cleared.</li>
              <li><b>How to Obtain:</b> A company based outside the EU must apply for an EORI number from the customs authority of the first EU Member State to which it intends to ship goods. For example, a U.S. company whose first EU shipment will land in Germany must apply to the German customs authorities for an EORI number. Once this number is issued, it is valid and can be used for customs clearances in all 27 EU Member States. There is no need to obtain a separate EORI number for each country.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">1.3 The Role of the Importer of Record (IOR) and Fiscal Representatives</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Definition:</b> The IOR is the entity legally responsible for the import. This includes ensuring the goods comply with all EU regulations, filing the correct customs declaration, and paying all applicable duties and taxes.</li>
              <li><b>The Non-EU Challenge:</b> A critical rule is that the IOR must be an entity established within the European Union. This means that a U.S.-based exporter, for example, cannot typically act as the IOR for its own shipments into the EU. This presents a major hurdle for companies wishing to sell on a Delivered Duty Paid (DDP) basis or to stock goods in an EU-based fulfillment center, as major e-commerce platforms like Amazon will not act as the IOR.</li>
              <li><b>Solutions for Non-EU Sellers:</b> To overcome this, a non-EU company must establish a relationship with an EU-based entity to take on the legal and financial responsibilities of the import. The primary options are:
                <ol className="list-decimal ml-6">
                  <li>The EU-based Consignee: In a traditional B2B sale, the buyer or client located in the EU can act as the IOR.</li>
                  <li>Third-Party IOR Service: For DDP or e-commerce fulfillment models, the exporter can contract with a specialized service provider in the EU that will act as the IOR on their behalf for a fee.</li>
                  <li>Fiscal Representative: In addition to the IOR, a non-EU company may need to appoint a fiscal representative in the country of import to handle its Value-Added Tax (VAT) registration and reporting obligations.</li>
                </ol>
              </li>
            </ul>
            <p>This IOR requirement is a fundamental business setup decision that must be addressed before any logistical planning can begin. It necessitates finding and vetting a reliable partner within the EU to act in this critical legal capacity.</p>
            <h4 className="font-semibold mt-5 mb-2">1.4 Understanding Value-Added Tax (VAT) and the Import One-Stop Shop (IOSS)</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>The 2021 VAT Overhaul:</b> On July 1, 2021, the previous low-value consignment relief, which exempted shipments valued under €22 from VAT, was abolished. As a result, ALL commercial goods imported into the EU, regardless of their value, are now subject to VAT at the rate applicable in the destination country.</li>
              <li><b>VAT Registration:</b> VAT is a country-specific tax. A business importing goods into the EU may be required to register for a VAT number in the country of import to account for the tax. A company may need multiple VAT registrations if it imports into and sells from several different EU countries.</li>
              <li><b>The Import One-Stop Shop (IOSS):</b> To manage the new VAT rules for low-value e-commerce sales, the EU introduced an electronic simplification scheme called the IOSS.
                <ul className="list-disc ml-6">
                  <li><b>Purpose:</b> The IOSS is designed for B2C sales of goods in consignments with an intrinsic value not exceeding €150.</li>
                  <li><b>How it Works:</b> A non-EU e-commerce seller can register for the IOSS scheme in a single EU Member State. When a sale is made to an EU customer, the seller charges the customer the correct VAT rate of the destination country at the point of sale. The seller then declares and pays all the VAT collected from all EU sales via a single, monthly electronic IOSS return filed in the Member State where they are registered.</li>
                  <li><b>Benefit:</b> When a shipment is sent using a valid IOSS number, it is exempt from the collection of import VAT at the border. This allows for a "green channel" customs clearance and ensures a fast, seamless delivery to the customer, with no surprise charges upon arrival.</li>
                  <li><b>Use is Optional but Recommended:</b> Using the IOSS is not mandatory. However, if it is not used for a sub-€150 shipment, the VAT will be collected from the customer by the transport company (e.g., postal service or courier) upon delivery. This process invariably involves an additional "handling fee" charged by the carrier, leading to unexpected costs and a negative customer experience.</li>
                </ul>
              </li>
            </ul>
            {/* Section 2: The EU Customs Entry Process: A Step-by-Step Guide */}
            <h3 id="2-2" className="text-base font-semibold mt-4 mb-2">2. The EU Customs Entry Process: A Step-by-Step Guide</h3>
            <p>The EU customs entry process is a highly digitized and harmonized procedure that follows a clear, sequential path from pre-arrival to final release.</p>
            <h4 className="font-semibold mt-5 mb-2">2.1 Pre-Arrival: The Entry Summary Declaration (ENS)</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>What it is:</b> The ENS is a mandatory electronic declaration containing safety and security data about a shipment. It is filed before the goods arrive at the first point of entry into the EU customs territory, allowing customs authorities to perform a risk analysis.</li>
              <li><b>Who Files:</b> The legal responsibility for lodging the ENS lies with the carrier of the goods (i.e., the shipping line, airline, or road haulier).</li>
              <li><b>Deadlines:</b> The deadline for filing the ENS varies by the mode of transport. For example:
                <ul className="list-disc ml-6">
                  <li>Containerized Sea Freight: At least 24 hours before loading begins at the foreign port.</li>
                  <li>Short-Haul Flights (under 4 hours): By the actual time of take-off.</li>
                  <li>Road Freight: At least 1 hour before arrival at the EU border.</li>
                </ul>
              </li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">2.2 Arrival and Temporary Storage</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Presentation to Customs:</b> The carrier presents the goods to the customs authority at the port or airport of arrival. The goods are then moved into a temporary storage facility, which is a customs-approved area (e.g., a terminal or warehouse).</li>
              <li><b>Time Limit:</b> Goods can remain in temporary storage for a maximum of 90 days. Within this period, a formal customs declaration must be lodged to assign the goods to a customs-approved treatment or use (e.g., release for free circulation, transit, warehousing).</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">2.3 Lodging the Customs Declaration: The Single Administrative Document (SAD)</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>The Central Document:</b> The Single Administrative Document (SAD) is the universal form used for all types of customs declarations across the EU, including imports, exports, and transit.</li>
              <li><b>Electronic Filing:</b> In modern practice, the SAD is not a paper form but an electronic data set. The declaration must be lodged electronically through the national customs IT system of the Member State where the goods are being cleared (for example, the ATLAS system in Germany or the DELTA system in France).</li>
              <li><b>Who Can File:</b> The declaration can be lodged by the Importer of Record (IOR) or, more commonly, by a direct or indirect representative (such as a customs agent or freight forwarder) acting on the IOR's behalf.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">2.4 Customs Controls: Documentary, Identity, and Physical Checks</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Documentary Check (Green Lane):</b> A review of the electronic customs declaration and any supporting documents submitted. If everything is in order, the goods are released.</li>
              <li><b>Identity Check (Orange Lane):</b> A customs officer verifies that the goods themselves match the description provided in the documentation. This may involve checking seals, marks, and numbers on the packages.</li>
              <li><b>Physical Check (Red Lane):</b> The most intensive control, involving a physical examination of the goods themselves. This may include opening packages, taking samples for laboratory analysis, and verifying quantities.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">2.5 Release for Free Circulation</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Definition:</b> "Release for free circulation" is the customs procedure that confers the status of Union goods on non-Union goods. This occurs after all import requirements have been met, including the payment (or securing) of all customs duties and VAT, and compliance with all trade policy measures and product safety regulations.</li>
              <li><b>Effect:</b> Once released, the goods are no longer under customs supervision. They can be moved, sold, and used anywhere within the EU's single market, just like goods produced within the EU.</li>
            </ul>
            {/* Section 3: EU Documentation Deep Dive */}
            <h3 id="2-3" className="text-base font-semibold mt-4 mb-2">3. EU Documentation Deep Dive</h3>
            <p>The EU's harmonized system relies on standardized documents that carry specific legal weight and data requirements. Precision is paramount.</p>
            <h4 className="font-semibold mt-5 mb-2">3.1 The Single Administrative Document (SAD): A Box-by-Box Explanation</h4>
            <p>The SAD, or its electronic data equivalent, is the legal declaration that underpins the entire import process. It is a complex document with 54 boxes, though not all are required for every procedure. The electronic filing systems of the Member States guide the declarant through the necessary fields based on the chosen customs procedure.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Structure and Purpose:</b> The SAD is designed to cover any customs procedure (import, export, transit) and serves as the basis for calculating duties, applying trade policy measures, and collecting statistics. The original paper form had 8 color-coded copies for different purposes, a structure that is mirrored in the logic of the electronic systems.</li>
              <li><b>Key Boxes / Data Elements:</b> While a customs agent will handle the full declaration, importers must provide the accurate data for the most critical fields:
                <ul className="list-disc ml-6">
                  <li>Box 2: Consignor/Exporter: The full name and address of the party sending the goods.</li>
                  <li>Box 8: Consignee: The full name and address of the party receiving the goods in the EU.</li>
                  <li>Box 14: Declarant/Representative: The details of the party lodging the declaration (often the customs agent), including their EORI number.</li>
                  <li>Box 22: Invoice Value and Currency: The total value of the goods as stated on the commercial invoice.</li>
                  <li>Box 31: Packages and Description of Goods: A precise and detailed description of the goods. Vague terms like "gifts" or "clothing" are unacceptable and will lead to rejection or delays. The description must be specific (e.g., "men's 100% cotton t-shirt").</li>
                  <li>Box 33: Commodity Code: This is one of the most important fields. It requires the full 10-digit (or longer) TARIC code for the product.</li>
                  <li>Box 34: Country of Origin Code: The two-letter ISO code for the country where the goods were manufactured.</li>
                  <li>Box 37: Customs Procedure Code (CPC): A 7-digit code that tells customs exactly what is being done with the goods (e.g., "40 00 000" for permanent import/release for free circulation).</li>
                  <li>Box 44: Additional Information/Documents Produced: This field is used to reference any required licenses, permits, certificates (e.g., Certificate of Origin, Health Certificate), or other authorizations.</li>
                  <li>Box 47: Calculation of Taxes: This section details the calculation of customs duty, VAT, and any other applicable taxes.</li>
                </ul>
              </li>
            </ul>
            <p>For reference, a specimen of the SAD form can be found on the European Commission's website, and a blank UK transit version (C88) illustrates the layout.</p>
            <h4 className="font-semibold mt-5 mb-2">3.2 The Commercial Invoice: EU-Specific Requirements</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Key Elements:</b> It must contain the full details of the exporter and importer (including EORI number), a unique invoice number and date, the Incoterms of the sale, the currency of payment, and a line-by-line breakdown of the goods. Each line item must have a precise description, quantity, unit value, and total value.</li>
              <li><b>Important Note:</b> Pro-forma invoices are generally not accepted by EU customs authorities for final clearance; a final, official commercial invoice is required.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">3.3 Transport Documents (CMR, B/L, AWB)</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>CMR Waybill:</b> The standard international consignment note for goods transported by road.</li>
              <li><b>Bill of Lading (B/L):</b> The document of title for goods transported by sea.</li>
              <li><b>Air Waybill (AWB):</b> The consignment note for goods transported by air.</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">3.4 Proof of Origin: Preferential vs. Non-Preferential</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Non-Preferential Origin:</b> A standard Certificate of Origin, often issued by a Chamber of Commerce, certifies the country of manufacture for general trade policy purposes (e.g., applying anti-dumping duties).</li>
              <li><b>Preferential Origin:</b> This is far more valuable. It allows goods to benefit from reduced or zero-duty rates under a Free Trade Agreement (FTA) between the EU and the exporting country. To claim these benefits, a specific proof of preferential origin must be presented at customs. This can be a movement certificate like an EUR.1, or for many modern agreements, a statement on origin made out by the exporter on the invoice. To be eligible to make such a statement for higher-value shipments, the exporter may need to be registered in the EU's Registered Exporter (REX) system.</li>
            </ul>
            {/* Section 4: Navigating EU Product Compliance & Safety Regimes */}
            <h3 id="2-4" className="text-base font-semibold mt-4 mb-2">4. Navigating EU Product Compliance & Safety Regimes</h3>
            <p>For the EU, product compliance is not an afterthought; it is a non-negotiable prerequisite for market access. Unlike the U.S. system where many products are inspected for compliance upon arrival, the EU system often requires that products meet all relevant standards before they are placed on the market. Failure to comply will result in the goods being stopped at the border.</p>
            <h4 className="font-semibold mt-5 mb-2">4.1 CE Marking: The Passport to the EU Market</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Scope:</b> CE marking is mandatory for over 20 product groups, including electronics, toys, machinery, medical devices, and construction products. It is forbidden to affix a CE mark to a product for which it is not required.</li>
              <li><b>Responsibility:</b> The primary responsibility for compliance lies with the manufacturer. They must carry out the conformity assessment and affix the mark. However, an importer who places a product on the EU market has a legal duty to verify that the manufacturer has correctly performed this process. If an importer markets a product under their own brand name, they legally assume all of the manufacturer's responsibilities.</li>
              <li><b>The Conformity Assessment Process (Step-by-Step):</b>
                <ol className="list-decimal ml-6">
                  <li>Identify Applicable Directives/Regulations: The manufacturer must identify all EU directives and regulations that apply to their product. For example, a wireless electronic toy would fall under the Toy Safety Directive, the Radio Equipment Directive (RED), and the RoHS Directive (restriction of hazardous substances).</li>
                  <li>Verify Essential Requirements: They must ensure the product meets all the "essential requirements" laid out in those directives.</li>
                  <li>Testing: The product must be tested against the relevant harmonized European standards (EN standards) to demonstrate conformity.</li>
                  <li>Notified Body Involvement: For some high-risk products, the conformity assessment must be verified by a "Notified Body," which is an independent organization designated by an EU country to carry out this task. For many products, however, the manufacturer can self-certify.</li>
                  <li>Compile the Technical File: The manufacturer must create and maintain a comprehensive Technical File. This file contains all the evidence of conformity, including design drawings, risk assessments, test reports, and component lists. It must be kept for 10 years and made available to market surveillance authorities upon request.</li>
                  <li>Issue the EU Declaration of Conformity (DoC): The manufacturer must draw up and sign a legal EU Declaration of Conformity, a one-page document that formally declares the product's compliance with all relevant directives.</li>
                  <li>Affix the CE Mark: Only after all these steps are completed can the CE mark be physically affixed to the product, its packaging, or its data plate. The mark must be visible, legible, and indelible.</li>
                </ol>
              </li>
            </ul>
            <p>A product arriving at an EU border without a required and valid CE mark will be refused entry. This compliance work must be completed long before the product is ever shipped.</p>
            <h4 className="font-semibold mt-5 mb-2">4.2 REACH: Registration, Evaluation, Authorisation and Restriction of Chemicals</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Importer Obligations:</b>
                <ul className="list-disc ml-6">
                  <li><b>Registration:</b> An EU importer of a chemical substance in quantities of 1 tonne or more per year is legally required to register that substance with the European Chemicals Agency (ECHA). This involves submitting a detailed technical dossier on the substance's properties, uses, and hazards. This is a complex and costly process.</li>
                  <li><b>Only Representative (OR):</b> To ease this burden, a non-EU manufacturer can appoint an EU-based Only Representative to handle the REACH registration on behalf of all its EU importers. When an OR is appointed, the EU importers are then considered "downstream users" with reduced obligations.</li>
                  <li><b>Substances of Very High Concern (SVHCs):</b> REACH maintains a "Candidate List" of SVHCs that are known to be particularly harmful. If an article imported into the EU contains an SVHC above a concentration of 0.1% by weight, the importer has a legal obligation to provide safe use information to their customers and may need to notify ECHA.</li>
                  <li><b>Authorisation and Restriction:</b> Certain highly hazardous substances are placed on the "Authorisation List" (Annex XIV) and cannot be used without specific permission from the European Commission. Others are subject to specific "Restrictions" (Annex XVII) that may limit or ban their use in certain products. Importers are legally responsible for ensuring their products comply with all relevant authorisations and restrictions.</li>
                </ul>
              </li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">4.3 General Product Safety Regulation (GPSR)</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Importer Responsibilities:</b> The GPSR places clear obligations on importers. They must:
                <ul className="list-disc ml-6">
                  <li>Verify that the non-EU manufacturer has taken the necessary steps to ensure the product is safe.</li>
                  <li>Ensure the product is accompanied by the manufacturer's name and contact details, as well as a type, batch, or serial number for traceability.</li>
                  <li>Place their own name and contact details on the product or its packaging. This makes the importer the official point of contact for EU market surveillance authorities.</li>
                  <li>Keep a register of complaints and inform authorities if they believe a product they have placed on the market is unsafe.</li>
                </ul>
              </li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">4.4 EU Food Safety Regulations: Traceability and Health Certificates</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Key Requirements:</b>
                <ul className="list-disc ml-6">
                  <li><b>General Food Law (Regulation 178/2002):</b> This is the foundational law of EU food safety. It establishes the core principles that food must not be unsafe and that food businesses must be able to trace their products one step forward and one step back in the supply chain.</li>
                  <li><b>Official Controls at Border Control Posts (BCPs):</b> All consignments of products of animal origin (e.g., meat, dairy, fish) and certain high-risk foods of non-animal origin must enter the EU through a designated Border Control Post (BCP). At the BCP, they undergo mandatory checks: a documentary check (verifying health certificates), an identity check (matching goods to documents), and a potential physical check (sampling and testing).</li>
                  <li><b>Health Certificates:</b> Consignments of animal products must be accompanied by a specific, official health certificate issued by the competent authority in the exporting country, attesting to their compliance with EU animal and public health requirements.</li>
                  <li><b>TRACES NT:</b> Importers must use the EU's online TRACES NT (Trade Control and Expert System) platform to create a Common Health Entry Document (CHED) to pre-notify the BCP authorities of the impending arrival of consignments of animal products and high-risk foods.</li>
                </ul>
              </li>
            </ul>
            <div className="overflow-x-auto mb-4">
              <div className="text-sm font-semibold mb-2">Table: EU - Key Product Compliance Regimes</div>
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Regime</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Regulated Products (Examples)</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Key Obligation for Importer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">CE Marking</td>
                    <td className="border border-gray-300 px-3 py-2">Electronics, toys, machinery, medical devices, personal protective equipment</td>
                    <td className="border border-gray-300 px-3 py-2">Verify manufacturer has completed conformity assessment, compiled a Technical File, issued a Declaration of Conformity, and correctly affixed the CE mark.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">REACH</td>
                    <td className="border border-gray-300 px-3 py-2">Chemicals, plastics, metals, textiles, paints, finished articles</td>
                    <td className="border border-gray-300 px-3 py-2">Register substances imported &gt;1 tonne/year (or ensure an Only Representative has), communicate hazard info, comply with restrictions and SVHC rules.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">GPSR</td>
                    <td className="border border-gray-300 px-3 py-2">General consumer goods (furniture, kitchenware, sporting goods) not covered by other laws</td>
                    <td className="border border-gray-300 px-3 py-2">Verify product safety, ensure traceability markings are present, and add own contact details to the product/packaging.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Food Safety</td>
                    <td className="border border-gray-300 px-3 py-2">All food and feed, especially products of animal origin, high-risk plants</td>
                    <td className="border border-gray-300 px-3 py-2">Ensure entry via a Border Control Post (BCP), provide official health certificates, pre-notify via TRACES NT, ensure full traceability.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Section 5: EU Tariffs, Duties, and Post-Clearance */}
            <h3 id="2-5" className="text-base font-semibold mt-4 mb-2">5. EU Tariffs, Duties, and Post-Clearance</h3>
            <p>This section covers the financial calculations and administrative follow-up required after goods have been declared to EU customs.</p>
            <h4 className="font-semibold mt-5 mb-2">5.1 Classifying Your Product with the TARIC Database</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>The EU Tariff Code Structure:</b>
                <ul className="list-disc ml-6">
                  <li>HS Code (first 6 digits): The international Harmonized System code, used globally.</li>
                  <li>Combined Nomenclature (CN) (digits 7-8): The EU adds two digits to the HS code to create the 8-digit CN code. This is used for establishing the Common Customs Tariff duties and for collecting EU-wide trade statistics.</li>
                  <li>TARIC Code (digits 9-10 and beyond): The Integrated Tariff of the European Community (TARIC) adds two or more digits to the CN code. These TARIC subheadings do not change the duty rate itself but are used to encode specific EU-wide rules and measures, such as anti-dumping duties, tariff suspensions, tariff quotas, import licenses, or restrictions. The full TARIC code is mandatory on the customs declaration.</li>
                </ul>
              </li>
              <li><b>Using the TARIC Database:</b> The European Commission provides a free, official online TARIC database that is the definitive source for all EU tariff information. A step-by-step process for using it is as follows:
                <ol className="list-decimal ml-6">
                  <li>Access the official TARIC consultation tool on the European Commission's Taxation and Customs Union website.</li>
                  <li>Begin by searching for the product using keywords or, if known, the first 6 digits of the HS code.</li>
                  <li>Navigate through the hierarchical structure (Chapter -> Heading -> Subheading) to find the correct 8-digit CN code that most accurately describes the product.</li>
                  <li>Select the product's country of origin.</li>
                  <li>The database will then display the full 10-digit TARIC code and a comprehensive list of all applicable measures. This includes the standard "Third Country Duty" rate, any available preferential tariff rates under trade agreements, and details of any other regulations, restrictions, or required certificates.</li>
                </ol>
              </li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">5.2 Calculating and Paying Customs Duties and VAT</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Duty Calculation:</b> The customs duty payable is calculated by applying the duty rate found in the TARIC database to the customs value of the goods. The customs value is typically the transaction value (the price paid for the goods) plus the cost of transport and insurance to the EU border (the CIF value).</li>
              <li><b>VAT Calculation:</b> Import VAT is a separate tax levied at the time of importation. The VAT rate is that of the EU country of import. The taxable amount for import VAT is calculated on the customs value plus the customs duty paid plus any additional costs (like transport and insurance) incurred up to the final destination within the EU.</li>
              <li><b>Payment:</b> Duties and VAT are typically due at the time the customs declaration is accepted and the goods are released. Many businesses use a "deferment account," which is a financial guarantee held with the national customs authority that allows them to defer payment of duties and VAT until a later date (e.g., on a monthly basis).</li>
            </ul>
            <h4 className="font-semibold mt-5 mb-2">5.3 Record-Keeping and Audits</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Requirement:</b> All businesses involved in importing into the EU are legally required to keep complete records of their customs transactions. This includes copies of the SAD (or electronic declaration data), commercial invoices, transport documents, proofs of origin, and any other relevant certificates or licenses.</li>
              <li><b>Retention Period:</b> The required retention period is determined by the national legislation of the Member State where the import took place, but it is typically between 3 and 7 years.</li>
              <li><b>Audits:</b> National customs authorities have the right to conduct post-clearance audits to verify the accuracy of customs declarations. These audits can take place years after the goods have been imported and can result in demands for back-payment of duties and significant penalties if errors are found.</li>
            </ul>
          </section>
          <section id="part-3" className="mb-8">
            <h2 className="text-lg font-bold mb-3">Part III: Playbook Implementation &amp; Resources</h2>
            <p>This final part provides actionable resources to help businesses integrate the knowledge from this playbook into a robust and visible compliance strategy.</p>
            {/* Section 1: Building a Digital-First Compliance Strategy with SEO */}
            <h3 id="3-1" className="text-base font-semibold mt-4 mb-2">1. Building a Digital-First Compliance Strategy with SEO</h3>
            <p>In the digital age, being compliant is only half the battle; being visible to potential customers seeking compliant partners is equally important. A targeted Search Engine Optimization (SEO) strategy can transform this playbook's content from an internal reference into a powerful tool for lead generation.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Keyword Strategy for Visibility:</b> A successful SEO strategy for logistics and international trade must target users at different stages of their inquiry.
                <ul className="list-disc ml-6">
                  <li><b>Core Transactional Keywords:</b> Used by potential clients actively looking for services (high commercial intent). Examples: "international freight forwarder," "customs brokerage services," "ocean freight rates," "3pl logistics provider," "air freight services".</li>
                  <li><b>Informational &amp; Guide-Based Keywords:</b> Used by individuals seeking to understand complex trade topics. Creating high-quality content that answers these questions establishes authority and attracts potential clients early in their decision-making process. Examples: "how to import to USA," "EU customs declaration process," "what is a CE mark," "HTS code lookup," "EORI number application".</li>
                  <li><b>Geotargeting &amp; Localization:</b> To attract clients in specific regions, use geographically targeted keywords and implement technical SEO best practices. Examples: "customs clearance Los Angeles," "UK import requirements after Brexit". Use <code>hreflang</code> tags to signal to search engines which language and regional version of a page should be shown to users in different locations (e.g., en-us for the U.S., en-gb for the UK).</li>
                </ul>
              </li>
              <li><b>Content Structure for SEO:</b> The structure of this playbook is designed for optimal SEO performance.
                <ul className="list-disc ml-6">
                  <li><b>Headings:</b> Use clear, nested headings (H1, H2, H3) that incorporate target keywords to help search engines understand the document's structure and relevance.</li>
                  <li><b>Dedicated Content:</b> High-value, specific topics identified during keyword research should be expanded into dedicated landing pages or blog posts (e.g., "A Complete Guide to FDA Prior Notice," "Understanding the EU IOSS for E-commerce Sellers").</li>
                  <li><b>Internal Linking:</b> Link between related sections within this playbook (e.g., from the FDA section to the Commercial Invoice section) to help users navigate and signal the relationship between topics to search engines, distributing authority across the site.</li>
                </ul>
              </li>
            </ul>
            {/* Section 2: Legal Disclaimer & Best Practices */}
            <h3 id="3-2" className="text-base font-semibold mt-4 mb-2">2. Legal Disclaimer &amp; Best Practices</h3>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Comprehensive Legal Disclaimer:</b> Any guide providing information on international trade compliance must include a robust legal disclaimer to manage liability and set clear expectations for the user. The following points are essential:
                <ul className="list-disc ml-6">
                  <li><b>For Informational Purposes Only:</b> This playbook is intended to provide general summary information and guidance to the trade community. It is not intended to provide, and should not be relied upon as, legal advice. There is no substitute for consulting the official statutes and regulations or for obtaining advice from a qualified professional (e.g., licensed customs broker, trade attorney).</li>
                  <li><b>Primacy of Official Sources:</b> The information contained herein is based on laws, regulations, and administrative practices that are subject to change. In the event of any inconsistency between this guide and the official legal texts published by government authorities (e.g., U.S. Customs and Border Protection, the European Commission), the official texts are controlling.</li>
                  <li><b>No Warranty of Accuracy:</b> Every effort has been made to ensure the accuracy and reliability of the information provided. However, the information is provided "as is" without warranty of any kind. The authors and publishers do not accept any responsibility or liability for the accuracy, content, completeness, or legality of the information contained herein.</li>
                  <li><b>Shared Responsibility and Compliance:</b> The importer of record is solely responsible for ensuring compliance with all applicable laws and regulations in the country of import. Reliance solely on the general information in this playbook may not be considered the exercise of "reasonable care" or fulfill all legal obligations.</li>
                  <li><b>Third-Party Links:</b> This playbook may contain links to external websites owned and operated by third parties. Such links are provided for convenience only. The authors and publishers have no control over the content of such sites and do not endorse, and are not responsible for, the information, products, or services they offer.</li>
                </ul>
              </li>
              <li><b>Final Checklist for Compliant Importing:</b> A one-page summary checklist for both the U.S. and EU, covering the key steps from pre-shipment to post-clearance, can serve as a quick reference tool for logistics professionals.</li>
            </ul>
            <div className="overflow-x-auto mb-4">
              <div className="text-sm font-semibold mb-2">Checklist: Key Steps for U.S. and EU Import Compliance</div>
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Step</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">U.S. Import</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">EU Import</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Pre-Shipment</td>
                    <td className="border border-gray-300 px-3 py-2">Obtain Importer ID, Customs Bond, Engage Broker, PGA Permits</td>
                    <td className="border border-gray-300 px-3 py-2">EORI Registration, Appoint IOR, VAT/Fiscal Rep, Product Compliance</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Documentation</td>
                    <td className="border border-gray-300 px-3 py-2">Commercial Invoice, Packing List, BOL/AWB, COO, PGA Docs</td>
                    <td className="border border-gray-300 px-3 py-2">Commercial Invoice, SAD, CMR/BOL/AWB, Proof of Origin, Compliance Docs</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Customs Entry</td>
                    <td className="border border-gray-300 px-3 py-2">ISF Filing, Entry Summary, PGA Clearance, Duty Payment</td>
                    <td className="border border-gray-300 px-3 py-2">ENS Filing, Customs Declaration, Duty/VAT Payment, Controls</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Post-Clearance</td>
                    <td className="border border-gray-300 px-3 py-2">Record-Keeping, Audit Readiness, Ongoing Compliance</td>
                    <td className="border border-gray-300 px-3 py-2">Record-Keeping, Audit Readiness, Ongoing Compliance</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Section 3: Glossary of Terms */}
            <h3 id="3-3" className="text-base font-semibold mt-4 mb-2">3. Glossary of Terms</h3>
            <ul className="list-disc ml-6 mb-2">
              <li><b>ACE (Automated Commercial Environment):</b> The U.S. government's "single window" portal for processing import and export data.</li>
              <li><b>APHIS (Animal and Plant Health Inspection Service):</b> The division of the USDA that regulates imports of plants, animals, and related products to prevent the spread of pests and diseases.</li>
              <li><b>AWB (Air Waybill):</b> The transport document for goods shipped by air.</li>
              <li><b>BOL (Bill of Lading):</b> The transport document and document of title for goods shipped by sea.</li>
              <li><b>CBP (U.S. Customs and Border Protection):</b> The U.S. agency responsible for managing, controlling, and protecting the nation's borders, including the administration of import laws.</li>
              <li><b>CE (Conformité Européenne):</b> A mandatory conformity marking for certain products sold within the European Economic Area.</li>
              <li><b>CPC (Children's Product Certificate):</b> A mandatory self-issued certificate for children's products imported into the U.S., based on third-party testing.</li>
              <li><b>CPSC (Consumer Product Safety Commission):</b> The U.S. agency that regulates the safety of most consumer products.</li>
              <li><b>EORI (Economic Operator Registration and Identification):</b> A mandatory identification number for any business conducting customs activities in the EU.</li>
              <li><b>EPA (Environmental Protection Agency):</b> The U.S. agency that regulates imports of vehicles, engines, chemicals, and other environmentally sensitive goods.</li>
              <li><b>FDA (Food and Drug Administration):</b> The U.S. agency that regulates food, drugs, cosmetics, and medical devices.</li>
              <li><b>GCC (General Certificate of Conformity):</b> A mandatory self-issued certificate for general-use products subject to CPSC rules imported into the U.S..</li>
              <li><b>HTS (Harmonized Tariff Schedule):</b> The 10-digit code used in the U.S. to classify imported products and determine duty rates.</li>
              <li><b>IOR (Importer of Record):</b> The entity legally responsible for an import shipment's compliance and payment of duties.</li>
              <li><b>IOSS (Import One-Stop Shop):</b> An optional electronic VAT scheme for low-value B2C e-commerce imports into the EU.</li>
              <li><b>ISF (Importer Security Filing):</b> A mandatory pre-arrival data submission to U.S. CBP for all ocean freight shipments.</li>
              <li><b>PGA (Partner Government Agency):</b> A U.S. government agency that works with CBP to regulate specific imported commodities.</li>
              <li><b>REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals):</b> The comprehensive EU regulation governing chemical substances.</li>
              <li><b>SAD (Single Administrative Document):</b> The standard customs declaration form (or electronic data set) used across the EU.</li>
              <li><b>TARIC (Integrated Tariff of the European Community):</b> The EU's online database and 10-digit coding system that integrates all tariff and trade policy measures.</li>
              <li><b>TSCA (Toxic Substances Control Act):</b> The U.S. law governing the import of chemical substances.</li>
              <li><b>USDA (U.S. Department of Agriculture):</b> The U.S. agency that regulates imports of agricultural products.</li>
              <li><b>VAT (Value-Added Tax):</b> A consumption tax applied to goods and services in the EU.</li>
            </ul>
            {/* Section 4: Appendix - Sample Documents */}
            <h3 id="3-4" className="text-base font-semibold mt-4 mb-2">4. Appendix - Sample Documents</h3>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Sample U.S. Commercial Invoice:</b> A visual example of a compliant invoice with callouts explaining the required fields, based on best practices and CBP requirements.</li>
              <li><b>Specimen of the EU Single Administrative Document (SAD) / C88:</b> A visual representation of the blank SAD form (also known as C88 in the UK), illustrating its structure and the data fields required for a declaration.</li>
              <li><b>Example of a Children's Product Certificate (CPC):</b> An illustrative example of a CPC, showing the seven mandatory elements required by the CPSC for children's products imported into the U.S..</li>
              <li><b>EPA Form 3520-1:</b> A direct link to the current version of the EPA's Declaration Form for the Importation of Motor Vehicles and Motor Vehicle Engines, which is required for most non-manufacturer vehicle imports.</li>
            </ul>
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

export default Playbook13; 