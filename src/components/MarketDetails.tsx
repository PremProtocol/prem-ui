import { useLocation } from 'react-router-dom';
import './MarketDetails.css';

const MarketDetails = () => {
  const location = useLocation();
  const { marketDetails } = location.state || {};
  console.log(marketDetails);
  return (
    <div className="market-details">
      <h1>{marketDetails.eventDescription}</h1>
      <div className="outcomes">
        <div className="outcome">
          <div className="outcome-name"><span className='grey-text'>#1</span> {marketDetails.outcomeName1}</div>
          <div className="outcome-probability blue-text">
            {((marketDetails.totalOutcome1Bets / marketDetails.totalPool) * 100).toFixed(0)}% chance
          </div>
        </div>
        <div className="outcome">
          <div className="outcome-name"><span className='grey-text'>#2</span> {marketDetails.outcomeName2}</div>
          <div className="outcome-probability red-text">
            {((marketDetails.totalOutcome2Bets / marketDetails.totalPool) * 100).toFixed(0)}% chance
          </div>
        </div>
      </div>
      <div className="chart"></div>
      <div className="bet-buttons">
        <button className="outcome-one-button" type="button" value="0" onClick={() => openBetModal(predictionMarketDetails.outcomeName1)}>Bet on #1</button>
        <button className="outcome-two-button" type="button" value="1" onClick={() => openBetModal(predictionMarketDetails.outcomeName2)}>Bet on #2</button>
      </div>
      <div className="about">
        <h2>About</h2>
        <p>{marketDetails.eventDescription}</p>
      </div>
    </div>
  );
};

export default MarketDetails;