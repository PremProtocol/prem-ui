import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CreateMarket from './components/CreateMarket';
import PlaceBet from './components/PlaceBet';
import ClaimWinnings from './components/ClaimWinnings';
import { TonConnectButton } from '@tonconnect/ui-react';

function App() {

  return (
    <Router>
    <div className="container">
      <header className="header">
        <h1>Prediction Market</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/create-market">Create Market</Link> | <Link to="/place-bet">Place Bet</Link> | <Link to="/claim-winnings">Claim Winnings</Link>
        </nav>
      <TonConnectButton />
      </header>
      <Routes>
        <Route path="/create-market" element={<CreateMarket />} />
        <Route path="/place-bet" element={<PlaceBet />} />
        <Route path="/claim-winnings" element={<ClaimWinnings />} />
        <Route path="/" element={
          <div>
            <h2>Welcome to the Prediction Market</h2>
            <p>Select an action to get started.</p>
          </div>
        } />
      </Routes>
    </div>
  </Router>
  );
}

export default App;