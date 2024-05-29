import React from 'react';
import PredictionMarket from './PredictionMarket';
import "./PredictionMarkets.css";
import { useMarketFactoryContract } from '../hooks/useMarketFactoryContract';
import Loader from "react-js-loader";

const PredictionMarkets: React.FC = () => {
  const { predictionMarketDetailsArray } = useMarketFactoryContract();

  console.log(predictionMarketDetailsArray)
  if (!predictionMarketDetailsArray) {
    return <Loader type="spinner-default" bgColor="#000" color="#000" title={"Loading..."} size={100} />;
  }

  return (
    <div className="markets-list">
      {predictionMarketDetailsArray.map((market, index) => (
        <PredictionMarket key={index} market={market} />
      ))}
    </div>
  );
};

export default PredictionMarkets;