import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [initialCount, setInitialCount] = useState(0);
  const [count, setCount] = useState(0);

  const { href: countUrl } = new URL(
    process.env.REACT_APP_COUNT_URL,
    process.env.REACT_APP_BACKEND_URL
  );
  useEffect(() => {
    const fetchInitialCount = async () => {
      const { data } = await axios.get(countUrl);
      setInitialCount(data);
      setCount(data);
    };
    fetchInitialCount();
  }, [countUrl]);

  const updateValue = ({ target: { value } }) => {
    setCount(value);
  };

  const sendValue = async () => {
    await axios.post(countUrl, count);
  };

  return (
    <div className="App">
      <p>Initial count fetched : {initialCount}</p>
      <input value={count} onChange={updateValue} />
      <button type="button" onClick={sendValue}>
        Update value
      </button>
    </div>
  );
}

export default App;
