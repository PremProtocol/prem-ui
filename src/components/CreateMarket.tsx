// src/components/CreateMarket.tsx
import React, { useState } from 'react';
import './CreateMarket.css';

const CreateMarket: React.FC = () => {
  const [eventDescription, setEventDescription] = useState('');
  const [endTime, setEndTime] = useState('');
  const [outcomes, setOutcomes] = useState('');
  const [numOutcomes, setNumOutcomes] = useState(2);

  const handleCreateMarket = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Market created:', { eventDescription, endTime, outcomes, numOutcomes });
  };

  return (
    <div>
      <h2>Create Market</h2>
      <form className="form" onSubmit={handleCreateMarket}>
        <label>Event Description</label>
        <input
          type="text"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />
        <label>End Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <label>Outcomes (comma separated)</label>
        <input
          type="text"
          value={outcomes}
          onChange={(e) => setOutcomes(e.target.value)}
        />
        <label>Number of Outcomes</label>
        <input
          type="number"
          value={numOutcomes}
          onChange={(e) => setNumOutcomes(parseInt(e.target.value))}
          min="2"
        />
        <button type="submit">Create Market</button>
      </form>
    </div>
  );
};

export default CreateMarket;
