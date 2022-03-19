import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'; 

function App() {

    const [testValue, setTestValue] = useState("initial value");

    function testAPI(){
        fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => setTestValue(res));
        console.log("I got called")
    }

    useEffect(() => {
		testAPI(); 
	}, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{testValue}</p>
      </header>
    </div>
  );
}

export default App;
