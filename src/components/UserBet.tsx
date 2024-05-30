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
            <div className="claim-section">
              <label className="claim-label">Claim Amount:</label>
              <div className="claim-amount">{fromNano(Number(userBet.betAmount))}</div>
              <button onClick={handleClaim} disabled={Number(userBet.betAmount) === 0}>Claim</button>
            </div>
            ) : (
            <p className="centered-text">Wait until host resolve the market</p>
            )
        ) : (
          <p className="centered-text">Wait until end of event</p>
        )}
      </div>
    </div>
  );
};

export default UserBet;
