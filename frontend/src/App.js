import { useEffect, useState } from "react";
import axios from "axios";
import { TicTacToeGrid } from "./components/TicTacToeGrid";
import "./App.css";

const { href: GAME_URL } = new URL(
  process.env.REACT_APP_GAME_URL,
  process.env.REACT_APP_BACKEND_URL
);

const { href: NEW_GAME_URL } = new URL(
  process.env.REACT_APP_NEW_GAME_URL,
  process.env.REACT_APP_BACKEND_URL
);

const createNewGame = async () => {
  const { data } = await axios.post(NEW_GAME_URL);
  return data;
};

const fetchBoardData = async (gameId) => {
  const {
    data: { board },
  } = await axios.get(`${GAME_URL}/${gameId}`);
  return board;
};

function App() {
  const [gameId, setGameId] = useState();
  const [boardData, setBoardData] = useState();
  const [move, setMove] = useState(0);

  useEffect(() => {
    const fetchNewGameId = async () => {
      const newGameId = await createNewGame();
      setGameId(newGameId);
    };
    // Run once
    fetchNewGameId();
  }, []);

  useEffect(() => {
    if (gameId !== undefined) {
      // Start sever fetch interval
      const interval = setInterval(async () => {
        const boardData = await fetchBoardData(gameId);
        setBoardData(boardData);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameId]);

  const sendMove = async () => {
    if (boardData === undefined) {
      return;
    }
    await axios.post(`${GAME_URL}/${gameId}`, move, {
      headers: { "Content-Type": "text/plain" },
    });
  };

  return boardData === undefined ? (
    <p>Loading...</p>
  ) : (
    <div className="App">
      <p>{gameId}</p>
      <TicTacToeGrid state={boardData} />
      <input
        value={move}
        type="number"
        onChange={({ target: { value } }) => setMove(value)}
      />
      <button type="button" onClick={sendMove}>
        Update board data
      </button>
    </div>
  );
}

export default App;
