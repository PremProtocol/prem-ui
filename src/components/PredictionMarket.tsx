import React, { useState } from 'react';
import './PredictionMarket.css';

const PredictionMarket = ({ market }) => {
  const [bet, setBet] = useState(0);

  const handleBetChange = (e) => {
    setBet(e.target.value);
  };

  const handleBetSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling the bet here
    console.log(`Bet ${bet} on market ${market.eventDescription}`);
  };

  return (
    <div className="market-card">
      <h2>{market.eventDescription}</h2>
      <div className="market-content">
        <div className="market-info">
          <div className="market-details">
            <p><strong>End Time:</strong> {market.endTime}</p>
            <p><strong>Outcome 1:</strong> {market.outcomeName1}</p>
            <p><strong>Outcome 2:</strong> {market.outcomeName2}</p>
          </div>
        </div>
        <div className="market-controls">
          <form onSubmit={handleBetSubmit}>
            <div className="bet-control">
              <label>Bet:</label>
              <input type="number" value={bet} onChange={handleBetChange} />
            </div>
            <button type="submit">Place Bet</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PredictionMarket;