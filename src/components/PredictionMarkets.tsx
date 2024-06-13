import React from 'react';
import PredictionMarket from './PredictionMarket';
import "./PredictionMarkets.css";
import { useMarketFactoryContract } from '../hooks/useMarketFactoryContract';

const PredictionMarkets: React.FC = () => {
  const { address, predictionMarketCount } = useMarketFactoryContract();
  
  if (!address || !predictionMarketCount) {
    return ;
  }

  return (
    <div className="markets-list">
      {!predictionMarketCount || predictionMarketCount === 0 ? (
        <p className="centered-text"><strong>No prediction market available right now</strong></p>
        ) : (
        Array.from({ length: predictionMarketCount }).map((_, index) => (
          <PredictionMarket key={index} marketFactoryContractAddress={address} seqno={index}/>
        ))
      )}
    </div>
  );
};

export default PredictionMarkets;