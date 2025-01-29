import React, { useEffect, useState } from 'react'
import SideMenu from '../../component/SideMenu'
import TopHeader from '../../component/TopHeader'
import { userAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Country from '../Auth/Country';


function EditProfile() {

  const {baseUrl, token, surName, otherName, kycStatus, paymentStatus, membership,  image_url, phoneNumber, dob, email, country,  setEmail, setPhoneNumber, setDob, setMembership, setCountry, setSurName, setOtherName} = userAuth();

    // const [age, setAge] = useState(19);
  const [navBar, setNavBar] = useState<boolean>(false); 
  const [loading, setLoading] = useState<boolean>(false);

  const handleToggle = () => {
      setNavBar(!navBar);
    };

  const fetchData = async () => {
          setLoading(true);
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", token);
          const raw = {
          'surname' : surName,
          'otherName' : otherName,
          'email'  : email,
          'phoneNumber' : phoneNumber,
          'country'  : country
          }
          const requestOptions: RequestInit = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(raw),
          };
          try {
            const response = await fetch(`${baseUrl}/updateprofile`, requestOptions);
            if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message);
            }
            const result = await response.json();
             toast.success(result.message);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
              toast.error(error.message);
            } else {
              toast.error('An unknown error occurred.');
            }
          }
        
      };
  
   

    // const calculateAge = (dobDate: Date | null) => {
    //     if (!dobDate) return;
      
    //     const birthDate = dobDate;
    //     const currentDate = new Date();
    //     const ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
      
    //     if (currentDate.getMonth() < birthDate.getMonth() || 
    //         (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
    //       setAge(ageInYears - 1);
    //     } else {
    //       setAge(ageInYears);
    //     }
      
    //     if (ageInYears >= 18) {
    //       setDob(dobDate);
    //     } 
    //   };


  return (
    <div>
      
<div className="mainWrapper">

  <div onClick={handleToggle} className={navBar ? "sideWrapperActive" : "sideWrapper"}>
  </div>

<SideMenu navBar={navBar} handleToggle={handleToggle} />

<div className="mainContainer">

  <div className="mainContainersHeader">
      <TopHeader pageTitle='Profile' handleToggle={handleToggle}/>
  </div>

    
     
     {/* ==========main container wrapper ============= */}
   <div className="mainContainerWrapper">

       

            <div className="formWrapper userProfile">
             <div className="formCon">
            <form>
                <div className="input">
                    <label >surname</label>
                    <input type="text" placeholder='surname'
                     value={surName} onChange={(e) => setSurName(e.target.value)}
                   />
                </div>
                <div className="input">
                    <label >First Name</label>
                    <input type="text" placeholder='First Name'
                     value={otherName} onChange={(e) => setOtherName(e.target.value)}
                   />
                </div>

                <div className="input">
                    <label >email</label>
                    <input type="email" placeholder='email'
                     value={email} onChange={(e) => setEmail(e.target.value)}
                   />
                </div>

                <div className="input">
                    <label >phone number</label>
                    <input type="number" placeholder='phone number'
                     value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                   />
                </div>

                <div className="input">
                    <label >country</label>
                    <select value={country} onChange={(e) => setCountry(e.target.value)}>
                     <Country />
                    </select>
                </div>

                {/* <div className="input">
                    <label >date of birth</label>
                    <input 
                      type="date" 
                      placeholder='date of birth'
                      value={dob}
                      onChange={(e) => calculateAge(e.target.valueAsDate)}
                    />
                   {
                    age < 18 ? (
                     <p>Your age ({age}) is not allowed to register with us.</p>
                    ) : (
                        ' '
                    )
                   }     
                </div> */}
              

               {/* <div className="input">
                <label >membership</label>
                <select value={membership} onChange={(e) => setMembership(e.target.value)}>
                  <option value="">select membership</option>
                  <option value="hedge fund">hedge fund</option>
                  <option value="trade club">trade club</option>
                </select>
               </div> */}
                <div className="input">
                <div className="btn">
                {
                  surName && otherName && email  && phoneNumber && country  ? (
                    
                    <button  onClick={fetchData}>
                      {loading ? 'Loading......' : 'Edit Profile'}
                    </button>

                  ) : (
                    <button disabled={true}>
                      {loading ? 'Loading......' : 'Edit Profile'}
                    </button>
                  )
              }
                </div>
                </div>
            </form>
            </div>
            </div>

       
    </div>
{/* ==============main container header */}

  </div>
    </div>
    </div>
  )
}

export default EditProfile
