import React from "react";
let knightPosition: [number, number] = [1, 7];
let observer: any = null;

function emitChange() {
  observer(knightPosition);
}

export function observe(o: any) {
  if (observer) {
    throw new Error("Multiple observers not implemented.");
  }

  observer = o;
  emitChange();
}

export function moveKnight(toX: number, toY: number) {
  knightPosition = [toX, toY];
  emitChange();
}
const Game = () => {
  return <div>Game</div>;
};
export function canMoveKnight(toX: number, toY: number) {
  const [x, y] = knightPosition;
  const dx = toX - x;
  const dy = toY - y;

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  );
}
export default Game;
