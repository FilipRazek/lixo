import { useEffect, useState } from "react";
import { TicTacToeGrid } from "../../components/TicTacToeGrid";
import { fetchGameData, joinGame, sendMove } from "../../client";
import "./index.css";
import { useParams } from "react-router-dom";
import { getWinner } from "../../helper";

const SERVER_UPDATE_INTERVAL = 1000;

export const Game = () => {
  // Extract gameId from URL param
  const { gameId } = useParams();

  const [authGameData, setAuthGameData] = useState({});
  const [board, setBoard] = useState();
  const [colorToPlay, setColorToPlay] = useState();

  const [winner, setWinner] = useState();

  useEffect(() => {
    if (board === undefined) return;
    // Check if game is won from board state
    const winner = getWinner(board);
    console.log("winner", winner);
    setWinner(winner);
  }, [board]);

  const { token, color } = authGameData;
  useEffect(() => {
    // Start sever fetch interval
    const interval = setInterval(async () => {
      const { board: newBoard, colorToPlay: newColorToPlay } =
        await fetchGameData(gameId);
      setBoard(newBoard);
      setColorToPlay(newColorToPlay);
    }, SERVER_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [gameId]);

  const onGridClick = (index) => {
    // Update client side if player is allowed to play
    if (color === colorToPlay && !winner) {
      sendMove(gameId, index, token);
      setBoard(board + color * 3 ** index);
      setColorToPlay(3 - colorToPlay);
    }
  };

  const join = async () => {
    const newGameData = await joinGame(gameId);
    setBoard(newGameData.board);
    setColorToPlay(newGameData.colorToPlay);
    setAuthGameData({ token: newGameData.token, color: newGameData.color });
  };

  return (
    <div>
      <TicTacToeGrid state={board} onClick={onGridClick} />
      <p>Game ID: {gameId}</p>
      <p>Color to play: {colorToPlay}</p>
      {winner ? <p>Player {winner} wins!</p> : null}
      {color ? (
        <div>
          <p>Color: {color}</p>
          {!winner && (
            <p>
              {color === colorToPlay
                ? "It's your turn!"
                : "It's your opponent's turn"}
            </p>
          )}
        </div>
      ) : (
        <button onClick={join}>Join</button>
      )}
    </div>
  );
};
