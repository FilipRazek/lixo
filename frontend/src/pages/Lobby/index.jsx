import { useEffect, useState } from "react";
import { createNewGame, fetchLobby, joinGame } from "../../client";
import "./index.css";

const SERVER_UPDATE_INTERVAL = 5000;
const LOBBY_GAME_COUNT = 5;

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

  const join = async (gameId) => {
    const gameData = await joinGame(gameId);
    console.log(gameData);
  };

  return gameIds === undefined ? (
    <p>Loading...</p>
  ) : (
    <div>
      <p>Latest games</p>
      <table>
        <tbody>
          {gameIds.slice(-LOBBY_GAME_COUNT).map((gameId) => (
            <tr key={gameId}>
              <td>{gameId}</td>
              <td>
                <button onClick={() => join(gameId)}>Join</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={newGame}>New Game</button>
    </div>
  );
};
