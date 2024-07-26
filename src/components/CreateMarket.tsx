import React, { useState } from 'react';
import './CreateMarket.css';
import { useMarketFactoryContract } from '../hooks/useMarketFactoryContract';
import ManageMarkets from './ManageMarkets';
import { useTonWallet } from '@tonconnect/ui-react';

const CreateMarket: React.FC = () => {
  const {createMarket} = useMarketFactoryContract();
  const wallet = useTonWallet();
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [endTime, setEndTime] = useState('');
  const [outcomeName1, setOutcomeName1] = useState('');
  const [outcomeName2, setOutcomeName2] = useState('');
  const eventTypes = ['Crypto', 'Elections', 'Awards', 'Sports', 'Other'];
  const [eventType, setEventType] = useState(eventTypes[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endTimeNumber = Date.parse(endTime) / 1000;
    await createMarket(eventName, eventDescription, eventType, endTimeNumber, outcomeName1, outcomeName2);
  };

  return (
    <div className="create-market-container">
      <h1>Event Information</h1>
      <form className="form" onSubmit={handleSubmit}>
      <input
          className="input-field"
          type="text"
          placeholder='Event Name'
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder='Event Description'
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />
        <select className="select-dropdown" value={eventType} onChange={(e) => setEventType(e.target.value)}>
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          className="datetime-input"
          type="datetime-local"
          value={endTime}
          placeholder='End Time'
          onChange={(e) => setEndTime(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder='Outcome 1'
          value={outcomeName1}
          onChange={(e) => setOutcomeName1(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          value={outcomeName2}
          placeholder='Outcome 2'
          onChange={(e) => setOutcomeName2(e.target.value)}
        />
        {wallet ? (
            <button className="create-market-button" type="submit">Create Market</button>
          ) : (
            <button className="create-market-button" type="submit" disabled>Wallet not connected</button>
          )
        }
        
      </form>
      {wallet && <ManageMarkets />}
    </div>
  );
};

export default CreateMarket;
