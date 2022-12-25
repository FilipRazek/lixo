import axios from "axios";

const { href: GAME_URL } = new URL(
  process.env.REACT_APP_GAME_URL,
  process.env.REACT_APP_BACKEND_URL
);

const { href: NEW_GAME_URL } = new URL(
  process.env.REACT_APP_NEW_GAME_URL,
  process.env.REACT_APP_BACKEND_URL
);

export const createNewGame = async () => {
  const { data } = await axios.post(NEW_GAME_URL);
  return data;
};

export const fetchBoardData = async (gameId) => {
  const {
    data: { board },
  } = await axios.get(`${GAME_URL}/${gameId}`);
  return board;
};

export const sendMove = (gameId, move) => {
  axios.post(`${GAME_URL}/${gameId}`, move);
};
