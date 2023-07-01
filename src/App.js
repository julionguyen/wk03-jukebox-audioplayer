import logo from './logo.svg';
import './App.css';
import Jukebox from './Jukebox';

function App() {
  document.title = "Jukebox - Audio Player"
  return (
    <div className="App">
      <Jukebox />
    </div>
  );
}

export default App;
