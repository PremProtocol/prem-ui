import React from 'react';
import PredictionMarket from './PredictionMarket';
import "./PredictionMarkets.css";
import { useMarketFactoryContract } from '../hooks/useMarketFactoryContract';
import searchIcon from '../assets/search-icon.svg';
import { EventType } from '../models/eventType';
import { Filter } from '../models/filter';

const PredictionMarkets: React.FC = () => {
  const { address, predictionMarketCount } = useMarketFactoryContract();
  const categories: EventType[] = [
    { id: 1, label: 'All' },
    { id: 2, label: 'Politics' },
    { id: 3, label: 'Sports' },
    { id: 4, label: 'Crypto' },
    { id: 5, label: 'Business' },
  ];
  const [activeTab, setActiveTab] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState<string | undefined>(undefined);
  const filter: Filter = {
    searchQuery: undefined,
    eventType: categories[0].label,
  }
  if (!address || !predictionMarketCount) {
    return ;
  }
  const handleCategoryChange = (category: EventType) => {
    setActiveTab(category.id);
    filter.eventType = category.label;
  }
  const handleSearchClick = (e) => {
    filter.searchQuery = searchQuery;
    console.log('search clicked: ' + e.target.value);
  };
  return (
    <div className="markets-list">
      {!predictionMarketCount || predictionMarketCount === 0 ? (
        <p className="centered-text"><strong>No prediction market available right now</strong></p>
        ) : (
          <div>
            <div className="search-container">
              <input type="text" className="search-input" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
              <i className="search-icon"><img src={searchIcon} alt="searchIcon" className="searchIcon" onClick={handleSearchClick}/></i>
            </div>

            <div className="tab-container">
              <div className="tab-buttons">
                {categories.map((category) => (
                  <label key={category.id} className="tab-label">
                    <input
                      type="radio"
                      name="tab"
                      value={category.id}
                      checked={activeTab === category.id}
                      onChange={() => handleCategoryChange(category)}
                      className="tab-input"
                    />
                    <span className={`tab-button ${activeTab === category.id ? 'active' : ''}`}>
                      {category.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            {Array.from({ length: predictionMarketCount }).map((_, index) => (
              <PredictionMarket key={index} marketFactoryContractAddress={address} seqno={index} filter={filter}/>
            ))}
          </div>
      )}
    </div>
  );
};

export default PredictionMarkets;