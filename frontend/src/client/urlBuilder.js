export const { href: GAME_URL } = new URL(
  process.env.REACT_APP_GAME_URL,
  process.env.REACT_APP_BACKEND_URL
);

export const { href: NEW_GAME_URL } = new URL(
  process.env.REACT_APP_NEW_GAME_URL,
  process.env.REACT_APP_BACKEND_URL
);

export const { href: LOBBY_URL } = new URL(
  process.env.REACT_APP_LOBBY_URL,
  process.env.REACT_APP_BACKEND_URL
);

export const { href: JOIN_GAME_URL } = new URL(
  process.env.REACT_APP_JOIN_GAME_URL,
  process.env.REACT_APP_BACKEND_URL
);
