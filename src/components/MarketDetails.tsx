import { useLocation } from 'react-router-dom';

const MarketDetails = () => {
  const location = useLocation();
  const { marketDetails } = location.state || {};
  console.log(marketDetails.eventDescription);
  return (
    <div>
      <h1>Market Details</h1>
      <p>{marketDetails.eventDescription}</p>
    </div>
  );
};

export default MarketDetails;