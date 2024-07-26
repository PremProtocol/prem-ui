// src/components/UserBets.tsx
import React from 'react';
import { useMarketFactoryContract } from '../hooks/useMarketFactoryContract';
import UserBet from './UserBet';
import './UserBets.css';
import { useTonWallet } from '@tonconnect/ui-react';


const UserBets: React.FC = () => {
  const { address, predictionMarketCount } = useMarketFactoryContract();
  const wallet = useTonWallet();
  if (!address || predictionMarketCount === undefined) {
    return ;
  }

  return (
    <div className="placed-bets">
      {wallet ? (
        predictionMarketCount === 0 ? (
          <p className="centered-text"><strong>You have no bet on any prediction market right now</strong></p>
          ) : (
            Array.from({ length: predictionMarketCount }).map((_, index) => (
              <UserBet key={index} marketFactoryContractAddress={address} seqno={index}/>
            ))
      )) : (
        <p className="centered-text"><strong>Please connect your wallet to view your bets</strong></p>
      )}
    </div>
  );
};

export default UserBets;