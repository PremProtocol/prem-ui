import React from 'react';
import PredictionMarket from './PredictionMarket';
import "./PredictionMarkets.css";
import { useMarketFactoryContract } from '../hooks/useMarketFactoryContract';
import Loader from "react-js-loader";

const PredictionMarkets: React.FC = () => {
  const { predictionMarketDetailsArray, predictionMarketCount } = useMarketFactoryContract();

  if (!predictionMarketDetailsArray) {
    return <Loader type="spinner-default" bgColor="#000" color="#000" title={"Loading..."} size={100} />;
  }

  return (
    <div className="markets-list">
      {predictionMarketCount === 0 ? (
        <p className="centered-text"><strong>No prediction market available right now</strong></p>
        ) : (
        predictionMarketDetailsArray.map((market, index) => (
          <PredictionMarket key={index} market={market} />
        ))
      )}
    </div>
  );
};

export default PredictionMarkets;