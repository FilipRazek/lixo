import { useEffect, useState } from "react";
import { TicTacToeGrid } from "../../components/TicTacToeGrid";
import { fetchGameData, joinGame, sendMove } from "../../client";
import "./index.css";
import { useParams } from "react-router-dom";
import { getWinner } from "../../helper";

const SERVER_UPDATE_INTERVAL = 1000;

const WinnerComponent = ({ winner }) =>
  winner ? <p>Player {winner} wins!</p> : null;
const TurnComponent = ({ winner, color, colorToPlay }) => (
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
);

const JoinButton = ({ joinable, join }) =>
  joinable ? <button onClick={join}>Join</button> : null;

export const Game = () => {
  // Extract gameId from URL param
  const { gameId } = useParams();

  const [authGameData, setAuthGameData] = useState({});
  const [board, setBoard] = useState();
  const [joinable, setJoinable] = useState();
  const [colorToPlay, setColorToPlay] = useState();

  const [winner, setWinner] = useState();

  useEffect(() => {
    if (board === undefined) return;
    // Check if game is won from board state
    const winner = getWinner(board);
    setWinner(winner);
  }, [board]);

  const { token, color } = authGameData;
  useEffect(() => {
    // Start sever fetch interval
    const interval = setInterval(async () => {
      const {
        board: newBoard,
        colorToPlay: newColorToPlay,
        joinable: newJoinable,
      } = await fetchGameData(gameId);
      setBoard(newBoard);
      setColorToPlay(newColorToPlay);
      setJoinable(newJoinable);
    }, SERVER_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [gameId]);

  const onGridClick = (index) => {
    // Update client side if player is allowed to play
    const isGamePlayable = !joinable && !winner;
    const isPlayerTurn = color && color === colorToPlay;
    if (isGamePlayable && isPlayerTurn) {
      sendMove(gameId, index, token);
      setBoard(board + color * 3 ** index);
      setColorToPlay(3 - colorToPlay);
    }
  };

  const join = async () => {
    if (joinable) {
      const newGameData = await joinGame(gameId);
      setBoard(newGameData.board);
      setColorToPlay(newGameData.colorToPlay);
      setJoinable(newGameData.joinable);
      setAuthGameData({ token: newGameData.token, color: newGameData.color });
    }
  };

  return (
    <div>
      <TicTacToeGrid state={board} onClick={onGridClick} />
      <p>Game ID: {gameId}</p>
      <p>Color to play: {colorToPlay}</p>
      <WinnerComponent winner={winner} />
      {color ? (
        <TurnComponent
          color={color}
          colorToPlay={colorToPlay}
          winner={winner}
        />
      ) : (
        <JoinButton join={join} joinable={joinable} />
      )}
    </div>
  );
};
