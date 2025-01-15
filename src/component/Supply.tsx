// import seaFood from "../assets/images/seafood.png";
// import seaFood2 from "../assets/images/seafood2.png";
import super1 from "../assets/images/supermarket1.jpeg";
import super2 from "../assets/images/supermarket2.jpeg";
import super3 from "../assets/images/supermarket3.jpeg";
import Carousel from 'react-multi-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
function Supply() {
  return (
    <div className='Supply'>
     
     <div className='aboutUs'>
     
     <div className="aboutCon">
   {/* ======================== */}
   <div className="carsel">
<Carousel 
 responsive={responsive}
 autoPlay={true}
 swipeable={true}
 draggable={true}
//  showDots={true}
 infinite={true}
 partialVisible={false}

>
       <div className="aboutUsImg">
           <img src={super1} alt="" />
        {/* <div className="aboutBtn">
       <div className="btn">
           <p>contact us</p>
           <FontAwesomeIcon icon={faArrowRight} />
       </div>
       </div> */}
       </div>


       <div className="aboutUsImg">
           <img src={super2} alt="" />
        {/* <div className="aboutBtn">
       <div className="btn">
           <p>contact us</p>
           <FontAwesomeIcon icon={faArrowRight} />
       </div>
       </div> */}
       </div>


       <div className="aboutUsImg">
           <img src={super3} alt="" />
        {/* <div className="aboutBtn">
       <div className="btn">
           <p>contact us</p>
           <FontAwesomeIcon icon={faArrowRight} />
       </div>
       </div> */}
       </div>
</Carousel>
</div>
  {/* ====================== */}
    {/* ===================== */}
       <div className="aboutUsDetails">
          <h2>Some Supermarkets We Supply</h2>
          <p>
          We supply a wide range of seafood products to these supermarkets, ensuring that customers have access to fresh and high-quality seafood options. If you're a supermarket owner or manager, consider partnering with us to offer your customers the best seafood experience!
          </p>
          <ul>

  <p> Osun State </p> 

<li> Ace supermarket Osogbo.</li> 
<li>Embassy supermarket Osogbo.</li>
<li>Magrite mall Osogbo</li>
<li>Lead superstore Osogbo </li>
<li>Vanguard pharmacy, opp. Technical college Osogbo.</li>
<li>More Mart Osogbo</li>
<li>Ojaja More Osogbo</li>
<li>City star⭐ Mart Osogbo</li>
<li>Vanguard Pharmacy Power lines Area Osogbo </li>
<li>BTQ Superstore Testing ground Area Osogbo</li>

<p> Kwara state </p> 
<li>Ace supermarket Ilorin.</li>

<p> Ogun state </p>

<li>Ace Abeokuta</li>
<li>Ace Ijebu-Ode</li>
{/* <li>Vanguard Pharmacy</li> */}

 <p> Oyo state </p> 
<li> Ace mall Bodija, Akobo and Oluyole</li> 
<li> Brent supermarket Apata, Old Ife road and Moniya</li>
<li> Tango supermarket Jericho Mall</li>
<li> Vanguard pharmacy (check all the outlets in Ibadan)</li>
<li> Troy pharmacy Idi Ape</li>
<li> Troyhealth pharmacy Bodija</li> 
<li>  More Mart inside Vintage Mall Alakia and Olorunsogo</li> 
<li> Westmead supermarket Mokola</li>
<li> His Praise supermarket Bodija</li> 
<li> Sunrise supermarket (Bond Mall) Bodija, Akala way and Ring road</li>
<li> Foodco  (check all the 14 outlets in Ibadan)</li>
<li> Hailey supermarket Kolade Ishola Akobo</li>
<li> Minarets Pharmacy Apete and branches</li> 
<li> Optimed pharmacy Monatan and branches</li>
<li> Grocery park supermarket inside Iris Mall Apata Ibadan</li>
<li>Tasbif supermarket Ogbomoso.</li>
<li>Alata supermarket Ogbomoso.</li>
<li>Ace supermarket Ogbomoso.</li>
<li>Brent supermarket Ogbomoso.</li>
<li>Ace supermarket Iseyin</li>
<li>Ace supermarket Saki</li>



<p> Abuja </p> 
<li>Cost cutter supermarket Abuja</li>



          </ul>
       
      <div className="aboutBtn">
      <a href="https://wa.me/2348057386375?text=Hello,  Can you supply us with your product in our suppermarket">
       <div className="btn">
           <p>contact for supply</p>
           <FontAwesomeIcon icon={faArrowRight} />
       </div>
       </a>
       </div>

       </div>
{/* =================== */}


     </div>
   </div>

    </div>
  )
}

export default Supply

