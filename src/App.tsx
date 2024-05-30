import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CreateMarket from './components/CreateMarket';
import UserBets from './components/UserBets';
import { TonConnectButton } from '@tonconnect/ui-react';
import logo from './assets/logo.svg';
import './App.css';
import PredictionMarkets from './components/PredictionMarkets';
import '@twa-dev/sdk';

function App() {
  return (
    <Router>
      <div className="container">
        <header className="header">
          <div className="header-top">
            <img src={logo} alt="Logo" className="logo" /> {/* Icon on the left */}
            <TonConnectButton /> {/* TonConnectButton on the right */}
          </div>
          <nav>
            <Link to="/prem-ui/">Home</Link>
            <Link to="/prem-ui/pre-markets">Pre-Markets</Link>
            <Link to="/prem-ui/user-bets">User Bets</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/prem-ui/" element={<CreateMarket />} />
          <Route path="/prem-ui/pre-markets" element={<PredictionMarkets />} />
          <Route path="/prem-ui/user-bets" element={<UserBets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;