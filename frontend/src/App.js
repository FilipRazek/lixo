import { useEffect, useState } from "react";
import { TicTacToeGrid } from "./components/TicTacToeGrid";
import "./App.css";
import { createNewGame, fetchBoardData, sendMove } from "./client";

function App() {
  const [gameId, setGameId] = useState();
  const [boardData, setBoardData] = useState();

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
        const newBoardData = await fetchBoardData(gameId);
        setBoardData(newBoardData);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameId]);

  return boardData === undefined ? (
    <p>Loading...</p>
  ) : (
    <div className="App">
      <p>{gameId}</p>
      <TicTacToeGrid
        state={boardData}
        onClick={(index) => sendMove(gameId, index)}
      />
    </div>
  );
}

export default App;
