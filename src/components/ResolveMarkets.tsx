import React from 'react';
import "./ResolveMarkets.css";
import { useMarketFactoryContract } from '../hooks/useMarketFactoryContract';
import ResolveMarket from './ResolveMarket';

const ResolveMarkets: React.FC = () => {
  const { address, predictionMarketCount } = useMarketFactoryContract();
  
  if (!address || !predictionMarketCount) {
    return ;
  }

  return (
    <div className="resolve-markets-list">
      {Array.from({ length: predictionMarketCount }).map((_, index) => (
        <ResolveMarket key={index} marketFactoryContractAddress={address} seqno={index}/>
      ))}
    </div>
  );
};

export default ResolveMarkets;