import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import { LoginProvider } from './context/LoginContext';
import { GameProvider } from './context/GameContext';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './custom.scss';

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  // <React.StrictMode>
    <LoginProvider>
      <GameProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GameProvider>
    </LoginProvider>
  // </React.StrictMode>,
)