const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const RELATIVE_NEW_GAME_URL = "game/new";
const RELATIVE_GAME_URL = "game";
const RELATIVE_LOBBY_URL = "game/all-joinable";
const RELATIVE_JOIN_GAME_URL = "game/join";

export const { href: GAME_URL } = new URL(RELATIVE_GAME_URL, BACKEND_URL);

export const { href: NEW_GAME_URL } = new URL(
  RELATIVE_NEW_GAME_URL,
  BACKEND_URL
);

export const { href: LOBBY_URL } = new URL(RELATIVE_LOBBY_URL, BACKEND_URL);

export const { href: JOIN_GAME_URL } = new URL(
  RELATIVE_JOIN_GAME_URL,
  BACKEND_URL
);
