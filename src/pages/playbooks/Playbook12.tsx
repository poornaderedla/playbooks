import React, { useState, useRef, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const sections = [
  { id: 'part-1', label: 'Part I: The Global Risk Landscape: A Comprehensive Taxonomy', subs: [
    { id: '1-1', label: '1.1 Introduction: The Inherent Uncertainty of Global Commerce' },
    { id: '1-2', label: '1.2 Commercial & Financial Risks' },
    { id: '1-3', label: '1.3 Country & Geopolitical Risks' },
    { id: '1-4', label: '1.4 Logistical & Operational Risks' },
    { id: '1-5', label: '1.5 Legal, Regulatory & Compliance Risks' },
    { id: '1-6', label: '1.6 Risk & Mitigation Matrix' },
  ]},
  { id: 'part-2', label: 'Part II: Proactive Risk Mitigation: Foundations of Resilience', subs: [
    { id: '2-1', label: '2.1 Strategic & Contractual Safeguards' },
    { id: '2-2', label: '2.2 Mastering Incoterms® 2020' },
    { id: '2-3', label: '2.3 Partner Vetting & Due Diligence' },
  ]},
  { id: 'part-3', label: 'Part III: Financial Risk Mitigation Instruments', subs: [
    { id: '3-1', label: '3.1 Securing Payment: Methods & Analysis' },
    { id: '3-2', label: '3.2 The Letter of Credit (L/C)' },
    { id: '3-3', label: '3.3 Hedging Against Currency Volatility' },
    { id: '3-4', label: '3.4 Trade Credit Insurance' },
  ]},
  { id: 'part-4', label: 'Part IV: Operational & Compliance Best Practices', subs: [
    { id: '4-1', label: '4.1 Cargo Protection: Packaging, Labeling, and Insurance' },
    { id: '4-2', label: '4.2 Building a Resilient Supply Chain' },
    { id: '4-3', label: '4.3 Country Risk Assessment Framework' },
    { id: '4-4', label: '4.4 Protecting Intellectual Property' },
    { id: '4-5', label: '4.5 Cybersecurity in Global Trade' },
  ]},
  { id: 'part-5', label: 'Part V: Dispute Resolution: A Structured Approach to Conflict', subs: [
    { id: '5-1', label: '5.1 Step 1: Negotiation' },
    { id: '5-2', label: '5.2 Step 2: Mediation' },
    { id: '5-3', label: '5.3 Step 3: Arbitration' },
    { id: '5-4', label: '5.4 Step 4: Litigation' },
  ]},
  { id: 'part-6', label: 'Part VI: Appendices & Resources', subs: [
    { id: '6-1', label: '6.1 Risk Assessment Checklists' },
    { id: '6-2', label: '6.2 Document Templates' },
    { id: '6-3', label: '6.3 Visual Guides (Flowcharts)' },
  ]},
];

const Playbook12 = () => {
  const [activeSection, setActiveSection] = useState('part-1');
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef(null);
  const tocRef = useRef(null);
  const sectionIds = sections.flatMap(section => [section.id, ...(section.subs?.map(sub => sub.id) || [])]);
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
  }, [sectionIds]);

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
      <h1 className="text-xl md:text-2xl font-bold text-center mb-6 mt-4 font-serif truncate">The International Trade Risk & Resolution Playbook</h1>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 h-[80vh] md:h-[85vh]">
        {/* Sidebar TOC */}
        <aside className="lg:w-1/4 w-full flex-shrink-0 mb-4 lg:mb-0">
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
          style={{ scrollBehavior: 'smooth', fontFamily: 'Inter, sans-serif', textAlign: 'justify', textJustify: 'inter-word' }}
        >
          {/* PART I */}
          <section id="part-1" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part I: The Global Risk Landscape: A Comprehensive Taxonomy</h2>
            <h3 id="1-1" className="text-base font-semibold mt-6 mb-2 truncate">1.1 Introduction: The Inherent Uncertainty of Global Commerce</h3>
            <p>International trade presents unparalleled opportunities for business growth, market expansion, and economic diversification. However, this global marketplace is defined by a level of complexity and uncertainty far exceeding that of domestic commerce. The act of moving goods, services, and capital across borders exposes a business to an intricate and interconnected web of risks. These risks are not merely financial; they are commercial, political, logistical, and legal, each with the potential to disrupt operations, erode profits, and damage reputations.</p>
            <p>Professional and sustainable international trade is not characterized by the avoidance of risk—for risk is inherent in the endeavor—but by its masterful management. The most successful global entrepreneurs and corporations are those that move beyond a reactive posture and adopt a proactive, strategic approach to risk. This involves a disciplined process of identifying, analyzing, mitigating, and preparing for the myriad challenges that can arise. This playbook is designed to serve as a definitive guide to that process. It begins by establishing a comprehensive taxonomy of the risks involved, providing the foundational knowledge necessary to build a resilient and professional trading operation. The subsequent sections will build upon this foundation, detailing the specific strategies, tools, and procedures required to navigate the complexities of global commerce with confidence and control.</p>

            <h3 id="1-2" className="text-base font-semibold mt-6 mb-2 truncate">1.2 Commercial & Financial Risks: The Core Economic Exposures</h3>
            <p>At the heart of any trade transaction lie the commercial and financial risks—the direct exposures that impact cash flow, profitability, and the fundamental economic viability of the deal. These are often the most immediate and tangible concerns for any business engaged in international trade.</p>
            <h4 className="font-semibold mt-4 mb-2">1.2.1 Counterparty & Credit Risk (Non-payment, Insolvency)</h4>
            <p>The most fundamental commercial risk in any transaction is the possibility that the buyer will not or cannot pay for the goods or services delivered. A sale is not a sale until the payment is collected, and this risk is amplified in the international arena. This category, often referred to as commercial risk or counterparty risk, encompasses several scenarios, including deliberate non-payment, significant payment delays, and the outright bankruptcy or insolvency of a trading partner.</p>
            <p>A critical error in risk assessment is to view counterparty credit risk in a vacuum, as if it were solely dependent on the buyer's individual financial health or integrity. In reality, a buyer who is both financially solvent and fully willing to pay may be prevented from doing so by external forces. For example, political instability or a balance-of-payments crisis in the buyer's country can lead a government to impose sudden capital or exchange controls, making it impossible to transfer foreign currency out of the country to settle a USD-denominated invoice. Similarly, a drastic and sudden devaluation of the buyer's local currency can render an invoice unaffordable overnight, turning a viable transaction into a potential default. Therefore, a robust assessment of a buyer's credit risk must be conducted in parallel with a thorough analysis of the broader country and currency risks associated with their market.</p>
            <h4 className="font-semibold mt-4 mb-2">1.2.2 Banking & Institutional Risk</h4>
            <p>When financial instruments are used to mitigate counterparty risk, a new layer of exposure emerges: bank risk. This is the risk that the financial intermediaries central to the transaction—particularly the buyer's bank—will fail to meet their obligations.</p>
            <p>Financial instruments like Letters of Credit (L/Cs) are often presented as a panacea for payment risk. However, they do not eliminate risk; they transform it. When an exporter agrees to be paid via an L/C, the risk of the buyer defaulting is indeed replaced by the payment guarantee of the buyer's bank (the "issuing bank"). The exporter is no longer exposed to the commercial risk of the buyer but is now exposed to the institutional risk of the issuing bank. If that foreign bank becomes insolvent, goes out of business, or fails to properly execute the payment for any reason, the exporter's ability to collect is just as jeopardized. This necessitates a shift in due diligence. The exporter must scrutinize not only their trading partner but also their partner's bank, evaluating its reputation, financial condition, and international ratings before entering into a trade agreement. For added security, an exporter can request that their own bank "confirm" the L/C, thereby adding a second layer of bank guarantee, though this comes at an additional cost.</p>
            <h4 className="font-semibold mt-4 mb-2">1.2.3 Foreign Exchange (Currency) Risk</h4>
            <p>Foreign exchange risk, or currency risk, is the potential for financial loss arising from fluctuations in the exchange rates between the currencies of the buyer and seller. Because the relative value of two currencies can change significantly between the time a contract is signed and the time payment is received, a company can see its profits unexpectedly reduced or even eliminated entirely. An unfavorable movement in the exchange rate can turn a profitable deal into a loss-making one.</p>
            <p>The management of currency risk presents a classic strategic trade-off between financial security and market competitiveness. The simplest way for an exporter to avoid currency risk is to quote prices and demand payment in their own domestic currency, thereby shifting the entire risk onto the buyer. While this approach offers maximum security, it can be a significant competitive disadvantage. A foreign buyer may prefer to transact with a competitor who is willing to quote and accept payment in the buyer's local currency.</p>
            <p>This creates a strategic dilemma: prioritize absolute risk elimination and potentially lose sales, or accept a degree of currency risk to be more competitive? A more sophisticated approach involves accepting the foreign currency but actively managing the associated risk through financial instruments. Hedging tools, such as forward contracts, allow a business to lock in a specific exchange rate for a future date, providing certainty and protecting profit margins while still offering competitive terms to the buyer. This strategy allows a firm to navigate the security-competitiveness trade-off, securing the sale while mitigating the financial exposure.</p>
            <h4 className="font-semibold mt-4 mb-2">1.2.4 Pricing & Inflation Risk</h4>
            <p>Distinct from currency fluctuations, broader economic conditions in the buyer's or seller's market can introduce significant risk. High inflation can erode the real value of a future payment and impact the cost of production. A recession in a target market can drastically reduce demand, leaving a seller with unsold inventory or forcing price concessions. These macroeconomic factors must be considered in long-term contracts and market selection, often requiring clauses that allow for price adjustments based on specific economic triggers or a shorter validity period for quotes in volatile markets.</p>

            <h3 id="1-3" className="text-base font-semibold mt-6 mb-2 truncate">1.3 Country & Geopolitical Risks: Navigating the Macro Environment</h3>
            <p>Country and geopolitical risks are macro-level threats that stem from the political, social, and legal environments of the nations involved in a trade transaction. These risks are largely outside the control of the individual parties but can have a profound and sudden impact on the viability and security of their business.</p>
            <h4 className="font-semibold mt-4 mb-2">1.3.1 Political Risk</h4>
            <p>Political risk arises from government instability, policy shifts, civil unrest, war, and terrorism. These events can disrupt trade in numerous ways, from the physical destruction of assets and supply chain infrastructure to the unilateral cancellation of contracts or the confiscation of property (expropriation) by a new regime.</p>
            <p>It is crucial to understand that political risk manifests in two distinct ways: targeted risk and blunt risk. Targeted risks are specific, measurable actions, such as a government imposing a new tariff on a particular product or nationalizing a specific industry. Blunt risk, however, is more pervasive and harder to quantify. It is the general chilling effect caused by a deterioration in political relations between two countries.</p>
            <p>The US-China Trade War provides a clear case study. While specific tariffs represented the targeted risk, research showed that the blunt effect of souring relations and heightened policy uncertainty was far more significant, contributing to a 34% increase in the exit rate of all foreign multinational subsidiaries from China, even those in non-tariffed industries. This demonstrates that no company is immune to the general political climate. A risk assessment that focuses only on specific tariffs or regulations is incomplete; it must also evaluate the overall stability and trajectory of the diplomatic and political relationship between the home and host countries, as this "blunt" risk can create an environment of uncertainty that increases the cost and difficulty of doing business for everyone.</p>
            <h4 className="font-semibold mt-4 mb-2">1.3.2 Sovereign & Transfer Risk</h4>
            <p>Sovereign risk is the risk that a foreign government will be unwilling or unable to meet its own debt obligations, which can trigger a systemic economic crisis affecting all businesses in that country. It is closely related to transfer risk, which is the specific risk that a government will prevent capital from leaving the country by imposing exchange controls. As noted earlier, transfer risk is a prime example of how political events can directly cause a commercial default, even when the buyer is solvent and willing to pay. A government's decision to block the transfer of foreign currency can make it physically impossible for the buyer to honor their contract.</p>
            <h4 className="font-semibold mt-4 mb-2">1.3.3 Sanctions, Embargoes, and Trade Wars</h4>
            <p>These are powerful tools of foreign policy where governments restrict or completely prohibit trade with certain countries, companies, or individuals. These measures are often imposed swiftly and can disrupt long-standing business relationships with little warning.</p>
            <p>The modern landscape of sanctions has transformed supply chain management from a purely logistical exercise into a critical geopolitical risk management function. A significant challenge today is sanctions evasion through trans-shipment, where goods are legally exported to a neutral third country only to be immediately re-exported to a sanctioned destination. For example, studies have shown a massive surge in EU exports to certain Central Asian and Caucasus nations that directly correlates with the imposition of sanctions on Russia, strongly suggesting these countries are being used as intermediary hubs.</p>
            <p>This creates a profound compliance risk for exporters. It is no longer sufficient to "Know Your Customer" (KYC); a business must now make every effort to "Know Your End-User" (KYEU). An exporter could face severe penalties if their products are diverted to a sanctioned entity, even if the diversion occurred after the initial sale. This reality necessitates a new level of supply chain visibility, incorporating robust end-user verification protocols, screening all parties against government restricted-party lists, and leveraging technology like AI-driven surveillance to detect anomalous trade patterns that may indicate diversion.</p>
            <h4 className="font-semibold mt-4 mb-2">1.3.4 Climate and Environmental Risk Factors</h4>
            <p>A growing category of country-level risk stems from environmental factors. This includes physical risks, such as the increasing frequency and severity of natural disasters like hurricanes, floods, and wildfires that can destroy infrastructure and disrupt logistics routes. It also includes transition risks, which arise from changes in government policy aimed at addressing climate change. New environmental regulations, carbon taxes, or restrictions on certain materials can significantly increase the cost of production or render a product non-compliant in a given market.</p>

            <h3 id="1-4" className="text-base font-semibold mt-6 mb-2 truncate">1.4 Logistical & Operational Risks: The Physical Journey of Goods</h3>
            <p>These risks pertain to the tangible, physical processes of producing goods and moving them from the seller to the buyer. They are the practical challenges of the supply chain.</p>
            <h4 className="font-semibold mt-4 mb-2">1.4.1 Transportation & Marine Risk</h4>
            <p>This category covers all potential problems during the physical transit of goods. With approximately 80% of global trade moving by sea, marine risk is a significant sub-category, encompassing perils like storms, shipwrecks, piracy, and water damage. More broadly, transportation risk includes damage from rough handling, breakage, contamination, theft, vandalism, and simple loss of cargo. Significant delays due to port congestion, labor strikes, or equipment shortages also fall under this category and can lead to financial penalties or canceled orders.</p>
            <h4 className="font-semibold mt-4 mb-2">1.4.2 Supply Chain Disruptions</h4>
            <p>Beyond the risks to a single shipment, the entire supply chain is vulnerable to systemic disruptions. These can be triggered by a wide range of events, including the failure of a key supplier, natural disasters, pandemics, or geopolitical shocks that shut down borders or trade routes. The COVID-19 pandemic and the war in Ukraine served as stark reminders of how quickly global events can sever critical supply links, leading to widespread shortages and production halts. Managing this risk requires building resilience through strategies like supplier diversification and contingency planning.</p>
            <h4 className="font-semibold mt-4 mb-2">1.4.3 Product & Quality Control Risk</h4>
            <p>This is the risk that the goods themselves fail to meet the contractual requirements. This can manifest as defects in manufacturing, non-compliance with the technical or safety regulations of the importing country, or a simple failure to meet the agreed-upon quality standards. The consequences can be severe, leading to rejection of the shipment by the buyer or by customs authorities, costly product recalls, damage to brand reputation, and disputes over payment. An infamous example illustrates the point: an international vendor produced blue coffee mugs for a client's Valentine's Day campaign that required red mugs. While a simple error, resolving such a mistake across international borders can take weeks or months and cause significant financial and reputational harm.</p>

            <h3 id="1-5" className="text-base font-semibold mt-6 mb-2 truncate">1.5 Legal, Regulatory & Compliance Risks: The Web of Rules</h3>
            <p>International trade operates within a complex and often overlapping web of national and international laws, regulations, and standards. Failure to navigate this web constitutes a major source of risk.</p>
            <h4 className="font-semibold mt-4 mb-2">1.5.1 Customs & Trade Barrier Compliance</h4>
            <p>Every country maintains its own set of customs laws and regulations that all imported goods must comply with. This is a non-negotiable aspect of trade. Compliance involves a host of technical requirements, including the correct tariff classification of goods using the Harmonized System (HS) code, accurate valuation of the goods for duty assessment, and correct declaration of the country of origin, which is essential for qualifying for preferential duty rates under Free Trade Agreements (FTAs). Failure to comply can result in significant penalties, seizure of goods, and expensive delays at the border.</p>
            <h4 className="font-semibold mt-4 mb-2">1.5.2 Documentary Risk</h4>
            <p>Closely related to compliance is documentary risk—the risk that the paperwork accompanying a shipment is improper, incomplete, or fraudulent. International trade runs on documents. A single error or omission on a critical document, such as the Bill of Lading, Commercial Invoice, or Certificate of Origin, can bring the entire transaction to a halt, preventing customs clearance and triggering payment disputes. This risk is distinct from the physical goods; even a perfect shipment can be stopped by imperfect paperwork.</p>
            <h4 className="font-semibold mt-4 mb-2">1.5.3 Intellectual Property (IP) Risk</h4>
            <p>Intellectual property rights—including patents, trademarks, and copyrights—are territorial. Protection granted in one country does not automatically extend to others. This creates significant risks for businesses expanding internationally. These risks include trademark counterfeiting, where others manufacture and sell goods with a fake brand; patent infringement, where competitors create "knockoff" products that copy a patented design or function; and trade secret misappropriation, where a foreign partner or supplier steals proprietary formulas or manufacturing processes. Furthermore, many countries operate on a "first-to-file" system for trademarks, which can lead to "trademark squatting," where a local entity registers a foreign brand's name with the intent to block their market entry or extort them.</p>
            <h4 className="font-semibold mt-4 mb-2">1.5.4 Ethical & Cultural Risks</h4>
            <p>Finally, businesses face risks related to ethics and culture. Ethical risks arise from the potential for a company's foreign partners or suppliers to engage in practices—such as labor abuses or corruption—that violate the company's values and could lead to severe reputational damage. Cultural risks stem from misunderstandings of local norms, communication styles, and business practices, which can lead to negotiation breakdowns, offense, and failed business relationships. Maintaining high ethical standards and demonstrating cultural intelligence are crucial for long-term success in global markets.</p>

            <h3 id="1-6" className="text-base font-semibold mt-6 mb-2 truncate">1.6 Risk & Mitigation Matrix</h3>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Risk Category</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Specific Risk</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Primary Mitigation Tools/Strategies</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Relevant Playbook Section</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-300 px-3 py-2" rowSpan={4}>Commercial & Financial</td><td className="border border-gray-300 px-3 py-2">Buyer Non-Payment / Insolvency</td><td className="border border-gray-300 px-3 py-2">Buyer defaults on payment due to financial distress, bankruptcy, or unwillingness to pay.</td><td className="border border-gray-300 px-3 py-2">Letter of Credit (L/C), Trade Credit Insurance, Cash-in-Advance, Documentary Collections (D/P)</td><td className="border border-gray-300 px-3 py-2">3.1, 3.2, 3.4</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Foreign Bank Failure</td><td className="border border-gray-300 px-3 py-2">The buyer's bank (issuing L/C) becomes insolvent or fails to honor its commitment.</td><td className="border border-gray-300 px-3 py-2">Confirmed Letter of Credit, Due Diligence on Foreign Bank</td><td className="border border-gray-300 px-3 py-2">1.2.2, 3.2.2</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Currency Devaluation</td><td className="border border-gray-300 px-3 py-2">Unfavorable exchange rate movement reduces the value of a foreign currency payment.</td><td className="border border-gray-300 px-3 py-2">Quoting in home currency, Currency Hedging (e.g., Forward Contracts)</td><td className="border border-gray-300 px-3 py-2">1.2.3, 3.3</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Inflation / Recession</td><td className="border border-gray-300 px-3 py-2">Macroeconomic conditions in the target market impact costs, demand, and profitability.</td><td className="border border-gray-300 px-3 py-2">Price escalation clauses in contracts, Market diversification, Economic monitoring</td><td className="border border-gray-300 px-3 py-2">1.2.4, 4.2, 4.3</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2" rowSpan={5}>Country & Geopolitical</td><td className="border border-gray-300 px-3 py-2">Political Instability / War</td><td className="border border-gray-300 px-3 py-2">Civil unrest, coups, or war in the buyer's or a transit country disrupts operations or destroys assets.</td><td className="border border-gray-300 px-3 py-2">Political Risk Insurance, Country Risk Assessment, Supply Chain Diversification</td><td className="border border-gray-300 px-3 py-2">1.3.1, 3.4, 4.3</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Expropriation / Nationalization</td><td className="border border-gray-300 px-3 py-2">Host government seizes company assets or investments.</td><td className="border border-gray-300 px-3 py-2">Political Risk Insurance, Investment Treaties</td><td className="border border-gray-300 px-3 py-2">1.3.1, 3.4</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Sanctions & Embargoes</td><td className="border border-gray-300 px-3 py-2">Government action prohibits or restricts trade with a country, entity, or individual.</td><td className="border border-gray-300 px-3 py-2">Restricted Party Screening, End-User Verification, Robust Compliance Program</td><td className="border border-gray-300 px-3 py-2">1.3.3, 4.3</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Transfer Risk / Capital Controls</td><td className="border border-gray-300 px-3 py-2">Host government prevents currency from being transferred out of the country.</td><td className="border border-gray-300 px-3 py-2">Political Risk Insurance, Confirmed L/C</td><td className="border border-gray-300 px-3 py-2">1.3.2, 3.2.2, 3.4</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Climate / Natural Disaster</td><td className="border border-gray-300 px-3 py-2">Environmental events (hurricanes, floods) disrupt logistics and supply chains.</td><td className="border border-gray-300 px-3 py-2">Cargo Insurance (ICC A), Supply Chain Diversification, Contingency Planning</td><td className="border border-gray-300 px-3 py-2">1.3.4, 4.1.2, 4.2</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2" rowSpan={4}>Logistical & Operational</td><td className="border border-gray-300 px-3 py-2">Cargo Damage / Loss in Transit</td><td className="border border-gray-300 px-3 py-2">Goods are physically damaged, lost, or stolen during transportation.</td><td className="border border-gray-300 px-3 py-2">Secure Packaging, Comprehensive Cargo Insurance (e.g., Institute Cargo Clauses A)</td><td className="border border-gray-300 px-3 py-2">4.1.1, 4.1.2</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Shipment Delays</td><td className="border border-gray-300 px-3 py-2">Transit is significantly delayed due to port congestion, customs issues, or carrier problems.</td><td className="border border-gray-300 px-3 py-2">Partnering with reliable freight forwarders, Real-time tracking, Buffer inventory</td><td className="border border-gray-300 px-3 py-2">2.3.2</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Supplier Failure</td><td className="border border-gray-300 px-3 py-2">A key supplier is unable to deliver necessary components or finished goods.</td><td className="border border-gray-300 px-3 py-2">Supplier Diversification, Regular Supplier Audits, Safety Stock</td><td className="border border-gray-300 px-3 py-2">4.2</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Product Quality Defects</td><td className="border border-gray-300 px-3 py-2">Goods do not meet agreed-upon quality standards or specifications.</td><td className="border border-gray-300 px-3 py-2">Pre-Shipment Inspections, Clear Quality Standards in Contract, Strong Warranties</td><td className="border border-gray-300 px-3 py-2">2.1.1, 4.2.2</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2" rowSpan={4}>Legal, Regulatory & Compliance</td><td className="border border-gray-300 px-3 py-2">Customs Non-Compliance</td><td className="border border-gray-300 px-3 py-2">Incorrect tariff classification, valuation, or documentation leads to fines and delays.</td><td className="border border-gray-300 px-3 py-2">Working with expert Customs Brokers/Forwarders, Internal Audits, Accurate Documentation</td><td className="border border-gray-300 px-3 py-2">2.3.2, 4.3</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Documentary Discrepancies</td><td className="border border-gray-300 px-3 py-2">Errors or omissions in trade documents (e.g., L/C, B/L) cause payment delays or rejection.</td><td className="border border-gray-300 px-3 py-2">Meticulous Document Preparation, Staff Training, Bank Documentary Review Services</td><td className="border border-gray-300 px-3 py-2">1.5.2, 3.2.3</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">IP Infringement / Theft</td><td className="border border-gray-300 px-3 py-2">Trademarks, patents, or trade secrets are copied or stolen in a foreign market.</td><td className="border border-gray-300 px-3 py-2">IP Registration in Target Markets, Strong Contractual Clauses, Customs Recordation</td><td className="border border-gray-300 px-3 py-2">1.5.3, 2.1.1, 4.4</td></tr>
                  <tr><td className="border border-gray-300 px-3 py-2">Ethical / Reputational Damage</td><td className="border border-gray-300 px-3 py-2">Foreign partner engages in unethical practices (e.g., corruption, labor abuse).</td><td className="border border-gray-300 px-3 py-2">Partner Due Diligence, Code of Conduct Agreements, Supply Chain Audits</td><td className="border border-gray-300 px-3 py-2">1.5.4, 2.3.1</td></tr>
                </tbody>
              </table>
            </div>
          </section>
          {/* PART II */}
          <section id="part-2" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part II: Proactive Risk Mitigation: The Foundations of a Resilient Trade Business</h2>
            <p>Understanding the landscape of risk is the first step. The second, and more critical, step is to construct a robust framework of proactive mitigation. The hallmark of a professional trading enterprise is its ability to prevent disputes and losses before they occur. This is achieved not through chance, but through the meticulous and disciplined execution of foundational commercial practices. This section details the strategic, financial, and operational safeguards that form the bedrock of a resilient international trade business.</p>

            <h3 id="2-1" className="text-base font-semibold mt-6 mb-2 truncate">2.1 Strategic & Contractual Safeguards</h3>
            <p>The most powerful risk management tools are not insurance policies or financial derivatives, but the clear, unambiguous agreements and strategic choices made at the outset of any trade relationship. The vast majority of conflicts arise from ambiguity, miscommunication, or poorly defined terms. Therefore, the most effective form of risk mitigation is the professional drafting of contracts and the precise allocation of responsibilities.</p>
            <h4 className="font-semibold mt-4 mb-2">2.1.1 The Cornerstone: The International Sales Contract</h4>
            <p>The international sales contract is the single most important document in any trade transaction. It is the legally binding agreement that defines the rights, obligations, and remedies of both the buyer and the seller. A well-drafted contract is the ultimate form of preventative risk management, as it replaces ambiguity with clarity and provides a predetermined roadmap for navigating potential issues.</p>
            <h5 className="font-semibold mt-3 mb-2">Drafting Essential Clauses</h5>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Identification of Parties, Goods, Price, and Payment:</b> The contract must unequivocally identify the full legal names and addresses of the buyer and seller. It must provide a detailed and specific description of the goods being sold, including quantity, quality specifications, and any relevant technical standards. The price per unit and total price must be clearly stated, along with the agreed-upon currency of payment.</li>
              <li><b>Delivery Terms (Incoterms®):</b> The contract must specify the chosen Incoterms® 2020 rule (e.g., "FOB Shanghai Incoterms® 2020"). This single term defines the critical points of delivery, risk transfer, and cost allocation between the parties. This will be discussed in detail in Section 2.2.</li>
              <li><b>Choice of Law & Jurisdiction (Governing Law & Forum Selection):</b> These are two of the most critical clauses for managing legal risk. The Choice of Law clause specifies which country's laws will be used to interpret the contract. The Choice of Jurisdiction (or Forum Selection) clause specifies where (in which country's courts or which arbitration seat) any dispute will be formally resolved. Agreeing on these points in advance prevents costly and time-consuming preliminary legal battles simply to decide where and under what law the actual dispute will be heard.</li>
              <li><b>Dispute Resolution Clause:</b> This clause outlines the "ladder" of steps the parties must take to resolve a conflict. A well-drafted clause will mandate that the parties first attempt to resolve the issue through good-faith negotiation. If that fails within a specified timeframe, they must proceed to mediation. Only if mediation is unsuccessful can the parties initiate the final, binding step, which should preferably be arbitration rather than litigation. This structured approach prevents a direct escalation to expensive and adversarial legal proceedings.</li>
              <li><b>Force Majeure & Hardship Clauses:</b> A Force Majeure clause excuses a party from performance if an unforeseeable and unavoidable event beyond their control (such as a war, natural disaster, or pandemic) makes performance impossible. A Hardship clause is related but distinct; it applies when an unforeseen event does not make performance impossible but so radically alters the economic equilibrium of the contract that performance becomes excessively burdensome for one party. This clause typically triggers an obligation to renegotiate the terms in good faith.</li>
              <li><b>Intellectual Property (IP) Clause:</b> If the transaction involves any intellectual property (e.g., selling a product that includes patented technology, or providing branded goods), this clause must clearly define the ownership, usage rights, and any licensing terms to prevent future disputes over IP.</li>
              <li><b>Confidentiality Clause:</b> In many transactions, parties exchange sensitive commercial information (e.g., pricing, customer lists, technical specifications). A confidentiality or non-disclosure clause prohibits the other party from disclosing this information to third parties, both during and after the contract term.</li>
              <li><b>Inspection and Warranties:</b> The contract should specify the buyer's right to inspect the goods (e.g., pre-shipment inspection) and the timeframe for doing so. It must also clearly state the seller's warranties regarding the goods—for example, that they are free from defects in material and workmanship and conform to the agreed specifications.</li>
            </ul>
            <h5 className="font-semibold mt-3 mb-2">2.1.2 Resource: ICC Model International Sale Contract Analysis</h5>
            <p>For businesses seeking a robust and balanced template, the ICC Model International Sale Contract is a globally recognized best-practice standard. Developed by the International Chamber of Commerce, it is specifically designed to be compatible with the UN Convention on Contracts for the International Sale of Goods (CISG) and the Incoterms® 2020 rules. Its structure is particularly user-friendly, consisting of two parts:</p>
            <ol className="list-decimal ml-6 mb-2">
              <li><b>Specific Conditions:</b> A fill-in-the-blanks form where the parties enter the unique details of their transaction (parties, goods, price, chosen Incoterm®, etc.).</li>
              <li><b>General Conditions:</b> A set of pre-drafted, standard legal terms covering issues like dispute resolution and governing law, which provides a solid, neutral legal foundation for the agreement.</li>
            </ol>
            <p>This model contract serves as an excellent starting point and reference tool, as it balances the interests of both buyers and sellers and incorporates decades of international commercial law expertise. While other templates exist, the ICC model is widely considered the gold standard for its neutrality and comprehensive nature.</p>

            <h3 id="2-2" className="text-base font-semibold mt-6 mb-2 truncate">2.2 Mastering Incoterms® 2020: Allocating Cost, Risk, and Responsibility</h3>
            <p>The Incoterms® rules, published by the International Chamber of Commerce, are a set of eleven three-letter trade terms that are essential vocabulary in global trade. When incorporated into a sales contract, they provide a standardized, internationally recognized definition of the respective obligations of the seller and the buyer concerning the delivery of goods. Their primary function is to clarify three critical points:</p>
            <ol className="list-decimal ml-6 mb-2">
              <li><b>Tasks:</b> Who is responsible for arranging transport, insurance, and customs clearance?</li>
              <li><b>Costs:</b> Who pays for each part of the journey (e.g., main carriage, terminal handling, import duties)?</li>
              <li><b>Risk:</b> At what specific point in the journey does the risk of loss or damage to the goods transfer from the seller to the buyer?</li>
            </ol>
            <p>It is vital to understand that Incoterms® rules are not a contract of sale themselves; they are a component that is incorporated into the contract. They do not deal with the transfer of title/ownership of the goods or the price payable; these must be specified elsewhere in the contract.</p>
            <h4 className="font-semibold mt-4 mb-2">2.2.1 Detailed Breakdown of all 11 Rules</h4>
            <p>The Incoterms® 2020 rules are divided into two categories based on the mode of transport.</p>
            <p className="font-semibold mt-2 mb-1">Category 1: Rules for Any Mode or Modes of Transport</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>EXW – Ex Works (...named place of delivery):</b> The seller fulfills their obligation by making the goods available at their own premises (e.g., factory, warehouse). The seller is not responsible for loading the goods onto the buyer's collecting vehicle or for clearing the goods for export. This rule represents the minimum obligation for the seller and the maximum obligation for the buyer, who bears all costs and risks from the seller's door onwards.</li>
              <li><b>FCA – Free Carrier (...named place of delivery):</b> The seller delivers the goods, cleared for export, to the carrier nominated by the buyer at a named place. This named place is critical: if it is the seller's premises, the seller is responsible for loading the goods. If it is another place (e.g., a freight forwarder's warehouse), the seller is responsible for transporting the goods to that place but is not responsible for unloading them. Risk transfers when the goods are handed over to the buyer's carrier. A key update in Incoterms® 2020 allows parties to agree that the buyer will instruct its carrier to issue an on-board bill of lading to the seller, a crucial change to facilitate L/C transactions.</li>
              <li><b>CPT – Carriage Paid To (...named place of destination):</b> The seller contracts and pays for the carriage of the goods to a named destination. However, the risk transfers from the seller to the buyer when the goods are handed over to the first carrier in the transport chain, not when they reach the destination. The seller is responsible for export clearance.</li>
              <li><b>CIP – Carriage and Insurance Paid To (...named place of destination):</b> This rule is the same as CPT, with the additional obligation that the seller must also contract and pay for cargo insurance covering the buyer's risk of loss or damage during carriage. A significant change in Incoterms® 2020 is that CIP now requires a higher level of insurance coverage (Institute Cargo Clauses A or equivalent), whereas CPT's sea-based counterpart, CIF, only requires minimum cover (Institute Cargo Clauses C).</li>
              <li><b>DAP – Delivered at Place (...named place of destination):</b> The seller delivers the goods when they are placed at the disposal of the buyer on the arriving means of transport, ready for unloading, at the named destination. The seller bears all risks and costs involved in bringing the goods to the destination, but the buyer is responsible for import customs clearance and any applicable duties and taxes.</li>
              <li><b>DPU – Delivered at Place Unloaded (...named place of destination):</b> This rule is new in Incoterms® 2020, replacing the former DAT (Delivered at Terminal). The seller delivers the goods when, once unloaded from the arriving means of transport, they are placed at the disposal of the buyer at the named destination. The seller bears all risks and costs of transport and unloading. The buyer is responsible for import clearance. This is the only rule that requires the seller to unload the goods at destination.</li>
              <li><b>DDP – Delivered Duty Paid (...named place of destination):</b> This rule represents the maximum obligation for the seller. The seller is responsible for delivering the goods to the named destination, cleared for import, with all duties and taxes paid. The seller bears all costs and risks until the goods are ready for unloading at the destination.</li>
            </ul>
            <p className="font-semibold mt-2 mb-1">Category 2: Rules for Sea and Inland Waterway Transport</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>FAS – Free Alongside Ship (...named port of shipment):</b> The seller delivers the goods when they are placed alongside the vessel (e.g., on a quay or a barge) nominated by the buyer at the named port of shipment. The risk of loss or damage transfers at that moment. The buyer is responsible for loading the goods and for all subsequent costs and risks.</li>
              <li><b>FOB – Free on Board (...named port of shipment):</b> The seller delivers the goods, cleared for export, by placing them on board the vessel nominated by the buyer at the named port of shipment. Risk transfers from seller to buyer once the goods are on board the vessel. This is one of the most commonly used, and misused, terms. It should not be used for containerized freight, where FCA is the appropriate rule.</li>
              <li><b>CFR – Cost and Freight (...named port of destination):</b> The seller contracts and pays for the costs and freight necessary to bring the goods to the named port of destination. However, similar to CPT, the risk transfers from seller to buyer when the goods are on board the vessel at the port of shipment. The seller is responsible for export clearance, but not for insurance.</li>
              <li><b>CIF – Cost, Insurance and Freight (...named port of destination):</b> This rule is the same as CFR, with the additional obligation that the seller must also procure and pay for minimum-cover marine insurance (Institute Cargo Clauses C) against the buyer's risk of loss or damage during carriage. As with CFR, risk transfers at the port of shipment.</li>
            </ul>
            <h5 className="font-semibold mt-3 mb-2">2.2.2 Choosing the Right Incoterm® for Your Shipment</h5>
            <p>The selection of an Incoterms® rule is a critical strategic decision that extends far beyond mere logistics. It directly influences cost structures, risk exposure, control over the supply chain, and the overall competitiveness of a sales quote. A novice trader might view these terms as simple shipping jargon, but a professional understands their profound commercial implications.</p>
            <p>For example, an exporter who chooses EXW (Ex Works) assumes the least possible responsibility and risk. This may seem "safe" and easy for the seller, but it can be a significant deterrent for a buyer who lacks the expertise, contacts, or desire to manage the complex tasks of export customs clearance, inland transport, and freight booking in a foreign country. The low EXW price may be unattractive once the buyer calculates the extensive additional costs and risks they must bear.</p>
            <p>Conversely, a seller who offers DDP (Delivered Duty Paid) takes on the maximum level of risk and responsibility, including arranging all transport and handling import clearance and paying all duties in the buyer's country. This presents a high-service, "all-inclusive" or "landed cost" price to the buyer, which can be a powerful competitive advantage. However, it also exposes the seller to significant risks in a foreign jurisdiction they may not fully understand, such as unexpected customs delays, complex import regulations, or fluctuating tax rates.</p>
            <p>The "F" rules (FCA, FAS, FOB) are often preferred by buyers who want to control the main international carriage. By nominating their own carrier, they can leverage their own freight contracts and maintain control over the most expensive and often riskiest part of the journey. For the seller, these rules provide a clear and early transfer of risk.</p>
            <p>The "C" rules (CPT, CIP, CFR, CIF) contain a critical nuance that is a frequent source of disputes: the separation of cost and risk. Under these rules, the seller is responsible for arranging and paying for the main carriage to the destination, but the risk of loss or damage transfers to the buyer before the main carriage begins (i.e., when the goods are handed to the first carrier or loaded on board the vessel at origin). A buyer who sees "CIF New York" might mistakenly believe the seller is responsible for the goods until they arrive in New York. In reality, if the ship sinks mid-Atlantic, it is the buyer's loss (to be claimed from the insurance arranged by the seller).</p>
            <p>Therefore, the choice of Incoterm® must be a deliberate one, aligned with a company's capabilities, risk appetite, and competitive strategy. A sophisticated seller with strong logistics partners might use DDP as a premium service offering. A high-volume buyer might insist on FOB to control freight costs. A seller dealing with an L/C might need to use a rule compatible with presenting an on-board bill of lading. The decision should be made with a full understanding of the obligations each rule entails. (For a guided decision process, see the flowchart in Appendix C.2).</p>

            <h3 id="2-3" className="text-base font-semibold mt-6 mb-2 truncate">2.3 Partner Vetting & Due Diligence</h3>
            <p>No contract, no matter how well-drafted, can fully protect a business from a fraudulent, incompetent, or financially unstable partner. Therefore, comprehensive due diligence on all parties involved in a transaction is a fundamental and non-negotiable risk mitigation practice.</p>
            <h4 className="font-semibold mt-4 mb-2">2.3.1 A Framework for Assessing Buyers, Suppliers, and Banks</h4>
            <p>Before committing to a transaction, a business must conduct a thorough assessment of its counterparties. This process should involve:</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Verifying Credibility and Reputation:</b> Research the company's history, check for online reviews and industry standing, and ask for trade references from their other partners.</li>
              <li><b>Assessing Financial Stability:</b> Obtain credit reports or use business intelligence tools to evaluate the partner's financial health and track record of payments. This is crucial for buyers to whom credit terms are being offered.</li>
              <li><b>Evaluating Bank Risk:</b> When a Letter of Credit is involved, the due diligence must extend to the foreign issuing bank. Research the bank's reputation, financial condition, and credit ratings to ensure it is a sound counterparty capable of honoring its commitment.</li>
              <li><b>Supplier Audits:</b> For suppliers, due diligence should include pre-qualification audits to assess their manufacturing capabilities, quality control processes, and compliance with labor and environmental standards.</li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">2.3.2 Selecting and Vetting Freight Forwarders</h4>
            <p>An experienced and reliable freight forwarder is not merely a logistics vendor; they are a critical strategic partner and a vital ally in preventing and resolving shipment issues. A thorough vetting process is essential. Key criteria for evaluation include:</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Experience and Expertise:</b> Prioritize forwarders with a long track record in the industry and, crucially, specific experience with your type of cargo (e.g., perishable, hazardous, oversized) and your key trade lanes.</li>
              <li><b>Reputation and Network:</b> Check online reviews and industry blacklists (e.g., "Freight Deadbeats"). A strong forwarder will have a vast network of global agents and be a member of respected professional organizations like the International Federation of Freight Forwarders Associations (FIATA) or the National Customs Brokers and Forwarders Association of America (NCBFAA). Membership in these bodies signifies adherence to industry best practices and ethical standards.</li>
              <li><b>Services Offered:</b> Ensure the forwarder offers a comprehensive suite of services that match your needs, including transport across all relevant modes (air, ocean, road, rail), customs brokerage, warehousing, cargo insurance, and documentation management.</li>
              <li><b>Licenses and Certifications:</b> Verify that the forwarder holds all legally required credentials, such as an Ocean Transportation Intermediary (OTI) license from the Federal Maritime Commission (FMC) for U.S. ocean freight or Indirect Air Carrier (IAC) certification from the TSA for U.S. air freight. Optional certifications like Authorized Economic Operator (AEO) or C-TPAT (Customs-Trade Partnership Against Terrorism) demonstrate a commitment to security and can result in streamlined customs processing.</li>
              <li><b>Technological Capabilities:</b> A modern forwarder should provide robust technological tools, including a portal for booking and quotes, real-time shipment tracking, and automated documentation systems. This visibility is essential for proactive problem-solving.</li>
              <li><b>Communication and Customer Service:</b> Evaluate their responsiveness and clarity. A good partner will provide proactive updates, especially when problems arise, and will be easily accessible to answer questions.</li>
            </ul>
          </section>
          {/* PART III */}
          <section id="part-3" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part III: Financial Risk Mitigation Instruments</h2>
            <p>While strategic planning and strong contracts form the first line of defense, a range of specialized financial instruments provides a second, crucial layer of protection against the core economic risks of international trade. These tools are designed to secure payments, manage currency volatility, and provide a financial backstop against unforeseen events.</p>

            <h3 id="3-1" className="text-base font-semibold mt-6 mb-2 truncate">3.1 Securing Payment: A Comparative Analysis</h3>
            <p>The method of payment chosen for a transaction directly dictates the allocation of risk between the buyer and the seller. The spectrum of options ranges from complete security for one party to complete risk for the other.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Cash-in-Advance:</b> This method requires the buyer to pay for the goods in full before they are shipped. It offers maximum security for the seller, completely eliminating the risk of non-payment. However, it places the maximum risk on the buyer, who must trust that the seller will ship the correct goods on time after receiving payment. This method can be a significant deterrent to buyers and is often only feasible for custom-made goods or in situations of very high buyer risk.</li>
              <li><b>Open Account:</b> This method is the direct opposite of cash-in-advance. The seller ships the goods and extends credit to the buyer, who agrees to pay at a future date (e.g., 30, 60, or 90 days after shipment). This offers maximum security and convenience for the buyer but places the maximum risk on the seller, who is fully exposed to the risk of buyer default. This method is typically used only in long-standing, trusted relationships or within multinational corporations.</li>
              <li><b>Documentary Collections:</b> This method offers a middle ground, using banks as intermediaries to handle the exchange of documents for payment, but without a bank guarantee. The exporter entrusts the collection of payment to their bank (the remitting bank), which sends the shipping documents to the importer's bank (the collecting bank) with instructions on how to release them. There are two main types:
                <ul className="list-disc ml-6 mb-2">
                  <li><b>Documents against Payment (D/P):</b> The collecting bank is instructed to release the shipping documents (which the importer needs to claim the goods) only after the importer makes immediate payment. This is relatively secure for the seller, as the buyer cannot take possession of the goods without paying.</li>
                  <li><b>Documents against Acceptance (D/A):</b> The collecting bank releases the documents after the importer "accepts" a time draft, which is a formal commitment to pay on a specified future date. This essentially creates an open account transaction but with the banks facilitating the process. The seller is still exposed to the risk that the buyer will fail to pay the draft at maturity.</li>
                </ul>
                Documentary collections are less expensive and less complex than Letters of Credit but are significantly riskier for the seller as the banks do not guarantee payment. They are best suited for established trade relationships in politically and economically stable markets.
              </li>
            </ul>

            <h3 id="3-2" className="text-base font-semibold mt-6 mb-2 truncate">3.2 The Letter of Credit (L/C): A Deep Dive</h3>
            <p>The Letter of Credit (also known as a Documentary Credit or DC) is the most secure payment instrument in international trade, offering protection to both the buyer and the seller. It is a formal, legally binding undertaking by a bank (the issuing bank), issued on behalf of a buyer (the applicant), to pay a specified sum of money to a seller (the beneficiary) upon the presentation of a set of stipulated documents that conform strictly to the terms of the credit. The fundamental principle of an L/C is the substitution of credit: it replaces the commercial credit risk of the buyer with the stronger, more reliable credit risk of the bank.</p>
            <h4 className="font-semibold mt-4 mb-2">3.2.1 The Step-by-Step L/C Process</h4>
            <ol className="list-decimal ml-6 mb-2">
              <li><b>Contract Agreement:</b> The buyer and seller agree in their sales contract that payment will be made by Letter of Credit.</li>
              <li><b>Application:</b> The buyer (Applicant) applies to their bank (the Issuing Bank) to open an L/C in favor of the seller. The application must contain all the terms and conditions agreed upon in the sales contract, including the required documents, shipment dates, and expiry date of the L/C.</li>
              <li><b>Issuance:</b> The Issuing Bank evaluates the buyer's creditworthiness and, if approved, issues the L/C. It transmits the L/C, typically via the secure SWIFT network, to a bank in the seller's country (the Advising Bank).</li>
              <li><b>Advising and Confirmation:</b> The Advising Bank (often the seller's own bank) authenticates the L/C to ensure it is genuine and then "advises" the seller (Beneficiary) that the credit has been opened. At this stage, the Advising Bank may be asked to "confirm" the L/C, adding its own separate guarantee of payment. This creates a Confirmed L/C.</li>
              <li><b>Shipment:</b> Upon receiving and reviewing the L/C to ensure all terms are achievable, the seller ships the goods as required by the L/C.</li>
              <li><b>Document Presentation:</b> The seller gathers all the documents stipulated in the L/C (e.g., commercial invoice, bill of lading, insurance policy, packing list, inspection certificate) and presents them to their bank (which may be the Advising, Confirming, or a separate Nominated Bank) before the L/C's expiry date.</li>
              <li><b>Examination:</b> The banks involved meticulously examine the presented documents to ensure they comply strictly with every term and condition of the L/C. This is the principle of "strict compliance." Banks deal only in documents, not in the physical goods themselves.</li>
              <li><b>Payment and Settlement:</b> If the documents are compliant, the payment process is triggered. The Confirming Bank (if any) or the Issuing Bank will pay the seller. The Issuing Bank then debits the buyer's account and releases the documents to the buyer, who needs them to take legal possession of the goods from the carrier and clear them through customs.</li>
            </ol>
            <p>(For a visual representation of this process, see Appendix C.1).</p>

            <h4 className="font-semibold mt-4 mb-2">3.2.2 Types of L/Cs Explained</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Irrevocable L/C:</b> This is the standard in modern trade. An Irrevocable L/C cannot be amended or canceled without the consent of all parties (issuing bank, confirming bank if any, and the beneficiary). This provides strong security to the seller. Revocable L/Cs, which can be altered by the issuing bank at any time, are rarely used as they offer no real security.</li>
              <li><b>Confirmed L/C:</b> A Confirmed L/C has a double guarantee. In addition to the Issuing Bank's promise to pay, a second bank (the Confirming Bank, usually in the seller's country) adds its own, separate promise to pay. This protects the seller not only against the credit risk of the issuing bank but also against the political and transfer risks of the buyer's country. It is highly recommended when dealing with buyers in high-risk countries.</li>
              <li><b>Sight L/C vs. Usance (Acceptance) L/C:</b> A Sight L/C is payable "at sight," meaning the bank pays the seller as soon as it determines the presented documents are compliant. A Usance L/C, or Acceptance Credit, allows for deferred payment. The seller presents documents along with a time draft (e.g., payable 90 days after sight). The bank "accepts" the draft, committing to pay it at maturity. This gives the buyer time to receive and potentially sell the goods before payment is due.</li>
              <li><b>Standby L/C (SBLC):</b> This functions more like a bank guarantee than a direct payment method. It is intended to be drawn upon only if the buyer fails to pay through an agreed-upon, more conventional method (like an open account). It acts as a financial backstop in case of default.</li>
              <li><b>Transferable L/C:</b> This type of credit allows the original (first) beneficiary to request the transferring bank to make the credit available in whole or in part to one or more second beneficiaries. This is useful for intermediaries or trading houses that need to pass on the security of the L/C to their own suppliers.</li>
              <li><b>Back-to-Back L/C:</b> This is a financing arrangement where an intermediary uses an incoming L/C from their buyer as collateral to have their bank open a second, separate L/C in favor of their own supplier. It is a more complex and riskier arrangement for the bank than a Transferable L/C.</li>
              <li><b>Red Clause / Green Clause L/C:</b> These are specialized L/Cs that include a clause authorizing the advising bank to make an advance payment to the seller before the goods are shipped. This provides the seller with pre-shipment financing. The "red clause" historically referred to the clause being typed in red ink to draw attention to this special provision.</li>
            </ul>

            <h4 className="font-semibold mt-4 mb-2">3.2.3 Managing Documentary Compliance and Discrepancies</h4>
            <p>While L/Cs are powerful tools for mitigating financial risk, they introduce a significant source of operational risk: the doctrine of strict compliance. The greatest challenge in using an L/C is often not the financial integrity of the banks, but the operational difficulty of producing a perfect set of documents.</p>
            <p>Banks are obligated to examine documents meticulously and will refuse to pay if there is even a minor discrepancy between the documents presented and the requirements stipulated in the L/C. A simple typographical error, a missing signature, a weight on the packing list that differs slightly from the invoice, or a bill of lading dated after the latest shipment date allowed in the L/C can all constitute a discrepancy. When a bank finds a discrepancy, it is no longer obligated to pay. The L/C, designed as a tool of security, is instantly transformed into a source of delay, cost, and risk. The seller must then either correct the documents (if time permits), or ask the buyer to waive the discrepancy and authorize the bank to pay, which reintroduces the very commercial risk the L/C was meant to eliminate.</p>
            <p>Therefore, the operational management of L/Cs is paramount. The playbook for using L/Cs successfully must include these practical steps:</p>
            <ol className="list-decimal ml-6 mb-2">
              <li><b>Review the L/C Before Shipment:</b> As soon as the L/C is received, the exporter must review every single term to ensure it is achievable. Can the shipment date be met? Are the document requirements clear and possible to fulfill? Is the company name and address spelled correctly? Any unachievable term must be amended before shipment.</li>
              <li><b>Meticulous Document Preparation:</b> Prepare all documents with extreme attention to detail, ensuring they are internally consistent and match the L/C's requirements exactly.</li>
              <li><b>Internal and External Checks:</b> Have a detail-oriented person within the company check the documents against the L/C. Consider using the bank's documentary review services before formal presentation to catch potential errors.</li>
            </ol>

            <h3 id="3-3" className="text-base font-semibold mt-6 mb-2 truncate">3.3 Hedging Against Currency Volatility</h3>
            <p>To manage the currency risk outlined in Section 1.2.3, businesses can use hedging instruments to protect themselves from adverse exchange rate movements. The most common and direct method is a forward contract.</p>
            <p>A forward contract is an agreement with a bank to exchange a specific amount of one currency for another on a specified future date at a pre-agreed exchange rate. For example, a U.S. exporter who has agreed to receive payment of €100,000 in 90 days can enter into a forward contract to sell €100,000 for U.S. dollars in 90 days at today's forward rate. This locks in the USD value of their sale, regardless of how the EUR/USD exchange rate moves over the next three months. This strategy provides certainty and protects profit margins. While it eliminates the potential for a windfall gain if the euro strengthens, most businesses prefer the certainty of a known profit over the speculation of a potential gain or loss.</p>

            <h3 id="3-4" className="text-base font-semibold mt-6 mb-2 truncate">3.4 The Role of Trade Credit Insurance</h3>
            <p>Trade credit insurance is another powerful tool for mitigating non-payment risk. It is an insurance policy that protects a seller (exporter) against losses arising from the failure of a buyer (importer) to pay their trade debts. This protection typically covers both:</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Commercial Risks:</b> Such as the buyer's insolvency, bankruptcy, or protracted default (simple unwillingness to pay).</li>
              <li><b>Political Risks:</b> Such as war, expropriation, or currency inconvertibility (transfer risk) that prevent the buyer from paying.</li>
            </ul>
            <p>Trade credit insurance can be used as an alternative to, or in conjunction with, Letters of Credit. It allows a business to confidently offer more competitive open account terms to buyers, knowing that their accounts receivable are insured against catastrophic loss. Insurance providers also offer valuable credit intelligence on buyers, helping sellers make more informed decisions about extending credit.</p>
          </section>
          {/* PART IV */}
          <section id="part-4" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part IV: Operational & Compliance Best Practices</h2>
            <p>Beyond the contractual and financial architecture of a trade deal, successful risk management depends on excellence in operational execution. This involves the physical protection of goods, the construction of resilient supply chains, and adherence to a complex matrix of international regulations.</p>

            <h3 id="4-1" className="text-base font-semibold mt-6 mb-2 truncate">4.1 Cargo Protection: Packaging, Labeling, and Insurance</h3>
            <p>The physical journey of goods across the globe is fraught with peril. A primary mitigation strategy against damage is the use of secure, durable, and appropriate packaging.</p>
            <h4 className="font-semibold mt-4 mb-2">4.1.1 International Standards for Packaging</h4>
            <p>Adherence to international standards is not merely a best practice; in many cases, it is a legal requirement for ensuring safety and compliance.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>General Packaging Standards:</b> The International Organization for Standardization (ISO) provides a wide range of standards relevant to packaging. While ISO 9001:2015 sets a framework for quality management systems that can be applied to packaging processes, more specific standards cover packaging terminology (e.g., ISO 21067-1) and performance testing protocols for vibration, impact, stacking, and dropping. These tests help ensure that a package is robust enough to withstand the rigors of transit. General best practices include using a minimum of 3-4 inches of cushioning material between the contents and the container walls for fragile items.</li>
              <li><b>Dangerous Goods Regulations:</b> The transport of hazardous materials (hazmat) is strictly controlled by modal-specific international regulations. Failure to comply can result in severe penalties, shipment rejection, and catastrophic safety incidents.
                <ul className="list-disc ml-6 mb-2">
                  <li><b>For Air Transport:</b> The IATA Dangerous Goods Regulations (DGR) is the global standard. It provides a comprehensive system for classifying, packing, marking, and labeling dangerous goods to ensure they are carried safely by air.</li>
                  <li><b>For Sea Transport:</b> The IMO International Maritime Dangerous Goods (IMDG) Code is the mandatory framework under the SOLAS convention. It details the requirements for packing, container traffic, and stowage, with a particular focus on segregating incompatible substances to prevent dangerous reactions.</li>
                </ul>
              </li>
              <li><b>Wood Packaging Material (ISPM-15):</b> To prevent the international spread of pests and diseases, a critical global standard known as ISPM-15 (International Standards for Phytosanitary Measures No. 15) mandates that all solid wood packaging material (WPM)—such as pallets, crates, and dunnage—must be treated (either by heat treatment or fumigation) and stamped with an official mark of compliance. Shipments arriving with non-compliant WPM can be refused entry, fumigated at the importer's expense, or destroyed.</li>
            </ul>

            <h4 className="font-semibold mt-4 mb-2">4.1.2 Comprehensive Cargo Insurance: Comparing Institute Cargo Clauses (A, B, C)</h4>
            <p>Standard carrier liability—the amount a shipping line or airline is legally required to pay for lost or damaged cargo—is notoriously limited and often calculated based on weight, bearing little relation to the actual value of the goods. Therefore, obtaining a separate, comprehensive cargo insurance policy is a non-negotiable aspect of prudent risk management. The most widely used frameworks for this insurance are the Institute Cargo Clauses, which come in three main levels of coverage.</p>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Feature</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Institute Cargo Clause A</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Institute Cargo Clause B</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Institute Cargo Clause C</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Nickname</td>
                    <td className="border border-gray-300 px-3 py-2">"All Risks"</td>
                    <td className="border border-gray-300 px-3 py-2">"Named Perils"</td>
                    <td className="border border-gray-300 px-3 py-2">"Basic Risks" / "Major Casualties"</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Scope of Coverage</td>
                    <td className="border border-gray-300 px-3 py-2">Most Extensive: Covers all risks of loss or damage to the cargo, except for those specifically listed in the exclusions clause. The burden is on the insurer to prove an exclusion applies.</td>
                    <td className="border border-gray-300 px-3 py-2">Moderate: Covers loss or damage attributable to a specific list of named perils. The burden is on the insured to prove the loss was caused by a covered peril.</td>
                    <td className="border border-gray-300 px-3 py-2">Most Limited: Covers loss or damage attributable only to a very short list of major catastrophic events.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Key Covered Perils</td>
                    <td className="border border-gray-300 px-3 py-2">All risks not excluded.</td>
                    <td className="border border-gray-300 px-3 py-2">- Fire or explosion<br/>- Vessel being stranded, grounded, sunk, or capsized<br/>- Overturning or derailment of land conveyance<br/>- Collision or contact of vessel with any external object<br/>- Discharge of cargo at a port of distress<br/>- Earthquake, volcanic eruption, lightning<br/>- General average sacrifice<br/>- Jettison or washing overboard<br/>- Entry of sea, lake, or river water into vessel, craft, hold, container, or place of storage</td>
                    <td className="border border-gray-300 px-3 py-2">- Fire or explosion<br/>- Vessel being stranded, grounded, sunk, or capsized<br/>- Overturning or derailment of land conveyance<br/>- Collision or contact of vessel with any external object<br/>- Discharge of cargo at a port of distress<br/>- General average sacrifice<br/>- Jettison</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Common Exclusions (Applicable to all clauses)</td>
                    <td className="border border-gray-300 px-3 py-2" colSpan={3}>- Willful misconduct of the insured<br/>- Ordinary leakage, loss in weight/volume, wear and tear<br/>- Insufficiency or unsuitability of packing<br/>- Inherent vice or nature of the subject-matter insured<br/>- Delay (unless specifically covered)<br/>- Insolvency of vessel owners/operators<br/>- Use of any weapon of war employing atomic or nuclear fission/fusion</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Typical Use Case</td>
                    <td className="border border-gray-300 px-3 py-2">High-value goods, fragile items, or any shipment where the broadest possible protection is desired. The standard for most finished manufactured goods.</td>
                    <td className="border border-gray-300 px-3 py-2">Used for bulk commodities or goods that are less susceptible to damage from handling, but where protection from major events and water damage is still required.</td>
                    <td className="border border-gray-300 px-3 py-2">Used for bulk cargoes, scrap metal, or low-value goods that are not easily damaged and where the primary concern is total loss from a major marine catastrophe.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Premium Cost</td>
                    <td className="border border-gray-300 px-3 py-2">Highest</td>
                    <td className="border border-gray-300 px-3 py-2">Moderate</td>
                    <td className="border border-gray-300 px-3 py-2">Lowest</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 id="4-2" className="text-base font-semibold mt-6 mb-2 truncate">4.2 Building a Resilient Supply Chain</h3>
            <p>In an era of increasing geopolitical volatility and climate-related disruptions, building a resilient supply chain is a core strategic imperative. Key mitigation strategies include:</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Diversification:</b> The most effective strategy is to avoid over-reliance on a single supplier or a single geographic region. By diversifying the supplier base across different countries, a business can mitigate the impact of a localized disruption, whether it's a natural disaster, a port strike, or a new tariff regime.</li>
              <li><b>Continuous Monitoring and Planning:</b> Proactively monitor the political, economic, and environmental risks in the countries where your suppliers operate. Run "what-if" scenarios to model the impact of potential disruptions and develop formal contingency plans that can be activated quickly.</li>
              <li><b>Transparency and Collaboration:</b> Foster open communication with key suppliers. Sharing sales forecasts and production plans allows them to plan more effectively and provides an opportunity for collaborative problem-solving when challenges arise.</li>
            </ul>

            <h4 className="font-semibold mt-4 mb-2">4.2.2 Implementing Pre-Shipment Inspections</h4>
            <p>A critical tool for managing product risk is the use of pre-shipment inspections (PSIs). This involves hiring an independent inspection company to verify that the goods meet all quality, quantity, and packaging specifications before they are loaded for international transit. A PSI can prevent a disastrous situation where defective or incorrect goods are shipped across the world, saving immense time and money in resolving the dispute after the fact. It is a vital quality gate that ensures you get what you paid for before it leaves the supplier's control.</p>

            <h3 id="4-3" className="text-base font-semibold mt-6 mb-2 truncate">4.3 A Framework for Country Risk Assessment</h3>
            <p>While Part I identified the types of country risk, this section provides a practical framework for how a business can actively assess and manage that risk.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Analytical Frameworks:</b> Businesses can use structured models like PEST (Political, Economic, Socio-Cultural, Technological) analysis to systematically evaluate the macro-environment of a potential market or sourcing location.</li>
              <li><b>Key Factors for Analysis:</b> The assessment should focus on key indicators of stability and risk, including:
                <ul className="list-disc ml-6 mb-2">
                  <li><b>Political:</b> Government stability, levels of corruption, rule of law, risk of civil unrest or conflict.</li>
                  <li><b>Economic:</b> GDP growth trends, public debt levels, inflation, currency stability, and reliance on key commodity exports.</li>
                  <li><b>Legal/Regulatory:</b> The reliability and transparency of the legal system, the history of regulatory changes, and the strength of contract enforcement.</li>
                  <li><b>Social:</b> Social cohesion, labor relations, and demographic pressures like high youth unemployment that could lead to instability.</li>
                </ul>
              </li>
              <li><b>Utilizing External Resources:</b> Businesses do not need to conduct this analysis in a vacuum. A wealth of information is available from specialized sources, including:
                <ul className="list-disc ml-6 mb-2">
                  <li><b>Credit Insurance Companies:</b> Firms like Coface and Allianz Trade publish detailed country risk ratings and reports, which are invaluable for assessing commercial and political risk.</li>
                  <li><b>International Financial Institutions:</b> The International Monetary Fund (IMF) conducts deep country risk surveillance, although much of the detailed data is for internal use.</li>
                  <li><b>Risk Consulting Firms:</b> Specialized firms like Verisk Maplecroft provide granular risk indices covering a wide range of political, human rights, and environmental issues.</li>
                </ul>
              </li>
              <li><b>C-TPAT as a Model:</b> The Customs-Trade Partnership Against Terrorism (C-TPAT) program, run by U.S. Customs and Border Protection, provides an excellent five-step framework that any company can adapt for its own supply chain security risk assessment:
                <ol className="list-decimal ml-6 mb-2">
                  <li>Map Cargo Flow and Identify Partners: Document every step and every party involved in your supply chain from origin to destination.</li>
                  <li>Conduct a Threat Assessment: Identify external threats relevant to your trade lanes (e.g., terrorism, smuggling, piracy).</li>
                  <li>Conduct a Vulnerability Assessment: Identify internal weaknesses in your processes (e.g., poor access controls, inadequate screening).</li>
                  <li>Prepare a Written Action Plan: Document how you will address the identified vulnerabilities.</li>
                  <li>Document and Review: Formalize the risk assessment procedure and conduct it at least annually.</li>
                </ol>
              </li>
            </ul>

            <h3 id="4-4" className="text-base font-semibold mt-6 mb-2 truncate">4.4 Protecting Intellectual Property Across Borders</h3>
            <p>Intellectual property is one of a company's most valuable assets, and it is uniquely vulnerable in the international arena. Because IP rights are territorial, a proactive, multi-faceted protection strategy is essential.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Strategic Registration:</b> The cornerstone of IP protection is registration. Businesses must file for patent, trademark, and design protection in every key market where they plan to manufacture or sell their products. This is especially critical in "first-to-file" jurisdictions (common in Asia and Latin America) to preempt "trademark squatters" who might otherwise register the brand and block the rightful owner's entry.</li>
              <li><b>Contractual Safeguards:</b> All contracts with foreign partners, distributors, and especially manufacturers must contain strong, explicit clauses regarding IP ownership and use. While Non-Disclosure Agreements (NDAs) are a necessary first step, they are often difficult to enforce internationally and are no substitute for registered IP rights. The contract should clearly state that the foreign partner cannot use or register the IP for their own benefit.</li>
              <li><b>Customs Recordation:</b> A powerful and underutilized tool is to record registered trademarks and copyrights with the customs authorities in key markets (such as U.S. Customs and Border Protection). This empowers customs officials to proactively identify and seize counterfeit or infringing goods at the border, stopping them before they can enter the stream of commerce.</li>
              <li><b>Continuous Monitoring:</b> IP protection is not a one-time event. Companies should regularly review their IP portfolio and actively monitor foreign markets for signs of infringement or counterfeiting to enable swift enforcement action.</li>
            </ul>

            <h3 id="4-5" className="text-base font-semibold mt-6 mb-2 truncate">4.5 Cybersecurity in Global Trade</h3>
            <p>As trade transactions, documentation, and communication become increasingly digitized, cybersecurity has emerged as a critical operational risk. A breach can compromise highly sensitive data, including commercial terms, financial information, customer lists, and intellectual property. A robust cybersecurity posture is essential for any modern trading business and should include:</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Technical Defenses:</b> Implementing firewalls, data encryption, and secure payment gateways.</li>
              <li><b>Process Controls:</b> Establishing strong access controls to sensitive information and conducting regular vulnerability assessments.</li>
              <li><b>Employee Training:</b> Educating employees on cybersecurity best practices, such as identifying phishing attempts and using strong passwords, as human error is often the weakest link.</li>
            </ul>
          </section>
          {/* PART V */}
          <section id="part-5" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part V: Dispute Resolution: A Structured Approach to Conflict</h2>
            <p>Despite the most meticulous planning and proactive risk mitigation, disputes in international trade can still occur. They can arise from disagreements over product quality, unforeseen delays, payment issues, or other alleged breaches of the sales contract. When a conflict does emerge, having a clear, structured, and pre-agreed strategy for resolution is the hallmark of a professional enterprise. This prevents disputes from spiraling into costly, time-consuming, and relationship-destroying legal battles. The most effective approach is a "dispute resolution ladder," which mandates that parties attempt to resolve their differences through a series of escalating steps, from the most informal and collaborative to the most formal and binding.</p>

            <h3 className="text-base font-semibold mt-6 mb-2 truncate">Section 5: The Dispute Resolution Ladder</h3>

            <h4 id="5-1" className="font-semibold mt-6 mb-2 truncate">5.1 Step 1: Negotiation</h4>
            <p>The first, simplest, and most effective method of dispute resolution is direct, good-faith negotiation between the buyer and the seller. Before resorting to any third-party intervention, a direct conversation can often clarify misunderstandings, correct simple errors, and lead to a mutually agreeable solution that preserves the business relationship.</p>
            <h5 className="font-semibold mt-3 mb-2">5.1.1 Strategies for Effective Direct Negotiation</h5>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Thorough Preparation:</b> Gather all relevant facts, documents, and correspondence related to the dispute. Understand the strengths and weaknesses of your own position and anticipate the other party's perspective.</li>
              <li><b>Focus on Interests, Not Positions:</b> A "position" is what a party says they want (e.g., "I demand a 50% discount"). An "interest" is the underlying need or reason for that demand (e.g., "I need to be compensated for the defective goods because they are unsellable"). Focusing on underlying interests opens the door to more creative, win-win solutions that may not involve acceding to the initial position.</li>
              <li><b>Identify Common Ground:</b> Even in a dispute, both parties often share common interests, such as the desire to avoid costly legal fees, salvage the business relationship, and find a quick resolution. Highlighting these shared goals can create a more collaborative atmosphere.</li>
            </ul>
            <h5 className="font-semibold mt-3 mb-2">5.1.2 Navigating Cross-Cultural Communication</h5>
            <p>When the parties are from different cultural backgrounds, the negotiation process is layered with additional complexity. Effective cross-cultural communication is paramount.</p>
            <p>A common pitfall in cross-cultural negotiation is the "dual adaptation" trap. The conventional wisdom is to research the counterpart's culture and adapt one's style accordingly. However, research from Harvard's Program on Negotiation reveals a critical nuance: both parties are often trying to adapt to their stereotype of the other's culture simultaneously. For example, an American negotiator, expecting their Japanese counterpart to be indirect and non-confrontational, might adopt an overly direct style to compensate. Meanwhile, the Japanese negotiator, expecting the American to be very direct, might also try to be more direct than is natural for them. The result is a misaligned and awkward communication dynamic where both parties are talking past each other based on stereotypical assumptions.</p>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Research the Individual, Not Just the Culture:</b> While cultural background is important, spend more time researching the specific individual you are negotiating with—their professional background, experience, and personal style.</li>
              <li><b>Build Rapport:</b> Dedicate time at the beginning of the negotiation for informal conversation ("small talk"). This helps build personal trust and allows both parties to move beyond stereotypes and relate to each other as individuals.</li>
              <li><b>Use Clear, Simple Language:</b> Avoid jargon, slang, and complex sentence structures. Speak in short, concise chunks, especially when using an interpreter, pausing frequently to allow for accurate translation.</li>
              <li><b>Clarify and Summarize:</b> Actively listen and periodically summarize your understanding of the other party's points. This confirms understanding and catches misinterpretations early.</li>
              <li><b>Be Patient and Respectful:</b> Recognize that cross-cultural negotiations may take more time. Rushing the process can be perceived as disrespectful and damage the negotiation.</li>
            </ul>

            <h4 id="5-2" className="font-semibold mt-6 mb-2 truncate">5.2 Step 2: Mediation</h4>
            <p>If direct negotiation fails to resolve the dispute, the next step on the ladder is mediation. Mediation is a voluntary, confidential, and non-binding process where a neutral and impartial third party—the mediator—is appointed to facilitate a structured negotiation between the disputing parties. The mediator's role is not to impose a decision, but to help the parties communicate effectively, identify their underlying interests, explore creative solutions, and find their own mutually acceptable resolution. The outcome is only legally binding if the parties reach a settlement and sign a formal settlement agreement.</p>
            <h5 className="font-semibold mt-3 mb-2">5.2.1 The Mediation Process: A Step-by-Step Guide</h5>
            <ol className="list-decimal ml-6 mb-2">
              <li><b>Commencement:</b> One or both parties file a Request for Mediation with an administering institution (like the ICC or WIPO) or directly agree to appoint a mediator.</li>
              <li><b>Appointment of the Mediator:</b> The parties can jointly agree on a mediator, or the administering institution will appoint one from its panel, often based on expertise in the relevant subject matter.</li>
              <li><b>Pre-Mediation Preparation:</b> The mediator will typically ask each party to submit a confidential pre-mediation statement outlining their view of the dispute, the key issues, and their goals for the mediation. The mediator may also hold separate preliminary calls with each party.</li>
              <li><b>The Mediation Session:</b> The parties (and their legal counsel) meet with the mediator. The session usually begins with a joint session, where the mediator explains the process and ground rules, and each party presents their opening statement.</li>
              <li><b>Caucuses:</b> The mediator will then typically move to caucuses—a series of private, confidential meetings with each party separately. In these caucuses, the mediator can probe for underlying interests, test the strengths and weaknesses of each side's case, and explore potential settlement options that the parties might be unwilling to voice in a joint session.</li>
              <li><b>Negotiation and Settlement:</b> The mediator acts as a shuttle diplomat, carrying offers and counter-offers between the parties and helping them bridge the gap. If an agreement is reached, the mediator will assist the parties in drafting a formal, written Settlement Agreement, which, once signed, becomes a legally binding contract.</li>
              <li><b>Termination:</b> If no agreement is reached, the mediation is terminated, and the parties are free to proceed to the next step in their dispute resolution process (e.g., arbitration).</li>
            </ol>
            <h5 className="font-semibold mt-3 mb-2">5.2.2 Role of the Mediator and Key Institutions</h5>
            <p>The mediator is a facilitator, not a judge. Their key functions are to open lines of communication, help parties see the dispute from different perspectives, manage emotions, and guide the search for a solution. Several prominent international institutions administer mediations and provide rules and panels of qualified mediators, including:</p>
            <ul className="list-disc ml-6 mb-2">
              <li>The ICC International Centre for ADR</li>
              <li>The WIPO Arbitration and Mediation Center (specializing in IP disputes)</li>
              <li>JAMS (Judicial Arbitration and Mediation Services)</li>
              <li>The AAA-ICDR (American Arbitration Association - International Centre for Dispute Resolution)</li>
              <li>The International Trade Council</li>
            </ul>
            <h5 className="font-semibold mt-3 mb-2">5.2.3 Costs and Timelines</h5>
            <p>Mediation is generally significantly faster and less expensive than arbitration or litigation. The average duration of an ICC mediation, for example, is around four months from filing to termination, with the actual face-to-face meetings often lasting only one or two days. Costs typically consist of an administrative filing fee paid to the institution and the mediator's fees, which are usually charged at an hourly or daily rate and are shared equally by the parties. For example, WIPO's standard mediation fees for a dispute over $250,000 include an administration fee of 0.10% of the dispute value (capped at $15,000) and mediator fees at an indicative rate of $300-$600 per hour.</p>

            <h4 id="5-3" className="font-semibold mt-6 mb-2 truncate">5.3 Step 3: Arbitration</h4>
            <p>When negotiation and mediation fail, arbitration is the preferred final and binding step for resolving international trade disputes. It is a private, quasi-judicial process where the parties agree to submit their dispute to one or more neutral third parties—the arbitrators or arbitral tribunal—for a final and legally binding decision, known as an arbitral award. Arbitration is generally faster, more confidential, and more flexible than litigation in national courts.</p>
            <h5 className="font-semibold mt-3 mb-2">5.3.1 Understanding the Arbitration Process: Ad Hoc vs. Institutional</h5>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Institutional Arbitration:</b> This is the most common form for international disputes. The parties agree in their contract to have their arbitration administered by a specialized arbitral institution (e.g., the ICC, LCIA, SIAC, HKIAC) and to be bound by that institution's procedural rules. The institution provides critical support services, such as assisting with the appointment of arbitrators, managing challenges to arbitrators, handling financial aspects like deposits and fees, and in some cases, scrutinizing the draft award to enhance its quality and enforceability.</li>
              <li><b>Ad Hoc Arbitration:</b> In an ad hoc arbitration, the parties manage the entire process themselves without the involvement of an institution. They are responsible for selecting and appointing the arbitrators, determining the procedural rules (often by adopting a pre-existing set of rules like the UNCITRAL Arbitration Rules), negotiating arbitrator fees, and arranging all hearing logistics. While potentially more flexible and less expensive, ad hoc arbitration requires a high degree of cooperation between the parties and is generally recommended only for sophisticated parties with experienced legal counsel.</li>
            </ul>
            <h5 className="font-semibold mt-3 mb-2">5.3.2 A Comparative Guide to Major Arbitral Institutions (ICC, LCIA, SIAC, HKIAC)</h5>
            <p>The choice of arbitral institution is a critical strategic decision that should be made when drafting the contract's dispute resolution clause. Each institution has its own rules, procedures, cost structures, and administrative philosophy. The four leading global institutions for commercial arbitration are the International Chamber of Commerce (ICC), the London Court of International Arbitration (LCIA), the Singapore International Arbitration Centre (SIAC), and the Hong Kong International Arbitration Centre (HKIAC).</p>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-left">Feature</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">ICC (International Chamber of Commerce)</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">LCIA (London Court of International Arbitration)</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">SIAC (Singapore Int'l Arbitration Centre)</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">HKIAC (Hong Kong Int'l Arbitration Centre)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Geographic Focus / Perception</td>
                    <td className="border border-gray-300 px-3 py-2">Global, highly respected. Sometimes perceived as European-centric and bureaucratic.</td>
                    <td className="border border-gray-300 px-3 py-2">Global, but perceived as London-centric. Rules align well with UK Arbitration Act.</td>
                    <td className="border border-gray-300 px-3 py-2">Leading Asian institution, perceived as highly neutral. Strong for Asia-related disputes.</td>
                    <td className="border border-gray-300 px-3 py-2">Leading Asian institution, strong expertise in China-related disputes with a good enforcement record there.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Commencement</td>
                    <td className="border border-gray-300 px-3 py-2">On receipt of Request for Arbitration by ICC Secretariat.</td>
                    <td className="border border-gray-300 px-3 py-2">On receipt of Request and registration fee by LCIA Registrar.</td>
                    <td className="border border-gray-300 px-3 py-2">On delivery of Notice of Arbitration to SIAC Registrar.</td>
                    <td className="border border-gray-300 px-3 py-2">On receipt of Notice of Arbitration by HKIAC.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Response Deadline</td>
                    <td className="border border-gray-300 px-3 py-2">30 days from receipt of Request.</td>
                    <td className="border border-gray-300 px-3 py-2">28 days from Commencement Date.</td>
                    <td className="border border-gray-300 px-3 py-2">14 days from receipt of Notice.</td>
                    <td className="border border-gray-300 px-3 py-2">30 days from receipt of Notice.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Default Number of Arbitrators</td>
                    <td className="border border-gray-300 px-3 py-2">Sole arbitrator, but ICC Court may appoint three if appropriate.</td>
                    <td className="border border-gray-300 px-3 py-2">Sole arbitrator, but LCIA Court may appoint three if appropriate.</td>
                    <td className="border border-gray-300 px-3 py-2">Sole arbitrator, but SIAC Registrar may appoint three if appropriate.</td>
                    <td className="border border-gray-300 px-3 py-2">HKIAC decides whether one or three is appropriate.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Cost Calculation</td>
                    <td className="border border-gray-300 px-3 py-2">Ad valorem (based on amount in dispute) for both administrative and arbitrator fees.</td>
                    <td className="border border-gray-300 px-3 py-2">Time-based (hourly rates) for both administrative and arbitrator fees.</td>
                    <td className="border border-gray-300 px-3 py-2">Ad valorem for administrative fees. Arbitrator fees are hourly but capped based on amount in dispute.</td>
                    <td className="border border-gray-300 px-3 py-2">Ad valorem or hourly rates can be chosen for arbitrator fees. Administrative fees are ad valorem.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Scrutiny of Award</td>
                    <td className="border border-gray-300 px-3 py-2">Yes. The ICC Court scrutinizes all draft awards for quality and enforceability before issuance. This is a key distinguishing feature.</td>
                    <td className="border border-gray-300 px-3 py-2">No. The institution does not scrutinize the award.</td>
                    <td className="border border-gray-300 px-3 py-2">No. The institution does not scrutinize the award.</td>
                    <td className="border border-gray-300 px-3 py-2">No. The institution does not scrutinize the award.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Confidentiality</td>
                    <td className="border border-gray-300 px-3 py-2">Proceedings are confidential for the institution and arbitrators, but the rules do not impose an express duty of confidentiality on the parties themselves.</td>
                    <td className="border border-gray-300 px-3 py-2">Parties undertake a general principle of confidentiality for all awards and materials. Deliberations are confidential.</td>
                    <td className="border border-gray-300 px-3 py-2">Parties and the tribunal must treat all matters relating to the proceedings and the award as confidential.</td>
                    <td className="border border-gray-300 px-3 py-2">Parties may not publish or disclose information relating to the arbitration or award, unless for legal enforcement.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Expedited / Early Dismissal</td>
                    <td className="border border-gray-300 px-3 py-2">Expedited procedure for claims under USD 3 million. No specific rule for early dismissal.</td>
                    <td className="border border-gray-300 px-3 py-2">Has an express power for early determination of claims that are manifestly without merit or outside the tribunal's jurisdiction.</td>
                    <td className="border border-gray-300 px-3 py-2">Has a procedure for early dismissal of claims that are manifestly without merit or outside jurisdiction.</td>
                    <td className="border border-gray-300 px-3 py-2">Has a procedure for summary determination of points of law or fact.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Time to Render Award</td>
                    <td className="border border-gray-300 px-3 py-2">6 months from Terms of Reference (can be extended).</td>
                    <td className="border border-gray-300 px-3 py-2">No strict time limit, but tribunal should endeavor to issue award within 3 months of final submissions.</td>
                    <td className="border border-gray-300 px-3 py-2">Draft award to be submitted to Registrar 45 days after proceedings close.</td>
                    <td className="border border-gray-300 px-3 py-2">3 months from close of proceedings (can be extended).</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h5 className="font-semibold mt-3 mb-2">5.3.3 The Arbitral Award and Enforcement (The New York Convention)</h5>
            <p>The final decision of the arbitral tribunal is known as an "award," and it is legally binding on the parties. A key advantage of arbitration over litigation is the global enforceability of arbitral awards. Thanks to the 1958 United Nations Convention on the Recognition and Enforcement of Foreign Arbitral Awards, commonly known as the New York Convention, an award issued in one signatory country can be readily enforced by the national courts of almost any other signatory country (over 170 countries are party to the convention). This provides a streamlined, effective mechanism for cross-border enforcement that is far more reliable than trying to enforce a judgment from a national court in a foreign jurisdiction.</p>

            <h4 id="5-4" className="font-semibold mt-6 mb-2 truncate">5.4 Step 4: Litigation</h4>
            <p>Litigation—filing a lawsuit in a national court—should be considered the absolute last resort for resolving an international trade dispute. The process can be exceedingly complex, prohibitively expensive, and incredibly time-consuming, particularly when it involves navigating a foreign legal system with unfamiliar procedures and languages.</p>
            <p>Unlike arbitral awards, there is no universally accepted convention for the enforcement of foreign court judgments, making it extremely difficult and often impossible to enforce a judgment obtained in one country against the assets of a party in another country. For these reasons, well-advised parties in an international contract will almost always choose binding arbitration as their final dispute resolution mechanism, reserving litigation only for situations where no arbitration agreement exists.</p>
          </section>
          {/* PART VI */}
          <section id="part-6" className="mb-8">
            <h2 className="text-lg font-bold mb-3 truncate">Part VI: Appendices & Resources</h2>

            <h3 id="6-1" className="text-base font-semibold mt-6 mb-2 truncate">Appendix A: Risk Assessment Checklists</h3>
            <p>These checklists are designed as practical tools for importers and exporters to systematically review and assess key risk areas in their supply chain. They are adapted from the C-TPAT five-step process and other compliance best practices.</p>

            <h4 className="font-semibold mt-4 mb-2">A.1 Exporter's Pre-Shipment Risk Checklist</h4>
            <ol className="list-decimal ml-6 mb-2">
              <li><b>Partner & Transaction Screening</b>
                <ul className="list-disc ml-6 mb-2">
                  <li>[ ] Buyer Due Diligence: Has a credit check been performed on the buyer? Are their trade references verified?</li>
                  <li>[ ] Restricted Party Screening: Have the buyer, consignee, and any other known parties been screened against all relevant government denied/restricted party lists (e.g., OFAC, BIS)? Is this screening documented?</li>
                  <li>[ ] End-User Verification: For sensitive or dual-use items, is the final end-user and end-use known and verified? Is an end-user certificate required and obtained?</li>
                  <li>[ ] Freight Forwarder/Carrier Vetting: Does the forwarder hold the necessary licenses (e.g., OTI, IAC)? Are they a member of a reputable association (e.g., FIATA)?</li>
                </ul>
              </li>
              <li><b>Contract & Payment Security Review</b>
                <ul className="list-disc ml-6 mb-2">
                  <li>[ ] Sales Contract: Is there a signed, legally binding sales contract in place?</li>
                  <li>[ ] Key Clauses: Does the contract clearly define:
                    <ul className="list-disc ml-6 mb-2">
                      <li>[ ] Goods, price, currency?</li>
                      <li>[ ] Incoterms® 2020 rule (e.g., "FOB Shanghai Incoterms® 2020")?</li>
                      <li>[ ] Governing Law and Jurisdiction/Arbitration seat?</li>
                      <li>[ ] Dispute Resolution Ladder (Negotiation {'->'} Mediation {'->'} Arbitration)?</li>
                    </ul>
                  </li>
                  <li>[ ] Letter of Credit (if applicable):
                    <ul className="list-disc ml-6 mb-2">
                      <li>[ ] Has the L/C been received and reviewed for compliance with the sales contract?</li>
                      <li>[ ] Are all terms (shipment date, expiry date, document requirements) achievable?</li>
                      <li>[ ] Has the creditworthiness of the issuing bank been assessed? Is a confirmation required?</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li><b>Compliance & Documentation</b>
                <ul className="list-disc ml-6 mb-2">
                  <li>[ ] Export Controls: Have the goods been classified for export control purposes (e.g., ECCN)? Is an export license required?</li>
                  <li>[ ] HTS/Schedule B Classification: Has the correct Schedule B number (for U.S. exports) been identified for the EEI filing?</li>
                  <li>[ ] EEI Filing: If the value is over $2,500 per Schedule B number, has the Electronic Export Information (EEI) been filed in the AES, and has an Internal Transaction Number (ITN) been received?</li>
                  <li>[ ] Document Preparation: Are all required export documents (Commercial Invoice, Packing List, Certificate of Origin, etc.) prepared, accurate, and consistent with each other and the L/C?</li>
                </ul>
              </li>
              <li><b>Cargo & Transit Security</b>
                <ul className="list-disc ml-6 mb-2">
                  <li>[ ] Packaging: Is the packaging durable and appropriate for the mode of transport? Does it comply with standards for dangerous goods (IATA/IMDG) or wood packaging (ISPM-15) if applicable?</li>
                  <li>[ ] Cargo Insurance: Has a comprehensive cargo insurance policy (e.g., Institute Cargo Clauses A) been secured?</li>
                  <li>[ ] Container Security: If shipping a full container, are there procedures for inspecting the container for structural integrity and implementing a high-security seal?</li>
                  <li>[ ] Tracking: Is a system in place for real-time tracking of the shipment?</li>
                </ul>
              </li>
            </ol>

            <h4 className="font-semibold mt-4 mb-2">A.2 Importer's Pre-Arrival Risk Checklist</h4>
            <ol className="list-decimal ml-6 mb-2">
              <li><b>Partner & Transaction Screening</b>
                <ul className="list-disc ml-6 mb-2">
                  <li>[ ] Supplier Due Diligence: Has the supplier been audited for quality control, financial stability, and ethical compliance?</li>
                  <li>[ ] Bank Due Diligence: If paying by L/C, is your bank familiar with the process? Are the terms of the L/C application clear?</li>
                  <li>[ ] Customs Broker Vetting: Does the customs broker have expertise with your specific products and a strong compliance track record?</li>
                </ul>
              </li>
              <li><b>Contract & Purchase Order Review</b>
                <ul className="list-disc ml-6 mb-2">
                  <li>[ ] Purchase Order / Contract: Does the PO or contract clearly specify:
                    <ul className="list-disc ml-6 mb-2">
                      <li>[ ] Detailed product specifications and quality standards?</li>
                      <li>[ ] Agreed-upon price and payment terms?</li>
                      <li>[ ] The correct Incoterms® 2020 rule?</li>
                    </ul>
                  </li>
                  <li>[ ] Pre-Shipment Inspection: Is a pre-shipment inspection by a third party mandated in the contract to verify quality and quantity before shipment?</li>
                </ul>
              </li>
              <li><b>Compliance & Documentation</b>
                <ul className="list-disc ml-6 mb-2">
                  <li>[ ] HTS Classification: Has the correct Harmonized Tariff Schedule (HTS) code for the goods been determined in advance to accurately calculate duties and taxes? Has this been verified by your customs broker?</li>
                  <li>[ ] Import Permits/Licenses: Do the goods require any import permits or licenses from government agencies (e.g., FDA, USDA)? Have these been secured?</li>
                  <li>[ ] Free Trade Agreements (FTA): Do the goods qualify for preferential duty treatment under an FTA? If so, is the required documentation (e.g., Certificate of Origin) being provided by the seller?</li>
                  <li>[ ] Document Review: Do you have a process to receive and review shipping documents from the seller promptly to ensure they are accurate before the shipment arrives?</li>
                </ul>
              </li>
              <li><b>Financial & Logistics</b>
                <ul className="list-disc ml-6 mb-2">
                  <li>[ ] Cargo Insurance: Based on the Incoterm® used, who is responsible for insuring the goods? If it is the importer's responsibility, has adequate coverage been obtained?</li>
                  <li>[ ] Recordkeeping: Is a system in place to maintain all import-related records (e.g., customs entries, invoices, POs) for the legally required period (e.g., five years in the U.S.)?</li>
                  <li>[ ] Audit Procedure: Is there an internal procedure to periodically audit filed customs entries for accuracy and compliance?</li>
                </ul>
              </li>
            </ol>

            <h3 id="6-2" className="text-base font-semibold mt-6 mb-2 truncate">Appendix B: Document Templates</h3>
            <h4 className="font-semibold mt-4 mb-2">B.1 Annotated Proforma Invoice Template</h4>
            <div className="bg-gray-50 border rounded p-4 mb-6">
              <div className="mb-2 font-mono text-sm">[Your Company Letterhead/Logo]</div>
              <div className="font-bold uppercase mb-2">PROFORMA INVOICE</div>
              <div className="mb-2 font-mono text-sm">
                <div>Seller/Exporter:<br/>[Your Company Name]<br/>[Your Full Address]</div>
                <div className="mt-2">Buyer/Consignee:</div>
                <div className="mt-2">Proforma Invoice No.: [Unique Number]</div>
                <div>Date:</div>
                <div>Buyer's Reference/PO No.:</div>
              </div>
              <table className="min-w-full border border-gray-400 text-xs mb-2">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 px-2 py-1">Item No.</th>
                    <th className="border border-gray-400 px-2 py-1">Description of Goods<br/>(Be as detailed as possible)</th>
                    <th className="border border-gray-400 px-2 py-1">HTS Code<br/>(Optional but helpful)</th>
                    <th className="border border-gray-400 px-2 py-1">Quantity</th>
                    <th className="border border-gray-400 px-2 py-1">Unit Price<br/>([Currency])</th>
                    <th className="border border-gray-400 px-2 py-1">Total Price<br/>([Currency])</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 px-2 py-1">1</td>
                    <td className="border border-gray-400 px-2 py-1">[e.g., Smartphones]</td>
                    <td className="border border-gray-400 px-2 py-1">[e.g., 8517.12]</td>
                    <td className="border border-gray-400 px-2 py-1">[100 units]</td>
                    <td className="border border-gray-400 px-2 py-1">[$150.00]</td>
                    <td className="border border-gray-400 px-2 py-1">[$15,000.00]</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-2 py-1">2</td>
                    <td className="border border-gray-400 px-2 py-1">[e.g., Cameras]</td>
                    <td className="border border-gray-400 px-2 py-1">[e.g., 9006.59]</td>
                    <td className="border border-gray-400 px-2 py-1">[50 units]</td>
                    <td className="border border-gray-400 px-2 py-1">[$200.00]</td>
                    <td className="border border-gray-400 px-2 py-1">[$10,000.00]</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-2 py-1 text-right" colSpan={5}><b>Subtotal:</b></td>
                    <td className="border border-gray-400 px-2 py-1">[$25,000.00]</td>
                  </tr>
                </tbody>
              </table>
              <div className="font-mono text-xs mb-2">
                <div>Country of Origin: [Country where goods were manufactured]</div>
                <div className="mt-2">Shipping Details:</div>
                <ul className="list-disc ml-6">
                  <li>Method of Dispatch:</li>
                  <li>Type of Shipment:</li>
                  <li>Port of Loading:</li>
                  <li>Port of Discharge:</li>
                  <li>Incoterms® 2020 Rule: **** (This is a critical field)</li>
                </ul>
                <div className="mt-2">Payment Terms: [e.g., 30% advance payment, 70% balance via Irrevocable Letter of Credit at sight]</div>
                <div className="mt-2">Estimated Shipping Date:</div>
                <div className="mt-2">Bank Details for Payment:</div>
                <ul className="list-disc ml-6">
                  <li>Bank Name:</li>
                  <li>Bank Address:</li>
                  <li>SWIFT Code:</li>
                  <li>Account Number: [Your Account Number]</li>
                </ul>
                <div className="mt-2">Validity: This Proforma Invoice is valid until.</div>
                <div className="mt-2">Signature:<br/>________________________________________________________________________________</div>
              </div>
            </div>
            <h4 className="font-semibold mt-4 mb-2">B.2 Annotated Commercial Invoice Template</h4>
            <div className="bg-gray-50 border rounded p-4 mb-6">
              <div className="mb-2 font-mono text-sm">[Your Company Letterhead/Logo]</div>
              <div className="font-bold uppercase mb-2">COMMERCIAL INVOICE</div>
              <div className="mb-2 font-mono text-sm">
                <div>Seller/Exporter:<br/>[Your Company Name]<br/>[Your Full Address]</div>
                <div className="mt-2">Buyer/Consignee:</div>
                <div className="mt-2 font-bold">Ship To (if different from Buyer):</div>
                <div className="mt-2">Invoice No.: [Unique Invoice Number]</div>
                <div>Date:</div>
                <div>Order No.:</div>
                <div>B/L or AWB No.:</div>
              </div>
              <table className="min-w-full border border-gray-400 text-xs mb-2">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 px-2 py-1">Item No.</th>
                    <th className="border border-gray-400 px-2 py-1">Description of Goods<br/>(Must match L/C and other docs)</th>
                    <th className="border border-gray-400 px-2 py-1">Country of Origin</th>
                    <th className="border border-gray-400 px-2 py-1">HTS Code</th>
                    <th className="border border-gray-400 px-2 py-1">Quantity</th>
                    <th className="border border-gray-400 px-2 py-1">Unit Price<br/>([Currency])</th>
                    <th className="border border-gray-400 px-2 py-1">Total Price<br/>([Currency])</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 px-2 py-1">1</td>
                    <td className="border border-gray-400 px-2 py-1">[e.g., Smartphones]</td>
                    <td className="border border-gray-400 px-2 py-1">[e.g., China]</td>
                    <td className="border border-gray-400 px-2 py-1">[e.g., 8517.12.00]</td>
                    <td className="border border-gray-400 px-2 py-1">[100 units]</td>
                    <td className="border border-gray-400 px-2 py-1">[$150.00]</td>
                    <td className="border border-gray-400 px-2 py-1">[$15,000.00]</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-2 py-1">2</td>
                    <td className="border border-gray-400 px-2 py-1">[e.g., Cameras]</td>
                    <td className="border border-gray-400 px-2 py-1">[e.g., Japan]</td>
                    <td className="border border-gray-400 px-2 py-1">[e.g., 9006.59.00]</td>
                    <td className="border border-gray-400 px-2 py-1">[50 units]</td>
                    <td className="border border-gray-400 px-2 py-1">[$200.00]</td>
                    <td className="border border-gray-400 px-2 py-1">[$10,000.00]</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-2 py-1 text-right" colSpan={6}><b>Subtotal:</b></td>
                    <td className="border border-gray-400 px-2 py-1">[$25,000.00]</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-2 py-1 text-right" colSpan={6}><b>Freight:</b></td>
                    <td className="border border-gray-400 px-2 py-1">[$2,000.00]</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-2 py-1 text-right" colSpan={6}><b>Insurance:</b></td>
                    <td className="border border-gray-400 px-2 py-1">[$500.00]</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-2 py-1 text-right" colSpan={6}><b>TOTAL INVOICE VALUE:</b></td>
                    <td className="border border-gray-400 px-2 py-1">[$27,500.00]</td>
                  </tr>
                </tbody>
              </table>
              <div className="font-mono text-xs mb-2">
                <div>Total Packages: [e.g., 10 pallets]</div>
                <div>Total Gross Weight: [e.g., 1200 kg]</div>
                <div>Total Net Weight: [e.g., 1150 kg]</div>
                <div>Terms of Sale (Incoterms®): ****</div>
                <div>Terms of Payment: [e.g., As per L/C No. 12345]</div>
                <div>Currency:</div>
                <div className="mt-2">Declaration:</div>
                <div>I, [Your Name], hereby certify that this invoice is true and correct and that the goods described are of [Country of Origin] origin.</div>
                <div className="mt-2">Signature:<br/>________________________________________</div>
              </div>
            </div>

            <h3 id="6-3" className="text-base font-semibold mt-6 mb-2 truncate">Appendix C: Visual Guides (Flowcharts)</h3>
            <h4 className="font-semibold mt-4 mb-2">C.1 Flowchart: The Letter of Credit Process</h4>
            <ol className="list-decimal ml-6 mb-2">
              <li><b>Step 1: Contract</b> - Buyer (Importer) and Seller (Exporter) agree on sales contract terms, specifying payment by confirmed, irrevocable L/C.</li>
              <li><b>Step 2: L/C Application</b> - Buyer applies to their bank (Issuing Bank) for the L/C, providing the sales contract details.</li>
              <li><b>Step 3: L/C Issuance</b> - Issuing Bank approves the application, issues the L/C, and sends it to a bank in the Seller's country (Advising/Confirming Bank) via SWIFT.</li>
              <li><b>Step 4: Advising & Confirmation</b> - Confirming Bank verifies the L/C's authenticity, adds its own guarantee of payment (confirmation), and advises the Seller.</li>
              <li><b>Step 5: Document Review & Shipment</b> - Seller reviews the L/C to ensure all terms are acceptable and achievable. If acceptable, Seller ships the goods.</li>
              <li><b>Step 6: Document Presentation</b> - Seller prepares all documents required by the L/C (invoice, bill of lading, etc.) and presents them to the Confirming Bank.</li>
              <li><b>Step 7: Document Examination & Payment</b> - Confirming Bank examines the documents for strict compliance. If compliant, it pays the Seller.</li>
              <li><b>Step 8: Document Forwarding & Reimbursement</b> - Confirming Bank forwards the compliant documents to the Issuing Bank and claims reimbursement.</li>
              <li><b>Step 9: Final Settlement</b> - Issuing Bank examines the documents, reimburses the Confirming Bank, debits the Buyer's account, and releases the documents to the Buyer.</li>
              <li><b>Step 10: Goods Collection</b> - Buyer uses the documents to take possession of the goods from the carrier.</li>
            </ol>

            <h4 className="font-semibold mt-4 mb-2">C.2 Flowchart: Incoterms® 2020 Decision Tree</h4>
            <ol className="list-decimal ml-6 mb-2">
              <li><b>Question 1: What is the mode of transport?</b>
                <ul className="list-disc ml-6 mb-2">
                  <li>Path A: Sea or Inland Waterway Only {'->'} Proceed to Question 2.</li>
                  <li>Path B: Any Mode (including Air, Road, Rail, Multimodal) {'->'} Proceed to Question 3.</li>
                </ul>
              </li>
              <li><b>(Path A) Question 2: Who is responsible for the main international carriage?</b>
                <ul className="list-disc ml-6 mb-2">
                  <li>Buyer Arranges Main Carriage:
                    <ul className="list-disc ml-6 mb-2">
                      <li>Seller delivers goods alongside the vessel? {'->'} FAS</li>
                      <li>Seller delivers goods on board the vessel? {'->'} FOB</li>
                    </ul>
                  </li>
                  <li>Seller Arranges Main Carriage:
                    <ul className="list-disc ml-6 mb-2">
                      <li>Seller pays for freight only? {'->'} CFR</li>
                      <li>Seller pays for freight and insurance? {'->'} CIF</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li><b>(Path B) Question 3: What is the seller's delivery obligation?</b>
                <ul className="list-disc ml-6 mb-2">
                  <li>Minimum Obligation (Seller delivers at own premises): {'->'} EXW</li>
                  <li>Seller Delivers to Buyer's Carrier at Origin: {'->'} FCA</li>
                  <li>Seller Arranges Main Carriage (but risk transfers at origin):
                    <ul className="list-disc ml-6 mb-2">
                      <li>Seller pays for carriage only? {'->'} CPT</li>
                      <li>Seller pays for carriage and high-cover insurance? {'->'} CIP</li>
                    </ul>
                  </li>
                  <li>Seller Responsible for Delivery to Destination (risk transfers at destination):
                    <ul className="list-disc ml-6 mb-2">
                      <li>Seller delivers ready for unloading? {'->'} DAP</li>
                      <li>Seller delivers and unloads? {'->'} DPU</li>
                      <li>Seller delivers, unloads, and pays import duties? {'->'} DDP</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ol>

            <h4 className="font-semibold mt-4 mb-2">C.3 Flowchart: The Dispute Resolution Ladder</h4>
            <ul className="list-disc ml-6 mb-2">
              <li><b>Level 1: PREVENTION (Base of the Ladder)</b>
                <ul className="list-disc ml-6 mb-2">
                  <li>Description: The foundation of a dispute-free relationship.</li>
                  <li>Tools: Clear Contract, Precise Incoterms®, Due Diligence, Open Communication.</li>
                </ul>
              </li>
              <li><b>Level 2: NEGOTIATION (First Rung)</b>
                <ul className="list-disc ml-6 mb-2">
                  <li>Description: Direct, informal discussion between the parties.</li>
                  <li>Characteristics: High party control, low cost, non-binding, preserves relationship.</li>
                </ul>
              </li>
              <li><b>Level 3: MEDIATION (Second Rung)</b>
                <ul className="list-disc ml-6 mb-2">
                  <li>Description: Facilitated negotiation with a neutral third party.</li>
                  <li>Characteristics: Medium party control, moderate cost, non-binding (unless settlement is signed), aims to preserve relationship.</li>
                </ul>
              </li>
              <li><b>Level 4: ARBITRATION (Third Rung)</b>
                <ul className="list-disc ml-6 mb-2">
                  <li>Description: Private, quasi-judicial process resulting in a binding decision (award).</li>
                  <li>Characteristics: Low party control (decision made by arbitrator), high cost, legally binding and enforceable globally (New York Convention), confidential.</li>
                </ul>
              </li>
              <li><b>Level 5: LITIGATION (Top Rung - Last Resort)</b>
                <ul className="list-disc ml-6 mb-2">
                  <li>Description: Formal lawsuit in a national court.</li>
                  <li>Characteristics: Lowest party control, highest cost and time, public record, judgments difficult to enforce internationally.</li>
                </ul>
              </li>
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

export default Playbook12; 