import React, { useState } from "react";
import { BoardSquare, Square } from "./Square";
import { Knight } from "./Knight";
import { canMoveKnight, moveKnight } from "./Game";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function handleSquareClick(toX: number, toY: number) {
  if (canMoveKnight(toX, toY)) {
    moveKnight(toX, toY);
  }
}
function renderPiece(
  x: number,
  y: number,
  [knightX, knightY]: [number, number]
) {
  if (x === knightX && y === knightY) {
    return <Knight />;
  }
}
function RenderSquare(i: number, knightPosition: any) {
  const [movable, setMovable] = useState(false);
  function handleSquareHover(toX: number, toY: number) {
    setMovable(canMoveKnight(toX, toY));
  }
  const x = i % 8;
  const y = Math.floor(i / 8);
  return (
    <div
      onClick={() => handleSquareClick(x, y)}
      onMouseOver={() => handleSquareHover(x, y)}
      key={i}
      style={{ width: "12.5%", height: "12.5%" }}
    >
      <BoardSquare movable={movable} x={x} y={y}>
        {renderPiece(x, y, knightPosition)}
      </BoardSquare>
    </div>
  );
}

const Board: React.FC<{ knightPosition: any }> = ({ knightPosition }) => {
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(RenderSquare(i, knightPosition));
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {squares}
      </div>
    </DndProvider>
  );
};

export default Board;
