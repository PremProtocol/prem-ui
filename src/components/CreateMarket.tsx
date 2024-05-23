// src/components/CreateMarket.tsx
import React, { useState } from 'react';
import './CreateMarket.css';

const CreateMarket: React.FC = () => {
  const [eventDescription, setEventDescription] = useState('');
  const [endTime, setEndTime] = useState('');
  const [outcomes, setOutcomes] = useState('');
  const [numOutcomes, setNumOutcomes] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle create market logic here
    console.log({ eventDescription, endTime, outcomes, numOutcomes });
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
          Outcomes (comma separated):
          <input
            type="text"
            value={outcomes}
            onChange={(e) => setOutcomes(e.target.value)}
          />
        </label>
        <label>
          Number of Outcomes:
          <input
            type="number"
            value={numOutcomes}
            onChange={(e) => setNumOutcomes(Number(e.target.value))}
            min="2"
          />
        </label>
        <button type="submit">Create Market</button>
      </form>
    </div>
  );
};

export default CreateMarket;
