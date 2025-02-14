import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState([]);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/recipes/search?q=");
    const json = await data.json();
    setResult(json?.recipes);
  }

  useEffect(() => {
    fetchData();
  }, [input])

  return (
    <div className='App'>
      <h1>Autocomplete Search Bar</h1>
      <input
        type='text'
        className='search-input'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className='result-container'>
        {
          result.map((r) => {
              <span className='result' key={r.id}>
                {r.name}
              </span>
          })
        }
      </div>
    </div>
  )
}

export default App
