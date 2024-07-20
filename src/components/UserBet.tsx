// src/components/PlaceBet.tsx
import React from 'react';
import './UserBet.css';
import { useUserBetContract } from '../hooks/useUserBetContract';
import { fromNano } from '@ton/core';
import { usePredictionMarketContract } from '../hooks/usePredictionMarketContract';
import { Skeleton } from 'antd';
import tonIcon from "./../assets/ton-icon.svg";

interface UserBetProps {
  key: number;
  marketFactoryContractAddress: string;
  seqno: number;
}

const UserBet: React.FC<UserBetProps> = ({ marketFactoryContractAddress, seqno }) => {
  const MAX_RETRY_AMOUNT = import.meta.env.VITE_PREDICTION_MARKET_RETRY_COUNT
  const { currentAttempt, address, predictionMarketDetails } = usePredictionMarketContract(marketFactoryContractAddress, seqno);
  const { userBet, isNotUserBetContract, claimWinnings } = useUserBetContract(address!);
  
  if (currentAttempt === MAX_RETRY_AMOUNT) {
    return;
  }

  if (!predictionMarketDetails || !address) {
    return <Skeleton active />;
  }
  
  const eventEnded = new Date(Number(predictionMarketDetails.endTime) * 1000) <= new Date();
  const endTimeString = new Date(Number(predictionMarketDetails.endTime) * 1000).toLocaleString();

  const handleClaim = () => {
    claimWinnings();
  };
  
  if(!userBet || isNotUserBetContract) {
    return;
  }

  const userOutcome = userBet.outcome === 0n ? {
    cssClass: 'blue-text',
    outcome: predictionMarketDetails.outcomeName1
  } : {
    cssClass: 'red-text',
    outcome: predictionMarketDetails.outcomeName2
  };


  return (
    <div className="user-bet-card">
      <h2>{predictionMarketDetails.eventDescription}</h2>
      <div className="user-bet-content">
        <div className="info-row-group">
          <div className="info-row">
              <span className="info-title">End Time:</span>
              <span className="info-value white-text">{endTimeString}</span>
          </div>
          <div className="info-row">
              <span className="info-title">Your outcome:</span>
              <span className={`info-value ${userOutcome.cssClass}`}>{userOutcome.outcome}</span>
          </div>
          <div className="info-row">
              <span className="info-title">Your Bet:</span>
              <div className="info-row-icon-wrapper">
                <span className="info-value white-text">{fromNano(userBet.betAmount)} </span>
                <img src={tonIcon} alt="TON Icon" className="user-bet-currency-icon"/>
              </div>

          </div>
          <div className="info-row">
              <span className="info-title">Sell Price:</span>
              <span className="info-value white-text">TBD</span>
          </div>
        </div>
      </div>
      <div className="market-controls">
        {eventEnded ? (
            predictionMarketDetails.resolved ? (
              userBet.outcome === predictionMarketDetails.outcome ? (
                <div className="claim-section">
                  <label className="claim-label">Claim Amount:</label>
                  <div className="claim-amount">{fromNano(Number(userBet.betAmount))}</div>
                  <button className='claim-button' onClick={handleClaim} disabled={Number(userBet.betAmount) === 0}>Claim</button>
                </div>
              ) : (
                <p className="centered-text">You lost the bet</p>
              )
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
