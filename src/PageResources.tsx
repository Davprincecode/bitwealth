import React from 'react';
import logo from './assets/images/logo.png'
import { MdArrowCircleLeft } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';

function PageResources() {

    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1);
    };
  
  return (
    <div>

    <div className="topNav">
    <NavLink to="/">
        <div className="headerLogo">
            <img src={logo} alt="" />
        </div>
    </NavLink>
    
         <p>Resources</p>
        <div className="backArrow" onClick={handleGoBack}>
           <MdArrowCircleLeft />
        </div>
     </div>

    <div className="terms-and-conditions">
      <h1>Resources</h1>

      <section>
            <h2>WHAT IS BITCOIN ?</h2>
            <p>
            Bitcoin is a decentralized digital currency, also known as a cryptocurrency, that was invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto. It was released as an open-source software in 2009, following  the global financial collapse of 2008/09. 
            </p>
            <p>
            Bitcoin transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a Timechain/Blockchain. These transactions, once recorded, are unalterable (immutable).
            </p>

      </section>

      <section>
        <h2>Key features of Bitcoin include : </h2>
      </section>

      <section>
        <h2>1. Decentralization</h2>
        <p>Bitcoin is not controlled by any central authority, such as a government or financial institution. Instead, it is maintained by a network of nodes (computers) that participate in the validation and recording of transactions. Thus,  there is no central point of dependency , governance, failure, and attack. This Cardinal nomenclature that eliminates the role of a 3rd party function also helps to reduce the cost of financial settlements.</p>
      </section>

      <section>
        <h2>2. Limited Supply</h2>
        <p>The total supply of Bitcoin is capped at 21 million coins. This scarcity is designed to mimic precious metals like gold and is intended to create value over time. The limit of available Bitcoin and its programmed rate of generation/issuance are key factors to its price valuation over time when compared to its demand by the over 7 billion global population.</p>
        
      </section>

      <section>
        <h2>3. Pseudonymity</h2>
        <p>While Bitcoin transactions are recorded on a public ledger, the identities of the users involved are not directly revealed. Instead, transactions are linked to Bitcoin addresses, which are alphanumeric strings. Thus, it offers some level of financial privacy.</p>
      </section>

      <section>
        <h2>4. Security</h2>
        <p>Bitcoin uses cryptographic techniques to secure transactions and control the creation of new units. Blockchain technology ensures that once a transaction is recorded, it can not be altered or tampered with. Today, the Bitcoin network is the most secure  and decentralised computer architecture in the world.</p>
        
      </section>

      <section>
        <h2>5. Transparency</h2>
        <p>All Bitcoin transactions are recorded on the blockchain, which is publicly accessible. This transparency helps to prevent fraud and ensures the integrity of the system.</p>
      </section>
      <section>
        <h2>6. Divisibility</h2>
        <p>Bitcoin can be divided into smaller units, with the smallest unit being a satoshi, which is one hundred millionth of a Bitcoin (0.00000001 BTC). 100 Million Satoshis = 1 Bitcoin</p>
      </section>
      <section>
        <h2>7. Borderless</h2>
        <p>Bitcoin allows fast, permissionless, and seemless cross-border transactions. Thus, its users are not limited by time , bureaucracy, and location . Indeed, it offers financial inclusion and freedom.</p>
      </section>
      <section>
        <h2>8. Global Financial Parity</h2>
        <p>Unlike national fiat currencies ( e.g, the dollar, pound , euro, naira,  etc), 1Bitcoin is the same anyway in the world. For example, 1 Bitcoin in the USA is the same 1 Bitcoin in South Africa.</p>
      </section>

      <section>
        <h2>9. Neutral</h2>
        <p>Bitcoin is neutral and does not discriminate. It banks both the banked and unbanked populations of the world.</p>
      </section>

      <section>
        <p>Bitcoin can be used for various purposes, including as a medium of exchange, a store of value, and an investment. It has gained significant attention and adoption since its inception in 2009, leading to the development of numerous other cryptocurrencies and blockchain-based technologies, as well as businesses.</p>
      </section>

      <section>
        <p><NavLink to="/register" className='joinUs'>Join Us</NavLink>   to have  access to more insightful resources</p>
      </section>
    </div>
    
    </div>
  );
}

export default PageResources;