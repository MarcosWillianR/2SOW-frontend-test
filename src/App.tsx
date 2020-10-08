import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './hooks/Auth';

import GlobalStyle from './styles/global';

import Routes from './routes';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <Router>
        <Routes />
      </Router>
    </AuthProvider>

    <GlobalStyle />
  </>
);

export default App;
