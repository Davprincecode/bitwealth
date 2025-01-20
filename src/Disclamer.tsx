import React from 'react';
import logo from './assets/images/logo.png'
import { MdArrowCircleLeft } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function Disclaimer() {
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1);
    };

  return (
     <div>
     
     <div className="topNav">
        <div className="headerLogo">
            <img src={logo} alt="" />
        </div>
         <p>Disclaimer</p>
        <div className="backArrow"  onClick={handleGoBack}>
         <MdArrowCircleLeft />
        </div>
     </div>

    <div className="disclaimer">
      <h1>Disclaimer</h1>

      <section>
        <h2>1. Educational Purpose Only</h2>
        <p>The information provided by BitWealthCapital is strictly for educational and informational purposes. We aim to equip individuals with knowledge about the cryptocurrency market, including historical data, market trends, and potential projections to guide their decision-making process.</p>
      </section>

      <section>
        <h2>2. No Financial Advice</h2>
        <p>We are not licensed financial advisors, and the content we provide should not be interpreted as personalized investment advice. Always consult with a professional before making any financial decisions.</p>
      </section>

      <section>
        <h2>3. No Guarantees on Returns</h2>
        <p>Cryptocurrency investments are highly volatile and speculative. We do not guarantee any fixed returns or outcomes from decisions made based on the information we provide.</p>
      </section>

      <section>
        <h2>4. Market Risks</h2>
        <p>The cryptocurrency market is subject to substantial risks, including market volatility, regulatory changes, and technological vulnerabilities. Investors must exercise caution and conduct their own research.</p>
      </section>

      <section>
        <h2>5. Independent Decision-Making</h2>
        <p>Any investment actions taken based on the information provided are solely the responsibility of the individual. We do not take responsibility for any losses incurred as a result of market activities.</p>
      </section>

      <section>
        <h2>6. Past Performance is Not Indicative of Future Results</h2>
        <p>Historical market trends and projections shared by us are for educational reference only and should not be seen as a predictor of future performance.</p>
      </section>

      <section>
        <h2>7. Compliance and Jurisdiction</h2>
        <p>Users are responsible for ensuring that their engagement with cryptocurrencies complies with the laws and regulations of their respective jurisdictions.</p>
      </section>

      <section>
        <h2>8. Non-Custodial Services</h2>
        <p>We do not solicit money from members or anyone and are not involved in managing people's funds on this platform. All services are NON-CUSTODIAL. We will never ask you for money and private chat/message anyone who has not first contacted us.</p>
      </section>
    </div>
    
    </div>
  );
}

export default Disclaimer;