import React from 'react';

interface ResourcesIframeProps {}

const ResourcesIframe: React.FC<ResourcesIframeProps> = () => {
  return (
    <div>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, expedita!</h1>
      <iframe
        src="https://apis.bitwealthcapital.org/image/resources1.pdf#toolbar=0"
        width="100%"
        height={500}
        style={{border:"none"}}
      />
    </div>
  );
};

export default ResourcesIframe;
