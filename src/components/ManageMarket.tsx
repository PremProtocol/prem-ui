import './ManageMarket.css';
import { usePredictionMarketContract } from '../hooks/usePredictionMarketContract';
import { Skeleton } from 'antd';
import Modal from './internal/Modal';
import { useState } from 'react';
import usdtIcon from "./../assets/usdt-icon.svg";
import tonIcon from "./../assets/ton-icon.svg";

interface ManageMarketProps {
  key: number;
  marketFactoryContractAddress: string;
  seqno: number;
}

const ResolveMarket: React.FC<ManageMarketProps> = ({ marketFactoryContractAddress, seqno }) => {
  const { currentAttempt, predictionMarketDetails, resolveMarket, addLiquidity, removeLiquidity, claimFee } = usePredictionMarketContract(marketFactoryContractAddress, seqno);
  const MAX_RETRY_AMOUNT = import.meta.env.VITE_PREDICTION_MARKET_RETRY_COUNT
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('TON');
  const [lpAmount, setLpAmount] = useState(0);
  const [liquidityAction, setLiquidityAction] = useState('');

  if (currentAttempt === MAX_RETRY_AMOUNT) {
    return;
  }

  if (!predictionMarketDetails) {
    return <Skeleton active />;
  }
  
  const eventEnded = new Date(Number(predictionMarketDetails.endTime) * 1000) <= new Date();
  
  const handleResolve = (e, outcome: number) => {
    e.preventDefault();
    resolveMarket(outcome);
  };

  const openBetModal = (action: string) => {
    setLiquidityAction(action);
    setModalVisible(true);
  };

  const closeBetModal = () => {
    setModalVisible(false);
  };

  const handleAddLiquidity = (amount: number) => {
    addLiquidity(amount, 50);
  };

  const handleRemoveLiquidity = (amount: number) => {
    removeLiquidity(amount);
  };

  const handleClaimFee = () => {
    claimFee();
  };

  return (
    <div className="resolve-market-card">
      <h2>{predictionMarketDetails.eventDescription}</h2>
      <div className="resolve-market-content">
        <div className="resolve-market-info">
          <div className="resolve-market-details">
            <p><strong>End Time:</strong> {new Date(Number(predictionMarketDetails.endTime) * 1000).toLocaleString()}</p>
            <p><strong>Outcome 1:</strong> {predictionMarketDetails.outcomeName1}</p>
            <p><strong>Outcome 2:</strong> {predictionMarketDetails.outcomeName2}</p>
          </div>
        </div>
        <div className="resolve-market-controls">
          {predictionMarketDetails.resolved ? (
              <p className="centered-text"><strong>Resolved with outcome {Number(predictionMarketDetails.outcome) === 0 ? predictionMarketDetails.outcomeName1 : predictionMarketDetails.outcomeName2 }</strong></p>
             ) : (
              <div className='button-wrapper'>
                <div className="liqudity-section">
                  <button className="add-liqudity-button" onClick={() => openBetModal('add')} disabled={eventEnded}>Add Liquidity</button>
                  <button className="remove-liqudity-button" onClick={() => openBetModal('remove')}>Remove Liquidity</button>
                </div>
                <div className="resolve-section">
                  <button className="resolve-one-button" onClick={(e) => handleResolve(e, 0)} disabled={!eventEnded}>Resolve with {predictionMarketDetails.outcomeName1}</button>
                  <button className="resolve-two-button" onClick={(e) => handleResolve(e, 1)} disabled={!eventEnded}>Resolve with {predictionMarketDetails.outcomeName2}</button>
                </div>
                <div className="claim-fee-section">
                  <button className="claim-fee-button" onClick={() => handleClaimFee()}>Claim fees</button>
                </div>
              </div>
             )}
        </div>
      </div>
      <Modal visible={modalVisible} onClose={closeBetModal}>
        <h2>{predictionMarketDetails.eventDescription}</h2>
        <div className="lp-amount-input">
        <div className="custom-input">
              <input className="main-input" type="number" placeholder='0' onChange={(e) => setLpAmount(Number(e.target.value))}/>
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
        {liquidityAction === 'add' ? (
          <button className="liqudity-button" onClick={() => handleAddLiquidity(lpAmount)}>Add Liquidity</button>
        ) : (
          <button className="liqudity-button" onClick={() => handleRemoveLiquidity(lpAmount)}>Remove Liquidity</button>
        )}
      </Modal>
    </div>
  );
};

export default ResolveMarket;