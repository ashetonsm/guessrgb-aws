import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Profile } from './pages/Profile';
import { Menu } from './components/Menu';
import { Home } from './pages/Home';
import { LoginProvider } from './context/LoginContext';
import { GameProvider } from './context/GameContext';

const container = document.getElementById('root')
const root = createRoot(container!)

const router = createBrowserRouter([
  {
    path: "/guessRGB",
    element: <Menu />,
    children: [
      {
        path: "/guessRGB/home",
        element: <Home />,
      },
      {
        path: "/guessRGB/profile",
        element: <Profile />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <LoginProvider>
      <GameProvider>
        <RouterProvider router={router} />
      </GameProvider>
    </LoginProvider>
  </React.StrictMode>,
)