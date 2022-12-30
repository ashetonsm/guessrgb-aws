import './App.css';
import { Home } from "./pages/Home";
import { GameProvider } from './context/GameContext';
import { LoginProvider } from './context/LoginContext';
import { Profile } from './pages/Profile';
import { Menu } from './components/Menu';

function App() {

  return (
    <LoginProvider>
      <GameProvider>
      <h1 className="text-center">guessRGB</h1>
      <Menu/>
        <Profile/>
        <Home />
      </GameProvider>
    </LoginProvider>
  );
}

export default App;
