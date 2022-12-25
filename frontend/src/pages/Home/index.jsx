import { useEffect, useState } from "react";
import { TicTacToeGrid } from "../../components/TicTacToeGrid";
import { createNewGame, fetchGameData, sendMove } from "../../client";
import "./index.css";

const SERVER_UPDATE_INTERVAL = 4000;

export const Home = () => {
  const [gameId, setGameId] = useState();
  const [board, setBoard] = useState();
  const [player, setPlayer] = useState();

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
        const { board: newBoard, player: newPlayer } = await fetchGameData(
          gameId
        );
        setBoard(newBoard);
        setPlayer(newPlayer);
      }, SERVER_UPDATE_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [gameId]);

  const onGridClick = (index) => {
    // Update client side
    // TODO: Check if game is won
    setBoard(board + player * 3 ** index);
    setPlayer(3 - player);
    sendMove(gameId, index);
  };

  return board === undefined ? (
    <p>Loading...</p>
  ) : (
    <div>
      <TicTacToeGrid state={board} onClick={onGridClick} />
    </div>
  );
};
