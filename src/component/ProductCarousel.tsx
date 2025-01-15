// import React from 'react'
import seaFood from "../assets/images/seafood.png";
// import seaFood2 from "../assets/images/seafood2.png";
import Carousel from 'react-multi-carousel';
import img1 from '../assets/images/100g - Plastic pack.jpg'
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
function ProductCarousel() {
  return (
    <div className='aboutCon'>
       <h1 style={{width :  "50%", flex : 1}}>ProductCarousel</h1>
<div className="card" style={{width :  "50%", flex : 1}}>
<Carousel 
 responsive={responsive}
 autoPlay={true}
 swipeable={true}
 draggable={true}
//  showDots={true}
 infinite={true}
 partialVisible={false}
//  dotListClass="custom-dot-list-style"
>
  <div>
    <h1>Item 1</h1>
    <div className="img">
      <img src={img1} alt="" />  
    </div>
 <button>pay</button>
  </div>

  <div className="aboutUsImg">
           <img src={seaFood} alt="" />
        <div className="aboutBtn">
       <div className="btn">
           <p>contact us</p>
           <FontAwesomeIcon icon={faArrowRight} />
       </div>
       </div>
       </div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>
  <div>Item 4</div>

</Carousel>
</div>

    </div>
  )
}

export default ProductCarousel