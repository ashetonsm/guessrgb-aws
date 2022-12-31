import './App.css';
import { Home } from "./pages/Home";
import { Profile } from './pages/Profile';
import { Menu } from './components/Menu';

function App() {

  return (
    <>
      <Menu />
      <Profile />
      <Home />
    </>
  );
}

export default App;
