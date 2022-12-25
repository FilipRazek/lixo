import React from "react";
import "./index.css";

const SYMBOLS = {
  1: "O",
  2: "X",
  0: " ",
};

export const TicTacToeGrid = ({ state, onClick }) => (
  <table>
    <tbody>
      {Array.from({ length: 3 }).map((_, i) => (
        <tr key={i}>
          {Array.from({ length: 3 }).map((_, j) => {
            const cellIndex = i * 3 + j;
            const cellValue = Math.floor(state / 3 ** cellIndex) % 3;
            return (
              <td key={j} onClick={() => onClick(cellIndex)}>
                {SYMBOLS[cellValue]}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);
