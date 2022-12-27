import './App.css';
import { Home } from "./components/Home";
import { GameProvider } from './context/GameContext';
import { LoginProvider } from './context/LoginContext';

function App() {

  return (
    <LoginProvider>
      <h1 className="text-center">guessRGB</h1>
      <GameProvider>
        <Home />
      </GameProvider>
    </LoginProvider>
  );
}

export default App;
