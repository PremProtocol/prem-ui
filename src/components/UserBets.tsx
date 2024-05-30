// src/components/UserBets.tsx
import React from 'react';
import { useMarketFactoryContract } from '../hooks/useMarketFactoryContract';
import UserBet from './UserBet';
import './UserBets.css';
import Loader from "react-js-loader";

const UserBets: React.FC = () => {
  const { predictionMarketDetailsArray, predictionMarketCount } = useMarketFactoryContract();

  if (!predictionMarketDetailsArray) {
    return <Loader type="spinner-default" bgColor="#000" color="#000" title={"Loading..."} size={100} />;
  }

  return (
    <div className="placed-bets">
      {predictionMarketCount === 0 ? (
        <p className="centered-text"><strong>You have no bet on any prediction market right now</strong></p>
        ) : (
          predictionMarketDetailsArray.map((details, index) => (
            <UserBet key={index} predictionMarketDetails={details} />
          ))
      )}
    </div>
  );
};

export default UserBets;