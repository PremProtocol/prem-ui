// src/components/CreateMarket.tsx
import React, { useState } from 'react';
import './CreateMarket.css';
import { useMarketFactoryContract } from '../hooks/useMainFactoryContract';

const CreateMarket: React.FC = () => {
  const {childAddress, createMarket} = useMarketFactoryContract();
  const [eventDescription, setEventDescription] = useState('');
  const [endTime, setEndTime] = useState('');
  const [outcomeName1, setOutcomeName1] = useState('');
  const [outcomeName2, setOutcomeName2] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle create market logic here
    console.log({ eventDescription, endTime, outcomeName1, outcomeName2 });
    const endTimeNumber = Date.parse(endTime) / 1000;
    createMarket(eventDescription, endTimeNumber, outcomeName1, outcomeName2);
  };

  const getChildAddress = () => {
    // Handle get child address logic here
    console.log(childAddress);
  };

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
        <button type="button" onClick={getChildAddress}>Get Child Address</button>
      </form>
    </div>
  );
};

export default CreateMarket;
