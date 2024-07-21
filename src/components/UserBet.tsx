// src/components/PlaceBet.tsx
import React, { useState } from 'react';
import './UserBet.css';
import { useUserBetContract } from '../hooks/useUserBetContract';
import { fromNano } from '@ton/core';
import { usePredictionMarketContract } from '../hooks/usePredictionMarketContract';
import { Skeleton } from 'antd';
import tonIcon from "./../assets/ton-icon.svg";
import Modal from './internal/Modal';

interface UserBetProps {
  key: number;
  marketFactoryContractAddress: string;
  seqno: number;
}

const UserBet: React.FC<UserBetProps> = ({ marketFactoryContractAddress, seqno }) => {
  const MAX_RETRY_AMOUNT = import.meta.env.VITE_PREDICTION_MARKET_RETRY_COUNT
  const { currentAttempt, address, predictionMarketDetails, placeUserBet } = usePredictionMarketContract(marketFactoryContractAddress, seqno);
  const { userBet, isNotUserBetContract, claimWinnings } = useUserBetContract(address!);
  const [bet, setBet] = useState(0);
  const [outcomeText, setOutcomeText] = useState("");
  const [outcome, setOutcome] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('TON');
  
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

  const handleBet = () => {
    placeUserBet(bet, Number(outcome));
    setModalVisible(false);
  };

  const openBetModal = (outcome: string) => {
    setOutcomeText(outcome);
    setOutcome(outcome === predictionMarketDetails.outcomeName1 ? 0 : 1);
    setModalVisible(true);
  };

  const closeBetModal = () => {
    setModalVisible(false);
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
                <img src={tonIcon} alt="TON Icon" width='18' height='18' className="user-bet-currency-icon"/>
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
                !userBet.isClaimed ? (
                  <div className="claim-section">
                    <label className="claim-label">Claim Amount:</label>
                    <div className="claim-amount">{fromNano(Number(userBet.betAmount))} <img src={tonIcon} alt="TON Icon" width='40' height='40' className="currency-icon"/></div>
                    <button className='claim-button' onClick={handleClaim} disabled={Number(userBet.betAmount) === 0}>Claim</button>
                  </div>
                ) : (
                  <p className="centered-text">Already claimed</p>
                )
              ) : (
                <p className="centered-text">You lost the bet</p>
              )
            ) : (
            <p className="centered-text">Wait until host resolve the market</p>
            )
        ) : (
          <div className="bet-buttons">
            <button className="increase-bet-button" type="button" value={userBet?.outcome.toString()} onClick={() => openBetModal(userOutcome.outcome)}>Increase position for {userOutcome.outcome}</button>
          </div>
        )}
      </div>
      <Modal visible={modalVisible} onClose={closeBetModal}>
        <h2>{predictionMarketDetails.eventDescription}</h2>
        <div className="info-row">
            <span className="info-title">End Time:</span>
            <span className="info-value">{endTimeString}</span>
        </div>
        <div className="info-row">
            <span className="info-title">Your Outcome:</span>
            <span className={`info-value ${outcome === 0 ? 'blue-text' : 'red-text'}`}>{outcomeText}</span>
        </div>
        <div className="bet-input">
        <div className="custom-input">
              <input className="main-input" type="number" placeholder='0' onChange={(e) => setBet(Number(e.target.value))}/>
              <div className="separator"></div>
              <div className="select-container">
              {selectedCurrency === 'TON' && <img src={tonIcon} width='18' height='18' alt="TON Icon" className="currency-icon"/>}
              {selectedCurrency === 'USDT' && <img src={usdtIcon} width='18' height='18' alt="USDT Icon" className="currency-icon"/>}
                <select onChange={(e) => setSelectedCurrency(e.target.value)}>
                    <option value="TON">TON</option>
                    <option disabled value="USDT">USDT</option>
                </select>
              </div>
          </div>
        </div>
        <button className="bet-button" onClick={() => handleBet()}>Place Bet</button>
        <p className='fee-info grey-text'>Fee: {Number(predictionMarketDetails.protocolFeePercentage) / 10} %</p>
      </Modal>
    </div>
  );
};

export default UserBet;
