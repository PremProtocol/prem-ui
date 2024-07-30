import React, { useState } from 'react';
import './PredictionMarket.css';
import { usePredictionMarketContract } from '../hooks/usePredictionMarketContract';
import { useUserBetContract } from '../hooks/useUserBetContract';
import { fromNano } from '@ton/core';
import Modal from './internal/Modal';
import { Filter } from '../models/filter';
import usdtIcon from "./../assets/usdt-icon.svg";
import tonIcon from "./../assets/ton-icon.svg";
import arrowIcon from "./../assets/chevron.forward.right.svg";
import { Link } from 'react-router-dom';
import { PredictionMarketDetailsClonable } from '../models/predictionMarketDetails';
import { useTonConnect } from '../hooks/useTonConnect';

interface PredictionMarketProps {
  key: number;
  marketFactoryContractAddress: string;
  seqno: number;
  filter: Filter;
}

const PredictionMarket: React.FC<PredictionMarketProps> = ({ marketFactoryContractAddress, seqno, filter }) => {
  const MAX_RETRY_AMOUNT = import.meta.env.VITE_PREDICTION_MARKET_RETRY_COUNT
  const { wallet } = useTonConnect();
  const { currentAttempt, address, predictionMarketDetails, placeUserBet } = usePredictionMarketContract(marketFactoryContractAddress, seqno);
  const { userBet, claimWinnings } = useUserBetContract(address!);
  const [bet, setBet] = useState(0);
  const [outcomeText, setOutcomeText] = useState("");
  const [outcome, setOutcome] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('TON');
  
  if (currentAttempt === MAX_RETRY_AMOUNT) {
    return;
  }

  if (!predictionMarketDetails || !address) {
    return;
  }

  const predictionMarketDetailsClonable = new PredictionMarketDetailsClonable(predictionMarketDetails) 
  
  const eventEnded = new Date(Number(predictionMarketDetails.endTime) * 1000) <= new Date();
  const endTimeString = new Date(Number(predictionMarketDetails.endTime) * 1000).toLocaleString();
  
  if(eventEnded){
    return;
  }

  if(!!filter.searchQuery && !predictionMarketDetails.eventName.toLowerCase().includes(filter.searchQuery.toLowerCase())) {
    return;
  }
  
  if(filter.eventType && filter.eventType !== "All" && predictionMarketDetails.eventType !== filter.eventType) {
    return;
  }

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

  return (
    <div className="market-card">
      <h2>{predictionMarketDetails.eventName}</h2>
      <div className="market-content">
        <div className="info-row-group">
          <div className="info-row">
              <span className="info-title">End Time:</span>
              <span className="info-value white-text">{endTimeString}</span>
          </div>
          <div className="info-row">
              <span className="info-title">Outcome 1:</span>
              <span className="info-value blue-text">{predictionMarketDetails.outcomeName1}</span>
          </div>
          <div className="info-row">
              <span className="info-title">Outcome 2:</span>
              <span className="info-value red-text">{predictionMarketDetails.outcomeName2}</span>
          </div>
        </div>
        <div className="market-controls">
          {userBet ? (
            predictionMarketDetails.resolved ? (
              userBet.outcome === predictionMarketDetails.outcome ? (
                !userBet.isClaimed ? (
                  <div className="claim-section">
                    <label className="claim-label">Claim Amount:</label>
                    <div className="claim-amount">{fromNano(Number(userBet?.betAmount))}  <img src={tonIcon} alt="TON Icon" width='40' height='40' className="currency-icon"/></div>
                    <button className='claim-button' onClick={handleClaim} disabled={Number(userBet?.betAmount) === 0}>Claim</button>
                  </div>
                  ) : (
                    <p className="centered-text">Already claimed</p>
                  )
                ) : (
                  <p className="centered-text">This event was resolved with a different outcome than predicted.</p>
                )
              ) : (
                <p className="centered-text">Wait until host resolve the market</p>
              )
            ) : (
              !userBet ? (
                <div className="bet-buttons">
                  <button className="outcome-one-button" type="button" value="0" onClick={() => openBetModal(predictionMarketDetails.outcomeName1)}>Bet on #1</button>
                  <button className="outcome-two-button" type="button" value="1" onClick={() => openBetModal(predictionMarketDetails.outcomeName2)}>Bet on #2</button>
                </div>
              ) : (
                <div className="bet-buttons">
                  <button className="increase-bet-button" type="button" value={userBet?.outcome.toString()} onClick={() => openBetModal(userBet?.outcome === 0n ? predictionMarketDetails.outcomeName1 : predictionMarketDetails.outcomeName2)}>Increase position for {userBet?.outcome === 0n ? "#1" : "#2"}</button>
                </div>
              )
          )}
        </div>
        <Link to={`/prem-ui/market/${seqno}`}
          state={{ marketDetails: predictionMarketDetailsClonable }}
          className="learn-more">
          Learn more <img src={arrowIcon} alt="Arrow Icon"/>
        </Link>
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
        {wallet ? (
          <button className="bet-button" onClick={() => handleBet()}>Place Bet</button>
        ) : (
          <button className="bet-button" disabled>Wallet not connected</button>
        )}
        <p className='fee-info grey-text'>Fee: {Number(predictionMarketDetails.protocolFeePercentage) / 10} %</p>
      </Modal>
    </div>
  );
};

export default PredictionMarket;