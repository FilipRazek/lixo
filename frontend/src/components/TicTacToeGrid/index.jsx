import React from "react";
import "./index.css";

export const TicTacToeGrid = ({ state, onClick }) => (
  <table className="Grid__table">
    <tbody>
      {Array.from({ length: 3 }).map((_, i) => (
        <tr key={i}>
          {Array.from({ length: 3 }).map((_, j) => {
            const cellIndex = i * 3 + j;
            const cellValue = Math.floor(state / 3 ** cellIndex) % 3;
            const classNames = ["Grid__table-cell"];

            switch (cellValue) {
              case 1:
                classNames.push("Grid__table-cell--blue");
                break;
              case 2:
                classNames.push("Grid__table-cell--orange");
                break;
              default:
                classNames.push("Grid__table-cell--clickable");
            }
            return (
              <td
                key={j}
                onClick={() => onClick(cellIndex)}
                className={classNames.join(" ")}
              ></td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);
