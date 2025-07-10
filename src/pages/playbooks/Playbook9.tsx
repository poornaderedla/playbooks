import React, { useState, useRef, useEffect } from 'react';
import Playbook9TOC from './tableOfContents/Playbook9TOC';
import { Progress } from '@/components/ui/progress';

const sections = [
  { id: 'part-1', label: 'Part I: The Regulatory and Administrative Landscape', subs: [
    { id: '1-1', label: '1.1 The Legal Bedrock: The Customs Act, 1962' },
    { id: '1-2', label: '1.2 The Governing Bodies: Navigating the Hierarchy' },
    { id: '1-3', label: '1.3 The Digital Backbone: ICEGATE and the Single Window System' },
  ]},
  { id: 'part-2', label: 'Part II: The Core Clearance Process: A Step-by-Step Guide', subs: [
    { id: '2-1', label: '2.1 The Import Clearance Process' },
    { id: '2-2', label: '2.2 The Export Clearance Process' },
    { id: '2-3', label: '2.3 The Customs Broker: Your Essential Partner' },
  ]},
  { id: 'part-3', label: 'Part III: The Financials of Trade: Valuation, Duties, and Tariffs', subs: [
    { id: '3-1', label: '3.1 The Foundation of Duty: Classification and Valuation' },
    { id: '3-2', label: '3.2 Deconstructing the Import Duty Calculation' },
    { id: '3-3', label: '3.3 Protective and Trade-Remedial Duties' },
    { id: '3-4', label: '3.4 Leveraging Free Trade Agreements (FTAs)' },
  ]},
  { id: 'part-4', label: "Part IV: India's Foreign Trade Policy (FTP) 2023: Schemes and Incentives", subs: [
    { id: '4-1', label: '4.1 Overview of FTP 2023' },
    { id: '4-2', label: '4.2 Duty Remission and Exemption Schemes' },
    { id: '4-3', label: '4.3 Capital Goods and Export Obligation' },
    { id: '4-4', label: '4.4 Emerging Areas and Exporter Recognition' },
  ]},
  { id: 'part-5', label: 'Part V: Advanced Customs Procedures and Special Cargo', subs: [
    { id: '5-1', label: '5.1 Warehousing and Deferred Duty' },
    { id: '5-2', label: '5.2 Specialized Import Schemes' },
    { id: '5-3', label: '5.3 Handling Special and Sensitive Goods' },
  ]},
  { id: 'part-6', label: 'Part VI: Compliance, Risk, and Dispute Resolution', subs: [
    { id: '6-1', label: '6.1 The Role of the Risk Management System (RMS)' },
    { id: '6-2', label: '6.2 Managing Customs Disputes' },
    { id: '6-3', label: '6.3 Refunds and Post-Clearance Audits' },
  ]},
  { id: 'part-7', label: 'Part VII: Practical Toolkit and Appendices', subs: [
    { id: '7-1', label: 'Appendix A: Comprehensive Documentation Checklists' },
    { id: '7-2', label: 'Appendix B: Annotated Document Samples' },
    { id: '7-3', label: 'Appendix C: Process Flowcharts' },
    { id: '7-4', label: 'Appendix D: Key Acronyms and Glossary' },
  ]},
];

const Playbook9 = () => {
  const [activeSection, setActiveSection] = useState('part-1');
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef(null);
  const tocRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // List of all section and subsection IDs for scrollspy
  const sectionIds = sections.flatMap(s => [s.id, ...(s.subs ? s.subs.map(sub => sub.id) : [])]);

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
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 mt-4 font-serif truncate">The Definitive Playbook for Customs Clearance in India</h1>
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
          {/* Part I: The Regulatory and Administrative Landscape */}
          <section id="part-1" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part I: The Regulatory and Administrative Landscape</h2>
            <p>Navigating the customs clearance process in India requires a foundational understanding of the legal and administrative framework that governs the cross-border movement of goods. This landscape is built upon a principal Act of Parliament, administered by two distinct yet interconnected government bodies, and executed through a sophisticated digital infrastructure. Mastery of these three pillars—the law, the agencies, and the platform—is the first and most critical step for any entity engaged in international trade with India.</p>

            <h3 id="1-1" className="text-base font-semibold mt-6 mb-2 truncate">1.1 The Legal Bedrock: The Customs Act, 1962</h3>
            <p>The entire edifice of customs law and procedure in India stands on the foundation of <b>The Customs Act, 1962 (Act No. 52 of 1962)</b>. Enacted on December 13, 1962, and brought into force on February 1, 1963, this Act serves as the primary legislation to "consolidate and amend the law relating to Customs". Its jurisdiction extends to the whole of India and, in certain cases, applies to offences or contraventions committed outside India by any person.</p>
            <p>While the Act's origins date back over six decades, it is a living document. It has been subject to numerous amendments over the years, such as those in 1985, 1988, and 1995, which have introduced new provisions and adapted the law to contemporary trade realities. The establishment of appellate tribunals and provisions for provisional assessment are examples of how the Act has evolved to enhance administrative efficiency and provide structured dispute resolution mechanisms. This dynamic nature means that while the core principles of the Act are stable, its application through rules, notifications, and circulars is constantly updated to reflect new economic policies, technological advancements like e-commerce, and international trade agreements. Therefore, for any trader, compliance is not a static achievement but a process of continuous vigilance and adaptation to the evolving legal landscape.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Key Chapters and Their Significance</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Chapter II: Officers of Customs:</b> Establishes the classes, appointments, and powers of customs officers who are responsible for enforcing the Act.</li>
              <li><b>Chapter III: Appointment of Customs Ports, Airports, etc.:</b> Empowers the government to designate specific locations such as ports, airports, and land customs stations as the sole authorized points for the import and export of goods, defining the "customs area".</li>
              <li><b>Chapter IV: Prohibitions on Importation and Exportation of Goods:</b> Section 11 of the Act grants the Central Government the power to prohibit the import or export of goods for specified purposes, including national security, public order, prevention of smuggling, conservation of foreign exchange, and protection of human, animal, or plant life or health.</li>
              <li><b>Chapter V: Levy of, and Exemption from, Customs Duties:</b> The fiscal core of the Act. It establishes the legal basis for charging duties on goods, the valuation principles for assessment, and the government's power to grant exemptions from duty.</li>
              <li><b>Chapter VII: Clearance of Imported Goods and Export Goods:</b> Outlines the specific procedural requirements for the clearance of goods, including the filing of declarations and the roles of importers and exporters.</li>
              <li><b>Chapter XI: Special Provisions Regarding Baggage, Goods Imported or Exported by Post, Courier and Stores:</b> Provides for differentiated procedures for non-commercial and specialized categories of goods movement.</li>
              <li><b>Chapter XV: Appeals and Revision:</b> Establishes the legal framework for dispute resolution, outlining the hierarchy of appellate authorities from the Commissioner (Appeals) to the Appellate Tribunal (CESTAT) and beyond.</li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Key Definitions (Section 2)</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>"Customs Station":</b> Any customs port, customs airport, international courier terminal, foreign post office, or land customs station.</li>
              <li><b>"Dutiable Goods":</b> Any goods that are chargeable to duty and on which the duty has not yet been paid.</li>
              <li><b>"Importer" / "Exporter":</b> In relation to any goods at any time between their importation/exportation and the time they are cleared by customs, this definition includes any owner, beneficial owner, or any person holding himself out to be the importer or exporter.</li>
            </ul>

            <h3 id="1-2" className="text-base font-semibold mt-6 mb-2 truncate">1.2 The Governing Bodies: Navigating the Hierarchy</h3>
            <p>The administration of India's trade laws is bifurcated between two primary government bodies, each with a distinct mandate. The Central Board of Indirect Taxes and Customs (CBIC) is the enforcer at the border, focused on clearance and revenue collection. The Directorate General of Foreign Trade (DGFT) is the policymaker and promoter, focused on shaping India's overall trade strategy. A successful trade operation requires seamless interaction with both.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">The Central Board of Indirect Taxes and Customs (CBIC)</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Role and Structure:</b> The CBIC is the apex body under the Department of Revenue, Ministry of Finance, responsible for the administration of all indirect taxes in India, including Customs, Goods and Services Tax (GST), and Central Excise. Its primary functions in the context of customs are to formulate and implement policies concerning the levy and collection of customs duties, prevent smuggling and duty evasion, and manage all administrative matters related to Customs establishments. The Board is the ultimate administrative authority for all its subordinate organizations.</li>
              <li><b>Field Formations:</b> The CBIC discharges its functions through a vast network of field formations. These are organized into Zones (headed by Chief Commissioners) and further divided into Commissionerates (headed by Commissioners). These Commissionerates, located at ports, airports, and inland container depots, are the primary interface for importers, exporters, and Customs Brokers. The CBIC also oversees several specialized directorates, including:
                <ul className="list-disc pl-6">
                  <li><b>Directorate of Revenue Intelligence (DRI):</b> The lead intelligence agency for anti-smuggling matters.</li>
                  <li><b>Directorate of Valuation:</b> Deals with complex valuation issues.</li>
                  <li><b>National Academy of Customs, Indirect Taxes and Narcotics (NACIN):</b> The premier training institute for officers.</li>
                </ul>
              </li>
              <li><b>Official Portal:</b> The official website of the CBIC is <a href="https://cbic.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">cbic.gov.in</a>. It serves as a central repository for all customs-related laws, regulations, circulars, and notifications. The portal <a href="https://cbic-gst.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">cbic-gst.gov.in</a> provides integrated services, including a "Know Your Jurisdiction" tool for taxpayers.</li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">The Directorate General of Foreign Trade (DGFT)</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Role and Structure:</b> The DGFT operates under the Ministry of Commerce and Industry and is the principal government body responsible for formulating and implementing India's Foreign Trade Policy (FTP). Its core objective is to promote India's exports and facilitate trade.</li>
              <li><b>Key Responsibilities:</b> The DGFT's functions are geared towards policy and promotion. Its key responsibilities include:
                <ul className="list-disc pl-6">
                  <li>Issuing the Importer-Exporter Code (IEC): A mandatory 10-digit code required for any entity to import or export goods.</li>
                  <li>Administering Export Promotion Schemes: It manages all key schemes designed to make Indian exports more competitive, such as the Advance Authorisation Scheme (AAS), Export Promotion Capital Goods (EPCG) Scheme, and the RoDTEP scheme.</li>
                  <li>Publishing the Foreign Trade Policy (FTP) and Handbook of Procedures (HBP): These documents form the rulebook for all export promotion measures and related procedures.</li>
                </ul>
              </li>
              <li><b>Official Portal:</b> The official website of the DGFT is <a href="https://dgft.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">dgft.gov.in</a>. This portal is a comprehensive platform for traders to apply for an IEC, submit applications for various export schemes, access regulatory updates (Notifications, Public Notices, Circulars), and utilize learning resources.</li>
            </ul>
            <p>This dual-control system establishes a clear cause-and-effect relationship in trade operations. A policy decision by the DGFT, such as the introduction of a new export incentive, directly translates into new procedural requirements and data fields that must be handled by the CBIC's systems at the time of clearance. For example, to claim benefits under the DGFT-administered RoDTEP scheme, an exporter must make a specific declaration in the Shipping Bill, which is a customs document filed on the CBIC's portal. The successful disbursal of the benefit depends on data flowing correctly from the customs system back to the DGFT. Therefore, a trader cannot view these two agencies in isolation; they are two sides of the same coin, and successful navigation of India's trade ecosystem requires a holistic understanding of both policy (DGFT) and procedure (CBIC).</p>

            <h3 id="1-3" className="text-base font-semibold mt-6 mb-2 truncate">1.3 The Digital Backbone: ICEGATE and the Single Window System</h3>
            <p>Modern customs clearance in India is almost entirely a digital process, orchestrated through a single, powerful national portal. This digital transformation has been pivotal in enhancing efficiency, reducing paperwork, and improving transparency.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Introduction to ICEGATE</h4>
            <p>The Indian Customs Electronic Gateway (ICEGATE) is the national portal of the CBIC and serves as the primary interface for the trading community with the Customs department. It is an e-filing service portal that facilitates the electronic exchange of information and documents between traders, cargo carriers, and other regulatory agencies, effectively functioning as a single window for all customs-related transactions. The platform, accessible at <a href="https://icegate.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">icegate.gov.in</a>, has undergone significant upgrades, with the latest version (ICEGATE 2.0) being rolled out in a phased manner since late 2022.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Core Functionalities of ICEGATE</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>E-Filing:</b> Enables the electronic submission of the two most critical customs documents: the Bill of Entry (B/E) for imports and the Shipping Bill (S/B) for exports, along with other declarations like the Import/Export General Manifest.</li>
              <li><b>E-Payment:</b> Traders can make online payments of customs duties, cesses, and other charges securely through an integrated payment gateway that connects with numerous authorized banks.</li>
              <li><b>Document Tracking:</b> The portal provides real-time tracking of the status of customs documents. Importers and exporters can check if their B/E or S/B is under assessment, has been cleared, or if a query has been raised by an officer.</li>
              <li><b>Digital Security:</b> The system uses Digital Signature Certificates (DSC) to ensure the authenticity and legal validity of the documents filed, providing a secure transaction environment.</li>
              <li><b>e-Sanchit:</b> This is a cornerstone facility of ICEGATE that allows traders to upload all supporting documents (like invoices, packing lists, certificates of origin, etc.) in a digital format. Once uploaded, a unique Image Reference Number (IRN) is generated, which is then linked to the B/E or S/B. This has largely eliminated the need to submit physical copies of documents to the customs authorities.</li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Registration and Access</h4>
            <p>Registration on the ICEGATE portal is mandatory for any entity wishing to file documents electronically. The process is straightforward and requires key business identifiers such as the Permanent Account Number (PAN), Importer-Exporter Code (IEC), and Goods and Services Tax Identification Number (GSTIN).</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">The Single Window Interface for Facilitating Trade (SWIFT)</h4>
            <p>A major reform integrated within ICEGATE is the Single Window Interface for Facilitating Trade (SWIFT). Before SWIFT, importers of regulated goods (like food products, pharmaceuticals, or electronics) had to seek separate clearances or No-Objection Certificates (NOCs) from multiple Partner Government Agencies (PGAs). SWIFT streamlines this by allowing the trader to submit a single, integrated declaration on ICEGATE. The system automatically routes the relevant information to the concerned PGAs, such as:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Food Safety and Standards Authority of India (FSSAI)</li>
              <li>Plant Quarantine Information System (PQIS)</li>
              <li>Drug Controller (ADC)</li>
              <li>Animal Quarantine (AQ)</li>
              <li>Wildlife Crime Control Bureau (WCCB)</li>
            </ul>
            <p>These agencies can then view the documents online and record their decision (e.g., Release, Reject, Withhold) directly in the system, which is visible to the Customs officer. This parallel processing significantly reduces dwell time and eliminates the need for traders to physically approach each agency.</p>
            <p>While the digitization of customs processes via ICEGATE has brought immense benefits in terms of speed and transparency, it has also introduced a critical operational dependency. The entire trade ecosystem is now reliant on the stability and performance of this single portal. Official advisories on the ICEGATE portal itself frequently announce planned maintenance activities and acknowledge periods of technical issues that impact filing services or the e-payment gateway. This creates a significant operational risk for businesses. A system outage, especially near critical deadlines such as the end of the month when duty payments are due, can lead to delays, demurrage charges, and disruption of finely tuned supply chains. Consequently, a crucial piece of practical advice for any trader is to build a buffer into their operational timelines. Filings and payments should be planned well in advance, avoiding last-minute submissions to mitigate the risk of being caught in a portal-related technical issue.</p>
          </section>
          {/* Part II: The Core Clearance Process: A Step-by-Step Guide */}
          <section id="part-2" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part II: The Core Clearance Process: A Step-by-Step Guide</h2>
            <p>This section provides a granular, instructional walkthrough of the import and export clearance processes in India. It details the journey of a consignment from pre-arrival preparations to final release, focusing on the practical steps, key documents, and digital procedures executed on the ICEGATE platform.</p>

            <h3 id="2-1" className="text-base font-semibold mt-6 mb-2 truncate">2.1 The Import Clearance Process</h3>
            <p>The import clearance process is a sequential flow of activities involving the carrier, the importer (or their Customs Broker), and the customs authorities. The process has been significantly streamlined through digitization, allowing for many formalities to be completed even before the goods physically arrive in India.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Pre-Arrival Formalities</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Import General Manifest (IGM):</b> The first official step is the filing of the Import General Manifest (IGM) by the carrier (the airline or shipping line). This document, submitted electronically to the Customs system, provides a detailed list of all cargo being brought into the country on a specific vessel or aircraft. It serves as the initial record of the impending arrival of goods.</li>
              <li><b>Prior Bill of Entry:</b> Importers have the facility to file a Prior Bill of Entry up to 30 days before the expected arrival of the vessel or aircraft. This is a significant trade facilitation measure. It allows the importer to submit their declaration and supporting documents, and for customs to complete the assessment and duty calculation process in advance. The importer can even pay the applicable duties before the goods arrive. This ensures that once the goods are unloaded and the IGM is reconciled, the cargo can be cleared immediately, drastically reducing dwell time at the port or airport.</li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Filing the Bill of Entry (B/E): A Detailed Guide</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>What is a Bill of Entry?</b> It is a legally mandated form filed by the importer or their authorized Customs Broker (CB) containing comprehensive details about the importer, the overseas supplier, the carrying vessel/aircraft, and the nature, quantity, classification, and value of the imported goods. This document forms the basis upon which customs assesses the duty liability and grants clearance.</li>
              <li><b>Types of Bill of Entry:</b> Depending on the importer's intention for the goods, one of three types of B/E is filed:
                <ul className="list-disc pl-6">
                  <li><b>Bill of Entry for Home Consumption (White Form):</b> Used when the importer intends to clear the goods immediately for use or sale within India upon payment of all applicable duties.</li>
                  <li><b>Bill of Entry for Warehousing (Into-Bond B/E, Yellow Form):</b> Filed when the importer wishes to defer the payment of customs duty and store the goods in a customs bonded warehouse. The goods are "bonded" until the importer is ready to clear them.</li>
                  <li><b>Ex-Bond Bill of Entry (Green Form):</b> Filed at a later date to clear goods that were previously stored in a bonded warehouse. The importer pays the applicable duties at the time of filing the Ex-Bond B/E to get the goods released for home consumption.</li>
                </ul>
              </li>
              <li><b>Step-by-Step Filing on ICEGATE:</b> The filing process is entirely electronic via the ICEGATE portal.
                <ol className="list-decimal pl-6">
                  <li><b>Login:</b> The importer or their CB logs into the ICEGATE portal using their credentials.</li>
                  <li><b>Document Preparation:</b> The B/E data is prepared using either the free Remote EDI System (RES) software provided by customs or a third-party software. The output is a file in a specific format (e.g., .be).</li>
                  <li><b>File Upload:</b> The prepared file is uploaded to ICEGATE. The portal validates the file format and structure.</li>
                  <li><b>Data Entry:</b> Key details must be accurately entered, including: Importer's details (Name, Address, IEC, GSTIN), Port Code, Invoice Number and Date, Bill of Lading/Airway Bill details, Country of Origin, and detailed item-wise information such as HS Code, quantity, unit price, and value.</li>
                </ol>
              </li>
              <li><b>Uploading Supporting Documents via e-Sanchit:</b> After preparing the B/E, the importer/CB must digitally upload scanned copies of all necessary supporting documents to the e-Sanchit facility on ICEGATE. These typically include:
                <ul className="list-disc pl-6">
                  <li>Commercial Invoice</li>
                  <li>Packing List</li>
                  <li>Bill of Lading (for sea) or Airway Bill (for air)</li>
                  <li>Certificate of Origin (especially if claiming FTA benefits)</li>
                  <li>Insurance Certificate</li>
                  <li>Import License or other permits (if applicable)</li>
                  <li>Any other document required for clearance (e.g., technical write-up, test reports)</li>
                </ul>
                Upon successful upload, the system generates a unique Image Reference Number (IRN) for each document. These IRNs must be linked to the corresponding items in the Bill of Entry. This process eliminates the need to submit physical paperwork to customs.
              </li>
              <li><b>First-Time Importer KYC:</b> A critical but often overlooked step for new businesses is the "First-Time Importer" Know Your Customer (KYC) verification. Before any Bill of Entry can be processed for a new entity, customs requires the completion of a KYC procedure. This involves submitting documents such as the IEC, GSTIN registration, PAN card, and an authority letter to the customs authorities or the courier company handling the shipment. This is a one-time but fundamental requirement to establish the importer's identity and legitimacy in the customs system. Failure to complete this proactively can lead to the very first shipment being held up, causing significant and entirely avoidable delays and costs. New importers must therefore ensure their KYC is registered with customs well before their first consignment arrives.</li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Assessment, Examination, and Responding to Queries</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Self-Assessment:</b> The process begins with the importer self-assessing their duty liability based on the declared classification and value at the time of filing the B/E.</li>
              <li><b>Customs Assessment and the Role of RMS:</b> The submitted B/E is then processed by the Indian Customs EDI System (ICES). A Customs Officer (Appraiser) verifies the declaration for correctness, primarily focusing on two key aspects:
                <ul className="list-disc pl-6">
                  <li>Classification: Ensuring the goods are classified under the correct 8-digit ITC-HS code.</li>
                  <li>Valuation: Ensuring the declared value is accurate and in line with the provisions of the Customs Act.</li>
                </ul>
                Simultaneously, the B/E is processed by the Risk Management System (RMS). Based on a risk assessment, the RMS determines the next course of action: it may be "facilitated" for immediate clearance, or flagged for assessment, physical examination, or both.
              </li>
              <li><b>Responding to Queries:</b> If the assessing officer has any doubts or requires clarification regarding the classification, value, or any of the supporting documents, a query is raised electronically on the ICEGATE portal. The importer or their CB receives a notification and must provide a satisfactory response promptly. Delays in responding to queries are a common reason for clearance delays.</li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Duty Payment and Securing the 'Out of Charge' Order</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Duty Payment:</b> Once the assessment is complete (or if the B/E is facilitated), the final duty amount is confirmed. The importer must pay this amount electronically through the ICEGATE e-payment gateway. A list of authorized banks is available on the portal.</li>
              <li><b>'Out of Charge' Order:</b> After the duty payment is confirmed in the system and any required physical examination is completed satisfactorily, the proper Customs Officer issues the 'Out of Charge' order electronically. This order is the final green light from Customs. It signifies that all legal and revenue-related obligations have been met, and it authorizes the custodian of the goods (the port authority or airport terminal operator) to release the cargo to the importer. The status of the OOC can be tracked on the ICEGATE portal. The importer can then present the duty-paid B/E to the custodian to take delivery of the goods.</li>
            </ul>

            <h3 id="2-2" className="text-base font-semibold mt-6 mb-2 truncate">2.2 The Export Clearance Process</h3>
            <p>The export clearance process mirrors the import process in its reliance on electronic filing and risk-based checks. The objective is to ensure that the goods being exported are permissible, correctly declared, and that all regulatory requirements, including those related to export promotion schemes, are met.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Filing the Shipping Bill (S/B)</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>What is a Shipping Bill?</b> It is the main legal document filed by an exporter or their CB on the ICEGATE platform. It contains all essential details of the export consignment, including exporter and consignee information, vessel/flight details, description of goods, quantity, value, HS classification, and details of any export promotion schemes being claimed.</li>
              <li><b>Types of Shipping Bill (Color-Coded):</b> Historically, different types of shipping bills were printed on different colored paper to signify the nature of the export. While the process is now electronic, the conceptual distinction remains important:
                <ul className="list-disc pl-6">
                  <li><b>Dutiable Goods (Yellow):</b> For goods on which an export duty is applicable.</li>
                  <li><b>Duty-Free Goods (White):</b> For goods that do not attract any export duty.</li>
                  <li><b>Drawback Claim (Green):</b> For goods where the exporter is claiming a refund (drawback) of import duties paid on inputs used to manufacture the export product.</li>
                  <li><b>Ex-Bond Goods (Pink):</b> For the export of imported goods from a bonded warehouse.</li>
                  <li><b>Duty Exemption Scheme (Blue):</b> For exports under schemes like Advance Authorisation or EPCG.</li>
                </ul>
              </li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Goods Presentation and Examination</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Bringing Goods to the Customs Area:</b> The export cargo is moved from the factory to the designated customs area at the port, airport, or Inland Container Depot (ICD) for clearance.</li>
              <li><b>Factory Stuffing:</b> To save time and avoid potential handling issues at the port, exporters can opt for Factory Stuffing. Under this procedure, the container is sealed at the exporter's factory premises under the supervision of a Central Excise or Customs officer. The sealed container is then moved directly to the port for loading, bypassing routine examination.</li>
              <li><b>Customs Examination:</b> Similar to imports, the RMS processes the Shipping Bill and may select a consignment for physical examination. If selected, a customs officer verifies that the physical goods match the declaration in the Shipping Bill in terms of quantity, description, and value.</li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Receiving the 'Let Export Order' (LEO)</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Issuance of LEO:</b> After the documents are verified and any required examination is completed, if the customs officer is satisfied that the goods are permissible for export and all regulations are met, they will issue the 'Let Export Order' (LEO). This order is endorsed electronically on the Shipping Bill. The LEO is the official permission from Customs to load the goods onto the designated vessel or aircraft.</li>
              <li><b>'Shipped on Board' Endorsement:</b> Once the goods are physically loaded onto the carrier, the shipping line or airline agent provides a 'Shipped on Board' endorsement on the Shipping Bill. This serves as the final confirmation that the goods have left the country and is a critical document for post-export compliance.</li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Post-Export Compliance</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Export General Manifest (EGM):</b> After the vessel or aircraft departs from India, the carrier is legally required to file an Export General Manifest (EGM) with Customs. This manifest lists all the Shipping Bills corresponding to the cargo that was loaded. The correct filing of the EGM is essential; it reconciles the LEOs issued with the goods that have actually departed. It is the primary trigger for the customs system to process export incentive claims like Duty Drawback and RoDTEP.</li>
              <li><b>Bank Realization Certificate (BRC):</b> As per regulations set by the Reserve Bank of India (RBI) under the Foreign Exchange Management Act (FEMA), exporters are required to receive their export payments from the foreign buyer within a stipulated timeframe (typically nine months). Once the payment is received, the authorized dealer bank issues a Bank Realization Certificate (BRC). This document is proof of realization of export proceeds and is a mandatory requirement for claiming benefits under many DGFT schemes and for fulfilling obligations under schemes like Advance Authorisation or EPCG.</li>
            </ul>
            <p>The export clearance process highlights a critical three-way interdependency between Customs, the DGFT, and the RBI. A purely customs-centric view is insufficient for successful exporting. The LEO from Customs allows the goods to be shipped, but the EGM filed by the carrier with Customs is the data trigger that enables the DGFT to process incentive claims like RoDTEP. Similarly, the realization of foreign exchange and the issuance of a BRC is an RBI/banking compliance requirement, but it is also a prerequisite for fulfilling obligations and claiming benefits under DGFT-administered schemes. A failure in one domain has cascading negative effects on the others. For instance, if an exporter secures the LEO but the shipping line fails to file the EGM correctly, the exporter's RoDTEP scrip generation will be blocked. If the exporter fails to submit the BRC in time, they may face penalties from the RBI and be unable to redeem their benefits from the DGFT. This underscores the importance of diligent post-export follow-up with shipping lines and banks to ensure the entire trade cycle is closed compliantly.</p>

            <h3 id="2-3" className="text-base font-semibold mt-6 mb-2 truncate">2.3 The Customs Broker: Your Essential Partner</h3>
            <p>Given the procedural complexities, regulatory nuances, and digital requirements of Indian customs clearance, the vast majority of importers and exporters rely on the services of a Customs Broker (CB), also commonly known as a Customs House Agent (CHA). While engaging a CB is not legally mandatory, their role as a specialized intermediary is invaluable for ensuring smooth and compliant trade operations.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Role and Definition</h4>
            <p>A Customs Broker is an individual or a firm licensed by the Customs authorities under the Customs Brokers Licensing Regulations (CBLR), 2018, to act as an agent for any business transacting with Customs. They are professionals who possess in-depth knowledge of customs laws, tariff classifications, valuation rules, and the procedures for filing documents and clearing goods. They act as a crucial link between the trade and the customs department, translating the complex regulatory language into practical, actionable steps.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Key Responsibilities of a Customs Broker</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Documentation and Filing:</b> The core function of a CB is to prepare and electronically file all necessary customs documents on behalf of their client, including Bills of Entry, Shipping Bills, and other declarations on the ICEGATE portal.</li>
              <li><b>Classification and Valuation:</b> They are responsible for advising the client on the correct HS classification of their goods and ensuring the declared value is in accordance with Section 14 of the Customs Act, thereby ensuring the correct calculation of duties.</li>
              <li><b>Duty Payment:</b> A CB facilitates the timely payment of all duties, taxes, and other charges to the customs authorities on behalf of the importer.</li>
              <li><b>Liaison and Coordination:</b> They actively liaise with officers of Customs, port and airport authorities, shipping lines, airlines, and other Partner Government Agencies to ensure seamless coordination and swift clearance of cargo.</li>
              <li><b>Compliance and Advisory:</b> A licensed CB has a legal obligation to advise their client to comply with all provisions of the Customs Act and other allied laws. They must also bring any non-compliance by their client to the notice of the customs authorities.</li>
              <li><b>Record Keeping:</b> They are required to maintain detailed and up-to-date records and accounts of all financial transactions and customs filings undertaken for their clients.</li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Best Practices for Appointing and Managing a Customs Broker</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Verify Credentials:</b> Always verify that the CB holds a valid, current license issued by the Customs department. Check their reputation in the market and seek references.</li>
              <li><b>Assess Domain Expertise:</b> Different CBs may have expertise in specific industries or types of cargo. For instance, clearing perishable goods, hazardous materials, or project cargo requires specialized knowledge. It is crucial to select a broker with proven experience in your specific domain.</li>
              <li><b>Formalize the Engagement:</b> Appoint the CB through a formal contract or agreement that clearly outlines the scope of work, service level expectations, fee structure, and liabilities. Provide a formal Power of Attorney or authorization letter allowing them to act on your behalf before the customs authorities.</li>
              <li><b>Provide Accurate Information:</b> The accuracy of the customs declaration depends entirely on the information provided by the importer/exporter. Ensure you provide complete and correct documents and details to your CB to avoid errors and potential penalties.</li>
            </ul>
            <p>A competent and trustworthy Customs Broker is more than just a filing agent; they are a strategic partner who can help businesses avoid common and costly pitfalls such as incorrect documentation, misclassification of goods, valuation disputes, and procedural delays arising from a lack of knowledge of the latest regulations.</p>
          </section>
          {/* Part III: The Financials of Trade: Valuation, Duties, and Tariffs */}
          <section id="part-3" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part III: The Financials of Trade: Valuation, Duties, and Tariffs</h2>
            <p>The financial component of customs clearance is one of its most complex and critical aspects. The amount of duty payable on a consignment is not a single tax but a multi-layered calculation founded on three core pillars: the classification of the goods, the valuation of the goods, and the applicable rate of duty. This section demystifies this financial framework, providing a granular guide to how duties are determined, calculated, and levied in India.</p>

            <h3 id="3-1" className="text-base font-semibold mt-6 mb-2 truncate">3.1 The Foundation of Duty: Classification and Valuation</h3>
            <p>Before any duty can be calculated, two fundamental questions must be answered: "What is the product?" and "What is its value?". The answers to these questions are determined by a harmonized system of classification and a specific legal methodology for valuation.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Mastering the ITC-HS Code</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Introduction to ITC-HS:</b> The first step in any duty calculation is the correct classification of the goods. India uses the Indian Trade Classification (Harmonized System) or ITC-HS, which is an eight-digit alphanumeric code. This system is an extension of the international six-digit Harmonized System (HS) of Nomenclature, a global standard for classifying traded goods. The ITC-HS code is the absolute foundation of the customs process; the rate of Basic Customs Duty, IGST, and the applicability of any other regulations are all determined by this code. Schedule I of the Customs Tariff Act lists the codes for import, while Schedule II lists them for export.</li>
              <li><b>Finding the Right Code:</b> Identifying the precise 8-digit code for a product is a legal responsibility of the importer/exporter. Misclassification can lead to incorrect duty payments, penalties, and delays. Resources available to determine the correct code include:
                <ul className="list-disc pl-6">
                  <li>The official Customs Tariff of India, published annually.</li>
                  <li>The online Custom Duty Calculator and tariff database on the ICEGATE portal.</li>
                  <li>The India Trade Portal, maintained by the Federation of Indian Export Organisations (FIEO), which provides tariff information including preferential rates under trade agreements.</li>
                </ul>
              </li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Calculating the Assessable Value (AV): Beyond FOB to CIF</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Legal Basis:</b> Section 14 of the Customs Act, 1962, stipulates that customs duty is levied not on the invoice price alone, but on the "Assessable Value" (AV) of the goods. This is a critical distinction.</li>
              <li><b>The CIF Formula:</b> For imports, the Assessable Value is determined based on the CIF value of the goods. The formula is a cornerstone of customs valuation:<br/>
                <span className="block my-2 font-mono bg-gray-100 p-2 rounded">Assessable Value = Cost (Invoice Value) + Insurance + Freight</span>
                This means the cost of transporting the goods to India and insuring them during transit are added to the product's cost to form the base value for duty calculation.
              </li>
              <li><b>Adjustments to Value:</b> In addition to the CIF value, certain other charges are included to arrive at the final Assessable Value. The most common is Landing Charges, which are added at a standard rate of 1% of the CIF value to cover the cost of unloading and handling the goods at the port of import. Therefore, the final AV on which duty is calculated is typically<br/>
                <span className="block my-2 font-mono bg-gray-100 p-2 rounded">CIF Value + 1% of CIF Value</span>
              </li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Valuation Disputes and the Special Valuation Branch (SVB)</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Trigger for Disputes:</b> Customs authorities may challenge the declared transaction value if they suspect it has been artificially lowered to reduce the duty liability. This is a common issue in related-party transactions where the relationship might have influenced the price.</li>
              <li><b>Role of the Special Valuation Branch (SVB):</b> The SVB is a specialized unit within the Customs department that investigates the valuation of goods in transactions between related parties. When an importer declares a relationship with their supplier for the first time, the case is typically referred to the SVB. The importer must then file extensive documentation (including prescribed questionnaires known as Annexure A and Annexure B) to justify that the transaction price is at "arm's length" and has not been influenced by the relationship. The SVB process can be complex and time-consuming, often requiring provisional assessment of goods pending the final investigation report.</li>
            </ul>

            <h3 id="3-2" className="text-base font-semibold mt-6 mb-2 truncate">3.2 Deconstructing the Import Duty Calculation</h3>
            <p>The total import duty payable is a cumulative figure derived from several components being levied sequentially. Understanding this cascade is essential for accurate financial planning.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">A Detailed, Step-by-Step Calculation</h4>
            <ol className="list-decimal pl-6 mb-2">
              <li><b>Determine the Assessable Value (AV):</b> As explained above, this is the CIF value of the goods plus 1% landing charges.<br/>
                <span className="block my-2 font-mono bg-gray-100 p-2 rounded">Example: If Cost (FOB) = ₹80,000, Freight = ₹15,000, and Insurance = ₹5,000, then CIF = ₹100,000. The Assessable Value (AV) = ₹100,000 + (1% of ₹100,000) = ₹101,000.</span>
              </li>
              <li><b>Calculate Basic Customs Duty (BCD):</b> This is the primary duty levied on imports. The rate is specific to the HS code of the product as per the Customs Tariff Act.<br/>
                <span className="block my-2 font-mono bg-gray-100 p-2 rounded">Formula: BCD = AV × BCD Rate<br/>Example: If BCD rate is 10%, then BCD = ₹101,000 × 10% = ₹10,100.</span>
              </li>
              <li><b>Calculate Social Welfare Surcharge (SWS):</b> This is a surcharge levied on the amount of BCD calculated, not on the value of the goods. The standard rate is 10%.<br/>
                <span className="block my-2 font-mono bg-gray-100 p-2 rounded">Formula: SWS = BCD × 10%<br/>Example: SWS = ₹10,100 × 10% = ₹1,010.</span>
              </li>
              <li><b>Determine the Value for IGST Calculation:</b> The Integrated Goods and Services Tax (IGST) is levied on the sum of the Assessable Value and all customs duties calculated so far.<br/>
                <span className="block my-2 font-mono bg-gray-100 p-2 rounded">Formula: Value for IGST = AV + BCD + SWS<br/>Example: Value for IGST = ₹101,000 + ₹10,100 + ₹1,010 = ₹112,110.</span>
              </li>
              <li><b>Calculate Integrated Goods and Services Tax (IGST):</b> This tax is levied to ensure imported goods are treated at par with domestic goods, which are subject to GST. The IGST rate (0%, 5%, 12%, 18%, or 28%) depends on the product's classification under the GST regime. A key benefit is that registered businesses can claim the IGST paid on imports as an input tax credit against their output GST liability.<br/>
                <span className="block my-2 font-mono bg-gray-100 p-2 rounded">Formula: IGST = Value for IGST × IGST Rate<br/>Example: If IGST rate is 18%, then IGST = ₹112,110 × 18% = ₹20,179.80.</span>
              </li>
              <li><b>Calculate Total Import Duty Payable:</b> This is the sum of all duties and taxes computed.<br/>
                <span className="block my-2 font-mono bg-gray-100 p-2 rounded">Formula: Total Duty = BCD + SWS + IGST<br/>Example: Total Duty = ₹10,100 + ₹1,010 + ₹20,179.80 = ₹31,289.80.</span>
              </li>
            </ol>

            <h4 className="font-semibold mt-5 mb-2 truncate">Table: Duty Calculation Components and Formulas</h4>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Duty/Component</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Description/Purpose</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Basis of Calculation (Formula)</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Governing Act/Rule</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Assessable Value (AV)</td>
                    <td className="border border-gray-300 px-3 py-2">The base value for duty calculation, representing the cost of goods including freight and insurance to the Indian border.</td>
                    <td className="border border-gray-300 px-3 py-2">Cost (FOB) + Insurance + Freight + 1% Landing Charges</td>
                    <td className="border border-gray-300 px-3 py-2">Section 14, Customs Act, 1962</td>
                    <td className="border border-gray-300 px-3 py-2">Also known as the CIF value plus landing charges.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Basic Customs Duty (BCD)</td>
                    <td className="border border-gray-300 px-3 py-2">The primary tariff levied on imported goods. Rates are product-specific.</td>
                    <td className="border border-gray-300 px-3 py-2">AV × BCD Rate</td>
                    <td className="border border-gray-300 px-3 py-2">Section 12, Customs Act, 1962 & First Schedule, Customs Tariff Act, 1975</td>
                    <td className="border border-gray-300 px-3 py-2">Rates vary widely. Check the latest Customs Tariff for the specific HS code.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Social Welfare Surcharge (SWS)</td>
                    <td className="border border-gray-300 px-3 py-2">A surcharge levied on the BCD amount to fund social welfare projects.</td>
                    <td className="border border-gray-300 px-3 py-2">BCD × 10%</td>
                    <td className="border border-gray-300 px-3 py-2">Section 110, Finance Act, 2018</td>
                    <td className="border border-gray-300 px-3 py-2">The standard rate is 10%. Some goods may be exempt.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Integrated GST (IGST)</td>
                    <td className="border border-gray-300 px-3 py-2">A tax levied on imports to ensure parity with domestic goods under the GST regime.</td>
                    <td className="border border-gray-300 px-3 py-2">(AV + BCD + SWS) × IGST Rate</td>
                    <td className="border border-gray-300 px-3 py-2">Section 3(7), Customs Tariff Act, 1975 & IGST Act, 2017</td>
                    <td className="border border-gray-300 px-3 py-2">Rates are 0%, 5%, 12%, 18%, or 28%. IGST paid is available as an input tax credit for registered businesses.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Compensation Cess</td>
                    <td className="border border-gray-300 px-3 py-2">An additional levy on certain specified luxury or 'sin' goods (e.g., automobiles, tobacco).</td>
                    <td className="border border-gray-300 px-3 py-2">(AV + BCD + SWS) × Cess Rate</td>
                    <td className="border border-gray-300 px-3 py-2">GST (Compensation to States) Act, 2017</td>
                    <td className="border border-gray-300 px-3 py-2">Applicable only to a specific list of goods.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Total Duty Payable</td>
                    <td className="border border-gray-300 px-3 py-2">The final amount to be paid to clear the goods from customs.</td>
                    <td className="border border-gray-300 px-3 py-2">BCD + SWS + IGST + Compensation Cess (if applicable)</td>
                    <td className="border border-gray-300 px-3 py-2">-</td>
                    <td className="border border-gray-300 px-3 py-2">This is the total cash outflow for taxes at the border.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 id="3-3" className="text-base font-semibold mt-6 mb-2 truncate">3.3 Protective and Trade-Remedial Duties</h3>
            <p>Beyond the standard revenue-focused duties, Customs may impose additional duties to protect domestic industries from specific threats. These are not applied universally but are product- and country-specific, based on investigations by the Directorate General of Trade Remedies (DGTR).</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Anti-Dumping Duty (ADD):</b> This is a trade remedy measure used to counter "dumping." Dumping occurs when a foreign company exports goods to India at a price lower than the price it charges in its own domestic market (its "Normal Value"). If this practice causes or threatens to cause material injury to India's domestic industry, the DGTR can recommend the imposition of an ADD.
                <ul className="list-disc pl-6">
                  <li><b>Calculation:</b> The ADD is calculated to offset the price difference. The duty imposed is the lower of the Dumping Margin (Normal Value – Export Price) and the Injury Margin (Fair Selling Price of Domestic Product – Landed Cost of Imported Product).</li>
                </ul>
              </li>
              <li><b>Countervailing Duty (CVD):</b> This duty is imposed to counteract the effect of subsidies provided by the government of the exporting country to its manufacturers. If these subsidies allow the foreign producer to sell their goods at a lower price in India, thereby harming the domestic industry, a CVD can be levied to neutralize this unfair advantage.</li>
              <li><b>Safeguard Duty:</b> This is an emergency measure applied when a sudden, sharp, and significant increase in the import of a particular product causes or threatens to cause serious injury to the domestic industry. Unlike ADD or CVD, a safeguard duty can be applied even if the goods are being traded fairly (i.e., not dumped or subsidized). It is a temporary measure to give the domestic industry time to adjust.</li>
            </ul>

            <h3 id="3-4" className="text-base font-semibold mt-6 mb-2 truncate">3.4 Leveraging Free Trade Agreements (FTAs)</h3>
            <p>India has signed several Free Trade Agreements (FTAs) and Preferential Trade Agreements (PTAs) with various countries and trading blocs (e.g., ASEAN, Japan, UAE, South Korea). These agreements allow for the import of specified goods from member countries at reduced or zero rates of Basic Customs Duty.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Rules of Origin (RoO): The Key to FTA Benefits</h4>
            <p>The central principle of any FTA is that the concessional tariff is only available for goods that "originate" in the partner country. Simply shipping goods from an FTA partner country is not enough; the goods themselves must meet specific Rules of Origin (RoO). This is proven by submitting a valid Certificate of Origin (COO) at the time of import. The main criteria to determine origin are:</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Wholly Obtained:</b> The product is entirely grown, harvested, or manufactured in the partner country using only local materials.</li>
              <li><b>Substantial Transformation:</b> The product was manufactured in the partner country using some non-originating (imported) materials, but these materials have undergone a "substantial transformation." This is typically defined by either:
                <ul className="list-disc pl-6">
                  <li>A Change in Tariff Classification (CTC), where the final product's HS code is different from the HS codes of the imported inputs.</li>
                  <li>Meeting a Regional Value Content (RVC) requirement, where a certain percentage of the product's value must be added within the FTA partner country.</li>
                </ul>
              </li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">The CAROTAR Rules, 2020: A Shift in Responsibility</h4>
            <p>A significant development in the administration of FTAs in India was the introduction of the Customs (Administration of Rules of Origin under Trade Agreements) Rules, 2020 (CAROTAR). Previously, the COO issued by the exporting country's authority was often accepted with minimal scrutiny. The CAROTAR rules have fundamentally shifted the onus of proof onto the Indian importer.</p>
            <p>This shift has profound implications. It is no longer sufficient for an importer to passively receive a COO from their supplier. The CAROTAR rules mandate that the importer must possess specific information (as laid out in Form I of the rules) that demonstrates how the product meets the origin criteria and must exercise reasonable care to ensure this information is accurate. This means the importer must have access to background documentation, such as the bill of materials for the product, to prove the RVC calculation or the tariff shift. If Customs raises a query, the importer must be able to provide this evidence. Failure to do so can result in the denial of the preferential tariff, forcing the importer to pay the full BCD along with interest and potential penalties. This necessitates that Indian importers build this requirement for origin documentation into their commercial contracts with suppliers, ensuring they can satisfy their due diligence obligations under Indian law.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Procedure for Claiming FTA Benefit</h4>
            <ol className="list-decimal pl-6 mb-2">
              <li><b>Make a Declaration:</b> Explicitly declare in the Bill of Entry that the goods qualify as originating and claim the specific FTA notification.</li>
              <li><b>Upload the COO:</b> Upload a valid, authentic Certificate of Origin (e.g., Form AI for the ASEAN-India FTA) to e-Sanchit.</li>
              <li><b>Enter COO Details:</b> Enter the COO reference number, date of issuance, and the specific originating criteria met by the goods directly into the Bill of Entry data fields.</li>
            </ol>
          </section>
          {/* Part IV: India's Foreign Trade Policy (FTP) 2023: Schemes and Incentives */}
          <section id="part-4" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part IV: India's Foreign Trade Policy (FTP) 2023: Schemes and Incentives</h2>
            <p>While the Customs Act and CBIC govern the clearance and taxation of goods at the border, the Foreign Trade Policy (FTP), formulated by the DGFT, represents the strategic vision for promoting India's role in global trade. The FTP 2023 is a comprehensive document that introduces and refines various schemes aimed at reducing the cost of exports, enhancing competitiveness, and simplifying trade procedures.</p>

            <h3 id="4-1" className="text-base font-semibold mt-6 mb-2 truncate">4.1 Overview of FTP 2023</h3>
            <p>Launched on March 31, 2023, the FTP 2023 marks a strategic shift from previous five-year policies. It is designed to be a dynamic and responsive document with no fixed "sunset" date, allowing for continuous updates as per the needs of the trade and industry.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Strategic Vision:</b> The overarching goal of FTP 2023 is to propel India's exports to a target of US$2 trillion by 2030 (comprising US$1 trillion in merchandise and US$1 trillion in services). It is built on the principles of trust and partnership with exporters.</li>
              <li><b>Four Key Pillars:</b> The policy is structured around four strategic pillars:
                <ol className="list-decimal pl-6">
                  <li>Incentive to Remission: A move away from direct incentive schemes to WTO-compliant remission schemes that refund taxes and duties incurred during the export production process.</li>
                  <li>Export Promotion through Collaboration: Fostering collaboration with State Governments and Districts to promote exports at a grassroots level through initiatives like the Districts as Export Hubs (DEH).</li>
                  <li>Ease of Doing Business: Reducing transaction costs and enhancing trade facilitation through automation, process re-engineering, and reduction in user fees for MSMEs.</li>
                  <li>Focus on Emerging Areas: Providing policy support for high-growth sectors like e-commerce exports, and streamlining policies for dual-use high-end goods under the SCOMET (Special Chemicals, Organisms, Materials, Equipment and Technologies) policy.</li>
                </ol>
              </li>
              <li><b>Key Initiatives:</b> FTP 2023 introduced several notable initiatives, including a one-time Amnesty Scheme to allow exporters to regularize past defaults in export obligations under the Advance Authorisation and EPCG schemes. It also recognized four new Towns of Export Excellence (TEE): Faridabad (for apparel), Moradabad (for handicrafts), Mirzapur (for handmade carpets), and Varanasi (for handloom and handicrafts), providing them with focused support.</li>
            </ul>

            <h3 id="4-2" className="text-base font-semibold mt-6 mb-2 truncate">4.2 Duty Remission and Exemption Schemes</h3>
            <p>These schemes are the workhorses of the FTP, designed to lower the input costs for exporters and ensure that domestic taxes are not exported, thereby making Indian goods more competitive in global markets.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">RoDTEP (Remission of Duties and Taxes on Exported Products)</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Objective:</b> The RoDTEP scheme is the flagship remission program of FTP 2023. Its purpose is to refund various embedded Central, State, and local duties and taxes that are incurred in the manufacturing and distribution process but are not otherwise credited or refunded, such as VAT on fuel, electricity duty, and mandi tax. This ensures that the FOB price of an export product is free from the burden of domestic taxes.</li>
              <li><b>Mechanism:</b> The benefit is provided as a specified percentage of the Free on Board (FOB) value of the exported goods or as a fixed amount per unit. This benefit is disbursed in the form of transferable electronic scrips (e-scrips), which are generated and maintained in a credit ledger on the ICEGATE portal. These e-scrips can be used to pay Basic Customs Duty on future imports or can be transferred to another importer.</li>
              <li><b>Application Process:</b> To avail RoDTEP, the exporter must declare their intention to claim the benefit in the Shipping Bill at the time of export. After the Export General Manifest (EGM) is filed by the carrier, the customs system processes the claim. A scroll of eligible shipping bills is then generated and made available in the exporter's ICEGATE account, from which they can create the e-scrip.</li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Advance Authorisation Scheme (AAS)</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Objective:</b> The AAS allows for the duty-free import of inputs that are physically incorporated into a product destined for export. This is an "upfront" benefit that significantly reduces the working capital required by exporters, as they do not need to pay duties on raw materials first and claim a refund later.</li>
              <li><b>Eligibility and Conditions:</b> The scheme is available to both manufacturer-exporters and merchant-exporters tied to a supporting manufacturer. The imported inputs are subject to an 'Actual User' condition, meaning they must be used by the authorisation holder in their factory and the authorisation itself is non-transferable, even after the export obligation is met.</li>
              <li><b>Export Obligation (EO) and Value Addition:</b> The scheme mandates a minimum value addition of 15% over the CIF value of the imported inputs (with some exceptions for specific sectors). The export obligation must be fulfilled within 18 months from the date the authorisation is issued.</li>
              <li><b>Application:</b> The application for an Advance Authorisation is filed online on the DGFT portal using form ANF-4A.</li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Duty-Free Import Authorisation (DFIA) Scheme</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Objective:</b> The DFIA scheme also allows for the duty-free import of inputs required for export production, but it functions as a replenishment scheme rather than an upfront exemption.</li>
              <li><b>Key Differences from AAS:</b> The most significant difference is in its timing and transferability. A DFIA is typically issued after the export obligation has already been completed. Furthermore, once issued, the DFIA license is freely transferable. This means the exporter can either use it to import their next batch of inputs duty-free or sell the license on the open market to another importer.</li>
              <li><b>Validity and Duties Exempted:</b> A DFIA is valid for 12 months from its date of issue. It is important to note that this scheme only exempts the payment of Basic Customs Duty (BCD); IGST and Compensation Cess are not exempted and must be paid on the imported inputs.</li>
            </ul>

            <h3 id="4-3" className="text-base font-semibold mt-6 mb-2 truncate">4.3 Capital Goods and Export Obligation</h3>
            <p>The FTP provides a dedicated scheme to help exporters upgrade their manufacturing capabilities by sourcing capital goods at a lower cost.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Export Promotion Capital Goods (EPCG) Scheme</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Objective:</b> The EPCG scheme is designed to facilitate the import of capital goods (machinery, equipment, spares, tools) for the pre-production, production, and post-production stages of manufacturing. It allows for the import of these capital goods at zero customs duty, thereby encouraging technological upgradation and capacity expansion for export-oriented production.</li>
              <li><b>Export Obligation (EO):</b> The core of the EPCG scheme is the export obligation imposed on the authorisation holder. The exporter is obligated to achieve an export turnover equivalent to six times the amount of duty saved on the imported capital goods. This obligation must be fulfilled over a period of six years from the date the authorisation is issued.</li>
              <li><b>Fulfillment of EO:</b> The export obligation is not just a single target. It consists of two components:
                <ol className="list-decimal pl-6">
                  <li>Specific Export Obligation: This is the primary obligation of exporting goods worth 6x the duty saved. This is typically fulfilled in two blocks: at least 50% in the first four years, and the balance in the remaining two years.</li>
                  <li>Average Export Obligation (AEO): In addition to the specific EO, the exporter must also maintain their average level of export performance achieved in the three financial years preceding the issuance of the EPCG authorisation. This ensures that the scheme leads to additional exports and not just a diversion of existing exports to fulfill the obligation.</li>
                </ol>
              </li>
              <li><b>Application and Monitoring:</b> The application for an EPCG authorisation is made online via the DGFT portal using form ANF 5A. The fulfillment of the export obligation is monitored by the DGFT through the submission of shipping bills and Bank Realization Certificates. While annual reporting was previously required, this has been relaxed, with reporting now primarily required after the completion of the blocks.</li>
            </ul>

            <h3 id="4-4" className="text-base font-semibold mt-6 mb-2 truncate">4.4 Emerging Areas and Exporter Recognition</h3>
            <p>FTP 2023 places a strong emphasis on nurturing new avenues for export growth and recognizing high-performing exporters with special privileges.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">E-Commerce Export Schemes and Facilitations</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Key Provisions:</b>
                <ul className="list-disc pl-6">
                  <li>Increased Value Limit: The value limit for exports through courier services has been doubled from ₹5 lakh to ₹10 lakh per consignment, making it easier for small and medium enterprises (SMEs) to ship higher-value orders through simplified courier channels.</li>
                  <li>E-commerce Export Hubs (ECEH): The policy outlines the development of designated ECEHs, which will act as centers of excellence for e-commerce trade, providing specialized infrastructure, warehousing, customs clearance, and logistics support.</li>
                  <li>Dak Ghar Niryat Kendras: To facilitate exports from remote and land-locked regions, Post Offices are being operationalized as Dak Ghar Niryat Kendras (Post Office Export Centers). These will work in a hub-and-spoke model with Foreign Post Offices to enable artisans, weavers, and small businesses to access international markets.</li>
                  <li>Extension of FTP Benefits: The benefits of schemes like RoDTEP are being extended to cover e-commerce exports, which was a long-standing demand of the industry.</li>
                </ul>
              </li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">The Status Holder Scheme</h4>
            <p>This scheme rewards established exporters with a proven track record, granting them special privileges that reduce transaction costs and time, thereby creating a trusted partnership between the government and high-performing businesses.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Concept and Eligibility:</b> Exporters are granted "Status Holder" recognition based on their export performance (FOB value of exports) over a specified period. FTP 2023 has significantly rationalized the export performance thresholds, making it easier for more exporters to achieve status.</li>
            </ul>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Status House Category</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">FTP 2015-20 Threshold (USD Million)</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">FTP 2023 Threshold (USD Million)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">One Star Export House</td>
                    <td className="border border-gray-300 px-3 py-2">3</td>
                    <td className="border border-gray-300 px-3 py-2">3</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Two Star Export House</td>
                    <td className="border border-gray-300 px-3 py-2">25</td>
                    <td className="border border-gray-300 px-3 py-2">15</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Three Star Export House</td>
                    <td className="border border-gray-300 px-3 py-2">100</td>
                    <td className="border border-gray-300 px-3 py-2">50</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Four Star Export House</td>
                    <td className="border border-gray-300 px-3 py-2">500</td>
                    <td className="border border-gray-300 px-3 py-2">200</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Five Star Export House</td>
                    <td className="border border-gray-300 px-3 py-2">2000</td>
                    <td className="border border-gray-300 px-3 py-2">800</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Privileges of Status Holders:</b>
                <ul className="list-disc pl-6">
                  <li>Simplified Clearances: Authorisation and customs clearances for both imports and exports may be granted on a self-declaration basis.</li>
                  <li>Export Warehousing: Two Star and above status holders are permitted to establish export warehouses as per Department of Revenue guidelines.</li>
                  <li>Self-Certification of Origin: Three Star and above status holders who are also manufacturers are enabled to self-certify their manufactured goods as originating from India to qualify for preferential treatment under certain FTAs.</li>
                  <li>Priority Handling: Status holders are entitled to preferential treatment and priority in the handling of their consignments by all concerned agencies.</li>
                  <li>Exemption from Bank Guarantees: Status holders are often exempt from the requirement of furnishing a bank guarantee under certain FTP schemes.</li>
                </ul>
              </li>
              <li><b>Automatic Recognition:</b> In a major move towards ease of doing business, the DGFT has transitioned to a system of automatic grant of e-Status Holder Certificates (e-SHC). The system now automatically identifies eligible exporters based on their shipping data from EDI ports and SEZs, eliminating the need for them to file a separate application.</li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Table: Comparative Analysis of Major Export Promotion Schemes</h4>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Scheme</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Objective</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Benefit</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Key Condition</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Export Obligation</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Transferability</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Ideal For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">RoDTEP</td>
                    <td className="border border-gray-300 px-3 py-2">Refund embedded, un-refunded taxes/duties.</td>
                    <td className="border border-gray-300 px-3 py-2">Transferable e-scrips for BCD payment.</td>
                    <td className="border border-gray-300 px-3 py-2">Declaration on Shipping Bill; EGM filing.</td>
                    <td className="border border-gray-300 px-3 py-2">None.</td>
                    <td className="border border-gray-300 px-3 py-2">Yes.</td>
                    <td className="border border-gray-300 px-3 py-2">All exporters of notified goods.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Advance Authorisation (AAS)</td>
                    <td className="border border-gray-300 px-3 py-2">Upfront duty-free import of inputs for export production.</td>
                    <td className="border border-gray-300 px-3 py-2">Zero duty on imported raw materials (BCD, IGST etc.).</td>
                    <td className="border border-gray-300 px-3 py-2">Physical incorporation of inputs; Actual User condition.</td>
                    <td className="border border-gray-300 px-3 py-2">Minimum 15% value addition; Fulfill within 18 months.</td>
                    <td className="border border-gray-300 px-3 py-2">No (Authorisation and materials are non-transferable).</td>
                    <td className="border border-gray-300 px-3 py-2">Manufacturer-exporters needing to reduce working capital for input procurement.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">DFIA</td>
                    <td className="border border-gray-300 px-3 py-2">Replenishment of duty-free inputs after exports are completed.</td>
                    <td className="border border-gray-300 px-3 py-2">Transferable license for BCD-exempt import of inputs.</td>
                    <td className="border border-gray-300 px-3 py-2">Based on Standard Input-Output Norms (SION).</td>
                    <td className="border border-gray-300 px-3 py-2">Minimum 20% value addition; Must be fulfilled before license issuance.</td>
                    <td className="border border-gray-300 px-3 py-2">Yes (License is freely transferable).</td>
                    <td className="border border-gray-300 px-3 py-2">Exporters who can manage initial input costs and wish to monetize the license.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">EPCG</td>
                    <td className="border border-gray-300 px-3 py-2">Duty-free import of capital goods for production.</td>
                    <td className="border border-gray-300 px-3 py-2">Zero BCD on imported machinery and equipment.</td>
                    <td className="border border-gray-300 px-3 py-2">Installation of capital goods and use for production.</td>
                    <td className="border border-gray-300 px-3 py-2">6 times the duty saved, to be fulfilled in 6 years.</td>
                    <td className="border border-gray-300 px-3 py-2">No (Authorisation is non-transferable; goods can be transferred after EO fulfillment with permission).</td>
                    <td className="border border-gray-300 px-3 py-2">Manufacturers (goods or services) looking to invest in technology and capacity enhancement.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          {/* Part V: Advanced Customs Procedures and Special Cargo */}
          <section id="part-5" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part V: Advanced Customs Procedures and Special Cargo</h2>
            <p>Beyond the standard clearance of goods for immediate import or export, Indian Customs law provides for several advanced procedures that cater to specific business needs, such as deferring duty payments, managing large-scale projects, or handling goods with special regulatory requirements. These procedures offer significant flexibility and cost advantages when utilized correctly.</p>

            <h3 id="5-1" className="text-base font-semibold mt-6 mb-2 truncate">5.1 Warehousing and Deferred Duty</h3>
            <p>The ability to store imported goods without immediate payment of duty is a powerful tool for managing cash flow, inventory, and supply chain logistics.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Customs Bonded Warehousing</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Concept:</b> A Customs Bonded Warehouse is a secure facility, licensed under Section 58 of the Customs Act, where imported goods can be stored without the payment of customs duty. The duty liability is deferred until the goods are cleared from the warehouse.</li>
              <li><b>Procedure:</b> The process involves two key steps:
                <ol className="list-decimal pl-6">
                  <li><b>Bonding the Goods:</b> The importer files an Into-Bond Bill of Entry (warehousing B/E) and executes a bond with Customs for an amount equal to the duty assessed on the goods. Once the bond is accepted, Customs permits the goods to be deposited in the licensed warehouse.</li>
                  <li><b>Clearing the Goods (De-bonding):</b> When the importer is ready to use or sell the goods, they file an Ex-Bond Bill of Entry for either a part of or the entire consignment. The duty payable is calculated based on the rates and exchange rate applicable on the date the Ex-Bond B/E is filed, not the date of original import. Upon payment of this duty, the goods are released from the warehouse for home consumption.</li>
                </ol>
              </li>
              <li><b>Benefits:</b> This scheme offers several advantages:
                <ul className="list-disc pl-6">
                  <li>Duty Deferment: Improves cash flow by postponing duty payment until the goods are actually needed.</li>
                  <li>Inventory Management: Allows importers to hold inventory in India and clear it based on market demand, avoiding port demurrage and detention charges.</li>
                  <li>Value-Added Services: The owner of the goods can, with permission, inspect, sort, pack, label, or show the goods for sale while they are in the warehouse.</li>
                  <li>Export without Duty: Goods stored in a bonded warehouse can be directly exported without payment of any import duty.</li>
                </ul>
              </li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Manufacturing in Bond (MOOWR Scheme)</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Concept:</b> The Manufacture and Other Operations in Warehouse Regulations (MOOWR) scheme, enabled by Section 65 of the Customs Act, is a significant enhancement of the warehousing facility. It allows entities to undertake manufacturing and other operations on bonded goods, effectively turning the bonded warehouse into a duty-free manufacturing zone.</li>
              <li><b>Procedure:</b> A company must obtain a license under both Section 58 (for the warehouse) and Section 65 (for manufacturing operations). Once licensed, it can import capital goods and raw materials without paying BCD and IGST. These goods are warehoused in the facility and used for production.</li>
              <li><b>Duty Liability:</b> The duty implication depends on the final destination of the manufactured goods:
                <ul className="list-disc pl-6">
                  <li><b>If Exported:</b> If the finished goods are exported, no import duty is payable on the capital goods or raw materials consumed in their production.</li>
                  <li><b>If Sold Domestically (DTA Sale):</b> If the finished goods are cleared for sale in the Domestic Tariff Area (DTA), the import duty that was deferred on the imported raw materials contained within those finished goods becomes payable at the time of clearance. Duty on capital goods is also deferred until they are cleared into the DTA.</li>
                </ul>
              </li>
            </ul>

            <h3 id="5-2" className="text-base font-semibold mt-6 mb-2 truncate">5.2 Specialized Import Schemes</h3>
            <p>Customs provides for special schemes to facilitate large industrial projects and the temporary movement of goods across borders.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Project Imports Regulations, 1986</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Concept:</b> This is a unique scheme designed to simplify the customs assessment process for goods imported for the initial setting up of a new industrial plant or for the substantial expansion (defined as an increase in installed capacity of at least 25%) of an existing one. Instead of assessing each piece of machinery and equipment individually under its specific tariff heading, all goods for the project are classified under a single tariff heading, CTH 9801, and are assessed at a uniform, often concessional, rate of duty.</li>
              <li><b>Procedure:</b> To avail this benefit, the importer must have the project sponsored by a competent authority (e.g., a relevant government ministry). The import contract, along with a detailed list of all goods to be imported for the project, must be registered with the Custom House before the first consignment is cleared. This registration forms the basis for all subsequent clearances under the project.</li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Re-Import and Re-Export Procedures</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Re-Import of Exported Goods:</b> Goods that were manufactured in India and exported can be re-imported for various reasons. Notification No. 158/95-Cus provides a significant duty concession for such re-imports, provided they are for purposes like repair, reconditioning, or reprocessing and are returned within a specified period (e.g., within three years for repairs). The re-import is typically done under a bond to ensure the goods are not diverted for domestic sale without fulfilling the intended purpose.</li>
              <li><b>Re-Export of Imported Goods (Duty Drawback under Section 74):</b> When goods that were imported upon payment of duty are subsequently re-exported, the importer is entitled to claim a refund of the duty paid. Under Section 74 of the Customs Act, up to 98% of the import duty can be claimed as drawback, provided the goods are clearly identifiable as the ones that were imported and are re-exported within two years of importation.</li>
              <li><b>Temporary Imports:</b> For goods that are imported for a specific, temporary purpose with the clear intention of re-exporting them (e.g., goods for an exhibition, machinery for a specific short-term project, or goods for repair), customs allows for duty-free import. This is done by executing a bond for the amount of duty leviable, which guarantees that the goods will be re-exported within a stipulated period (typically six months, which can be extended). If the goods are not re-exported in time, the importer becomes liable to pay the full duty secured by the bond.</li>
            </ul>

            <h3 id="5-3" className="text-base font-semibold mt-6 mb-2 truncate">5.3 Handling Special and Sensitive Goods</h3>
            <p>The clearance procedures for certain categories of goods are more stringent due to their nature and potential impact on public health, safety, and the environment.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Clearance Procedures for Perishable Goods</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Key Challenge:</b> The primary challenge in clearing perishable goods (e.g., fruits, vegetables, flowers, meat) is the need for speed to prevent spoilage and maintain commercial value.</li>
              <li><b>Procedure:</b> Customs clearance for perishables is given high priority. The process involves close coordination with various Partner Government Agencies (PGAs) for sanitary and phytosanitary (SPS) clearances. Importers are encouraged to file advance Bills of Entry to allow for pre-arrival processing. Upon arrival, the goods are subject to inspection by agencies like:
                <ul className="list-disc pl-6">
                  <li>Plant Quarantine Information System (PQIS): For goods of plant origin.</li>
                  <li>Food Safety and Standards Authority of India (FSSAI): For all food items.</li>
                  <li>Animal Quarantine: For livestock and animal products.</li>
                </ul>
              </li>
              <li><b>Documentation:</b> In addition to standard import documents, perishable goods require specific certifications, such as a Phyto-Sanitary Certificate (for plants), a Health Certificate (for animal products), and a valid Import Permit issued by the relevant Indian authority. The goods must also comply with strict packaging and labeling regulations, including details like date of manufacture, best before date, and list of ingredients.</li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Regulations for Hazardous Materials (HAZMAT)</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Governing Rules:</b> The import and handling of hazardous materials are strictly regulated under the Hazardous and Other Wastes (Management and Transboundary Movement) Rules, 2016, which align with the international Basel Convention.</li>
              <li><b>Key Requirement:</b> The import of hazardous waste into India is permitted only for the purpose of recycling, recovery, or reuse. Import for the purpose of final disposal or dumping is strictly prohibited. Any entity wishing to import such materials must obtain a prior authorization from the relevant State Pollution Control Board (SPCB) and, in some cases, the Ministry of Environment, Forest and Climate Change (MoEFCC).</li>
              <li><b>Documentation:</b> Effective May 2025, a crucial document for the clearance of hazardous chemicals and materials is the Material Safety Data Sheet (MSDS). The importer must submit a valid MSDS at the time of clearance. This document provides comprehensive details on the material's chemical composition, physical and health hazards, safe handling procedures, and emergency response measures. Failure to provide a valid and compliant MSDS can result in customs holds, penalties, and rejection of the consignment. All packaging and transportation must adhere to international safety codes, such as the IMDG Code for sea transport and IATA regulations for air transport.</li>
            </ul>
          </section>
          {/* Part VI: Compliance, Risk, and Dispute Resolution */}
          <section id="part-6" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part VI: Compliance, Risk, and Dispute Resolution</h2>
            <p>Effective management of customs operations extends beyond procedural knowledge. It requires a deep understanding of the compliance environment, the mechanisms customs uses to assess risk, and the formal channels available for resolving disputes. This section delves into these critical aspects of the customs ecosystem.</p>

            <h3 id="6-1" className="text-base font-semibold mt-6 mb-2 truncate">6.1 The Role of the Risk Management System (RMS)</h3>
            <p>The Indian Customs' approach to cargo clearance has fundamentally shifted from a system of routine, 100% examination to a selective, intelligence-driven one. The engine behind this transformation is the Risk Management System (RMS).</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Objective:</b> The RMS is a sophisticated IT system designed to strike an optimal balance between trade facilitation and enforcement. Its primary goal is to expedite the clearance of compliant, low-risk cargo while focusing departmental resources—such as physical examination and document scrutiny—on high-risk consignments. This approach significantly reduces cargo dwell time and transaction costs for the trading community.</li>
              <li><b>How RMS Works:</b> When a Bill of Entry or Shipping Bill is filed electronically on ICEGATE, the declaration is processed in real-time by the RMS. The system analyzes the data against a vast, dynamic set of risk parameters and criteria programmed into its database. Based on this analysis, the RMS automatically assigns a risk level to the consignment and generates an electronic instruction for the customs officer, dictating the required level of intervention:
                <ul className="list-disc pl-6">
                  <li><b>Facilitation (Green Channel):</b> If the consignment is deemed low-risk, the RMS instructs the system to facilitate it. This means the declaration is accepted without assessment or examination by a customs officer, and clearance is given automatically after the payment of duties. The importer/exporter can see a status like "RMS for assessment: Not to be assessed" or "RMS for examination: Not to be examined".</li>
                  <li><b>Assessment Only (Yellow Channel):</b> The RMS may flag the declaration for scrutiny of documents, classification, and valuation by an assessing officer, but without requiring a physical examination of the goods.</li>
                  <li><b>Examination Only (Red Channel - Partial):</b> The RMS may instruct for a physical inspection of the goods to verify quantity and description, but without requiring a detailed assessment of the documents.</li>
                  <li><b>Assessment and Examination (Red Channel - Full):</b> For high-risk consignments, the RMS mandates both a thorough scrutiny of the documents by an assessing officer and a physical examination of the goods by an examining officer.</li>
                </ul>
              </li>
              <li><b>Criteria for Selection for Physical Examination:</b> The specific risk parameters used by the RMS are confidential to prevent circumvention. However, the selection is based on a comprehensive evaluation of various factors, including:
                <ul className="list-disc pl-6">
                  <li>Importer/Exporter Profile: The compliance history, trade volume, and accreditation status (e.g., Authorized Economic Operator - AEO) of the trader.</li>
                  <li>Commodity Type: The nature of the goods (e.g., sensitive items, goods prone to misdeclaration).</li>
                  <li>Origin/Destination: The country of origin or destination and its associated risk profile.</li>
                  <li>Value and Quantity: Unusually high or low declared values.</li>
                  <li>Specific Intelligence: The RMS allows for the insertion of specific "targets" based on intelligence received from agencies like the Directorate of Revenue Intelligence (DRI). It also allows for "interventions," which are programmed random checks on certain categories of goods to monitor compliance levels.</li>
                </ul>
              </li>
            </ul>
            <p>The operational model of the RMS presents a "facilitation-enforcement paradox." On one hand, the system is overwhelmingly designed to facilitate trade. Data shows that facilitation rates have steadily increased, with 86% of cargo being facilitated in 2025, a testament to the system's success in reducing dwell times. On the other hand, the system contains powerful, targeted enforcement tools running in the background. While a proper officer's ability to override RMS facilitation requires high-level approval, the system's inherent capability to select consignments based on confidential intelligence or random interventions means that no trader can afford to become complacent. The system's effectiveness lies precisely in this combination of broad facilitation and unpredictable, targeted enforcement. This paradox underscores a key strategic takeaway for businesses: the most reliable path to consistently benefiting from trade facilitation is to build and maintain an impeccable compliance record. Achieving a trusted trader status, such as becoming an Authorized Economic Operator (AEO), serves as a primary positive parameter for the RMS, significantly increasing the probability of being routed through the green channel.</p>

            <h3 id="6-2" className="text-base font-semibold mt-6 mb-2 truncate">6.2 Managing Customs Disputes</h3>
            <p>Disagreements between traders and the customs department are an inevitable part of international trade. The Customs Act, 1962, provides a structured, multi-tiered legal framework for the resolution of such disputes.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Common Areas of Dispute:</b> The most frequent sources of conflict include:
                <ul className="list-disc pl-6">
                  <li>Valuation Disputes: Disagreements over the correct assessable value of goods, particularly in cases involving related-party transactions, royalties, or license fees.</li>
                  <li>Classification Disputes: Contention over the correct ITC-HS code assigned to a product, which directly determines the applicable rate of Basic Customs Duty.</li>
                  <li>Applicability of Notifications: Disputes over the eligibility for benefits under various exemption or concessional duty notifications.</li>
                  <li>Penalties and Confiscation: Challenges against the imposition of penalties or the confiscation of goods for alleged violations of the Act.</li>
                </ul>
              </li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">The Customs Appeal Process: A Hierarchical Guide</h4>
            <p>When an importer or exporter is aggrieved by a decision or order from a customs officer, they can challenge it through a formal appeal process. The hierarchy is as follows:</p>
            <ol className="list-decimal pl-6 mb-2">
              <li><b>Adjudication Order:</b> The process begins with an Order-in-Original (O-i-O) passed by an adjudicating authority (typically an officer of the rank of Assistant/Deputy/Joint Commissioner of Customs).</li>
              <li><b>Appeal to the Commissioner (Appeals):</b> This is the first appellate authority. An appeal against an O-i-O must be filed with the Commissioner (Appeals) within 60 days from the date of communication of the order. This period can be extended by another 30 days if sufficient cause for the delay is shown. A mandatory pre-deposit of 7.5% of the disputed duty and/or penalty must be made for the appeal to be heard.</li>
              <li><b>Appeal to the Appellate Tribunal (CESTAT):</b> If a party is aggrieved by the order of the Commissioner (Appeals), they can file a second appeal before the Customs, Excise and Service Tax Appellate Tribunal (CESTAT). An appeal can also be filed directly with CESTAT against an O-i-O passed by a Commissioner or Principal Commissioner of Customs. The time limit for filing an appeal with CESTAT is three months from the date of communication of the order. The pre-deposit requirement at this stage is 10% of the disputed duty/penalty.</li>
              <li><b>Appeal to the High Court:</b> An appeal against a CESTAT order can be made to the jurisdictional High Court. However, this appeal is restricted to cases that involve a "substantial question of law". The High Court will not re-examine the facts of the case.</li>
              <li><b>Appeal to the Supreme Court:</b> The Supreme Court is the final appellate authority in the customs hierarchy. An appeal can lie with the Supreme Court against an order of the High Court or, in certain specified cases involving classification or valuation, directly against an order of CESTAT.</li>
            </ol>

            <h4 className="font-semibold mt-5 mb-2 truncate">Table: Hierarchy of Customs Appeals in India</h4>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Appellate Authority</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Order Appealed Against</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Time Limit for Filing</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Mandatory Pre-Deposit (Sec 129E)</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Relevant Form</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Commissioner (Appeals)</td>
                    <td className="border border-gray-300 px-3 py-2">Order-in-Original from an officer below the rank of Commissioner</td>
                    <td className="border border-gray-300 px-3 py-2">60 days (extendable by 30 days)</td>
                    <td className="border border-gray-300 px-3 py-2">7.5% of the disputed duty and/or penalty</td>
                    <td className="border border-gray-300 px-3 py-2">Form No. C.A.-1</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">CESTAT</td>
                    <td className="border border-gray-300 px-3 py-2">Order-in-Appeal from Commissioner (Appeals) OR Order-in-Original from a Commissioner</td>
                    <td className="border border-gray-300 px-3 py-2">3 months</td>
                    <td className="border border-gray-300 px-3 py-2">10% of the disputed duty and/or penalty (less any amount paid for the first appeal)</td>
                    <td className="border border-gray-300 px-3 py-2">Form No. C.A.-3</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">High Court</td>
                    <td className="border border-gray-300 px-3 py-2">Order from CESTAT</td>
                    <td className="border border-gray-300 px-3 py-2">-</td>
                    <td className="border border-gray-300 px-3 py-2">Not applicable</td>
                    <td className="border border-gray-300 px-3 py-2">-</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Supreme Court</td>
                    <td className="border border-gray-300 px-3 py-2">Order from High Court OR certain orders from CESTAT</td>
                    <td className="border border-gray-300 px-3 py-2">-</td>
                    <td className="border border-gray-300 px-3 py-2">Not applicable</td>
                    <td className="border border-gray-300 px-3 py-2">-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 id="6-3" className="text-base font-semibold mt-6 mb-2 truncate">6.3 Refunds and Post-Clearance Audits</h3>
            <p>Customs compliance extends beyond the point of clearance, involving procedures for claiming refunds of excess duty paid and cooperating with post-clearance audits.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Procedure for Claiming Customs Duty Refunds</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Legal Basis and Grounds:</b> The procedure for claiming a refund of customs duty is governed by Section 27 of the Customs Act. A refund can be claimed in various situations, including excess duty paid due to assessment errors, duty paid on goods that are subsequently found to be defective and re-exported, or duty paid under a provisional assessment.</li>
              <li><b>Procedure and Timeline:</b> An application for a refund must be filed within a prescribed time limit, typically one year from the date of payment of the duty (six months in some cases). The application must be accompanied by supporting documents that prove the claim. A critical requirement is to prove that the incidence of the duty has not been passed on to any other person (the buyer), a principle known as the "doctrine of unjust enrichment." If this cannot be proven, the refund amount, if sanctioned, is credited to the Consumer Welfare Fund instead of being paid to the applicant.</li>
              <li><b>Automation:</b> In a significant trade facilitation move, the entire refund process has been automated. Applicants can now file their refund applications electronically on the ICEGATE portal. The system facilitates online scrutiny, communication of deficiencies, and direct credit of the sanctioned refund amount to the applicant's bank account through the Public Financial Management System (PFMS).</li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">Understanding Post-Clearance Audits (PCA)</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Concept and Objective:</b> To ensure the integrity of the self-assessment system, Indian Customs conducts Post-Clearance Audits (PCA). This involves the audit of a trader's commercial records and customs declarations after the goods have already been cleared. The objective is to verify the correctness of the self-assessed duty, the accuracy of the declarations made, and the overall compliance with customs and allied laws, while simultaneously reducing the dwell time of cargo at the time of clearance.</li>
              <li><b>Selection for Audit:</b> The selection of Bills of Entry for PCA is not arbitrary. It is primarily based on risk evaluation conducted by the RMS. The system selects certain declarations based on its risk parameters and directs them to audit officers for scrutiny after the goods have been released. The Customs Audit Regulations, 2018, provide the statutory framework for conducting these audits.</li>
            </ul>
          </section>
          {/* Part VII: Practical Toolkit and Appendices */}
          <section id="part-7" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part VII: Practical Toolkit and Appendices</h2>
            <p>This final part serves as a practical, hands-on toolkit for trade professionals. It consolidates key information into easily digestible checklists, annotated documents, and flowcharts, transforming the comprehensive knowledge of the playbook into an actionable resource for day-to-day operations.</p>

            {/* Appendix A: Comprehensive Documentation Checklists */}
            <h3 id="appendix-a" className="text-base font-semibold mt-6 mb-2 truncate">Appendix A: Comprehensive Documentation Checklists</h3>
            <p>Accurate and complete documentation is the cornerstone of a smooth customs clearance process. The following checklists detail the mandatory and conditional documents required for import and export transactions in India.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Table: Documentation Checklist for Import Clearance</h4>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Document Name</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Purpose</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Issuing Authority</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-300 px-3 py-2">Commercial Invoice</td><td className="border border-gray-300 px-3 py-2">Evidences the transaction value of the goods; primary document for valuation.</td><td className="border border-gray-300 px-3 py-2">Overseas Supplier/Exporter</td><td className="border border-gray-300 px-3 py-2">Mandatory</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Packing List</td><td className="border border-gray-300 px-3 py-2">Details the contents, weight, and dimensions of each package; used for examination.</td><td className="border border-gray-300 px-3 py-2">Overseas Supplier/Exporter</td><td className="border border-gray-300 px-3 py-2">Mandatory</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Bill of Lading (B/L) / Airway Bill (AWB)</td><td className="border border-gray-300 px-3 py-2">Contract of carriage and title to the goods; proves ownership and transport details.</td><td className="border border-gray-300 px-3 py-2">Shipping Line / Airline</td><td className="border border-gray-300 px-3 py-2">Mandatory</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Certificate of Origin (COO)</td><td className="border border-gray-300 px-3 py-2">Certifies the country where the goods were produced; essential for claiming FTA benefits.</td><td className="border border-gray-300 px-3 py-2">Chamber of Commerce / Govt. Agency in Exporting Country</td><td className="border border-gray-300 px-3 py-2">Conditional (Mandatory for FTA claims)</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Insurance Policy / Certificate</td><td className="border border-gray-300 px-3 py-2">Evidences the insurance cost paid for the goods, required for CIF valuation.</td><td className="border border-gray-300 px-3 py-2">Insurance Company</td><td className="border border-gray-300 px-3 py-2">Mandatory</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Import Export Code (IEC)</td><td className="border border-gray-300 px-3 py-2">Mandatory 10-digit code for any entity importing into India.</td><td className="border border-gray-300 px-3 py-2">DGFT, India</td><td className="border border-gray-300 px-3 py-2">Mandatory</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">GST Registration</td><td className="border border-gray-300 px-3 py-2">Required for claiming Input Tax Credit on IGST paid on imports.</td><td className="border border-gray-300 px-3 py-2">GSTN, India</td><td className="border border-gray-300 px-3 py-2">Mandatory</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Purchase Order / Letter of Credit (L/C)</td><td className="border border-gray-300 px-3 py-2">Supporting documents to establish the terms of sale and payment.</td><td className="border border-gray-300 px-3 py-2">Importer / Importer's Bank</td><td className="border border-gray-300 px-3 py-2">Conditional (May be requested by Customs)</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Import License / Permit</td><td className="border border-gray-300 px-3 py-2">Required for the import of 'Restricted' goods as per FTP.</td><td className="border border-gray-300 px-3 py-2">DGFT / Relevant Ministry</td><td className="border border-gray-300 px-3 py-2">Conditional (For restricted items only)</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Technical Write-up / Catalogue</td><td className="border border-gray-300 px-3 py-2">Provides technical specifications of the goods; aids in classification and valuation.</td><td className="border border-gray-300 px-3 py-2">Manufacturer / Supplier</td><td className="border border-gray-300 px-3 py-2">Conditional (Especially for machinery/chemicals)</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Material Safety Data Sheet (MSDS)</td><td className="border border-gray-300 px-3 py-2">Details chemical properties, hazards, and handling for hazardous goods.</td><td className="border border-gray-300 px-3 py-2">Manufacturer / Supplier</td><td className="border border-gray-300 px-3 py-2">Conditional (Mandatory for hazardous goods)</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Test Report</td><td className="border border-gray-300 px-3 py-2">Required for certain products to prove compliance with Indian quality standards (e.g., BIS).</td><td className="border border-gray-300 px-3 py-2">Accredited Laboratory</td><td className="border border-gray-300 px-3 py-2">Conditional (For specific notified products)</td></tr>
                </tbody>
              </table>
            </div>

            <h4 className="font-semibold mt-5 mb-2 truncate">Table: Documentation Checklist for Export Clearance</h4>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Document Name</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Purpose</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Issuing Authority</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-300 px-3 py-2">Commercial Invoice</td><td className="border border-gray-300 px-3 py-2">Details the value of the goods being exported; basis for export declarations.</td><td className="border border-gray-300 px-3 py-2">Exporter</td><td className="border border-gray-300 px-3 py-2">Mandatory</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Packing List</td><td className="border border-gray-300 px-3 py-2">Details the contents of the export shipment for verification by Customs.</td><td className="border border-gray-300 px-3 py-2">Exporter</td><td className="border border-gray-300 px-3 py-2">Mandatory</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Shipping Bill / Bill of Export</td><td className="border border-gray-300 px-3 py-2">The primary legal document for seeking permission to export goods.</td><td className="border border-gray-300 px-3 py-2">Filed by Exporter/CHA</td><td className="border border-gray-300 px-3 py-2">Mandatory</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">GST Invoice</td><td className="border border-gray-300 px-3 py-2">Required for GST compliance, especially for exports made with payment of IGST.</td><td className="border border-gray-300 px-3 py-2">Exporter</td><td className="border border-gray-300 px-3 py-2">Mandatory</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Export Order / L/C</td><td className="border border-gray-300 px-3 py-2">Proof of the export order from the overseas buyer.</td><td className="border border-gray-300 px-3 py-2">Overseas Buyer / Buyer's Bank</td><td className="border border-gray-300 px-3 py-2">Mandatory</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Certificate of Origin (COO)</td><td className="border border-gray-300 px-3 py-2">Required by the importing country to determine tariff rates or for FTA benefits.</td><td className="border border-gray-300 px-3 py-2">Chamber of Commerce / DGFT (for preferential COOs)</td><td className="border border-gray-300 px-3 py-2">Conditional (As per buyer/importing country's requirement)</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">ARE-1 Form</td><td className="border border-gray-300 px-3 py-2">For clearing goods from a factory for export without payment of excise duty (if applicable).</td><td className="border border-gray-300 px-3 py-2">Exporter (counter-signed by Excise)</td><td className="border border-gray-300 px-3 py-2">Conditional (For excisable goods)</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Export License</td><td className="border border-gray-300 px-3 py-2">Required for the export of 'Restricted' or SCOMET items.</td><td className="border border-gray-300 px-3 py-2">DGFT, India</td><td className="border border-gray-300 px-3 py-2">Conditional (For restricted items only)</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Quality Inspection Certificate</td><td className="border border-gray-300 px-3 py-2">Required by the buyer or the importing country's regulations to certify quality.</td><td className="border border-gray-300 px-3 py-2">Inspection Agency</td><td className="border border-gray-300 px-3 py-2">Conditional</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Bank Realization Certificate (BRC)</td><td className="border border-gray-300 px-3 py-2">Proof of realization of export proceeds, required for closing export obligations.</td><td className="border border-gray-300 px-3 py-2">Exporter's Bank (AD Bank)</td><td className="border border-gray-300 px-3 py-2">Mandatory (Post-export)</td></tr>
                </tbody>
              </table>
            </div>

            {/* Appendix B: Annotated Document Samples */}
            <h3 id="appendix-b" className="text-base font-semibold mt-6 mb-2 truncate">Appendix B: Annotated Document Samples</h3>
            <p>To provide a practical understanding of the key customs declarations, the following are annotated samples of a Bill of Entry and a Shipping Bill, highlighting the critical information fields.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Annotated Bill of Entry (Sample)</h4>
            <ol className="list-decimal pl-6 mb-2">
              <li><b>Port Code & License No.:</b></li>
              <li><b>Importer Details:</b></li>
              <li><b>Vessel/Aircraft Details:</b> <span className="italic">Name of the vessel or flight number, and the IGM number and date filed by the carrier.</span></li>
              <li><b>Shipment Details:</b></li>
              <li><b>Invoice Details:</b></li>
              <li><b>Item-wise Details (Table):</b>
                <ul className="list-disc pl-6">
                  <li>Invoice Sl. No.</li>
                  <li>HS Code</li>
                  <li>Description of Goods: <span className="italic">A clear and accurate description of the item.</span></li>
                  <li>Quantity & Unit</li>
                  <li>Assessable Value</li>
                </ul>
              </li>
              <li><b>Duty Calculation (Table):</b>
                <ul className="list-disc pl-6">
                  <li>Duty Head</li>
                  <li>Rate</li>
                  <li>Amount</li>
                </ul>
              </li>
              <li><b>Total Duty Payable</b></li>
              <li><b>Declaration</b></li>
            </ol>

            <h4 className="font-semibold mt-5 mb-2 truncate">Annotated Shipping Bill (Sample)</h4>
            <ol className="list-decimal pl-6 mb-2">
              <li><b>Exporter Details</b></li>
              <li><b>Consignee Details:</b> <span className="italic">Name and address of the overseas buyer.</span></li>
              <li><b>Port & Transport Details</b></li>
              <li><b>Invoice Details</b></li>
              <li><b>Item-wise Details (Table):</b>
                <ul className="list-disc pl-6">
                  <li>Item Sl. No.</li>
                  <li>HS Code</li>
                  <li>Description of Goods: <span className="italic">Clear description of the goods.</span></li>
                  <li>Quantity & Net Weight</li>
                  <li>FOB Value</li>
                </ul>
              </li>
              <li><b>Export Scheme Details</b></li>
              <li><b>GST Details</b></li>
              <li><b>Declaration:</b> <span className="italic">A legal declaration signed by the exporter or their authorized CHA, confirming the accuracy of the details and compliance with export regulations.</span></li>
            </ol>

            {/* Appendix C: Process Flowcharts */}
            <h3 id="appendix-c" className="text-base font-semibold mt-6 mb-2 truncate">Appendix C: Process Flowcharts</h3>
            <p>Visualizing the clearance process helps in understanding the sequence of events and the roles of different stakeholders.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Flowchart: The Complete Import Clearance Process</h4>
            <ol className="list-decimal pl-6 mb-2">
              <li>Start: Carrier files Import General Manifest (IGM) prior to arrival.</li>
              <li>Importer/CHA files Prior Bill of Entry (B/E) on ICEGATE (up to 30 days in advance).</li>
              <li>Importer/CHA uploads supporting documents via e-Sanchit and links IRNs to B/E.</li>
              <li>B/E is processed by Risk Management System (RMS).
                <ul className="list-disc pl-6">
                  <li>Path A (Green Channel): Facilitated. → Go to Step 6.</li>
                  <li>Path B (Red/Yellow Channel): Marked for Assessment / Examination.</li>
                </ul>
              </li>
              <li>Customs Assessment & PGA Clearance.
                <ul className="list-disc pl-6">
                  <li>Assessing Officer verifies B/E (Classification, Valuation).</li>
                  <li>Simultaneously, SWIFT refers B/E to Partner Government Agencies (FSSAI, PQIS etc.) for NOC.</li>
                  <li>Officer may raise a query; Importer/CHA must respond.</li>
                </ul>
              </li>
              <li>Physical Examination (if marked by RMS or officer).</li>
              <li>Duty Payment. Importer pays assessed duties online via ICEGATE e-payment.</li>
              <li>Customs issues 'Out of Charge' (OOC) order electronically.</li>
              <li>Importer presents duty-paid B/E with OOC to the Custodian (Port/Airport Authority).</li>
              <li>Custodian issues Gate Pass and delivers goods to the importer.</li>
              <li>End.</li>
            </ol>

            <h4 className="font-semibold mt-5 mb-2 truncate">Flowchart: The Complete Export Clearance Process</h4>
            <ol className="list-decimal pl-6 mb-2">
              <li>Start: Exporter prepares goods and commercial documents (Invoice, Packing List).</li>
              <li>Exporter/CHA files Shipping Bill (S/B) electronically on ICEGATE.</li>
              <li>S/B is processed by Risk Management System (RMS).
                <ul className="list-disc pl-6">
                  <li>Path A (Green Channel): Facilitated. → Go to Step 4.</li>
                  <li>Path B (Red/Yellow Channel): Marked for Assessment / Examination.</li>
                </ul>
              </li>
              <li>Goods arrive at Port/ICD/Airport. They are presented to Customs.</li>
              <li>Customs Verification.
                <ul className="list-disc pl-6">
                  <li>Officer verifies documents against S/B.</li>
                  <li>Physical examination is conducted if required.</li>
                </ul>
              </li>
              <li>Customs issues 'Let Export Order' (LEO) electronically on the S/B.</li>
              <li>Goods are handed over to the carrier and loaded onto the vessel/aircraft.</li>
              <li>Carrier issues 'Shipped on Board' endorsement on the S/B.</li>
              <li>(Post-Export): Carrier files Export General Manifest (EGM) with Customs after departure.</li>
              <li>(Post-Export): Exporter realizes payment and obtains Bank Realization Certificate (BRC) from the bank.</li>
              <li>(Post-Export): Exporter uses S/B, EGM, and BRC data to claim export benefits (e.g., RoDTEP, Drawback) and fulfill EO.</li>
              <li>End.</li>
            </ol>

            {/* Appendix D: Key Acronyms and Glossary */}
            <h3 id="appendix-d" className="text-base font-semibold mt-6 mb-2 truncate">Appendix D: Key Acronyms and Glossary</h3>
            <p>A comprehensive list of acronyms and definitions to ensure clarity and accessibility.</p>
            <ul className="list-disc pl-6 mb-2 columns-2 gap-8">
              <li><b>AAS:</b> Advance Authorisation Scheme</li>
              <li><b>ADD:</b> Anti-Dumping Duty</li>
              <li><b>AEO:</b> Authorized Economic Operator</li>
              <li><b>AV:</b> Assessable Value</li>
              <li><b>AWB:</b> Airway Bill</li>
              <li><b>BCD:</b> Basic Customs Duty</li>
              <li><b>B/E:</b> Bill of Entry</li>
              <li><b>B/L:</b> Bill of Lading</li>
              <li><b>BRC:</b> Bank Realization Certificate</li>
              <li><b>CAROTAR:</b> Customs (Administration of Rules of Origin under Trade Agreements) Rules</li>
              <li><b>CBIC:</b> Central Board of Indirect Taxes and Customs</li>
              <li><b>CESTAT:</b> Customs, Excise and Service Tax Appellate Tribunal</li>
              <li><b>CHA:</b> Customs House Agent (also CB - Customs Broker)</li>
              <li><b>CIF:</b> Cost, Insurance, and Freight</li>
              <li><b>COO:</b> Certificate of Origin</li>
              <li><b>CVD:</b> Countervailing Duty</li>
              <li><b>DFIA:</b> Duty-Free Import Authorisation</li>
              <li><b>DGFT:</b> Directorate General of Foreign Trade</li>
              <li><b>DRI:</b> Directorate of Revenue Intelligence</li>
              <li><b>DSC:</b> Digital Signature Certificate</li>
              <li><b>DTA:</b> Domestic Tariff Area</li>
              <li><b>EGM:</b> Export General Manifest</li>
              <li><b>EO:</b> Export Obligation</li>
              <li><b>EPCG:</b> Export Promotion Capital Goods</li>
              <li><b>FOB:</b> Free on Board</li>
              <li><b>FSSAI:</b> Food Safety and Standards Authority of India</li>
              <li><b>FTA:</b> Free Trade Agreement</li>
              <li><b>FTP:</b> Foreign Trade Policy</li>
              <li><b>GST:</b> Goods and Services Tax</li>
              <li><b>HBP:</b> Handbook of Procedures</li>
              <li><b>HSN:</b> Harmonized System of Nomenclature</li>
              <li><b>ICEGATE:</b> Indian Customs Electronic Gateway</li>
              <li><b>ICD:</b> Inland Container Depot</li>
              <li><b>ICES:</b> Indian Customs EDI System</li>
              <li><b>IEC:</b> Importer-Exporter Code</li>
              <li><b>IGM:</b> Import General Manifest</li>
              <li><b>IGST:</b> Integrated Goods and Services Tax</li>
              <li><b>IRN:</b> Image Reference Number</li>
              <li><b>ITC-HS:</b> Indian Trade Classification (Harmonized System)</li>
              <li><b>KYC:</b> Know Your Customer</li>
              <li><b>LEO:</b> Let Export Order</li>
              <li><b>LUT:</b> Letter of Undertaking</li>
              <li><b>MOOWR:</b> Manufacture and Other Operations in Warehouse Regulations</li>
              <li><b>MSDS:</b> Material Safety Data Sheet</li>
              <li><b>NOC:</b> No-Objection Certificate</li>
              <li><b>OOC:</b> Out of Charge</li>
              <li><b>PAN:</b> Permanent Account Number</li>
              <li><b>PCA:</b> Post-Clearance Audit</li>
              <li><b>PGA:</b> Partner Government Agency</li>
              <li><b>PQIS:</b> Plant Quarantine Information System</li>
              <li><b>PTA:</b> Preferential Trade Agreement</li>
              <li><b>RBI:</b> Reserve Bank of India</li>
              <li><b>RMS:</b> Risk Management System</li>
              <li><b>RoDTEP:</b> Remission of Duties and Taxes on Exported Products</li>
              <li><b>RoO:</b> Rules of Origin</li>
              <li><b>S/B:</b> Shipping Bill</li>
              <li><b>SCOMET:</b> Special Chemicals, Organisms, Materials, Equipment and Technologies</li>
              <li><b>SION:</b> Standard Input-Output Norms</li>
              <li><b>SPS:</b> Sanitary and Phytosanitary</li>
              <li><b>SVB:</b> Special Valuation Branch</li>
              <li><b>SWIFT:</b> Single Window Interface for Facilitating Trade</li>
              <li><b>SWS:</b> Social Welfare Surcharge</li>
              <li><b>TEE:</b> Towns of Export Excellence</li>
            </ul>
          </section>
        </main>
      </div>
  </div>
);
};

export default Playbook9; 