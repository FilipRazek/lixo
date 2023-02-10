const convertBoard = (ternaryBoard) => {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board[i] = ternaryBoard % 3;
    ternaryBoard = Math.floor(ternaryBoard / 3);
  }
  return board;
};

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const getWinner = (ternaryBoard) => {
  const board = convertBoard(ternaryBoard);
  // Check if any of the winning combinations are filled with the same color
  for (const combination of WINNING_COMBINATIONS) {
    const candidateColor = board[combination[0]];
    if (
      candidateColor === board[combination[1]] &&
      candidateColor === board[combination[2]]
    ) {
      return candidateColor;
    }
  }
  return false;
};
