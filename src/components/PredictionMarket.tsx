import React, { useState } from 'react';
import './PredictionMarket.css';
import { usePredictionMarketContract } from '../hooks/usePredictionMarketContract';

const PredictionMarket = ({ market }) => {
  const { placeUserBet } = usePredictionMarketContract(market.selfAddress);
  const [bet, setBet] = useState(0);
  const eventEnded = new Date(Number(market.endTime) * 1000) <= new Date();
  const claimingAmount: number = 0;
  const handleBetChange = (e) => {
    setBet(e.target.value);
  };

  const handleClaim = () => {
    console.log('Claiming');
  };

  const handleBetSubmit = (e) => {
    e.preventDefault();
    const outcome = e.nativeEvent.submitter.value;
    // Add your logic for handling the bet here
    console.log(`Bet ${bet} TON on market ${market.eventDescription}, on outcome ${outcome}`);
    placeUserBet(bet, Number(outcome));
  };

  return (
    <div className="market-card">
      <h2>{market.eventDescription}</h2>
      <div className="market-content">
        <div className="market-info">
          <div className="market-details">
            <p><strong>End Time:</strong> {new Date(Number(market.endTime) * 1000).toLocaleString()}</p>
            <p><strong>Outcome 1:</strong> {market.outcomeName1}</p>
            <p><strong>Outcome 2:</strong> {market.outcomeName2}</p>
          </div>
        </div>
        <div className="market-controls">
          {eventEnded ? (
            <div className="claim-section">
              <label className="claim-label">Claim Amount:</label>
              <div className="claim-amount">{claimingAmount}</div>
              <button onClick={handleClaim} disabled={claimingAmount === 0}>Claim</button>
            </div>
          ) : (
            <form onSubmit={handleBetSubmit} className="bet-form">
            <div className="bet-control">
              <label>Bet:</label>
              <input type="number" value={bet} onChange={handleBetChange} style={{ textAlign: 'center' }} />
              <strong>TON</strong>
            </div>
              <div className="bet-buttons">
                <button type="submit" value="1">Bet on {market.outcomeName1}</button>
                <button type="submit" value="2">Bet on {market.outcomeName2}</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionMarket;