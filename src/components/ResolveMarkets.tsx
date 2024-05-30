import React from 'react';
import "./ResolveMarkets.css";
import { useMarketFactoryContract } from '../hooks/useMarketFactoryContract';
import Loader from "react-js-loader";
import ResolveMarket from './ResolveMarket';

const ResolveMarkets: React.FC = () => {
  const { predictionMarketDetailsArray } = useMarketFactoryContract();

  console.log(predictionMarketDetailsArray)
  if (!predictionMarketDetailsArray) {
    return <Loader type="spinner-default" bgColor="#000" color="#000" title={"Loading..."} size={100} />;
  }

  return (
    <div className="markets-list">
      {predictionMarketDetailsArray.map((market, index) => (
        <ResolveMarket key={index} market={market} />
      ))}
    </div>
  );
};

export default ResolveMarkets;