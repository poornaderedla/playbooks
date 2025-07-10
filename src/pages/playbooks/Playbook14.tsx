import React, { useState, useRef, useEffect } from "react";
import { Progress } from '@/components/ui/progress';

const sections = [
  {
    id: "part-1",
    label: "Part I: The Foundational Framework for Export",
    subs: [
      { id: "1-1", label: "Section 1: Introduction to India's Export Ecosystem" },
      { id: "1-2", label: "Section 2: The Gateway to Global Trade: The Importer-Exporter Code (IEC)" },
    ],
  },
  {
    id: "part-2",
    label: "Part II: Tax Compliance and Export Benefits",
    subs: [
      { id: "2-1", label: "Section 3: Mastering GST for Exports" },
    ],
  },
  {
    id: "part-3",
    label: "Part III: Gaining a Competitive Edge with Export Promotion",
    subs: [
      { id: "3-1", label: "Section 4: Joining the Club: Registration-cum-Membership Certificate (RCMC)" },
    ],
  },
  {
    id: "part-4",
    label: "Part IV: Sector-Specific Regulatory Clearances",
    subs: [
      { id: "4-1", label: "Section 5: Exporting Food Products: The FSSAI Central License" },
      { id: "4-2", label: "Section 6: Specialized Registrations for Key Sectors" },
    ],
  },
  {
    id: "part-5",
    label: "Part V: Understanding the Broader Regulatory and Digital Landscape",
    subs: [
      { id: "5-1", label: "Section 7: The Exporter's Digital Toolkit: A Deeper Dive into Essential Government Portals" },
      { id: "5-2", label: "Section 8: Core Legislations and Policies Shaping Your Business" },
    ],
  },
  {
    id: "part-6",
    label: "Part VI: A Practical Exporter's Checklist and Final Recommendations",
    subs: [
      { id: "6-1", label: "Section 9: A Practical Exporter's Checklist and Final Recommendations" },
    ],
  },
];

const sectionIds = sections.flatMap((s) => [s.id, ...(s.subs ? s.subs.map((sub) => sub.id) : [])]);

const Playbook14 = () => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
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
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>{`body { font-family: 'Inter', sans-serif; }`}</style>
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 mt-4 font-serif truncate">The Indian Exporter's Registration Guide: A Comprehensive Playbook</h1>
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
          style={{ scrollBehavior: 'smooth', fontFamily: 'Inter, sans-serif', textAlign: 'justify', textJustify: 'inter-word' }}
        >
          {/* Part I */}
          <section id="part-1" className="mb-8">
            <h2 className="text-lg font-bold mb-3">Part I: The Foundational Framework for Export</h2>
            <section id="1-1" className="mb-6">
              <h3 className="text-base font-semibold mb-2">Section 1: Introduction to India's Export Ecosystem</h3>
              <h4 className="font-semibold mt-4 mb-2">1.1. A Strategic Roadmap: The Sequence of Registrations for a New Exporter</h4>
              <p>Embarking on an export journey from India requires navigating a structured sequence of registrations and legal formalities. While the prospect may seem daunting, understanding the logical order of these steps can transform a complex process into a manageable action plan. For a new enterprise, establishing a solid legal and financial foundation is the paramount first step, upon which all subsequent trade-related registrations are built. A misstep in this sequence can lead to operational delays and compliance issues.</p>
              <p>The most efficient and logical sequence for a new exporter is as follows:</p>
              <ol className="list-decimal ml-6 mb-2">
                <li><b>Business Establishment and PAN:</b> The journey begins with the legal formation of the business entity, whether as a Sole Proprietorship, Partnership Firm, Limited Liability Partnership (LLP), or a Private/Public Limited Company. Immediately following this, obtaining a Permanent Account Number (PAN) from the Income Tax Department is mandatory. The PAN serves as the primary identifier for the business for all financial and tax-related matters.</li>
                <li><b>Bank Account:</b> A dedicated current account must be opened in the name of the business entity with a bank that is an Authorized Dealer (AD) for foreign exchange transactions. This account is critical for receiving export payments and for government transactions, such as the crediting of duty drawback amounts.</li>
                <li><b>Importer-Exporter Code (IEC):</b> This is the most fundamental registration for any business engaged in international trade. The IEC is a unique 10-digit code issued by the Directorate General of Foreign Trade (DGFT) and is a prerequisite for customs clearance and foreign currency transactions.</li>
                <li><b>Goods and Services Tax (GST) Registration:</b> For exporters, GST registration is mandatory, irrespective of turnover. This registration is essential for complying with tax laws and, crucially, for availing the benefits of zero-rated exports and claiming refunds on input taxes.</li>
                <li><b>Registration-cum-Membership Certificate (RCMC):</b> To avail benefits, concessions, and support under India's Foreign Trade Policy, an exporter must obtain an RCMC from the relevant Export Promotion Council (EPC) or Commodity Board that pertains to their line of products.</li>
                <li><b>Sector-Specific Licenses:</b> Depending on the product being exported, additional licenses are required. For example, food exporters need a Central License from the Food Safety and Standards Authority of India (FSSAI), while spice exporters need a registration certificate from the Spices Board.</li>
              </ol>
              <p>These registrations can be categorized to better understand their function:</p>
              <ul className="list-disc ml-6 mb-2">
                <li><b>Foundational Registrations:</b> Business Establishment, PAN, and Bank Account. These form the legal and financial identity of the enterprise.</li>
                <li><b>Operational Registrations:</b> IEC and GST Registration. These are mandatory licenses required to legally conduct export operations.</li>
                <li><b>Benefit-Oriented &amp; Sectoral Registrations:</b> RCMC and other specific licenses (FSSAI, etc.). These are necessary to claim government incentives and to comply with product-specific quality and safety standards.</li>
              </ul>
              <h4 className="font-semibold mt-6 mb-2">1.2. Understanding the Key Regulatory Bodies: The Pillars of Indian Trade</h4>
              <p>An exporter's operations are governed by a triumvirate of primary regulatory bodies, each with a distinct role in shaping and administering India's trade landscape. A clear understanding of their functions is essential for effective compliance.</p>
              <h5 className="font-semibold mt-4 mb-1">The Directorate General of Foreign Trade (DGFT)</h5>
              <p>The DGFT is an attached office of the Ministry of Commerce and Industry and is the principal government body an exporter interacts with for policy and licensing matters. Historically, before India's economic liberalization in 1991, the DGFT's predecessor acted primarily as a "controller," managing trade through a complex web of licenses and restrictions. Post-1991, its role has fundamentally transformed into that of a "facilitator". Its primary objective is now to promote and simplify foreign trade, making Indian exports more competitive globally.</p>
              <p>The key functions of the DGFT include:</p>
              <ul className="list-disc ml-6 mb-2">
                <li>Issuing and Managing the Importer-Exporter Code (IEC): The DGFT is the sole authority for issuing the foundational IEC.</li>
                <li>Formulating and Implementing the Foreign Trade Policy (FTP): The DGFT is responsible for creating and executing the country's EXIM policy, which outlines the framework for all export and import activities.</li>
                <li>Administering Export Promotion Schemes: It manages and implements various schemes designed to boost exports, such as the Remission of Duties and Taxes on Exported Products (RoDTEP) and the Export Promotion Capital Goods (EPCG) scheme.</li>
                <li>Maintaining ITC-HS Codes: The DGFT maintains and updates the Indian Trade Clarification based on Harmonized System (ITC-HS) codes, which are used to classify all goods for trade purposes.</li>
                <li>Handling Trade Disputes: It serves as a platform for addressing quality complaints and trade disputes.</li>
                <li>Guidance and Facilitation: The DGFT provides crucial guidance to traders on international trade developments, including agreements under the World Trade Organization (WTO).</li>
              </ul>
              <p>The DGFT operates from its headquarters in New Delhi and through a network of regional offices across India, which are the primary contact points for businesses.</p>
              <h5 className="font-semibold mt-4 mb-1">The Central Board of Indirect Taxes and Customs (CBIC)</h5>
              <p>The CBIC, under the Ministry of Finance, is the on-ground authority that governs the physical movement of goods across India's borders. It administers the Customs Act, 1962, and the Goods and Services Tax (GST) framework. While the DGFT sets the policy, the CBIC enforces it at the ports.</p>
              <p>Key functions of the CBIC relevant to exporters include:</p>
              <ul className="list-disc ml-6 mb-2">
                <li>Levying and Collecting Customs Duties: It assesses and collects duties on imported and, in some cases, exported goods.</li>
                <li>Customs Clearance: It manages the entire process of customs clearance for export cargo, including the filing of Shipping Bills and the issuance of the "Let Export Order."</li>
                <li>Prevention of Smuggling: It is the nodal agency for preventing illegal trade and smuggling.</li>
                <li>Management of the ICEGATE Portal: The CBIC operates the Indian Customs Electronic Data Interchange Gateway (ICEGATE), the online portal for all customs-related filings.</li>
              </ul>
              <h5 className="font-semibold mt-4 mb-1">The Reserve Bank of India (RBI)</h5>
              <p>The RBI, as India's central bank, is the custodian of the country's foreign exchange reserves. It administers the Foreign Exchange Management Act (FEMA), 1999, which governs all transactions involving foreign currency.</p>
              <p>Key functions of the RBI relevant to exporters include:</p>
              <ul className="list-disc ml-6 mb-2">
                <li>Regulating Realization of Export Proceeds: The RBI mandates the timeline within which payment for exported goods must be received in foreign currency and repatriated to India.</li>
                <li>Monitoring Foreign Exchange Transactions: It ensures that all foreign exchange dealings are conducted through authorized channels (banks) to maintain economic stability.</li>
                <li>Preventing Money Laundering: Through its regulations, the RBI plays a critical role in preventing the use of export transactions for illegal activities like money laundering.</li>
              </ul>
              <h5 className="font-semibold mt-4 mb-1">Sector-Specific Bodies (FSSAI, Spices Board, etc.)</h5>
              <p>For certain product categories, specialized regulatory bodies have been established to ensure quality, safety, and sector-specific promotion. For instance, the Food Safety and Standards Authority of India (FSSAI) is responsible for setting and enforcing standards for all food products, and its license is mandatory for food exporters. Similarly, the Spices Board of India regulates the export of spices. These bodies work in conjunction with the DGFT and CBIC to ensure that specialized products meet both domestic and international standards.</p>
              <h4 className="font-semibold mt-6 mb-2">1.3. The Digital Transformation of Trade: An Overview of Key Portals</h4>
              <p>India's trade ecosystem has undergone a significant digital transformation, with most compliance procedures moving online. However, this digitalization has occurred in silos, with different government functions managed on separate, powerful, but not fully integrated, portals. This creates a new, unstated compliance challenge for exporters: managing a consistent and accurate "digital identity" across these platforms. While each portal streamlines an individual process, the lack of real-time, cross-platform data validation introduces a systemic risk of data mismatch.</p>
              <p>A simple typographical error in a business address updated on one portal may not be flagged until a live shipment is held up at customs because the data does not match on another portal. This highlights the critical need for meticulous data consistency. It is highly recommended that every exporting entity maintain a "Master Data Sheet" containing the exact, verified details of its Legal Name, Registered Address, PAN, GSTIN, Director/Partner information, and bank details. This sheet should be used as the single source of truth for every registration to mitigate the risk of cross-platform data conflicts.</p>
              <p>The key portals an exporter must navigate are:</p>
              <ul className="list-disc ml-6 mb-2">
                <li><b>DGFT Portal (dgft.gov.in):</b> This is the central hub for all foreign trade policy-related registrations and applications. It is used for obtaining the Importer-Exporter Code (IEC), applying for the Registration-cum-Membership Certificate (RCMC), and submitting applications for various export promotion schemes.</li>
                <li><b>ICEGATE (icegate.gov.in):</b> The Indian Customs EDI Gateway is the mandatory portal for all customs-related electronic filings. Exporters use ICEGATE to file their Shipping Bills (the primary export declaration), track their consignments, and process IGST refunds.</li>
                <li><b>GST Portal (gst.gov.in):</b> This is the unified portal for all Goods and Services Tax compliance. It is used for GST registration, filing monthly/quarterly returns (GSTR-1, GSTR-3B), applying for a Letter of Undertaking (LUT), and claiming refunds of accumulated Input Tax Credit (ITC).</li>
                <li><b>FoSCoS (foscos.fssai.gov.in):</b> The Food Safety Compliance System is the dedicated portal managed by FSSAI for all food-related licensing and registration applications. Food exporters must use this portal to apply for their mandatory Central License.</li>
              </ul>
            </section>
            <section id="1-2" className="mb-6">
              <h3 className="text-base font-semibold mb-2">Section 2: The Gateway to Global Trade: The Importer-Exporter Code (IEC)</h3>
              <h4 className="font-semibold mt-4 mb-2">2.1. The Indispensable Nature of the IEC: Why It's Your First Step</h4>
              <p>The Importer-Exporter Code (IEC) is the most fundamental requirement for any business entity aspiring to engage in international trade from India. It is a unique 10-digit alphanumeric code issued by the Directorate General of Foreign Trade (DGFT). The IEC is based on the entity's Permanent Account Number (PAN) and is a mandatory prerequisite for both exporting goods out of India and importing goods into India.</p>
              <p>The IEC serves as the primary business identification number for an exporter in all trade-related transactions. Its key uses underscore its indispensability:</p>
              <ul className="list-disc ml-6 mb-2">
                <li><b>Customs Clearance:</b> No export or import consignment can be cleared by customs authorities without a valid IEC.</li>
                <li><b>Foreign Currency Transactions:</b> Banks require the IEC to process any outward or inward remittance of foreign currency related to trade.</li>
                <li><b>Prerequisite for Other Licenses:</b> Obtaining an IEC is a mandatory first step before applying for other crucial registrations and benefits, such as the RCMC from Export Promotion Councils and eligibility for schemes under the Foreign Trade Policy.</li>
              </ul>
              <p>Essentially, the IEC is the key that unlocks the door to global markets for an Indian business.</p>
              <h4 className="font-semibold mt-6 mb-2">2.2. A Meticulous Walkthrough: The Online IEC Application Process on the DGFT Portal</h4>
              <p>The application process for an IEC is conducted entirely online through the DGFT portal and is designed to be relatively straightforward and quick. The following is a detailed, step-by-step guide to the process:</p>
              <ol className="list-decimal ml-6 mb-2">
                <li><b>Portal Registration:</b> Visit the official DGFT website (<a href="https://www.dgft.gov.in" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">dgft.gov.in</a>). On the homepage, click on the 'Register' button. New users must first create an account. Fill in the basic registration details, including name, email address, and mobile number. Click 'Send OTP'. One-Time Passwords (OTPs) will be sent to both the registered mobile number and email address for validation. Enter the OTPs and complete the registration. A temporary password will be sent, which should be changed upon first login.</li>
                <li><b>Initiate Application:</b> Log in to the DGFT portal using the registered username and password. From the main dashboard or the top menu, navigate to 'Services' -&gt; 'IEC Profile Management'. On the subsequent page, click on the 'Apply for IEC' option.</li>
                <li><b>Fill Application Form (ANF 2A):</b> The system will direct the applicant to the online application form, known as ANF 2A. This form must be filled out with precise details. General Information: Select the nature of the business entity (e.g., Proprietorship, Partnership, LLP, Private Ltd. Company). Enter the firm's name, PAN details, Goods and Services Tax Identification Number (GSTIN, if available), and the complete registered address. Branch/Director/Partner Details: Fill in the required details of all partners, directors, or the proprietor, as applicable. Bank Account Details: Enter the firm's bank account number, the name of the bank, and the IFSC code.</li>
                <li><b>Upload Documents:</b> The application requires uploading scanned copies of specific documents. A detailed checklist is provided in the next section. Ensure all scanned files are clear, legible, and in the prescribed format (usually PDF or JPEG).</li>
                <li><b>Sign and Pay:</b> After filling the form and uploading documents, the application must be digitally signed. The DGFT portal provides two options for this:
                  <ol className="list-decimal ml-6">
                    <li>Digital Signature Certificate (DSC): The application can be signed using a valid Class 2 or Class 3 DSC of an authorized person.</li>
                    <li>Aadhaar-based e-Authentication: The application can be authenticated using an OTP sent to the mobile number linked with the Aadhaar of the proprietor/partner/director.</li>
                  </ol>
                  After successful signing, the portal will redirect to a payment gateway. The prescribed application fee of INR 500 must be paid online via net banking, credit card, or debit card.
                </li>
                <li><b>Receive and Download Certificate:</b> Upon successful submission and payment, the application is processed. In most cases where the data is validated successfully in real-time, the IEC is auto-generated by the system. The IEC certificate is typically sent to the applicant's registered email address within a few hours or working days. The certificate can also be downloaded directly from the DGFT portal at any time by logging in and navigating to 'Manage IEC' -&gt; 'Print Certificate'.</li>
              </ol>
              <h4 className="font-semibold mt-6 mb-2">2.3. Assembling Your Dossier: A Definitive Checklist of Required Documents</h4>
              <p>To ensure a smooth application process, it is critical to have all required documents scanned and ready for upload. The definitive checklist, consolidated from various sources, is as follows:</p>
              <ul className="list-disc ml-6 mb-2">
                <li><b>Proof of Identity / Establishment:</b>
                  <ul className="list-disc ml-6">
                    <li>PAN Card: A clear copy of the PAN card of the business entity (or the individual in case of a proprietorship) is mandatory.</li>
                    <li>Proof of Constitution:
                      <ul className="list-disc ml-6">
                        <li>For Private/Public Limited Companies and LLPs: Certificate of Incorporation issued by the Registrar of Companies.</li>
                        <li>For Partnership Firms: Registered Partnership Deed.</li>
                        <li>For Trusts and Registered Societies: The respective registration deed or certificate.</li>
                        <li>For Hindu Undivided Family (HUF): A declaration or relevant proof of constitution.</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li><b>Proof of Address:</b>
                  <ul className="list-disc ml-6">
                    <li>Any one of the following documents can serve as proof of the business premises: Sale Deed, Rent Agreement, Lease Deed, Electricity Bill, or Telephone Landline Bill.</li>
                    <li>For proprietorships, the proprietor's Aadhaar Card, Passport, or Voter ID can also be used as address proof.</li>
                    <li>No Objection Certificate (NOC): This is a critical requirement often overlooked. If the address proof document (e.g., electricity bill) is not in the name of the applicant firm, a No Objection Certificate (NOC) from the owner of the premises is mandatory. The NOC must be uploaded as a single PDF file along with the owner's address proof document.</li>
                  </ul>
                </li>
                <li><b>Proof of Bank Account:</b> A scanned copy of a Cancelled Cheque bearing the pre-printed name of the applicant entity, or a Bank Certificate in the prescribed format from the firm's current bank account.</li>
                <li><b>Other Essential Items:</b>
                  <ul className="list-disc ml-6">
                    <li>Digital Photograph: A passport-sized digital photograph of the applicant (proprietor, director, or managing partner).</li>
                    <li>Digital Authentication: An active Digital Signature Certificate (DSC) or an Aadhaar card of an authorized person (with a linked mobile number) for the e-signing process.</li>
                  </ul>
                </li>
              </ul>
              <h4 className="font-semibold mt-6 mb-2">2.4. Navigating Pitfalls: Common Reasons for IEC Application Rejection and How to Avoid Them</h4>
              <p>While the IEC application is largely automated, rejections can occur, primarily due to data discrepancies and documentation errors. Awareness of these common pitfalls can help an applicant ensure a first-time successful submission.</p>
              <ul className="list-disc ml-6 mb-2">
                <li><b>Mismatch in PAN Details:</b> This is the most critical and frequent reason for rejection. The DGFT system performs a real-time validation of the applicant's details against the Income Tax Department's database. The name of the entity, date of incorporation (for companies), or date of birth (for individuals) entered in the application must exactly match the details on the PAN card. Any minor variation will lead to an automatic rejection.
                  <ul className="list-disc ml-6">
                    <li><b>Avoidance Strategy:</b> Double-check every character and space in the name and verify the date against the official PAN record before submission.</li>
                  </ul>
                </li>
                <li><b>Incomplete or Illegible Documents:</b> Uploading scanned documents that are blurry, cut off, or illegible is a common cause for rejection. Similarly, failing to upload all the required documents will result in an incomplete application.
                  <ul className="list-disc ml-6">
                    <li><b>Avoidance Strategy:</b> Ensure all scans are high-quality and complete. Use a checklist to verify that every required document has been uploaded before final submission.</li>
                  </ul>
                </li>
                <li><b>Incorrect Address Proof:</b> Submitting an invalid address proof or, more commonly, failing to provide the mandatory No Objection Certificate (NOC) when the premises are not owned by the applicant firm, will lead to rejection.
                  <ul className="list-disc ml-6">
                    <li><b>Avoidance Strategy:</b> If renting or using shared premises, always obtain an NOC from the property owner and combine it with their address proof into a single file for upload.</li>
                  </ul>
                </li>
                <li><b>Incorrect Bank Details:</b> Mismatched names on the bank account (the account must be in the legal name of the business entity) or incorrect IFSC codes are common errors.
                  <ul className="list-disc ml-6">
                    <li><b>Avoidance Strategy:</b> Use a cancelled cheque with the firm's name pre-printed on it as the primary proof to avoid any ambiguity.</li>
                  </ul>
                </li>
              </ul>
              <p>If an application is rejected, the DGFT will provide the reason. The recommended course of action is to carefully review the rejection communication, precisely correct the identified error(s), and resubmit the application.</p>
              <h4 className="font-semibold mt-6 mb-2">2.5. Ongoing Compliance: The Mandatory Annual Updation and Reactivation of Your IEC</h4>
              <p>A common misconception among new exporters is that the IEC, once issued, is valid forever without any further action. While the 10-digit IEC number itself is permanent, its active status is conditional upon a mandatory annual compliance requirement. This distinction between the code's existence and its functional validity is critical. The term "lifetime validity" is a misnomer in an operational sense; it is more accurate to think of the IEC's active status as a free annual subscription that must be renewed to remain functional.</p>
              <p>Failure to perform this annual update will lead to the deactivation of the IEC, which will halt all import and export activities, as the code will be invalid in the Customs system.</p>
              <ul className="list-disc ml-6 mb-2">
                <li><b>The Annual Update Process:</b>
                  <ul className="list-disc ml-6">
                    <li><b>Timeline:</b> All IEC holders must electronically update their IEC details every year between April and June.</li>
                    <li><b>Procedure:</b> The process is simple. The holder must log in to the DGFT portal, navigate to 'Services' -&gt; 'IEC Profile Management' -&gt; 'Update IEC'. The system will display the current details. The user must verify them and submit the confirmation. This must be done even if there are no changes to the business details.</li>
                    <li><b>Cost:</b> There are no government fees or charges for this annual update.</li>
                  </ul>
                </li>
                <li><b>Updating Business Details:</b> If there are any changes in the business's details—such as a change in address, directors/partners, or bank account—the IEC must be updated immediately, without waiting for the April-June window. This may involve a modification fee similar to a new application.</li>
                <li><b>Reactivating a Deactivated IEC:</b> If an IEC is deactivated due to failure to complete the annual update, it can be reactivated.
                  <ul className="list-disc ml-6">
                    <li><b>Procedure:</b> The process for reactivation is the same as the annual update. The holder needs to log in to the DGFT portal and complete the 'Update IEC' process. Upon successful submission and validation of the profile, the IEC is automatically reactivated and its status is transmitted to the Customs system.</li>
                    <li><b>Documentation:</b> In some cases, the DGFT may ask for a letter explaining the reasons for the deactivation and the corrective steps taken.</li>
                  </ul>
                </li>
              </ul>
              <p>This annual compliance is a simple yet crucial step to ensure uninterrupted international trade operations.</p>
            </section>
          </section>
          {/* Part II */}
          <section id="part-2" className="mb-8">
            <h2 className="text-lg font-bold mb-3">Part II: Tax Compliance and Export Benefits</h2>
            <section id="2-1" className="mb-6">
              <h3 className="text-base font-semibold mb-2">Section 3: Mastering GST for Exports</h3>
              <h4 className="font-semibold mt-4 mb-2">3.1. Why GST Registration is Non-Negotiable for Exporters</h4>
              <p>Under the Goods and Services Tax (GST) regime in India, export of goods or services is classified as an "inter-state supply" and, more importantly, is treated as a "zero-rated supply". This special status has a direct and significant implication: GST registration is mandatory for any individual or business engaged in exporting, regardless of their annual turnover. Unlike domestic businesses that have a turnover threshold for registration, an exporter must register for GST from their very first transaction.</p>
              <p>Obtaining a GST Identification Number (GSTIN) is not merely a legal formality; it is the gateway to critical financial benefits and operational efficiencies for an exporter:</p>
              <ul className="list-disc ml-6 mb-2">
                <li><b>Legal Compliance:</b> It is a fundamental legal requirement. Exporting without a GSTIN is a violation of tax laws and can lead to severe penalties.</li>
                <li><b>Claiming Input Tax Credit (ITC) Refund:</b> This is the most significant financial benefit. Exporters pay GST on their domestic procurement of raw materials, inputs, and services (e.g., logistics, professional fees). The only mechanism to reclaim this paid tax is by filing for a refund through the GST portal, which is only possible for registered businesses. This prevents the "export of taxes" and makes Indian goods more competitive in the global market.</li>
                <li><b>Enabling Zero-Rated Exports:</b> GST registration allows an exporter to ship goods without the upfront payment of Integrated GST (IGST). This is achieved by furnishing a Letter of Undertaking (LUT) to the tax department. This facility prevents the blocking of substantial working capital that would otherwise be paid as tax and later claimed as a refund.</li>
                <li><b>Enhanced Credibility and Smooth Operations:</b> A valid GSTIN enhances the credibility of the business in the eyes of international buyers, suppliers, and financial institutions. It is also a prerequisite for seamless customs clearance, as GSTIN is a mandatory field in the Shipping Bill filed on the ICEGATE portal.</li>
              </ul>
              <h4 className="font-semibold mt-6 mb-2">3.2. The GST Registration Process: A Step-by-Step Guide for Export-Oriented Businesses</h4>
              <p>The GST registration process is entirely online via the common GST portal. The following is a detailed walkthrough of the procedure:</p>
              <ol className="list-decimal ml-6 mb-2">
                <li><b>Go to GST Portal and Generate TRN (Part A):</b> Visit the official GST portal: <a href="https://www.gst.gov.in" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">gst.gov.in</a>. Navigate to 'Services' &gt; 'Registration' &gt; 'New Registration'. On the registration page, select 'Taxpayer' as the type of user. Enter the state, legal name of the business (as per PAN), and the PAN of the entity. The portal will validate the PAN details. Provide a valid email address and mobile number for the primary authorized signatory. These will be verified via separate OTPs. After successful OTP validation, a Temporary Reference Number (TRN) will be generated and sent to the provided email and mobile number. This TRN is valid for 15 days and is used to complete the rest of the application.</li>
                <li><b>Log in with TRN and Fill Application (Part B):</b> Return to the GST portal and select 'New Registration' again. This time, choose the 'Temporary Reference Number (TRN)' option. Enter the TRN and the captcha, and proceed with OTP verification. This will lead to the main application form (Part B), which has several sections to be completed:
                  <ul className="list-disc ml-6">
                    <li>Business Details: Enter the trade name of the business and select the constitution of the business (e.g., Proprietorship, Company).</li>
                    <li>Promoter/Partner Information: Provide personal details, identity information (PAN, Aadhaar), and residential address for all promoters, partners, or directors.</li>
                    <li>Authorized Signatory: Designate an authorized signatory for GST compliance.</li>
                    <li>Principal Place of Business: Provide the full address and upload supporting proof of address.</li>
                    <li>Details of Goods and Services: Specify the top 5 goods or services the business will supply, using their HSN (Harmonized System of Nomenclature) or SAC (Services Accounting Code) codes.</li>
                    <li>Bank Account Details: Enter the details of at least one current bank account held in the name of the business.</li>
                  </ul>
                </li>
                <li><b>Verification and Submission:</b> Once all sections are filled, the application must be verified and submitted using one of the following methods:
                  <ul className="list-disc ml-6">
                    <li>Digital Signature Certificate (DSC): Mandatory for Companies and LLPs.</li>
                    <li>E-Sign: An OTP is sent to the mobile number linked with the Aadhaar of the authorized signatory.</li>
                    <li>Electronic Verification Code (EVC): An OTP is sent to the registered mobile number of the authorized signatory.</li>
                  </ul>
                </li>
                <li><b>ARN Generation and Approval:</b> Upon successful submission, an Application Reference Number (ARN) is generated. The application is then sent to the appropriate tax officer for verification. The officer may approve the application, raise a query for more information, or reject it if there are discrepancies. If all documents and information are in order, the GST registration is approved, and the GST Registration Certificate (Form GST REG-06), containing the 15-digit GSTIN, is issued. This can be downloaded from the GST portal.</li>
              </ol>
              <p><b>Definitive Documents Checklist for GST Registration:</b></p>
              <ul className="list-disc ml-6 mb-2">
                <li>PAN card of the business entity/individual.</li>
                <li>Aadhaar card of the proprietor/partners/directors.</li>
                <li>Proof of business registration (e.g., Certificate of Incorporation, Partnership Deed).</li>
                <li>Identity and address proof of promoters/directors with their photographs.</li>
                <li>Proof of address for the principal place of business (e.g., electricity bill, rent agreement with NOC).</li>
                <li>Proof of bank account (e.g., scanned copy of a cancelled cheque or bank statement).</li>
                <li>Digital Signature Certificate (DSC) for the authorized signatory (mandatory for companies/LLPs).</li>
                <li>Letter of Authorization/Board Resolution for the authorized signatory.</li>
              </ul>
              <h4 className="font-semibold mt-6 mb-2">3.3. The Zero-Rated Supply Advantage: Exporting Without IGST via a Letter of Undertaking (LUT)</h4>
              <p>The GST framework provides two options for exporters to handle the tax on their shipments:</p>
              <ol className="list-decimal ml-6 mb-2">
                <li><b>Export with Payment of IGST:</b> The exporter pays the applicable IGST on the transaction value of the goods/services at the time of export and subsequently claims a refund of this tax paid. This method can lead to the blockage of working capital until the refund is processed.</li>
                <li><b>Export without Payment of IGST:</b> The exporter furnishes a Letter of Undertaking (LUT) to the tax authorities, committing to fulfill all export requirements. This allows them to export goods or services without paying any IGST upfront. They can then claim a refund of the accumulated Input Tax Credit (ITC) on their inputs. This is the most popular and capital-efficient method for exporters.</li>
              </ol>
              <h5 className="font-semibold mt-4 mb-1">Eligibility for LUT</h5>
              <p>Any GST-registered person can file an LUT, with one key condition: they must not have been prosecuted for any offense under GST law where the tax evaded exceeds INR 2.5 Crore.</p>
              <h5 className="font-semibold mt-4 mb-1">Detailed LUT Filing Process (Form GST RFD-11)</h5>
              <p>The process of filing an LUT is simple, online, and must be completed for each financial year. The following is a step-by-step guide:</p>
              <ol className="list-decimal ml-6 mb-2">
                <li><b>Login to GST Portal:</b> Log in to the GST portal (<a href="https://www.gst.gov.in" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">gst.gov.in</a>) with valid credentials. Navigate to the 'Services' tab, then 'User Services', and select 'Furnish Letter of Undertaking (LUT)'.</li>
                <li><b>Select Financial Year:</b> From the dropdown menu, select the financial year for which the LUT is being filed. For example, for exports planned between April 2024 and March 2025, select '2024-25'. If a previous LUT was furnished manually, there is an option to upload a PDF/JPEG copy (max 2 MB).</li>
                <li><b>Fill Details and Provide Declarations:</b> The online form (GST RFD-11) will appear. The applicant must tick the three checkboxes, making a self-declaration to:
                  <ul className="list-disc ml-6">
                    <li>Complete the export of goods/services within the prescribed time (three months for goods, one year for services).</li>
                    <li>Adhere to all provisions of the GST law regarding exports.</li>
                    <li>Agree to pay IGST with interest at 18% per annum if the export conditions are not met.</li>
                  </ul>
                  Witness Information: The applicant must provide the name, occupation, and address of two independent witnesses. This is a mandatory field.
                </li>
                <li><b>Sign and File:</b> Enter the name of the authorized signatory and the place of filing. Preview the form to ensure all details are correct. Sign and file the form using either a Digital Signature Certificate (DSC) or an Electronic Verification Code (EVC). Upon successful submission, an Application Reference Number (ARN) is generated, and an acknowledgment can be downloaded. The LUT is deemed accepted upon generation of the ARN.</li>
              </ol>
              <p>While the online process is document-less, the conceptual documents that back this application include the GST Registration Certificate, PAN, IEC, and KYC details of the authorized person.</p>
              <h4 className="font-semibold mt-6 mb-2">3.4. Reclaiming Your Capital: The Process for Claiming Input Tax Credit (ITC) Refunds</h4>
              <p>For exporters who use the LUT route and export without paying IGST, the GST paid on their inputs and input services accumulates in their Electronic Credit Ledger. The GST law provides a mechanism to refund this accumulated ITC, ensuring that the tax cost is not embedded in the export price.</p>
              <p>It is crucial to recognize that the ITC refund process is not a standalone application; it is a direct, system-driven consequence of accurate and timely GST return filing. The refund application (RFD-01) is essentially a request to release funds that have been validated and accumulated through prior data submitted in Form GSTR-1 (details of outward supplies) and Form GSTR-3B (summary return and tax payment). Any discrepancy, error, or delay in these monthly/quarterly returns will automatically halt or complicate the refund process. Mastering ITC refunds, therefore, begins with mastering monthly GST compliance.</p>
              <h5 className="font-semibold mt-4 mb-1">The Process (Form GST RFD-01)</h5>
              <p>The detailed procedure for claiming a refund of accumulated ITC is as follows:</p>
              <ol className="list-decimal ml-6 mb-2">
                <li><b>File Form GST RFD-01 on the GST Portal:</b> Log in to the portal and navigate to 'Services' &gt; 'Refunds' &gt; 'Application for Refund'. Select the refund type: 'Refund of ITC on Export of Goods &amp; Services without Payment of Tax'. Select the financial year and the tax period for which the refund is being claimed. An applicant can club multiple tax periods into a single refund application.</li>
                <li><b>Provide Details in the Online Form:</b> The application requires the user to enter the turnover of zero-rated supplies (i.e., the value of exports) and the adjusted total turnover for the relevant period. The Net ITC available will be auto-populated in a table from the GSTR-3B returns filed for that period. The applicant can edit these values downwards if necessary, but not upwards. This ITC must exclude credit on capital goods and any credit already claimed as a refund under other provisions. Based on the formula prescribed in the GST rules, the system will auto-calculate the maximum eligible refund amount.</li>
                <li><b>Upload Supporting Documents:</b> The most critical part of the application is providing the details of export invoices in a prescribed statement format (Statement 3). This is done by downloading an offline utility, filling it with invoice details, and uploading the generated JSON file. The system validates the invoice details uploaded in the statement against the data declared in the GSTR-1 returns for the corresponding period. The application cannot be filed if there are validation errors. For the export of goods, details of the Shipping Bill and Export General Manifest (EGM) are required. For the export of services, a Bank Realisation Certificate (BRC) or Foreign Inward Remittance Certificate (FIRC) from the bank is required as proof of receipt of foreign exchange.</li>
                <li><b>Submission, Verification, and Tracking:</b> Select the bank account for the refund credit. File the application using DSC or EVC. An ARN will be generated. The application is then assigned to a jurisdictional refund processing officer for scrutiny. The status can be monitored on the portal using the 'Track Application Status' feature.</li>
              </ol>
              <p>To ease working capital constraints, the law provides for a provisional refund of up to 90% of the claimed amount. This provisional refund is typically sanctioned within 7 days of the acknowledgment of the refund application, with the final 10% being released after detailed verification.</p>
            </section>
          </section>
          {/* Part III */}
          <section id="part-3" className="mb-8">
            <h2 className="text-lg font-bold mb-3">Part III: Gaining a Competitive Edge with Export Promotion</h2>
            <section id="3-1" className="mb-6">
              <h3 className="text-base font-semibold mb-2">Section 4: Joining the Club: Registration-cum-Membership Certificate (RCMC)</h3>
              <h4 className="font-semibold mt-4 mb-2">4.1. The Strategic Value of an RCMC: Accessing Benefits and Building Credibility</h4>
              <p>Beyond the foundational IEC and GST registrations, the Registration-cum-Membership Certificate (RCMC) is a critical credential that transitions an exporter from being merely compliant to being strategically positioned to leverage government support. An RCMC is a certificate issued by a competent authority—typically an Export Promotion Council (EPC), Commodity Board, or a Development Authority—that validates an exporter's registration and membership with that body.</p>
              <p>Obtaining an RCMC is mandatory for any exporter wishing to claim benefits under India's Foreign Trade Policy (FTP). Its strategic value is multi-faceted:</p>
              <ul className="list-disc ml-6 mb-2">
                <li><b>Access to Export Promotion Schemes:</b> An RCMC is a non-negotiable prerequisite for availing benefits under key export promotion schemes. These include:
                  <ul className="list-disc ml-6">
                    <li>Remission of Duties and Taxes on Exported Products (RoDTEP): A scheme that refunds embedded central, state, and local duties/taxes.</li>
                    <li>Export Promotion Capital Goods (EPCG) Scheme: Allows duty-free import of capital goods for producing export products.</li>
                    <li>Advance Authorisation Scheme: Allows duty-free import of inputs that are physically incorporated into an export product.</li>
                  </ul>
                </li>
                <li><b>Facilitation and Support:</b>
                  <ul className="list-disc ml-6">
                    <li>Customs Clearance: An RCMC can facilitate smoother customs clearance as it serves as proof of the exporter's legitimacy and compliance with a recognized authority.</li>
                    <li>Exporting Restricted Goods: It can make it easier to obtain licenses for exporting goods that are on the restricted list.</li>
                  </ul>
                </li>
                <li><b>Market Development and Intelligence:</b>
                  <ul className="list-disc ml-6">
                    <li>Trade Fairs and Exhibitions: EPCs regularly organize or participate in international trade fairs, buyer-seller meets, and trade delegations. RCMC holders can participate in these events at subsidized rates, providing invaluable exposure to global markets.</li>
                    <li>Market Information: Members receive access to vital market intelligence reports, trend analyses, and information on regulatory changes in foreign markets.</li>
                  </ul>
                </li>
                <li><b>Enhanced Credibility:</b> An RCMC enhances the exporter's credibility and reputation. It acts as a testament to their compliance with government regulations and standards, building trust with international buyers, financial institutions (for trade finance), and other stakeholders.</li>
              </ul>
              <h4 className="font-semibold mt-6 mb-2">4.2. Choosing Your Council: A Guide to Selecting the Right EPC or Commodity Board</h4>
              <p>The choice of the registering authority for an RCMC is determined by the exporter's main line of business. Each EPC and Commodity Board is responsible for promoting a specific group of products. For example, an exporter of engineering goods must register with EEPC India, while a textile exporter would register with a council like the Apparel Export Promotion Council (AEPC).</p>
              <p>A significant challenge for new exporters, especially those dealing with diverse products, is identifying the correct council. Applying to the wrong authority can lead to rejection and delays. For businesses that export a variety of products cutting across different sectors, or for products for which no specific council exists, the Federation of Indian Export Organisations (FIEO) is the designated authority to issue the RCMC.</p>
              <p>To simplify this critical decision, the following table provides a quick-reference guide to some of India's major Export Promotion Councils and Commodity Boards.</p>
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border text-xs md:text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-2 py-1">S.No.</th>
                      <th className="border px-2 py-1">Name of Council/Board (Abbreviation)</th>
                      <th className="border px-2 py-1">Primary Product Category/Sector</th>
                      <th className="border px-2 py-1">Governing Ministry/Dept.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border px-2 py-1">1</td><td className="border px-2 py-1">Agricultural and Processed Food Products Export Development Authority (APEDA)</td><td className="border px-2 py-1">Processed foods, fruits, vegetables, livestock products, cereals</td><td className="border px-2 py-1">Ministry of Commerce &amp; Industry</td></tr>
                    <tr><td className="border px-2 py-1">2</td><td className="border px-2 py-1">Apparel Export Promotion Council (AEPC)</td><td className="border px-2 py-1">All types of readymade garments (textiles)</td><td className="border px-2 py-1">Ministry of Textiles</td></tr>
                    <tr><td className="border px-2 py-1">3</td><td className="border px-2 py-1">Basic Chemicals, Cosmetics and Dyes Export Promotion Council (CHEMEXCIL)</td><td className="border px-2 py-1">Dyes, basic inorganic &amp; organic chemicals, cosmetics, toiletries</td><td className="border px-2 py-1">Ministry of Commerce &amp; Industry</td></tr>
                    <tr><td className="border px-2 py-1">4</td><td className="border px-2 py-1">Carpet Export Promotion Council (CEPC)</td><td className="border px-2 py-1">All types of handmade/knotted carpets, rugs, and floor coverings</td><td className="border px-2 py-1">Ministry of Textiles</td></tr>
                    <tr><td className="border px-2 py-1">5</td><td className="border px-2 py-1">Chemicals and Allied Products Export Promotion Council (CAPEXIL)</td><td className="border px-2 py-1">Rubber products, glass, ceramics, paper products, auto parts</td><td className="border px-2 py-1">Ministry of Commerce &amp; Industry</td></tr>
                    <tr><td className="border px-2 py-1">6</td><td className="border px-2 py-1">Council for Leather Exports (CLE)</td><td className="border px-2 py-1">Finished leather, leather footwear, leather garments, and goods</td><td className="border px-2 py-1">Ministry of Commerce &amp; Industry</td></tr>
                    <tr><td className="border px-2 py-1">7</td><td className="border px-2 py-1">EEPC India (formerly Engineering Export Promotion Council)</td><td className="border px-2 py-1">All engineering goods, from iron &amp; steel products to industrial machinery and automobiles</td><td className="border px-2 py-1">Ministry of Commerce &amp; Industry</td></tr>
                    <tr><td className="border px-2 py-1">8</td><td className="border px-2 py-1">Export Promotion Council for Handicrafts (EPCH)</td><td className="border px-2 py-1">All types of handicrafts (excluding gems, jewellery, and carpets)</td><td className="border px-2 py-1">Ministry of Textiles</td></tr>
                    <tr><td className="border px-2 py-1">9</td><td className="border px-2 py-1">Federation of Indian Export Organisations (FIEO)</td><td className="border px-2 py-1">Multi-product exporters; products not covered by other EPCs</td><td className="border px-2 py-1">Ministry of Commerce &amp; Industry</td></tr>
                    <tr><td className="border px-2 py-1">10</td><td className="border px-2 py-1">Gem and Jewellery Export Promotion Council (GJEPC)</td><td className="border px-2 py-1">Cut &amp; polished diamonds, gemstones, gold and other precious metal jewellery</td><td className="border px-2 py-1">Ministry of Commerce &amp; Industry</td></tr>
                    <tr><td className="border px-2 py-1">11</td><td className="border px-2 py-1">Marine Products Export Development Authority (MPEDA)</td><td className="border px-2 py-1">Fish and fish products, seafood</td><td className="border px-2 py-1">Ministry of Commerce &amp; Industry</td></tr>
                    <tr><td className="border px-2 py-1">12</td><td className="border px-2 py-1">Pharmaceutical Export Promotion Council of India (PHARMEXCIL)</td><td className="border px-2 py-1">Drugs, pharmaceuticals, APIs, biologics, herbal products</td><td className="border px-2 py-1">Ministry of Commerce &amp; Industry</td></tr>
                    <tr><td className="border px-2 py-1">13</td><td className="border px-2 py-1">The Plastics Export Promotion Council (PLEXCONCIL)</td><td className="border px-2 py-1">Plastic raw materials, films, sheets, and consumer goods</td><td className="border px-2 py-1">Ministry of Commerce &amp; Industry</td></tr>
                    <tr><td className="border px-2 py-1">14</td><td className="border px-2 py-1">Services Export Promotion Council (SEPC)</td><td className="border px-2 py-1">All types of services (IT, healthcare, tourism, education, etc.)</td><td className="border px-2 py-1">Ministry of Commerce &amp; Industry</td></tr>
                    <tr><td className="border px-2 py-1">15</td><td className="border px-2 py-1">Spices Board</td><td className="border px-2 py-1">All scheduled spices (cardamom, pepper, chili, ginger, turmeric, etc.)</td><td className="border px-2 py-1">Ministry of Commerce &amp; Industry</td></tr>
                    <tr><td className="border px-2 py-1">16</td><td className="border px-2 py-1">The Cotton Textiles Export Promotion Council (TEXPROCIL)</td><td className="border px-2 py-1">Cotton yarn, fabrics, and made-ups</td><td className="border px-2 py-1">Ministry of Textiles</td></tr>
                  </tbody>
                </table>
                <p className="text-xs mt-2">(This table is representative and not exhaustive. A full list can be found on the DGFT website. All applications are processed via the DGFT portal)</p>
              </div>
              <h4 className="font-semibold mt-6 mb-2">4.3. The Unified Application Process: Applying for RCMC on the DGFT Common Portal</h4>
              <p>In a significant move to streamline procedures, the application process for RCMC for most councils has been standardized and centralized on the DGFT's common digital platform, known as the e-RCMC module. This eliminates the need to apply on different council websites and creates a unified, contactless system.</p>
              <h5 className="font-semibold mt-4 mb-1">Prerequisites</h5>
              <p>Before initiating the application, an exporter must ensure they have a valid and updated Importer-Exporter Code (IEC) linked to their DGFT portal account. Any mismatch in the business details (name, address, directors) between the IEC profile and the RCMC application is a primary cause of processing delays and must be rectified beforehand.</p>
              <h5 className="font-semibold mt-4 mb-1">Step-by-Step Guide to Applying for e-RCMC</h5>
              <p>The online process is as follows:</p>
              <ol className="list-decimal ml-6 mb-2">
                <li><b>Login to the DGFT Portal:</b> Visit <a href="https://www.dgft.gov.in" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">dgft.gov.in</a> and log in using the username and password linked to the IEC.</li>
                <li><b>Navigate to the e-RCMC Module:</b> From the dashboard or top menu, go to 'Services' -&gt; 'e-RCMC' -&gt; 'Apply for e-RCMC'.</li>
                <li><b>Start a Fresh Application:</b> The system will prompt to either start a new application or continue with a saved draft. Select 'Start Fresh Application'.</li>
                <li><b>Fill in Application Details:</b> Select Council: From a dropdown list, select the appropriate Export Promotion Council or Commodity Board (e.g., FIEO, EEPC, APEDA). Fee Details: The system will display the applicable membership fee based on the selected council and potentially the exporter's turnover. Fill Form: Complete the online application form with all required details, including main line of business, export products (with HS codes), and details of authorized representatives.</li>
                <li><b>Upload Documents and Pay Fee:</b> Upload scanned copies of the required documents. The standard documents include:
                  <ul className="list-disc ml-6">
                    <li>IEC Certificate</li>
                    <li>PAN Card of the entity</li>
                    <li>GST Registration Certificate</li>
                    <li>Proof of business constitution (e.g., Certificate of Incorporation for companies, Partnership Deed for firms)</li>
                    <li>A certificate from a Chartered Accountant certifying the export turnover of the preceding financial year (or a NIL certificate for new exporters).</li>
                  </ul>
                  After uploading, proceed to the payment gateway and pay the membership fee online. Fees vary significantly by council and are often tiered based on export turnover.
                </li>
                <li><b>Submission and Receipt of Certificate:</b> Sign the application digitally using DSC or Aadhaar e-sign and submit. The application is then electronically sent to the chosen EPC for processing. The typical processing timeline is 5-7 working days if all documents are in perfect order. However, if the council requires clarifications or additional documents, the process can extend to 3-4 weeks. Once approved, the RCMC is issued digitally. The exporter will receive an email notification and can download the certificate directly from their DGFT portal dashboard.</li>
              </ol>
              <h5 className="font-semibold mt-4 mb-1">Validity and Renewal</h5>
              <p>The RCMC is generally valid for a period of five financial years. It must be renewed before its expiry to ensure the continuity of benefits under the FTP. The renewal process is also done online through the same e-RCMC portal.</p>
            </section>
          </section>
          {/* Part V */}
          <section id="part-5" className="mb-8">
            <h2 className="text-lg font-bold mb-3">Part V: Understanding the Broader Regulatory and Digital Landscape</h2>
            <section id="5-1" className="mb-6">
              <h3 className="text-base font-semibold mb-2">Section 7: The Exporter's Digital Toolkit: A Deeper Dive into Essential Government Portals</h3>
              <h4 className="font-semibold mt-4 mb-2">7.1. The DGFT Portal (dgft.gov.in): Your Policy and Licensing Hub</h4>
              <p>The Directorate General of Foreign Trade (DGFT) portal is the nerve center for an exporter's licensing and policy-related compliance. It is the single source for initiating the most critical registrations that define an exporter's legal ability to trade. Its primary functions include the online application, management, and annual updation of the Importer-Exporter Code (IEC), and it hosts the common e-RCMC platform for registering with Export Promotion Councils. Furthermore, it is the designated portal for applying for benefits under major export promotion schemes like the Export Promotion Capital Goods (EPCG) scheme and Advance Authorisation.</p>
              <p>Beyond these transactional services, the DGFT portal is an invaluable knowledge resource. The 'Learn' section contains a wealth of information, including detailed Application Help Guides and FAQs, e-learning videos on international trade basics, and comprehensive handbooks on various policies, making it an essential self-help tool for new exporters.</p>
              <h4 className="font-semibold mt-6 mb-2">7.2. The ICEGATE Portal (icegate.gov.in): Your Customs Clearance Gateway</h4>
              <p>The Indian Customs Electronic Data Interchange Gateway (ICEGATE) is the national portal of the Central Board of Indirect Taxes and Customs (CBIC) and the operational backbone for all customs clearance procedures. Every electronic document and declaration related to the physical movement of goods across India's borders is filed through this portal.</p>
              <h5 className="font-semibold mt-4 mb-1">Functionality and Services</h5>
              <ul className="list-disc ml-6 mb-2">
                <li><b>E-filing of Shipping Bills:</b> This is the primary export declaration document, and its electronic filing is mandatory.</li>
                <li><b>E-payment of Customs Duties:</b> Secure online payment of any applicable export duties.</li>
                <li><b>Real-time Document Tracking:</b> Exporters can track the status of their shipping bills and other documents as they are processed by the customs authorities.</li>
                <li><b>IGST Refund Processing:</b> The portal is integrated with the GST Network (GSTN) to facilitate the automated processing of IGST refunds for exporters who ship goods with payment of tax.</li>
                <li><b>Online Scheme Verification:</b> It allows for the online verification of licenses issued under schemes like DEPB and EPCG.</li>
              </ul>
              <h5 className="font-semibold mt-4 mb-1">The ICEGATE-GSTN-DGFT Triangle</h5>
              <p>Successful and timely customs clearance is not merely about filing a correct Shipping Bill on ICEGATE. It is critically dependent on the seamless and error-free flow of data from two other independent systems: the DGFT portal and the GST Network. ICEGATE acts as the operational convergence point where an exporter's registration data (from DGFT), tax data (from GSTN), and shipment data must align perfectly for a consignment to be processed and for financial benefits like refunds to be triggered.</p>
              <ol className="list-decimal ml-6 mb-2">
                <li>When an exporter files a Shipping Bill on ICEGATE, the IEC number mentioned is validated in real-time against the DGFT's database. An inactive or incorrect IEC will immediately halt the process.</li>
                <li>The GSTIN and invoice details on the Shipping Bill are transmitted to the GSTN. This data is crucial for validating the export and processing any IGST refund. Any mismatch between the invoice data on the Shipping Bill and the data reported in the exporter's GSTR-1 return will lead to refund delays or rejection.</li>
                <li>Benefits under schemes like RoDTEP are also claimed directly on the Shipping Bill. The eligibility and processing of these benefits are managed through the integrated ICEGATE system.</li>
              </ol>
              <p>Therefore, ICEGATE is the "moment of truth" for an exporter's data integrity. It is not just a filing platform but an integration and validation engine. A proactive best practice for exporters is to conduct a pre-filing data audit, meticulously comparing their official IEC profile, GST registration details, and the data intended for the Shipping Bill to identify and rectify any inconsistencies before they cause costly delays at the port.</p>
              <h5 className="font-semibold mt-4 mb-1">Registration on ICEGATE</h5>
              <ol className="list-decimal ml-6 mb-2">
                <li>Visiting the ICEGATE portal and initiating registration.</li>
                <li>Providing the IEC and GSTIN.</li>
                <li>Crucially, the mobile number and email ID used for ICEGATE registration must be the same as those registered with the GSTN and DGFT portals. If they differ, the details must first be updated on the other portals before proceeding with ICEGATE registration.</li>
                <li>The registration is completed using OTP verification and may require a Digital Signature Certificate (DSC).</li>
              </ol>
              <h4 className="font-semibold mt-6 mb-2">7.3. The GST Portal (gst.gov.in): Your Tax Compliance Engine</h4>
              <p>The GST portal is the comprehensive platform for all GST-related compliance. As detailed in Section 3, its primary functions for an exporter include obtaining the initial GST registration, filing monthly or quarterly returns (GSTR-1 and GSTR-3B), applying for and furnishing the Letter of Undertaking (LUT) for zero-rated exports, and filing applications (Form GST RFD-01) for the refund of accumulated Input Tax Credit.</p>
              <h4 className="font-semibold mt-6 mb-2">7.4. The FoSCoS Portal (foscos.fssai.gov.in): Your Food Safety Gateway</h4>
              <p>The Food Safety Compliance System (FoSCoS) is the dedicated FSSAI portal for all food business licensing and registration in India. As covered in Section 5, food exporters must use this portal to apply for their mandatory Central License. The portal is designed to be user-friendly and provides extensive resources, including detailed user manuals for various processes and multilingual support in several regional languages, in addition to English and Hindi.</p>
            </section>
            <section id="5-2" className="mb-6">
              <h3 className="text-base font-semibold mb-2">Section 8: Core Legislations and Policies Shaping Your Business</h3>
              <h4 className="font-semibold mt-4 mb-2">8.1. The Foreign Trade Policy (FTP) 2023: A Strategic Overview</h4>
              <p>The Foreign Trade Policy (FTP) 2023, formulated and implemented by the DGFT, provides the overarching strategic framework for India's foreign trade. It outlines the government's vision and the supportive measures designed to boost exports and enhance the ease of doing business. The key highlights of FTP 2023 include:</p>
              <ul className="list-disc ml-6 mb-2">
                <li><b>A Shift from Incentives to Remission:</b> In alignment with WTO norms, the policy has moved away from direct export subsidies towards a remission-based regime. Schemes like RoDTEP and RoSCTL are designed to refund various embedded taxes and duties that are not credited under the GST framework, thereby ensuring that taxes are not exported.</li>
                <li><b>Focus on Ease of Doing Business:</b> A core objective is to reduce transaction costs and time through digitalization, online approvals, and process re-engineering.</li>
                <li><b>Dynamic and Responsive Framework:</b> A significant departure from the past, FTP 2023 does not have a fixed five-year "sunset" clause. This allows the government to make continuous and responsive changes to the policy as and when required, based on industry feedback and evolving global trade dynamics.</li>
                <li><b>New Thrust Areas:</b> The policy introduces new focus areas to boost exports, including:
                  <ul className="list-disc ml-6">
                    <li>Districts as Export Hubs: An initiative to decentralize export promotion by identifying and developing export potential at the district level.</li>
                    <li>Promoting E-commerce Exports: Creating a facilitative framework and extending FTP benefits to e-commerce exports to tap into the growing global digital marketplace.</li>
                    <li>Merchanting Trade: Allowing Indian intermediaries to facilitate trade between two foreign countries without the goods touching Indian ports, subject to RBI guidelines.</li>
                  </ul>
                </li>
              </ul>
              <h4 className="font-semibold mt-6 mb-2">8.2. The Customs Act, 1962: Key Provisions and Penalties for Exporters</h4>
              <p>The Customs Act, 1962, is the principal legislation that governs the import and export of goods, administered by the CBIC. It provides the legal basis for all customs procedures, including the levy of duties, inspection of goods, and penalties for violations.</p>
              <ol className="list-decimal ml-6 mb-2">
                <li>Filing of the Shipping Bill: The exporter or their Customs House Agent (CHA) files a Shipping Bill, which is the primary declaration of the goods being exported, on the ICEGATE portal.</li>
                <li>Assessment and Examination: Customs officers assess the Shipping Bill and may conduct a physical examination of the goods to verify the declaration.</li>
                <li>"Let Export Order": Once the verification is complete and all regulations are met, the customs officer issues a "Let Export Order," which permits the goods to be loaded onto the vessel or aircraft for export.</li>
              </ol>
              <p>Non-compliance with the provisions of the Customs Act can attract severe penalties. Section 113 of the Act lists the conditions under which goods are liable for confiscation, such as attempting to export prohibited goods or making a fraudulent declaration. Section 114 prescribes the penalties for such improper exportation:</p>
              <ul className="list-disc ml-6 mb-2">
                <li>For prohibited goods, the penalty can be up to five times the value of the goods.</li>
                <li>For dutiable goods, the penalty can be up to five times the duty sought to be evaded.</li>
                <li>For goods under a claim for drawback, the penalty can be up to five times the amount of drawback claimed.</li>
              </ul>
              <h4 className="font-semibold mt-6 mb-2">8.3. The Foreign Exchange Management Act (FEMA), 1999: Rules on Export Proceeds</h4>
              <p>FEMA, administered by the RBI, governs all transactions involving foreign exchange. Its primary aim is to facilitate external trade and payments while ensuring the stability of India's foreign exchange market. The key compliance requirements for exporters under FEMA are:</p>
              <ul className="list-disc ml-6 mb-2">
                <li><b>FEMA Declaration:</b> It is mandatory for exporters to make a declaration in the prescribed form (usually as part of the Shipping Bill) to the customs authorities. This declaration confirms that the full value of the exports will be realized and repatriated to India.</li>
                <li><b>Realization of Export Proceeds:</b> The most critical rule under FEMA for exporters is the timeline for payment realization. The full value of the exported goods or services must be received in foreign currency and brought into India within nine months from the date of export. For goods exported to a warehouse established outside India, the proceeds must be realized within fifteen months.</li>
                <li><b>Authorized Dealer Channels:</b> All export-related foreign exchange transactions, including the receipt of payments, must be routed through an Authorized Dealer (AD), which is typically a bank authorized by the RBI to deal in foreign exchange.</li>
              </ul>
              <p>Failure to comply with these FEMA regulations can result in penalties and legal action by the Enforcement Directorate.</p>
            </section>
          </section>
          {/* Part VI */}
          <section id="part-6" className="mb-8">
            <h2 className="text-lg font-bold mb-3">Part VI: A Practical Exporter's Checklist and Final Recommendations</h2>
            <section id="6-1" className="mb-6">
              <h3 className="text-base font-semibold mb-2">Section 9: A Practical Exporter's Checklist and Final Recommendations</h3>
              <h4 className="font-semibold mt-4 mb-2">9.1. The Ultimate Registration Checklist: A Sequential Action Plan</h4>
              <p>Navigating the multifaceted registration landscape can be streamlined with a clear, sequential checklist. The following table consolidates the entire registration and compliance journey into a single, actionable matrix. It serves as a practical worksheet for a new exporter to track their progress and understand the key requirements at each stage.</p>
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border text-xs md:text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-2 py-1">Step</th>
                      <th className="border px-2 py-1">Registration/Compliance Task</th>
                      <th className="border px-2 py-1">Purpose &amp; Importance</th>
                      <th className="border px-2 py-1">Governing Body</th>
                      <th className="border px-2 py-1">Primary Portal/Website</th>
                      <th className="border px-2 py-1">Typical Timeline</th>
                      <th className="border px-2 py-1">Key Documents</th>
                      <th className="border px-2 py-1">Approx. Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border px-2 py-1">1</td><td className="border px-2 py-1">Business Establishment &amp; PAN</td><td className="border px-2 py-1">Forms the legal and tax identity of the enterprise. Prerequisite for all other steps.</td><td className="border px-2 py-1">Registrar of Companies / State Authority &amp; Income Tax Dept.</td><td className="border px-2 py-1">Varies / IT Portal</td><td className="border px-2 py-1">1-15 days</td><td className="border px-2 py-1">Incorporation/Registration Docs</td><td className="border px-2 py-1">Varies</td></tr>
                    <tr><td className="border px-2 py-1">2</td><td className="border px-2 py-1">Open Current Bank Account</td><td className="border px-2 py-1">Essential for all business transactions, especially foreign exchange.</td><td className="border px-2 py-1">Reserve Bank of India (via AD Bank)</td><td className="border px-2 py-1">Respective Bank</td><td className="border px-2 py-1">3-7 days</td><td className="border px-2 py-1">Business &amp; PAN Proof</td><td className="border px-2 py-1">Nil</td></tr>
                    <tr><td className="border px-2 py-1">3</td><td className="border px-2 py-1">Obtain Importer-Exporter Code (IEC)</td><td className="border px-2 py-1">Mandatory 10-digit code for all import/export activities. Unlocks global trade.</td><td className="border px-2 py-1">DGFT</td><td className="border px-2 py-1">dgft.gov.in</td><td className="border px-2 py-1">1-3 working days</td><td className="border px-2 py-1">PAN, Address Proof, Bank Proof</td><td className="border px-2 py-1">INR 500</td></tr>
                    <tr><td className="border px-2 py-1">4</td><td className="border px-2 py-1">GST Registration</td><td className="border px-2 py-1">Mandatory for all exporters to comply with tax laws and claim refunds.</td><td className="border px-2 py-1">CBIC / GST Council</td><td className="border px-2 py-1">gst.gov.in</td><td className="border px-2 py-1">3-10 working days</td><td className="border px-2 py-1">PAN, Aadhaar, Business Proof</td><td className="border px-2 py-1">Nil (Govt. Fee)</td></tr>
                    <tr><td className="border px-2 py-1">5</td><td className="border px-2 py-1">File Letter of Undertaking (LUT)</td><td className="border px-2 py-1">Allows export of goods/services without upfront payment of IGST, saving working capital.</td><td className="border px-2 py-1">CBIC / GST Council</td><td className="border px-2 py-1">gst.gov.in</td><td className="border px-2 py-1">Instant (ARN Generation)</td><td className="border px-2 py-1">GST Registration</td><td className="border px-2 py-1">Nil</td></tr>
                    <tr><td className="border px-2 py-1">6</td><td className="border px-2 py-1">Obtain RCMC</td><td className="border px-2 py-1">Mandatory for availing benefits under the Foreign Trade Policy (FTP).</td><td className="border px-2 py-1">Respective EPC / Commodity Board</td><td className="border px-2 py-1">dgft.gov.in (e-RCMC)</td><td className="border px-2 py-1">1-4 weeks</td><td className="border px-2 py-1">IEC, GST Cert., CA Cert. of Turnover</td><td className="border px-2 py-1">Varies by Council (INR 7k - 60k+)</td></tr>
                    <tr><td className="border px-2 py-1">7</td><td className="border px-2 py-1">Obtain Sector-Specific License (e.g., FSSAI)</td><td className="border px-2 py-1">Mandatory for exporting specific products like food, ensuring quality and safety standards.</td><td className="border px-2 py-1">Sectoral Body (e.g., FSSAI, Spices Board)</td><td className="border px-2 py-1">Respective Portal (e.g., foscos.fssai.gov.in)</td><td className="border px-2 py-1">1-2 months</td><td className="border px-2 py-1">Varies widely by sector</td><td className="border px-2 py-1">Varies (e.g., INR 7,500 for FSSAI)</td></tr>
                    <tr><td className="border px-2 py-1">8</td><td className="border px-2 py-1">ICEGATE Registration</td><td className="border px-2 py-1">Mandatory for electronic filing of customs documents (Shipping Bill).</td><td className="border px-2 py-1">CBIC</td><td className="border px-2 py-1">icegate.gov.in</td><td className="border px-2 py-1">1-3 working days</td><td className="border px-2 py-1">IEC, GSTIN, DSC</td><td className="border px-2 py-1">Nil</td></tr>
                    <tr><td className="border px-2 py-1">9</td><td className="border px-2 py-1">Annual IEC Updation</td><td className="border px-2 py-1">Mandatory annual compliance to keep the IEC status 'Active'.</td><td className="border px-2 py-1">DGFT</td><td className="border px-2 py-1">dgft.gov.in</td><td className="border px-2 py-1">Annually (Apr-Jun)</td><td className="border px-2 py-1">-</td><td className="border px-2 py-1">Nil</td></tr>
                  </tbody>
                </table>
              </div>
              <h4 className="font-semibold mt-6 mb-2">9.2. Overcoming Common Hurdles: Practical Solutions for New Exporters</h4>
              <ul className="list-disc ml-6 mb-2">
                <li><b>Challenge: Regulatory Complexity and Paperwork Overload</b>
                  <ul className="list-disc ml-6">
                    <li>The labyrinth of forms, documents, and compliance requirements across multiple portals can be overwhelming.</li>
                    <li><b>Practical Solution:</b> Use this playbook as a foundational guide. Create a master data sheet with all verified business information to ensure consistency across all applications. For recurring orders, develop standardized document templates. For complex areas like customs classification (HS Codes) or legal interpretations, do not hesitate to engage professional help from Chartered Accountants, Customs House Agents (CHAs), or trade consultants. Leveraging export management software can also automate and streamline documentation.</li>
                  </ul>
                </li>
                <li><b>Challenge: The Knowledge Gap</b>
                  <ul className="list-disc ml-6">
                    <li>Many entrepreneurs venture into exporting without a full understanding of the intricate processes, leading to costly errors.</li>
                    <li><b>Practical Solution:</b> Invest time in self-education. The DGFT's 'Learn' section, the Niryat Bandhu Scheme, and training programs offered by various Export Promotion Councils are excellent, often free, resources. Actively participating in industry seminars and webinars can provide practical insights and networking opportunities.</li>
                  </ul>
                </li>
                <li><b>Challenge: Infrastructure and Logistics Bottlenecks</b>
                  <ul className="list-disc ml-6">
                    <li>Even with perfect documentation, delays can occur due to port congestion, poor last-mile connectivity, and inefficient logistics.</li>
                    <li><b>Practical Solution:</b> A reliable logistics partner is not an expense but an investment. Partner with established freight forwarders and licensed Customs House Agents (CHAs). They possess the on-ground knowledge to navigate port procedures efficiently, anticipate potential issues, and ensure smoother customs clearance, which can significantly reduce transit times and costs.</li>
                  </ul>
                </li>
              </ul>
              <h4 className="font-semibold mt-6 mb-2">9.3. The Path Forward: Maintaining Compliance and Leveraging Registrations for Growth</h4>
              <ul className="list-disc ml-6 mb-2">
                <li><b>Maintain a Compliance Calendar:</b> Mark key dates for annual updates (IEC), renewals (RCMC, FSSAI), and periodic return filings (GST). Missing these deadlines can lead to deactivation of licenses and suspension of benefits.</li>
                <li><b>Embrace Digital Tools:</b> Actively use the digital portals not just for filing but for tracking and monitoring. The real-time status updates available on ICEGATE and the GST portal provide valuable visibility into the supply chain and financial flows.</li>
                <li><b>View Registrations as Assets:</b> Ultimately, these registrations should be viewed not as bureaucratic burdens but as foundational assets. A valid IEC, GSTIN, RCMC, and FSSAI license are marks of a credible, compliant, and trustworthy business. They build confidence with international buyers, provide access to financial institutions, unlock government incentives, and create a solid foundation for sustainable growth in the competitive global marketplace.</li>
              </ul>
            </section>
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

export default Playbook14; 