import React from 'react';
import PredictionMarket from './PredictionMarket';
import "./PredictionMarkets.css";
import { useMarketFactoryContract } from '../hooks/useMarketFactoryContract';
import searchIcon from '../assets/search-icon.svg';

interface Tab {
  id: number;
  label: string;
}

const PredictionMarkets: React.FC = () => {
  const { address, predictionMarketCount } = useMarketFactoryContract();
  const tabs: Tab[] = [
    { id: 1, label: 'All' },
    { id: 2, label: 'Politics' },
    { id: 3, label: 'Sports' },
    { id: 4, label: 'Crypto' },
    { id: 5, label: 'Business' },
  ];
  const [activeTab, setActiveTab] = React.useState(1);

  if (!address || !predictionMarketCount) {
    return ;
  }
  const handleSearchClick = () => {
    console.log('search clicked');
  };
  return (
    <div className="markets-list">
      {!predictionMarketCount || predictionMarketCount === 0 ? (
        <p className="centered-text"><strong>No prediction market available right now</strong></p>
        ) : (
          <div>
            <div className="search-container">
              <input type="text" className="search-input" placeholder="Search" />
              <i className="search-icon"><img src={searchIcon} alt="searchIcon" className="searchIcon" onClick={handleSearchClick}/></i>
            </div>

            <div className="tab-container">
              <div className="tab-buttons">
                {tabs.map((tab) => (
                  <label key={tab.id} className="tab-label">
                    <input
                      type="radio"
                      name="tab"
                      value={tab.id}
                      checked={activeTab === tab.id}
                      onChange={() => setActiveTab(tab.id)}
                      className="tab-input"
                    />
                    <span className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}>
                      {tab.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            {Array.from({ length: predictionMarketCount }).map((_, index) => (
              <PredictionMarket key={index} marketFactoryContractAddress={address} seqno={index}/>
            ))}
          </div>
      )}
    </div>
  );
};

export default PredictionMarkets;