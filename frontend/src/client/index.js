import axios from "axios";

const { href: GAME_URL } = new URL(
  process.env.REACT_APP_GAME_URL,
  process.env.REACT_APP_BACKEND_URL
);

const { href: NEW_GAME_URL } = new URL(
  process.env.REACT_APP_NEW_GAME_URL,
  process.env.REACT_APP_BACKEND_URL
);

const { href: LOBBY_URL } = new URL(
  process.env.REACT_APP_LOBBY_URL,
  process.env.REACT_APP_BACKEND_URL
);

export const createNewGame = async () => {
  const { data } = await axios.post(NEW_GAME_URL);
  return data;
};

export const fetchGameData = async (gameId) => {
  const { data } = await axios.get(`${GAME_URL}/${gameId}`);
  return data;
};

export const sendMove = (gameId, move) => {
  axios.post(`${GAME_URL}/${gameId}`, { move });
};

export const fetchLobby = async () => {
  const { data } = await axios.get(LOBBY_URL);
  return data;
};
