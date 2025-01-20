// TermsAndConditions.js
import React from 'react';
import logo from './assets/images/logo.png'

function TermsAndConditions() {
  return (
    <div>

    <div className="topNav">
        <div className="headerLogo">
            <img src={logo} alt="" />
        </div>

        <div className="backArrow">
        -
        </div>
     </div>

    <div className="terms-and-conditions">
      <h1>Terms and Conditions</h1>

      <section>
        <h2>1. Membership and Eligibility</h2>
        <p>Membership in the trading club is available to individuals aged 18 and older, subject to adherence to community rules.</p>
        <p>Participation in the hedge fund is exclusive to members with capital of $10,000 and above, and this amount must equate the maximum percentage allocation allowed in their jurisdiction [applicable regulatory body, subject to location].</p>
      </section>

      <section>
        <h2>2. Risk Acknowledgment</h2>
        <p>Cryptocurrency trading and investments are speculative and involve high risks, including market volatility, probability, and potential loss of all invested capital.</p>
        <p>Members and investors accept full responsibility for their decisions and outcomes. No guarantees of profit are provided.</p>
      </section>

      <section>
        <h2>3. Confidentiality and Intellectual Property</h2>
        <p>Proprietary trading strategies, educational content, and tools provided by the company are confidential and for personal use only.</p>
        <p>Unauthorized sharing or reproduction is strictly prohibited and may result in legal action.</p>
      </section>

      <section>
        <h2>4. Fees, Financial Commitments, and Revshare</h2>
        <p>Hedge fund management fees (e.g., management and performance fees) and any trading club membership fees and revshare are non-refundable once receipt is acknowledged.</p>
        <p>Investors and members must fulfil all financial obligations as agreed upon during registration.</p>
      </section>

      <section>
        <h2>5. Compliance and AML/KYC Requirements</h2>
        <p>All participants must comply with Anti-Money Laundering (AML) and Know Your Customer (KYC) regulations, including submitting valid identification and other required documents.</p>
        <p>Non-compliance may result in the termination of access or membership.</p>
      </section>

      <section>
        <h2>6. Fund Operations and Reporting</h2>
        <p>The hedge fund operates transparently, with investors receiving periodic performance updates as outlined in the fund’s offering documents.</p>
        <p>Redemption policies are subject to fund terms and require a 30-day prior notice as specified.</p>
      </section>

      <section>
        <h2>7. Dispute Resolution and Governing Law</h2>
        <p>Any disputes arising from participation in the trading club or hedge fund will be resolved under the laws and jurisdiction of [specified country or state].</p>
        <p>Both parties agree to attempt mediation before initiating formal legal proceedings.</p>
      </section>
    </div>
    
    </div>
  );
}

export default TermsAndConditions;