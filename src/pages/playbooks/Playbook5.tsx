import React, { useState, useRef, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const sections = [
  {
    id: 'part-1',
    label: '1. Assembling Your Team: Your Logistics Partners and the Global Trade Ecosystem',
    subs: [
      { id: '1-1', label: '1.1 The Core Intermediaries: Defining the Roles of Freight Forwarders and Customs Brokers', subs: [
        { id: '1-1-1', label: '1.1.1 The Freight Forwarder: Architect of the Shipment' },
        { id: '1-1-2', label: '1.1.2 The Customs Broker: Guardian of the Border' },
      ]},
      { id: '1-2', label: '1.2 The Integrated Solution: Understanding Third-Party Logistics (3PL) Providers' },
      { id: '1-3', label: '1.3 The Convergence of Services and the Rise of the "One-Stop-Shop"' },
      { id: '1-4', label: '1.4 A Guide to Vetting and Selecting Your Logistics Partner' },
      { id: '1-5', label: '1.5 Understanding Credentials: The Importance of Licensing and Accreditation' },
      { id: 'table-1-1', label: 'Table 1.1: Freight Forwarder vs. Customs Broker vs. 3PL Provider: A Comparative Overview' },
      { id: 'table-1-2', label: 'Table 1.2: Vetting Your Logistics Partner: A Comprehensive Checklist' },
    ],
  },
  {
    id: 'part-2',
    label: '2. The Language of Trade: A Deep Dive into Incoterms® 2020',
    subs: [
      { id: '2-1', label: '2.1 The Framework Explained: What Incoterms® Do (and Do Not) Cover', subs: [
        { id: '2-1-1', label: '2.1.1 Scope of Coverage: Defining Obligations' },
        { id: '2-1-2', label: '2.1.2 Critical Exclusions: What Is Not Covered' },
      ]},
      { id: '2-2', label: '2.2 The 11 Incoterms® Rules: A Detailed Breakdown', subs: [
        { id: '2-2-1', label: '2.2.1 Group 1: Rules for Any Mode(s) of Transport' },
        { id: '2-2-2', label: '2.2.2 Group 2: Rules for Sea and Inland Waterway Transport' },
      ]},
      { id: '2-3', label: '2.3 Key Changes in Incoterms® 2020' },
      { id: '2-4', label: '2.4 Strategic Selection: Choosing the Right Incoterm' },
      { id: 'table-2-1', label: 'Table 2.1: Incoterms® 2020: A Comprehensive Chart of Responsibility, Cost, and Risk Transfer' },
      { id: 'table-2-2', label: 'Table 2.2: Scenario-Based Incoterm Selection Guide' },
    ],
  },
  {
    id: 'part-3',
    label: '3. Choosing Your Mode: A Strategic Analysis of International Transport',
    subs: [
      { id: '3-1', label: '3.1 The Four Pillars of Global Movement: A Comparative Overview' },
      { id: 'table-3-1', label: 'Table 3.1: A Comparative Analysis of International Transportation Modes' },
      { id: '3-2', label: '3.2 Ocean Freight Masterclass: The Workhorse of Global Trade', subs: [
        { id: '3-2-1', label: '3.2.1 Containerized Cargo Services' },
        { id: '3-2-2', label: '3.2.2 Specialized Ocean Services' },
      ]},
      { id: '3-3', label: '3.3 Air Freight Masterclass: The Premium Choice for Speed' },
      { id: '3-4', label: '3.4 Overland Transport: Road and Rail Freight' },
      { id: '3-5', label: '3.5 Mapping Global Commerce: Major Trade Lanes, Ports, and Chokepoints' },
      { id: 'table-3-2', label: 'Table 3.2: Ocean Freight Service Selection Guide' },
      { id: 'table-3-3', label: 'Table 3.3: Air Freight Service Selection Guide' },
    ],
  },
  {
    id: 'part-4',
    label: '4. Preparing Your Cargo: Best Practices in Packaging, Labeling, and Stowage',
    subs: [
      { id: '4-1', label: '4.1 The Science of Protection: International Packaging Standards' },
      { id: '4-2', label: '4.2 Communicating with Care: A Visual Guide to Handling Marks and Labels' },
      { id: '4-3', label: '4.3 The Art of the Stow: Best Practices for Cargo Stowage and Load Planning' },
      { id: '4-4', label: '4.4 A Closer Look: Container Types, Dimensions, and Capacities' },
      { id: 'table-4-1', label: 'Table 4.1: ISO 780 Pictorial Handling Marks: A Visual Guide' },
      { id: 'table-4-2', label: 'Table 4.2: Shipping Container Specifications and Use Cases' },
      { id: 'table-4-3', label: 'Table 4.3: Export Packaging Compliance Checklist' },
    ],
  },
];

// Flatten all ids for scroll tracking
const flattenIds = (arr) => arr.flatMap(s => [s.id, ...(s.subs ? flattenIds(s.subs) : [])]);
const sectionIds = flattenIds(sections);

const Playbook5 = () => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');
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
      if (!found) setActiveSection(sectionIds[0] || '');
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
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 mt-4 font-serif truncate">The Definitive Playbook for International Logistics and Freight Management</h1>
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
          {/* Part 1: Full content integration */}
          <section id="part-1" className="mb-8">
            <h2 className="text-xl font-bold mb-3 truncate">1. Assembling Your Team: Your Logistics Partners and the Global Trade Ecosystem</h2>
            <p>The successful execution of international trade hinges not only on the quality of the goods or the terms of the sale but fundamentally on the seamless movement of those goods from origin to destination. This complex process, known as international logistics, is rarely managed in-house by exporters or importers. Instead, it relies on a network of specialized partners who navigate the intricate web of transportation, documentation, and regulation. The selection of these partners is not a simple procurement task; it is a critical strategic decision that directly impacts a company's costs, efficiency, customer satisfaction, and legal compliance. Understanding the distinct roles within this ecosystem—and the accelerating trend of their convergence—is the first step toward building a resilient and effective global supply chain.</p>

            {/* 1.1 */}
            <section id="1-1" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">1.1 The Core Intermediaries: Defining the Roles of Freight Forwarders and Customs Brokers</h2>
              <p>At the heart of international logistics are two key intermediaries: the freight forwarder and the customs broker. While their functions are often intertwined and increasingly offered by a single company, their core responsibilities are distinct and address different stages of the shipment's journey.</p>

              {/* 1.1.1 */}
              <section id="1-1-1" className="mb-4 ml-4">
                <h3 className="text-base font-semibold mb-2">1.1.1 The Freight Forwarder: Architect of the Shipment</h3>
                <p>A freight forwarder can be conceptualized as the "travel agent" or "architect" for cargo. They are logistics specialists who act on behalf of the exporter or importer to orchestrate and manage the entire transportation process. A freight forwarder does not physically move the freight themselves; rather, they are agents who contract with the actual carriers—such as shipping lines, airlines, and trucking companies—to perform the transport. Their expertise lies in the planning and execution of the physical movement of goods across international borders.</p>
                <p>The services provided by a freight forwarder are comprehensive and cover the entire logistics chain:</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Transport Arrangement:</b> They arrange for the transportation of goods via various modes, including air, sea, road, or rail, selecting the most efficient and cost-effective options based on the cargo's characteristics and the client's timeline.</li>
                  <li><b>Rate Negotiation:</b> Leveraging their industry relationships and shipment volumes, forwarders negotiate freight rates with carriers, often securing more favorable pricing than an individual shipper could achieve on their own.</li>
                  <li><b>Cargo Space Booking:</b> They book cargo space on vessels, aircraft, trains, or trucks.</li>
                  <li><b>Documentation Preparation:</b> They prepare and process essential shipping and export documents, such as the Bill of Lading and export declarations, ensuring compliance with both origin and destination country regulations.</li>
                  <li><b>Consolidation Services:</b> For shippers with smaller consignments, forwarders offer consolidation services, known as Less than Container Load (LCL) for ocean freight or Less than Truckload (LTL) for road freight. This involves combining smaller shipments from multiple clients into a single full container or truck, allowing shippers to share the cost of transport.</li>
                  <li><b>Warehousing and Inland Transport:</b> They can arrange for temporary warehousing, storage, and inland transportation at both the origin and destination points.</li>
                  <li><b>Cargo Insurance:</b> Forwarders can arrange for cargo insurance to protect the shipment against loss or damage during transit.</li>
                  <li><b>Tracking and Visibility:</b> Modern forwarders provide tracking services, often through sophisticated technology platforms, allowing clients to monitor the progress of their shipment in real-time.</li>
                </ul>
              </section>

              {/* 1.1.2 */}
              <section id="1-1-2" className="mb-4 ml-4">
                <h3 className="text-base font-semibold mb-2">1.1.2 The Customs Broker: Guardian of the Border</h3>
                <p>A customs broker is a highly specialized professional, licensed and regulated by the national customs authority of the destination country (e.g., U.S. Customs and Border Protection - CBP). Their exclusive focus is on the legal and regulatory compliance required for goods to cross a border and enter a country's commerce. They act as the agent for the importer, navigating the complex and often opaque world of customs regulations.</p>
                <p>The customs broker's role is fundamentally one of legal compliance at the border, dealing exclusively with the import side of the transaction. Their key services include:</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Tariff Classification:</b> Correctly classifying imported goods using the Harmonized System (HS) code. This is a critical function, as the HS code determines the applicable duty rate and any other government agency requirements.</li>
                  <li><b>Duty and Tax Calculation:</b> Calculating the precise amount of customs duties, taxes (such as Value-Added Tax or Goods and Services Tax), and fees owed to the government.</li>
                  <li><b>Customs Entry Filing:</b> Preparing and electronically filing all necessary documentation with the customs authority to secure the legal release of the cargo.</li>
                  <li><b>Regulatory Compliance:</b> Ensuring the imported goods meet all admissibility requirements, which may involve regulations from other government agencies (e.g., the Food and Drug Administration or the Department of Agriculture in the U.S.).</li>
                  <li><b>Payment Facilitation:</b> Arranging for the payment of duties and taxes on behalf of the importer.</li>
                </ul>
                <p>The fundamental distinction is this: the freight forwarder manages the movement of the goods from point A to point B, while the customs broker manages the legal entry of those goods into point B. A forwarder's concern ends when the cargo is delivered; a broker's concern is ensuring that delivery is legally permissible.</p>
              </section>
            </section>

            {/* 1.2 */}
            <section id="1-2" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">1.2 The Integrated Solution: Understanding Third-Party Logistics (3PL) Providers</h2>
              <p>While freight forwarders and customs brokers handle specific segments of the shipping process, a Third-Party Logistics (3PL) provider offers a much broader and more integrated suite of services. A 3PL is a full-service partner that outsources a company's entire logistics operations, often combining the functions of a freight forwarder and customs broker with a wide array of additional supply chain management services.</p>
              <p>The scope of 3PL services can be extensive and is often customized to a client's specific needs:</p>
              <ul className="list-disc pl-6 mb-2">
                <li><b>Transportation Management:</b> This includes freight brokerage (matching shippers with carriers), carrier management, and optimization of both domestic and international transport.</li>
                <li><b>Warehousing and Distribution:</b> 3PLs often manage long-term storage, inventory management, and distribution of goods from their own or partnered warehouses.</li>
                <li><b>Order Fulfillment:</b> For e-commerce and retail businesses, 3PLs can handle the entire fulfillment process, including picking and packing orders, and managing returns (reverse logistics).</li>
                <li><b>Value-Added Services:</b> Many 3PLs offer additional services such as product kitting, assembly, customized packaging, and labeling.</li>
                <li><b>Technology Integration:</b> A key offering of modern 3PLs is access to advanced technology, such as a Transportation Management System (TMS) or Warehouse Management System (WMS). These platforms provide real-time visibility, data analytics, and operational efficiency.</li>
                <li><b>Strategic Consulting:</b> A true 3PL partner acts as a strategic consultant, offering expert advice on supply chain optimization, route planning, and navigating complex logistics challenges.</li>
              </ul>
              <p>The primary benefit of engaging a 3PL is the ability to outsource the entire logistics function to a single, expert partner. This allows a business to focus on its core competencies, such as product development, marketing, and sales, while leveraging the 3PL's expertise, network, and technology to create a more efficient and scalable supply chain. For growing businesses, a 3PL provides the flexibility to scale operations up or down in response to market demand without the need for significant capital investment in infrastructure and staff.</p>
            </section>

            {/* 1.3 */}
            <section id="1-3" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">1.3 The Convergence of Services and the Rise of the "One-Stop-Shop"</h2>
              <p>The modern logistics landscape is characterized by a significant convergence of the roles previously held by distinct entities. The clear lines that once separated freight forwarders, customs brokers, and 3PLs have become increasingly blurred. Many large freight forwarding companies have expanded their service offerings by establishing in-house customs brokerage departments or acquiring licensed brokerage firms. Similarly, comprehensive 3PL providers now routinely offer international freight forwarding and customs clearance as part of their integrated service packages.</p>
              <p>This trend is a direct market response to the demand from shippers for simplification, efficiency, and reduced risk. Partnering with an integrated, "one-stop-shop" provider offers several compelling advantages, particularly for small and medium-sized enterprises (SMEs) or those new to international trade:</p>
              <ul className="list-disc pl-6 mb-2">
                <li><b>Simplified Vendor Management:</b> The shipper deals with a single point of contact and a single invoice for the entire door-to-door process, rather than managing separate relationships and contracts with a forwarder, a customs broker, and potentially multiple trucking companies.</li>
                <li><b>Seamless Communication:</b> It eliminates the risk of communication gaps or misaligned priorities between the logistics partner managing the transport and the customs partner managing the legal clearance. When one company is responsible for the entire process, accountability is clear and information flows more smoothly.</li>
                <li><b>End-to-End Visibility:</b> Integrated providers are better positioned to offer true end-to-end tracking and visibility, as they control (or at least manage) all segments of the supply chain.</li>
              </ul>
              <p>While the convenience of a "one-stop-shop" is undeniable, it introduces a new, more subtle layer of strategic risk. The consolidation of services can sometimes create a "black box," where the shipper loses visibility into the quality and nature of the individual functions being performed. For instance, a forwarder offering "customs clearance services" may have a highly competent in-house team, or they may simply be subcontracting the work to a local broker of unknown quality at the destination. Likewise, a provider's "global network" could consist of wholly-owned offices with consistent standards, or it could be a loose affiliation of independent agents with varying levels of reliability. The seamless facade of the integrated provider can potentially obscure weak links in the supply chain. This elevates the importance of a thorough and sophisticated vetting process.</p>
            </section>

            {/* 1.4 */}
            <section id="1-4" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">1.4 A Guide to Vetting and Selecting Your Logistics Partner</h2>
              <p>Choosing a logistics partner is a long-term strategic decision that should be approached with the same rigor as any major business procurement. A methodical evaluation process is essential to mitigate the risks of poor service, compliance failures, and hidden costs.</p>
              <ul className="list-disc pl-6 mb-2">
                <li><b>Step 1: Internal Needs Assessment:</b> Before engaging with potential partners, a business must first conduct a thorough internal analysis of its own shipping requirements. This involves clearly defining the type of goods to be transported (e.g., general cargo, perishable, hazardous materials), the expected volume and frequency of shipments, the primary trade lanes (origin and destination countries), and any specific handling or service requirements. This initial step creates a clear benchmark against which potential partners can be measured.</li>
                <li><b>Step 2: Research and Shortlisting:</b> With a clear understanding of needs, the next step is to identify and research potential partners. This can be done through online searches, industry directories (such as those maintained by trade associations), and, most valuably, by seeking recommendations from trusted peers or business networks. Pay close attention to a company's reputation, years of operation, and customer reviews or testimonials.</li>
                <li><b>Step 3: Deep Evaluation:</b> The short-listed candidates should be subjected to a deeper evaluation across several key criteria:
                  <ul className="list-disc pl-6">
                    <li>Experience and Expertise: Does the provider have demonstrable experience in your specific industry (e.g., automotive, pharmaceuticals, retail) and a strong track record on your key trade lanes? Ask for case studies or examples of similar shipments they have handled.</li>
                    <li>Network and Coverage: Assess the strength and nature of their global network. Do they have owned offices or established, long-term agency partnerships in your critical markets? A strong network ensures they can efficiently handle shipments door-to-door.</li>
                    <li>Technology and Visibility: Evaluate their technology platform. Do they offer a user-friendly portal for real-time shipment tracking, documentation management, and reporting? The quality of their technology is a direct indicator of their commitment to transparency and modern logistics management.</li>
                    <li>Risk Management: Inquire about their risk management protocols. What are their contingency plans for disruptions such as port strikes, weather events, or political instability? What level of cargo insurance do they offer, and how do they handle claims?</li>
                  </ul>
                </li>
                <li><b>Step 4: The Vetting Interview:</b> A formal interview or request for proposal (RFP) is the opportunity to probe deeper. The questions should move beyond "what" services they offer to "how" they deliver them. Shippers should not just ask, "Can you handle customs clearance?" but rather, "Who exactly on your team or which partner firm will be handling our customs entries? What are their specific credentials and how do you measure their performance?" Similarly, instead of asking, "Do you have a partner in our destination country?" ask, "What is the nature of your relationship with your agent there? How long have you worked together, and what are the key performance indicators (KPIs) you use to manage that relationship?" This line of questioning pierces the "black box" of the integrated service model and reveals the true quality of the underlying operations.</li>
                <li><b>Step 5: Pricing and Contract Review:</b> Request detailed, itemized quotes from your final candidates. A transparent quote will break down all costs, including the base freight rate, fuel surcharges, terminal handling charges, and fees for documentation and customs clearance. Be wary of unusually low or "all-in" prices that may conceal significant destination charges or other hidden fees. The goal is to find the best value, which is a balance of competitive cost and high-quality, reliable service. Finally, carefully review the terms and conditions of their service contract before signing.</li>
              </ul>
            </section>

            {/* 1.5 */}
            <section id="1-5" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">1.5 Understanding Credentials: The Importance of Licensing and Accreditation</h2>
              <p>In the complex and highly regulated world of international trade, licensing and accreditation are not mere formalities. They are critical indicators of a partner's legitimacy, financial stability, and professional competence. Verifying these credentials should be a non-negotiable step in any vetting process.</p>
              <ul className="list-disc pl-6 mb-2">
                <li><b>Ocean Freight (U.S. Focus):</b> In the United States, any entity arranging ocean transportation must be licensed by the Federal Maritime Commission (FMC) as an Ocean Transportation Intermediary (OTI). This category includes both Ocean Freight Forwarders and Non-Vessel Operating Common Carriers (NVOCCs). The licensing process is rigorous, requiring the applicant to designate a "Qualifying Individual" (QI) who must demonstrate a minimum of three years of relevant experience in the U.S. maritime industry. Furthermore, OTIs are required to furnish proof of financial responsibility, typically in the form of a surety bond, which protects shippers in the event of non-performance. A company's OTI license status can be verified on the FMC website.</li>
                <li><b>Air Freight (Global Focus):</b> For air freight, the key credential is accreditation by the International Air Transport Association (IATA). An IATA Cargo Agent is recognized by airlines worldwide as a professional and financially sound partner. This accreditation allows the forwarder to issue their own Air Waybills (AWBs) on behalf of airlines and to participate in IATA's Cargo Account Settlement Systems (CASS), a centralized billing and payment system that streamlines financial transactions between agents and airlines. IATA accreditation signals a high level of operational competence and provides access to a global distribution network.</li>
                <li><b>Customs Brokerage (U.S. Focus):</b> In the United States, a customs broker must be individually licensed by U.S. Customs and Border Protection (CBP). This requires passing a notoriously difficult examination on customs law, tariff classification, and import regulations, as well as undergoing a thorough background check. This license ensures that the broker possesses the requisite expertise to handle the legal and financial complexities of customs entries, a responsibility that ultimately falls on the importer of record.</li>
              </ul>
              <p>By verifying these credentials, a shipper can gain confidence that they are partnering with a legitimate, knowledgeable, and financially responsible organization, thereby mitigating significant compliance and operational risks.</p>
            </section>

            {/* Table 1.1 */}
            <section id="table-1-1" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Table 1.1: Freight Forwarder vs. Customs Broker vs. 3PL Provider: A Comparative Overview</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Feature</th>
                      <th className="border px-2 py-1">Freight Forwarder</th>
                      <th className="border px-2 py-1">Customs Broker</th>
                      <th className="border px-2 py-1">Third-Party Logistics (3PL) Provider</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Core Function</td>
                      <td className="border px-2 py-1">Architect of transportation; manages the physical movement of goods.</td>
                      <td className="border px-2 py-1">Legal compliance agent; manages the legal entry of goods at a border.</td>
                      <td className="border px-2 py-1">Strategic outsourcing partner; manages a broad spectrum of supply chain functions.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Primary Responsibility</td>
                      <td className="border px-2 py-1">To arrange efficient and cost-effective transport from origin to destination.</td>
                      <td className="border px-2 py-1">To ensure goods comply with all customs laws and regulations of the importing country.</td>
                      <td className="border px-2 py-1">To integrate and optimize a client's logistics operations, often end-to-end.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Scope of Services</td>
                      <td className="border px-2 py-1">Transport arrangement (sea, air, land), rate negotiation, documentation, consolidation, cargo insurance, tracking.</td>
                      <td className="border px-2 py-1">Tariff classification (HS codes), duty/tax calculation and payment, customs entry filing, regulatory compliance.</td>
                      <td className="border px-2 py-1">Encompasses freight forwarding and customs brokerage, plus warehousing, inventory management, order fulfillment, kitting, reverse logistics, and technology platforms (TMS/WMS).</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Business Model</td>
                      <td className="border px-2 py-1">Acts as an agent. Revenue often from the margin between the carrier rate they pay and the rate they charge the shipper, plus service fees.</td>
                      <td className="border px-2 py-1">Acts as an agent for the importer. Revenue from service fees for customs clearance activities.</td>
                      <td className="border px-2 py-1">Acts as a strategic partner. Revenue from management fees, transaction-based fees, or a combination, depending on the contract.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">When to Choose</td>
                      <td className="border px-2 py-1">For managing specific international or domestic shipments, especially when seeking expertise in transport modes and documentation.</td>
                      <td className="border px-2 py-1">Exclusively for the import portion of a shipment. Essential for ensuring legal compliance when bringing goods into a country.</td>
                      <td className="border px-2 py-1">When seeking to outsource and optimize a significant portion or all of your supply chain, requiring integrated services, scalability, and strategic expertise.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Table 1.2 */}
            <section id="table-1-2" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Table 1.2: Vetting Your Logistics Partner: A Comprehensive Checklist</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Category</th>
                      <th className="border px-2 py-1">Key Questions to Ask</th>
                      <th className="border px-2 py-1">What to Look For (Green/Red Flags)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Experience & Specialization</td>
                      <td className="border px-2 py-1">- Do you have experience in our industry and with our specific product types (e.g., perishables, hazardous)?<br/>- Can you provide case studies or references from clients with similar needs?</td>
                      <td className="border px-2 py-1"><b>Green:</b> Demonstrable track record, understands industry-specific nuances.<br/><b>Red:</b> Vague answers, no relevant case studies, a "one-size-fits-all" approach.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Network & Coverage</td>
                      <td className="border px-2 py-1">- What is the nature of your network in our key origin/destination countries (owned offices vs. agents)?<br/>- How do you vet and manage your overseas partners?</td>
                      <td className="border px-2 py-1"><b>Green:</b> Strong presence (owned or long-term partners) in your trade lanes, clear performance management of agents.<br/><b>Red:</b> Unclear or new relationships with agents, limited geographic coverage.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Technology & Visibility</td>
                      <td className="border px-2 py-1">- What technology platform do you use for shipment tracking and management?<br/>- Can we get real-time status updates? Can we access documentation online?</td>
                      <td className="border px-2 py-1"><b>Green:</b> Modern, user-friendly portal with real-time tracking, digital document access, and reporting capabilities.<br/><b>Red:</b> Manual tracking via email/phone, outdated systems, lack of transparency.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Customs & Compliance</td>
                      <td className="border px-2 py-1">- Who handles customs clearance? Is it an in-house team or a third party?<br/>- What are their credentials (e.g., license number)?<br/>- How do you handle customs inspections or regulatory issues?</td>
                      <td className="border px-2 py-1"><b>Green:</b> Licensed, experienced in-house brokerage or a clearly identified, vetted partner. Proactive approach to compliance.<br/><b>Red:</b> Ambiguity about who performs the clearance, inability to provide credentials.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Pricing & Transparency</td>
                      <td className="border px-2 py-1">- Can you provide a detailed, itemized quote breaking down all origin, freight, and destination charges?<br/>- What are your payment terms?</td>
                      <td className="border px-2 py-1"><b>Green:</b> Fully transparent, all-inclusive quotes with no hidden fees. Clear explanation of all line items.<br/><b>Red:</b> Vague "all-in" rates, reluctance to itemize charges, unusually low prices that may hide destination costs.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Risk Management & Insurance</td>
                      <td className="border px-2 py-1">- What type of cargo insurance do you offer?<br/>- What is your process for filing a claim?<br/>- What are your contingency plans for major disruptions?</td>
                      <td className="border px-2 py-1"><b>Green:</b> Offers comprehensive insurance options, has a clear and efficient claims process, and can articulate contingency plans.<br/><b>Red:</b> Limited insurance options, vague claims process, no clear strategy for disruptions.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Licensing & Accreditation</td>
                      <td className="border px-2 py-1">- Can you provide your FMC (OTI) license number (for ocean)?<br/>- Are you an IATA accredited agent (for air)?</td>
                      <td className="border px-2 py-1"><b>Green:</b> Readily provides all relevant licenses and accreditations, which can be independently verified.<br/><b>Red:</b> Hesitation or inability to provide licensing information.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </section>

          {/* Part 2: Full content integration */}
          <section id="part-2" className="mb-8">
            <h2 className="text-xl font-bold mb-3 truncate">2. The Language of Trade: A Deep Dive into Incoterms® 2020</h2>
            <p>Once a logistics partner is selected, the terms of the sale itself must be clearly defined. In international trade, this is accomplished through a specialized set of rules known as Incoterms®. These rules are not merely technical jargon; they form a critical part of the sales contract, creating a universal language that defines the precise allocation of costs, risks, and responsibilities between the seller and the buyer. A misunderstanding or misapplication of these terms can lead to unexpected costs, uninsured losses, and severe commercial disputes. Mastering this language is therefore fundamental to sound financial and risk management in global trade.</p>

            {/* 2.1 */}
            <section id="2-1" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">2.1 The Framework Explained: What Incoterms® Do (and Do Not) Cover</h2>
              <p>The Incoterms® rules are a set of eleven distinct, three-letter trade terms published by the International Chamber of Commerce (ICC). First introduced in 1936 and periodically updated to reflect changes in global trade practices, the current version is Incoterms® 2020. Their primary purpose is to eliminate uncertainty and potential for conflict in international contracts by providing a globally accepted framework for the division of obligations between the seller (exporter) and the buyer (importer).</p>

              {/* 2.1.1 */}
              <section id="2-1-1" className="mb-4 ml-4">
                <h3 className="text-base font-semibold mb-2">2.1.1 Scope of Coverage: Defining Obligations</h3>
                <p>Each of the eleven Incoterms® rules precisely clarifies a set of critical obligations:</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Tasks:</b> The rules specify which party is responsible for arranging and contracting for the main and any pre- or on-carriage transport.</li>
                  <li><b>Costs:</b> They delineate which party pays for each segment of the journey, including freight charges, terminal handling fees, and insurance premiums.</li>
                  <li><b>Formalities:</b> They assign responsibility for carrying out and paying for export and import customs clearance, including obtaining necessary licenses and permits.</li>
                  <li><b>Risk:</b> Most critically, each rule defines the exact point in the shipment's journey where the risk of loss or damage to the goods transfers from the seller to the buyer. This transfer of risk is the central concept of the Incoterms® rules.</li>
                </ul>
              </section>

              {/* 2.1.2 */}
              <section id="2-1-2" className="mb-4 ml-4">
                <h3 className="text-base font-semibold mb-2">2.1.2 Critical Exclusions: What Is Not Covered</h3>
                <p>It is equally important to understand what the Incoterms® rules do not address, as these aspects must be covered elsewhere in the commercial sales contract:</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Contract of Sale:</b> They do not address all conditions of the sale, such as the specifications of the goods being sold or the contract price.</li>
                  <li><b>Payment Terms:</b> They do not reference the method, currency, or timing of payment between the buyer and seller.</li>
                  <li><b>Transfer of Title:</b> A common and critical misconception is that Incoterms® determine ownership. They do not. The point at which the legal title or ownership of the goods passes from seller to buyer must be explicitly defined in the sales agreement.</li>
                  <li><b>Breach of Contract:</b> They do not address remedies for breach of contract, delayed delivery, or dispute resolution mechanisms.</li>
                </ul>
              </section>
            </section>

            {/* 2.2 */}
            <section id="2-2" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">2.2 The 11 Incoterms® Rules: A Detailed Breakdown</h2>
              <p>The Incoterms® 2020 rules are organized into two categories based on the applicability to the mode of transport. This structure is essential, as using a rule designed for sea freight in an air or road transport scenario can create significant legal and financial risks.</p>

              {/* 2.2.1 */}
              <section id="2-2-1" className="mb-4 ml-4">
                <h3 className="text-base font-semibold mb-2">2.2.1 Group 1: Rules for Any Mode(s) of Transport</h3>
                <p>These seven rules are designed for versatility and can be used for any mode of transport, including multimodal shipments that combine road, rail, air, and sea.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>EXW – Ex Works (...named place of delivery)</b>
                    <ul className="list-disc pl-6">
                      <li><b>Definition:</b> The seller fulfills their obligation by making the goods available at their own premises (e.g., factory, warehouse). The seller is not responsible for loading the goods onto the buyer's collecting vehicle or for clearing the goods for export. This term represents the minimum obligation for the seller.</li>
                      <li><b>Risk Transfer:</b> Risk transfers to the buyer when the goods are placed at their disposal at the named place.</li>
                      <li><b>Costs:</b> The buyer bears all costs and risks from the moment the goods are made available at the seller's premises. This includes loading, all transportation, insurance, and both export and import clearance.</li>
                      <li><b>Practical Scenario:</b> A large, sophisticated manufacturing company in Germany buys specialized components from a small workshop in Italy. The German buyer has its own extensive logistics network and prefers to manage the entire shipping process, from pickup at the Italian workshop to final delivery, to control costs and timing. They agree on EXW Florence.</li>
                      <li><b>Strategic Considerations:</b> While popular for its simplicity for the seller, EXW is often problematic. It places the burden of export clearance on the buyer, who may not be in a position to legally handle export formalities in the seller's country. It is often best used for domestic or intra-regional trade where no customs formalities are required.</li>
                    </ul>
                  </li>
                  <li><b>FCA – Free Carrier (...named place of delivery)</b>
                    <ul className="list-disc pl-6">
                      <li><b>Definition:</b> The seller delivers the goods to the carrier or another person nominated by the buyer at the seller's premises or another named place (e.g., a forwarder's warehouse, a port terminal). The seller is responsible for clearing the goods for export.</li>
                      <li><b>Risk Transfer:</b> Risk transfers to the buyer once the goods are delivered to the nominated carrier at the named place. If the named place is the seller's premises, delivery occurs when the goods are loaded onto the buyer's transport. If it is another place, delivery occurs when the goods are on the seller's transport, ready for unloading.</li>
                      <li><b>Costs:</b> The seller pays for pre-carriage to the named point of delivery and for export customs clearance. The buyer pays for the main carriage, insurance, and import clearance.</li>
                      <li><b>Practical Scenario:</b> A U.S. apparel company buys a container of garments from a factory in Vietnam. They agree on FCA Ho Chi Minh City Port. The Vietnamese seller is responsible for packing the container, clearing it for export, and delivering it to the carrier nominated by the U.S. buyer at the designated container yard in the port. Once the container is delivered to the carrier, the U.S. buyer's responsibility begins.</li>
                      <li><b>Strategic Considerations:</b> FCA is a highly flexible and recommended rule for containerized shipments, as it accurately reflects the modern practice of handing over goods to a carrier at an inland terminal, not just "over the ship's rail".</li>
                    </ul>
                  </li>
                  <li><b>CPT – Carriage Paid To (...named place of destination)</b>
                    <ul className="list-disc pl-6">
                      <li><b>Definition:</b> The seller delivers the goods to the carrier they have contracted and pays for the freight to the named destination. The seller is responsible for export clearance.</li>
                      <li><b>Risk Transfer:</b> This is a crucial point of distinction. Although the seller pays for freight to the destination, the risk transfers to the buyer much earlier: at the point of origin, when the seller hands the goods over to the first carrier.</li>
                      <li><b>Costs:</b> The seller pays for export clearance and main carriage to the destination. The buyer is responsible for any costs after arrival at the destination (unless included in the freight contract), insurance, and import clearance.</li>
                      <li><b>Practical Scenario:</b> A Canadian company sells machine parts to a buyer in Brazil and agrees on CPT Port of Santos. The Canadian seller arranges and pays for the ocean freight to Santos. However, if the ship sinks mid-Atlantic, the loss is the Brazilian buyer's, as risk transferred when the goods were loaded onto the ship in Canada.</li>
                      <li><b>Strategic Considerations:</b> The buyer should be aware that they bear the risk of loss during the main transit and should therefore arrange their own cargo insurance.</li>
                    </ul>
                  </li>
                  <li><b>CIP – Carriage and Insurance Paid To (...named place of destination)</b>
                    <ul className="list-disc pl-6">
                      <li><b>Definition:</b> CIP is identical to CPT, with one critical addition: the seller is also required to purchase cargo insurance against the buyer's risk of loss or damage during carriage.</li>
                      <li><b>Risk Transfer:</b> Same as CPT; risk transfers from seller to buyer at the point of origin when the goods are delivered to the first carrier.</li>
                      <li><b>Costs:</b> The seller pays for export clearance, main carriage, and insurance to the destination. The buyer pays for import clearance.</li>
                      <li><b>Practical Scenario:</b> An electronics manufacturer in South Korea sells a shipment of high-value microchips to a customer in the Netherlands under CIP Amsterdam Schiphol Airport. The seller arranges and pays for the air freight and also procures a comprehensive "all-risk" insurance policy covering the goods until they arrive at the airport.</li>
                      <li><b>Strategic Considerations:</b> Under Incoterms® 2020, CIP requires the seller to obtain a higher level of insurance coverage (Institute Cargo Clause A, or "all risks") than CIF. This makes it suitable for manufactured goods, whereas CPT might be used when the buyer prefers to arrange their own specific insurance.</li>
                    </ul>
                  </li>
                  <li><b>DAP – Delivered at Place (...named place of destination)</b>
                    <ul className="list-disc pl-6">
                      <li><b>Definition:</b> The seller delivers when the goods are placed at the disposal of the buyer on the arriving means of transport, ready for unloading at the named place of destination. The seller bears all risks involved in bringing the goods to the named place.</li>
                      <li><b>Risk Transfer:</b> Risk transfers at the named place of destination, just before unloading.</li>
                      <li><b>Costs:</b> The seller bears all costs up to the point of delivery at the destination, including transport and export clearance. The buyer is responsible for the cost and risk of unloading and for all import customs formalities and duties.</li>
                      <li><b>Practical Scenario:</b> A French winery sells a pallet of wine to a distributor in New York, agreeing to DAP at the distributor's warehouse in Brooklyn. The French seller is responsible for all costs and risks of getting the wine to the Brooklyn warehouse. The New York distributor is then responsible for unloading the truck and for clearing the wine through U.S. customs and paying all duties and taxes.</li>
                      <li><b>Strategic Considerations:</b> This rule is very useful for sellers who want to offer a "delivered" price but do not want to take on the complex responsibility of import clearance in the buyer's country.</li>
                    </ul>
                  </li>
                  <li><b>DPU – Delivered at Place Unloaded (...named place of destination)</b>
                    <ul className="list-disc pl-6">
                      <li><b>Definition:</b> The seller delivers when the goods, once unloaded from the arriving means of transport, are placed at the disposal of the buyer at the named place of destination.</li>
                      <li><b>Risk Transfer:</b> Risk transfers after the goods have been unloaded at the named place of destination.</li>
                      <li><b>Costs:</b> The seller bears all costs up to and including unloading at the destination. The buyer is responsible for import customs clearance and any related duties/taxes.</li>
                      <li><b>Practical Scenario:</b> A heavy machinery manufacturer in Japan sells a large industrial press to a factory in Mexico under DPU at the factory's loading dock. The seller is responsible for all transport costs and for the significant cost and risk of unloading the heavy press from the truck at the buyer's site.</li>
                      <li><b>Strategic Considerations:</b> DPU is the only Incoterm that requires the seller to unload the goods. Sellers should only agree to this term if they are confident they can arrange and manage the unloading process at the foreign destination.</li>
                    </ul>
                  </li>
                  <li><b>DDP – Delivered Duty Paid (...named place of destination)</b>
                    <ul className="list-disc pl-6">
                      <li><b>Definition:</b> DDP represents the maximum obligation for the seller. The seller is responsible for delivering the goods to the named place in the buyer's country, cleared for import, with all duties and taxes paid.</li>
                      <li><b>Risk Transfer:</b> Risk transfers at the named place of destination, ready for unloading.</li>
                      <li><b>Costs:</b> The seller bears all costs and risks, including all transportation, insurance, export clearance, and, critically, import clearance, duties, and taxes (like VAT/GST) in the buyer's country.</li>
                      <li><b>Practical Scenario:</b> An e-commerce business in the UK sells a consumer product online to a customer in the U.S. To provide a seamless, Amazon-like experience with no surprise fees for the customer, the UK seller ships DDP, covering all costs to the customer's doorstep.</li>
                      <li><b>Strategic Considerations:</b> DDP is extremely risky for the seller. It requires them to act as the importer in a foreign country, a role for which they may not be legally equipped. They are exposed to unpredictable and potentially substantial foreign tax liabilities (VAT/GST) which can erase the profitability of a sale. This term should be used with extreme caution and typically only after consulting with experts.</li>
                    </ul>
                  </li>
                </ul>
              </section>

              {/* 2.2.2 */}
              <section id="2-2-2" className="mb-4 ml-4">
                <h3 className="text-base font-semibold mb-2">2.2.2 Group 2: Rules for Sea and Inland Waterway Transport</h3>
                <p>These four rules are designed specifically for situations where the point of delivery and the point where the goods are handed over to the buyer are both ports. They are generally not appropriate for containerized goods that are handed over to a carrier at an inland terminal.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>FAS – Free Alongside Ship (...named port of shipment)</b>
                    <ul className="list-disc pl-6">
                      <li><b>Definition:</b> The seller delivers when the goods are placed alongside the vessel (e.g., on a quay or a barge) nominated by the buyer at the named port of shipment.</li>
                      <li><b>Risk Transfer:</b> Risk transfers to the buyer the moment the goods are alongside the ship.</li>
                      <li><b>Costs:</b> The seller pays for getting the goods to the port and alongside the vessel. The buyer pays for loading onto the vessel, main carriage, insurance, and import clearance.</li>
                      <li><b>Practical Scenario:</b> A U.S. exporter is shipping bulk grain to Egypt. They agree on FAS, Port of New Orleans. The seller's responsibility ends once the grain is delivered to the specified quay next to the buyer's nominated vessel. The buyer is responsible for the cost and risk of loading the grain from the quay onto the ship.</li>
                      <li><b>Strategic Considerations:</b> This rule is typically used for bulk or break-bulk cargo, not for containerized freight.</li>
                    </ul>
                  </li>
                  <li><b>FOB – Free on Board (...named port of shipment)</b>
                    <ul className="list-disc pl-6">
                      <li><b>Definition:</b> The seller delivers the goods on board the vessel nominated by the buyer at the named port of shipment. The seller must also clear the goods for export.</li>
                      <li><b>Risk Transfer:</b> Risk transfers to the buyer once the goods are on board the vessel.</li>
                      <li><b>Costs:</b> The seller pays for getting the goods to the port and for the cost of loading them onto the vessel. The buyer pays for the main ocean freight, insurance, and import clearance.</li>
                      <li><b>Practical Scenario:</b> A Chinese furniture manufacturer sells a shipment of goods to a retailer in Australia under FOB, Port of Shanghai. The Chinese seller is responsible for all costs and risks until the goods are safely loaded onto the ship in Shanghai. From that point on, the Australian buyer is responsible.</li>
                      <li><b>Strategic Considerations:</b> FOB is one of the most widely used—and misused—Incoterms. While historically used for all sea freight, its use for modern containerized shipments is problematic. A container is typically handed over to the carrier at a terminal (CY/CFS), not physically loaded "on board" by the seller. This creates a "risk gap"—a period where the container is in the carrier's custody at the port, but before it's loaded on the ship. If damage occurs during this gap, the seller (who thinks they are covered until the container is on board) may find themselves uninsured. For container shipments, FCA is the more appropriate term.</li>
                    </ul>
                  </li>
                  <li><b>CFR – Cost and Freight (...named port of destination)</b>
                    <ul className="list-disc pl-6">
                      <li><b>Definition:</b> The seller delivers the goods on board the vessel, clears them for export, and pays for the costs and freight necessary to bring the goods to the named port of destination.</li>
                      <li><b>Risk Transfer:</b> Similar to CPT, risk transfers from seller to buyer at the port of origin once the goods are on board the vessel, not at the destination.</li>
                      <li><b>Costs:</b> Seller pays for export clearance and ocean freight to the destination port. Buyer pays for insurance and import clearance.</li>
                      <li><b>Practical Scenario:</b> A seller of bulk coffee in Colombia agrees to sell to a buyer in Italy under CFR, Port of Genoa. The seller pays for the freight to Genoa. If the vessel is lost at sea, the risk is on the Italian buyer, who should have purchased insurance.</li>
                      <li><b>Strategic Considerations:</b> Like FOB, this term is intended for non-containerized sea freight. The buyer must remember to secure their own insurance coverage.</li>
                    </ul>
                  </li>
                  <li><b>CIF – Cost, Insurance and Freight (...named port of destination)</b>
                    <ul className="list-disc pl-6">
                      <li><b>Definition:</b> CIF is identical to CFR, with the addition that the seller must also procure and pay for marine insurance against the buyer's risk of loss or damage during carriage.</li>
                      <li><b>Risk Transfer:</b> Same as CFR; risk transfers at the port of origin once the goods are on board the vessel.</li>
                      <li><b>Costs:</b> Seller pays for export clearance, ocean freight, and insurance to the destination port. Buyer pays for import clearance.</li>
                      <li><b>Practical Scenario:</b> A lumber exporter in Canada sells to a construction company in Japan under CIF, Port of Tokyo. The seller arranges and pays for the shipping and insurance to Tokyo. The risk of loss transfers to the Japanese buyer in the Canadian port, but they are the beneficiary of the insurance policy arranged by the seller.</li>
                      <li><b>Strategic Considerations:</b> Under Incoterms® 2020, CIF requires only a minimum level of insurance coverage (Institute Cargo Clause C), which may not be adequate for all types of goods. Buyers may need to request higher coverage or arrange their own supplemental insurance. This term is also primarily intended for bulk/non-containerized cargo.</li>
                    </ul>
                  </li>
                </ul>
              </section>
            </section>

            {/* 2.3 */}
            <section id="2-3" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">2.3 Key Changes in Incoterms® 2020</h2>
              <p>The 2020 revision of the Incoterms® rules introduced several important changes and clarifications designed to better reflect modern trade practices.</p>
              <ul className="list-disc pl-6 mb-2">
                <li><b>DAT Becomes DPU:</b> The most significant structural change was the replacement of Delivered at Terminal (DAT) with Delivered at Place Unloaded (DPU). This was done to broaden the rule's applicability, clarifying that the "place" of destination can be any location—such as a factory or warehouse—not just a formal transport "terminal." The name change also serves to emphasize the rule's unique feature: DPU is the only Incoterm that obligates the seller to unload the goods at the destination.</li>
                <li><b>Different Insurance Levels in CIP and CIF:</b> The 2020 rules created a crucial distinction in the level of insurance required under the two "insurance-inclusive" terms. For CIP (used for any mode of transport), the seller is now required to arrange for a higher level of "all-risk" insurance, compliant with Institute Cargo Clause (A). This reflects the higher value and risk profile often associated with manufactured goods shipped via air or container. For CIF (used only for sea freight), the default remains the lower-level, minimum coverage compliant with Institute Cargo Clause (C), which is more traditional for bulk commodity trades. Parties can, of course, agree to different levels of insurance in their contract.</li>
                <li><b>FCA and the Bill of Lading:</b> To address a long-standing problem for sellers using Letters of Credit (which often require an "on-board" Bill of Lading), the FCA rule was updated. It now includes an option for the buyer and seller to agree that the buyer will instruct its carrier to issue a Bill of Lading with an on-board notation to the seller after the goods have been loaded. This allows the seller to meet the terms of the Letter of Credit while still using the more appropriate FCA rule for containerized shipments.</li>
                <li><b>Clarified Cost Allocation and Security Requirements:</b> The 2020 version provides a more explicit and detailed breakdown of how costs are allocated between the buyer and seller, listing them in the A9/B9 section of each rule. This was done to address common disputes where carriers would back-charge fees like terminal handling. Similarly, in response to heightened global security concerns, the rules now more clearly allocate security-related responsibilities and costs.</li>
              </ul>
            </section>

            {/* 2.4 */}
            <section id="2-4" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">2.4 Strategic Selection: Choosing the Right Incoterm</h2>
              <p>The choice of Incoterm is a strategic decision that should be based on a careful assessment of control, cost, and risk tolerance. It is not merely a logistical checkbox but a financial and risk management tool that directly impacts a company's cash flow, contingent liabilities, and customer relationships. The most familiar or popular terms are not always the most appropriate, and misuse can have severe financial consequences.</p>
              <p>For example, the continued misuse of FOB for container shipments creates a dangerous "risk gap." An exporter who hands a container to a carrier at an inland depot but uses the FOB term legally retains the risk for that container until it is loaded onto the vessel, which could be days later. If the container is damaged or lost at the port terminal during that time, the exporter would be uninsured and face a total loss.</p>
              <p>Similarly, a seller offering DDP terms to appear customer-friendly may be unaware of the destination country's VAT or GST rates. Being obligated to pay a 20% VAT on the sale value upon import can instantly render a profitable transaction a loss-making one.</p>
              <p>Therefore, the selection process must be deliberate. A novice exporter looking to minimize risk should be guided towards terms like FCA, where their responsibility ends once the goods are safely handed over to a carrier in their own country. An experienced importer with strong logistics partners might prefer FOB or even EXW to gain maximum control over freight costs. The goal is to choose the term that best aligns with the company's capabilities, risk appetite, and the specific nature of the transaction. The choice must be documented precisely on all commercial documents, specifying the rule, the named place, and the version, for example: CIP 123 Main Street, Anytown, USA Incoterms® 2020.</p>
            </section>

            {/* Table 2.1 */}
            <section id="table-2-1" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Table 2.1: Incoterms® 2020: A Comprehensive Chart of Responsibility, Cost, and Risk Transfer</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Incoterm</th>
                      <th className="border px-2 py-1">Mode of Transport</th>
                      <th className="border px-2 py-1">Point of Risk Transfer from Seller to Buyer</th>
                      <th className="border px-2 py-1">Seller's Key Responsibilities</th>
                      <th className="border px-2 py-1">Buyer's Key Responsibilities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">EXW</td>
                      <td className="border px-2 py-1">Any Mode</td>
                      <td className="border px-2 py-1">At seller's premises, when goods are made available.</td>
                      <td className="border px-2 py-1">Make goods available.</td>
                      <td className="border px-2 py-1">All tasks: Loading, export clearance, all transport, insurance, import clearance.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">FCA</td>
                      <td className="border px-2 py-1">Any Mode</td>
                      <td className="border px-2 py-1">When goods are delivered to the buyer's nominated carrier at the named place.</td>
                      <td className="border px-2 py-1">Export clearance; delivery to carrier.</td>
                      <td className="border px-2 py-1">Main transport, insurance, import clearance.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">CPT</td>
                      <td className="border px-2 py-1">Any Mode</td>
                      <td className="border px-2 py-1">When goods are delivered to the seller's contracted first carrier at origin.</td>
                      <td className="border px-2 py-1">Export clearance; contract and pay for main transport to destination.</td>
                      <td className="border px-2 py-1">Insurance, import clearance.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">CIP</td>
                      <td className="border px-2 py-1">Any Mode</td>
                      <td className="border px-2 py-1">When goods are delivered to the seller's contracted first carrier at origin.</td>
                      <td className="border px-2 py-1">Export clearance; contract and pay for main transport and insurance to destination.</td>
                      <td className="border px-2 py-1">Import clearance.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">DAP</td>
                      <td className="border px-2 py-1">Any Mode</td>
                      <td className="border px-2 py-1">At named destination, on arriving transport, ready for unloading.</td>
                      <td className="border px-2 py-1">All transport to destination; export clearance.</td>
                      <td className="border px-2 py-1">Unloading, import clearance and duties.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">DPU</td>
                      <td className="border px-2 py-1">Any Mode</td>
                      <td className="border px-2 py-1">At named destination, once unloaded from arriving transport.</td>
                      <td className="border px-2 py-1">All transport to destination, including unloading; export clearance.</td>
                      <td className="border px-2 py-1">Import clearance and duties.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">DDP</td>
                      <td className="border px-2 py-1">Any Mode</td>
                      <td className="border px-2 py-1">At named destination, cleared for import, ready for unloading.</td>
                      <td className="border px-2 py-1">All transport, all risk, all costs including export AND import clearance and duties.</td>
                      <td className="border px-2 py-1">Unloading.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">FAS</td>
                      <td className="border px-2 py-1">Sea/Inland Waterway</td>
                      <td className="border px-2 py-1">At port of shipment, when goods are placed alongside the vessel.</td>
                      <td className="border px-2 py-1">Delivery alongside vessel; export clearance.</td>
                      <td className="border px-2 py-1">Loading, main transport, insurance, import clearance.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">FOB</td>
                      <td className="border px-2 py-1">Sea/Inland Waterway</td>
                      <td className="border px-2 py-1">At port of shipment, when goods are loaded on board the vessel.</td>
                      <td className="border px-2 py-1">Delivery on board vessel; export clearance.</td>
                      <td className="border px-2 py-1">Main transport, insurance, import clearance.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">CFR</td>
                      <td className="border px-2 py-1">Sea/Inland Waterway</td>
                      <td className="border px-2 py-1">At port of shipment, when goods are loaded on board the vessel.</td>
                      <td className="border px-2 py-1">Export clearance; contract and pay for main transport to destination port.</td>
                      <td className="border px-2 py-1">Insurance, import clearance.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">CIF</td>
                      <td className="border px-2 py-1">Sea/Inland Waterway</td>
                      <td className="border px-2 py-1">At port of shipment, when goods are loaded on board the vessel.</td>
                      <td className="border px-2 py-1">Export clearance; contract and pay for main transport and insurance to destination port.</td>
                      <td className="border px-2 py-1">Import clearance.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Table 2.2 */}
            <section id="table-2-2" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Table 2.2: Scenario-Based Incoterm Selection Guide</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Your Primary Goal / Scenario</th>
                      <th className="border px-2 py-1">Recommended Incoterm(s)</th>
                      <th className="border px-2 py-1">Rationale & Key Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">As a new exporter, I want to minimize my risk and responsibility.</td>
                      <td className="border px-2 py-1 font-semibold">FCA</td>
                      <td className="border px-2 py-1">FCA is ideal. Your responsibility ends once you deliver the goods, cleared for export, to the carrier nominated by the buyer in your own country. You avoid the risks and costs of international transit and import formalities. Avoid EXW, as it leaves export clearance to the buyer, which can cause problems.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">As an experienced buyer, I want maximum control over the logistics chain and costs.</td>
                      <td className="border px-2 py-1 font-semibold">FCA or FOB (for bulk)</td>
                      <td className="border px-2 py-1">FCA (for containers) or FOB (for bulk sea freight) gives you control over the main, most expensive leg of the transport. You nominate the carrier and can negotiate your own freight rates. EXW gives even more control but adds the complexity of handling export clearance in the seller's country.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">I want to provide my customer with a seamless, "landed cost" price without surprise fees, but I don't want to handle import customs myself.</td>
                      <td className="border px-2 py-1 font-semibold">DAP or DPU</td>
                      <td className="border px-2 py-1">DAP (Delivered at Place) or DPU (Delivered at Place Unloaded) allows you to quote a price that includes all transportation costs to the buyer's door or another named place. The buyer remains responsible for import clearance and paying duties/taxes, protecting you from that complex liability.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">I am selling to a customer who wants me to handle everything, including import duties and taxes, to provide a true door-to-door service.</td>
                      <td className="border px-2 py-1 font-semibold">DDP (with caution)</td>
                      <td className="border px-2 py-1">DDP (Delivered Duty Paid) meets this need, but is extremely high-risk for the seller. You become responsible for import clearance and all taxes (like VAT) in a foreign country. Only use this term if you have expert knowledge and legal standing to act as an importer in the destination country.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">I am shipping containerized goods via ocean freight.</td>
                      <td className="border px-2 py-1 font-semibold">FCA, CPT, CIP</td>
                      <td className="border px-2 py-1">These "any mode" terms are more appropriate than the traditional "sea" terms (FOB, CFR, CIF). Risk transfers when you hand the container to the carrier at the origin terminal, which accurately reflects modern container logistics and avoids the "risk gap" associated with using FOB.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">I am shipping bulk commodities (like grain, oil, or minerals) by sea.</td>
                      <td className="border px-2 py-1 font-semibold">FAS, FOB, CFR, CIF</td>
                      <td className="border px-2 py-1">These four "sea and inland waterway" specific rules are designed for this type of trade, where goods are loaded directly into a vessel rather than in a container at an inland point. The transfer of risk is tied to the ship itself (alongside or on board).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </section>

          {/* Part 3: Full content integration */}
          <section id="part-3" className="mb-8">
            <h2 className="text-xl font-bold mb-3 truncate">3. Choosing Your Mode: A Strategic Analysis of International Transport</h2>
            <p>With the commercial terms established, the focus shifts to the physical execution of the shipment. The most fundamental decision in this phase is the selection of the primary mode of transport. This choice is not merely a logistical detail but a strategic decision that involves a complex trade-off between the critical variables of speed, cost, and capacity. The optimal mode depends entirely on the specific characteristics of the goods being shipped, the urgency of the delivery, and the financial constraints of the transaction. A sophisticated logistics strategy often involves not just a single mode, but a combination of modes working in concert, demanding an understanding of the strengths and weaknesses of each component in the global transport network.</p>

            {/* 3.1 */}
            <section id="3-1" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">3.1 The Four Pillars of Global Movement: A Comparative Overview</h2>
              <p>International freight moves primarily via four modes of transport: ocean, air, road, and rail. Each presents a unique value proposition, and the selection process requires a clear-eyed assessment of priorities. Is speed paramount, justifying a higher cost? Or is cost the primary driver, making a longer transit time acceptable? The following table, based on the analysis in the initial query, provides a high-level comparison to frame this critical decision.</p>
            </section>

            {/* Table 3.1 */}
            <section id="table-3-1" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Table 3.1: A Comparative Analysis of International Transportation Modes</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Factor</th>
                      <th className="border px-2 py-1">Ocean Freight</th>
                      <th className="border px-2 py-1">Air Freight</th>
                      <th className="border px-2 py-1">Road Freight</th>
                      <th className="border px-2 py-1">Rail Freight</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Speed</td>
                      <td className="border px-2 py-1">Slowest (weeks to months)</td>
                      <td className="border px-2 py-1">Fastest (hours to days)</td>
                      <td className="border px-2 py-1">Moderate (days)</td>
                      <td className="border px-2 py-1">Moderate (days)</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Cost</td>
                      <td className="border px-2 py-1">Lowest per unit for long distances</td>
                      <td className="border px-2 py-1">Highest per unit</td>
                      <td className="border px-2 py-1">Economical for short/medium distances</td>
                      <td className="border px-2 py-1">Cost-effective for long-distance bulk</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Capacity</td>
                      <td className="border px-2 py-1">Highest (large, heavy, bulk goods)</td>
                      <td className="border px-2 py-1">Lowest (weight and size restricted)</td>
                      <td className="border px-2 py-1">Moderate (flexible sizes)</td>
                      <td className="border px-2 py-1">High (bulk, containers)</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Accessibility</td>
                      <td className="border px-2 py-1">Limited to seaports; requires intermodal connection</td>
                      <td className="border px-2 py-1">Global reach to major airports</td>
                      <td className="border px-2 py-1">Highest; true door-to-door service</td>
                      <td className="border px-2 py-1">Moderate; dependent on existing rail network</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Reliability</td>
                      <td className="border px-2 py-1">Moderate; susceptible to weather, port congestion, and other disruptions</td>
                      <td className="border px-2 py-1">Highest; operates on strict schedules</td>
                      <td className="border px-2 py-1">Moderate; vulnerable to traffic, road conditions</td>
                      <td className="border px-2 py-1">High; operates on consistent, reliable schedules</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Flexibility</td>
                      <td className="border px-2 py-1">Low; fixed routes and schedules</td>
                      <td className="border px-2 py-1">Moderate; fixed routes, but chartering is possible</td>
                      <td className="border px-2 py-1">Highest; routes can be easily adapted</td>
                      <td className="border px-2 py-1">Low; confined to fixed rail infrastructure</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Climate Impact</td>
                      <td className="border px-2 py-1">Lower per unit than air freight</td>
                      <td className="border px-2 py-1">Highest of all modes</td>
                      <td className="border px-2 py-1">Significant, but improving with new technologies (e.g., EVs)</td>
                      <td className="border px-2 py-1">Lowest for land-based transport per ton-mile</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3.2 */}
            <section id="3-2" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">3.2 Ocean Freight Masterclass: The Workhorse of Global Trade</h2>
              <p>Ocean freight is the undisputed backbone of global commerce, responsible for transporting the vast majority of international cargo by volume. Its dominance is rooted in its unparalleled cost-effectiveness for moving large, heavy, bulky, or non-urgent goods over vast distances. From raw materials and commodities to finished consumer products, the global economy is built upon the capacity of ocean vessels. However, this cost advantage comes with the significant trade-off of speed; transit times are measured in weeks or even months, and the system is susceptible to delays from port congestion, adverse weather, and other logistical disruptions.</p>
              <p>Ocean freight is not a monolithic service. Shippers must choose from a variety of service types tailored to the size and nature of their cargo.</p>

              {/* 3.2.1 */}
              <section id="3-2-1" className="mb-4 ml-4">
                <h3 className="text-base font-semibold mb-2">3.2.1 Containerized Cargo Services</h3>
                <p>The standardization of the shipping container revolutionized global trade, and containerized services are the most common form of ocean freight.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Full Container Load (FCL):</b> In an FCL shipment, a single shipper leases the exclusive use of an entire container (typically 20 or 40 feet long). The goods are loaded and sealed at the origin and remain untouched until they reach the destination. This method offers significant advantages, including enhanced security, a lower risk of damage from handling, and generally faster transit times compared to LCL, as the container moves directly from port to port without intermediate consolidation steps. FCL is the most cost-effective option when a shipper has enough cargo to fill, or nearly fill, a container.</li>
                  <li><b>Less than Container Load (LCL):</b> LCL is the solution for businesses with shipments too small to justify the cost of a full container. In this model, a freight forwarder or consolidator combines smaller shipments from multiple customers into a single shared container. The key benefit is cost-efficiency, as each shipper pays only for the volume or weight their cargo occupies within the container. The primary drawback is that LCL involves more handling at both the origin and destination ports for the consolidation and deconsolidation processes, which can increase the risk of damage and extend transit times.</li>
                </ul>
              </section>

              {/* 3.2.2 */}
              <section id="3-2-2" className="mb-4 ml-4">
                <h3 className="text-base font-semibold mb-2">3.2.2 Specialized Ocean Services</h3>
                <p>For cargo that cannot be accommodated in a standard dry container, a range of specialized services and vessel types are available.</p>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Roll-On/Roll-Off (Ro-Ro):</b> Ro-Ro ships are designed specifically for wheeled cargo, such as cars, trucks, buses, and heavy construction or agricultural machinery. These items are driven directly onto the vessel's decks via ramps at the port of origin and driven off at the destination. This method is highly efficient, reduces the need for cranes and heavy lifting equipment, and minimizes handling, making it a cost-effective and safe option for transporting vehicles.</li>
                  <li><b>Bulk and Break Bulk Shipping:</b> These terms refer to non-containerized cargo. Bulk shipping involves the transport of large quantities of unpackaged, homogeneous commodities—such as grain, coal, iron ore, or oil—in specialized vessels (bulk carriers or tankers) with large holds or tanks. Break bulk shipping, by contrast, is for individual, oversized, or heavy items that cannot fit into a container, such as large machinery, industrial equipment, or construction materials. These items are loaded, stowed, and unloaded individually, often requiring specialized cranes and handling equipment.</li>
                  <li><b>Specialized Containers:</b> The versatility of container shipping is enhanced by a variety of specialized container types designed for specific cargo needs. These include Reefer containers (refrigerated units for perishable goods like food and pharmaceuticals), Tank containers (for bulk liquids and gases), Open Top containers (with a removable roof for over-height cargo), and Flat Rack containers (with collapsible sides for oversized or heavy cargo).</li>
                </ul>
              </section>
            </section>

            {/* 3.3 */}
            <section id="3-3" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">3.3 Air Freight Masterclass: The Premium Choice for Speed</h2>
              <p>Air freight represents the premium segment of the logistics market. It is the fastest possible way to move goods internationally, with transit times measured in days rather than weeks. This speed, combined with the high level of security at airports, makes it the indispensable choice for high-value, lightweight, perishable, or extremely time-sensitive shipments. The trade-off for this velocity is significant: air freight is by far the most expensive mode of transport on a per-kilogram basis and has the highest environmental footprint.</p>
              <p>Like ocean freight, air freight services are tiered to meet different needs for urgency and cost.</p>
              <ul className="list-disc pl-6 mb-2">
                <li><b>Express Air Service:</b> This is the top-tier, fastest service available. Cargo is given the highest priority and is typically placed on the next available direct flight to its destination with minimal or no stops. This service is reserved for the most critical shipments, such as emergency medical supplies, just-in-time manufacturing components, or high-value luxury goods, where the cost is secondary to the speed of delivery.</li>
                <li><b>Standard Air Service:</b> This is the most common choice for regular air freight, offering a balance between speed and cost. Shipments may transit through one or two intermediate airports and may involve a change of aircraft. While still significantly faster than ocean freight, it is more economical than express service and is well-suited for regular business shipments, e-commerce orders, or product samples.</li>
                <li><b>Deferred Air Service (or Economy Air):</b> This is the most cost-effective air freight option. Shipments are moved on a lower-priority, space-available basis and may involve multiple stops and longer transit times as the airline optimizes its cargo capacity across its network. This service is ideal for less time-sensitive cargo that still needs to arrive faster than it would by sea, such as bulk shipments of non-perishable goods or promotional materials for a future event.</li>
              </ul>
              <p>It is also important to distinguish between Air Cargo and Air Express. Air Cargo generally refers to larger shipments arranged by freight forwarders who book space on commercial or dedicated cargo aircraft. Air Express, on the other hand, refers to the integrated, door-to-door service offered by companies like DHL, FedEx, and UPS, which is typically used for smaller parcels and documents and includes pickup, transport, customs clearance, and final delivery in a single service.</p>
            </section>

            {/* 3.4 */}
            <section id="3-4" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">3.4 Overland Transport: Road and Rail Freight</h2>
              <p>Road and rail transport are the essential connectors in the global logistics network, providing the overland movement required to link inland origins and destinations with international ports and airports.</p>
              <ul className="list-disc pl-6 mb-2">
                <li><b>Road Freight:</b> The primary advantage of road freight is its unparalleled flexibility and accessibility. Trucks can provide true door-to-door service, reaching virtually any location with a road. This makes it an indispensable component for the "first mile" (from the factory to the port/airport) and the "last mile" (from the port/airport to the final destination). For short- to medium-distance shipments within a continent or region (e.g., within Europe or North America), trucking is often the most economical and practical choice. Its main disadvantages are its vulnerability to traffic congestion and road conditions, and its limited capacity compared to ocean or rail transport. The industry utilizes a wide variety of specialized trucks, including tankers for liquids, refrigerated "reefer" trucks for perishable goods, and flatbed trucks for oversized cargo.</li>
                <li><b>Rail Freight:</b> For long-distance overland transport of large volumes, rail freight strikes an excellent balance between cost and speed. It is a highly reliable and cost-effective method for moving bulk commodities (like coal and grain) and containerized goods over continental distances. The rise of intermodal transport, where containers are seamlessly transferred between ships, trains, and trucks, has greatly enhanced the role of rail in global supply chains. A container can be offloaded from a ship at a coastal port, loaded directly onto a train for a cross-country journey, and then transferred to a truck for final local delivery. The primary limitation of rail is its lack of flexibility, as it is confined to the existing rail network infrastructure.</li>
              </ul>
            </section>

            {/* 3.5 */}
            <section id="3-5" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">3.5 Mapping Global Commerce: Major Trade Lanes, Ports, and Chokepoints</h2>
              <p>The flow of global trade is not random; it follows well-established arteries connecting major economic centers. Understanding this geography is crucial for strategic logistics planning.</p>
              <ul className="list-disc pl-6 mb-2">
                <li><b>Major Trade Corridors:</b> Global commerce is dominated by a few key trade corridors. The Trans-Pacific Corridor connecting Asia with North America is vital for the movement of consumer goods and electronics, with the Ports of Los Angeles and Long Beach serving as key U.S. gateways. The Asia-Europe Corridor is one of the busiest in the world, linking the manufacturing hubs of Asia with the consumer markets of Europe, primarily via the Suez Canal. The North-South Corridor facilitates trade within the Americas, with the Panama Canal playing a pivotal role.</li>
                <li><b>Critical Hubs:</b> The entire system relies on a network of massive, highly efficient ports and airports that act as hubs for loading, unloading, and transshipment. Key global maritime hubs include the Port of Singapore, strategically located at the crossroads of major shipping routes, and the Port of Rotterdam, which serves as the primary gateway to the European market. Major air cargo hubs, such as those in Hong Kong, Memphis, and Dubai, are critical nodes for the rapid movement of goods by air.</li>
                <li><b>Strategic Chokepoints:</b> The efficiency of these global trade lanes is highly dependent on a few narrow maritime passages known as chokepoints. These points of congestion represent significant vulnerabilities in the global supply chain, where a disruption can have immediate and far-reaching consequences. Key chokepoints include:
                  <ul className="list-disc pl-6">
                    <li><b>The Suez Canal:</b> This man-made waterway in Egypt links the Mediterranean Sea to the Red Sea, allowing ships to avoid the long journey around Africa. Approximately 10-12% of all global trade passes through this canal, making it one of the world's most critical arteries.</li>
                    <li><b>The Panama Canal:</b> Connecting the Atlantic and Pacific Oceans, this canal is crucial for trade between the East and West coasts of the Americas and between Asia and the U.S. East Coast. Its capacity dictates the size of many modern vessels ("Panamax" ships).</li>
                    <li><b>The Strait of Malacca:</b> This narrow passage between the Malay Peninsula and the Indonesian island of Sumatra is the main channel between the Indian and Pacific Oceans, making it essential for trade between Asia, the Middle East, and Europe. It is one of the busiest and most congested shipping lanes in the world.</li>
                    <li><b>The Strait of Hormuz:</b> Located at the mouth of the Persian Gulf, this is the world's most important chokepoint for oil shipments.</li>
                  </ul>
                </li>
              </ul>
              <p>The choice of transport mode, therefore, cannot be made in a vacuum. It is part of a larger strategic calculation that must account for the interconnectedness of the global transport system. The rise of intermodal transport demonstrates that these modes are not isolated choices but components of a larger, integrated solution. A single shipment from an inland factory in China to a retail store in the U.S. Midwest will almost certainly involve a combination of road, ocean, and rail transport. The "best" mode is, in fact, the "best combination" of modes.</p>
              <p>Furthermore, the vulnerability of global chokepoints underscores a critical modern imperative: supply chain resilience. A blockage in the Suez Canal, for example, does not just delay ocean freight; it creates a massive, sudden surge in demand and price for air and rail alternatives as shippers scramble to find new routes. A purely cost-optimized strategy that relies on a single route through a vulnerable chokepoint is inherently fragile. A truly sophisticated logistics strategy, therefore, must balance cost and speed with resilience. This involves proactively building relationships with logistics partners who are proficient in multiple modes of transport and having contingency plans that may include alternative routes that, while perhaps slightly more expensive in normal times, bypass critical chokepoints and provide robustness in times of crisis. The decision matrix for transport selection is evolving from a simple two-dimensional trade-off between speed and cost to a three-dimensional calculation that includes speed, cost, and resilience.</p>
            </section>

            {/* Table 3.2 */}
            <section id="table-3-2" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Table 3.2: Ocean Freight Service Selection Guide</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Service Type</th>
                      <th className="border px-2 py-1">Best For (Use Case)</th>
                      <th className="border px-2 py-1">Key Advantages</th>
                      <th className="border px-2 py-1">Key Disadvantages/Risks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">FCL (Full Container Load)</td>
                      <td className="border px-2 py-1">Shippers with large quantities of goods (enough to fill a 20' or 40' container); high-value or fragile goods requiring minimal handling.</td>
                      <td className="border px-2 py-1">High security (sealed at origin); minimal handling reduces damage risk; generally faster transit than LCL.</td>
                      <td className="border px-2 py-1">Not cost-effective for small shipments; shipper is responsible for filling the container.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">LCL (Less than Container Load)</td>
                      <td className="border px-2 py-1">Small to medium-sized businesses or those with smaller, more frequent shipments that do not require a full container.</td>
                      <td className="border px-2 py-1">Cost-effective (pay only for the space used); allows for shipping smaller quantities.</td>
                      <td className="border px-2 py-1">More handling (consolidation/deconsolidation) increases damage risk; potentially longer transit times.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Ro-Ro (Roll-On/Roll-Off)</td>
                      <td className="border px-2 py-1">Wheeled cargo such as cars, trucks, buses, tractors, and other heavy machinery that can be driven.</td>
                      <td className="border px-2 py-1">Efficient and simple loading/unloading; lower handling costs; reduced risk of damage during loading.</td>
                      <td className="border px-2 py-1">Limited to wheeled or self-propelled cargo; less security for the cargo compared to a sealed container.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Break Bulk</td>
                      <td className="border px-2 py-1">Oversized or heavy items that do not fit in a standard container, such as large machinery, construction materials, or yachts.</td>
                      <td className="border px-2 py-1">Ability to transport exceptionally large and heavy cargo that cannot be containerized.</td>
                      <td className="border px-2 py-1">Requires specialized handling and equipment; higher labor costs; greater exposure to elements.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Table 3.3 */}
            <section id="table-3-3" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Table 3.3: Air Freight Service Selection Guide</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Service Type</th>
                      <th className="border px-2 py-1">Typical Transit Time</th>
                      <th className="border px-2 py-1">Cost Level</th>
                      <th className="border px-2 py-1">Ideal Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Express Air Service</td>
                      <td className="border px-2 py-1">1-3 days</td>
                      <td className="border px-2 py-1">Highest</td>
                      <td className="border px-2 py-1">Extremely urgent or time-critical shipments where speed is the absolute priority. Examples: Emergency medical supplies, critical machine parts to prevent a factory shutdown, legal documents.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Standard Air Service</td>
                      <td className="border px-2 py-1">3-7 days</td>
                      <td className="border px-2 py-1">High</td>
                      <td className="border px-2 py-1">The most common option for business shipments that need to be faster than sea freight but do not justify the premium cost of express. Examples: Regular e-commerce order fulfillment, product samples for a trade show, seasonal products.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Deferred Air Service</td>
                      <td className="border px-2 py-1">7-14 days</td>
                      <td className="border px-2 py-1">Moderate</td>
                      <td className="border px-2 py-1">The most economical air option for less time-sensitive cargo. Used when sea freight is too slow but the urgency does not warrant the cost of standard air. Examples: Bulk replenishment of non-perishable stock, promotional materials for a future event.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </section>

          {/* Part 4: Full content integration */}
          <section id="part-4" className="mb-8">
            <h2 className="text-xl font-bold mb-3 truncate">4. Preparing Your Cargo: Best Practices in Packaging, Labeling, and Stowage</h2>
            <p>The physical preparation of goods for international transit is a foundational element of risk management. Proper packaging, clear labeling, and intelligent stowage are not merely operational afterthoughts; they are critical processes that protect cargo from damage, ensure compliance with international regulations, facilitate smooth handling throughout the supply chain, and ultimately safeguard the financial interests of the shipper. A failure in this preparatory stage can lead to a cascade of negative consequences, including damaged goods, customs delays, regulatory fines, and potentially voided insurance claims. Therefore, a proactive and meticulous approach to cargo preparation is essential.</p>

            {/* 4.1 */}
            <section id="4-1" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">4.1 The Science of Protection: International Packaging Standards</h2>
              <p>Export packaging must be engineered to a much higher standard than packaging for domestic shipment. It must be robust enough to withstand the significant stresses of international transit, which can include rough handling, extreme temperature and humidity fluctuations, high-pressure stacking in a container vessel's hold, and prolonged storage.</p>
              <ul className="list-disc pl-6 mb-2">
                <li><b>Core Principles of Export Packaging:</b> The primary goals of export packaging are protection, containment, and utility. It must be strong enough to protect the contents from physical damage, sealed to prevent moisture ingress, and designed to be handled efficiently by standard equipment like forklifts and cranes. The weight of the product should be distributed evenly within the package to ensure stability.</li>
                <li><b>Material Selection and Sustainability:</b> The choice of materials is critical. High-strength, multi-wall corrugated boxes are a common standard. For heavier items, wooden crates or cases may be necessary. Increasingly, destination countries have specific regulations regarding packaging materials, particularly plastics. Regions like the European Union, under its Green Deal initiative, have imposed strict limits on single-use plastics and favor materials that are recyclable, biodegradable, or reusable. Exporters must research and comply with these environmental standards to avoid rejection at the border.</li>
                <li><b>International Standards (ISO):</b> The International Organization for Standardization (ISO) develops and publishes a wide range of voluntary standards that provide guidelines and specifications for packaging materials and testing. For example, the ISO 9000 series relates to quality management systems, while ISO 14000 pertains to environmental management, both of which can influence packaging choices. Adhering to relevant ISO standards demonstrates a commitment to quality and can enhance a product's acceptance in global markets.</li>
                <li><b>Wood Packaging Material (WPM) and ISPM-15:</b> One of the most critical and strictly enforced international packaging regulations is the International Standards for Phytosanitary Measures No. 15 (ISPM-15). This standard governs all solid wood packaging material (WPM)—such as pallets, crates, and dunnage—used in international trade. To prevent the global spread of timber pests, ISPM-15 requires that all WPM be treated (either by heat treatment or methyl bromide fumigation) and then stamped with an official mark of compliance, often referred to as the "wheat stamp". Any shipment arriving with non-compliant WPM can be refused entry, fumigated at the importer's expense, or destroyed by customs authorities. This is a zero-tolerance regulation, and compliance is mandatory.</li>
              </ul>
            </section>

            {/* 4.2 */}
            <section id="4-2" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">4.2 Communicating with Care: A Visual Guide to Handling Marks and Labels</h2>
              <p>Once a package is sealed, its exterior becomes its primary mode of communication with every handler in the logistics chain. Clear, standardized, and accurate markings are essential to ensure the cargo is handled correctly, identified properly, and compliant with regulatory requirements.</p>
              <ul className="list-disc pl-6 mb-2">
                <li><b>ISO 780 Pictorial Handling Symbols:</b> To overcome language barriers in international trade, ISO has established a set of standardized pictorial symbols for marking cargo. These symbols provide universally understood instructions for handling. The use of these symbols is a critical best practice, as they reduce the risk of damage caused by incorrect handling. Key symbols include those for "Fragile," "This Way Up," "Keep Dry," "Sling Here" (indicating correct lifting points), and "Centre of Gravity." These symbols should be stenciled or labeled clearly on the package, preferably in black on a contrasting background, and be of a sufficient size (e.g., 100mm, 150mm, or 200mm in height) to be easily visible.</li>
                <li><b>Mandatory Labels and Markings:</b> In addition to handling symbols, all export packages must bear certain mandatory information:
                  <ul className="list-disc pl-6">
                    <li><b>Country of Origin:</b> A clear "Made In [Country]" label is required by most countries for customs purposes.</li>
                    <li><b>Shipper and Consignee Information:</b> The full name and address of both the sender and the final recipient.</li>
                    <li><b>Weight and Dimensions:</b> The gross and net weight, as well as the dimensions of the package.</li>
                    <li><b>Package Numbering:</b> For multi-piece shipments, packages should be numbered sequentially (e.g., "1 of 5," "2 of 5," etc.).</li>
                    <li><b>Destination-Specific Labels:</b> Many products and countries have unique labeling requirements. For example, food products imported into the U.S. must have labels listing ingredients and nutritional information in English. Textiles must list fiber content and care instructions. All labels must be in the official language of the destination country.</li>
                  </ul>
                </li>
              </ul>
            </section>

            {/* 4.3 */}
            <section id="4-3" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">4.3 The Art of the Stow: Best Practices for Cargo Stowage and Load Planning</h2>
              <p>Stowage refers to the process of arranging, loading, and securing cargo within a container or on a vessel. A proper stowage plan is a detailed blueprint designed to maximize the use of space while ensuring the safety and stability of the cargo and the vessel itself.</p>
              <ul className="list-disc pl-6 mb-2">
                <li><b>Key Principles of Good Stowage:</b>
                  <ul className="list-disc pl-6">
                    <li><b>Weight Distribution:</b> This is the most critical principle for vessel stability. Heavier cargo must be stowed low and as close to the ship's centerline as possible. Lighter cargo is placed on top. Improper weight distribution can negatively affect the ship's metacentric height (GM), a key measure of stability, making it prone to rolling or capsizing in rough seas.</li>
                    <li><b>Cargo Compatibility and Segregation:</b> Different types of cargo must be stowed according to their characteristics. Hazardous materials, governed by the International Maritime Dangerous Goods (IMDG) Code, must be segregated from other goods and from each other according to strict rules. Wet cargo should never be stowed above dry cargo. Goods sensitive to temperature or moisture must be placed accordingly.</li>
                    <li><b>Securing and Lashing:</b> Containers on a ship's deck are subjected to immense forces from the vessel's movement. They must be securely locked to the ship and to each other using devices like twist-locks, lashing rods, and turnbuckles to prevent them from shifting or being lost overboard.</li>
                    <li><b>Planning for Discharge:</b> An efficient stowage plan must account for the sequence of port calls. Cargo destined for the first port of discharge must be stowed in a position where it is accessible without having to first move cargo destined for later ports. This practice, known as avoiding "over-stowage," is crucial for minimizing port turnaround times.</li>
                  </ul>
                </li>
                <li><b>The Bay-Row-Tier System:</b> To manage the complexity of stowing thousands of containers, container ships use a standardized coordinate system to identify the exact location of every container. This is the bay-row-tier system.
                  <ul className="list-disc pl-6">
                    <li><b>Bays:</b> Transverse sections of the ship, numbered from bow to stern. Odd numbers are typically for 20ft containers, and even numbers are for 40ft containers.</li>
                    <li><b>Rows:</b> Lengthwise rows of containers. Numbering starts from the centerline outwards, with even numbers to port and odd numbers to starboard.</li>
                    <li><b>Tiers:</b> Vertical layers of containers, numbered from the bottom up. Tiers in the hold start with low numbers (e.g., 02, 04), while tiers on deck start with higher numbers (e.g., 80, 82).</li>
                  </ul>
                  A container's position is designated by a six-digit number representing its bay, row, and tier (e.g., 531212), which is recorded in the ship's master stowage document, the Bay Plan.
                </li>
              </ul>
            </section>

            {/* 4.4 */}
            <section id="4-4" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">4.4 A Closer Look: Container Types, Dimensions, and Capacities</h2>
              <p>The foundation of modern ocean freight is the standardized shipping container. Selecting the correct container type and size is fundamental to planning a shipment. While dimensions can vary slightly by manufacturer, they adhere to ISO standards.</p>
              <p>The decision to treat packaging and labeling as a final, operational step rather than an upfront, strategic consideration is a common but costly mistake. A single compliance failure—such as a missing ISPM-15 stamp on a pallet—can have a dramatic domino effect. It doesn't just result in a fine. The entire shipment can be quarantined, refused entry, or ordered for destruction, all at the shipper's expense. This leads to catastrophic delays, which in turn can cause the buyer to cancel the order, seek damages for breach of contract, and destroy a valuable commercial relationship. A simple packaging error can thus escalate into a full-blown financial and reputational disaster.</p>
              <p>This reality dictates that packaging and labeling must be integrated into the initial product design and costing phase for any goods intended for export. The cost of compliant packaging, the need for specific labels in foreign languages, and the selection of appropriate handling marks are not incidental expenses but core components of the product's landed cost. Businesses that proactively build these requirements into their processes gain a significant competitive advantage by ensuring smoother transit, avoiding catastrophic delays, and demonstrating a high level of professionalism and reliability to their international customers. Compliance, in this context, is not a bureaucratic hurdle; it is a strategic enabler.</p>
            </section>

            {/* Table 4.1 */}
            <section id="table-4-1" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Table 4.1: ISO 780 Pictorial Handling Marks: A Visual Guide</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Symbol</th>
                      <th className="border px-2 py-1">ISO 7000 No.</th>
                      <th className="border px-2 py-1">Meaning</th>
                      <th className="border px-2 py-1">Best Practice for Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">[Fragile Symbol]</td>
                      <td className="border px-2 py-1">0621</td>
                      <td className="border px-2 py-1 font-semibold">Fragile / Handle with Care</td>
                      <td className="border px-2 py-1">Use on packages containing breakable or delicate items. Place on at least two opposite sides of the package.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">[This Way Up Symbol]</td>
                      <td className="border px-2 py-1">0623</td>
                      <td className="border px-2 py-1 font-semibold">This Way Up</td>
                      <td className="border px-2 py-1">Indicates the correct upright position of the package. Arrows must point upwards. Place on all four vertical sides.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">[Keep Dry Symbol]</td>
                      <td className="border px-2 py-1">0626</td>
                      <td className="border px-2 py-1 font-semibold">Keep Dry</td>
                      <td className="border px-2 py-1">The package must be protected from moisture and rain. Store in a dry environment.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">[Sling Here Symbol]</td>
                      <td className="border px-2 py-1">0625</td>
                      <td className="border px-2 py-1 font-semibold">Sling Here</td>
                      <td className="border px-2 py-1">Indicates the correct placement for lifting slings to ensure the package remains balanced during lifting. Place on two opposite faces.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">[Centre of Gravity Symbol]</td>
                      <td className="border px-2 py-1">0627</td>
                      <td className="border px-2 py-1 font-semibold">Centre of Gravity</td>
                      <td className="border px-2 py-1">Indicates the location of the package's center of gravity. Essential for safe handling of heavy or irregularly shaped items.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">[Do Not Stack Symbol]</td>
                      <td className="border px-2 py-1">2402</td>
                      <td className="border px-2 py-1 font-semibold">Do Not Stack</td>
                      <td className="border px-2 py-1">Stacking of this package is not permitted. No other cargo should be placed on top of it.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">[Stack Limit Symbol]</td>
                      <td className="border px-2 py-1">2403</td>
                      <td className="border px-2 py-1 font-semibold">Stacking Limitation</td>
                      <td className="border px-2 py-1">Indicates the maximum number of identical packages that may be stacked on top of one another (where 'n' is the number).</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">[Temperature Symbol]</td>
                      <td className="border px-2 py-1">0632</td>
                      <td className="border px-2 py-1 font-semibold">Temperature Limitation</td>
                      <td className="border px-2 py-1">Indicates the temperature range within which the package must be stored and transported.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs italic mt-2">(Note: Images are representational and would be rendered in the final web/graphic design output.)</p>
            </section>

            {/* Table 4.2 */}
            <section id="table-4-2" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Table 4.2: Shipping Container Specifications and Use Cases</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Container Type</th>
                      <th className="border px-2 py-1">Common Sizes</th>
                      <th className="border px-2 py-1">Typical Interior Dimensions (L x W x H)</th>
                      <th className="border px-2 py-1">Cubic Capacity (approx.)</th>
                      <th className="border px-2 py-1">Max Payload (approx.)</th>
                      <th className="border px-2 py-1">Typical Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Standard Dry</td>
                      <td className="border px-2 py-1">20'<br/>40'</td>
                      <td className="border px-2 py-1">5.9m x 2.35m x 2.39m<br/>12.03m x 2.35m x 2.39m</td>
                      <td className="border px-2 py-1">33 m³<br/>67 m³</td>
                      <td className="border px-2 py-1">28,000 kg</td>
                      <td className="border px-2 py-1">General dry cargo, including boxes, pallets, barrels, and most manufactured goods.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">High Cube (HC)</td>
                      <td className="border px-2 py-1">40' HC<br/>45' HC</td>
                      <td className="border px-2 py-1">12.03m x 2.35m x 2.70m<br/>13.56m x 2.35m x 2.70m</td>
                      <td className="border px-2 py-1">76 m³<br/>86 m³</td>
                      <td className="border px-2 py-1">28,600 kg</td>
                      <td className="border px-2 py-1">Lightweight, voluminous cargo such as furniture, cotton, or electronics, where cube capacity is more critical than weight capacity.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Reefer (Refrigerated)</td>
                      <td className="border px-2 py-1">20' RF<br/>40' RF HC</td>
                      <td className="border px-2 py-1">5.44m x 2.29m x 2.27m<br/>11.59m x 2.29m x 2.55m</td>
                      <td className="border px-2 py-1">28 m³<br/>67 m³</td>
                      <td className="border px-2 py-1">27,000 kg</td>
                      <td className="border px-2 py-1">Perishable goods requiring temperature control, such as fruits, vegetables, meat, seafood, and pharmaceuticals.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Open Top (OT)</td>
                      <td className="border px-2 py-1">20' OT<br/>40' OT</td>
                      <td className="border px-2 py-1">5.9m x 2.35m x 2.35m<br/>12.03m x 2.35m x 2.38m</td>
                      <td className="border px-2 py-1">32 m³<br/>65 m³</td>
                      <td className="border px-2 py-1">28,000 kg</td>
                      <td className="border px-2 py-1">Over-height cargo or heavy items that are easier to load from the top using a crane, such as machinery or scrap metal.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Flat Rack (FR)</td>
                      <td className="border px-2 py-1">20' FR<br/>40' FR</td>
                      <td className="border px-2 py-1">N/A (open sides/top)</td>
                      <td className="border px-2 py-1">N/A</td>
                      <td className="border px-2 py-1">30,000 kg</td>
                      <td className="border px-2 py-1">Heavy or oversized cargo that exceeds the dimensions of a standard or open-top container, such as vehicles, large pipes, or industrial equipment.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Tank Container</td>
                      <td className="border px-2 py-1">20' Tank</td>
                      <td className="border px-2 py-1">N/A (cylindrical tank)</td>
                      <td className="border px-2 py-1">21,000 - 26,000 Liters</td>
                      <td className="border px-2 py-1">Varies</td>
                      <td className="border px-2 py-1">Bulk liquids, chemicals, gases, and powders, both hazardous and non-hazardous.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Table 4.3 */}
            <section id="table-4-3" className="mb-6 ml-4">
              <h2 className="text-lg font-bold mb-3 truncate">Table 4.3: Export Packaging Compliance Checklist</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-xs">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Compliance Area</th>
                      <th className="border px-2 py-1">Checklist Item</th>
                      <th className="border px-2 py-1">Notes / Key Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">General Durability</td>
                      <td className="border px-2 py-1">□ Is the packaging strong enough for the weight of the contents and to withstand stacking pressure?<br/>□ Is it sealed to protect against moisture?<br/>□ Is the internal bracing and cushioning adequate to prevent movement?</td>
                      <td className="border px-2 py-1">Consider the entire journey, including multiple handling points and potential for rough seas or turbulence.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Wood Packaging Material (WPM)</td>
                      <td className="border px-2 py-1">□ Are all wood components (pallets, crates, dunnage) ISPM-15 compliant?<br/>□ Is the official ISPM-15 stamp clearly visible and legible on the wood?</td>
                      <td className="border px-2 py-1">This is a non-negotiable requirement for most countries. Failure to comply will result in shipment rejection or destruction.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Labeling - Identification</td>
                      <td className="border px-2 py-1">□ Is the full name and address of the shipper and consignee clearly marked?<br/>□ Is the country of origin ("Made In...") clearly stated?<br/>□ Are packages in a multi-piece shipment numbered (e.g., 1/5, 2/5)?</td>
                      <td className="border px-2 py-1">Ensure all information matches the commercial invoice and bill of lading exactly to avoid customs discrepancies.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Labeling - Language & Destination Rules</td>
                      <td className="border px-2 py-1">□ Are all required labels in the official language of the destination country?<br/>□ Does the labeling comply with any product-specific rules at the destination (e.g., FDA food labeling in the US)?</td>
                      <td className="border px-2 py-1">Research destination-specific requirements. A label in the wrong language can be grounds for rejection.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Handling Marks (ISO 780)</td>
                      <td className="border px-2 py-1">□ Are appropriate pictorial handling marks (Fragile, This Way Up, Keep Dry, etc.) applied?<br/>□ Are the symbols large, clear, and placed on at least two sides of the package?</td>
                      <td className="border px-2 py-1">These universal symbols are the primary communication tool for handlers worldwide. Use them correctly.</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1 font-semibold">Hazardous Materials (Hazmat)</td>
                      <td className="border px-2 py-1">□ If shipping dangerous goods, is the package properly classified, marked, and labeled according to IMDG (sea) or IATA DGR (air) regulations?<br/>□ Is the required Dangerous Goods Declaration completed and accurate?</td>
                      <td className="border px-2 py-1">Hazmat shipping is highly regulated and requires specialized knowledge and certification. Non-compliance is illegal and dangerous.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </section>

          {/* Render the rest of the content as before */}
          {renderContent(sections.slice(4))}
        </main>
      </div>
    </div>
  );
};

export default Playbook5; 