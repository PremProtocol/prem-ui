// src/components/CreateMarket.tsx
import React, { useState } from 'react';
import './CreateMarket.css';
import { useMarketFactoryContract } from '../hooks/useMainFactoryContract';
import { usePredictionMarketContract } from '../hooks/usePredictionMarketContract';

type Market = {
  eventDescription: string;
  endTime: string;
  outcomeName1: string;
  outcomeName2: string;
};

const CreateMarket: React.FC = () => {
  const {predictionMarketCount, createMarket, getChildAddress} = useMarketFactoryContract();
  const [eventDescription, setEventDescription] = useState('');
  const [endTime, setEndTime] = useState('');
  const [outcomeName1, setOutcomeName1] = useState('');
  const [outcomeName2, setOutcomeName2] = useState('');
  const [childSeqno, setChildSeqno] = useState('');
  const [childAddress, setChildAddress] = useState('');
  const {placeUserBet, getPredictionMarket} = usePredictionMarketContract(childAddress);
  const [markets, setMarkets] = useState<Market[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle create market logic here
    console.log({ eventDescription, endTime, outcomeName1, outcomeName2 });
    const endTimeNumber = Date.parse(endTime) / 1000;
    createMarket(eventDescription, endTimeNumber, outcomeName1, outcomeName2);

    const newMarket: Market = {
      eventDescription,
      endTime,
      outcomeName1,
      outcomeName2,
    }
    setMarkets(prevMarkets => [...prevMarkets, newMarket]);
  };

  const getPredictionMarketAddress = async () => {
    const childAddress = await getChildAddress(childSeqno);
    console.log(childAddress);
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

        <p>{predictionMarketCount}</p>
        <label>
          ChildSeqno:
          <input
            type="text"
            value={childSeqno}
            onChange={(e) => setChildSeqno(e.target.value)}
          />
        </label>
        <button type="button" onClick={getPredictionMarketAddress}>Get Child Address</button>
        <button type="button" onClick={getPredictionMarketDetails}>Get Prediction Market Details</button>
      </form>
      <div className="markets-list">
        {markets.map((market, index) => (
          <div key={index} className="market-card">
            <h2>{market.eventDescription}</h2>
            <div className="market-details">
              <p><strong>End Time:</strong> {market.endTime}</p>
              <p><strong>Outcome 1:</strong> {market.outcomeName1}</p>
              <p><strong>Outcome 2:</strong> {market.outcomeName2}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateMarket;
