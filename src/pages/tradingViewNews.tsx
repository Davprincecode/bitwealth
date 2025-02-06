import React, { useEffect, useRef } from 'react';

const TradingViewNews = () => {
  const containerRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  const hasRun = useRef(false);

  useEffect(() => {
    
  if(!hasRun.current) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
    script.async = true;
   
    (containerRef.current as unknown as HTMLElement).appendChild(script); 

      console.log('Hello World');
      hasRun.current = true;
    }
    
  }, []);

  return (
    <div
      ref={containerRef}
      id="trading-view-timeline"
      style={{ width: '100%', height: '600px' }}
    />
  );
};

export default TradingViewNews;