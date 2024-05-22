// src/components/ClaimWinnings.tsx
import React from 'react';
import './ClaimWinnings.css';

const ClaimWinnings: React.FC = () => {
  const handleClaimWinnings = () => {
    console.log('Winnings claimed');
  };

  return (
    <div>
      <h2>Claim Winnings</h2>
      <button className="button" onClick={handleClaimWinnings}>Claim Winnings</button>
    </div>
  );
};

export default ClaimWinnings;
