import logo from "./logo.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [count, setCount] = useState();
  useEffect(() => {
    const fetchCount = async () => {
      const { href: url } = new URL(
        process.env.REACT_APP_COUNT_URL,
        process.env.REACT_APP_BACKEND_URL
      );
      const { data } = await axios.get(url);
      setCount(data);
    };
    fetchCount();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Count fetched : {count}</p>
      </header>
    </div>
  );
}

export default App;
