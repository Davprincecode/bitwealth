import React, { useState } from 'react';

const SignalForm = () => {
  const [direction, setDirection] = useState('');
  const [currency, setCurrency] = useState('');
  const [entryPoint, setEntryPoint] = useState('');
  const [takeProfit1, setTakeProfit1] = useState('');
  const [takeProfit2, setTakeProfit2] = useState('');
  const [takeProfit3, setTakeProfit3] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [riskRewardRatio, setRiskRewardRatio] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [confidenceLevel, setConfidenceLevel] = useState('');
  const [trend, setTrend] = useState('');
  const [supportLevel, setSupportLevel] = useState('');
  const [resistanceLevel, setResistanceLevel] = useState('');
  const [signalMessage, setSignalMessage] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const signalData = {
      direction,
      currency,
      entryPoint,
      takeProfit1,
      takeProfit2,
      takeProfit3,
      stopLoss,
      riskRewardRatio,
      timeframe,
      confidenceLevel,
      trend,
      supportLevel,
      resistanceLevel,
      signalMessage,
    };
    // Send the signal data to the server
    console.log(signalData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Signal Details</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-6 mb-2">
              <label className="form-label">Direction*</label>
              <select
                name="direction"
                className="default-select form-control wide"
                required
                value={direction}
                onChange={(event) => setDirection(event.target.value)}
              >
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </select>
            </div>
            <div className="col-lg-6 mb-2">
              <label className="form-label">Currency*</label>
              <input
                type="text"
                name="currency"
                className="form-control"
                required
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
              />
            </div>
            <div className="col-lg-6 mb-2">
              <label className="form-label">Entry Point*</label>
              <input
                type="text"
                name="entryPoint"
                className="form-control"
                required
                value={entryPoint}
                onChange={(event) => setEntryPoint(event.target.value)}
              />
            </div>
            <div className="col-lg-6 mb-2">
              <label className="form-label">Take Profit 1*</label>
              <input
                type="text"
                name="takeProfit1"
                className="form-control"
                required
                value={takeProfit1}
                onChange={(event) => setTakeProfit1(event.target.value)}
              />
            </div>
            <div className="col-lg-6 mb-2">
              <label className="form-label">Take Profit 2</label>
              <input
                type="text"
                name="takeProfit2"
                className="form-control"
                value={takeProfit2}
                onChange={(event) => setTakeProfit2(event.target.value)}
              />
            </div>
            <div className="col-lg-6 mb-2">
              <label className="form-label">Take Profit 3</label>
              <input
                type="text"
                name="takeProfit3"
                className="form-control"
                value={takeProfit3}
                onChange={(event) => setTakeProfit3(event.target.value)}
              />
            </div>
            <div className="col-lg-6 mb-2">
              <label className="form-label">Stop Loss*</label>
              <input
                type="text"
                name="stopLoss"
                className="form-control"
                required
                value={stopLoss}
                onChange={(event) => setStopLoss(event.target.value)}
              />
            </div>
            <div className="col-lg-6 mb-2">
              <label className="form-label">Risk/Reward Ratio</label>
              <input
                type="text"
                name="riskRewardRatio"
                className="form-control"
                value={riskRewardRatio}
                onChange={(event) => setRiskRewardRatio(event.target.value)}
              />
            </div>
            <div className="col-lg-6 mb-2">
              <label className="form-label">Timeframe*</label>
              <select
  name="timeframe"
  className="form-control wide"
  required
  value={timeframe}
  onChange={(event) => setTimeframe(event.target.value)}
>
  <option value="">Select Option</option>
  <option value="1 Hour">1 Hour</option>
  <option value="2 Hours">2 Hours</option>
  <option value="3 Hours">3 Hours</option>
  <option value="4 Hours">4 Hours</option>
  <option value="6 Hours">6 Hours</option>
  <option value="12 Hours">12 Hours</option>
  <option value="24 Hours">24 Hours</option>
  <option value="1 Week">1 Week</option>
  <option value="1 Month">1 Month</option>
</select>
</div>
<div className="col-lg-6 mb-2">
  <label className="form-label">Confidence Level*</label>
  <input
    type="text"
    name="confidenceLevel"
    className="form-control"
    required
    value={confidenceLevel}
    onChange={(event) => setConfidenceLevel(event.target.value)}
  />
</div>
<div className="col-lg-6 mb-2">
  <label className="form-label">Trend*</label>
  <select
    name="trend"
    className="default-select form-control wide"
    required
    value={trend}
    onChange={(event) => setTrend(event.target.value)}
  >
    <option value="Bullish">Bullish</option>
    <option value="Bearish">Bearish</option>
  </select>
</div>
<div className="col-lg-6 mb-2">
  <label className="form-label">Support Level*</label>
  <input
    type="text"
    name="supportLevel"
    className="form-control"
    required
    value={supportLevel}
    onChange={(event) => setSupportLevel(event.target.value)}
  />
</div>
<div className="col-lg-6 mb-2">
  <label className="form-label">Resistance Level*</label>
  <input
    type="text"
    name="resistanceLevel"
    className="form-control"
    required
    value={resistanceLevel}
    onChange={(event) => setResistanceLevel(event.target.value)}
  />
</div>
<div className="col-lg-6 mb-2">
  <label className="form-label">Signal Status</label>
  <select
    name="signalStatus"
    className="default-select form-control wide"
    required
    disabled
  >
    <option value="Pending" selected>Pending</option>
  </select>
</div>
<div className="col-lg-12 mb-2">
  <label className="form-label">Additional Message</label>
  <textarea
    name="signalMessage"
    className="form-control"
    // rows="5"
    value={signalMessage}
    onChange={(event) => setSignalMessage(event.target.value)}
  />
</div>
<div className="col-lg-12">
  <button type="submit" className="btn btn-primary">
    Post Signal
  </button>
</div>
</div>
</div>
</div>
</form>
);
};

export default SignalForm;