import React from 'react'
import BitcoinPeer from './BitcoinPeer'
import RecommendedBook from './RecommendedBook'
import SaifBook from './SaifBook'

function resources1() {
  return (
    <div className="resourcesWrapper">
     <div className="introduction">

         <h2>WHAT IS BITCOIN?</h2> 

    <div className="whatdefine">
        <p>
        Bitcoin is a decentralized digital currency, also known as a cryptocurrency, that was invented in
        2008 by an unknown person or group of people using the name Satoshi Nakamoto. It was
        released as an open-source software in 2009, following the global financial collapse of 2008/09.
        </p> 
        <p> Bitcoin transactions are verified by network nodes through cryptography and recorded in a
        public distributed ledger called a Timechain/Blockchain. These transactions, once recorded, are
        unalterable (immutable).
        </p>
    </div>
            


       <div className="keyfeature">
    
           <h2>Key Features of Bitcoin</h2> 

          <h4>1. Decentralization:</h4> 

           <p> Bitcoin is not controlled by any central authority, such as a government or financial
            institution. Instead, it is maintained by a network of nodes (computers) that participate in
            the validation and recording of transactions. Thus, there is no central point of
            dependency, governance, failure, and attack. This Cardinal nomenclature eliminates the
            role of a 3rd party function and also helps to reduce the cost of financial settlements.
             </p>
           <h4>2. Limited Supply:</h4> 
           <p>
            The total supply of Bitcoin is capped at 21 million coins. This scarcity is designed to
            mimic precious metals like gold and is intended to create value over time. The limit of
            available Bitcoin and its programmed rate of generation/issuance are key factors to its
            price valuation over time when compared to its demand by the over 7 billion global
            population.
           </p>
           <h4>3. Pseudonymity:</h4> 
           <p>
            While Bitcoin transactions are recorded on a public ledger, the identities of the users
            involved are not directly revealed. Instead, transactions are linked to Bitcoin addresses,
            which are alphanumeric strings. Thus, it offers some level of financial privacy.
            </p>

           <h4>4. Security:</h4> 
           <p>
            Bitcoin uses cryptographic techniques to secure transactions and control the creation of
            new units. Blockchain technology ensures that once a transaction is recorded, it cannot
            be altered or tampered with. Today, the Bitcoin network is the most secure and
            decentralized computer architecture in the world.
            </p>
            <h4>5. Transparency:</h4>
            <p>
            All Bitcoin transactions are recorded on the blockchain, which is publicly accessible.
            This transparency helps to prevent fraud and ensures the integrity of the system.
            </p> 
            <h4>6. Divisibility:</h4>
            <p>
            Bitcoin can be divided into smaller units, with the smallest unit being a satoshi, which is
            one hundred millionth of a Bitcoin (0.00000001 BTC).
            </p>

            <h4>7. Borderless:</h4>
            <p>
            Bitcoin allows fast, permissionless, and seamless cross-border transactions. Thus, its
            users are not limited by time, bureaucracy, and location. Indeed, it offers financial
            inclusion and freedom.
            </p>

            <h4>8. Global Financial Parity:</h4> 
            <p>
            Unlike national fiat currencies (e.g., the dollar, pound, euro, naira, etc.), 1 Bitcoin is the
            same anywhere in the world. For example, 1 Bitcoin in the USA is the same 1 Bitcoin in
            South Africa.
            </p>

            <h4>9. Neutrality:</h4> 
            <p>
            Bitcoin is neutral and does not discriminate. It banks both the banked and unbanked
            populations of the world.
            </p>

            </div>

                <div className="uses">
                        <h2>Uses of Bitcoin</h2> 
                        
                        <p>
                            Bitcoin can be used for various purposes, including as a medium of exchange, a store of value,
                            and an investment. Since its inception in 2009, Bitcoin has gained significant attention and
                            adoption, leading to the development of numerous other cryptocurrencies, blockchain-based
                            technologies, and businesses.
                            </p>
                </div>

           <h2>BITCOIN'S FIVE CORE VALUE PROPOSITIONS</h2> 

          <p>  Bitcoin has five core value propositions that make it unique and powerful as a new form of
            money.
            </p>

            <h4>1. Decentralization – No One Controls Bitcoin</h4>

            Imagine a school where there’s no single teacher in charge. Every student helps run the school
            by following shared rules.

            That’s how Bitcoin works! No single person, bank, or government controls Bitcoin. Instead,
            thousands of computers (called nodes) around the world work together to keep the system
            running.

           <h4>Why is this important?</h4> 

            <div>● No government can shut Bitcoin down.</div>
            <div>● No bank can change the rules or create more Bitcoin.</div>
            <div>● The system is fair for everyone.</div>

        <p>Bitcoin is “money by the people, for the people." It democratizes money.</p>



           <h4>2. Permissionlessness – Anyone Can Use Bitcoin</h4> 

           <p> Imagine if you needed special permission to use money or a bank account. That wouldn’t be
            fair, right?
            </p>

           <p> With Bitcoin, you don’t need anyone’s approval to use it. Whether you are rich or poor, in a big
            city or a small village, you can send and receive Bitcoin without asking for permission.
</p>
           
           <h4> Why is this important? </h4>


         <div>  ● No bank can block you from using Bitcoin.</div>
         <div>● Anyone with internet access can participate in the Bitcoin network.</div>
         <div>● It gives financial freedom to people in countries where banks are corrupt or unreliable.</div>



           <p> Bitcoin treats everyone equally – no ID, passport, or paperwork needed! </p>



           <h4> 3. Borderlessness – Bitcoin Works Everywhere </h4>

           <p> Imagine trying to send money to another country. Banks might delay it for days and charge high
            fees.</p>

           <p> Bitcoin is different. It works the same way in every country, whether you’re in the UK, Nigeria,
            India, or the US. You can send Bitcoin to someone on the other side of the world in minutes
            without using banks or currency exchanges. </p>

           <h4>Why is this important?</h4> 



            

            <div>● There is no need for middlemen (banks, Western Union, PayPal, etc.).</div>
            <div>● No waiting days for money transfers—Bitcoin moves 24/7.</div>
            <div>● It’s useful for businesses and people living in different countries.</div>



           <p>Bitcoin is truly global money – it doesn’t care about borders! </p> 



           <h4> 4. Censorship Resistance – No One Can Stop Bitcoin Transactions </h4>

           <p> Imagine if someone could freeze your bank account just because they don’t like you or your
            opinions. </p>

           <p> With Bitcoin, no one can stop your transactions. The network doesn’t rely on a central authority
            (like a bank or government), so no one can block or reverse a Bitcoin payment.
           </p>

           <h4>Why is this important?</h4> 



          <div> ● People in countries with strict financial controls can still access money. </div>
          <div> ● Journalists, activists, and businesses can operate without fear of financial censorship. </div>
          <div> ● Governments cannot unfairly block people from using their own money. </div>



           <p>Bitcoin gives true financial freedom – your money, your control!</p> 



           <h4> 5. Fast, Immutable Financial Transactions – Bitcoin Can’t Be Changed or
            Faked
            </h4>

           <p> Imagine writing something in permanent ink—no one can erase it. </p>

            <p>That’s how Bitcoin transactions work. Once a Bitcoin payment is confirmed, it cannot be
            changed or reversed.</p>

           <h4>Why is this important?</h4> 



            
            

           <div> ● Fast – Transactions are processed in minutes, not days like traditional banks. </div>
           <div> ● Immutable – No one can alter the Bitcoin record after a transaction is confirmed. </div>
           <div> ● Secure – Fraud, chargebacks, and fake transactions are impossible. </div>



          <p>  There is no risk of fraud like with credit cards or banks. </p>

          <p> Businesses can trust Bitcoin payments without worrying about chargebacks. </p> 

           <p> Bitcoin’s ledger (blockchain) keeps a permanent, tamper-proof history of transactions. </p>

           <p> Bitcoin is like a financial truth machine—it records everything and cannot be changed! </p>




          <h4> Conclusion</h4> 

          <p>  Bitcoin is not just digital money—it’s a revolutionary financial system built on fairness, freedom,
            and security.
            </p>

           <p> Its five core strengths make it superior to traditional fiat currencies. </p>

           <p> These qualities make Bitcoin the most powerful form of money ever created. It puts financial
            control back in the hands of the people.
            </p>

            <div className="howMoney">

           <h2>HOW IS BITCOIN A NEW TYPE OF MONEY?</h2> 

           <p> Bitcoin follows rules that make it work like "sound money," meaning it cannot be easily created
            or destroyed. Let’s compare it to the money we use every day:
            </p>

           <p> Because Bitcoin has a limited supply and no central control, many people call it "digital gold."
            Just like gold, it is valuable because:
            </p>



           <h4>1. It’s Rare</h4> 

           <p> Only 21 million Bitcoin will ever exist. Its supply is capped, and the issuance rate halves every 4
            years.
            </p>

           <h4>2. It’s Secure</h4> 

           <p>Nobody can fake or steal Bitcoin easily.</p> 

           <h4>3. It’s Useful</h4> 

           <p>Bitcoin can be traded globally without borders or restrictions.</p> 


           <h4> Why is Bitcoin Valuable ? </h4> 

           <p>Bitcoin is valuable for many reasons:</p> 



           <h4>1. It Can’t Be Controlled by Governments or Banks</h4> 

           <p>No one can freeze your Bitcoin or stop you from using it. </p> 

           <h4>2. It’s Easy to Send Money Anywhere</h4> 

           <p> You can send Bitcoin to someone in another country without waiting for banks or paying high
            fees.
            </p>

           <h4>3. It’s a Hedge Against Inflation</h4> 

           <p> Since governments can print more paper money (which reduces its value), Bitcoin protects your
            savings because no one can create more of it.
            </p>

           <h4>4. It’s Transparent and Secure</h4> 

           <p> Every transaction is recorded on the blockchain, and no one can secretly change the records.
           </p>



           <h4>How Does Bitcoin Technology Work?</h4> 

           <p> Bitcoin uses a blockchain, which is like a magical notebook shared by millions of computers worldwide. Here’s how it works:
            </p>

           <h4>1. People Send Bitcoin</h4> 

           <p>Imagine Alice wants to send 1 Bitcoin to Bob.</p> 

           <h4>2. The Transaction is Verified</h4> 

           <p> Special computers (called miners) check if Alice really has 1 Bitcoin to send.</p>

           <h4>3. The Transaction is Recorded in a Block</h4> 

           <p>This block joins other blocks, forming a long chain (the blockchain).</p> 

           <h4>4. Everyone Updates Their Notebook</h4>  
           <p> Every computer with a copy of the blockchain updates itself with the new transaction.</p>

          <p>Because of this system, Bitcoin is:</p>  

            

         <h4> <span>● Transparent:</span> Anyone can see transactions happening.</h4>
         <h4> <span>● Secure:</span> Changing the records is nearly impossible. There is no history of hacks in its 16 years of enabling financial transactions and settlements.</h4>
        <h4> <span>● Reliable:</span> Bitcoin runs 24/7 without needing banks or companies to control it.</h4> 

            </div>

        <div className="summary">
            
           <h2>In Summary</h2> 

           <p> Bitcoin is like digital gold—a rare, secure, and powerful form of money that belongs to everyone.
            The Bitcoin Whitepaper explained how it works, and over time, people realized it could change
            the way money works around the world.
            </p>

           <p> With Bitcoin, you don’t need a bank to save or send money, and no one can stop you from using
            it. That’s why many people believe it’s the future of money.
            </p>
            
        </div>
                  <div className="media">

                  </div>
     </div>
{/* =======================introduction end ============== */}

  <div className="peerBitcoin">
    <BitcoinPeer />
  </div>
<div className="recommendedbook">
    <RecommendedBook/>
</div>
<div className="saifbook">
    <SaifBook/>
</div>
    </div>
  )
}

export default resources1
