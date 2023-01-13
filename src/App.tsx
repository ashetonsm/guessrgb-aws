import './App.css';
import { Menu } from './components/Menu';
import { useContext, useEffect } from 'react';
import LoginContext from './context/LoginContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Profile } from './pages/Profile';
import { Home } from './pages/Home';

export default function App() {

  const { dispatch, userId, darkMode } = useContext(LoginContext);

  useEffect(() => {

    function CheckAuth() {
      var checked = false;
      if (!checked) {
        // Check if there's a cookie from a previous login
        const cookieId = document.cookie.split("=")[1];
        if (cookieId !== undefined) {
          // Use the cookie as the context userId
          console.log("There is a login cookie.");
          dispatch({ type: 'SET_USERID', payload: cookieId });
        } else {
          // No cookie found
          console.log("There is NOT a login cookie.");
          dispatch({ type: 'SET_USERID', payload: null });
        }
        checked = true;
      }
    }
    CheckAuth()
  }, [dispatch, userId])

  useEffect(() => {
    // TODO: Check for dark mode localstorage entry

    const appBG = document.getElementById('root')

    if (darkMode == true) {
      appBG?.classList.toggle("darkMode")    
    } else {
      appBG?.classList.toggle("darkMode")    
    }
  }, [darkMode])


  function RequireAuth({ children }: { children: JSX.Element }) {

    if (!userId) {
      // Redirect to home
      return <Navigate to="/guessRGB/" />;
    }

    return children;
  }

  return (
    <Routes>
      <Route element={<Menu loggedIn={userId ? true : false} />}>
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
