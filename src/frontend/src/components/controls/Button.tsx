import React from "react";
import Radium from "radium";
import { useDrag } from "react-dnd";

import DragTypes from "../../lib/DragTypes";
import { IControlDefinition } from "../../@types/IGridLayoutDefinition";

function Button({ row, col, title }: IControlDefinition) {
  const [{ isDragging }, drag] = useDrag({
    type: DragTypes.CONTROL,
    item: { row, col },
    collect(monitor) {
      return { isDragging: !!monitor.isDragging() };
    },
  });

  return (
    <button
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        margin: "15px 0 0 25px",
        padding: 0,
        position: "relative",
        width: "calc(100% - 50px)",
        height: "calc(100% - 50px)",
        background: "#111519",
        border: "2px solid #1864ab",
        color: "#dddddd",
        fontSize: "25px",
        fontFamily: "sans-serif",
        letterSpacing: "2px",
        textTransform: "uppercase",
        transitionDuration: ".2s",
        // @ts-ignore
        ":hover": {
          background: "#091317",
          transitionDuration: ".2s",
        },
      }}
    >
      {title}
    </button>
  );
}

export default Radium(Button);
