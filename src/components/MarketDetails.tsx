import { useLocation, useNavigate } from 'react-router-dom';
import './MarketDetails.css';
import Modal from './internal/Modal';
import { useState } from 'react';
import { usePredictionMarketContract } from '../hooks/usePredictionMarketContract';
import usdtIcon from "./../assets/usdt-icon.svg";
import tonIcon from "./../assets/ton-icon.svg";
import { fromNano } from '@ton/core';
import { BackButton } from '@vkruglikov/react-telegram-web-app';
import { useUserBetContract } from '../hooks/useUserBetContract';

const MarketDetails = () => {
  const location = useLocation();
  const { marketDetails } = location.state || {};
  const { address, placeUserBet } = usePredictionMarketContract(marketDetails.parent, marketDetails.seqno);
  const { userBet, claimWinnings } = useUserBetContract(address!);
  const [bet, setBet] = useState(0);
  const [outcomeText, setOutcomeText] = useState("");
  const [outcome, setOutcome] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('TON');

  const eventEnded = new Date(Number(marketDetails.endTime) * 1000) <= new Date();
  const endTimeString = new Date(Number(marketDetails.endTime) * 1000).toLocaleString();

  console.log(marketDetails);
  const handleBet = () => {
    placeUserBet(bet, Number(outcome));
    setModalVisible(false);
  };

  const handleClaim = () => {
    claimWinnings();
  };

  const openBetModal = (outcome: string) => {
    setOutcomeText(outcome);
    setOutcome(outcome === marketDetails.outcomeName1 ? 0 : 1);
    setModalVisible(true);
  };

  const closeBetModal = () => {
    setModalVisible(false);
  };

  const navigate = useNavigate();

  return (
    <div className="market-details">

      <BackButton onClick={() => navigate('/prem-ui')} />
      <p>{marketDetails.eventType}</p>
      <h1>{marketDetails.eventDescription}</h1>
      <div className="outcomes">
        <div className="outcome">
          <div className="outcome-name"><span className='grey-text'>#1</span> {marketDetails.outcomeName1}</div>
          <div className="outcome-probability blue-text">
            {((marketDetails.totalOutcome1Bets / marketDetails.totalPool) * 100).toFixed(0)}% chance
          </div>
        </div>
        <div className="outcome">
          <div className="outcome-name"><span className='grey-text'>#2</span> {marketDetails.outcomeName2}</div>
          <div className="outcome-probability red-text">
            {((marketDetails.totalOutcome2Bets / marketDetails.totalPool) * 100).toFixed(0)}% chance
          </div>
        </div>
      </div>
      <div className="chart"></div>
      {eventEnded ? (
        userBet ? (
          marketDetails.resolved ? (
            userBet.outcome === marketDetails.outcome ? (
              <div className="claim-section">
                <label className="claim-label">Claim Amount:</label>
                <div className="claim-amount">{fromNano(Number(userBet?.betAmount))} <img src={tonIcon} alt="TON Icon" width='40' height='40' className="currency-icon"/></div>
                <button className='claim-button' onClick={handleClaim} disabled={Number(userBet?.betAmount) === 0}>Claim</button>
              </div>
              ) : (
                <p className="centered-text">This event was resolved with a different outcome than predicted.</p>
              )
            ) : (
              <p className="centered-text">Wait until host resolve the market</p>
            )
          ) : (
            <p className="centered-text">Event ended</p>   
          )
      ) : (
        <div className="bet-buttons">
          <button className="outcome-one-button" type="button" value="0" onClick={() => openBetModal(marketDetails.outcomeName1)}>Bet on #1</button>
          <button className="outcome-two-button" type="button" value="1" onClick={() => openBetModal(marketDetails.outcomeName2)}>Bet on #2</button>
        </div>
      )}
      <div className="about">
        <p>Total bets: {fromNano(marketDetails.totalPool)} <img src={tonIcon} alt="TON Icon" width='18' height='18' className="currency-icon"/></p>
        <p>Total outcome 1 bets: {fromNano(marketDetails.totalOutcome1Bets)} <img src={tonIcon} alt="TON Icon" width='18' height='18' className="currency-icon"/></p>
        <p>Total outcome 2 bets: {fromNano(marketDetails.totalOutcome2Bets)} <img src={tonIcon} alt="TON Icon" width='18' height='18' className="currency-icon"/></p>
        <p>Protocol Fee: {marketDetails.protocolFeePercentage / 10} %</p>
        <p>Resolved: {marketDetails.resolved.toLocaleString()}</p>
        <h2>About</h2>
        <p>{marketDetails.eventDescription}</p>
      </div>
      <Modal visible={modalVisible} onClose={closeBetModal}>
        <h2>{marketDetails.eventDescription}</h2>
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
              {selectedCurrency === 'TON' && <img src={tonIcon} alt="TON Icon" className="currency-icon"/>}
              {selectedCurrency === 'USDT' && <img src={usdtIcon} alt="USDT Icon" className="currency-icon"/>}
                <select onChange={(e) => setSelectedCurrency(e.target.value)}>
                    <option value="TON">TON</option>
                    <option disabled value="USDT">USDT</option>
                </select>
              </div>
          </div>
        </div>
        <button className="bet-button" onClick={() => handleBet()}>Place Bet</button>
        <p className='fee-info grey-text'>Fee: {Number(marketDetails.protocolFeePercentage) / 10} %</p>
      </Modal>
    </div>
  );
};

export default MarketDetails;