import ReactDOM from 'react-dom/client';
import './index.css';
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
import App from './App';
import { AppRoot } from '@telegram-apps/telegram-ui';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { BrowserRouter } from 'react-router-dom';

// this manifest is used temporarily for development purposes
const manifestUrl = 'https://premprotocol.github.io/prem-ui/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider 
    manifestUrl={manifestUrl}
    uiPreferences={{theme: THEME.LIGHT}}
    actionsConfiguration={{
      twaReturnUrl: 'https://t.me/prem_ton_bot/prem'
    }}
  >
    <AppRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppRoot>
  </TonConnectUIProvider>
)
