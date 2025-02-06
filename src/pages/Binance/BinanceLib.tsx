import React, { useEffect } from 'react';
import { Spot } from '@binance/connector-typescript';
import { Buffer } from 'buffer';
import * as CryptoJS from 'crypto-js';

(globalThis as any).Buffer = Buffer;

function BinanceLib() {

const API_KEY = 'RXf8O7WU63cr4E6BROxwMpiZrAJYrbzoJW3selbxScEZ02xqfiWBcUFro7IwCPyQ';
const API_SECRET = 'ylfoM9jEs5pKNMv8JuXOMSw5WyjoU02Kyi42XynJDYc7t4IidIsd9DSZGtXxtwOS';
const BASE_URL = 'https://api.binance.com/api/v3';

useEffect(() => {
    const fetchData = async () => {
        const client = new Spot(API_KEY, API_SECRET, { baseURL: BASE_URL });
       
        // try {
        //   const res = await client.accountInfo();
        //   console.log(res);
        // } catch (err) {
        //   console.log(err);
        // }


        const options = {
          recvWindow: 5000,
        };
    
        client.accountInformation(options).then((res) => {
          console.log("=====start=====");
          console.log(res);
          console.log("=====end=====");
        }).catch((err) => {
          console.error(err);
        });



      };
  
      fetchData();
}, [])


  return (
    <div>
      
    </div>
  )
}

export default BinanceLib
