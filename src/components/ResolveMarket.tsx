import './ResolveMarket.css';
import { usePredictionMarketContract } from '../hooks/usePredictionMarketContract';

const ResolveMarket = ({ market }) => {
  const { resolveMarket } = usePredictionMarketContract(market.selfAddress);
  const eventEnded = new Date(Number(market.endTime) * 1000) <= new Date();
  
  const handleResolve = (e, outcome: number) => {
    e.preventDefault();
    console.log(outcome);
    resolveMarket(outcome);
  };

  return (
    <div className="market-card">
      <h2>{market.eventDescription}</h2>
      <div className="market-content">
        <div className="market-info">
          <div className="market-details">
            <p><strong>End Time:</strong> {new Date(Number(market.endTime) * 1000).toLocaleString()}</p>
            <p><strong>Outcome 1:</strong> {market.outcomeName1}</p>
            <p><strong>Outcome 2:</strong> {market.outcomeName2}</p>
          </div>
        </div>
        <div className="market-controls">
          {market.resolved ? (
              <p className="centered-text"><strong>Resolved with outcome {Number(market.outcome) === 0 ? market.outcomeName1 : market.outcomeName2 }</strong></p>
             ) : (
              <div className="resolve-section">
                <button className="resolve-button" onClick={(e) => handleResolve(e, 0)} disabled={!eventEnded}>Resolve Market with {market.outcomeName1}</button>
                <button className="resolve-button" onClick={(e) => handleResolve(e, 1)} disabled={!eventEnded}>Resolve Market with {market.outcomeName2}</button>
              </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default ResolveMarket;