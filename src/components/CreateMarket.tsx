// src/components/CreateMarket.tsx
import React, { useState } from 'react';
import './CreateMarket.css';
import { useMarketFactoryContract } from '../hooks/useMarketFactoryContract';
import ResolveMarkets from './ResolveMarkets';
import { Input } from '@telegram-apps/telegram-ui';
//import { message } from 'antd';

const CreateMarket: React.FC = () => {
  const {createMarket} = useMarketFactoryContract();
  const [eventDescription, setEventDescription] = useState('');
  const [endTime, setEndTime] = useState('');
  const [outcomeName1, setOutcomeName1] = useState('');
  const [outcomeName2, setOutcomeName2] = useState('');
  const eventTypes = ['Crypto', 'Elections', 'Awards', 'Sports', 'Other'];
  const [eventType, setEventType] = useState(eventTypes[0]);
  //const [messageApi, contextHolder] = message.useMessage();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endTimeNumber = Date.parse(endTime) / 1000;
    await createMarket(eventDescription, eventType, endTimeNumber, outcomeName1, outcomeName2);
  };

  return (
    <div className="create-market-container">
      <h1>Event Information</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Event Description:
          <input
            type="text"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </label>
        <label>
          Event Type:
          <select className="select-dropdown" value={eventType} onChange={(e) => setEventType(e.target.value)}>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label>
          End Time:
          <input
            className="datetime-input"
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        <label>
          Outcome 1:
          <input
            type="text"
            value={outcomeName1}
            onChange={(e) => setOutcomeName1(e.target.value)}
          />
        </label>
        <label>
          Outcome 2:
          <input
            type="text"
            value={outcomeName2}
            onChange={(e) => setOutcomeName2(e.target.value)}
          />
        </label>
        <button className="create-market-button" type="submit">Create Market</button>
      </form>
      <ResolveMarkets />
    </div>
  );
};

export default CreateMarket;
