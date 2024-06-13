import React, { useState } from 'react';
import './PredictionMarket.css';
import { usePredictionMarketContract } from '../hooks/usePredictionMarketContract';
import { useUserBetContract } from '../hooks/useUserBetContract';
import { fromNano } from '@ton/core';
import { Skeleton } from 'antd';

interface PredictionMarketProps {
  key: number;
  marketFactoryContractAddress: string;
  seqno: number;
}

const PredictionMarket: React.FC<PredictionMarketProps> = ({ marketFactoryContractAddress, seqno }) => {
  const { address, predictionMarketDetails, placeUserBet } = usePredictionMarketContract(marketFactoryContractAddress, seqno);
  const { userBet, claimWinnings } = useUserBetContract(address!);
  const [bet, setBet] = useState(0);

  if (!predictionMarketDetails || !address) {
    return <Skeleton active />;
  }

  const eventEnded = new Date(Number(predictionMarketDetails.endTime) * 1000) <= new Date();
  const handleBetChange = (e) => {
    setBet(e.target.value);
  };

  const handleClaim = () => {
    claimWinnings();
  };

  const handleBetSubmit = (e) => {
    e.preventDefault();
    const outcome = e.nativeEvent.submitter.value;
    placeUserBet(bet, Number(outcome));
  };

  return (
    <div className="market-card">
      <h2>{predictionMarketDetails.eventDescription}</h2>
      <div className="market-content">
        <div className="market-info">
          <div className="market-details">
            <p><strong>End Time:</strong> {new Date(Number(predictionMarketDetails.endTime) * 1000).toLocaleString()}</p>
            <p><strong>Outcome 1:</strong> {predictionMarketDetails.outcomeName1}</p>
            <p><strong>Outcome 2:</strong> {predictionMarketDetails.outcomeName2}</p>
          </div>
        </div>
        <div className="market-controls">
          {eventEnded ? (
             predictionMarketDetails.resolved && userBet ? (
              <div className="claim-section">
                <label className="claim-label">Claim Amount:</label>
                <div className="claim-amount">{fromNano(Number(userBet?.betAmount))}</div>
                <button onClick={handleClaim} disabled={Number(userBet?.betAmount) === 0}>Claim</button>
              </div>
             ) : (
              <p>Wait until host resolve the market</p>
             )
          ) : (
            <form onSubmit={handleBetSubmit} className="bet-form">
            <div className="bet-control">
              <label>Bet:</label>
              <input type="number" value={bet} onChange={handleBetChange} style={{ textAlign: 'center' }} />
              <strong>TON</strong>
            </div>
              <div className="bet-buttons">
                <button type="submit" value="0">Bet on {predictionMarketDetails.outcomeName1}</button>
                <button type="submit" value="1">Bet on {predictionMarketDetails.outcomeName2}</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionMarket;