import './App.css';
import { Menu } from './components/Menu';
import { useContext, useEffect } from 'react';
import LoginContext from './context/LoginContext';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Profile } from './pages/Profile';
import { Home } from './pages/Home';

export default function App() {

  const { dispatch, userId, darkMode, darkModeChecked } = useContext(LoginContext);

  useEffect(() => {

    /**
     * Checks for an existing userId cookie. Then checks localStorage for darkMode setting.
     */
    function CheckAuth() {
      var checked = false;
      if (!checked) {
        // Check if there's a cookie from a previous login
        const cookieId = document.cookie.split("=")[1];
        if (cookieId !== undefined) {
          // Use the cookie as the context userId
          dispatch({ type: 'SET_USERID', payload: cookieId });
        } else {
          // No cookie found
          dispatch({ type: 'SET_USERID', payload: null });
        }
        checked = true;
      }
    }

    // Check for darkMode
    if (window.localStorage.getItem('darkMode')) {
      const appBG = document.getElementById('root')
      // Dark mode cookie exists (darkMode is on already)
      appBG!.classList.toggle('darkMode')
      dispatch({ type: 'SET_DARK_MODE', payload: true });
    }
    dispatch({ type: 'SET_DARK_MODE_CHECKED', payload: true });

    CheckAuth()
  }, [dispatch, userId])

  /**
   * Checks for changes to darkMode and applies/removes darkMode class styling.
   */
  useEffect(() => {
    if (darkModeChecked) {
      const appBG = document.getElementById('root')
      if (darkMode === true) {
        appBG!.classList.add('darkMode')
        window.localStorage.setItem('darkMode', 'true')

      } else {
        appBG!.classList.remove('darkMode')
        window.localStorage.removeItem('darkMode')
        dispatch({ type: 'SET_DARK_MODE', payload: false });
      }
    }

  }, [darkMode, darkModeChecked, dispatch, userId])

/**
 * Redirects a user back to the home page if no userId has been set
 * @param param0 The protected path
 * @returns The protected component(s) to be rendered or the home page
 */
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
