import React, { useState, useEffect } from 'react';


interface AltcoinPair {
  symbol: string;
  price: number;
  priceChange: number;
}

function CryptoPrice() {
  const [data, setData] = useState<AltcoinPair[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

 
  useEffect(() => {
    const socket = new WebSocket('wss://data-stream.binance.vision:443/ws/!ticker@arr');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const altcoinPairs: AltcoinPair[] = data
        .filter((item: any) => item.s.endsWith('USDT')) 
        .map((item: any) => ({
          symbol: item.s,
          price: parseFloat(item.c),
          priceChange: parseFloat(item.P),
        }));
      setData(altcoinPairs);
    };

    socket.onclose = () => {
      setWs(null);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

console.log(data.length);

  return (
    <div className="scroll-container">

      <div className="scroll-content">

        {data.map((pair, index) => (
          <div key={index} className="altcoin-pair">
            <div className="symbol">{pair.symbol}</div>
              
              <div className="priceCon">
                <div className="priceSymbol">$</div>
                <div className="price">{pair.price.toFixed(8)}</div>
              </div>
            
             <div className="percentage">
                <span className={`price-change ${pair.priceChange > 0 ? 'green' : 'red'}`}>{pair.priceChange.toFixed(2)}%
                </span>
             </div>

            
          </div>
        ))}
      </div>
    </div>
  );
}

export default CryptoPrice;