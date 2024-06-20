import ReactDOM from 'react-dom/client';
import './index.css';
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
import App from './App';
import { AppRoot } from '@telegram-apps/telegram-ui';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { BrowserRouter } from 'react-router-dom';

// this manifest is used temporarily for development purposes
const manifestUrl = 'https://artemgontar.github.io/prem-ui/tonconnect-manifest.json';

window.Telegram.WebApp.MainButton.expand();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider 
    manifestUrl={manifestUrl}
    uiPreferences={{theme: THEME.LIGHT}}
    // actionsConfiguration={{
    //   twaReturnUrl: 'https://t.me/<YOUR_APP_NAME>'
    // }}
  >
    <AppRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppRoot>
  </TonConnectUIProvider>
)
