import axios from "axios";
import { GAME_URL, JOIN_GAME_URL, LOBBY_URL, NEW_GAME_URL } from "./urlBuilder";

export const createNewGame = async () => {
  const { data } = await axios.post(NEW_GAME_URL);
  return data;
};

export const fetchGameData = async (gameId) => {
  const { data } = await axios.get(`${GAME_URL}/${gameId}`);
  return data;
};

export const sendMove = (gameId, move, token) => {
  axios.post(`${GAME_URL}/${gameId}`, { move, token });
};

export const fetchLobby = async () => {
  const { data } = await axios.get(LOBBY_URL);
  return data;
};

export const joinGame = async (gameId) => {
  const { data } = await axios.post(`${JOIN_GAME_URL}/${gameId}`);
  return data;
};
