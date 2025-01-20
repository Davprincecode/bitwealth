import React, { useState, useEffect } from 'react';


const BinanceApi = () => {
  const [trades, setTrades] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = 'Vv7bhmkkaW18qdD2azLwtHmiJ7sJCyWKtT97fmCbXcKWDlUTQZe3QSNPpBuv5kNy';
  const apiSecret = 'YOUR_API_SECRET';
  const timestamp = Math.floor(Date.now() / 1000);
  const recvWindow = 5000;

  const getTrades = async () => {
    try {
      const headers = {
        'X-MBX-APIKEY': apiKey,
      };
      const response = await fetch(`https://api.binance.com/api/v3/accountTrades?timestamp=${timestamp}&recvWindow=${recvWindow}`, {
        method: 'GET',
        headers,
      });
      const data = await response.json();
      setTrades(data);
    } catch (error) {
    //   setError(error.message);
    console.log(error);
    
    }
  };

  useEffect(() => {
    getTrades();
  }, []);

  return (
    <div>
      <h1>Trades</h1>
      <ul>
        {trades.map((trade) => (
            <li>1</li>
        //   <li key={trade.id}>{trade.symbol} - {trade.price}</li>
        ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default BinanceApi;