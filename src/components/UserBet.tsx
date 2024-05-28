// src/components/PlaceBet.tsx
import React from 'react';
import './UserBet.css';
import { useUserBetContract } from '../hooks/useUserBetContract';
import { Address } from '@ton/core';

interface UserBetProps {
  predictionMarketContractAddress: Address;
}

const UserBet: React.FC<UserBetProps> = ({ predictionMarketContractAddress }) => {
  console.log(predictionMarketContractAddress);
  const {address} = useUserBetContract(predictionMarketContractAddress);

  return (
    <div className="place-bet">
      {address}
    </div>
  );
};

export default UserBet;
