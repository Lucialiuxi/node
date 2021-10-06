import logo from './logo.svg';
import { ButtonForGraphql } from './buttonForGraphql.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ButtonForGraphql/>
      </header>
    </div>
  );
}

export default App;
