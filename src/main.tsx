import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

// this manifest is used temporarily for development purposes
const manifestUrl = 'https://artemgontar.github.io/prem-ui/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider 
    manifestUrl={manifestUrl}
    uiPreferences={{theme: THEME.LIGHT}}
    // actionsConfiguration={{
    //   twaReturnUrl: 'https://t.me/<YOUR_APP_NAME>'
    // }}
  >
      <App />
  </TonConnectUIProvider>,
)
