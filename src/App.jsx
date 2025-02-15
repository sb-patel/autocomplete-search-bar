import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if(!input.trim()){
      setResult([]);
      return;
    }

    if(cache[input]){
      setResult(cache[input]);
      return;
    }

    const data = await fetch("https://dummyjson.com/recipes/search?q="+input);
    const json = await data.json();
    // setResult(json?.recipes || []);

    if(json){
      setResult(json.recipes);
      setCache((prev) => ({...prev, [input]:json.recipes}));
    }
    else{
      setResult([]);
    }
  }

  useEffect(() => {
    const timer = setTimeout(fetchData, 400);

    return () => {clearTimeout(timer)};
  }, [input])

  return (
    <div className='App'>
      <h1>Autocomplete Search Bar</h1>
      <input
        type='text'
        className='search-input'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setShowResult(true)}
        onBlur={() => setShowResult(false)}
      />
      <div className='result-container'>
        { showResult &&
          result.map((r) => (
              <span className='result' key={r.id}>
                {r.name}
              </span>
          ))
        }
      </div>
    </div>
  )
}

export default App