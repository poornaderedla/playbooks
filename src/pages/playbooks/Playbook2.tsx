import React, { useState, useRef, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const sections = [
  { id: 'part-1', label: "Part I: The Foundations of Global Trade: The 'Why' Behind the 'How'", subs: [
    { id: '1-1', label: '1.1 The Core Principles: Why Nations Trade' },
    { id: '1-1-1', label: '1.1.1 Comparative Advantage in the Indian Context' },
    { id: '1-1-2', label: '1.1.2 Economies of Scale: The Engine of Export Growth' },
    { id: '1-2', label: '1.2 Debunking Common Myths and Misconceptions' },
    { id: '1-2-1', label: '1.2.1 The Trade Deficit Myth' },
    { id: '1-2-2', label: '1.2.2 The Tariff Fallacy' },
    { id: '1-3', label: '1.3 The Modern Global Trade Ecosystem: Key Players and Structures' },
    { id: '1-4', label: '1.4 The Current Landscape: Navigating a Transformative Era' },
  ]},
  { id: 'part-2', label: 'Part II: The Indian Export Opportunity: Strategic Product & Market Selection', subs: [
    { id: '2-1', label: '2.1 Identifying Your Strength: An In-Depth Analysis of India\'s Comparative Advantage' },
    { id: '2-2', label: '2.2 High-Potential Products: Analyzing India\'s Top Exports' },
    { id: '2-3', label: '2.3 Finding Your Market: A Guide to Top Export Destinations' },
    { id: '2-4', label: '2.4 The Language of Trade: Mastering the HS Code' },
  ]},
  { id: 'part-3', label: 'Part III: The Export-Import Operations Playbook: A Step-by-Step Guide', subs: [
    { id: '3-1', label: '3.1 Laying the Groundwork: Company Setup and Essential Registrations' },
    { id: '3-2', label: '3.2 The Pre-Shipment Phase: From Inquiry to Confirmed Order' },
    { id: '3-2-1', label: '3.2.1 The International Sales Contract' },
    { id: '3-2-2', label: '3.2.2 The Ultimate Pre-Export Documentation Checklist' },
    { id: '3-3', label: '3.3 The Shipment Phase: Logistics and Customs Clearance' },
    { id: '3-3-1', label: '3.3.1 Calculating the Total Landed Cost' },
    { id: '3-3-2', label: '3.3.2 Navigating Indian Customs (CBIC)' },
    { id: '3-4', label: '3.4 The Post-Shipment Phase: Payment and Risk Management' },
    { id: '3-4-1', label: '3.4.1 A Strategic Comparison of Payment Methods' },
    { id: '3-4-2', label: '3.4.2 Insuring Your Cargo: The Ultimate Safety Net' },
  ]},
  { id: 'part-4', label: 'Part IV: Navigating the Indian Trade Ecosystem: Your Support Network', subs: [
    { id: '4-1', label: '4.1 Key Government Agencies: Who They Are and What They Do' },
    { id: '4-2', label: '4.2 Leveraging Trade Facilitation Initiatives' },
    { id: '4-3', label: '4.3 Your Sector-Specific Allies: The Export Promotion Councils (EPCs)' },
    { id: '4-4', label: '4.4 Apex Bodies and Industry Associations' },
  ]},
  { id: 'part-5', label: 'Part V: Lessons from the Field: Case Studies in Indian Exporting', subs: [
    { id: '5-1', label: '5.1 Blueprints for Success: In-Depth Case Studies' },
    { id: '5-2', label: '5.2 The Reality on the Ground: A Cautionary Tale' },
    { id: '5-3', label: '5.3 Strategic Recommendations for the New Indian Exporter' },
  ]},
  { id: 'appendix', label: 'Appendices', subs: [
    { id: 'appendix-a', label: 'Appendix A: Glossary of International Trade Terms' },
    { id: 'appendix-b', label: 'Appendix B: Directory of Key Government Bodies, EPCs, and Trade Associations' },
    { id: 'appendix-c', label: 'Appendix C: Sample Documents' },
  ]},
];

const Playbook2 = () => {
  const [activeSection, setActiveSection] = useState('part-1');
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef(null);
  const tocRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // List of all section and subsection IDs for scrollspy
  const sectionIds = [
    'part-1', '1-1', '1-1-1', '1-1-2', '1-2', '1-2-1', '1-2-2', '1-3', '1-4',
    'part-2', '2-1', '2-2', '2-3', '2-4',
    'part-3', '3-1', '3-2', '3-2-1', '3-2-2', '3-3', '3-3-1', '3-3-2', '3-4', '3-4-1', '3-4-2',
    'part-4', '4-1', '4-2', '4-3', '4-4',
    'part-5', '5-1', '5-2', '5-3',
    'appendix', 'appendix-a', 'appendix-b', 'appendix-c',
  ];

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
    document.addEventListener('scroll', handleScroll, true);
    return () => document.removeEventListener('scroll', handleScroll, true);
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
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 mt-4 font-serif truncate">The Definitive Playbook for the Indian Export-Import Entrepreneur</h1>
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
          <section id="part-1" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part I: The Foundations of Global Trade: The 'Why' Behind the 'How'</h2>
            <p>This initial part establishes the fundamental principles governing international trade. A clear understanding of the economic rationale, the key players, and the current global environment is essential for any aspiring entrepreneur to build a sustainable and strategic export-import business.</p>

            <h3 id="1-1" className="text-base font-semibold mt-6 mb-2 truncate">1.1 The Core Principles: Why Nations Trade</h3>
            <p>The primary reason businesses and nations engage in international trade is that it makes all participants wealthier. At its core, trade is about efficiency. It allows consumers and businesses to benefit by purchasing goods and services from those who can produce them more cheaply and effectively, regardless of whether the producer is in a neighboring state or a distant country. This principle is built on two key economic concepts.</p>

            <h4 id="1-1-1" className="font-semibold mt-5 mb-2 truncate">1.1.1 Comparative Advantage in the Indian Context</h4>
            <p>The first and most important of these is comparative advantage. This theory holds that even if one country possesses an absolute advantage—meaning it can produce every single product more efficiently than another country—it still gains by specializing in producing the goods where its relative efficiency is highest and trading for the rest. A classic analogy illustrates this point: consider a neurosurgeon who is also faster at mopping floors than the hospital's janitor. The neurosurgeon has an absolute advantage in both surgery and cleaning. However, her time is far more valuable when spent performing surgery. It is in her economic interest to specialize in surgery and pay the janitor to mop the floors, even if the janitor is slower. The neurosurgeon's comparative advantage is in surgery. Similarly, a country might be twice as productive in making clothing as its trading partner, but if it is three times as productive in making airplanes, it will benefit from specializing in and exporting airplanes while importing clothes. For an entrepreneur, this means that their product can find a market abroad even if that foreign country is highly efficient, as long as the entrepreneur's country has a comparative advantage in producing that specific good.</p>
            <p>For the Indian entrepreneur, this is not merely an abstract theory; it is the fundamental basis of the nation's export strength. India's comparative advantage is rooted in its unique combination of a large, semi-skilled labor force, diverse climatic conditions, and rich endowments of natural resources.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Labor-Intensive Goods:</b> India has a durable advantage in textiles and clothing, animal products, and food products. The large production of high-quality raw materials like cotton and jute, aided by favorable climatic conditions, directly fuels the country's dominance in the textile sector. Similarly, the availability of cheap, semi-skilled labor is a cornerstone of India's competitiveness in mass-produced items like apparel. The domestic availability of raw materials like cotton and a long tradition of craftsmanship further bolster this advantage.</li>
              <li><b>Resource-Based and Scale-Intensive Goods:</b> The nation demonstrates a strong and persistent advantage in product groups such as plastic and rubber, hides and skin, footwear, and transportation equipment. India's position as one of the largest producers of natural rubber, for example, underpins its advantage in the plastic and rubber category. In transportation equipment, a combination of cheap semi-skilled and skilled labor, deep engineering capabilities, and the domestic availability of raw materials like steel gives India a significant cost advantage.</li>
              <li><b>Value-Added Specialization:</b> A prime example of comparative advantage is India's diamond industry. India is not a major producer of rough diamonds. Instead, its global dominance lies in the highly skilled, labor-intensive process of cutting and polishing rough diamonds, with an estimated 90% of the world's diamonds being processed in the country, particularly in Surat. This is a perfect illustration of specializing not in the raw material, but in a high-value stage of the production process where the country has a distinct skill and cost advantage.</li>
            </ul>

            <h4 id="1-1-2" className="font-semibold mt-5 mb-2 truncate">1.1.2 Economies of Scale: The Engine of Export Growth</h4>
            <p>The second key concept is economies of scale. International trade provides access to a global market, allowing businesses to produce in much larger quantities than if they were limited to domestic demand alone. This increased production volume spreads fixed costs (like machinery and factory overhead) over a greater number of units, which lowers the cost per unit. This efficiency gain can translate into lower prices for consumers and higher profit margins for the business, creating a powerful incentive for export-oriented growth.</p>
            <p>This principle is visibly at work across India's most successful export industries:</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Manufacturing:</b> Large-scale manufacturers like Tata Motors and Mahindra & Mahindra achieve significant cost reductions by producing vehicles in high volumes for both domestic and international markets. Their investment in robotics and streamlined assembly lines is a direct strategy to enhance production efficiency and leverage economies of scale.</li>
              <li><b>Petrochemicals:</b> Reliance Industries' Jamnagar refinery complex is a world-class example of achieving economies of scale. By building one of the largest and most complex refineries globally, Reliance can process a wide range of crude oils efficiently, giving it a cost advantage in producing refined petroleum products, a top export for India. This massive scale provides feedstock security, logistics advantages, and global cost-competitiveness, making it a formidable player in international markets.</li>
              <li><b>Information Technology (IT):</b> The Indian IT sector, with giants like Tata Consultancy Services (TCS) and Infosys, benefits immensely from scale. They achieve this by standardizing processes, investing in large-scale software development centers, and creating reusable technology assets. This allows them to serve a vast global clientele with a highly efficient and cost-effective service delivery model, which is a key reason for their export success.</li>
              <li><b>Pharmaceuticals:</b> India's status as the "pharmacy of the world" is built on economies of scale. Companies like Sun Pharma and Dr. Reddy's Laboratories operate large-scale production facilities that allow for the mass production of generic medicines and vaccines. This high volume significantly reduces the per-unit cost, making Indian pharmaceuticals highly competitive on price globally.</li>
            </ul>
            <p>While large corporations achieve scale through massive internal investment, it is crucial to understand how India's vital Micro, Small, and Medium Enterprises (MSMEs) compete. MSMEs form the backbone of many export sectors, such as textiles and handicrafts, but typically lack the capital for large-scale internal expansion. Their path to achieving cost efficiencies lies in leveraging external economies of scale. This is accomplished primarily through two mechanisms:</p>
            <ol className="list-decimal pl-6 mb-2">
              <li><b>Cluster Development:</b> Businesses in specific sectors often concentrate geographically, such as the textile clusters in Mumbai and Tirupur or the IT hubs in Bengaluru and Hyderabad. These clusters create a powerful ecosystem where firms benefit from a shared pool of skilled labor, established supply chain networks, and specialized ancillary services. This shared infrastructure lowers the operating costs for every firm within the cluster, creating a collective competitive advantage.</li>
              <li><b>Institutional Aggregation:</b> Export Promotion Councils (EPCs) act as critical aggregators for MSMEs. They provide access to market intelligence, organize participation in international trade fairs, and offer shared resources that would be prohibitively expensive for a single small firm. By banding together under the umbrella of an EPC, MSMEs can achieve a collective scale in marketing, negotiation, and logistics.</li>
            </ol>
            <p>For an aspiring MSME entrepreneur, the strategic takeaway is clear: achieving global competitiveness is not about trying to build a factory the size of Reliance's. It is about strategically positioning the business within an existing industry cluster and actively engaging with the relevant Export Promotion Council. This is the most viable and effective path to leveraging economies of scale.</p>

            <h3 id="1-2" className="text-base font-semibold mt-6 mb-2 truncate">1.2 Debunking Common Myths and Misconceptions</h3>
            <p>The public discourse surrounding international trade is often filled with myths and politicized narratives that can deter new entrants. Understanding the economic reality behind these misconceptions is vital for building a confident, long-term strategy.</p>

            <h4 id="1-2-1" className="font-semibold mt-5 mb-2 truncate">1.2.1 The Trade Deficit Myth</h4>
            <p>A prevalent myth revolves around the trade deficit. A trade deficit, which occurs when a country imports more goods and services than it exports, is frequently portrayed as a sign of economic failure or being "taken advantage of" by other nations. However, this view misinterprets a basic accounting identity. Trade is always balanced in terms of value. When a country runs a trade deficit on its current account, the corresponding gap is filled by a surplus on its capital and financial accounts.</p>
            <p>In simple terms, the foreign currency that a country's trading partners earn from their exports is not lost; it is reinvested back into that country's economy. This inflow of foreign capital comes in the form of investments in assets like stocks, bonds, real estate, and foreign direct investment (FDI) into factories and businesses. Recent data from the Reserve Bank of India (RBI) illustrates this perfectly. For instance, in the third quarter of 2024-25, India recorded a current account deficit (CAD) of US$11.5 billion. This deficit was financed by capital inflows, including non-resident deposits (NRI deposits) and external commercial borrowings (ECBs). This foreign investment helps to lower domestic interest rates, fund infrastructure projects, and fuel overall economic growth. From this perspective, imports are a benefit (what a country gets to consume and use), while exports are a cost (what it has to produce and give up).</p>

            <h4 id="1-2-2" className="font-semibold mt-5 mb-2 truncate">1.2.2 The Tariff Fallacy</h4>
            <p>Another common fallacy is that tariffs protect domestic jobs and create prosperity. A tariff is simply a tax imposed on imported goods. This tax is not paid by the foreign government or the foreign exporting company. It is paid by the domestic company that imports the goods, and this cost is ultimately passed on to domestic consumers in the form of higher prices.</p>
            <p>While a tariff might temporarily protect a specific job in a specific, inefficient industry by making foreign competition more expensive, it inevitably destroys jobs elsewhere in the economy. Consumers who are forced to pay higher prices for the protected goods (e.g., steel, electronics) have less disposable income to spend on other products and services (e.g., dining out, entertainment, other consumer goods). This reduced demand leads to job losses in those other, often more efficient, sectors. Protectionism does not create wealth; it merely redistributes it from consumers and efficient industries to protected, inefficient ones, making the overall economy poorer.</p>
            <p>The impact of such policies is not theoretical. Recent analysis of proposed US "reciprocal tariffs" on Indian goods provides a stark, real-world example. Studies projected that these tariffs could lead to a significant decline in key Indian exports to the US, including a potential 20.2% drop in seafood exports, a $1.78 billion fall in electronics exports, and a $1.82 billion decline in gold and diamond jewelry exports. While some analyses suggest India's large domestic economy might cushion the overall GDP impact, the damage to specific export-oriented sectors and the jobs they support is undeniable. This demonstrates clearly how protectionist measures by a trading partner can directly harm an entrepreneur's ability to compete and grow.</p>

            <h3 id="1-3" className="text-base font-semibold mt-6 mb-2 truncate">1.3 The Modern Global Trade Ecosystem: Key Players and Structures</h3>
            <p>The smooth functioning of global trade relies on a complex ecosystem of public and private entities that establish rules, facilitate logistics, and provide financing. For a new trader, understanding these key players is the first step in navigating the landscape.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Governments:</b> National governments are central actors. They establish domestic trade policies, negotiate bilateral and multilateral trade agreements, and regulate the flow of imports and exports. For an Indian entrepreneur, this means interacting with and understanding the policies and procedures set by key government bodies. The primary agencies are the Ministry of Commerce and Industry and its two crucial arms:
                <ul className="list-disc pl-6">
                  <li><b>The Directorate General of Foreign Trade (DGFT):</b> This is the main agency responsible for formulating and implementing India's Foreign Trade Policy. It is the body that issues the essential Importer-Exporter Code (IEC) and administers various export promotion schemes.</li>
                  <li><b>The Central Board of Indirect Taxes and Customs (CBIC):</b> Under the Ministry of Finance, the CBIC is the apex body for administering customs procedures. It manages the clearance of all goods entering or leaving the country through its network of customs houses at ports and airports.</li>
                </ul>
              </li>
              <li><b>International Organizations:</b> These bodies create the framework for a rules-based global trading system, providing stability and predictability for businesses.
                <ul className="list-disc pl-6">
                  <li><b>The World Trade Organization (WTO):</b> Established in 1995, the WTO is the primary organization governing the rules of trade between nations. It operates on three equally important functions: providing a forum for negotiating trade agreements to reduce barriers, monitoring the implementation of these agreements, and settling trade disputes between member countries. The WTO's work creates a more stable and predictable environment, which is essential for businesses to trade with confidence.</li>
                  <li><b>The International Chamber of Commerce (ICC):</b> Often called the "merchants of peace," the ICC is a private-sector global business organization. Its crucial role is to set the rules and standards that govern international business transactions. Its most famous contribution is the publication of the International Commercial Terms (Incoterms®), which are globally accepted definitions for allocating costs and risks in sales contracts. The ICC also provides vital dispute resolution services through its International Court of Arbitration and advocates for pro-trade policies globally.</li>
                </ul>
              </li>
              <li><b>Private Sector Actors:</b> These are the entities a trader will work with on a daily basis to execute transactions.
                <ul className="list-disc pl-6">
                  <li><b>Exporters and Importers:</b> The core participants who buy and sell goods and services across borders.</li>
                  <li><b>Logistics and Transportation Providers:</b> Companies like freight forwarders, shipping lines, airlines, and trucking companies that physically move the goods from origin to destination.</li>
                  <li><b>Financial Institutions:</b> Banks and other finance providers that offer essential services like letters of credit, trade finance, and foreign currency exchange to mitigate risks and ensure smooth payments.</li>
                  <li><b>Customs Brokers:</b> Licensed professionals who act as agents for importers and exporters to ensure that shipments meet all customs requirements for clearance.</li>
                </ul>
              </li>
            </ul>

            <h3 id="1-4" className="text-base font-semibold mt-6 mb-2 truncate">1.4 The Current Landscape: Navigating a Transformative Era</h3>
            <p>The global trade environment is currently undergoing a period of profound change. It is characterized by significant disruptions, but also by immense opportunities driven by technology and strategic realignment.</p>
            <p>The landscape is marked by escalating geopolitical tensions, rising protectionist policies, and increased regulatory uncertainty. These factors challenge established business models and create inefficiencies in global supply chains. However, despite these headwinds, international trade has proven to be remarkably resilient. The dominant trend is not a retreat from globalization, but rather a fundamental reconfiguration of global trade flows.</p>
            <p>This reconfiguration is driven by a strategic imperative for businesses, particularly in the West, to "de-risk" their supply chains. Decades of hyper-optimization and reliance on single-source manufacturing hubs, most notably China, have been called into question by geopolitical friction, pandemic-related disruptions, and rising labor costs. In response, companies are actively seeking to diversify their sourcing by shifting trade to more "geopolitically aligned" or "friendly" nations. This shift represents more than a marginal adjustment; it is a structural change in the geometry of global trade.</p>
            <p>For an Indian entrepreneur, this global shift is not just a risk to be managed but a powerful, once-in-a-generation opportunity. India, with its large, democratic, and "mid-aligned" economy, is ideally positioned to become a key partner for Western companies seeking to build more resilient and diversified supply chains. This creates a powerful new value proposition. An Indian exporter today is not just selling a product; they are selling a strategic solution—supply chain stability, diversification, and reliability. This narrative must become a central part of the entrepreneur's marketing and positioning strategy. When pitching to a buyer in Europe or North America, the conversation should move beyond just price and quality to highlight the strategic benefit of sourcing from India as a way to de-risk their operations from over-reliance on a single country. This elevates the Indian exporter from a mere supplier to a strategic partner in building the resilient supply chains of the future.</p>
            <p>Simultaneously, technology is revolutionizing the mechanics of trade. Digitalization, automation, and blockchain platforms are making transactions faster, more transparent, and more efficient, helping to overcome traditional trade barriers. There is also a growing emphasis on sustainability, with increasing pressure on businesses to adopt environmentally friendly logistics and sourcing practices to minimize their carbon footprint. Aspiring traders must embrace these technological and sustainable trends to remain competitive in the modern era.</p>
          </section>
          {/* Part II: The Indian Export Opportunity: Strategic Product & Market Selection */}
          <section id="part-2" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part II: The Indian Export Opportunity: Strategic Product & Market Selection</h2>
            <p>This part moves from the 'why' of trade to the 'what' and 'where'. It is a data-driven, strategic guide designed to help the entrepreneur make the two most critical decisions for their new venture: which product to export and which market to target. Making these choices based on empirical evidence rather than anecdote is the first step toward building a sustainable business.</p>

            <h3 id="2-1" className="text-base font-semibold mt-6 mb-2 truncate">2.1 Identifying Your Strength: An In-Depth Analysis of India's Comparative Advantage</h3>
            <p>The principle of comparative advantage provides a powerful framework for identifying which products a country is best positioned to export. A country's Revealed Comparative Advantage (RCA) is a data-driven measure that identifies which products it can produce and export most efficiently relative to the rest of the world. For an entrepreneur, selecting a product where India has a high RCA is a strategic move that leverages the nation's inherent strengths, increasing the probability of success.</p>
            <p>A synthesis of multiple economic analyses reveals a clear pattern in India's export strengths. These can be categorized as follows:</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Labor-Intensive Goods:</b> India has a persistent and strong comparative advantage in goods that rely on its large and cost-effective labor force. This includes sectors like textiles and clothing (HS Chapters 50-63), hides and skins, and footwear. The domestic availability of raw materials like cotton and a long tradition of craftsmanship further bolster this advantage.</li>
              <li><b>Scale-Intensive & Resource-Based Goods:</b> The country shows a strong advantage in industries that benefit from economies of scale and access to domestic resources. This category includes chemicals (especially organic chemicals), plastics and rubber, and transportation equipment. India's large production of natural rubber and steel, coupled with improving refining capacity and deep engineering skills, are key drivers.</li>
              <li><b>Knowledge-Intensive Goods:</b> While still developing, India has a significant and growing comparative advantage in knowledge-based sectors. Pharmaceuticals (HS Chapter 30) are a prime example, where India has become a global leader in generic drug manufacturing, supported by a skilled technical workforce and government policies. This category also includes Information and Communications Technology (ICT) services, which have been a major export driver for decades.</li>
            </ul>
            <div className="overflow-x-auto mb-4">
              <div className="text-sm font-semibold mb-2">India's Revealed Comparative Advantage by Sector</div>
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Product Sector</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Key Products (HS Chapters)</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">RCA Status & Trend</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Underlying Drivers</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Strategic Implication</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Textiles & Clothing</td>
                    <td className="border border-gray-300 px-3 py-2">Cotton (52), Knitted/Crocheted Apparel (61), Woven Apparel (62), Other Made-up Textile Articles (63)</td>
                    <td className="border border-gray-300 px-3 py-2">Persistent High Advantage</td>
                    <td className="border border-gray-300 px-3 py-2">Low-cost semi-skilled labor, domestic raw material (cotton, jute), established industry clusters (e.g., Tirupur)</td>
                    <td className="border border-gray-300 px-3 py-2">High-potential sector for new entrants, especially MSMEs. Competition is high, so focus on quality, niche markets (e.g., sustainable fabrics), or value-added designs is key.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Gems & Jewellery</td>
                    <td className="border border-gray-300 px-3 py-2">Pearls, Precious Stones, Metals (71)</td>
                    <td className="border border-gray-300 px-3 py-2">Persistent High Advantage</td>
                    <td className="border border-gray-300 px-3 py-2">World-class skilled labor in diamond cutting & polishing, strong industry network (e.g., Surat, Mumbai)</td>
                    <td className="border border-gray-300 px-3 py-2">Highly specialized sector. Requires significant expertise and trust. Value addition through design and craftsmanship is the primary opportunity.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Chemicals & Plastics</td>
                    <td className="border border-gray-300 px-3 py-2">Organic Chemicals (29), Plastics & Articles thereof (39), Rubber & Articles thereof (40)</td>
                    <td className="border border-gray-300 px-3 py-2">Gaining Advantage</td>
                    <td className="border border-gray-300 px-3 py-2">Economies of scale in production, domestic raw material supply, growing refining capacity, demand for intermediaries from global firms</td>
                    <td className="border border-gray-300 px-3 py-2">Capital-intensive for manufacturing, but opportunities exist in trading and exporting specialized chemicals. Requires adherence to strict international safety standards.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Pharmaceuticals</td>
                    <td className="border border-gray-300 px-3 py-2">Pharmaceutical Products (30)</td>
                    <td className="border border-gray-300 px-3 py-2">Strong & Growing Advantage</td>
                    <td className="border border-gray-300 px-3 py-2">Skilled technical workforce, large-scale production facilities (economies of scale), numerous FDA-approved plants, government support</td>
                    <td className="border border-gray-300 px-3 py-2">Highly regulated industry. Opportunities lie in exporting generic drugs, active pharmaceutical ingredients (APIs), and vaccines. Requires stringent quality control and regulatory compliance.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Transportation Equipment</td>
                    <td className="border border-gray-300 px-3 py-2">Vehicles other than Railway (87)</td>
                    <td className="border border-gray-300 px-3 py-2">Persistent Advantage</td>
                    <td className="border border-gray-300 px-3 py-2">Deep engineering capabilities, availability of cheap skilled and semi-skilled labor, strong domestic auto component ecosystem</td>
                    <td className="border border-gray-300 px-3 py-2">Dominated by large players, but significant opportunities exist in the auto components sub-sector, supplying to global OEMs. Quality certification (e.g., IATF 16949) is critical.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Agricultural & Food Products</td>
                    <td className="border border-gray-300 px-3 py-2">Cereals (10), Fish & Crustaceans (03), Coffee, Tea, Spices (09), Edible Fruits & Nuts (08)</td>
                    <td className="border border-gray-300 px-3 py-2">Persistent Advantage</td>
                    <td className="border border-gray-300 px-3 py-2">Diverse agro-climatic zones, large production base (e.g., world's largest producer of milk, rice, spices), strategic location for Middle East markets</td>
                    <td className="border border-gray-300 px-3 py-2">Opportunities in both raw commodities (rice, wheat) and processed foods. Requires focus on quality, food safety standards (e.g., phytosanitary certificates), and supply chain management.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 id="2-2" className="text-base font-semibold mt-6 mb-2 truncate">2.2 High-Potential Products: Analyzing India's Top Exports</h3>
            <p>Beyond theoretical advantage, it is crucial to examine which products are currently performing best in the global marketplace. Analyzing India's top exports by value provides a real-time snapshot of where demand is strong and where Indian companies are successfully competing. As of early 2024, India's export basket is led by a diverse mix of high-value manufactured goods and commodities.</p>
            <ol className="list-decimal pl-6 mb-2">
              <li><b>Mineral Fuels (including Refined Petroleum):</b> Valued at approximately $74.27 billion, this is India's single largest export category. This dominance is driven by India's world-class refining capacity, particularly at coastal refineries like Jamnagar, and its strategic location between Middle Eastern producers and Asian consumer markets.</li>
              <li><b>Electrical & Electronic Equipment:</b> A rapidly growing category with exports valued at $39.36 billion. This includes smartphones, which have become a major export item, driven by government initiatives like the Production Linked Incentive (PLI) scheme.</li>
              <li><b>Machinery, Nuclear Reactors, Boilers:</b> With exports of $32.01 billion, this reflects India's strengthening engineering and capital goods sector.</li>
              <li><b>Pearls, Precious Stones, Metals (Gems & Jewellery):</b> A traditional powerhouse, with exports of $29.25 billion. This category is dominated by cut and polished diamonds and handcrafted jewelry, showcasing India's exceptional craftsmanship.</li>
              <li><b>Pharmaceutical Products:</b> Exports stand at $22.98 billion, cementing India's role as the "pharmacy of the world". The success is built on producing high-quality, affordable generic drugs and vaccines for global markets.</li>
              <li><b>Vehicles other than Railway, Tramway:</b> A significant category with exports of $21.75 billion, driven by both fully assembled vehicles and a vast range of auto components supplied to global automotive giants.</li>
              <li><b>Organic Chemicals:</b> With exports of $20.69 billion, this sector benefits from India's large-scale production facilities and serves as a critical supplier of intermediates to global chemical and pharmaceutical industries.</li>
            </ol>

            <h3 id="2-3" className="text-base font-semibold mt-6 mb-2 truncate">2.3 Finding Your Market: A Guide to Top Export Destinations</h3>
            <p>Identifying the right product is only half the battle; finding a receptive market is equally critical. A strategic analysis of India's top export destinations reveals where commercial relationships are strongest and where demand is proven.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>United States:</b> 15% of total exports</li>
              <li><b>United Arab Emirates (UAE):</b> 9.6% of total exports</li>
              <li><b>China:</b> 5.1% of total exports</li>
              <li><b>Hong Kong:</b> 4.4% of total exports</li>
              <li><b>Germany:</b> 3.4% of total exports</li>
            </ul>
            <p>However, a simple list of countries is not enough. The key for an entrepreneur is to understand what these countries are buying from India, allowing for a precise product-market match.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>United States:</b> The largest market, with demand heavily skewed towards high-value items. It is the top destination for Indian diamonds, packaged medicaments, and jewelry.</li>
              <li><b>United Arab Emirates:</b> A crucial hub for trade. The UAE is a primary importer of Indian jewelry, refined petroleum, and rice. Its role as a re-export hub also makes it a gateway to markets in Africa and the wider Middle East.</li>
              <li><b>China:</b> Demand from China is heavily focused on industrial raw materials and intermediate goods. Its main import from India is refined copper, along with other base metals and organic chemicals.</li>
              <li><b>Hong Kong:</b> Similar to the US, the Hong Kong market is dominated by imports of Indian diamonds and jewelry, reflecting its status as a major trading and finance center for luxury goods.</li>
              <li><b>Germany:</b> As an industrial powerhouse, Germany's imports from India reflect its manufacturing needs. The top import category is gas turbines, followed by other machinery and engineering goods.</li>
            </ul>
            <p>This data provides clear strategic direction. An entrepreneur looking to export jewelry should prioritize the US and UAE. A chemical exporter might find a strong market in China. An engineering components manufacturer should look closely at the needs of the German industrial sector.</p>

            <h3 id="2-4" className="text-base font-semibold mt-6 mb-2 truncate">2.4 The Language of Trade: Mastering the HS Code</h3>
            <p>Before any product can be shipped, it must be classified using a universal language understood by customs authorities worldwide: the Harmonized System (HS) code. In India, this is often referred to as the ITC-HS Code (Indian Trade Clarification based on Harmonized System). Getting this code right is a non-negotiable, foundational step in the export process.</p>

            <h4 className="font-semibold mt-5 mb-2 truncate">Structure of the Code</h4>
            <p>The HS code is a multi-digit number that provides a precise classification for a product. Its structure is hierarchical:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>First 2 digits: Chapter (Broad product category, e.g., Chapter 09 for Coffee, Tea, Spices)</li>
              <li>Next 2 digits: Heading (More specific grouping within the chapter, e.g., 09.02 for Tea)</li>
              <li>Next 2 digits: Subheading (Further product detail, e.g., 0902.30 for Black Tea)</li>
            </ul>
            <p>These first six digits are standardized globally under the World Customs Organization (WCO) convention. However, countries can add further digits for their own tariff and statistical purposes. India uses an 8-digit ITC-HS code.</p>
            <p><b>Example:</b> For a specific type of plastic article, the code might be structured as follows:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Chapter 39: Plastics and articles thereof</li>
              <li>Heading 39.23: Articles for the conveyance or packing of goods, of plastics</li>
              <li>Subheading 3923.10: Boxes, cases, crates and similar articles</li>
            </ul>

            <h4 className="font-semibold mt-5 mb-2 truncate">How to Find Your Product's HS Code</h4>
            <ol className="list-decimal pl-6 mb-2">
              <li>Start with the Indian Customs Tariff: The official source is the tariff schedule published by the Central Board of Indirect Taxes and Customs (CBIC).</li>
              <li>Use Online Search Tools: The DGFT's India Trade Portal (indiantradeportal.in) and dedicated commercial data platforms like ExportImportData.in offer user-friendly search functions to find the HS code for a product.</li>
              <li>Consult an Expert: If in doubt, a customs broker or a freight forwarder can provide expert guidance on correct classification.</li>
            </ol>

            <h4 className="font-semibold mt-5 mb-2 truncate">Why the HS Code is Critical</h4>
            <p>The HS code is the single most important piece of data in an export shipment. It dictates:</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Customs Duties and Taxes:</b> The rate of Basic Customs Duty (BCD) and Integrated GST (IGST) payable upon import into the destination country is determined by the HS code.</li>
              <li><b>Regulatory Compliance:</b> It determines whether a product is subject to any restrictions, licensing requirements, or quality standards.</li>
              <li><b>Eligibility for Trade Agreements:</b> Access to preferential tariffs under Free Trade Agreements (FTAs) is based on the HS code and associated Rules of Origin.</li>
            </ul>
            <p>Using an incorrect HS code is a serious error that can lead to significant penalties, including shipment delays, fines, seizure of goods, and legal action. It is an area where meticulous attention to detail is paramount.</p>
          </section>
          {/* Part III: The Export-Import Operations Playbook: A Step-by-Step Guide */}
          <section id="part-3" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part III: The Export-Import Operations Playbook: A Step-by-Step Guide</h2>
            <p>This part serves as the operational core of the playbook, providing a chronological, step-by-step walkthrough of the entire export-import process. It is designed to be a practical "how-to" guide, filled with checklists, templates, and legal guidance to navigate the journey from company setup to final payment.</p>

            <h3 id="3-1" className="text-base font-semibold mt-6 mb-2 truncate">3.1 Laying the Groundwork: Company Setup and Essential Registrations</h3>
            <p>Before the first container can be shipped, a solid legal and regulatory foundation must be established. This involves forming a business entity and securing the necessary registrations to operate legally in the international trade arena.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Step 1: Business Entity Formation:</b> The first decision is the legal structure of the business. Common options in India include a Sole Proprietorship, a Partnership Firm, or a Private Limited Company. While a proprietorship is simplest to start, a Private Limited Company offers limited liability, a more professional structure, and greater ease in securing financing, which are significant advantages for a business with global ambitions.</li>
              <li><b>Step 2: Obtaining the Importer Exporter Code (IEC):</b> The IEC is a mandatory 10-digit code issued by the DGFT and is the primary identification for any business engaged in import or export. Without an IEC, a business cannot legally trade across borders. The application process is entirely online:
                <ol className="list-decimal pl-6 mt-2">
                  <li>Visit the DGFT Website: Navigate to the official portal at dgft.gov.in.</li>
                  <li>Register: Create a user account on the portal using the business's Permanent Account Number (PAN) and authenticating with Aadhaar or a Digital Signature Certificate (DSC).</li>
                  <li>Apply for IEC: Select 'Apply for IEC' from the 'Services' menu.</li>
                  <li>Fill Application Form: Complete the online application form (ANF 2A) with details of the business entity, its directors/partners, and bank information.</li>
                  <li>Upload Documents: Upload scanned copies of the required documents, which typically include the PAN card, proof of address (e.g., utility bill, rent agreement), and a cancelled cheque of the business's current bank account.</li>
                  <li>Pay Fee: Pay the prescribed application fee electronically via the portal's payment gateway.</li>
                  <li>Receive e-IEC: Upon successful verification, the DGFT issues the electronic IEC (e-IEC), which is sent to the registered email address. The certificate can also be downloaded from the DGFT portal.</li>
                </ol>
                <p className="mt-2">It is critical to note that while the IEC has lifetime validity, it must be updated annually on the DGFT portal between April and June. Failure to do so can lead to the deactivation of the code.</p>
              </li>
              <li><b>Step 3: Registration Cum Membership Certificate (RCMC):</b> An RCMC is a certificate that validates an exporter's registration with a specific Export Promotion Council (EPC) or commodity board. It is mandatory for claiming various benefits and concessions under India's Foreign Trade Policy. The entrepreneur must apply for an RCMC from the EPC corresponding to their primary product line (e.g., Apparel Export Promotion Council (AEPC) for garments, Engineering Export Promotion Council (EEPC) for machinery parts).</li>
              <li><b>Step 4: GST Registration:</b> Registration under the Goods and Services Tax (GST) regime is essential. For exporters, this is particularly important for managing tax liabilities and claims. Exporters can ship goods without paying IGST by furnishing a Letter of Undertaking (LUT), or they can pay the IGST on the export and later claim a refund.</li>
            </ul>

            <h3 id="3-2" className="text-base font-semibold mt-6 mb-2 truncate">3.2 The Pre-Shipment Phase: From Inquiry to Confirmed Order</h3>
            <p>This phase covers the crucial commercial negotiations and documentation that precede the physical movement of goods.</p>

            <h4 id="3-2-1" className="font-semibold mt-5 mb-2 truncate">3.2.1 The International Sales Contract</h4>
            <p>The international sales contract is the legal bedrock of the entire transaction. It must be comprehensive, clear, and unambiguous to protect the interests of both the exporter and the importer. It is highly advisable to include the following key clauses, which serve as a blueprint for the agreement:</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Description of Goods:</b> This clause must be meticulously detailed, specifying quality, technical specifications, quantity, and packaging to prevent any disputes upon delivery.</li>
              <li><b>Contract Price and Currency:</b> Clearly state the total price, the price per unit, and the currency of the transaction (e.g., USD, EUR, INR) to avoid ambiguity.</li>
              <li><b>Delivery Terms (Incoterms®):</b> This is one of the most critical clauses. The parties must agree on an Incoterm from the latest version published by the ICC (e.g., Incoterms® 2020). Incoterms define the precise point at which the risk, cost, and responsibility for the goods transfer from the seller to the buyer. For example, under FOB (Free On Board), the seller's responsibility ends once the goods are loaded on the vessel nominated by the buyer at the named port of shipment. Under CIF (Cost, Insurance, and Freight), the seller is responsible for the cost of goods, marine insurance, and freight charges to the named destination port. The chosen Incoterm must be followed by the specific named place (e.g., "FOB, Mundra Port, India").</li>
              <li><b>Payment Conditions:</b> Specify the method of payment agreed upon (e.g., Letter of Credit, Documentary Collection, Open Account), the timeline for payment, and the bank details of both parties.</li>
              <li><b>Inspection of Goods:</b> Outline the terms for pre-shipment inspection (PSI), if required by the buyer. This includes specifying the inspection agency, location, and standards.</li>
              <li><b>Retention of Title (RoT):</b> A vital protective clause for the exporter. It states that the seller retains legal ownership of the goods until the buyer has paid the full purchase price. This can be crucial for reclaiming goods in case of non-payment.</li>
              <li><b>Force Majeure:</b> This clause excuses both parties from fulfilling their contractual obligations in the event of unforeseeable circumstances beyond their control, such as natural disasters, wars, or government-imposed restrictions.</li>
              <li><b>Dispute Resolution:</b> Clearly define the mechanism for resolving any disputes. The parties should choose between arbitration (often preferred in international trade for its neutrality and enforceability) and litigation. The clause must specify the governing law (e.g., "the laws of India") and the venue for the proceedings (e.g., "arbitration in Singapore," or "the courts of Mumbai").</li>
            </ul>

            <h4 id="3-2-2" className="font-semibold mt-5 mb-2 truncate">3.2.2 The Ultimate Pre-Export Documentation Checklist</h4>
            <p>Meticulous documentation is the lifeblood of a smooth export transaction. The following checklist covers the essential documents that must be prepared during the pre-shipment phase:</p>
            <ol className="list-decimal pl-6 mb-2">
              <li>Proforma Invoice: A preliminary bill of sale sent to the buyer before the shipment of goods. It provides a commitment from the seller to sell the goods at specified prices and terms.</li>
              <li>Purchase Order: The official order issued by the buyer, confirming the details from the proforma invoice.</li>
              <li>Commercial Invoice: The final bill and a key document used by customs to determine the true value of the goods for duty assessment.</li>
              <li>Packing List: A detailed list itemizing the contents of each package, including weights, dimensions, and markings.</li>
              <li>Certificate of Origin: A document certifying the country where the goods were produced. This is crucial for claiming benefits under Free Trade Agreements.</li>
              <li>Shipping Bill / Bill of Export: The primary declaration filed with customs authorities to request permission for export.</li>
              <li>Bill of Lading (for sea freight) / Airway Bill (for air freight): A contract between the owner of the goods and the carrier. It serves as a receipt for the goods and a document of title.</li>
              <li>Insurance Policy/Certificate: A document proving that the cargo is insured against loss or damage during transit.</li>
              <li>Letter of Credit (L/C) or Documentary Collection Instructions: If these payment methods are used, the specific documents required by the bank must be prepared exactly as stipulated.</li>
              <li>Inspection Certificate: A certificate issued by an independent inspection agency verifying the quality and quantity of the goods before shipment.</li>
            </ol>

            <h3 id="3-3" className="text-base font-semibold mt-6 mb-2 truncate">3.3 The Shipment Phase: Logistics and Customs Clearance</h3>
            <p>This phase involves the physical movement of goods and their clearance through customs authorities at both the port of export and the port of import.</p>

            <h4 id="3-3-1" className="font-semibold mt-5 mb-2 truncate">3.3.1 Calculating the Total Landed Cost</h4>
            <p>To price a product accurately and ensure profitability, an entrepreneur must calculate the Total Landed Cost. This is the complete cost of a product once it has arrived at the buyer's doorstep. Simply using the ex-factory price is a common and costly mistake. The landed cost formula provides a comprehensive view:</p>
            <p className="font-mono bg-gray-100 rounded p-2 mb-2">LandedCost = ProductCost + ShippingCosts + CustomsDuties/Taxes + RiskMitigationCosts(Insurance) + Overhead</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Product Cost:</b> The price of the goods from the factory.</li>
              <li><b>Shipping Costs:</b> This includes domestic transportation to the port, port handling charges (THC), freight charges (ocean or air), and any destination handling charges.</li>
              <li><b>Customs Duties & Taxes:</b> These are levied by the importing country's government and are calculated based on the product's HS Code and its assessable value. This typically includes Basic Customs Duty (BCD) and local taxes like VAT or GST (in India's case, IGST is levied on imports).</li>
              <li><b>Risk Mitigation Costs:</b> This primarily includes the premium for cargo insurance. It can also include fees for compliance checks or quality assurance.</li>
              <li><b>Overhead:</b> This covers bank charges for payment processing, customs broker fees, and other administrative expenses.</li>
            </ul>
            <p>Accurately calculating the landed cost is essential for determining the final sale price, understanding the profit margin, and ensuring the product remains competitive in the target market. Many logistics providers like DHL and FedEx offer online calculators that can help estimate these costs.</p>

            <h4 id="3-3-2" className="font-semibold mt-5 mb-2 truncate">3.3.2 Navigating Indian Customs (CBIC)</h4>
            <p>The customs clearance process is a formal procedure managed by the CBIC to regulate the flow of goods. The entire process is now largely electronic, conducted through the ICEGATE (Indian Customs Electronic Gateway) portal.</p>
            <h5 className="font-semibold mt-4 mb-1 truncate">Export Clearance Process:</h5>
            <ol className="list-decimal pl-6 mb-2">
              <li>Filing the Shipping Bill: The exporter or their Customs Broker files the Shipping Bill electronically on the ICEGATE portal. This document contains details of the exporter, buyer, goods, value, vessel/flight number, etc.</li>
              <li>Goods Examination: The system's Risk Management System (RMS) may flag the cargo for physical examination by customs officers to verify the declaration.</li>
              <li>"Let Export" Order: Once the documents are verified and any examination is complete, the customs officer issues the "Let Export" order. This is the official permission to load the goods onto the carrier.</li>
            </ol>
            <h5 className="font-semibold mt-4 mb-1 truncate">Import Clearance Process:</h5>
            <ol className="list-decimal pl-6 mb-2">
              <li>Submission of Import Manifest: Upon the vessel's or aircraft's arrival, the carrier files an Import General Manifest (IGM) with customs, detailing all cargo on board.</li>
              <li>Filing the Bill of Entry: The importer or their Customs Broker files a Bill of Entry on the ICEGATE portal. This is the importer's official declaration of the goods.</li>
              <li>Assessment: A customs officer assesses the Bill of Entry, verifying the HS code, declared value, and applicability of any exemptions. The system calculates the total duty payable.</li>
              <li>Payment of Duty: The importer pays the assessed customs duty electronically through the ICEGATE portal.</li>
              <li>Examination (If Required): The shipment may be selected for examination to ensure the goods match the declaration.</li>
              <li>"Pass Out" Order: After duty payment and examination (if any), customs issues the "Pass Out" order, which allows the goods to be cleared from the customs area for delivery to the importer.</li>
            </ol>

            <h3 id="3-4" className="text-base font-semibold mt-6 mb-2 truncate">3.4 The Post-Shipment Phase: Payment and Risk Management</h3>
            <p>Once the goods have been shipped, the focus shifts to securing payment and managing any remaining risks.</p>

            <h4 id="3-4-1" className="font-semibold mt-5 mb-2 truncate">3.4.1 A Strategic Comparison of Payment Methods</h4>
            <p>Choosing the right payment method is a critical decision that balances the exporter's need for security against the buyer's desire for favorable terms. Offering flexible payment terms can be a powerful competitive advantage, but it must be done with a clear understanding of the associated risks.</p>
            <div className="overflow-x-auto mb-4">
              <div className="text-sm font-semibold mb-2">Payment Methods: Risk-Reward Analysis</div>
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Payment Method</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Risk to Exporter</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Risk to Importer</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">When to Use</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Strategic Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Cash-in-Advance</td>
                    <td className="border border-gray-300 px-3 py-2">Very Low</td>
                    <td className="border border-gray-300 px-3 py-2">Very High</td>
                    <td className="border border-gray-300 px-3 py-2">New, unproven, or high-risk buyer; custom-made goods.</td>
                    <td className="border border-gray-300 px-3 py-2">The most secure option for the exporter, but highly unattractive to the buyer. Insisting on this may lead to lost sales.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Letter of Credit (L/C)</td>
                    <td className="border border-gray-300 px-3 py-2">Low</td>
                    <td className="border border-gray-300 px-3 py-2">High</td>
                    <td className="border border-gray-300 px-3 py-2">High-value transactions; new buyer where trust is not yet established but their bank is creditworthy.</td>
                    <td className="border border-gray-300 px-3 py-2">Very secure for the exporter, as it substitutes the bank's credit for the buyer's. However, it is expensive, complex, and requires meticulous documentation. Any discrepancy can lead to non-payment.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Documentary Collection (D/P - Documents against Payment)</td>
                    <td className="border border-gray-300 px-3 py-2">Medium</td>
                    <td className="border border-gray-300 px-3 py-2">Medium</td>
                    <td className="border border-gray-300 px-3 py-2">Established trading relationship; politically and economically stable markets.</td>
                    <td className="border border-gray-300 px-3 py-2">Less expensive than an L/C. The exporter retains control of the goods until payment is made. However, there is a risk the buyer may refuse to pay and collect the documents.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Documentary Collection (D/A - Documents against Acceptance)</td>
                    <td className="border border-gray-300 px-3 py-2">High</td>
                    <td className="border border-gray-300 px-3 py-2">Low</td>
                    <td className="border border-gray-300 px-3 py-2">Trusted, long-term relationship with a reputable buyer.</td>
                    <td className="border border-gray-300 px-3 py-2">The exporter relinquishes control of the goods before payment. This is essentially extending credit to the buyer, carrying a significant risk of default.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Open Account</td>
                    <td className="border border-gray-300 px-3 py-2">Very High</td>
                    <td className="border border-gray-300 px-3 py-2">Very Low</td>
                    <td className="border border-gray-300 px-3 py-2">Long-standing, highly trusted relationship; transactions between related companies.</td>
                    <td className="border border-gray-300 px-3 py-2">The most common and competitive method in many markets, but carries the highest risk for the exporter. Should only be used with trusted partners or when backed by export credit insurance.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 id="3-4-2" className="font-semibold mt-5 mb-2 truncate">3.4.2 Insuring Your Cargo: The Ultimate Safety Net</h4>
            <p>International shipping exposes cargo to numerous risks, including damage, theft, and loss. Cargo insurance is not an optional extra; it is an essential safety net to protect the financial value of the shipment. There are several types of insurance policies an entrepreneur should consider:</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Marine Cargo Insurance:</b> This is the most common form of transit insurance. Despite its name, it can cover goods transported by sea, air, and land. Policies can be All-Risk, which covers all physical loss or damage from any external cause unless specifically excluded, or Named Perils, which only covers losses from specific risks listed in the policy (e.g., fire, sinking).</li>
              <li><b>Political Risk Insurance:</b> This is crucial when exporting to or importing from countries with political instability. It covers losses arising from events like war, riots, civil unrest, or government actions like confiscation or expropriation of the goods.</li>
              <li><b>Export Credit Insurance (ECI):</b> This is a vital tool for managing commercial risk, especially when offering Open Account or D/A terms. ECI protects the exporter against the risk of non-payment by the foreign buyer due to insolvency, protracted default, or political events in the buyer's country. It provides the confidence to offer competitive credit terms and expand into new markets safely.</li>
            </ul>
          </section>
          {/* Part IV: Navigating the Indian Trade Ecosystem: Your Support Network */}
          <section id="part-4" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part IV: Navigating the Indian Trade Ecosystem: Your Support Network</h2>
            <p>Embarking on an export-import journey from India does not have to be a solitary endeavor. The government and various industry bodies have created a robust ecosystem designed to support, regulate, and promote international trade. Understanding this network and knowing how to leverage it effectively can provide a significant competitive advantage, transforming bureaucratic hurdles into pathways for growth.</p>

            <h3 id="4-1" className="text-base font-semibold mt-6 mb-2 truncate">4.1 Key Government Agencies: Who They Are and What They Do</h3>
            <p>For any new entrepreneur, two government agencies are of paramount importance. They are not obstacles to be avoided, but essential partners whose procedures must be mastered.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>The Directorate General of Foreign Trade (DGFT):</b>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Role:</b> The DGFT, operating under the Ministry of Commerce and Industry, is the principal architect of India's Foreign Trade Policy (FTP). Its primary mission is to facilitate and promote India's exports.</li>
                  <li><b>Key Functions for the Entrepreneur:</b> The DGFT is the first official point of contact for any new exporter. Its critical functions include:
                    <ol className="list-decimal pl-6 mt-2">
                      <li>Issuing the Importer-Exporter Code (IEC): As detailed earlier, this is the mandatory license to trade internationally.</li>
                      <li>Administering Export Promotion Schemes: The DGFT manages a portfolio of schemes designed to enhance the competitiveness of Indian exports. These include the Export Promotion Capital Goods (EPCG) scheme (which allows duty-free import of capital goods for producing export products) and the Remission of Duties and Taxes on Exported Products (RoDTEP) scheme (which refunds embedded central, state, and local duties/taxes).</li>
                      <li>Policy Clarification: The DGFT issues notifications, public notices, and circulars to clarify and update trade policies.</li>
                    </ol>
                  </li>
                  <li><b>Resource:</b> The official DGFT website (<a href="https://dgft.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://dgft.gov.in</a>) is an indispensable resource, providing access to all services, regulations, and policy updates.</li>
                </ul>
              </li>
              <li><b>The Central Board of Indirect Taxes and Customs (CBIC):</b>
                <ul className="list-disc pl-6 mb-2">
                  <li><b>Role:</b> The CBIC, under the Ministry of Finance, is the apex body responsible for administering India's indirect taxes, including Customs and GST.</li>
                  <li><b>Key Functions for the Entrepreneur:</b> The CBIC's customs wing controls the physical movement of all goods across India's borders. Its key functions include:
                    <ol className="list-decimal pl-6 mt-2">
                      <li>Customs Clearance: Overseeing the entire process of assessing and clearing import and export cargo at all ports, airports, and land customs stations.</li>
                      <li>Managing the ICEGATE Portal: Operating the electronic gateway for all customs filings, including Shipping Bills and Bills of Entry.</li>
                      <li>Implementing Trade Facilitation: Developing and implementing measures to simplify and expedite the clearance process.</li>
                    </ol>
                  </li>
                  <li><b>Resource:</b> The CBIC (<a href="https://cbic-gst.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://cbic-gst.gov.in/</a>) and ICEGATE (<a href="https://www.icegate.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://www.icegate.gov.in/</a>) websites are the primary portals for all customs-related procedures and information.</li>
                </ul>
              </li>
            </ul>

            <h3 id="4-2" className="text-base font-semibold mt-6 mb-2 truncate">4.2 Leveraging Trade Facilitation Initiatives</h3>
            <p>Recognizing that bureaucratic friction is a major impediment to trade, the Indian government, through the CBIC, has launched several trade facilitation initiatives. For a savvy entrepreneur, these are not just conveniences; they are strategic tools to gain a competitive edge by reducing time, cost, and uncertainty.</p>
            <p>A stark contrast exists between the experience of exporters who leverage these programs and those who do not. While some entrepreneurs face a "nightmare" of red tape, crippling compliance costs, and systemic delays, others experience streamlined, predictable, and efficient processes.<sup>47</sup> The difference often lies in the strategic adoption of facilitation measures. The most powerful of these is the <b>Authorized Economic Operator (AEO)</b> program.</p>
            <p>The AEO program is a voluntary partnership between customs and businesses that are compliant and secure. It creates a "green channel" or a trusted trader lane for its members. Instead of being an optional extra, achieving AEO status should be a core strategic goal for any serious, long-term exporter. It is the most effective way to de-risk a business from the operational and financial drag of bureaucratic hurdles.</p>
            <p>The AEO program in India is structured in three tiers for importers and exporters, with increasing levels of benefits:</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>AEO-T1:</b> The entry-level tier, offering basic facilitation benefits.</li>
              <li><b>AEO-T2:</b> A higher tier with more significant benefits.</li>
              <li><b>AEO-T3:</b> The highest tier, reserved for businesses with the most robust compliance and security standards, offering maximum facilitation.</li>
            </ul>
            <p>Key benefits of AEO certification include:</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Faster Customs Clearance:</b> AEO shipments are subject to fewer physical inspections and document checks, leading to significantly reduced clearance times.</li>
              <li><b>Deferred Duty Payment:</b> Eligible AEOs can pay customs duties at a later date, improving cash flow.</li>
              <li><b>Direct Port Delivery (DPD) / Direct Port Entry (DPE):</b> AEO importers can move their containers directly from the port to their factory without waiting for clearance at a Container Freight Station (CFS), and exporters can bring their containers directly into the port terminal.</li>
              <li><b>Waiver of Bank Guarantees:</b> AEO status holders may receive a full or partial waiver of bank guarantee requirements.</li>
              <li><b>Mutual Recognition Agreements (MRAs):</b> India has signed MRAs with several other countries. This means that an Indian AEO is recognized as a trusted trader by the customs authorities of the partner country, receiving facilitation benefits there as well.</li>
            </ul>
            <p>Other important CBIC initiatives include:</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>VEGA (Vision for Expeditious Goods Release on Arrival):</b> An initiative that allows AEO entities to move their import cargo directly to their premises for examination, further speeding up the process.</li>
              <li><b>Ekal Anubandh:</b> A single, electronic, all-India bond that replaces the need to file multiple manual bonds at different customs stations, simplifying compliance for businesses operating across the country.</li>
            </ul>

            <h3 id="4-3" className="text-base font-semibold mt-6 mb-2 truncate">4.3 Your Sector-Specific Allies: The Export Promotion Councils (EPCs)</h3>
            <p>Export Promotion Councils are non-profit organizations, supported by the government, dedicated to promoting the exports of a specific product group. They are the entrepreneur's most important sector-specific allies, providing a bridge between individual businesses and the global market. Registering with the appropriate EPC to obtain an RCMC is a critical step.</p>
            <p>Key functions of EPCs include:</p>
            <ul className="list-disc pl-6 mb-2">
              <li>Providing market intelligence, statistics, and analysis on foreign markets.</li>
              <li>Organizing trade delegations, buyer-seller meets (BSMs), and participation in international trade fairs.</li>
              <li>Assisting members in understanding and accessing government schemes.</li>
              <li>Acting as a single point of contact for resolving trade-related issues and making policy recommendations to the government.</li>
            </ul>
            <p>A comprehensive list of India's EPCs is provided in Appendix B. Some of the most prominent councils for new entrepreneurs include:</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Apparel Export Promotion Council (AEPC):</b> The official body for apparel exporters, providing crucial support in market access, compliance, and navigating global standards.</li>
              <li><b>EEPC India (Engineering Export Promotion Council):</b> A key resource for exporters of engineering goods, from auto components to industrial machinery. It offers a wide range of services, including technology centers, policy guidance, and organizing large-scale events like the International Engineering Sourcing Show (IESS).</li>
              <li><b>Pharmaceuticals Export Promotion Council of India (Pharmexcil):</b> Essential for pharma exporters, Pharmexcil helps members navigate the complex regulatory landscape of global drug markets, facilitates participation in international pharma expos, and assists with schemes like the Market Access Initiative (MAI) for product registration abroad.</li>
            </ul>

            <h3 id="4-4" className="text-base font-semibold mt-6 mb-2 truncate">4.4 Apex Bodies and Industry Associations</h3>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Federation of Indian Export Organisations (FIEO):</b> FIEO is the apex body that coordinates and represents the interests of all EPCs, commodity boards, and export development authorities in India. It plays a crucial role in policy advocacy at the national level. For entrepreneurs, FIEO is a valuable resource for high-level trade information and runs the Indian Business Portal, a B2B digital marketplace designed to connect Indian exporters with foreign buyers, providing a platform to showcase products and generate leads.</li>
              <li><b>Other Industry Associations:</b> Bodies like the Confederation of Indian Industry (CII) and the Federation of Indian Chambers of Commerce & Industry (FICCI) also play a significant role in trade promotion, often collaborating with government agencies to host conferences and advocate for a more business-friendly trade environment.</li>
            </ul>
          </section>
          {/* Part V: Lessons from the Field: Case Studies in Indian Exporting */}
          <section id="part-5" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part V: Lessons from the Field: Case Studies in Indian Exporting</h2>
            <p>Theory, process, and policy provide the map for the export journey, but the real lessons are learned from those who have already traveled the road. This final part brings the playbook to life through real-world examples of Indian companies that have achieved global success, as well as cautionary tales that highlight the critical challenges. These stories offer invaluable, practical wisdom for the aspiring entrepreneur.</p>

            <h3 id="5-1" className="text-base font-semibold mt-6 mb-2 truncate">5.1 Blueprints for Success: In-Depth Case Studies</h3>
            <p>By analyzing the strategies of successful exporters, we can distill actionable lessons that can be applied to a new venture.</p>

            <h4 id="5-1-1" className="font-semibold mt-5 mb-2 truncate">Case Study 1: Vatsal Exports (Textiles) - The Power of Vision and Vertical Integration</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>The Story:</b> Vatsal Exports, an Ahmedabad-based company, demonstrates the power of new-generation entrepreneurship. Founded in 2021, the company achieved a remarkable export turnover of Rs. 221 crore within just three years. The founder, Vatsal Gaudani, leveraged his family's existing investment in a spinning mill to build a vertically integrated textile business, moving from yarn to fabrics and finally to finished garments.</li>
              <li><b>Actionable Lessons:</b>
                <ol className="list-decimal pl-6 mt-2">
                  <li><b>Speed and Aggressive Market Entry:</b> Vatsal Exports did not wait for perfection. Within months of incorporation, it shipped its first containers of cotton yarn to Bangladesh, establishing a key market relationship that quickly led to repeat orders. This highlights the importance of decisive action and building momentum early.</li>
                  <li><b>Leverage Existing Strengths:</b> The company built its export success on the foundation of an existing manufacturing asset (the spinning mill). This provided a crucial cost and quality control advantage. For a new entrepreneur, this means identifying and leveraging any existing asset, be it a manufacturing capability, a unique skill, or a strong network.</li>
                  <li><b>Use Platforms for Global Exposure:</b> The company strategically used major industry events like Bharat Tex 2024 to soft-launch its own menswear brand, 'Future Sage'. This generated a significant number of orders and global visibility, demonstrating the high ROI of participating in targeted trade fairs and exhibitions. </li>
                </ol>
              </li>
            </ul>

            <h4 id="5-1-2" className="font-semibold mt-5 mb-2 truncate">Case Study 2: Technocraft Industries (Engineering) - Dominating a Niche</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>The Story:</b> Founded in 1972 by the Saraf brothers, Technocraft Industries took on a global American monopoly in a highly specialized niche product: screwed closures for steel drums. Through relentless focus and efficiency, they not only competed but emerged as a world leader, exporting to over 40 countries.</li>
              <li><b>Actionable Lessons:</b>
                <ol className="list-decimal pl-6 mt-2">
                  <li><b>The Power of Niche Focus:</b> Instead of competing in a broad, crowded market, Technocraft targeted a specific, high-value component. This allowed them to concentrate their resources and expertise to become the best in the world at one thing.</li>
                  <li><b>Relentless Pursuit of Efficiency:</b> The company's success was built on continuous efficiency gains. This disciplined focus on improving processes and reducing costs is what allowed them to out-compete an established monopolist.</li>
                  <li><b>Strategic Customer Positioning:</b> A key decision was to not manufacture their own drums. By remaining a non-captive supplier of closures, they avoided competing with their own customers. This built trust and allowed them to sell to the entire market, a brilliant strategic move that expanded their customer base globally.</li>
                </ol>
              </li>
            </ul>

            <h4 id="5-1-3" className="font-semibold mt-5 mb-2 truncate">Case Study 3: Royal Enfield (Automotive) - Rebuilding a Global Brand</h4>
            <ul className="list-disc pl-6 mb-2">
              <li><b>The Story:</b> In the early 2000s, Royal Enfield was a struggling legacy brand. Under the leadership of Siddhartha Lal, Eicher Motors transformed it into a global motorcycling phenomenon. The journey involved a hard-nosed business turnaround and a brilliant brand-building exercise.</li>
              <li><b>Actionable Lessons:</b>
                <ol className="list-decimal pl-6 mt-2">
                  <li><b>Product is King:</b> The first step in the revival was a ruthless focus on improving the product. Lal himself famously rode the bikes for hundreds of kilometers to identify and fix quality issues. A bad product, no matter how iconic the brand, cannot sustain success in a competitive market.</li>
                  <li><b>Achieving Economies of Scale:</b> A critical strategic shift was to consolidate production. By deciding to build all Enfield models on a single platform, the company was able to maximize economies of scale in manufacturing, which was essential for profitability. This consolidation led to the launch of the Enfield Classic, which became a massive commercial success.</li>
                  <li><b>Building a Culture, Not Just a Product:</b> Royal Enfield's global success is not just about the motorcycle; it's about the culture of "pure motorcycling" it has cultivated. The company actively fosters a strong community through organized rides, events like Motoverse, and a brand identity that resonates with a desire for authenticity and adventure. This has created a loyal global following that transcends the physical product.</li>
                </ol>
              </li>
            </ul>

            <h3 id="5-2" className="text-base font-semibold mt-6 mb-2 truncate">5.2 The Reality on the Ground: A Cautionary Tale</h3>
            <p>While success stories are inspiring, it is equally important to learn from the challenges faced by others. The well-documented experience of a small-town Indian entrepreneur, shared on Reddit and reported by Business Today, serves as a powerful cautionary tale about the operational realities of exporting from India, particularly for MSMEs.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Crippling Compliance for Small-Value Exports:</b> The mandatory requirements of obtaining an IEC, registering on ICEGATE, getting an AD code, and using licensed couriers felt "nonsensical" and overly burdensome for low-value B2C shipments.</li>
              <li><b>The "Double GST" Trap:</b> When a shipment was rejected by a customer and returned to India, the entrepreneur was forced to pay GST twice: once on the export and again on the return of the same goods, despite earning no revenue from the transaction. This punitive rule highlights a significant financial risk for B2C exporters dealing with returns.</li>
              <li><b>Systemic Integration Failures:</b> The most severe problem arose from a lack of integration between the Customs, GST, and RBI systems. This led to approximately ₹50 lakh worth of his shipping bills remaining "open" in the RBI's records. Closing each bill incurred a fee, totaling a crippling ₹8 lakh—a staggering 16% of his turnover.</li>
              <li><b>Regulatory Unresponsiveness:</b> When he was unable to meet the tight deadline for closing these bills, the RBI marked his account as non-compliant and froze it, effectively shutting down his export business. His repeated appeals to the RBI and even the Commerce Minister's office were met with silence.</li>
            </ul>
            <p>This case is corroborated by broader reports on the challenges facing Indian exporters, which include inadequate infrastructure leading to logistical delays, complex and frequently changing regulations, difficulty in accessing affordable trade finance, and intense global competition.</p>
            <p>The lesson from this cautionary tale is not to abandon the dream of exporting. Rather, it is to enter the arena with eyes wide open. It underscores that operational excellence, meticulous documentation, and a deep understanding of the regulatory landscape are not just best practices—they are essential survival tools. Furthermore, it powerfully reinforces the strategic importance of programs like AEO. The very problems the entrepreneur faced—delays, high compliance costs, and systemic friction—are the exact problems that trade facilitation initiatives are designed to solve.</p>

            <h3 id="5-3" className="text-base font-semibold mt-6 mb-2 truncate">5.3 Strategic Recommendations for the New Indian Exporter</h3>
            <p>Synthesizing the principles, processes, and case studies from this playbook, a set of core strategic recommendations emerges for the new Indian entrepreneur poised to enter the global market:</p>
            <ol className="list-decimal pl-6 mb-2">
              <li><b>Strategize Before You Operate:</b> Do not leave your most critical decisions to chance. Use the data-driven approaches outlined in Part II. Analyze India's Revealed Comparative Advantage (RCA) and current export statistics to select a product where the nation has an inherent strength. Analyze top import destinations to identify a market with proven demand for that product. This strategic alignment is your first and most important step.</li>
              <li><b>Build Your Brand on the "India Opportunity" Narrative:</b> In the current geopolitical climate, you are selling more than a product. You are selling a strategic solution to global supply chain risks. Frame your marketing and sales pitch around the narrative of India as a stable, reliable, and democratic sourcing partner. This elevates your value proposition from being a mere supplier to becoming a strategic partner in building resilient global value chains.</li>
              <li><b>Master the System as a Strategic Defense:</b> The cautionary tale demonstrates that bureaucratic friction is a primary business risk. The antidote is to become an expert in the system. Master the documentation process. Digitize your operations wherever possible. Most importantly, view programs like the Authorized Economic Operator (AEO) scheme not as an option, but as a critical strategic objective. Getting into the "fast lane" of trusted traders is your best defense against the delays and costs of the "slow lane."</li>
              <li><b>Manage Financial and Transit Risk Proactively:</b> Never ship goods without a clear, legally sound sales contract. Carefully analyze the risk-reward tradeoff of different international payment methods and choose one that matches your relationship with the buyer. Always insure your cargo against loss or damage in transit. For higher-risk payment terms like Open Account, use Export Credit Insurance (ECI) to protect your receivables.</li>
              <li><b>Leverage Your Network for Growth and Support:</b> You are not alone. Actively engage with your sector-specific Export Promotion Council (EPC). Use their market intelligence, participate in their buyer-seller meets, and seek their assistance with government schemes. Utilize apex body resources like the FIEO's Indian Business Portal to generate leads and connect with global buyers. This ecosystem is there to support your growth; make it a central part of your business strategy.</li>
            </ol>
            <p>By combining a deep understanding of global trade principles with a mastery of on-the-ground operational realities, the Indian entrepreneur can successfully navigate the complexities of the international market and build a thriving, sustainable export-import business.</p>
          </section>
          {/* Appendix A: Glossary of International Trade Terms */}
          <section id="appendix-a" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Appendix A: Glossary of International Trade Terms</h2>
            <p>This glossary provides definitions for common terms encountered in the export-import business, compiled from multiple authoritative sources.</p>
            <dl className="mb-4">
              <dt className="font-semibold">Ad Valorem Duty</dt>
              <dd className="mb-2">A customs duty charged as a percentage of the value of the imported goods.</dd>
              <dt className="font-semibold">Air Waybill (AWB)</dt>
              <dd className="mb-2">A non-negotiable transport document issued by an airline or air freight forwarder that serves as a contract of carriage and a receipt for the goods.</dd>
              <dt className="font-semibold">Authorized Economic Operator (AEO)</dt>
              <dd className="mb-2">A program under which a business involved in international trade is approved by national customs as compliant with supply chain security standards, granting them trade facilitation benefits.</dd>
              <dt className="font-semibold">Bill of Lading (B/L)</dt>
              <dd className="mb-2">A legal document issued by a carrier (e.g., a shipping line) to a shipper that details the type, quantity, and destination of the goods being carried. It serves as a receipt of shipment, a contract of carriage, and a document of title. A negotiable B/L can be bought, sold, or traded while the goods are in transit.</dd>
              <dt className="font-semibold">Certificate of Origin (COO)</dt>
              <dd className="mb-2">A document that certifies the country in which the goods were produced. It is essential for customs clearance and for claiming preferential tariffs under Free Trade Agreements.</dd>
              <dt className="font-semibold">Commercial Invoice</dt>
              <dd className="mb-2">The final bill for the goods sent by the seller to the buyer. It is a primary document used by customs authorities to determine the value of the goods for assessing duties and taxes.</dd>
              <dt className="font-semibold">Customs Broker</dt>
              <dd className="mb-2">A licensed individual or company that acts as an agent for importers and exporters in clearing goods through customs.</dd>
              <dt className="font-semibold">Customs-Bonded Warehouse</dt>
              <dd className="mb-2">A secure facility where imported dutiable goods may be stored or processed without payment of duty until they are withdrawn for consumption or re-exported.</dd>
              <dt className="font-semibold">Directorate General of Foreign Trade (DGFT)</dt>
              <dd className="mb-2">The agency of the Indian Ministry of Commerce and Industry responsible for administering laws regarding foreign trade and foreign investment in India.</dd>
              <dt className="font-semibold">Documentary Collection (D/C)</dt>
              <dd className="mb-2">A payment method where the exporter's bank sends shipping documents to the importer's bank and instructs them to release the documents to the importer only upon payment (Documents against Payment - D/P) or acceptance of a bill of exchange (Documents against Acceptance - D/A).</dd>
              <dt className="font-semibold">Export Credit Insurance (ECI)</dt>
              <dd className="mb-2">An insurance policy that protects an exporter against the risk of non-payment by a foreign buyer.</dd>
              <dt className="font-semibold">Export Promotion Council (EPC)</dt>
              <dd className="mb-2">An organization, typically sponsored by the government, that is responsible for the promotion of exports for a particular group of products.</dd>
              <dt className="font-semibold">Force Majeure</dt>
              <dd className="mb-2">A clause in a contract that frees both parties from liability or obligation when an extraordinary event or circumstance beyond their control (e.g., war, strike, natural disaster) prevents one or both parties from fulfilling their obligations.</dd>
              <dt className="font-semibold">Freight Forwarder</dt>
              <dd className="mb-2">A company that organizes shipments for individuals or corporations to get goods from the manufacturer or producer to a market, customer or final point of distribution.</dd>
              <dt className="font-semibold">Harmonized System (HS) Code</dt>
              <dd className="mb-2">An internationally standardized system of names and numbers to classify traded products, managed by the World Customs Organization (WCO).</dd>
              <dt className="font-semibold">Incoterms®</dt>
              <dd className="mb-2">A series of pre-defined commercial terms published by the International Chamber of Commerce (ICC) relating to international commercial law. They define the respective obligations, costs, and risks involved in the delivery of goods from the seller to the buyer.</dd>
              <dt className="font-semibold">Importer-Exporter Code (IEC)</dt>
              <dd className="mb-2">A mandatory 10-digit business identification number required for exporting from or importing to India.</dd>
              <dt className="font-semibold">Landed Cost</dt>
              <dd className="mb-2">The total cost of a product once it has arrived at the buyer's door, including the product price, transportation, customs duties, taxes, insurance, and other fees.</dd>
              <dt className="font-semibold">Letter of Credit (L/C)</dt>
              <dd className="mb-2">A letter from a bank guaranteeing that a buyer's payment to a seller will be received on time and for the correct amount. The bank is required to cover the full or remaining amount of the purchase if the buyer is unable to make payment. It is one of the most secure payment methods for exporters.</dd>
              <dt className="font-semibold">Packing List</dt>
              <dd className="mb-2">A document that itemizes the contents of each package in a shipment, including weights, measurements, and markings.</dd>
              <dt className="font-semibold">Proforma Invoice</dt>
              <dd className="mb-2">A preliminary bill of sale sent to buyers in advance of a shipment or delivery of goods. It details the goods to be purchased and the price.</dd>
              <dt className="font-semibold">Registration Cum Membership Certificate (RCMC)</dt>
              <dd className="mb-2">A certificate required by any exporter dealing with restricted goods or any exporter who wants to claim benefits under the Foreign Trade Policy. It is issued by the relevant Export Promotion Council.</dd>
              <dt className="font-semibold">Shipping Bill</dt>
              <dd className="mb-2">The primary document required by Indian customs authorities for an export shipment, filed by the exporter or their agent.</dd>
              <dt className="font-semibold">Tariff</dt>
              <dd className="mb-2">A tax imposed by a government on goods and services imported from other countries.</dd>
            </dl>
          </section>

          {/* Appendix B: Directory of Key Government Bodies, EPCs, and Trade Associations */}
          <section id="appendix-b" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Appendix B: Directory of Key Government Bodies, EPCs, and Trade Associations</h2>
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">Government Bodies</h3>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Directorate General of Foreign Trade (DGFT)</b><br />
                Website: <a href="https://dgft.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://dgft.gov.in</a><br />
                Address: Vanijya Bhawan, 'A' Wing, 16 Akbar Road, New Delhi – 110011<br />
                Role: Policy formulation, IEC issuance, administration of export schemes.
              </li>
              <li><b>Central Board of Indirect Taxes and Customs (CBIC)</b><br />
                Website: <a href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://cbic-gst.gov.in/</a><br />
                Address: North Block, New Delhi, India<br />
                Role: Administration of Customs and GST, oversight of customs clearance.
              </li>
            </ul>
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">Apex Export Body</h3>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Federation of Indian Export Organisations (FIEO)</b><br />
                Website: <a href="https://www.fieo.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://www.fieo.org/</a><br />
                Role: Apex body of all EPCs, policy advocacy, operates the Indian Business Portal.
              </li>
            </ul>
            <h3 className="text-base font-semibold mt-6 mb-2 truncate">Key Export Promotion Councils (Illustrative List)</h3>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Apparel Export Promotion Council (AEPC)</b><br />
                Sector: Apparel and Garments<br />
                Website: <a href="http://www.aepcindia.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">http://www.aepcindia.com</a><br />
                Address: Apparel House, Institutional Area, Sector-44, Gurgaon-122003 Haryana
              </li>
              <li><b>EEPC India (Engineering Export Promotion Council)</b><br />
                Sector: Engineering Goods<br />
                Website: <a href="http://www.eepcindia.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">http://www.eepcindia.org</a><br />
                Address: Vanijya Bhawan, 1st Floor, International Trade Facilitation Centre, 1/1, Wood Street, Kolkata – 700016
              </li>
              <li><b>Pharmaceuticals Export Promotion Council of India (Pharmexcil)</b><br />
                Sector: Pharmaceuticals and Drugs<br />
                Website: <a href="http://www.pharmexcil.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">http://www.pharmexcil.com</a><br />
                Address: 101, Aditya Trade Center, Ameerpet, Hyderabad – 500038
              </li>
              <li><b>Gem and Jewellery Export Promotion Council (GJEPC)</b><br />
                Sector: Gems and Jewellery<br />
                Website: <a href="http://gjepc.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">http://gjepc.org</a><br />
                Address: Diamond Bazar, 5th floor, 391-A, Dr. D. Bhadkamkar Marg, Mumbai-400 004
              </li>
              <li><b>Council for Leather Exports (CLE)</b><br />
                Sector: Leather and Leather Products<br />
                Website: <a href="http://www.leatherindia.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">http://www.leatherindia.org</a><br />
                Address: 3rd floor, CMDA Tower-2, Gandhi Irwin Bridge Road, Egmore, Chennai-600 008
              </li>
              <li><b>The Plastics Export Promotion Council (PLEXCONCIL)</b><br />
                Sector: Plastics<br />
                Website: <a href="http://www.plexconcil.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">http://www.plexconcil.org</a><br />
                Address: Crystal Tower, Ground Floor, Gundivali Road No 3, Off Sir M. V. Road, Andheri (E), Mumbai 400 069
              </li>
              <li><b>Basic Chemicals, Cosmetics and Dyes Export Promotion Council (CHEMEXCIL)</b><br />
                Sector: Basic Chemicals, Dyes, Cosmetics<br />
                Website: <a href="http://www.chemexcil.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">http://www.chemexcil.gov.in</a><br />
                Address: Jhansi Castle, 4th floor, 7-Cooperage Road, Mumbai-400 039
              </li>
              <li><b>The Cotton Textiles Export Promotion Council (TEXPROCIL)</b><br />
                Sector: Cotton Textiles<br />
                Website: (Refer to official Texprocil site for current URL)<br />
                Address: Engineering Centre, 5th Floor, 9 Mathew Road, Mumbai – 400 004
              </li>
              <li><b>Services Export Promotion Council (SEPC)</b><br />
                Sector: Services<br />
                Website: <a href="http://www.servicesepc.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">http://www.servicesepc.org</a><br />
                Address: 509-518, 5th Floor, APPAREL House, Sector-44, Institutional Area, Gurgaon-122003
              </li>
            </ul>
          </section>

          {/* Appendix C: Sample Documents */}
          <section id="appendix-c" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Appendix C: Sample Documents</h2>
            <p className="mb-4">Note: The following are simplified templates for illustrative purposes. Actual documents should be prepared professionally, often using software or templates provided by freight forwarders or customs brokers, and must contain all legally required information.</p>

            {/* Proforma Invoice Template */}
            <div className="mb-8">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <h3 className="text-base font-semibold truncate">Template 1: Proforma Invoice</h3>
              </div>
              <div className="bg-white text-zinc-900 rounded p-6 shadow mb-4">
                <div className="mb-4">
                  <div className="font-bold">PROFORMA INVOICE</div>
                </div>
                <div className="mb-2"><span className="font-semibold">Exporter/Seller:</span> [Your Company Name]<br /><span className="font-semibold">[Your Full Address]</span></div>
                <div className="mb-2"><span className="font-semibold">Proforma Invoice No:</span> PI-001<br /><span className="font-semibold">Date:</span> [Insert Date]</div>
                <div className="mb-2"><span className="font-semibold">Consignee/Buyer:</span> [Buyer's Name & Address]</div>
                <div className="mb-2"><span className="font-semibold">Notify Party (if different from Consignee):</span> [Name and Address]</div>
                <div className="mb-2"><span className="font-semibold">Port of Loading:</span> Mundra, India<br /><span className="font-semibold">Port of Discharge:</span> Hamburg, Germany<br /><span className="font-semibold">Final Destination:</span> [Insert Final Destination]</div>
                <div className="mb-2"><span className="font-semibold">Payment Terms:</span> [Insert Payment Terms]<br /><span className="font-semibold">Delivery Terms (Incoterms 2020):</span> [Insert Delivery Terms]<br /><span className="font-semibold">Expected Shipment Date:</span> [Insert Date]</div>
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full border border-zinc-300 text-sm">
                    <thead>
                      <tr className="bg-zinc-100">
                        <th className="border border-zinc-300 px-2 py-1 font-semibold">Sr. No.</th>
                        <th className="border border-zinc-300 px-2 py-1 font-semibold">Description of Goods</th>
                        <th className="border border-zinc-300 px-2 py-1 font-semibold">HS Code</th>
                        <th className="border border-zinc-300 px-2 py-1 font-semibold">Quantity</th>
                        <th className="border border-zinc-300 px-2 py-1 font-semibold">Unit Price (USD)</th>
                        <th className="border border-zinc-300 px-2 py-1 font-semibold">Total Price (USD)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-zinc-300 px-2 py-1">1</td>
                        <td className="border border-zinc-300 px-2 py-1">[Item Description]</td>
                        <td className="border border-zinc-300 px-2 py-1">6109.10</td>
                        <td className="border border-zinc-300 px-2 py-1">1000 Pcs</td>
                        <td className="border border-zinc-300 px-2 py-1">5.00</td>
                        <td className="border border-zinc-300 px-2 py-1">5,000.00</td>
                      </tr>
                      <tr>
                        <td className="border border-zinc-300 px-2 py-1">2</td>
                        <td className="border border-zinc-300 px-2 py-1">[Item Description]</td>
                        <td className="border border-zinc-300 px-2 py-1">6204.62</td>
                        <td className="border border-zinc-300 px-2 py-1">500 Pcs</td>
                        <td className="border border-zinc-300 px-2 py-1">12.00</td>
                        <td className="border border-zinc-300 px-2 py-1">6,000.00</td>
                      </tr>
                      <tr className="font-semibold">
                        <td className="border border-zinc-300 px-2 py-1 text-right" colSpan={5}>Total</td>
                        <td className="border border-zinc-300 px-2 py-1">11,000.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mb-2"><span className="font-semibold">Total Amount (in words):</span> Eleven Thousand US Dollars Only</div>
                <div className="mb-2 font-semibold">Bank Details for Payment:</div>
                <div className="mb-2">
                  <span className="font-semibold">Bank Name:</span> [Insert Bank Name]<br />
                  <span className="font-semibold">Bank Address:</span> [Insert Bank Address]<br />
                  <span className="font-semibold">Account Name:</span> [Your Company Name]<br />
                  <span className="font-semibold">Account Number:</span> [Insert Account Number]<br />
                  <span className="font-semibold">SWIFT Code:</span> [Insert SWIFT]
                </div>
                <div className="mt-6">For [Your Company Name],<br />
                  <span className="italic">[Authorized Signature & Stamp]</span>
                </div>
              </div>
            </div>

            {/* Commercial Invoice Template */}
            <div className="mb-8">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <h3 className="text-base font-semibold truncate">Template 2: Commercial Invoice</h3>
              </div>
              <div className="bg-white text-zinc-900 rounded p-6 shadow mb-4">
                <div className="mb-4">
                  <div className="font-bold">COMMERCIAL INVOICE</div>
                </div>
                <div className="mb-2"><span className="font-semibold">Exporter/Seller:</span> [Your Company Name]<br /><span className="font-semibold">[Your Full Address]</span></div>
                <div className="mb-2"><span className="font-semibold">Invoice No:</span> INV-001<br /><span className="font-semibold">Date:</span> [Insert Date]<br /><span className="font-semibold">Purchase Order No:</span> [Insert PO Number]</div>
                <div className="mb-2"><span className="font-semibold">Consignee/Buyer:</span> [Buyer's Name & Address]</div>
                <div className="mb-2"><span className="font-semibold">Shipping Bill No:</span> [Insert Bill No]<br /><span className="font-semibold">Date:</span> [Insert Date]<br /><span className="font-semibold">Vessel/Flight No:</span> [Insert No]<br /><span className="font-semibold">Bill of Lading/AWB No:</span> [Insert Number]<br /><span className="font-semibold">Date:</span> [Insert Date]</div>
                <div className="mb-2"><span className="font-semibold">Port of Loading:</span> Mundra, India<br /><span className="font-semibold">Port of Discharge:</span> Hamburg, Germany<br /><span className="font-semibold">Country of Origin:</span> INDIA</div>
                <div className="mb-2"><span className="font-semibold">Payment Terms:</span> Irrevocable Letter of Credit No. XXXXX<br /><span className="font-semibold">Delivery Terms (Incoterms 2020):</span> [Insert Terms]</div>
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full border border-zinc-300 text-sm">
                    <thead>
                      <tr className="bg-zinc-100">
                        <th className="border border-zinc-300 px-2 py-1 font-semibold">Marks & Nos.</th>
                        <th className="border border-zinc-300 px-2 py-1 font-semibold">Description of Goods</th>
                        <th className="border border-zinc-300 px-2 py-1 font-semibold">HS Code</th>
                        <th className="border border-zinc-300 px-2 py-1 font-semibold">Quantity</th>
                        <th className="border border-zinc-300 px-2 py-1 font-semibold">Unit Price (USD)</th>
                        <th className="border border-zinc-300 px-2 py-1 font-semibold">Total Price (USD)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-zinc-300 px-2 py-1">[e.g., C/NO 1-20]</td>
                        <td className="border border-zinc-300 px-2 py-1">[Item Description]</td>
                        <td className="border border-zinc-300 px-2 py-1">6109.10</td>
                        <td className="border border-zinc-300 px-2 py-1">1000 Pcs</td>
                        <td className="border border-zinc-300 px-2 py-1">5.00</td>
                        <td className="border border-zinc-300 px-2 py-1">5,000.00</td>
                      </tr>
                      <tr>
                        <td className="border border-zinc-300 px-2 py-1">[e.g., C/NO 21-30]</td>
                        <td className="border border-zinc-300 px-2 py-1">[Item Description]</td>
                        <td className="border border-zinc-300 px-2 py-1">6204.62</td>
                        <td className="border border-zinc-300 px-2 py-1">500 Pcs</td>
                        <td className="border border-zinc-300 px-2 py-1">12.00</td>
                        <td className="border border-zinc-300 px-2 py-1">6,000.00</td>
                      </tr>
                      <tr className="font-semibold">
                        <td className="border border-zinc-300 px-2 py-1 text-right" colSpan={5}>Total</td>
                        <td className="border border-zinc-300 px-2 py-1">11,000.00</td>
                      </tr>
                      <tr>
                        <td className="border border-zinc-300 px-2 py-1" colSpan={2}><span className="font-semibold">Total Net Weight:</span> [e.g., 500 Kgs]</td>
                        <td className="border border-zinc-300 px-2 py-1" colSpan={2}><span className="font-semibold">Total Gross Weight:</span> [e.g., 550 Kgs]</td>
                        <td className="border border-zinc-300 px-2 py-1" colSpan={2}><span className="font-semibold">Total No. of Packages:</span> [e.g., 30 Cartons]</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mb-2"><span className="font-semibold">Total Invoice Value (in words):</span> Eleven Thousand US Dollars Only</div>
                <div className="mb-2 font-semibold">Declaration:</div>
                <div className="mb-2">We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</div>
                <div className="mt-6">For [Your Company Name],<br />
                  <span className="italic">[Authorized Signature & Stamp]</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Playbook2; 