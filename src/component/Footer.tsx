import whatsapp from "../assets/images/whatsappLogo.png";
import facebook from "../assets/images/facebook.png";
import instagram from "../assets/images/instagram.jpg";
import tiktok from "../assets/images/tiktok.png";


function Footer() {
  return (
    <div>
      {/* <!-- ===========contact start====== --> */}
<div className="contactcontainer" id="contactcontainer">

    {/* <!-- <div className="contactheader">
        <h2>get in touch</h2>
        <h1>hey! let`s talk</h1>
    </div> --> */}

 <div className="contactflex">

    <div className="contactholder">
      <div className="contact1">
        <h4>locations</h4>
        <p>
        Zone E Block 7 shop 3 Beside OGD TUTORS OAU CENTRAL MARKET, OAU ILE-IFE, OSUN STATE
        </p>
        <br />
        <p>
        Unit 3 Technology Incubation Centre, Ita Osa, Ondo Road, Ile-Ife, Osun State, Nigeria.
        </p>
        <br />
        <p>
        No 1 Broad Street Ayetoro Ilaje Ondo State
        </p>
      </div>
    </div>

    <div className="contactholder">
        <div className="contact1">
          <h4>contact us</h4>
          <p>08057386375</p>
        </div>
    </div>

    <div className="contactholder">
        <div className="contact1">
          <h4>open hours</h4>
          <p>Open Daily: 8am - 6pm</p>
        </div>
    </div>
  
    <div className="contactholder">
        <div className="contact1">
          <h4>stay connected</h4>
          <div className="followflex">

            <a href="http://wa.me/2348057386375" target="_blank">
              <div className="followimg" >
                  <img src={whatsapp} />
              </div>
            </a>

            <a href="https://www.facebook.com/johntopfoods/" target="_blank">
              <div className="followimg">
                  <img src={facebook} />
              </div>
            </a>
               
            <a href="https://instagram.com/johntopfoods?utm_medium=copy_link" target="_blank">
              <div className="followimg">
                  <img src={instagram} />
              </div>
            </a>
            
            <a href="https://tiktok.com/@johntopfoods" target="_blank">
              <div className="followimg">
                  <img src={tiktok} />
              </div>
            </a>


          </div>
        </div>
      </div>

 </div>

 <div className="underline"></div>
  <div className="copyright">
    copyright @ 2024 develop by davprincecode </div>
</div>

{/* <!-- ========contact end=========== --> */}
    </div>
  )
}

export default Footer
