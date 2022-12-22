import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const { href: COUNT_URL } = new URL(
  process.env.REACT_APP_COUNT_URL,
  process.env.REACT_APP_BACKEND_URL
);
const fetchCountFromServer = async () => {
  const { data } = await axios.get(COUNT_URL);
  return data;
};

function App() {
  const [count, setCount] = useState(undefined);
  const [serverCount, setServerCount] = useState(undefined);

  useEffect(() => {
    const interval = setInterval(async () => {
      const serverCount = await fetchCountFromServer();
      setServerCount(serverCount);
      if (count === undefined) {
        setCount(serverCount);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  const updateValue = ({ target: { value } }) => {
    setCount(value);
  };

  const sendValue = async () => {
    if (count === undefined) {
      return;
    }
    setServerCount(count);
    await axios.post(COUNT_URL, count, {
      headers: { "Content-Type": "text/plain" },
    });
  };

  return count === undefined ? (
    <p>Loading...</p>
  ) : (
    <div className="App">
      <p>Count on server : {serverCount}</p>
      <input value={count} onChange={updateValue} />
      <button type="button" onClick={sendValue}>
        Update value
      </button>
    </div>
  );
}

export default App;
