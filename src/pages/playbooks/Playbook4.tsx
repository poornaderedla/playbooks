import React, { useState, useRef, useEffect } from 'react';
import Playbook4TOC from './tableOfContents/Playbook4TOC';
import { Progress } from '@/components/ui/progress';

// Section IDs for scrollspy and TOC
const sectionIds = [
  'intro',
  'part-1', '1-1', '1-2', '1-3',
  'part-2', '2-1', '2-2', '2-3',
  'part-3', '3-1', '3-2', '3-3', '3-4', '3-5', '3-6',
  'part-4', '4-1', '4-2', '4-3',
  'part-5', '5-1', '5-2', '5-3',
  'part-6', '6-1', '6-2', '6-3',
];

const Playbook4 = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef(null);
  const tocRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Scrollspy logic
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
    document.addEventListener('scroll', handleScroll, true);
    return () => document.removeEventListener('scroll', handleScroll, true);
  }, []);

  // Smooth scroll to section
  const handleTocClick = (id) => {
    setTocOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 mt-4 font-serif">The International Exporter's Playbook: Mastering Product and Pricing Strategy</h1>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 h-[80vh] md:h-[85vh]">
        {/* Sidebar TOC */}
        <aside className="lg:w-1/4 w-full flex-shrink-0 mb-4 lg:mb-0">
          {/* Mobile TOC toggle */}
          <div className="lg:hidden flex justify-between items-center mb-2 sticky top-0 z-20 bg-white border-b border-gray-200" style={{ background: 'white' }}>
            <span className="font-bold text-base truncate">📖 Table of Contents</span>
            <button onClick={() => setTocOpen(!tocOpen)} className="px-3 py-1 rounded bg-primary-100 text-primary-700 font-semibold">{tocOpen ? 'Close' : 'Open'}</button>
          </div>
          <div
            ref={tocRef}
            className={`bg-white rounded-lg shadow p-4 overflow-y-auto max-h-[80vh] hidden lg:block ${tocOpen ? '!block' : ''}`}
            style={{ position: 'relative' }}
          >
            {/* Remove the duplicate heading here */}
            <Playbook4TOC onTocClick={handleTocClick} activeSection={activeSection} />
          </div>
          {/* Mobile TOC drawer */}
          {tocOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-30" onClick={() => setTocOpen(false)} />
          )}
          <div
            className={`lg:hidden fixed top-0 left-0 z-50 w-3/4 max-w-xs h-full bg-white border-r shadow-lg p-4 transition-transform duration-300 ${tocOpen ? 'translate-x-0' : '-translate-x-full'}`}
            style={{ fontFamily: 'Inter, sans-serif', position: 'relative' }}
          >
            <div className="sticky top-0 z-10 bg-white pb-2 border-b border-gray-200 mb-2"><span className="font-bold text-base flex items-center truncate">📖 Table of Contents</span></div>
            <Playbook4TOC onTocClick={handleTocClick} activeSection={activeSection} />
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
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3">Introduction: Beyond the Domestic Market</h2>
            <p>Embarking on an international export journey is a defining moment for any business. It represents a transition from familiar territory to a global arena brimming with opportunity, but also fraught with complexity. Success in this new domain is not merely an extension of a successful domestic strategy; it is a fundamentally different discipline that demands a new mindset, new skills, and a new level of strategic rigor. The assumption that a product or pricing model that triumphs at home will automatically succeed abroad is one of the most common and costly mistakes in international trade.</p>
            <p>The core challenge confronting every exporter lies in a fundamental tension: balancing the operational efficiency and brand consistency of a standardized global approach against the absolute necessity of deep, local adaptation. This is the art of "glocalization"—thinking globally while acting locally. A "one-size-fits-all" strategy rarely survives contact with the diverse tapestry of global markets, where cultural nuances, legal mandates, and economic realities can vary dramatically from one border to the next. A failure to navigate this tension is not a matter of bad luck; it is a predictable outcome of inadequate preparation. The history of international business is littered with the failures of powerful companies that underestimated the importance of local context. This reveals a crucial lesson: companies from large domestic markets must be especially vigilant against their own inherent biases. Their domestic success model should be treated as a hypothesis to be tested, not a template to be imposed. Therefore, this initial stage of market and competitor analysis is not merely a box-ticking exercise; it is the single most important risk mitigation activity an exporter can undertake.</p>
            <p>This playbook is designed to serve as a comprehensive, one-stop reference for the ambitious exporter. It provides a strategic and operational roadmap, guiding businesses through the critical pillars of profitable exporting. We will begin by laying the essential groundwork of strategic market and competitor analysis, the foundation upon which all successful export ventures are built. From there, we will delve into the nuanced art of product adaptation, exploring how to modify products to win the hearts of local consumers while satisfying the non-negotiable demands of regulators. The subsequent sections will demystify the complexities of export pricing, offering a comparative guide to various strategies and the intricate mechanics of cost calculation. Finally, the playbook addresses the critical financial and legal risks, from managing foreign exchange volatility to navigating the complex web of international trade laws. Furnished with detailed case studies, practical checklists, and expert guidance, this playbook equips businesses with the knowledge to not just enter foreign markets, but to thrive in them.</p>
          </section>

          {/* Part 1: Strategic Market and Competitor Analysis */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3">Part 1: The Foundation: Strategic Market and Competitor Analysis</h2>
            <h3 className="text-lg font-semibold mb-2">Introduction</h3>
            <p>Before a single product is modified or a price is set, the foundational work of strategic market and competitor analysis must be undertaken. This is not a preliminary step to be rushed or overlooked; it is the most critical phase of the entire export journey. Decisions made in a vacuum, without a deep and nuanced understanding of the target market's environment, are the primary cause of costly and entirely avoidable export failures. The analysis of the market and its competitive landscape provides the essential data that informs every subsequent decision in this playbook, transforming exporting from a high-risk gamble into a calculated, strategic expansion.</p>

            <h4 className="font-semibold mt-6 mb-2">1.1 Frameworks for Strategic Market Selection</h4>
            <p>Choosing where to export is the first major strategic decision. A systematic approach is required to filter the entire globe down to a handful of high-potential markets. A PESTLE analysis is an indispensable tool for this first-pass screening, providing a macro-environmental view of a country's opportunities and risks.</p>
            <h5 className="font-semibold mt-4 mb-1">PESTLE Analysis as a First-Pass Filter</h5>
            <p>PESTLE is an acronym for Political, Economic, Social, Technological, Legal, and Environmental. This framework compels a business to look beyond its product and consider the broader forces that will shape its success or failure in a new market. For a prospective exporter, conducting a thorough PESTLE analysis helps determine if a market is potentially profitable, understand the business environment, identify future threats, and develop a proactive, long-term strategy.</p>
            <h5 className="font-semibold mt-4 mb-1">Detailed Breakdown of PESTLE Factors for Exporters</h5>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Political:</b> These factors assess the role and stability of the government, which directly impacts business operations. Key considerations include the country's political stability, its foreign trade policy and any trade restrictions, the tax regime, labor laws, and the prevalence of corruption or organized crime. An unstable political environment can turn a profitable market into a liability overnight.</li>
              <li><b>Economic:</b> Economic factors determine a market's overall attractiveness and the purchasing power of its consumers. Exporters must analyze the stability of the economy, economic growth rates, interest and exchange rates, inflation, and the level of disposable income available to consumers. This data is fundamental for forecasting demand and setting viable price points.</li>
              <li><b>Social:</b> Also known as socio-cultural factors, this dimension is arguably the most critical for assessing product-market fit. It involves analyzing population growth and demographics, consumer habits and values, career attitudes, and levels of health and education. A failure to understand these nuances is a recurring theme in major export failures. For example, Home Depot's failure in China stemmed from misjudging the social context; they tried to sell a "Do-It-Yourself" (DIY) product ethos to a culture where "Do-It-For-Me" (DIFM) was the norm due to affordable labor costs. Similarly, Starbucks struggled in Australia because it failed to appreciate the country's existing, sophisticated coffee culture, which was fundamentally different from the American model it sought to export.</li>
              <li><b>Technological:</b> The technological landscape affects how products are made, distributed, marketed, and consumed. Analysis should cover the state of the country's technological infrastructure, government investment in R&D, and the rate of technological adoption and change. This can reveal opportunities for high-tech products or challenges related to logistics and communication.</li>
              <li><b>Legal:</b> This is a non-negotiable area of analysis. Legal factors include consumer rights laws, product safety standards, advertising standards, and, critically, product labeling requirements. These laws are not suggestions; they are hard barriers to entry. Failure to comply will result in shipments being rejected, fines, or outright bans, as will be detailed in Part 2.</li>
              <li><b>Environmental/Ethical:</b> These factors are of growing importance to global consumers and regulators. They include a country's environmental regulations, pollution targets, and the increasing scarcity of raw materials. Furthermore, ethical considerations such as fair trade, attitudes toward child labor, and corporate social responsibility (CSR) can significantly impact brand perception and consumer loyalty.</li>
            </ul>
            <p>The output of a PESTLE analysis provides a rich picture of the external forces at play. This macro-level understanding of opportunities and threats can then be used to conduct a more focused SWOT (Strengths, Weaknesses, Opportunities, Threats) analysis, which evaluates the company's specific product-market fit within that environment.</p>

            <h4 className="font-semibold mt-6 mb-2">1.2 Deep-Dive Competitor Analysis: Knowing Your Battlefield</h4>
            <p>Once a potential market has been identified, the focus must shift to the competitive landscape. It is impossible to craft a winning pricing or positioning strategy without an intimate knowledge of the other players on the field.</p>
            <h5 className="font-semibold mt-4 mb-1">Identifying Competitor Tiers</h5>
            <p>A common mistake is to only focus on the most obvious, direct competitors. A thorough analysis must encompass a full spectrum of rivals:</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Local Champions:</b> Domestic companies that have a deep understanding of the local market, established distribution networks, and strong customer loyalty. Underestimating these players was a key factor in Walmart's failure in Germany. This is a classic case of a powerful company failing to do its homework. In Germany, Walmart's "everyday low prices" strategy backfired. German consumers were accustomed to deep discounters like Aldi and Lidl and perceived Walmart's pricing as neither exceptionally low nor indicative of quality. The company also ran afoul of German labor laws and cultural norms, such as its policy of mandatory smiling for employees, which was seen as insincere. In Japan, the failure was even more profound. Walmart failed to grasp that Japanese consumers prioritize freshness and locally sourced food over the convenience of a one-stop-shop. The low-price strategy was associated with cheap quality, and consumers continued their "treasure hunt" for deals across multiple smaller stores. Walmart fundamentally misread the entire retail culture in both countries.</li>
              <li><b>Starbucks in Australia & Israel:</b> Starbucks entered Australia with a rapid expansion plan, assuming its brand power would be enough to conquer the market. It failed to recognize that Australia already had a mature, sophisticated, and fiercely independent coffee culture. Local cafes served higher-quality espresso, and consumers found Starbucks' sweeter, larger drinks unappealing and overpriced. Similarly, in Israel, the market was too small and the local coffee preference was for stronger, slowly savored coffee, a style incompatible with Starbucks' fast-paced, standardized model. In both cases, Starbucks offered a solution to a problem that did not exist.</li>
              <li><b>Home Depot in China:</b> This failure highlights the danger of exporting a cultural concept along with a product. Home Depot's entire business model is built on the American "Do-It-Yourself" (DIY) ethos. They entered China assuming this concept would translate, but found that Chinese consumers, due to lower labor costs and often a lack of space for tools and workshops, overwhelmingly preferred a "Do-It-For-Me" (DIFM) approach, hiring inexpensive local contractors to do home improvement work. This was a failure of brand positioning and cultural understanding. Mattel invested $30 million in a massive, six-story flagship store in Shanghai before the Barbie brand had any significant cultural resonance in China. Worse, they marketed Barbie using Western ideals of being "sexy, smart, and fashionable," which did not align with traditional Chinese views of femininity. The store was overpriced, and the brand failed to connect, leading to its closure after just two years.</li>
            </ul>

            <h4 className="font-semibold mt-6 mb-2">2.3 The Regulatory Gauntlet: A Regional Compliance Guide</h4>
            <p>Navigating the web of international regulations is a critical, non-negotiable aspect of product adaptation. The following is a high-level guide to the requirements in key export markets. This is not a substitute for specific legal advice.</p>
            <h5 className="font-semibold mt-4 mb-1">The European Union (EU)</h5>
            <p>The EU operates a highly harmonized but stringent regulatory environment. The overarching principle is that all information provided to the consumer must be clear, easily visible, legible (with minimum font sizes), indelible, and presented in the official language(s) of the member state where the product is sold.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Food & Beverages:</b> Governed by the Food Information to Consumers (FIC) Regulation (EU 1169/2011). Key mandatory requirements on labels include:
                <ul className="list-disc pl-6">
                  <li>A full list of ingredients.</li>
                  <li>Allergen Information: Any of the 14 specified allergens (e.g., gluten, nuts, milk, soy) must be clearly emphasized in the ingredients list, for example, by using a bold or italic font.</li>
                  <li>Nutrition Declaration: A standardized table showing energy value (in kJ and kcal) and amounts of fat, saturates, carbohydrates, sugars, protein, and salt per 100g or 100ml.</li>
                  <li>Date of Minimum Durability ("Best before") or "Use by" date.</li>
                  <li>Voluntary health or nutrition claims (e.g., "low fat," "high in fiber") are permitted but are strictly regulated and must be scientifically substantiated.</li>
                </ul>
              </li>
              <li><b>Electronics, Toys, and General Goods:</b>
                <ul className="list-disc pl-6">
                  <li>CE Marking: This is not a quality mark, but a mandatory declaration by the manufacturer that the product meets all applicable EU safety, health, and environmental protection requirements. It is required for a wide range of products, including electronics, toys, machinery, and personal protective equipment. Affixing the CE mark without ensuring compliance can lead to severe penalties.</li>
                  <li>WEEE Mark: The "crossed-out wheelie bin" symbol is mandatory on all electrical and electronic equipment, indicating it should not be disposed of in regular waste and is subject to separate collection for recycling.</li>
                  <li>Traceability: Products must be labeled with the manufacturer's or importer's name and address, and a type, batch, or serial number to allow for traceability in case of a recall.</li>
                </ul>
              </li>
              <li><b>Other Categories:</b>
                <ul className="list-disc pl-6">
                  <li>Textiles: Must be labeled with their fiber composition (e.g., "100% Cotton").</li>
                  <li>Footwear: Must have a label or pictogram indicating the materials used for the upper, lining/sock, and outer sole.</li>
                  <li>Cosmetics: Regulated by the Cosmetic Products Regulation, which requires detailed labeling of ingredients, function, and responsible person information.</li>
                </ul>
              </li>
            </ul>
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Regulatory Aspect</th>
                    <th className="border px-2 py-1">European Union (EU)</th>
                    <th className="border px-2 py-1">United States (USA)</th>
                    <th className="border px-2 py-1">Canada</th>
                    <th className="border px-2 py-1">Japan</th>
                    <th className="border px-2 py-1">South Korea</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border px-2 py-1">Mandatory Language</td><td className="border px-2 py-1">Official language(s) of the member state of sale</td><td className="border px-2 py-1">English</td><td className="border px-2 py-1">English and French (bilingual)</td><td className="border px-2 py-1">Japanese</td><td className="border px-2 py-1">Korean</td></tr>
                  <tr><td className="border px-2 py-1">Key Compliance Mark</td><td className="border px-2 py-1">CE Marking (for applicable products)</td><td className="border px-2 py-1">Varies by product (e.g., FCC for electronics, FDA approval for drugs)</td><td className="border px-2 py-1">Varies by product (e.g., Health Canada approval)</td><td className="border px-2 py-1">Varies by product (e.g., PSE mark for electronics)</td><td className="border px-2 py-1">KC Mark (Korea Certification)</td></tr>
                  <tr><td className="border px-2 py-1">Food/Nutrition Info</td><td className="border px-2 py-1">Mandatory, standardized nutrition panel per FIC Regulation</td><td className="border px-2 py-1">Mandatory Nutrition Facts label per FDA rules</td><td className="border px-2 py-1">Mandatory Nutrition Facts table per Health Canada rules</td><td className="border px-2 py-1">Mandatory nutrition labeling for most processed foods</td><td className="border px-2 py-1">Mandatory nutrition labeling</td></tr>
                  <tr><td className="border px-2 py-1">Allergen Labeling</td><td className="border px-2 py-1">Must be emphasized in ingredients list (e.g., bold)</td><td className="border px-2 py-1">Top 9 allergens must be declared per FALCPA</td><td className="border px-2 py-1">Priority allergens must be declared</td><td className="border px-2 py-1">Mandatory labeling for specific allergens</td><td className="border px-2 py-1">Mandatory labeling for specific allergens</td></tr>
                  <tr><td className="border px-2 py-1">Traceability Info</td><td className="border px-2 py-1">Manufacturer/importer name & address, batch/serial number required</td><td className="border px-2 py-1">Required under MoCRA for cosmetics; standard for many other goods</td><td className="border px-2 py-1">Required; contact info for responsible party needed</td><td className="border px-2 py-1">Importer's contact details required for some goods</td><td className="border px-2 py-1">Mark of Origin ("Made In") is compulsory</td></tr>
                  <tr><td className="border px-2 py-1">Cosmetics Rules</td><td className="border px-2 py-1">Detailed ingredient/function labeling under Cosmetic Products Regulation</td><td className="border px-2 py-1">MoCRA: Mandatory FDA facility registration & product listing</td><td className="border px-2 py-1">Pre-market Cosmetic Notification Form (CNF) required; Ingredient Hotlist</td><td className="border px-2 py-1">Regulated by Pharmaceutical and Medical Device Act</td><td className="border px-2 py-1">Regulated by Ministry of Food and Drug Safety</td></tr>
                </tbody>
              </table>
            </div>
            {/* North America (USA & Canada) and Key Asian Markets (Japan & South Korea) details */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">North America (USA &amp; Canada)</h4>
              <p>While the U.S. and Canada are close trading partners, their regulatory systems have key differences. A crucial distinction is in their philosophical approach: Health Canada often employs a pre-market authorization or licensing system, whereas the U.S. FDA has historically relied more on post-market surveillance and enforcement, though this is changing.</p>
              <ul className="list-disc pl-6 mb-2">
                <li><b>Pharmaceuticals (Good Manufacturing Practices - GMP):</b> Both the FDA and Health Canada align with international standards like ICH Q7. However, their frameworks differ. The FDA's rules are in Title 21 of the Code of Federal Regulations (CFR), while Canada's are in its Food and Drug Regulations. A key difference is that Health Canada requires a Drug Establishment License (DEL) before operations can begin, while FDA compliance is part of the overall drug approval process. The FDA also tends to inspect more frequently and places a heavy emphasis on electronic data integrity under 21 CFR Part 11.</li>
                <li><b>Cosmetics:</b> This category highlights significant divergence.
                  <ul className="list-disc pl-6">
                    <li><b>Canada:</b> Requires mandatory bilingual (English and French) labeling. Before a product can be sold, a Cosmetic Notification Form (CNF) must be submitted to Health Canada. Canada also maintains a "Cosmetic Ingredient Hotlist" of prohibited or restricted substances that manufacturers must adhere to.</li>
                    <li><b>USA:</b> The regulatory landscape has been transformed by the Modernization of Cosmetics Regulation Act of 2022 (MoCRA). This act made FDA facility registration and product listing mandatory for cosmetic companies, a major shift from the previous voluntary system. MoCRA also mandates safety substantiation for all products and will require fragrance allergen disclosures.</li>
                  </ul>
                </li>
              </ul>
              <h4 className="font-semibold mb-2 mt-6">Key Asian Markets (Japan &amp; South Korea)</h4>
              <ul className="list-disc pl-6 mb-2">
                <li><b>Japan:</b> The key to importing many consumer goods into Japan is understanding the distinction between regulated and non-regulated products. While items like electronics and cosmetics are heavily regulated, many other household goods are not. However, even "non-regulated" products may fall under the Household Goods Quality Labeling Act, which mandates clear labeling of materials, performance, and usage instructions to protect consumers. For any company exporting to Japan without a local legal entity, appointing an Attorney for Customs Procedure (ACP) is mandatory. The ACP acts as the importer of record and is responsible for ensuring compliance.</li>
                <li><b>South Korea:</b> Known for its stringent import regulations. All product labeling must be in the Korean language. A "Made In" mark of origin is compulsory. Exporters must be acutely aware of the long list of prohibited and restricted items, which includes many agricultural products (meat, dairy, certain fruits), animal products, and any kind of weapon or replica. Importing prohibited items can lead to immediate seizure and severe penalties.</li>
              </ul>
            </div>
          </section>

          {/* Part 3: Mastering Export Pricing: A Comparative Strategy Guide */}
          <section id="part-3" className="mb-10">
            <h2 className="text-xl font-bold mb-3">Part 3: Mastering Export Pricing: A Comparative Strategy Guide</h2>
            <h3 className="text-lg font-semibold mb-2">Introduction</h3>
            <p>Setting the right price for an export product is one of the most complex and consequential decisions an exporter will face. It is a delicate balancing act that must reconcile the need to cover all costs, remain competitive in a foreign marketplace, and achieve a target profit margin. The final price is not a single number but the outcome of a strategic process influenced by a multitude of factors: production costs, international logistics, import duties, competitor actions, perceived market demand, and the ever-present risk of currency fluctuations.</p>
            <p>A common and dangerous mistake is the "cost-plus domestic" approach, where a company simply takes its domestic price and adds a generic margin for export. This lazy pricing method completely ignores the unique realities of the target market and is a recipe for failure. It can either price the product out of the market entirely or, conversely, price it too low, leaving significant profit unrealized. This section presents a strategic toolkit of pricing models, moving from simple cost-based methods to sophisticated value-based approaches, enabling the exporter to choose the right strategy for the right product in the right market.</p>

            <h4 id="3-1" className="font-semibold mt-6 mb-2">3.1 The Five Pillars of Export Pricing: A Comparative Overview</h4>
            <p>There is no single "best" pricing strategy. The optimal choice depends on the company's objectives, the nature of the product, the competitive intensity of the market, and the product's life cycle stage. The following five strategies represent the core models available to an exporter.</p>
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Strategy</th>
                    <th className="border px-2 py-1">Core Objective</th>
                    <th className="border px-2 py-1">Ideal Market Conditions</th>
                    <th className="border px-2 py-1">Key Advantages</th>
                    <th className="border px-2 py-1">Critical Disadvantages/Risks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border px-2 py-1">Cost-Plus Pricing</td><td className="border px-2 py-1">Ensure a fixed profit margin over all costs.</td><td className="border px-2 py-1">Low competition; custom manufacturing; government contracts.</td><td className="border px-2 py-1">Simple to calculate; guarantees cost recovery and a predictable margin.</td><td className="border px-2 py-1">Ignores market demand, competition, and customer value perception; can lead to uncompetitive pricing.</td></tr>
                  <tr><td className="border px-2 py-1">Competitive Pricing</td><td className="border px-2 py-1">Gain market entry and maintain parity with rivals.</td><td className="border px-2 py-1">Highly competitive, mature markets with established price points.</td><td className="border px-2 py-1">Practical for new entrants; prevents being priced out of the market.</td><td className="border px-2 py-1">Can lead to price wars; profit margins may be thin; ignores own brand value.</td></tr>
                  <tr><td className="border px-2 py-1">Penetration Pricing</td><td className="border px-2 py-1">Rapidly capture a large market share.</td><td className="border px-2 py-1">Price-sensitive markets; products with potential for high volume and repeat purchase.</td><td className="border px-2 py-1">Builds customer base and brand awareness quickly; creates economies of scale.</td><td className="border px-2 py-1">Sacrifices initial profits; risks creating a low-quality perception; attracts disloyal customers.</td></tr>
                  <tr><td className="border px-2 py-1">Price Skimming</td><td className="border px-2 py-1">Maximize revenue from early adopters and recoup R&D costs.</td><td className="border px-2 py-1">New, innovative, or luxury products with little to no initial competition.</td><td className="border px-2 py-1">High initial profit margins; creates a premium brand image; segments the market effectively.</td><td className="border px-2 py-1">Alienates early adopters when price drops; attracts competitors; only for truly unique products.</td></tr>
                  <tr><td className="border px-2 py-1">Value-Based Pricing</td><td className="border px-2 py-1">Capture the maximum price a customer is willing to pay.</td><td className="border px-2 py-1">Markets where value, quality, and brand are key differentiators.</td><td className="border px-2 py-1">Maximizes profitability; strengthens brand positioning; aligns price with customer value.</td><td className="border px-2 py-1">Requires extensive market research; can be difficult to quantify the value of intangible benefits.</td></tr>
                </tbody>
              </table>
            </div>

            <h4 id="3-2" className="font-semibold mt-6 mb-2">3.2 Cost-Plus Pricing: The Foundation</h4>
            <p>This is the most straightforward pricing method, often serving as a starting point for analysis.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Mechanics:</b> The exporter calculates the total cost of producing and delivering the product to the point of sale (the landed cost, detailed in Part 4) and then adds a fixed percentage markup for profit. The formula is simple: Selling Price = Total Landed Cost + (Total Landed Cost × Markup Percentage).</li>
              <li><b>Pros:</b> Its primary advantage is its simplicity and the assurance that all costs are covered, leading to a predictable profit on every unit sold. It provides a clear floor price below which the business would incur a loss.</li>
              <li><b>Cons:</b> The fundamental weakness of cost-plus pricing is its internal focus. It is completely divorced from the external realities of the market—what customers are willing to pay and what competitors are charging. A price that seems logical from a cost perspective may be wildly uncompetitive or, alternatively, far below what the market would bear, leaving substantial profits on the table.</li>
              <li><b>Real-World Application:</b> This method is most appropriate in situations where market feedback is minimal or irrelevant. It is common for government contracts and large-scale custom manufacturing projects (e.g., defense contractors like Lockheed Martin, aerospace firms like Boeing) where the price is negotiated based on detailed cost breakdowns. It is also used by some retailers for private-label goods where maintaining a specific margin over wholesale cost is the primary goal.</li>
            </ul>

            <h4 id="3-3" className="font-semibold mt-6 mb-2">3.3 Competitive Pricing: The Market Follower</h4>
            <p>This strategy shifts the focus from internal costs to the external competitive environment.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Mechanics:</b> The exporter researches the prices of key competitors in the target market and sets their own price to be in line with, or slightly below, those competitors.</li>
              <li><b>Pros:</b> It is a pragmatic and relatively safe approach for a new entrant looking to gain a foothold without making a major pricing mistake. It anchors the product's price to an established market expectation, reducing the risk of being perceived as too expensive.</li>
              <li><b>Cons:</b> This strategy is inherently reactive, not proactive. It cedes price leadership to competitors and can easily devolve into a "race to the bottom" price war, eroding margins for everyone in the industry. It is only a viable strategy if the exporter's cost structure is low enough to support a healthy profit margin at the prevailing market price. Furthermore, it completely ignores the unique value proposition the exporter's own product might offer.</li>
              <li><b>Real-World Application:</b> Competitive pricing is prevalent in industries with high competition and relatively undifferentiated products, such as airlines (Delta, United) which constantly adjust fares based on each other's routes, and ride-sharing apps (Uber, Lyft). It is also common in commoditized markets for raw materials like grains or minerals, where price is the primary purchasing factor.</li>
            </ul>

            <h4 id="3-4" className="font-semibold mt-6 mb-2">3.4 Penetration Pricing: The Market Grab</h4>
            <p>This is an aggressive, offensive strategy designed for rapid market conquest.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Mechanics:</b> The exporter deliberately sets a very low price upon entering a new market. The objective is not immediate profitability but to attract a large volume of customers quickly, build brand awareness, and capture a significant market share. The intention is to raise the price later, once a loyal customer base has been established and competitors have been marginalized.</li>
              <li><b>Pros:</b> When successful, it can be a powerful way to disrupt an established market. The high sales volume can lead to economies of scale in production and distribution, lowering unit costs over time. It can also create a significant barrier to entry for future competitors.</li>
              <li><b>Cons:</b> This strategy is fraught with risk. It requires sacrificing profits (or even incurring losses) in the short term, which requires significant financial backing. It risks attracting only price-sensitive "bargain hunters" who will abandon the brand as soon as prices rise. It can also create a brand image of being "cheap" or low-quality, which can be difficult to shake later. In some cases, if the price is below the home market value, it can be perceived as "dumping" and trigger legal action (see Part 5).</li>
              <li><b>Real-World Application:</b> This strategy has been famously employed by digital subscription services. Netflix and Disney+ have both entered new international markets with extremely low introductory subscription prices to rapidly build a massive user base before gradually increasing prices. It is also common for smartphone brands using the Android operating system, which compete on price to penetrate markets dominated by premium brands like Apple, and for ride-sharing services like Uber when launching in new cities.</li>
            </ul>

            <h4 id="3-5" className="font-semibold mt-6 mb-2">3.5 Price Skimming: The Innovator's Reward</h4>
            <p>Price skimming is the strategic opposite of penetration pricing. It is a strategy for products that are new, unique, and highly desirable.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Mechanics:</b> The exporter launches a new and innovative product at a high premium price. This price is targeted at "early adopters"—customers who are less price-sensitive and willing to pay more to be the first to own the latest technology or luxury item. Over time, as the initial demand is satisfied and competitors begin to emerge, the price is gradually lowered in stages to appeal to subsequent, more price-sensitive layers of the market.</li>
              <li><b>Pros:</b> This strategy maximizes revenue by extracting the highest possible price from each segment of the market. The high initial margins help to quickly recoup significant research and development (R&D) costs. It also helps to create and reinforce a premium, high-quality, and exclusive brand image.</li>
              <li><b>Cons:</b> Price skimming is only suitable for products with a genuine, defensible competitive advantage, such as unique technology or a powerful brand. The high profits can act as a beacon, attracting competitors into the market more quickly. A significant risk is alienating the loyal early adopters, who may feel cheated when they see the product they paid a premium for being sold for much less a few months later. Apple famously faced this backlash with the first iPhone and was forced to offer store credits to early buyers.</li>
              <li><b>Real-World Application:</b> Price skimming is the classic pricing strategy for the technology and consumer electronics industries. Apple has masterfully executed this with every iPhone launch, pricing the newest models at a premium while continuing to sell previous generations at lower price points. Sony (PlayStation) and Microsoft (Xbox) use the same model for their new gaming consoles. Tesla's entire business strategy was a form of price skimming, starting with the expensive, low-volume Roadster to fund the development of the high-end Model S, which in turn funded the mass-market Model 3.</li>
            </ul>

            <h4 id="3-6" className="font-semibold mt-6 mb-2">3.6 Value-Based Pricing: The Customer-Centric Approach</h4>
            <p>This is the most strategically advanced and potentially most profitable pricing method. It fundamentally shifts the starting point of the pricing conversation from "What did this cost us?" to "What is this worth to our customer?"</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Mechanics:</b> Instead of starting with costs and adding a markup, value-based pricing starts with an intensive analysis of the customer and the market. The price is set according to the product's perceived value in the eyes of the target customer segment.</li>
              <li><b>The True Economic Value (TEV) Formula:</b> A core concept in value-based pricing is True Economic Value, or TEV. It provides a logical framework for quantifying value. The formula is:<br /><span className="font-mono">TEV = Cost of the Next-Best Alternative + Value of Performance Differential</span></li>
              <li>This means a customer should be willing to pay the price of their current best option, plus an additional amount equal to the monetized value of whatever makes your product better (e.g., saves them time, increases their revenue, provides better quality, offers superior service).</li>
              <li><b>Implementation Steps:</b>
                <ol className="list-decimal pl-6">
                  <li>Deeply Understand and Segment Your Target Market: Identify the specific customer segment you are targeting. Different segments will perceive value differently.</li>
                  <li>Identify the Next-Best Alternative: Through competitor analysis, determine the product or solution your target customer would use if your product didn't exist. Find its price.</li>
                  <li>Identify Your Performance Differential: What makes your product unique and superior? Is it faster, more durable, easier to use? Does it come with better technical support or a longer warranty?.</li>
                  <li>Quantify the Value of Your Differential: This is the most challenging step. It requires research, including customer interviews and surveys, to translate your superior performance into a monetary value. How much is an extra year of warranty worth to the customer? How much money does your more efficient machine save them in labor costs per year?.</li>
                  <li>Set Your Price: The sum of the alternative's price and the value of your differential gives you the TEV, which represents the logical ceiling for your price. The final price will be set at or below this ceiling, based on your strategic goals.</li>
                </ol>
              </li>
              <li><b>Pros:</b> This approach directly links price to the value delivered, allowing a company to capture the maximum price a customer is willing to pay, leading to higher profitability. It also strengthens brand positioning by forcing the company to articulate and prove its superior value, moving the sales conversation away from price and towards benefits.</li>
              <li><b>Cons:</b> It is the most research-intensive of all strategies. It requires a profound understanding of customer needs, their economics, and their perception of value. Quantifying the value of intangible benefits like "peace of mind" or "brand prestige" can be difficult and subjective.</li>
              <li><b>Real-World Application:</b> Value-based pricing is the default strategy for luxury brands like Louis Vuitton, whose prices have little to do with the cost of leather and everything to do with the perceived value of exclusivity, craftsmanship, and status. It is also widely used in B2B sales, particularly for industrial equipment or software (like Salesforce) where the product's value can be directly linked to the customer's increased revenue or cost savings.</li>
            </ul>
            <p>The choice of a pricing strategy is not a simple menu selection; it is a reflection of a company's entire business model. An analysis of successful companies reveals that their pricing strategy is deeply integrated with their product's nature and their core strategic goals. Apple, a company built on a cycle of high-cost R&D and continuous innovation, must use price skimming to fund its next breakthrough. Netflix, a business built on achieving massive scale and recurring subscription revenue, must use penetration pricing to acquire users as quickly as possible in new markets. The pricing strategy does not exist in isolation; it is the logical monetary expression of the company's fundamental reason for being. Therefore, an exporter should not ask, "Which pricing strategy should I pick?" but rather, "What is my core business model, and what is my primary objective in this market?" The answer to that question will illuminate the most logical and sustainable pricing path.</p>
          </section>

          {/* Part 4: The Mechanics: Calculating Your Price and Managing Financial Risk */}
          <section id="part-4" className="mb-10">
            <h2 className="text-xl font-bold mb-3">Part 4: The Mechanics: Calculating Your Price and Managing Financial Risk</h2>
            <h3 className="text-lg font-semibold mb-2">Introduction</h3>
            <p>Transitioning from high-level pricing strategy to practical implementation requires a mastery of the essential arithmetic of exporting. A brilliant strategy is worthless if the underlying cost calculations are flawed. A single overlooked expense in the long and complex journey from factory to foreign customer can silently erase a product's entire profit margin. This section provides a step-by-step guide to the two most critical calculations in export pricing: determining the full landed cost of the product and managing the financial risks associated with foreign currency transactions.</p>

            <h4 id="4-1" className="font-semibold mt-6 mb-2">4.1 Calculating Your Landed Cost: A Step-by-Step Guide</h4>
            <p>The landed cost is the total cost of a product on its journey from the exporter's factory door to the importer's warehouse door. It is the true cost of the export sale, and its accurate calculation is the bedrock of determining profitability.</p>
            <h5 className="font-semibold mt-4 mb-2">The Role of Incoterms® 2020</h5>
            <p>It is impossible to calculate a landed cost without first understanding Incoterms®. Published by the International Chamber of Commerce (ICC), Incoterms® are a set of 11 internationally recognized rules that define the responsibilities of sellers and buyers for the delivery of goods under sales contracts. Crucially, they specify the exact point in the journey where the transfer of cost, risk, and responsibility for tasks like customs clearance passes from the seller to the buyer.</p>
            <p>A common misconception is that Incoterms are merely logistical jargon. In reality, they are a strategic pricing and customer relationship tool. While a term like Ex Works (EXW) minimizes the seller's risk, offering terms like Delivered Duty Paid (DDP) can be a powerful competitive advantage. For a smaller or less experienced buyer, a DDP price provides certainty and simplicity, as it includes all costs to their door. This "hassle-free" service is a form of value that can justify a higher price and win business over a competitor offering a seemingly cheaper but more complex Free on Board (FOB) price. The choice of Incoterm should therefore be a conscious strategic decision based on an analysis of the target customer's needs and sophistication.</p>

            <h5 className="font-semibold mt-4 mb-2">A Sequential Cost Buildup (with Incoterms®)</h5>
            <p>Calculating the landed cost is best done as a sequential buildup of expenses. Each step corresponds to a stage in the logistics chain and is governed by a specific Incoterm®.</p>
            <ol className="list-decimal pl-6 mb-2">
              <li><b>Step 1: Ex-Works (EXW) Price</b><br />
                <ul className="list-disc pl-6">
                  <li><b>Definition:</b> This is the base cost of the product, packaged and ready for pickup at the seller's factory or warehouse. It includes the cost of goods sold (COGS) and the exporter's initial profit margin.</li>
                  <li><b>Incoterm® EXW:</b> This term represents the seller's minimum obligation. The buyer is responsible for all costs and risks from the moment the goods are made available at the seller's premises, including loading them onto the truck.</li>
                </ul>
              </li>
              <li><b>Step 2: Free on Board (FOB) Price</b><br />
                <ul className="list-disc pl-6">
                  <li><b>Definition:</b> To get from the EXW price to the FOB price, the exporter adds all the costs required to transport the goods from the factory and load them "on board" the vessel at the designated port of export.</li>
                  <li><b>Cost Components:</b>
                    <ul className="list-disc pl-6">
                      <li>Export-quality packaging</li>
                      <li>Inland transportation (trucking or rail) from the factory to the port of export</li>
                      <li>Origin terminal handling charges (THC)</li>
                      <li>Export documentation fees</li>
                      <li>Customs clearance fees at the port of origin</li>
                    </ul>
                  </li>
                  <li><b>Incoterm® FOB:</b> This is a very common term for sea freight. The seller's responsibility for cost and risk ends once the goods are loaded on board the ship nominated by the buyer. The buyer is responsible for the main international sea freight and all subsequent costs. (Note: For containerized cargo, the more appropriate term is often FCA - Free Carrier, where responsibility transfers when the goods are handed over to the carrier at a named place, such as a container terminal).</li>
                </ul>
              </li>
              <li><b>Step 3: Cost, Insurance, and Freight (CIF) Price</b><br />
                <ul className="list-disc pl-6">
                  <li><b>Definition:</b> To calculate the CIF price, the exporter adds the costs of international sea freight and marine insurance to the FOB price.</li>
                  <li><b>Cost Components:</b>
                    <ul className="list-disc pl-6">
                      <li>FOB Price (all costs from Step 2)</li>
                      <li>International Sea Freight cost</li>
                      <li>Marine Insurance premium</li>
                    </ul>
                  </li>
                  <li><b>Incoterm® CIF:</b> Under this term, the seller arranges and pays for the freight and insurance to the named port of destination. However, it is critical to understand that the risk of loss or damage transfers from the seller to the buyer once the goods are loaded on board the vessel at the port of origin, just like with FOB. The insurance purchased by the seller is for the buyer's benefit.</li>
                </ul>
              </li>
              <li><b>Step 4: Delivered Duty Paid (DDP) Price / Final Landed Cost</b><br />
                <ul className="list-disc pl-6">
                  <li><b>Definition:</b> This represents the total cost of the goods delivered to the buyer's final destination, with all duties and taxes paid. It is the final landed cost from the buyer's perspective.</li>
                  <li><b>Cost Components:</b>
                    <ul className="list-disc pl-6">
                      <li>CIF Price (all costs from Step 3)</li>
                      <li>Destination terminal handling charges (THC)</li>
                      <li>Customs brokerage fees at the destination port</li>
                      <li>Import Duties and Taxes (e.g., VAT, GST)</li>
                      <li>Inland transportation from the destination port to the buyer's warehouse or final address</li>
                    </ul>
                  </li>
                  <li><b>Incoterm® DDP:</b> This term represents the seller's maximum obligation. The seller is responsible for all costs and risks associated with delivering the goods to the named destination, cleared for import and ready for unloading.</li>
                </ul>
              </li>
            </ol>

            <div className="overflow-x-auto my-4">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Cost / Risk Component</th>
                    <th className="border px-2 py-1">EXW (Ex Works)</th>
                    <th className="border px-2 py-1">FOB (Free on Board)</th>
                    <th className="border px-2 py-1">CIF (Cost, Insurance, Freight)</th>
                    <th className="border px-2 py-1">DDP (Delivered Duty Paid)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border px-2 py-1">Product &amp; Export Packaging</td><td className="border px-2 py-1">Seller</td><td className="border px-2 py-1">Seller</td><td className="border px-2 py-1">Seller</td><td className="border px-2 py-1">Seller</td></tr>
                  <tr><td className="border px-2 py-1">Loading at Origin</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Seller</td><td className="border px-2 py-1">Seller</td><td className="border px-2 py-1">Seller</td></tr>
                  <tr><td className="border px-2 py-1">Inland Transport to Port of Export</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Seller</td><td className="border px-2 py-1">Seller</td><td className="border px-2 py-1">Seller</td></tr>
                  <tr><td className="border px-2 py-1">Export Customs Clearance &amp; Duties</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Seller</td><td className="border px-2 py-1">Seller</td><td className="border px-2 py-1">Seller</td></tr>
                  <tr><td className="border px-2 py-1">Origin Port Terminal Charges</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Seller</td><td className="border px-2 py-1">Seller</td><td className="border px-2 py-1">Seller</td></tr>
                  <tr><td className="border px-2 py-1">Loading onto Vessel</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Seller</td><td className="border px-2 py-1">Seller</td><td className="border px-2 py-1">Seller</td></tr>
                  <tr><td className="border px-2 py-1">International Freight</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Seller</td><td className="border px-2 py-1">Seller</td></tr>
                  <tr><td className="border px-2 py-1">International Insurance</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Seller</td><td className="border px-2 py-1">Seller</td></tr>
                  <tr><td className="border px-2 py-1">Risk Transfer Point</td><td className="border px-2 py-1">At Seller's Premises</td><td className="border px-2 py-1">On Board Vessel</td><td className="border px-2 py-1">On Board Vessel</td><td className="border px-2 py-1">At Destination Address</td></tr>
                  <tr><td className="border px-2 py-1">Destination Port Terminal Charges</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Seller</td></tr>
                  <tr><td className="border px-2 py-1">Import Customs Clearance</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Seller</td></tr>
                  <tr><td className="border px-2 py-1">Import Duties &amp; Taxes</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Seller</td></tr>
                  <tr><td className="border px-2 py-1">Inland Transport to Final Destination</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Buyer</td><td className="border px-2 py-1">Seller</td></tr>
                </tbody>
              </table>
            </div>

            <h5 className="font-semibold mt-4 mb-2">Example Landed Cost Calculation</h5>
            <p>Let's calculate the landed cost per unit for a shipment of 100 custom widgets from a U.S. exporter to a buyer in the UK.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Product Details:</b>
                <ul className="list-disc pl-6">
                  <li>Quantity: 100 units</li>
                  <li>Ex-Works (EXW) Price per unit: $50</li>
                  <li>Total EXW Value: $5,000</li>
                </ul>
              </li>
              <li><b>Origin Costs (to get to FOB):</b>
                <ul className="list-disc pl-6">
                  <li>Inland freight to Port of New York: $400</li>
                  <li>Export customs clearance &amp; documentation: $150</li>
                  <li>Origin terminal handling: $200</li>
                  <li>Total Origin Costs: $750</li>
                  <li>FOB Price: $5,000 + $750 = $5,750</li>
                </ul>
              </li>
              <li><b>International Transit Costs (to get to CIF):</b>
                <ul className="list-disc pl-6">
                  <li>International sea freight (New York to London): $1,200</li>
                  <li>Marine insurance: $50</li>
                  <li>Total Transit Costs: $1,250</li>
                  <li>CIF Price: $5,750 + $1,250 = $7,000</li>
                </ul>
              </li>
              <li><b>Destination Costs (to get to DDP / Landed Cost):</b>
                <ul className="list-disc pl-6">
                  <li>UK Import Duty (assume 5% of CIF value): $7,000 × 0.05 = $350</li>
                  <li>UK VAT (assume 20% of (CIF value + Duty)): ($7,000 + $350) × 0.20 = $1,470</li>
                  <li>Destination customs brokerage: $250</li>
                  <li>Destination terminal handling: $300</li>
                  <li>Inland freight to buyer's warehouse in Manchester: $500</li>
                  <li>Total Destination Costs: $350 + $1,470 + $250 + $300 + $500 = $2,870</li>
                </ul>
              </li>
              <li><b>Final Landed Cost (DDP):</b>
                <ul className="list-disc pl-6">
                  <li>Total Landed Cost: $7,000 (CIF) + $2,870 = $9,870</li>
                  <li>Landed Cost Per Unit: $9,870 / 100 units = $98.70 per widget</li>
                </ul>
              </li>
            </ul>
            <p>This calculation shows that the initial $50 widget actually costs the buyer $98.70 to get to their door. The exporter must have this full cost visibility to set a profitable price and negotiate effectively.</p>

            <h4 id="4-2" className="font-semibold mt-6 mb-2">4.2 Understanding the Distribution Channel: Factoring in Margins</h4>
            <p>The landed cost is the cost to the importer, not the final price to the end consumer. To determine a realistic retail price, the exporter must account for the profit margins required by every intermediary in the distribution channel, such as the importer, wholesaler, and retailer.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>The Value Chain:</b> Each intermediary adds value (e.g., by providing storage, marketing, sales support) and must earn a margin to cover their costs and make a profit. These margins are layered on top of the landed cost.</li>
              <li><b>Typical Margins by Industry:</b> Margins vary significantly by industry, product type, and who is responsible for marketing costs. An exporter must research the standard margins in their specific sector and target market.</li>
            </ul>
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Product Category / Industry</th>
                    <th className="border px-2 py-1">Typical Distributor Margin</th>
                    <th className="border px-2 py-1">Typical Retailer Margin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border px-2 py-1">Fast-Moving Consumer Goods (FMCG)</td><td className="border px-2 py-1">3% – 10%</td><td className="border px-2 py-1">8% – 40%</td></tr>
                  <tr><td className="border px-2 py-1">Clothing &amp; Apparel</td><td className="border px-2 py-1">15% – 30%</td><td className="border px-2 py-1">20% – 50%</td></tr>
                  <tr><td className="border px-2 py-1">Consumer Electronics (e.g., mobile phones)</td><td className="border px-2 py-1">3% – 7%</td><td className="border px-2 py-1">3% – 7%</td></tr>
                  <tr><td className="border px-2 py-1">Furniture</td><td className="border px-2 py-1">N/A (Often direct to retailer)</td><td className="border px-2 py-1">30% – 50%</td></tr>
                  <tr><td className="border px-2 py-1">Jewelry</td><td className="border px-2 py-1">N/A (Often direct to retailer)</td><td className="border px-2 py-1">30% – 60%</td></tr>
                  <tr><td className="border px-2 py-1">Electrical Equipment &amp; Lighting</td><td className="border px-2 py-1">5% – 7%</td><td className="border px-2 py-1">15% – 25%</td></tr>
                </tbody>
              </table>
            </div>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Working Backwards from Retail Price:</b> This "reverse costing" approach is essential for a value-based pricing strategy. The process is as follows:
                <ol className="list-decimal pl-6">
                  <li>Determine the target retail price in the foreign market through competitor and consumer research.</li>
                  <li>Subtract the retailer's margin.</li>
                  <li>Subtract the distributor's/importer's margin.</li>
                  <li>Subtract all destination and transit costs (duties, freight, insurance).</li>
                  <li>The resulting price is the required "ex-factory" or FOB price.</li>
                  <li>The exporter must then determine if this final price is sufficient to cover their own production costs and generate an acceptable profit. If not, the product-market combination may not be viable at that target retail price.</li>
                </ol>
              </li>
            </ul>

            <h4 id="4-3" className="font-semibold mt-6 mb-2">4.3 Managing Foreign Exchange (Forex) Risk</h4>
            <p>A significant and often underestimated risk in international trade is foreign exchange (Forex) risk. If an exporter invoices in a foreign currency, fluctuations in the exchange rate between the time a deal is struck and the time payment is received can dramatically impact profitability.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Defining Transaction Risk:</b> This is the specific risk that the value of a future payment in a foreign currency will decrease when converted back to the exporter's home currency due to adverse exchange rate movements.</li>
              <li><b>Simple Mitigation Strategies:</b>
                <ul className="list-disc pl-6">
                  <li><b>Invoice in Home Currency:</b> The simplest method is to insist on payment in your own currency (e.g., U.S. Dollars). This transfers 100% of the Forex risk to the buyer. While safe for the exporter, it may make the offer less attractive to buyers who prefer the price certainty of paying in their local currency.</li>
                  <li><b>Leading and Lagging Payments:</b> This is an active speculation strategy. An exporter might try to accelerate ("lead") a payment if they expect the foreign currency to weaken, or delay ("lag") a payment if they expect it to strengthen. This is a high-risk strategy that amounts to currency trading and is not recommended for most exporters.</li>
                </ul>
              </li>
              <li><b>A Comparative Guide to Hedging Instruments:</b> Hedging is the practice of using financial instruments to reduce or eliminate Forex risk. The two most common tools for exporters are forward contracts and currency options.</li>
            </ul>
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr>
                    <th className="border px-2 py-1">Attribute</th>
                    <th className="border px-2 py-1">Forward Exchange Contract (FEC)</th>
                    <th className="border px-2 py-1">Currency Option</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border px-2 py-1">Cost</td><td className="border px-2 py-1">No upfront cost. The cost is embedded in the forward exchange rate offered by the bank.</td><td className="border px-2 py-1">An upfront, non-refundable premium must be paid to purchase the option.</td></tr>
                  <tr><td className="border px-2 py-1">Obligation</td><td className="border px-2 py-1">Obligatory. The contract must be executed on the future date at the agreed rate, regardless of the spot rate.</td><td className="border px-2 py-1">Flexible. The buyer has the right, but not the obligation, to execute the contract. It can be left to expire if unused.</td></tr>
                  <tr><td className="border px-2 py-1">Risk Profile</td><td className="border px-2 py-1">Eliminates all risk (and all potential gain). Locks in a specific exchange rate, providing absolute certainty of the final converted amount.</td><td className="border px-2 py-1">Eliminates downside risk while retaining upside potential. Protects against adverse rate movements but allows participation in favorable ones.</td></tr>
                  <tr><td className="border px-2 py-1">Best Use Case</td><td className="border px-2 py-1">Certain Cash Flows. Ideal for hedging confirmed sales orders where the payment amount and date are known with certainty.</td><td className="border px-2 py-1">Uncertain Cash Flows. Ideal for hedging contingent exposures, like bidding on a contract or forecasting future sales, where the final transaction is not guaranteed.</td></tr>
                </tbody>
              </table>
            </div>
            <p>In essence, a Forward Contract is like buying a non-refundable, fixed-price airline ticket for a future date. You know exactly what you will pay, but you must take the flight. A Currency Option is like buying the right to purchase that ticket at a fixed price. You pay a fee for that right, and if a cheaper flight becomes available, you can abandon your right and buy the cheaper ticket, losing only the fee you paid for the option. The choice between them depends entirely on the exporter's certainty about the future transaction.</p>
          </section>

          {/* Part 5: Navigating the Global Legal Landscape of Pricing */}
          <section id="part-5" className="mb-10">
            <h2 className="text-xl font-bold mb-3">Part 5: Navigating the Global Legal Landscape of Pricing</h2>
            <h3 className="text-lg font-semibold mb-2">Introduction</h3>
            <p>An exporter's pricing strategy is not formulated in a commercial vacuum. It is subject to a complex framework of international and national laws designed to ensure fair competition and prevent trade distortions. These rules create legal boundaries around pricing decisions, establishing a "price floor" to prevent destructive practices and an "internal rulebook" to stop tax avoidance. Ignoring these legal constraints can transform a promising export venture into a legal and financial nightmare, resulting in punitive tariffs, hefty fines, and lasting damage to a company's reputation.</p>

            <h4 id="5-1" className="font-semibold mt-6 mb-2">5.1 Anti-Dumping and Countervailing Duties: The Price Floor</h4>
            <p>One of the most significant legal constraints on export pricing comes from anti-dumping regulations, which are recognized and governed by the World Trade Organization (WTO).</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>What is Dumping?</b> In the simplest terms, dumping occurs when a company exports a product to a foreign market at a price that is lower than the "normal value" of that product in its own home market. This practice can be particularly damaging to the industries of the importing country, as it can be difficult for them to compete with artificially low-priced imports. This is a critical legal consideration for any company contemplating an aggressive competitive or penetration pricing strategy.</li>
              <li><b>The WTO Framework:</b> The WTO's Agreement on Anti-Dumping does not prohibit dumping itself. Instead, it regulates how member governments can react to it. A government is permitted to take action against dumping if it can prove, through a rigorous investigation, that three conditions are met:
                <ol className="list-decimal pl-6">
                  <li>Dumping is occurring.</li>
                  <li>The domestic industry in the importing country is suffering "material injury" (or is threatened with it).</li>
                  <li>There is a causal link between the dumped imports and the injury to the domestic industry.</li>
                </ol>
              </li>
              <li><b>The Investigation Process:</b> A government cannot unilaterally impose duties. It must follow a detailed and transparent process, typically initiated by a written application from the affected domestic industry. This application must contain evidence of dumping, injury, and the causal link. The investigating authorities must then conduct a thorough investigation, giving all interested parties (including the foreign exporters) an opportunity to present evidence and defend their interests.</li>
              <li><b>The Consequence: Anti-Dumping Duties:</b> If the investigation confirms dumping and injury, the importing country's government has the right to impose an anti-dumping duty on the imported product. This is a special tariff, calculated to bridge the gap between the export price and the "normal value," effectively raising the price of the imported good to a "fair" level. These duties can be substantial, sometimes exceeding 100% of the product's value, and are designed to remain in force as long as necessary to counteract the injurious dumping.</li>
            </ul>

            <h4 id="5-2" className="font-semibold mt-6 mb-2">5.2 Predatory Pricing: The Intent to Harm</h4>
            <p>While anti-dumping laws govern "fair trade" between nations, predatory pricing laws govern "fair competition" within a market. Predatory pricing is a more specific and aggressive anti-competitive practice.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>Defining Predatory Pricing:</b> This is the practice whereby a dominant firm deliberately sets its prices at a loss-making level (i.e., below its own costs) for a temporary period. The specific intent is not just to compete, but to eliminate competitors from the market. Once the competition has been driven out, the predator plans to raise its prices to monopoly levels to recoup its earlier losses and exploit its newfound market power.</li>
              <li><b>The EU Example (Article 102 TFEU):</b> The European Union has one of the most developed legal frameworks for identifying predatory pricing, under Article 102 of the Treaty on the Functioning of the European Union (TFEU), which prohibits the abuse of a dominant market position. The European courts have established a sophisticated cost-based test, often referred to as the AKZO Test, to determine if pricing is predatory:
                <ul className="list-disc pl-6">
                  <li><b>Prices below Average Variable Costs (AVC):</b> If a dominant firm prices its products below its average variable costs (the costs that vary with production, like materials and direct labor), the pricing is presumed to be predatory. The logic is that there is no economic rationale for such a price other than to eliminate a competitor.</li>
                  <li><b>Prices above AVC but below Average Total Costs (ATC):</b> If the price is above variable costs but still below total costs (which include fixed costs like rent and overhead), it is not automatically considered predatory. However, it will be deemed an abuse if it can be shown that this pricing is part of a plan with the specific intent to eliminate a competitor.</li>
                </ul>
              </li>
              <li><b>Key Takeaway for Exporters:</b> The critical lesson is that while aggressive pricing is a normal part of competition, pricing below your own variable costs in a market where you hold a strong or dominant position is extremely risky. It can trigger a predatory pricing investigation, which focuses on your intent and the structure of your costs, and can lead to massive fines.</li>
            </ul>

            <h4 id="5-3" className="font-semibold mt-6 mb-2">5.3 Transfer Pricing: The Internal Rulebook</h4>
            <p>As an export business grows and begins to establish overseas subsidiaries, distributors, or related entities, a third set of pricing rules comes into play: transfer pricing.</p>
            <ul className="list-disc pl-6 mb-2">
              <li><b>What is Transfer Pricing?</b> Transfer pricing refers to the prices set for the trade of goods, services, or intangible assets between related legal entities within the same multinational enterprise. For example, it is the price at which a U.S. parent company sells its goods to its own UK distribution subsidiary.</li>
              <li><b>The OECD's "Arm's Length Principle":</b> The global standard for transfer pricing is the Arm's Length Principle, championed by the Organisation for Economic Co-operation and Development (OECD). This principle is simple in concept but complex in application: the price for a transaction between two related parties should be the same as the price would have been if the transaction had occurred between two completely independent, unrelated companies under similar circumstances.</li>
              <li><b>Why it Matters for Exporters:</b> Tax authorities around the world use the Arm's Length Principle to ensure that multinational companies are not using transfer prices to artificially shift profits from high-tax countries to low-tax countries, thereby eroding the tax base. An exporter with a foreign subsidiary must have a clearly documented and defensible transfer pricing policy that demonstrates its internal prices are "at arm's length." This often involves using one of several OECD-approved methods (such as the Comparable Uncontrolled Price (CUP) method, Resale Price Method, or Cost Plus Method) to justify the prices charged to its related entities. Failure to do so can result in significant tax reassessments, penalties, and double taxation.</li>
            </ul>
            <p>These three legal frameworks—Anti-Dumping, Predatory Pricing, and Transfer Pricing—are not independent issues but rather form an interconnected "legal triangle" that defines the boundaries of an exporter's pricing freedom. Anti-dumping and predatory pricing laws establish a price floor, preventing prices from being set at a destructively low level. Transfer pricing rules govern internal consistency, ensuring prices are not artificially manipulated for tax purposes. An exporter's pricing strategy must therefore be stress-tested against all three risks simultaneously. A proposed export price must be commercially viable, competitively positioned, and, crucially, legally defensible on all three fronts.</p>
          </section>

          {/* Part 6: The Exporter's Toolkit: Checklists, Templates, and Resources */}
          <section id="part-6" className="mb-10">
            <h2 className="text-xl font-bold mb-3">Part 6: The Exporter's Toolkit: Checklists, Templates, and Resources</h2>
            <h3 className="text-lg font-semibold mb-2">Introduction</h3>
            <p>Knowledge and strategy are the foundation of export success, but practical tools are required to put them into action. This final part of the playbook provides a toolkit of actionable checklists, essential document templates, and a curated list of resources. These tools are designed to help the user implement the principles discussed throughout this guide, transforming complex processes into manageable, step-by-step workflows.</p>

            <h4 id="6-1" className="font-semibold mt-6 mb-2">6.1 Actionable Checklists</h4>
            <p>Checklists are powerful tools for ensuring that no critical step is missed in the complex process of exporting.</p>

            <h5 className="font-semibold mt-4 mb-2">Export Readiness Assessment Checklist</h5>
            <p>Before committing significant resources, a company should conduct an honest internal assessment. This checklist helps evaluate readiness.</p>
            <ul className="list-none pl-0 mb-4">
              <li className="font-semibold">Management and Personnel:</li>
              <li className="pl-6">[ ] Is there a firm commitment from senior management to dedicate the necessary time, personnel, and financial resources to exporting?</li>
              <li className="pl-6">[ ] Is there an individual or team designated to lead the export initiative?</li>
              <li className="pl-6">[ ] Does the company have personnel with experience in international trade, or is there a plan to acquire this expertise (e.g., through training or hiring)?</li>
              <li className="font-semibold mt-2">Product and Production:</li>
              <li className="pl-6">[ ] Has the company identified which specific products are suitable for export?</li>
              <li className="pl-6">[ ] Does the company have sufficient production capacity to fill both domestic and potential export orders without compromising delivery times?</li>
              <li className="pl-6">[ ] Is the product's quality and consistency high enough to compete in international markets?</li>
              <li className="font-semibold mt-2">Financial Capacity:</li>
              <li className="pl-6">[ ] Has the company allocated a budget for the initial costs of exporting (e.g., market research, travel, product adaptation, marketing)?</li>
              <li className="pl-6">[ ] Does the company have a clear understanding of its financing needs for export sales (e.g., working capital to cover longer payment cycles)?</li>
              <li className="pl-6">[ ] Has the company explored export financing options (e.g., SBA loans, EXIM Bank guarantees)?</li>
            </ul>

            <h5 className="font-semibold mt-4 mb-2">Product Adaptation Checklist</h5>
            <p>For each target market, use this checklist to systematically analyze adaptation needs.</p>
            <ul className="list-none pl-0 mb-4">
              <li className="font-semibold">Cultural Adaptation:</li>
              <li className="pl-6">[ ] Product Name: Has the product name been checked for negative or unintended connotations in the local language?</li>
              <li className="pl-6">[ ] Color and Design: Do the product's colors and overall design align with local aesthetic preferences and cultural norms?</li>
              <li className="pl-6">[ ] Features: Are all product features relevant and useful to the target consumer? Are there any features that need to be added or removed?</li>
              <li className="pl-6">[ ] Packaging Size/Format: Is the standard package size appropriate for local purchasing habits and affordability? (e.g., smaller sizes for single-serving cultures or lower-income markets).</li>
              <li className="pl-6">[ ] Local Tastes: For food products, has the flavor profile been tested and adjusted for local palates?</li>
              <li className="font-semibold mt-2">Regulatory Compliance Adaptation:</li>
              <li className="pl-6">[ ] Labeling Language: Is all text on the packaging and label translated into the mandatory language(s) of the target market?</li>
              <li className="pl-6">[ ] Compliance Marks: Does the product require a specific compliance mark (e.g., CE mark in the EU, KC mark in South Korea)? Have the necessary testing and certification been completed?</li>
              <li className="pl-6">[ ] Ingredient/Material Compliance: Do all ingredients (for food/cosmetics) or materials (for general goods) comply with the target market's list of permitted and prohibited substances?</li>
              <li className="pl-6">[ ] Nutritional/Content Labeling: Does the label meet the specific format and content requirements for nutritional information (food), fiber content (textiles), or material composition (footwear)?</li>
              <li className="pl-6">[ ] Traceability: Does the product and/or packaging include the required traceability information (e.g., manufacturer/importer name and address, batch number)?</li>
            </ul>

            <h5 className="font-semibold mt-4 mb-2">Export Pricing & Landed Cost Checklist</h5>
            <p>This workflow ensures all costs are captured when building your price.</p>
            <ul className="list-none pl-0 mb-4">
              <li className="font-semibold">Cost Calculation:</li>
              <li className="pl-6">[ ] Step 1: Calculate Ex-Works (EXW) Cost: Determine the full cost of the product ready at the factory door (COGS + overhead + initial margin).</li>
              <li className="pl-6">[ ] Step 2: Calculate Origin Costs: Add all costs to get the product to the port of export (inland freight, export packing, origin port charges, export customs clearance). This gives you the FOB/FCA value.</li>
              <li className="pl-6">[ ] Step 3: Calculate International Transit Costs: Add the cost of international freight (sea or air) and marine/cargo insurance. This gives you the CIF/CIP value.</li>
              <li className="pl-6">[ ] Step 4: Calculate Destination Costs: Research and add all costs that will be incurred in the destination country (import duties, taxes/VAT, customs brokerage fees, destination port charges, final inland delivery).</li>
              <li className="pl-6">[ ] Step 5: Calculate Total Landed Cost: Sum all costs from Steps 1-4 to arrive at the final landed cost per unit.</li>
              <li className="font-semibold mt-2">Pricing and Margin Analysis:</li>
              <li className="pl-6">[ ] Step 6: Research Channel Margins: Determine the standard distributor and retailer margins for your product category in the target market.</li>
              <li className="pl-6">[ ] Step 7: Set Target Retail Price: Based on competitor analysis and value perception, establish a target end-consumer price.</li>
              <li className="pl-6">[ ] Step 8: Perform Reverse Costing: Work backwards from the target retail price, subtracting channel margins and all landed cost components to arrive at the required net price for your company.</li>
              <li className="pl-6">[ ] Step 9: Assess Profitability: Does the required net price from Step 8 provide an acceptable profit margin for your business? If not, the pricing strategy or the market itself may need to be reconsidered.</li>
            </ul>

            <h4 id="6-2" className="font-semibold mt-6 mb-2">6.2 Essential Templates</h4>
            <p>Having standardized templates for key export documents is crucial for efficiency and consistency.</p>

            <h5 className="font-semibold mt-4 mb-2">Commercial Invoice Template</h5>
            <p>The commercial invoice is the primary legal document used by customs authorities to assess duties and taxes. While there is no single universal format, a compliant invoice must contain specific information. Below is a table-based template for clarity and ease of use.</p>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border text-xs mb-2">
                <tbody>
                  <tr>
                    <td className="border px-2 py-1 font-semibold">Shipper/Exporter (Your Company)</td>
                    <td className="border px-2 py-1">Invoice No.: [Invoice Number]</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">[Your Company Name]</td>
                    <td className="border px-2 py-1">Invoice Date: [Date]</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">Order No.: [Customer PO Number]</td>
                    <td className="border px-2 py-1"></td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">[Your Country]</td>
                    <td className="border px-2 py-1"></td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">[Your Contact Name, Phone, Email]</td>
                    <td className="border px-2 py-1"></td>
                  </tr>
                </tbody>
              </table>
              <table className="min-w-full border text-xs mb-2">
                <tbody>
                  <tr>
                    <td className="border px-2 py-1 font-semibold">Consignee/Importer (Buyer)</td>
                    <td className="border px-2 py-1 font-semibold">Ship To (If Different)</td>
                  </tr>
                  <tr><td className="border px-2 py-1"></td><td className="border px-2 py-1"></td></tr>
                  <tr><td className="border px-2 py-1"></td><td className="border px-2 py-1"></td></tr>
                  <tr><td className="border px-2 py-1"></td><td className="border px-2 py-1"></td></tr>
                  <tr><td className="border px-2 py-1"></td><td className="border px-2 py-1"></td></tr>
                </tbody>
              </table>
              <table className="min-w-full border text-xs mb-2">
                <tbody>
                  <tr><td className="border px-2 py-1 font-semibold" colSpan={2}>Shipping Information</td></tr>
                  <tr><td className="border px-2 py-1">Incoterms® 2020:</td><td className="border px-2 py-1"></td></tr>
                  <tr><td className="border px-2 py-1">Reason for Export:</td><td className="border px-2 py-1"></td></tr>
                  <tr><td className="border px-2 py-1">Port of Loading:</td><td className="border px-2 py-1"></td></tr>
                  <tr><td className="border px-2 py-1">Port of Discharge:</td><td className="border px-2 py-1"></td></tr>
                  <tr><td className="border px-2 py-1">Vessel/Flight No.:</td><td className="border px-2 py-1">[Vessel/Flight Information]</td></tr>
                  <tr><td className="border px-2 py-1">Final Destination:</td><td className="border px-2 py-1">[City, Country]</td></tr>
                </tbody>
              </table>
              <table className="min-w-full border text-xs mb-2">
                <tbody>
                  <tr><td className="border px-2 py-1 font-semibold" colSpan={2}>Product Details</td></tr>
                  <tr><td className="border px-2 py-1">HS Code</td><td className="border px-2 py-1"></td></tr>
                  <tr><td className="border px-2 py-1"></td><td className="border px-2 py-1"></td></tr>
                  <tr><td className="border px-2 py-1"></td><td className="border px-2 py-1"></td></tr>
                </tbody>
              </table>
              <table className="min-w-full border text-xs mb-2">
                <tbody>
                  <tr><td className="border px-2 py-1 font-semibold" colSpan={2}>Totals</td></tr>
                  <tr><td className="border px-2 py-1">Subtotal:</td><td className="border px-2 py-1"></td></tr>
                  <tr><td className="border px-2 py-1">Freight Charges:</td><td className="border px-2 py-1"></td></tr>
                  <tr><td className="border px-2 py-1">Insurance:</td><td className="border px-2 py-1"></td></tr>
                  <tr><td className="border px-2 py-1">Other Charges:</td><td className="border px-2 py-1"></td></tr>
                  <tr><td className="border px-2 py-1 font-semibold">TOTAL INVOICE VALUE:</td><td className="border px-2 py-1"></td></tr>
                </tbody>
              </table>
              <div className="border rounded p-3 text-xs bg-gray-50">
                <div className="mb-2 font-semibold">Declaration:</div>
                <div className="mb-2">I hereby certify that the information on this invoice is true and correct and that the contents of this shipment are as stated above.</div>
                <div>Signature: _________________________</div>
                <div>Name: [Your Name]</div>
                <div>Title: </div>
                <div>Date: </div>
              </div>
            </div>

            <h5 className="font-semibold mt-4 mb-2">Bill of Lading (B/L) and Certificate of Origin (COO) - Structural Guide</h5>
            <ul className="list-disc pl-6 mb-4">
              <li><b>Bill of Lading (B/L):</b> This document is issued by a carrier (or their agent) to acknowledge receipt of cargo for shipment. It serves three main purposes: it is a receipt for the goods, it is evidence of the contract of carriage, and it is a document of title to the goods. Key information includes shipper and consignee details, ports of loading and discharge, vessel name, description of goods (weight, volume, markings), and freight details.</li>
              <li><b>Certificate of Origin (COO):</b> This is a declaration that certifies the country in which the goods were manufactured. It is often required by customs authorities to determine eligibility for preferential tariff treatment under free trade agreements. It must be accurately completed and often needs to be certified by a chamber of commerce.</li>
            </ul>

            <h4 id="6-3" className="font-semibold mt-6 mb-2">6.3 Curated Resources for the U.S. Exporter</h4>
            <p>Navigating the complexities of international trade is much easier with the help of dedicated government and international organizations.</p>

            <h5 className="font-semibold mt-4 mb-2">U.S. Government Portals</h5>
            <ul className="list-disc pl-6 mb-4">
              <li><b>International Trade Administration (ITA) - <a href="https://www.trade.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">trade.gov</a>:</b> This should be the first stop for any U.S. exporter. It is a comprehensive portal offering a vast array of free resources, including:
                <ul className="list-disc pl-6">
                  <li><b>Market Research:</b> Access to Country Commercial Guides (CCGs), which provide in-depth analysis of market conditions, opportunities, and business customs for specific countries.</li>
                  <li><b>Exporter Resources:</b> Tools to find foreign tariff rates, check against consolidated screening lists, and understand regulations.</li>
                  <li><b>Trade Event Information:</b> A database of international trade shows and missions.</li>
                  <li><b>Expert Assistance:</b> Connection to the U.S. Commercial Service, a global network of trade professionals who can provide counseling and business matchmaking services.</li>
                </ul>
              </li>
              <li><b>Small Business Administration (SBA) - <a href="https://www.sba.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">sba.gov</a>:</b> The SBA provides crucial support specifically tailored for small businesses looking to export:
                <ul className="list-disc pl-6">
                  <li><b>Counseling:</b> Access to free export counseling through Small Business Development Centers (SBDCs) and U.S. Export Assistance Centers (USEACs).</li>
                  <li><b>Export Finance Programs:</b> The SBA helps small businesses secure vital funding. The Export Working Capital Program (EWCP), for example, provides loan guarantees to lenders, making it easier for small businesses to get the working capital needed to fulfill export orders.</li>
                  <li><b>State Trade Expansion Program (STEP):</b> Provides federal grants to state governments to help small businesses with export development activities, such as participating in foreign trade missions or developing international marketing materials.</li>
                </ul>
              </li>
            </ul>

            <h5 className="font-semibold mt-4 mb-2">International Organizations</h5>
            <ul className="list-disc pl-6 mb-4">
              <li><b>World Bank - World Integrated Trade Solution (WITS) - <a href="https://wits.worldbank.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">wits.worldbank.org</a>:</b> A powerful, free database that allows exporters to conduct detailed statistical research. With WITS, a user can:
                <ul className="list-disc pl-6">
                  <li>Find import and export statistics for virtually any product (by HS code) and any country.</li>
                  <li>Identify the largest and fastest-growing markets for their products.</li>
                  <li>Look up applied tariff rates for specific products in specific countries.</li>
                </ul>
              </li>
              <li><b>Global Trade Helpdesk - <a href="https://globaltradehelpdesk.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">globaltradehelpdesk.org</a>:</b> A joint initiative of the International Trade Centre (ITC), UNCTAD, and the WTO. It is a user-friendly portal designed to help SMEs navigate international trade by providing information on tariffs, regulatory requirements, and market dynamics in one place.</li>
              <li><b>International Chamber of Commerce (ICC) - <a href="https://iccwbo.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">iccwbo.org</a>:</b> The ICC is the private-sector world business organization that creates the essential rules and standards that govern international trade. Their resources are indispensable for exporters:
                <ul className="list-disc pl-6">
                  <li><b>Incoterms® Rules:</b> The ICC is the author and publisher of the Incoterms® rules, providing the official text and guidance on their use.</li>
                  <li><b>Model Contracts and Clauses:</b> Offers standardized contract templates that can save significant time and legal fees.</li>
                  <li><b>Dispute Resolution Services:</b> The ICC International Court of Arbitration is the world's leading institution for resolving commercial disputes.</li>
                </ul>
              </li>
            </ul>
            <p>By leveraging these tools and resources, an exporter can systematically de-risk their international expansion, make more informed strategic decisions, and significantly increase their probability of achieving sustainable, profitable growth in global markets.</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Playbook4; 