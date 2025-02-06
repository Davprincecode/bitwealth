import React, { useState, useEffect } from 'react';

interface BinanceKlineData {
  stream: string;
  data: {
    e: string;
    E: number;
    s: string;
    k: {
      t: number;
      T: number;
      s: string;
      i: string;
      f: number;
      L: number;
      o: string;
      c: string;
      h: string;
      l: string;
      v: string;
      n: number;
      x: boolean;
      q: string;
      V: string;
      Q: string;
      B: string;
    };
  };
}

function CryptoPrice() {
  const [data, setData] = useState<BinanceKlineData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('wss://data-stream.binance.vision:443/ws/btcusdt@kline_1m');

    socket.onmessage = (event) => {
      setData(JSON.parse(event.data) as BinanceKlineData);
    };

    // socket.onerror = (event) => {
    //   setError(event.message);
    // };

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

  return (
    <div>
      <h1>BTCUSDT Kline Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default CryptoPrice;