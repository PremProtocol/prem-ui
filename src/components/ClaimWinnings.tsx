// src/components/ClaimWinnings.tsx
import React from 'react';
import './ClaimWinnings.css';

const ClaimWinnings: React.FC = () => {
  const handleClaim = () => {
    // Handle claim winnings logic here
    console.log('Claim winnings');
  };

  return (
    <div className="form-container">
      <button className="button" onClick={handleClaim}>
        Claim Winnings
      </button>
    </div>
  );
};

export default ClaimWinnings;
