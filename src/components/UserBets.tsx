// src/components/UserBets.tsx
import React from 'react';
import { useMarketFactoryContract } from '../hooks/useMarketFactoryContract';
import UserBet from './UserBet';
import './UserBets.css';


const UserBets: React.FC = () => {
  const { address, predictionMarketCount } = useMarketFactoryContract();

  if (!address || predictionMarketCount === undefined) {
    return ;
  }

  return (
    <div className="placed-bets">
      {predictionMarketCount === 0 ? (
        <p className="centered-text"><strong>You have no bet on any prediction market right now</strong></p>
        ) : (
          Array.from({ length: predictionMarketCount }).map((_, index) => (
            <UserBet key={index} marketFactoryContractAddress={address} seqno={index}/>
          ))
      )}
    </div>
  );
};

export default UserBets;