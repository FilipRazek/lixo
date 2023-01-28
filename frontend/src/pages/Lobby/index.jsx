import { useEffect, useState } from "react";
import { createNewGame, fetchLobby } from "../../client";
import "./index.css";

const SERVER_UPDATE_INTERVAL = 5000;

export const Lobby = () => {
  const [gameIds, setGameIds] = useState();

  useEffect(() => {
    // Start sever fetch interval
    const interval = setInterval(async () => {
      const allGameIds = await fetchLobby();
      setGameIds(allGameIds);
    }, SERVER_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const newGame = async () => {
    const newGameId = await createNewGame();
    setGameIds([...gameIds, newGameId]);
  };

  return gameIds === undefined ? (
    <p>Loading...</p>
  ) : (
    <div>
      <p>Latest games</p>
      {gameIds.slice(-10).map((gameId) => (
        <div>
          <p key={gameId}>{gameId}</p>
          <a href={gameId}>
            <button>Join</button>
          </a>
        </div>
      ))}
      <button onClick={newGame}>New Game</button>
    </div>
  );
};
