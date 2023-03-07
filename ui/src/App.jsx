import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { DisplayGraph } from './network'

import load from './load'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await load('publication_year:2016-,raw_affiliation_string.search:beta cnrs');
      console.log(data);
      setData(data);
    }
    getData();
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <DisplayGraph />
    </div>
  )
}

export default App
