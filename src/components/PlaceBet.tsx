// src/components/PlaceBet.tsx
import React, { useState } from 'react';
import './PlaceBet.css';

const PlaceBet: React.FC = () => {
  const [betAmount, setBetAmount] = useState('');
  const [selectedOutcome, setSelectedOutcome] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle place bet logic here
    console.log({ betAmount, selectedOutcome });
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Bet Amount:
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
          />
        </label>
        <label>
          Select Outcome:
          <input
            type="text"
            value={selectedOutcome}
            onChange={(e) => setSelectedOutcome(e.target.value)}
          />
        </label>
        <button type="submit">Place Bet</button>
      </form>
    </div>
  );
};

export default PlaceBet;
