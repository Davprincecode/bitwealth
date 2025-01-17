import React from 'react'
import LandingPageHeader from './LandingPageHeader'
import { NavLink } from 'react-router-dom'
import heroImg from '../assets/images/heroImage-removebg.png'
import signalImg from '../assets/images/signal.svg'
import { IoArrowForwardCircleSharp } from 'react-icons/io5'
import Carousel from 'react-multi-carousel'
import image1 from '../assets/images/image1.jpeg'
import image2 from '../assets/images/image2.jpeg'
import FAQ from './Faq'

function LandingPage() {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className='homeLandingPage'>
      <div className="herosection">
       <LandingPageHeader />
       <div className="herosectioncon">

          <div className="herosectioncontent">
            <h1>BitWealthCapital is a cryptocurrency trade club and hedge fund management company</h1>
            <p>BitWealthCapital is a cryptocurrency trade club and hedge fund management company that has been serving its members and clients since 2018. Over the years, <p>we’ve rebranded twice to enhance our services and adapt to the evolving needs of our community. Originally named Bitcoin Money Badgers, we adopted the name BitWealthCapital in 2019 following a major review and upgrade.
            We have maintained consistent profitability from the cryptocurrency market cycle of 2017/18 to date. By applying unique strategies and risk management practices, we have thrived in both bull and bear markets. This commitment to excellence is why we proudly say, “We are forever stuck in profit.</p>

           <p> We deeply value the trust of our members and clients who look to us for guidance, education, and coaching on their journey to financial freedom. By leveraging opportunities in Bitcoin, cryptocurrency, blockchain, and associated technologies, we help our community achieve their goals in a realistic and sustainable way.</p>
             </p>
               <div className="getstarted">
                <NavLink to="#">
                    get started
                </NavLink>
                  <div><IoArrowForwardCircleSharp /></div>
               </div>
          </div>
 
          <div className="herosectionimage">
            <img src={heroImg} alt="" />
          </div> 
          
       </div>
{/* =============historical performance and portio */}
<div className="historySection">
            <div className="historySectionCon">
               <h1>our historical performance or portfolio</h1>
               
               <div className="historyConFlex">

                <div className="historyProfitCon">
                  <div className="historyDate">
                    May - December 2018
                  </div>
                    <div className="profitmargin">
                     304.59%
                    </div>
                    <div className="profitCon">
                      <p>
                        We Achieved 304.59% profit (~3× ROI).
                      </p>
                    </div>
                </div>

                <div className="historyProfitCon">
                  <div className="historyDate">
                    January - December 2019
                  </div>
                    <div className="profitmargin">
                    677.92%
                    </div>
                    <div className="profitCon">
                      <p>
                        We Delivered an impressive 677.92% profit (~6.7× ROI).
                      </p>
                    </div>
                </div>

                <div className="historyProfitCon">
                  <div className="historyDate">
                    January 2020 - December 2021
                  </div>
                    <div className="profitmargin">
                    2000%
                    </div>
                    <div className="profitCon">
                      <p>
                        We Recorded a remarkable 2000% profit (~20× ROI).
                      </p>
                    </div>
                </div>


                <div className="historyProfitCon">
                  <div className="historyDate">
                    2022 - 2023
                  </div>
                    <div className="profitCon">
                      <p>
                       This period was marked as an accumulation phase for Bitcoin.
                      </p>
                      <p>
                      Accumulated Bitcoin between the $18,000 and $30,000 price range.
                      </p>
                    </div>
                </div>

                <div className="historyProfitCon">
                  <div className="historyDate">
                   2024
                  </div>
                    <div className="profitmargin">
                    500%
                    </div>
                    <div className="profitCon">
                      <p>
                       Currently holding our Bitcoin portfolio with approximately 500% profit (~5× ROI).
                      </p>
                    </div>
                </div>

                <div className="historyProfitCon">
                  <div className="historyDate">
                  2025
                  </div>
                    
                    <div className="profitCon">
                      <p>
                      We plan to diversify into carefully selected mid- and low-market-cap alternative cryptocurrencies to maximize returns for the 2025-2026 market cycle.
                      </p>
                    </div>
                </div>


               </div>
            </div>
    </div>

        {/* ============ historical end and portfolio ========== */}

       <div className="aboutSection">
        <h1>why choose use</h1>
        <div className="aboutSectionCon">
        <div className="aboutSectionContentCon">
           <div className="aboutContent">
              <div className="aboutOutline">
                <div className="aboutOutlineCon">
                  <h4>Consistent Profitability</h4>
                  <p>
                  We have maintained consistent profitability from the cryptocurrency market cycle of 2017/18 to date. By applying unique strategies and risk management practices, we have thrived in both bull and bear markets. This commitment to excellence is why we proudly say, “We are forever stuck in profit.”
                  </p>
                </div>
              </div>
              
              <div className="aboutOutline">
                <div className="aboutOutlineCon">
                <h4>Our approach</h4>
              <p>Our approach is built on a foundation of timely strategies and disciplined risk management, which sets us apart in the industry and ensures exceptional service delivery.</p>
                </div>
              </div>

              <div className="aboutOutline">
                <div className="aboutOutlineCon">
                <h4>Empowering Our Community</h4>
               <p>We deeply value the trust of our members and clients who look to us for guidance, education, and coaching on their journey to financial freedom. By leveraging opportunities in Bitcoin, cryptocurrency, blockchain, and associated technologies, we help our community achieve their goals in a realistic and sustainable way.</p>
                </div>
              </div>

              <div className="aboutOutline">
                <div className="aboutOutlineCon">
                <h4>Our Promise</h4>
                <p>Since our inception, we have been dedicated to providing satisfactory services to cryptocurrency traders, investors, and enthusiasts. We don’t take this trust for granted. Our mission is to safely and profitably guide our members as they navigate the cryptocurrency free market.</p>
                 <p>
                 At BitWealthCapital, we ride the waves of this industry together—ensuring our community is equipped with the knowledge and tools to succeed.
                 </p>
                </div>
              </div>
              
           </div>
        </div>
        </div>
       </div>
    {/* ====== historical end ========= */}
      </div>
      


            {/* ===================== events ================== */}
           <div className="pastEvent">
               <Carousel
                responsive={responsive}
                
               >
                    <div>
                      <div className="eventConwrapper">
                        <div className="eventCon">
                           <div className="eventImage">
                            <img src={image1} alt="" />
                           </div>
                           <div className="eventContent">
                            <p>Educating the participants of Blockchain Digital Asset Conference 2018</p>
                           </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="eventConwrapper">
                        <div className="eventCon">
                           <div className="eventImage">
                            <img src={image2} alt="" />
                           </div>
                           <div className="eventContent">
                            <p>Educating the participants of Blockchain Digital Asset Conference 2018</p>
                           </div>
                        </div>
                      </div>
                    </div>
                    <div>Item 2</div>
                    <div>Item 3</div>
                    <div>Item 4</div>
                    <div>Item 5</div>
                    <div>Item 6</div>
                    <div>Item 7</div>
                    <div>Item 8</div>
                    <div>Item 9</div>
                    <div>Item 10</div>
                    <div>Item 11</div>
                    <div>Item 12</div>
                </Carousel>
            </div>
              {/* ======================events end=============== */}

               <div className="founderProfile">
                <h2>About the Founder and Team</h2>
                <div className="founderCon">
                  <div className="founderImage">
                    <img src="" alt="" />
                  </div>
                  <div className="founterContent">
                    <p>
                    BitWealthCapital was founded by Dr. Shadrach Egbokwu in May 2018. He leads the company’s operations alongside a team of skilled professionals, ensuring the delivery of exceptional services to clients and members.
                    </p>

                    <p>
                    Dr. Shadrach has been actively involved in the Bitcoin, cryptocurrency, and blockchain space since the third quarter of 2016. He made his initial Bitcoin purchases when 1 BTC was valued at less than $800.
                    </p>
                    <p>
                    As a prolific educator, advocate, and coach, Dr. Shadrach is deeply committed to advancing the growth and adoption of Bitcoin and its associated technologies both in Africa and globally. His efforts have earned him recognition as a key figure in the industry.
                    </p>
                    <h2>Highlights of His Contributions:</h2>
                    <p>
                    Speaker at numerous cryptocurrency conferences worldwide (onsite and online) since 2018.
                    </p>
                    <p>
                    Actively led individuals to become knowledgeable and profitable within the cryptocurrency ecosystem.
                    </p>
                    <p>
                    A steadfast crusader and believer in the transformative potential of blockchain technology.
                    </p>
                    <p>
                    Once a brand ambassador of OKX exchange and TinyTraders company.
                    </p>
                    <p>
                    Advisor to several cryptocurrency projects.
                    </p>
                    <p>
                    A consistently profitable trader , investor, and entrepreneur.
                    </p>
                    <p>
                    Dr. Shadrach’s vision and leadership have been instrumental in shaping the mission and success of BitWealthCapital.
                    </p>
                  </div>
                </div>
               </div>
                
                {/* ======= faq === */}
                <FAQ />
                {/* ===== faq end ============ */}

                <div className="footer">

                  <div className="contactus">
                       <h1>community</h1>
                       <div className="contactFlexicon">
                        <div className="icon"> 
                        <NavLink to="#">
                          a
                        </NavLink> 
                        </div>
                        <div className="icon"> 
                        <NavLink to="#">
                          a
                        </NavLink> 
                        </div>
                        <div className="icon"> 
                        <NavLink to="#">
                          a
                        </NavLink> 
                        </div>
                        
                       </div>
                  </div>  
                  
                  <div className="contactItemCon">
                    <div className="itemCon">
                      <h2>company</h2>
                      <p>white paper</p>
                      <p>about us</p>
                      <p>our team</p>
                      <p>referral program</p>
                    </div>

                    <div className="itemCon">
                      <h2>legal</h2>
                      <p>terms of use</p>
                      <p>privacy policy</p>
                      <p>rick disclore</p>
                      
                    </div>
                  </div>

                </div>
    </div>
  )
}

export default LandingPage
