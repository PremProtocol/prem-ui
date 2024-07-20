import React from 'react';
import "./ManageMarkets.css";
import { useMarketFactoryContract } from '../hooks/useMarketFactoryContract';
import ManageMarket from './ManageMarket';

const ResolveMarkets: React.FC = () => {
  const { address, predictionMarketCount } = useMarketFactoryContract();
  
  if (!address || !predictionMarketCount) {
    return ;
  }

  return (
    <div className="resolve-markets-list">
      {Array.from({ length: predictionMarketCount }).map((_, index) => (
        <ManageMarket key={index} marketFactoryContractAddress={address} seqno={index}/>
      ))}
    </div>
  );
};

export default ResolveMarkets;