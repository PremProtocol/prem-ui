import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CreateMarket from './components/CreateMarket';
import UserBets from './components/UserBets';
import { TonConnectButton } from '@tonconnect/ui-react';
import logo from './assets/logo.svg';
import './App.css';
import PredictionMarkets from './components/PredictionMarkets';

function App() {
  return (
    <Router>
      <div className="container">
        <header className="header">
          <img src={logo} alt="Logo" className="logo" /> {/* Icon on the left */}
          <nav>
            <Link to="/">Home</Link>
            <Link to="/pre-markets">Pre-Markets</Link>
            <Link to="/user-bets">User Bets</Link>
          </nav>
          <TonConnectButton /> {/* TonConnectButton on the right */}
        </header>
        <Routes>
          <Route path="/" element={<CreateMarket />} />
          <Route path="/pre-markets" element={<PredictionMarkets />} />
          <Route path="/user-bets" element={<UserBets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;