import React, { useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight, FaFacebook, FaLinkedin } from 'react-icons/fa';

interface TeamMemberProps {
  name: string;
  portfolio: string[];
  position : string;
  profileImg: string;
  socialMedia : boolean;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, portfolio, profileImg, position, socialMedia}) => {

  const [showMore, setShowMore] = useState(false);

  const handleReadMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="team-member">

      <div className="TeamProfileImage">
        <img src={profileImg} alt={name} className="profile-img" />
      </div>
      <h2>{name}</h2>
      <p style={{fontWeight: "bold"}}>{position}</p>
      {
      socialMedia && (
          <div className="socialMedia">
      <div className="socialIcon">
        <a href="https://www.facebook.com/share/1XpzzHX4Qq/" target="_blank">
          <FaFacebook />
        </a>
      </div>

      <div className="socialIcon">
        <a href="https://www.linkedin.com/in/shadrach-egbokwu-a4a38b140?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
           <FaLinkedin />
        </a>
      </div>
      </div>
        )
      }
      

      <div className="portfolio">

        {portfolio.slice(0, 1).map((item, index) => (
          <p key={index}>{item}</p>
        ))}

        {showMore && (
          <div>
            {portfolio.slice(1).map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        )}
        <div className="read-more" onClick={handleReadMore}>
        <button>
          {showMore ? 'Read Less' : 'Read More'}
        </button> 
        <div>
        {showMore ? (
            <FaArrowCircleLeft />
        ) : (
          <FaArrowCircleRight />
        ) }
            
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default TeamMember;