import React from "react";


const CryptoLandingPage = () => {
  return (
    <div className="container">
      {/* Main container */}
      <div className="grid-container">
        {/* Crypto Assets Section */}
        <div className="box">
          <h2>Crypto Assets</h2>
          <div className="asset-list">
            <div className="asset-item">
              <span>BTC</span>
              <span>$43,500</span>
            </div>
            <div className="asset-item">
              <span>ETH</span>
              <span>$3,200</span>
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="box">
          <h2>Transactions</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John</td>
                <td>Buy</td>
                <td>$500</td>
                <td>2025-01-30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Trades Table */}
      <div className="box recent-trades">
        <h2>Recent Trades</h2>
        <table>
          <thead>
            <tr>
              <th>Trade ID</th>
              <th>Asset</th>
              <th>Trade Type</th>
              <th>Time Frame</th>
              <th>Risk Level</th>
              <th>Leverage</th>
              <th>Position Size</th>
              <th>Duration</th>
              <th>Current Price</th>
              <th>Entry Price</th>
              <th>Stop Loss</th>
              <th>Trailing SL</th>
              <th>Take Profit 1</th>
              <th>Take Profit 2</th>
              <th>Take Profit 3</th>
              <th>Market Condition</th>
              <th>Signal Message</th>
              <th>Date</th>
              <th>Time</th>
              <th>Projected Closure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td>BTC</td>
              <td>Long</td>
              <td>1H</td>
              <td>Medium</td>
              <td>10x</td>
              <td>$500</td>
              <td>3 Days</td>
              <td>$43,000</td>
              <td>$42,500</td>
              <td>$41,000</td>
              <td>$41,500</td>
              <td>$44,000</td>
              <td>$45,000</td>
              <td>$46,000</td>
              <td>Bullish</td>
              <td>Buy signal confirmed</td>
              <td>2025-01-30</td>
              <td>12:30 PM</td>
              <td>2025-02-02</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoLandingPage;