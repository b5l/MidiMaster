import React from "react";
import { useDrop } from "react-dnd";

import DragTypes from "../lib/DragTypes";

export default function DropZone({
  x,
  y,
  moveControl,
  name,
  child,
}: {
  x: number;
  y: number;
  moveControl: Function;
  name: string;
  child: JSX.Element;
}) {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: DragTypes.CONTROL,
    drop(item, monitor) {
      console.log(item, monitor);
      moveControl(item);
      return { name: "Something" };
    },
    collect(monitor) {
      return { isOver: monitor.isOver(), canDrop: monitor.canDrop() };
    },
  });
  if (x === 0 && y === 0) console.log({ canDrop, isOver });

  return (
    <div
      ref={drop}
      className={`dropzone dropzone-${x}-${y}`}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        border: "2px solid #212529",
      }}
    >
      <h1
        style={{
          color: "#212529",
          padding: 0,
          margin: "10px 10px 0 0",
          fontFamily: "sans-serif",
          fontSize: "18px",
          userSelect: "none",
          textAlign: "right",
          overflow: "visible",
          height: "0",
        }}
      >
        {name}
      </h1>
      {child}
    </div>
  );
}
