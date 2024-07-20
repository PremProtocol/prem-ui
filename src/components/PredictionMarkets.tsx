import React, { useState } from 'react';
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
    { id: 2, label: 'Elections' },
    { id: 3, label: 'Crypto' },
    { id: 4, label: 'Awards' },
    { id: 5, label: 'Sports' },
  ];
  const [activeTab, setActiveTab] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [filter, setFilter] = useState<Filter>(new Filter());

  if (!address) {
    return ;
  }

  const handleCategoryChange = (category: EventType) => {
    setActiveTab(category.id);
    filter.eventType = category.label;
    setFilter(filter);
  }

  const onChangeSearch = (e) => {
    setSearchQuery(e.target.value);
    filter.searchQuery = searchQuery;
    setFilter(filter);
  }
  const handleSearchClick = (e) => {
    setSearchQuery(e.target.value);
    filter.searchQuery = searchQuery;
    setFilter(filter);
  };
  return (
    <div className="markets-list">
      <div>
        <div className="search-container">
        <input type="text" className="search-input" placeholder="Search" value={searchQuery} onChange={(e) => onChangeSearch(e)}/>
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
        {!predictionMarketCount || predictionMarketCount === 0 ? (
          <p className="centered-text"><strong>No prediction market available right now</strong></p>
          ) : (
          Array.from({ length: predictionMarketCount }).map((_, index) => (
            <PredictionMarket key={index} marketFactoryContractAddress={address} seqno={index} filter={filter}/>
          ))
        )}
      </div>
    </div>
  );
};

export default PredictionMarkets;