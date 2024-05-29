// src/components/PlaceBet.tsx
import React from 'react';
import './UserBet.css';
import { useUserBetContract } from '../hooks/useUserBetContract';
import { PredictionMarketDetails } from '../hooks/useMarketFactoryContract';
import { fromNano } from '@ton/core';
import Loader from "react-js-loader";

const UserBet: React.FC<PredictionMarketDetails> = ({ predictionMarketDetails }) => {
  const { userBet, isNotUserBetContract, claimWinnings } = useUserBetContract(predictionMarketDetails.selfAddress);
  const eventEnded = new Date(Number(predictionMarketDetails.endTime) * 1000) <= new Date();
  const claimingAmount: number = 0;
  const handleClaim = () => {
    claimWinnings();
  };

  if (!userBet && !isNotUserBetContract) {
    return <Loader type="spinner-default" bgColor="#000" color="#000" title={"Loading..."} size={100} />;
  }

  
  if(isNotUserBetContract) {
    return;
  }

  return (
    <div className="user-bet-card">
      <div className="user-bet-content">
        <h2>{predictionMarketDetails.eventDescription}</h2>
        <div className="user-bet-info">
          <p><strong>End Time:</strong> {new Date(Number(predictionMarketDetails.endTime) * 1000).toLocaleString()}</p>
          <p><strong>Your Bet:</strong> {fromNano(userBet.betAmount)} TON on {userBet.outcome === 1n ? predictionMarketDetails.outcomeName1 : predictionMarketDetails.outcomeName2}</p>
        </div>
      </div>
      <div className="market-controls">
        {eventEnded ? (
            predictionMarketDetails.resolved ? (
            <p>Wait until host resolve the market</p>
            ) : (
            <div className="claim-section">
              <label className="claim-label">Claim Amount:</label>
              <div className="claim-amount">{claimingAmount}</div>
              <button onClick={handleClaim} disabled={claimingAmount === 0}>Claim</button>
            </div>
            )
        ) : (
          <p>Wait until end of event</p>
        )}
      </div>
    </div>
  );
};

export default UserBet;
