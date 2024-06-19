import './ResolveMarket.css';
import { usePredictionMarketContract } from '../hooks/usePredictionMarketContract';
import { Skeleton } from 'antd';

interface ResolveMarketProps {
  key: number;
  marketFactoryContractAddress: string;
  seqno: number;
}

const ResolveMarket: React.FC<ResolveMarketProps> = ({ marketFactoryContractAddress, seqno }) => {
  const { currentAttempt, predictionMarketDetails, resolveMarket } = usePredictionMarketContract(marketFactoryContractAddress, seqno);
  const MAX_RETRY_AMOUNT = import.meta.env.VITE_PREDICTION_MARKET_RETRY_COUNT
  if (!predictionMarketDetails || currentAttempt !== MAX_RETRY_AMOUNT) {
    return <Skeleton active />;
  }
  
  const eventEnded = new Date(Number(predictionMarketDetails.endTime) * 1000) <= new Date();
  
  const handleResolve = (e, outcome: number) => {
    e.preventDefault();
    resolveMarket(outcome);
  };

  return (
    <div className="market-card">
      <h2>{predictionMarketDetails.eventDescription}</h2>
      <div className="market-content">
        <div className="market-info">
          <div className="market-details">
            <p><strong>End Time:</strong> {new Date(Number(predictionMarketDetails.endTime) * 1000).toLocaleString()}</p>
            <p><strong>Outcome 1:</strong> {predictionMarketDetails.outcomeName1}</p>
            <p><strong>Outcome 2:</strong> {predictionMarketDetails.outcomeName2}</p>
          </div>
        </div>
        <div className="market-controls">
          {predictionMarketDetails.resolved ? (
              <p className="centered-text"><strong>Resolved with outcome {Number(predictionMarketDetails.outcome) === 0 ? predictionMarketDetails.outcomeName1 : predictionMarketDetails.outcomeName2 }</strong></p>
             ) : (
              <div className="resolve-section">
                <button className="resolve-button" onClick={(e) => handleResolve(e, 0)} disabled={!eventEnded}>Resolve Market with {predictionMarketDetails.outcomeName1}</button>
                <button className="resolve-button" onClick={(e) => handleResolve(e, 1)} disabled={!eventEnded}>Resolve Market with {predictionMarketDetails.outcomeName2}</button>
              </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default ResolveMarket;