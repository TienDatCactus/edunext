import React, { ReactNode } from "react";
import { useDrop } from "react-dnd";
import { canMoveKnight, moveKnight } from "./Game";
import { ItemTypes } from "../../utils/interfaces";

export const BoardSquare: React.FC<{
  movable: boolean;
  x: number;
  y: number;
  children: ReactNode;
}> = ({ x, y, children, movable }) => {
  const black = (x + y) % 2 === 1;
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.KNIGHT,
      canDrop: () => canMoveKnight(x, y),
      drop: () => moveKnight(x, y),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [x, y]
  );
  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Square movable={movable} black={black}>
        {children}
      </Square>
      {isOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow",
          }}
        />
      )}
    </div>
  );
};
export const Square: React.FC<{
  movable: boolean;
  black: boolean;
  children: ReactNode;
}> = ({ movable, black, children }) => {
  const fill = black ? "black" : "white";
  const move = movable ? "grey" : fill;
  const stroke = black ? "white" : "black";
  return (
    <div
      style={{
        backgroundColor: move,
        color: stroke,
        width: "100%",
        height: "100%",
        cursor: movable ? "pointer" : "default",
      }}
    >
      {children}
    </div>
  );
};
