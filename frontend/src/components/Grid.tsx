import React from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import IGridLayoutDefinition, {
  IControlDefinition,
  IControl,
} from "../@types/IGridLayoutDefinition";

import DropZone from "./DropZone";
import Button from "./controls/Button";

import layout from "../../test-layout";

// TODO: Put this somewhere else
function getControlByType(type: string) {
  switch (type.toLowerCase()) {
    case "button":
      return Button;
    default:
      throw new Error(`Type ${type} doesn't exist`);
  }
}
export default function Grid({ layout }: { layout: IGridLayoutDefinition }) {
  const [size, setSize] = React.useState({
    cols: layout.cols,
    rows: layout.rows,
  });
  const [controls, setControls] = React.useState(layout.controls);

  function findControlDefinition(row: number, col: number) {
    return controls.find(
      (control: IControlDefinition) =>
        control.col === col && control.row === row
    );
  }

  function moveControl(from: IControl, to: IControl) {
    console.log("Moving");

    const newControls = controls.map((control) => ({ ...control }));
    for (let i = 0; i < newControls.length; i++) {
      const control = newControls[i];
      if (control.row !== from.row || control.col !== from.col) continue;
      control.row = to.row;
      control.col = to.col;
      break;
    }

    console.log(from, to);
    console.log({ controls, newControls });
    setControls(newControls);
  }

  function createControlForPosition(row: number, col: number) {
    const controlDefinition = findControlDefinition(row, col);
    if (!controlDefinition) return null;
    const Control = getControlByType(controlDefinition.type);
    return (
      <Control
        row={row}
        col={col}
        title={controlDefinition.title}
        type={controlDefinition.type}
      />
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <input
        type={"number"}
        onChange={(e) =>
          setSize({ rows: parseInt(e.target.value, 10), cols: size.cols })
        }
        value={size.rows}
      />
      <input
        type={"number"}
        onChange={(e) =>
          setSize({ rows: size.rows, cols: parseInt(e.target.value, 10) })
        }
        value={size.cols}
      />

      <div
        className={"grid"}
        style={{
          display: "flex",
          background: "#111519",
          width: "100%",
          height: "100%",
          flexWrap: "wrap",
        }}
      >
        {[...new Array(size.rows)].map((_, row) => (
          <div
            key={row}
            className={`row row-${row}`}
            style={{
              width: "100%",
              height: "100%",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {[...new Array(size.cols)].map((_, col) => (
              <DropZone
                key={`${row}-${col}`}
                moveControl={(from: IControl) =>
                  moveControl(from, { col, row })
                }
                name={`Dropzone ${row}.${col}`}
                x={col}
                y={row}
                child={createControlForPosition(row, col)}
              ></DropZone>
            ))}
          </div>
        ))}
      </div>
    </DndProvider>
  );
}
