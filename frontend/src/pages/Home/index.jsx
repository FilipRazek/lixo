import { useEffect, useState } from "react";
import { TicTacToeGrid } from "../../components/TicTacToeGrid";
import { createNewGame, fetchGameData, sendMove } from "../../client";
import "./index.css";

const SERVER_UPDATE_INTERVAL = 4000;

export const Home = () => {
  const [gameId, setGameId] = useState();
  const [board, setBoard] = useState();
  const [player, setPlayer] = useState();
  const [colorToPlay, setColorToPlay] = useState();

  useEffect(() => {
    const fetchNewGameId = async () => {
      const newGame = await createNewGame();
      setGameId(newGame.id);
      setPlayer(newGame.player);
      console.log(newGame);
    };
    // Run once
    fetchNewGameId();
  }, []);

  useEffect(() => {
    if (gameId !== undefined) {
      // Start sever fetch interval
      const interval = setInterval(async () => {
        const { board: newBoard, colorToPlay: newColorToPlay } =
          await fetchGameData(gameId);
        setBoard(newBoard);
        setColorToPlay(newColorToPlay);
      }, SERVER_UPDATE_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [gameId]);

  const onGridClick = (index) => {
    // Update client side
    // TODO: Check if game is won
    if (player === colorToPlay) {
      // Is allowed to play
      sendMove(gameId, index);
      setBoard(board + player * 3 ** index);
      setColorToPlay(3 - colorToPlay);
    }
  };

  return board === undefined ? (
    <p>Loading...</p>
  ) : (
    <div>
      <TicTacToeGrid state={board} onClick={onGridClick} />
      <p>Game ID: {gameId}</p>
      <p>Player: {player}</p>
    </div>
  );
};
