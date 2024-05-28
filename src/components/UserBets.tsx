// src/components/UserBets.tsx
import React from 'react';
import { useMarketFactoryContract } from '../hooks/useMarketFactoryContract';
import UserBet from './UserBet';
import './UserBets.css';

const UserBets: React.FC = () => {
  const { predictionMarketDetailsArray } = useMarketFactoryContract();

  console.log(predictionMarketDetailsArray);
  return (
    <div className="place-bets">
      {predictionMarketDetailsArray.map((details, index) => (
        <UserBet key={index} predictionMarketContractAddress={details.selfAddress} />
      ))}
    </div>
  );
};

export default UserBets;