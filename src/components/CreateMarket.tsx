// src/components/CreateMarket.tsx
import React, { useState } from 'react';
import './CreateMarket.css';
import { useMarketFactoryContract } from '../hooks/useMarketFactoryContract';
import ResolveMarkets from './ResolveMarkets';

const CreateMarket: React.FC = () => {
  const {addNewPredictionMarket, createMarket} = useMarketFactoryContract();
  const [eventDescription, setEventDescription] = useState('');
  const [endTime, setEndTime] = useState('');
  const [outcomeName1, setOutcomeName1] = useState('');
  const [outcomeName2, setOutcomeName2] = useState('');
  const [eventType, setEventType] = useState('');
  const eventTypes = ['Crypto', 'Elections', 'Awards', 'Sports', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const endTimeNumber = Date.parse(endTime) / 1000;
    createMarket(eventDescription, eventType, endTimeNumber, outcomeName1, outcomeName2);
    addNewPredictionMarket();
  };

  return (
    <div className="create-market-container">
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
          Event Type:
          <select className="select-dropdown" value={eventType} onChange={(e) => setEventType(e.target.value)}>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label>
          End Time:
          <input
            className="datetime-input"
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
      <ResolveMarkets />
    </div>
  );
};

export default CreateMarket;
