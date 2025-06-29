import React from "react";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <>
  
        <div className="w-full px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 bg-white/90 rounded-none md:rounded-3xl shadow-none md:shadow-2xl py-8 md:py-14">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-center text-violet drop-shadow-lg bg-transparent">Terms of Service</h1>
          <div className="prose prose-base sm:prose-lg max-w-none mx-auto space-y-8" style={{ textAlign: 'justify' }}>
            <style>{`
              .prose h2 { font-weight: 800 !important; font-size: 2.25em !important; margin-top: 2em; margin-bottom: 1em; }
              .prose h3 { font-weight: 700 !important; font-size: 1.5em !important; margin-top: 1.5em; margin-bottom: 0.5em; }
              .prose h4 { font-weight: 700 !important; font-size: 1.25em !important; margin-top: 1.2em; margin-bottom: 0.4em; }
              .prose table { border-collapse: collapse; width: 100%; }
              .prose th, .prose td { border: 1px solid #e5e7eb; padding: 0.75em; }
              .prose thead tr { background: #7c3aed !important; color: #fff !important; }
              .prose tbody tr:nth-child(even) { background: #f3f4f6; }
              .prose tbody tr:nth-child(odd) { background: #fff; }
              .prose table { border-radius: 0.5em; overflow: hidden; }
            `}</style>
            <p>These Terms of Service ("Agreement" or "ToS") constitute a legally binding agreement between you ("User," "You," or "Client") and Drehill Private Limited, a company incorporated under the laws of India, with Corporate Identification Number (CIN) U62099MH2023PTC415659, having its registered office at Aurangabad, Maharashtra, 431001, India ("Drehill," "We," "Us," or "Our").<br/>This Agreement governs your access to and use of the website drehill.in (the "Website") and all associated services, including but not limited to Artificial Intelligence (AI), ServiceNow, Software Consulting, EXIM Consulting, and Enterprise Automation services (collectively, the "Services").</p>

            <h2>1. Preamble and Acceptance of Terms</h2>
            <p>By accessing the Website, creating an account, or using any of the Services, you acknowledge that you have read, understood, and agree to be bound by this Agreement in its entirety. If you do not agree with all of the terms and conditions of this Agreement, you are expressly prohibited from using the Website and the Services and must discontinue use immediately.<br/>This Agreement expressly incorporates by reference our <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. Your agreement to these ToS also signifies your acknowledgment and consent to the collection, use, and disclosure of your information as described in our Privacy Policy. If you are entering into this Agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to this Agreement, in which case the terms "User," "You," or "Client" shall refer to such entity.</p>

            <h2>2. Definitions</h2>
            <div className="overflow-x-auto my-6 rounded-lg border border-gray-200">
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-violet text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold border-b">Term</th>
                    <th className="px-4 py-3 font-semibold border-b">Definition</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  <tr className="even:bg-gray-50"><td className="px-4 py-3 align-top">Agreement</td><td className="px-4 py-3 align-top">Refers to these Terms of Service, including the Privacy Policy and any other documents expressly incorporated by reference.</td></tr>
                  <tr className="even:bg-gray-50"><td className="px-4 py-3 align-top">AI Systems</td><td className="px-4 py-3 align-top">Refers to the artificial intelligence models, algorithms, platforms, and software developed, owned, or licensed by Drehill.</td></tr>
                  <tr className="even:bg-gray-50"><td className="px-4 py-3 align-top">Client</td><td className="px-4 py-3 align-top">Refers to any User who engages Drehill for paid Services under a Statement of Work.</td></tr>
                  <tr className="even:bg-gray-50"><td className="px-4 py-3 align-top">Confidential Information</td><td className="px-4 py-3 align-top">Refers to any non-public information disclosed by one party to the other, whether orally or in writing, that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure. This includes, but is not limited to, business plans, financial data, customer lists, and proprietary technology.</td></tr>
                  <tr className="even:bg-gray-50"><td className="px-4 py-3 align-top">Deliverables</td><td className="px-4 py-3 align-top">Refers to the specific work products, such as software code, reports, configurations, or other materials, created by Drehill for a Client as part of the Services and specified in a Statement of Work.</td></tr>
                  <tr className="even:bg-gray-50"><td className="px-4 py-3 align-top">Intellectual Property (IP)</td><td className="px-4 py-3 align-top">Refers to all patents, copyrights, trademarks, trade secrets, trade names, logos, and any other proprietary rights, whether registered or unregistered, and all applications for the same.</td></tr>
                  <tr className="even:bg-gray-50"><td className="px-4 py-3 align-top">Personal Data</td><td className="px-4 py-3 align-top">Refers to any data about an individual who is identifiable by or in relation to such data, as defined under the Digital Personal Data Protection Act, 2023.</td></tr>
                  <tr className="even:bg-gray-50"><td className="px-4 py-3 align-top">Services</td><td className="px-4 py-3 align-top">Refers to the full range of services offered by Drehill, including but not limited to AI, ServiceNow, Software Consulting, EXIM Consulting, Enterprise Automation, and any other services provided through the Website or under a Statement of Work.</td></tr>
                  <tr className="even:bg-gray-50"><td className="px-4 py-3 align-top">ServiceNow Core Technology</td><td className="px-4 py-3 align-top">Refers to the ServiceNow platform, applications, APIs, documentation, and all other technology and intellectual property owned by ServiceNow, Inc. or its licensors.</td></tr>
                  <tr className="even:bg-gray-50"><td className="px-4 py-3 align-top">Statement of Work (SOW)</td><td className="px-4 py-3 align-top">Refers to a separate written document executed by Drehill and a Client that details the specific scope, timeline, fees, and deliverables for a particular paid service engagement.</td></tr>
                  <tr className="even:bg-gray-50"><td className="px-4 py-3 align-top">User</td><td className="px-4 py-3 align-top">Refers to any individual or entity who accesses or uses the Website or Services.</td></tr>
                  <tr className="even:bg-gray-50"><td className="px-4 py-3 align-top">User Content</td><td className="px-4 py-3 align-top">Refers to all data, information, text, and other materials that a User posts, uploads, or otherwise provides to the Website or in connection with the Services.</td></tr>
                  <tr className="even:bg-gray-50"><td className="px-4 py-3 align-top">Website</td><td className="px-4 py-3 align-top">Refers to the website located at drehill.in and all its associated pages and content.</td></tr>
                </tbody>
              </table>
            </div>
            <h2>3. Scope of Services & Statements of Work (SOW)</h2>
            <p>Drehill provides a range of specialized IT and consulting services, including but not limited to AI, ServiceNow, Software Consulting, EXIM Consulting, and Enterprise Automation. The information on the Website is for general informational purposes only.<br/>While this Agreement governs all use of the Website and general interactions, any specific, paid engagement for Services by a Client shall be governed by a separate, mutually executed Master Services Agreement ("MSA") and/or a detailed Statement of Work ("SOW"). Each SOW will outline the specific services to be provided, deliverables, project timelines, fees, and any terms specific to that engagement.<br/>In the event of any conflict or inconsistency between the terms of this Agreement and the terms of a signed SOW, the terms of the SOW shall prevail with respect to that specific engagement only.</p>

            <h2>4. Acceptable Use Policy (AUP)</h2>
            <p>As a condition of your use of the Website and Services, you agree not to use them for any purpose that is unlawful or prohibited by this Agreement. You are strictly prohibited from engaging in the following activities:</p>
            <ul>
              <li>Violating any applicable local, state, national, or international law or regulation, including but not limited to the IT Act, 2000.</li>
              <li>Infringing upon or violating our intellectual property rights or the intellectual property rights of others.</li>
              <li>Transmitting, distributing, or storing any material that is obscene, defamatory, threatening, harassing, abusive, or hateful.</li>
              <li>Uploading or transmitting viruses, worms, Trojan horses, or any other malicious code intended to disrupt, damage, or limit the functionality of any computer software, hardware, or telecommunications equipment.</li>
              <li>Attempting to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Website, the server on which the Website is stored, or any server, computer, or database connected to the Website. This includes probing, scanning, or testing the vulnerability of a system or network.</li>
              <li>Engaging in spamming, phishing, or sending unsolicited bulk commercial messages.</li>
              <li>Using the Services to develop a competing product or service or for any commercial enterprise without our express written consent.</li>
            </ul>
            <p>Drehill reserves the right, in its sole discretion, to investigate any suspected violation of this AUP and to suspend or terminate your access to the Website and Services without prior notice for any material breach of these terms.</p>

            <h2>5. Intellectual Property (IP) Rights</h2>
            <ul>
              <li><b>Drehill's Intellectual Property:</b> All content, features, and functionality on the Website, including but not limited to text, graphics, logos, icons, images, software, and the compilation thereof, as well as all pre-existing technologies, methodologies, and know-how owned by Drehill (collectively, "Drehill IP"), are the exclusive property of Drehill or its licensors and are protected by Indian and international copyright, trademark, and other intellectual property laws. You are granted no rights or licenses in or to the Drehill IP except as expressly set forth in this Agreement.</li>
              <li><b>User's Intellectual Property:</b> You retain all ownership rights in and to your User Content and any of your pre-existing intellectual property. You hereby grant Drehill a limited, non-exclusive, royalty-free, worldwide license to access, use, reproduce, and modify your User Content solely for the purpose of providing the Services to you. You represent and warrant that you have all necessary rights to grant us this license for any User Content you provide.</li>
              <li><b>Ownership of Deliverables:</b> The ownership of any custom work products or Deliverables created by Drehill for a Client will be explicitly defined in the applicable SOW. Unless otherwise agreed in the SOW, upon full and final payment of all associated fees by the Client, all rights, title, and interest in the newly created intellectual property within the Deliverables shall be assigned to the Client. Notwithstanding this assignment, Drehill shall retain ownership of all Drehill IP, including any pre-existing tools, methodologies, or code that may be incorporated into the Deliverables. In such cases, Drehill grants the Client a perpetual, non-exclusive, royalty-free license to use such incorporated Drehill IP solely as part of the Deliverables.</li>
                </ul>

            <h2>6. Confidentiality</h2>
            <p>Each party (the "Receiving Party") agrees to hold in strict confidence and not to disclose to any third party any Confidential Information of the other party (the "Disclosing Party"). The Receiving Party shall use the Confidential Information of the Disclosing Party solely for the purpose of performing its obligations under this Agreement.<br/>Confidential Information does not include information that: (a) is or becomes publicly known through no wrongful act of the Receiving Party; (b) was in the Receiving Party's lawful possession prior to the disclosure; (c) is lawfully disclosed to the Receiving Party by a third party without restriction on disclosure; or (d) is independently developed by the Receiving Party without use of or reference to the Disclosing Party's Confidential Information.<br/>The obligation of confidentiality shall survive the termination or expiration of this Agreement for a period of [e.g., three (3) years] thereafter, or indefinitely for trade secrets.</p>

            <h2>7. Data Protection and Privacy</h2>
            <p>Drehill is committed to protecting the privacy and security of your Personal Data. We process Personal Data in strict compliance with the Digital Personal Data Protection Act, 2023, the Information Technology Act, 2000, and all other applicable data protection laws in India.<br/>Our collection, use, storage, and protection of Personal Data are governed by our <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>, which is hereby incorporated into this Agreement by this reference. The Privacy Policy provides detailed information regarding the types of data we collect, the purposes of processing, your rights as a Data Principal (including rights to access, correction, and erasure), our data security measures, and our procedures for data breach notification. By agreeing to these ToS, you also provide your consent to the practices described in our Privacy Policy.</p>

            <h2>8. Fees, Payment, and Taxes</h2>
            <ul>
              <li>Fees for specific Services will be set forth in the applicable SOW or order form agreed upon between Drehill and the Client. Unless otherwise specified in an SOW:</li>
              <li>The Client shall pay all invoiced amounts within [e.g., thirty (30) days] from the date of the invoice.</li>
              <li>Late payments will be subject to an interest charge of [e.g., 1.5% per month] or the maximum rate permitted by applicable law, whichever is lower, on the outstanding balance.</li>
              <li>All fees are quoted exclusive of any applicable taxes, levies, duties, or similar governmental assessments, including but not limited to Goods and Services Tax (GST). The Client is responsible for paying all such taxes associated with its purchases hereunder, which will be added to the invoice as required by law.</li>
              <li>Drehill reserves the right to suspend Services for non-payment of due invoices.</li>
                </ul>

            <h2>9. Warranties and Disclaimers</h2>
            <ul>
              <li><b>Service Warranty:</b> Drehill warrants that it will perform all Services in a professional and workmanlike manner, consistent with generally accepted industry standards.</li>
              <li><b>Disclaimer:</b> EXCEPT FOR THE EXPRESS WARRANTY SET FORTH ABOVE, THE WEBSITE AND ALL SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. DREHILL EXPRESSLY DISCLAIMS ALL OTHER WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.</li>
              <li><b>No Guarantee of Results:</b> Drehill does not warrant or guarantee that the use of the Services will be uninterrupted or error-free, or that any specific results, profits, or outcomes will be achieved. The success of any project or consultation depends on numerous factors beyond Drehill's control, including the Client's own efforts and market conditions.</li>
              <li><b>Service-Specific Disclaimers:</b> Additional disclaimers specific to AI, ServiceNow, and EXIM Consulting services are detailed in Section III of this report and are incorporated herein.</li>
                </ul>

            <h2>10. Limitation of Liability</h2>
            <ul>
              <li><b>Exclusion of Indirect Damages:</b> In no event shall either party be liable to the other party for any indirect, incidental, special, punitive, or consequential damages, including but not limited to loss of profits, revenue, data, or business opportunities, even if advised of the possibility of such damages.</li>
              <li><b>Cap on Direct Damages:</b> Drehill's total aggregate liability to a Client arising out of or in connection with this Agreement or any SOW, whether in contract, tort (including negligence), or otherwise, shall not exceed the total fees paid by that Client to Drehill for the specific Services giving rise to the claim during the [e.g., twelve (12) month] period immediately preceding the event giving rise to such liability.</li>
              <li><b>Exceptions:</b> The limitations of liability set forth in this clause shall not apply to liability arising from: (a) a party's breach of its confidentiality obligations; (b) a party's indemnification obligations under this Agreement; or (c) a party's gross negligence or willful misconduct.</li>
            </ul>
            <p>This clause is intended to be a reasonable and conscionable allocation of risk between sophisticated commercial parties and is a fundamental element of the basis of the bargain between Drehill and its Clients.</p>

            <h2>11. Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless Drehill, its affiliates, and their respective officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or in any way connected with: (a) your breach of this Agreement; (b) your use of the Website or Services in violation of applicable laws or the terms herein; (c) your User Content, including any claim that it infringes upon the intellectual property or other rights of a third party; or (d) any negligence or willful misconduct on your part.</p>

            <h2>12. Term and Termination</h2>
            <ul>
              <li><b>Term:</b> This Agreement commences on the date you first accept it and continues as long as you use the Website or Services, unless terminated earlier as provided herein.</li>
              <li><b>Termination for Convenience:</b> Either party may terminate this general Agreement by providing [e.g., thirty (30) days] written notice to the other party. Termination of specific SOWs will be governed by the terms within those documents.</li>
              <li><b>Termination for Cause:</b> Drehill may terminate this Agreement and your access to the Services immediately, without prior notice, if you materially breach any provision of this Agreement, including the Acceptable Use Policy.</li>
              <li><b>Effect of Termination:</b> Upon termination of this Agreement for any reason, your right to use the Website and Services shall immediately cease. For any active SOWs, the Client shall promptly pay Drehill for all Services rendered and expenses incurred up to the effective date of termination. Provisions of this Agreement that by their nature should survive termination shall survive, including, without limitation, ownership provisions, warranty disclaimers, confidentiality obligations, indemnity, and limitations of liability.</li>
            </ul>

            <h2>13. Governing Law and Dispute Resolution</h2>
            <ul>
              <li><b>Governing Law:</b> This Agreement and any dispute arising out of or in connection with it shall be governed by and construed in accordance with the laws of the Republic of India, without giving effect to any choice or conflict of law provision or rule.</li>
              <li><b>Jurisdiction:</b> Subject to the arbitration clause below, the parties agree that the courts located in Aurangabad, Maharashtra, India, shall have exclusive jurisdiction to adjudicate any dispute arising out of or relating to this Agreement.</li>
              <li><b>Dispute Resolution:</b> The parties agree to resolve any dispute, controversy, or claim arising out of or relating to this Agreement through the following multi-tiered process:
                <ol>
                  <li>Good Faith Negotiation: The parties shall first attempt to resolve the dispute amicably through good faith negotiations between their authorized representatives.</li>
                  <li>Arbitration: If the dispute is not resolved through negotiation within [e.g., thirty (30) days], it shall be referred to and finally resolved by binding arbitration. The arbitration shall be seated in New Delhi, India. The arbitration shall be conducted in the English language by a sole arbitrator appointed in accordance with the rules of the Indian Dispute Resolution Centre (IDRC). The arbitration proceedings shall be governed by the Arbitration and Conciliation Act, 1996. The award of the arbitrator shall be final and binding on the parties.</li>
                </ol>
              </li>
            </ul>

            <h2>14. General Provisions</h2>
            <ul>
              <li><b>Entire Agreement:</b> This Agreement, together with the Privacy Policy and any applicable SOW, constitutes the entire agreement between the parties with respect to its subject matter and supersedes all prior or contemporaneous understandings, agreements, representations, and warranties, both written and oral.</li>
              <li><b>Severability:</b> If any provision of this Agreement is held by a court of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Agreement will continue in full force and effect.</li>
              <li><b>Waiver:</b> No waiver by Drehill of any term or condition set out in this Agreement shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition. Any failure of Drehill to assert a right or provision under this Agreement shall not constitute a waiver of such right or provision.</li>
              <li><b>Notices:</b> All notices, requests, consents, claims, demands, waivers, and other communications hereunder shall be in writing and addressed to the parties at their registered office addresses or such other address as may be designated by the receiving party in writing.</li>
              <li><b>Force Majeure:</b> Neither party shall be liable or responsible to the other party, nor be deemed to have defaulted under or breached this Agreement, for any failure or delay in fulfilling or performing any term of this Agreement, when and to the extent such failure or delay is caused by or results from acts beyond the impacted party's reasonable control, including, without limitation, acts of God, floods, fires, earthquakes, governmental actions, war, terrorist threats or acts, riots, or pandemics.</li>
              <li><b>Assignment:</b> You may not assign or transfer any of your rights or delegate any of your obligations under this Agreement without the prior written consent of Drehill. Any purported assignment or delegation in violation of this section is null and void.</li>
              <li><b>Relationship of the Parties:</b> Nothing in this Agreement creates any partnership, joint venture, employment, or agency relationship between the parties. Drehill is an independent contractor to its Clients.</li>
            </ul>

            <h2>Part III: Service-Specific Clauses and Disclaimers</h2>
            <h3>A. For AI and Enterprise Automation Services</h3>
            <h4>Clause 1: IP Ownership of AI-Generated Works</h4>
            <p>Client acknowledges that under current Indian intellectual property law, including the Copyright Act, 1957, and the Patents Act, 1970, a non-human entity such as an AI system cannot be recognized as an 'author' or 'inventor'. Therefore, to provide legal clarity, any intellectual property created through the use of Drehill's AI Systems during a service engagement ('AI-Generated Works') shall be contractually treated as a 'work made for hire.' Unless otherwise specified in a Statement of Work, all rights, title, and interest in the final, specific AI-Generated Works delivered to the Client shall vest entirely in the Client upon Drehill's receipt of full and final payment for the Services that created them. Drehill explicitly retains all intellectual property rights to its underlying AI models, algorithms, training data, and pre-existing technologies used to generate such works.</p>
            <h4>Clause 2: Disclaimer of Liability for Autonomous Systems</h4>
            <p>The performance, accuracy, and output of AI and Enterprise Automation systems are fundamentally dependent on the quality, accuracy, and completeness of the data provided by the Client ('Input Data') and the specific configurations requested by the Client. The Client is solely responsible for the Input Data and for reviewing and validating the output of any AI System. Drehill shall not be liable for any errors, inaccuracies, biases, or undesirable outcomes resulting from faulty, incomplete, or biased Input Data provided by the Client, or from the autonomous operation of the AI System based on such data. Drehill's liability is strictly limited to demonstrable negligence in the initial development and configuration of the system as per the specifications in the agreed-upon Statement of Work. The Client acknowledges that AI systems can produce unexpected or unforeseeable results, and the Client assumes the risk of using such autonomous systems in its business operations.</p>

            <h3>B. For ServiceNow Consulting Services</h3>
            <h4>Clause 3: Third-Party Platform Dependency and Disclaimer</h4>
            <p>Client acknowledges and agrees that Drehill's ServiceNow consulting services are intrinsically dependent on the continuous availability, performance, and functionality of the ServiceNow platform, which is owned, operated, and controlled by a third party, ServiceNow, Inc. Drehill is not responsible and shall have no liability for any service interruptions, performance degradation, data loss, security breaches, or changes in functionality caused by the ServiceNow platform itself, including any updates, upgrades, or infrastructure modifications made by ServiceNow, Inc. The Client's use of the ServiceNow platform is independently subject to the terms, conditions, and policies set forth by ServiceNow, Inc., and the Client is responsible for its own compliance with such terms.</p>
            <h4>Clause 4: IP Rights in ServiceNow Environment</h4>
            <ul>
              <li><b>ServiceNow Core Technology:</b> All rights, title, and interest in and to the ServiceNow platform, its applications, APIs, documentation, and all related pre-existing ServiceNow components are and shall remain the exclusive property of ServiceNow, Inc. or its licensors. No rights are granted to the Client in the ServiceNow Core Technology except as provided under their direct agreement with ServiceNow, Inc..</li>
              <li><b>Customer Technology:</b> All rights, title, and interest in and to the Client's pre-existing data, business processes, and intellectual property remain the exclusive property of the Client.</li>
              <li><b>Newly Created IP:</b> Any custom applications, scripts, workflows, and configurations developed by Drehill specifically for the Client as part of the Services ('Newly Created IP') shall be owned by the Client upon full and final payment, as detailed in the applicable SOW. This ownership is subject to Drehill's perpetual right to use the underlying skills, know-how, and residual, non-client-specific knowledge gained during the engagement for other purposes.</li>
            </ul>

            <h3>C. For EXIM Consulting Services</h3>
            <h4>Clause 5: Comprehensive Disclaimer for Advisory Services</h4>
            <p>Drehill's EXIM (Export-Import) consulting services are provided on a purely advisory and informational basis. The guidance, recommendations, and information provided by Drehill do not constitute, and should not be interpreted as, professional legal, financial, tax, or investment advice. The Client is solely and exclusively responsible for all of its business decisions, the execution of all trade transactions, the accuracy and completeness of all documentation, and full compliance with all applicable Indian and international trade laws, regulations, customs requirements, and sanctions. Drehill makes no representations, guarantees, or warranties, whether express or implied, regarding the success, profitability, or commercial outcome of any export or import venture undertaken by the Client. Drehill shall not be held liable for any losses, damages, delays, or penalties incurred by the Client arising from market fluctuations, changes in government policy, actions of third parties (such as shippers or customs authorities), or the Client's failure to act on the advice provided. Drehill's liability is expressly and strictly limited to the fees paid by the Client for the specific advisory service from which the claim arises.</p>

            <h2>Part IV: Implementation, Governance, and Recommendations</h2>
            <h3>A. Technical Implementation of Acceptance</h3>
            <ul>
              <li>Before any user can complete an account registration, submit a contact form that collects personal data, or purchase a service, they must be presented with a mandatory, unticked checkbox.</li>
              <li>The text adjacent to the checkbox should read: "By checking this box, I confirm that I have read, understood, and agree to be bound by the Drehill Private Limited(link) and Privacy Policy."</li>
              <li>The phrases "Terms of Service" and "Privacy Policy" must be active hyperlinks, opening the respective documents in a new tab or a scrollable pop-up window.</li>
              <li>The "Submit," "Register," or "Purchase" button should remain disabled until this checkbox is actively ticked by the user. This creates a clear, affirmative act of consent that can be logged with a timestamp for evidentiary purposes.</li>
            </ul>

            <h3>B. Version Control and Amendments</h3>
            <ul>
              <li>The "Last Updated" date at the top of the ToS must be diligently maintained.</li>
              <li>The ToS should include a clause reserving Drehill's right to amend the terms at its discretion.</li>
              <li>For minor changes, posting the updated ToS with the new date may suffice. However, for any material changes (e.g., changes to liability, fees, or data use), it is best practice to notify existing users. This can be done via email or a prominent banner on the website upon their next login. The notification should summarize the key changes and state that continued use of the service after a specified date (e.g., 15 or 30 days) will constitute acceptance of the new terms.</li>
            </ul>

            <h3>C. Document Hierarchy and Integration</h3>
            <ul>
              <li>Terms of Service: The foundational agreement for all users of the website.</li>
              <li>Privacy Policy: A specialized document, incorporated by reference into the ToS, that governs all Personal Data processing in compliance with the DPDP Act.</li>
              <li>Master Services Agreement (MSA) / Statement of Work (SOW): The detailed commercial contract for paying Clients. These documents govern specific engagements.</li>
              <li>The SOW should explicitly state that it, along with the MSA, takes precedence over the general ToS in case of any conflict for that specific engagement. This clear hierarchy ensures that tailored commercial terms negotiated with a client are not unintentionally overridden by the general website terms. All documents should be reviewed periodically by legal counsel to ensure continued alignment and compliance with evolving laws and business practices.</li>
            </ul>
              
          </div>
        </div>
      
     
    </>
  );
};

export default Terms; 