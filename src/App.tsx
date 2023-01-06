import './App.css';
import { Menu } from './components/Menu';
import { useContext } from 'react';
import LoginContext from './context/LoginContext';
import { useLocation, Navigate, Route, Routes } from 'react-router-dom';
import { Profile } from './pages/Profile';
import { Home } from './pages/Home';

export default function App() {

  const { userId } = useContext(LoginContext);

  function RequireAuth({ children }: { children: JSX.Element }) {
    let location = useLocation();

    if (!userId) {
      // Redirect to home
      return <Navigate to="/guessRGB/" />;
    }

    return children;
  }

  return (
    <Routes>
      <Route element={<Menu loggedIn={userId ? true : false}/>}>
        <Route path="guessRGB/" element={<Home />} />
        <Route path="guessRGB/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          } />
      </Route>
    </Routes>
  );
}
