import React, { useState, useEffect } from 'react';

import * as CryptoJS from 'crypto-js';

const apiKey = 'RXf8O7WU63cr4E6BROxwMpiZrAJYrbzoJW3selbxScEZ02xqfiWBcUFro7IwCPyQ';
const apiSecret = 'ylfoM9jEs5pKNMv8JuXOMSw5WyjoU02Kyi42XynJDYc7t4IidIsd9DSZGtXxtwOS';

const generateSignature = (queryString: string) => {
  const encodedQueryString = encodeURIComponent(queryString).replace(/%20/g, '+');
  const signature = CryptoJS.HmacSHA256(encodedQueryString, apiSecret).toString(CryptoJS.enc.Hex);
  return signature;
};

const BinanceAccountInfo = () => {
  const [accountInfo, setAccountInfo] = useState({});

  useEffect(() => {
    const fetchServerTime = async () => {
        try {
          const response = await fetch('https://api.binance.com/api/sapi/v1/time');
          const data = await response.json();
          const serverTime = data.serverTime;
          const recvWindow = 5000; // Set recvWindow to 5000ms
          const timestamp = serverTime + (Math.random() * recvWindow); // Generate a random timestamp within the recvWindow
          const queryString = `timestamp=${timestamp}&recvWindow=${recvWindow}`;
          const signature = generateSignature(queryString);
          const url = `https://api.binance.com/api/v3/account?${queryString}&signature=${signature}`;
          console.log(url);
          try {
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'X-MBX-APIKEY': apiKey,
              },
            });
            const data = await response.json();
            console.log(data);
            setAccountInfo(data);
          } catch (error) {
            console.error(error);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchServerTime();
  }, []);

  return (
    <div>
      <h1>Account Info</h1>
      <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
    </div>
  );
};

export default BinanceAccountInfo;