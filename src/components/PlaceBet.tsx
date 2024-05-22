// src/components/PlaceBet.tsx
import React, { useState } from 'react';
import './PlaceBet.css';

const PlaceBet: React.FC = () => {
  const [betAmount, setBetAmount] = useState('');
  const [outcome, setOutcome] = useState('');

  const handlePlaceBet = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Bet placed:', { betAmount, outcome });
  };

  return (
    <div>
      <h2>Place Bet</h2>
      <form className="form" onSubmit={handlePlaceBet}>
        <label>Bet Amount</label>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
        />
        <label>Outcome</label>
        <input
          type="text"
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
        />
        <button type="submit">Place Bet</button>
      </form>
    </div>
  );
};

export default PlaceBet;
