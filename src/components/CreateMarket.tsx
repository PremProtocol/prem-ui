// src/components/CreateMarket.tsx
import React, { useState } from 'react';
import './CreateMarket.css';
import { useMarketFactoryContract } from '../hooks/useMarketFactoryContract';
import { usePredictionMarketContract } from '../hooks/usePredictionMarketContract';
import PredictionMarket from './PredictionMarket';

type Market = {
  eventDescription: string;
  endTime: string;
  outcomeName1: string;
  outcomeName2: string;
};

const CreateMarket: React.FC = () => {
  const {predictionMarketDetailsArray, addNewPredictionMarket, createMarket, getChildAddress} = useMarketFactoryContract();
  const [eventDescription, setEventDescription] = useState('');
  const [endTime, setEndTime] = useState('');
  const [outcomeName1, setOutcomeName1] = useState('');
  const [outcomeName2, setOutcomeName2] = useState('');
  const [childSeqno] = useState('');
  const [childAddress, setChildAddress] = useState('');
  const {placeUserBet, getPredictionMarket} = usePredictionMarketContract(childAddress);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const endTimeNumber = Date.parse(endTime) / 1000;
    createMarket(eventDescription, endTimeNumber, outcomeName1, outcomeName2);
    addNewPredictionMarket();
  };

  const getPredictionMarketDetails = async () => {
    const childAddress = await getChildAddress(childSeqno);
    setChildAddress(childAddress ?? '');

    console.log(childAddress);
    const details = await getPredictionMarket();
    console.log(childAddress, details);
  }

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Event Description:
          <input
            type="text"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </label>
        <label>
          End Time:
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        <label>
          Outcome 1:
          <input
            type="text"
            value={outcomeName1}
            onChange={(e) => setOutcomeName1(e.target.value)}
          />
        </label>
        <label>
          Outcome 2:
          <input
            type="text"
            value={outcomeName2}
            onChange={(e) => setOutcomeName2(e.target.value)}
          />
        </label>
        <button type="submit">Create Market</button>
      </form>
      <div className="markets-list">
        {predictionMarketDetailsArray.map((market, index) => (
          <PredictionMarket key={index} market={market} />
        ))}
      </div>
    </div>
  );
};

export default CreateMarket;
