import { useCallback, useEffect, useState } from "react";
import { TicTacToeGrid } from "../../components/TicTacToeGrid";
import { fetchGameData, joinGame, sendMove } from "../../client";
import "./index.css";
import { useParams } from "react-router-dom";
import { getWinner } from "../../helper";

const SERVER_FAST_UPDATE_INTERVAL = 1_000;
const SERVER_SLOW_UPDATE_INTERVAL = 10_000;

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
  const [currentInterval, setCurrentInterval] = useState();

  const [winner, setWinner] = useState();

  const updateBoard = useCallback(async () => {
    const {
      board: newBoard,
      colorToPlay: newColorToPlay,
      joinable: newJoinable,
    } = await fetchGameData(gameId);

    setBoard(parseInt(newBoard, 10));
    setColorToPlay(newColorToPlay);
    setJoinable(newJoinable);

    // If the opponent just played, cancel interval and schedule slow server fetch
    if (newColorToPlay !== colorToPlay) {
      clearInterval(currentInterval);
      setCurrentInterval(
        setTimeout(
          () => setInterval(updateBoard, SERVER_SLOW_UPDATE_INTERVAL),
          SERVER_FAST_UPDATE_INTERVAL
        )
      );
    }
  }, [gameId, colorToPlay, currentInterval]);

  useEffect(() => {
    // Fetch game data on mount
    if (board === undefined) {
      updateBoard();
    }
  }, [board, updateBoard]);

  useEffect(() => {
    if (board === undefined) return;
    // Check if game is won from board state
    const winner = getWinner(board);
    setWinner(winner);
  }, [board]);

  const { token, color } = authGameData;

  const onGridClick = (index) => {
    // Update client side if player is allowed to play
    const isGamePlayable = !joinable && !winner;
    const isPlayerTurn = color && color === colorToPlay;
    if (isGamePlayable && isPlayerTurn) {
      sendMove(gameId, index, token);
      setBoard(board + color * 3 ** index);
      setColorToPlay(3 - colorToPlay);
      // Schedule fast server fetch after SERVER_SLOW_UPDATE_INTERVAL
      setCurrentInterval(
        setTimeout(
          () => setInterval(updateBoard, SERVER_FAST_UPDATE_INTERVAL),
          SERVER_SLOW_UPDATE_INTERVAL
        )
      );
    }
  };

  const join = async () => {
    if (joinable) {
      const newGameData = await joinGame(gameId);
      setBoard(parseInt(newGameData.board, 10));
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
