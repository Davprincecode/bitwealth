// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faWhatsapp } from "@fortawesome/free-solid-svg-icons";
import whatsAppLogo from "../assets/images/whatsapp2bg.png";


function ContactBtn() {
  return (
    <a href="https://wa.me/2348057386375?text=Hello, JohnTop Food i have some question to ask">
      <div className='contactUs'>
      
        <p>Need Help? <strong>Chat with us</strong></p>

        <div className="imgWhatapp">
            <img src={whatsAppLogo} alt="" />
        </div>
     
    </div>
    </a>
  )
}

export default ContactBtn