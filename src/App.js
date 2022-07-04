import React, { Suspense, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core/styles';
// import blue from '@material-ui/core/colors/blue';
import NavigationFrame from './components/NavigationFrame';
import { ConnectionProvider } from './utils/connection';
import WalletPage from './pages/WalletPage';
import { useWallet, WalletProvider } from './utils/wallet';
import { ConnectedWalletsProvider } from './utils/connected-wallets';
import { TokenRegistryProvider } from './utils/tokens/names';
import LoadingIndicator from './components/LoadingIndicator';
import { SnackbarProvider } from 'notistack';
import PopupPage from './pages/PopupPage';
import LoginPage from './pages/LoginPage';
import ConnectionsPage from './pages/ConnectionsPage';
import { isExtension } from './utils/utils';
import { PageProvider, usePage } from './utils/page';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness5Icon from '@material-ui/icons/Brightness5';

export default function App() {
  // TODO: add toggle for dark mode
  const [darkState, setDarkState] = useState(true);
  const colorMode = darkState ? 'dark' : 'light';

  const icon = darkState ? <Brightness4Icon /> : <Brightness5Icon />;

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: colorMode,
          primary: {
            main: '#285EEC',
          },
        },

        // TODO consolidate popup dimensions
        ext: '450',
      }),
    [colorMode],
  );

  const handleThemeChange = () => {
    darkState ? setDarkState(false) : setDarkState(true);
  };

  // Disallow rendering inside an iframe to prevent clickjacking.
  if (window.self !== window.top) {
    return null;
  }

  let appElement = (
    <NavigationFrame>
      <Suspense fallback={<LoadingIndicator />}>
        <PageContents />
      </Suspense>
    </NavigationFrame>
  );

  if (isExtension) {
    appElement = (
      <ConnectedWalletsProvider>
        <PageProvider>{appElement}</PageProvider>
      </ConnectedWalletsProvider>
    );
  }

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <ThemeProvider theme={theme}>
        <div>
          <span>{`darkState: ${darkState}`}</span>
          <br />
          <span>{`themeState: ${theme.palette.type}`}</span>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="mode"
            onClick={handleThemeChange}
          >
            {icon}
          </IconButton>
        </div>
        <CssBaseline />

        <ConnectionProvider>
          <TokenRegistryProvider>
            <SnackbarProvider maxSnack={5} autoHideDuration={8000}>
              <WalletProvider>{appElement}</WalletProvider>
            </SnackbarProvider>
          </TokenRegistryProvider>
        </ConnectionProvider>
      </ThemeProvider>
    </Suspense>
  );
}

function PageContents() {
  const wallet = useWallet();
  const [page] = usePage();
  if (!wallet) {
    return <LoginPage />;
  }
  if (window.opener) {
    return <PopupPage opener={window.opener} />;
  }
  if (page === 'wallet') {
    return <WalletPage />;
  } else if (page === 'connections') {
    return <ConnectionsPage />;
  }
}
