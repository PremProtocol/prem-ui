import { useLocation } from 'react-router-dom';
import './MarketDetails.css';
import Modal from './internal/Modal';
import { useState } from 'react';
import { usePredictionMarketContract } from '../hooks/usePredictionMarketContract';
import usdtIcon from "./../assets/usdt-icon.svg";
import tonIcon from "./../assets/ton-icon.svg";
import { fromNano } from '@ton/core';

const MarketDetails = () => {
  const location = useLocation();
  const { marketDetails } = location.state || {};
  const { placeUserBet } = usePredictionMarketContract(marketDetails.parent, marketDetails.seqno);
  const [bet, setBet] = useState(0);
  const [outcomeText, setOutcomeText] = useState("");
  const [outcome, setOutcome] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('TON');
  console.log(marketDetails);
  const endTimeString = new Date(Number(marketDetails.endTime) * 1000).toLocaleString();
  
  const handleBet = () => {
    console.log(bet, outcome);
    placeUserBet(bet, Number(outcome));
    setModalVisible(false);
  };

  const openBetModal = (outcome: string) => {
    setOutcomeText(outcome);
    setOutcome(outcome === marketDetails.outcomeName1 ? 0 : 1);
    setModalVisible(true);
  };

  const closeBetModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="market-details">
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
      <div className="bet-buttons">
        <button className="outcome-one-button" type="button" value="0" onClick={() => openBetModal(marketDetails.outcomeName1)}>Bet on #1</button>
        <button className="outcome-two-button" type="button" value="1" onClick={() => openBetModal(marketDetails.outcomeName2)}>Bet on #2</button>
      </div>
      <div className="about">
        <p>Total bets: {fromNano(marketDetails.totalPool)} TON</p>
        <p>Total outcome 1 bets: {fromNano(marketDetails.totalOutcome1Bets)} TON</p>
        <p>Total outcome 2 bets: {fromNano(marketDetails.totalOutcome2Bets)} TON</p>
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