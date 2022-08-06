import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  render() {
    const { row, col, isStart, isFinish, isWall, weight, onMouseDown, onMouseOver, onMouseUp } = this.props;
    const cssClass = isStart ? "node-start" : isFinish ? "node-finish": isWall ? "node-wall" : weight === 3  ? "node-weight" : "";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${cssClass}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseOver={() => onMouseOver(row, col)}
        onMouseUp={() => onMouseUp(row, col)}
      />
    );
  }
}
