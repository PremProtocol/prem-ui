// src/components/PlaceBet.tsx
import React from 'react';
import './UserBet.css';
import { useUserBetContract } from '../hooks/useUserBetContract';
import { fromNano } from '@ton/core';
import { usePredictionMarketContract } from '../hooks/usePredictionMarketContract';
import { Skeleton } from 'antd';

interface UserBetProps {
  key: number;
  marketFactoryContractAddress: string;
  seqno: number;
}

const UserBet: React.FC<UserBetProps> = ({ marketFactoryContractAddress, seqno }) => {
  const MAX_RETRY_AMOUNT = import.meta.env.VITE_PREDICTION_MARKET_RETRY_COUNT
  const { currentAttempt, address, predictionMarketDetails } = usePredictionMarketContract(marketFactoryContractAddress, seqno);
  const { userBet, isNotUserBetContract, claimWinnings } = useUserBetContract(address!);
  
  if ((!predictionMarketDetails || !address) && currentAttempt !== MAX_RETRY_AMOUNT) {
    return <Skeleton active />;
  }
  
  const eventEnded = new Date(Number(predictionMarketDetails.endTime) * 1000) <= new Date();
  
  const handleClaim = () => {
    claimWinnings();
  };
  
  if(!userBet || isNotUserBetContract) {
    return;
  }

  return (
    <div className="user-bet-card">
      <div className="user-bet-content">
        <h2>{predictionMarketDetails.eventDescription}</h2>
        <div className="user-bet-info">
          <p><strong>End Time:</strong> {new Date(Number(predictionMarketDetails.endTime) * 1000).toLocaleString()}</p>
          <p><strong>Your Bet:</strong> {fromNano(userBet.betAmount)} TON on {userBet.outcome === 0n ? predictionMarketDetails.outcomeName1 : predictionMarketDetails.outcomeName2}</p>
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
