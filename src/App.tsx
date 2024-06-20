import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import CreateMarket from './components/CreateMarket';
import UserBets from './components/UserBets';
import { TonConnectButton } from '@tonconnect/ui-react';
import logo from './assets/logo.svg';
import homeIcon from './assets/navigation/home-icon.svg';
import betsIcon from './assets/navigation/bets-icon.svg';
import leadBoardIcon from './assets/navigation/leaderboard-icon.svg';
import './App.css';
import PredictionMarkets from './components/PredictionMarkets';
import '@twa-dev/sdk';
import { Tabbar } from '@telegram-apps/telegram-ui';
import { useState } from 'react';

interface Tab {
  id: string;
  path: string,
  text: string;
  icon: React.JSX.Element;
}

function App() {
  const navigate = useNavigate();
  const tabs: Tab[] = [{
    id: 'prediction-markets',
    text: 'Home',
    path: '/prem-ui/',
    icon: <img src={homeIcon} alt="homeIcon" className="homeIcon" />
  }, {
    id: 'user-bets',
    text: 'Bets',
    path: '/prem-ui/user-bets',
    icon: <img src={betsIcon} alt="betsIcon" className="betsIcon" />
  }, {
    id: 'create-market',
    text: 'Create',
    path: '/prem-ui/create-market',
    icon: <img src={leadBoardIcon} alt="leadBoardIcon" className="leadBoardIcon" />
  }]
  const [currentTab, setCurrentTab] = useState(tabs[0].id);
  const tabItemClick = (id: string, path: string) => {
    setCurrentTab(id);
    navigate(path);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-top">
          <img src={logo} alt="Logo" className="logo" />
          <TonConnectButton />
        </div>
      </header>
      <Tabbar>
        {tabs.map(({
        id,
        text,
        path,
        icon
      }) => <Tabbar.Item style={{ padding: "8px 10px 0px" }} key={id} text={text} selected={id === currentTab} onClick={() => tabItemClick(id, path)}>
            {icon}  
          </Tabbar.Item>)}
      </Tabbar>
      <Routes>
        <Route path="/prem-ui/" element={<PredictionMarkets />} />
        <Route path="/prem-ui/user-bets" element={<UserBets />} />
        <Route path="/prem-ui/create-market" element={<CreateMarket />} />
      </Routes>
    </div>
  );
}

export default App;