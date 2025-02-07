import React from 'react'
import LandingPageHeader from './LandingPageHeader'
import { NavLink } from 'react-router-dom'
import heroImg from '../assets/images/heronewImage.png'
import signalImg from '../assets/images/signal.svg'
import { IoArrowForwardCircleSharp, IoHomeSharp } from 'react-icons/io5'
import Carousel from 'react-multi-carousel'
import image1 from '../assets/images/image1.jpeg'
import image2 from '../assets/images/image2.jpeg'
import image3 from '../assets/images/image3.jpeg'
import image4 from '../assets/images/image4.jpeg'
import image5 from '../assets/images/image5.jpeg'
import image6 from '../assets/images/image6.jpeg'
import image7 from '../assets/images/image7.jpeg'
import profileImg from '../assets/images/ceophoto.jpeg'
import profileImg1 from '../assets/images/profile.jpg'
import profileImg2 from '../assets/images/profile2.jpeg'
import marketer from '../assets/images/marketing.jpeg'
import headofmarketer from '../assets/images/hdmarketer.jpeg'
import graphice1 from '../assets/images/Frame 2.png'
import graphice2 from '../assets/images/Frame 1.png'
import { GoLaw } from "react-icons/go";

import FAQ from './Faq'
import TeamMember from '../TeamMember'
import { FaArrowCircleRight, FaChartPie, FaFacebook, FaInstagramSquare, FaWhatsappSquare } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { RiCommunityFill, RiTwitterXLine } from 'react-icons/ri'
import { FcSalesPerformance } from 'react-icons/fc'
import CryptoPrice from './CryptoPrice'

interface LandingProp {
  colorSwitchFunction: () => void;
  colorSwitch : string;
}

const LandingPage: React.FC<LandingProp> = ({ colorSwitchFunction, colorSwitch }) =>{

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


  const teamMembers = [
    {
      name: 'Dr. Shadrach Egbokwu',
      position : 'founder',
      socialMedia : true,
      portfolio: [
        'BitWealthCapital was founded by Dr. Shadrach Egbokwu in May 2018. He leads the company’s operations alongside a team of skilled professionals, ensuring the delivery of exceptional services to clients and members.',
        'Dr. Shadrach has been actively involved in the Bitcoin, cryptocurrency, and blockchain space since the third quarter of 2016. He made his initial Bitcoin purchases when 1 BTC was valued at less than $800.',
        'As a prolific educator, advocate, and coach, Dr. Shadrach is deeply committed to advancing the growth and adoption of Bitcoin and its associated technologies both in Africa and globally. His efforts have earned him recognition as a key figure in this financial ecosystem.',
        'Highlights of His Contributions:',
        'Speaker at numerous cryptocurrency conferences worldwide (onsite and online) since 2018.',
        'Actively led individuals to become knowledgeable and profitable within the cryptocurrency ecosystem.',
        'A steadfast crusader and believer in the transformative potential of blockchain technology.',
        'Once a brand ambassador of OKX exchange and TinyTraders company.',
        'Advisor to several cryptocurrency projects.',
        'A consistently profitable trader , investor, and entrepreneur.',
        'Dr. Shadrach’s vision and leadership have been instrumental in shaping the mission and success of BitWealthCapital.',
      ],
      profileImg: profileImg,
    },
    {
      name: 'Mr. Dee Duncan',
      position : "Head of Marketing & Client Relations.",
      socialMedia : false,
      portfolio: [
        'Studied Business and Computer Information Systems. Major Former Faster Payments Council Member Sponsored by Federal Reserve Bank of Boston Authorised Blockchain Payments, Distributor for Pundix LTD Singapore Jan 2019 - December 2021 Providing a borderless payment ecosystem beyond fiat.',
        'Mr. Duncan is a Techprenuer and travels the world consulting corporations and governments on how to develop real-world use cases with blockchain technology.',
        'A leader in global payments and fintech as a delegate  RSPA,  the largest Pundit sales association in America.',
      ],
      profileImg: headofmarketer,
    },
    {
      name: 'Mr. Okoro Osinachi',
      position : "Data analyst/community manager.",
      socialMedia : false,
      portfolio: [
       'A cryptocurrency enthusiast since 2016. Involved in blockchain research, cryptocurrency fundamental analysis, and tokenomics.',
        'A community manager and moderator of BitWealthCapital from 2019 till date.'
      ],
      profileImg: profileImg2,
    },
    {
      name: 'Mr. Iwajomo Emmanuel',
      position : "Marketing, Client Relations and Communication - Unit Member",
      socialMedia : false,
      portfolio: [
       'Completed  Blockchain and Crypto training through NITDA scholarship.',
        'Hands-on experience with cryptocurrency transactions, wallets, and decentralized exchanges (DEXs).',
        'Extensive persona and intentional study on Blockchain technology, decentralized finance (DeFi), smart contracts, research analysis, and content management',
      ],
      profileImg: marketer,
    },
   
  ];

  const handleNav = (id : string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='homeLandingPage' id='home'>
      <div className="herosection">
       <LandingPageHeader colorSwitchFunction={colorSwitchFunction} colorSwitch={colorSwitch} />
       <div className="usdtPrice">
             <CryptoPrice />
           </div>
       <div className="herosectioncon">
              
          <div className="herosectioncontent">
            <h1>BitWealthCapital is a cryptocurrency trade club and hedge fund management company</h1>
            <p>BitWealthCapital is a cryptocurrency trade club and hedge fund management company that has been serving its members and clients since 2018. Over the years, <p>we have rebranded twice to enhance our services and adapt to the evolving needs of our community. Originally named Bitcoin Money Badgers, we adopted the name BitWealthCapital in 2019 following a major review and upgrade.
            We have maintained consistent profitability from the cryptocurrency market cycle of 2017/2018 to date. By applying unique strategies and risk management practices, we have thrived in both bull and bear markets. This commitment to excellence is why we proudly say, "We are forever stuck in profit ".</p>

           <p> We deeply value the trust of our members and clients who look to us for guidance, education, and coaching on their journey to financial freedom. By leveraging opportunities in Bitcoin, cryptocurrency, blockchain, and associated technologies, we help our community achieve their goals in a realistic and sustainable way.</p>
             </p>
               <div className="getstarted">
                <NavLink to="/register">
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
            <div className="historySection" id='portfolio'>
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
                              We plan to diversify our cryptocurrency portfolios to maximise returns for the 2025-2025 market cycle.
                              </p>
                            </div>
                        </div>
                        

                        <div className="graphicCon">

                        <div className="graphic18">
                            <div className="grphicImg">
                            <img src={graphice1} alt="" />
                          </div>
                        </div>
                        
                          <div className="graphic19">
                          <div className="grphicImg">
                            <img src={graphice2} alt="" />
                          </div>
                          </div>
                        </div>

                        </div>
                    </div>
            </div>

{/* ============ historical and portfolio end========== */}
       <div className="aboutSection" id="about">
        <h1>why choose us</h1>
        <div className="aboutSectionCon">
        <div className="aboutSectionContentCon">

           <div className="aboutContent">
              <div className="aboutOutline">
                <div className="aboutOutlineIcon">
                <FcSalesPerformance />
                </div>
                <div className="aboutOutlineContext">
                  <h4>Consistent Profitability</h4>
                  <p>
                  We have maintained consistent profitability from the cryptocurrency market cycle of 2017/2018 to date. By applying unique strategies and risk management practices, we have thrived in both bull and bear markets. This commitment to excellence is why we proudly say, “We are forever stuck in profit.”
                  </p>
                </div>
              </div>
              
              <div className="aboutOutline">
              <div className="aboutOutlineIcon">
              <FaChartPie />
                </div>
                <div className="aboutOutlineContext">
                <h4>Our approach</h4>
              <p>Our approach is built on a foundation of timely strategies and disciplined risk management, which sets us apart in the industry and ensures exceptional service delivery.</p>
                </div>
              </div>

              <div className="aboutOutline">
              <div className="aboutOutlineIcon">
              <RiCommunityFill />
                </div>
                <div className="aboutOutlineContext">
                <h4>Empowering Our Community</h4>
               <p>We deeply value the trust of our members and clients who look to us for guidance, education, and coaching on their journey to financial freedom. By leveraging opportunities in Bitcoin, cryptocurrency, blockchain, and associated technologies, we help our community achieve their goals in a realistic and sustainable way.</p>
                </div>
              </div>

              <div className="aboutOutline">
              <div className="aboutOutlineIcon">
                   <GoLaw />
                </div>
                <div className="aboutOutlineContext">
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
  <div className="pastEvent" id='event'>
    <div className="pastEventHeader">
      <h2>Previous Event</h2>
    </div>

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
                <p>Educating the participants of Blockchain Digital Asset Conference 2019</p>
                </div>
            </div>
          </div>
        </div>

        <div>
          <div className="eventConwrapper">
            <div className="eventCon">
                <div className="eventImage">
                <img src={image3} alt="" />
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
                <img src={image4} alt="" />
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
                <img src={image5} alt="" />
                </div>
                <div className="eventContent">
                <p>BitWealthCapital masterclass by founder  during the Lagos,  Nigeria Blockchain and Artificial intelligence conference 2019</p>
                </div>
            </div>
          </div>
        </div>

        <div>
          <div className="eventConwrapper">
            <div className="eventCon">
                <div className="eventImage">
                <img src={image6} alt="" />
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
                <img src={image7} alt="" />
                </div>
                <div className="eventContent">
                <p>Key speaker at the "Why Bitcoin " online conference in 2020.</p>
                </div>
            </div>
          </div>
        </div>


        
    </Carousel>
</div>
  {/* ======================events end=============== */}

{/* ============= team start ======== */}
<div className="founderProfile" id='team'>
       
    <div className="founderCon">

    <div className="team-section">
      <h1>Our Team</h1>

      <div className="team-members-con">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} name={member.name} portfolio={member.portfolio} profileImg={member.profileImg} position={member.position} socialMedia={member.socialMedia} />
        ))}
      </div>

      <div className="team-member">

      <h2>other team</h2>

         <p style={{fontWeight: "bold"}}>
         Other team roles are currently outsourced  including legal/compliance  officer , technology & IT professionals ,  auditor, and data analysts. 
         </p>

      </div>

    </div>
    </div>              
</div>
{/* ========= team end ========== */}

{/* ============== term and condition ======= */}
<div className="terms-and-conditions">
<h2>Terms and Conditions</h2>
<section>
        <h2>1. Membership and Eligibility</h2>
        <p>Membership in the trading club is available to individuals aged 18 and above with any trade capital size of choice and upon registration with a one-time  $50 subscription fee......</p>
        
</section>



      <div className="read-more">
      <NavLink to='/term'>
        <button>Read More</button>
        <div>
          <FaArrowCircleRight />
        </div>
      </NavLink>
        </div>


</div>
{/* ============== term and condition end ======= */}

{/* ======= faq === */}
<div className="faqCon">
  <FAQ /> 
</div>
{/* ===== faq end ============ */}


{/* ============== disclamer ======= */}
<div className="terms-and-conditions">
<h2>Disclaimer</h2>
      <section>
        <h2>1. Educational Purpose Only</h2>
        <p>The information provided by BitWealthCapital is strictly for educational and informational purposes......</p>
      </section>

      
      <div className="read-more">
      <NavLink to='/disclamer'>
        <button>Read More</button>
        <div>
          <FaArrowCircleRight />
        </div>
      </NavLink>
        </div>


</div>
{/* ============== disclamer end ======= */}

<div className="footer">
                <div className="footerCon">

                  <div className="contactus">
                       <h1>community</h1>
                       <div className="contactFlexicon">
                        <div className="icon"> 
                        <NavLink to="https://www.facebook.com/profile.php?id=61573069074384">
                        <FaFacebook />
                        </NavLink> 
                        </div>
                        <div className="icon"> 
                        <NavLink to="https://chat.whatsapp.com/K1VoVtRnuTHF3054jI1bga"  target="_blank">
                          <FaWhatsappSquare />
                        </NavLink> 
                        </div>
                        <div className="icon"> 
                        <NavLink to="#">
                           <FaInstagramSquare />
                        </NavLink> 
                        </div>
                        <div className="icon"> 
                        <NavLink to="#">
                           <RiTwitterXLine />
                        </NavLink> 
                        </div>
                        <div className="icon"> 
                        <NavLink to="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=bitwealthcapital@gmail.com" target="_blank">
                          <MdOutlineEmail />
                        </NavLink> 
                        </div>
                        
                       </div>
                  </div>  
                  
                  <div className="contactItemCon">
                    <div className="itemCon">
                      <h2>company</h2>
                      
                      <p onClick={() => handleNav('about')} >about us</p>
                      <p onClick={() => handleNav('team')} >our team</p>
                      <p>referral program</p>
                    </div>

                    <div className="itemCon">
                      <h2>legal</h2>
                      <p>
                       <NavLink to='/term'>
                        terms and condition
                       </NavLink> 
                      </p>
                      <p>
                        <NavLink to='/disclamer'>
                          disclaimer
                        </NavLink>
                      </p>
                      {/* <p>privacy policy</p> */}
                      
                      
                    </div>
                  </div>
          
      </div>
       <div className="copyright">
            <p>© 2025 ismodev. All rights reserved.</p>
           </div>
      </div>
      
    </div>
  )
}

export default LandingPage
