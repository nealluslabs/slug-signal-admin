import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './redux/store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: "Inter, Poppins, sans-serif",
  },
  palette: {
    background: {
      paper: '#FFFFFF', // Dialogs, Cards, etc.
      default: '#FFFFFF', // Page background
    },
    text: {
      primary: '#000000',
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          color: '#000000',
        },
      },
    },
  },
});

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={ theme }>
    <HelmetProvider>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </PersistGate>
      </Provider>
    </HelmetProvider>
  </ThemeProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
