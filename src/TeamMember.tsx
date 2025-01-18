import React, { useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

interface TeamMemberProps {
  name: string;
  portfolio: string[];
  profileImg: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, portfolio, profileImg }) => {

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