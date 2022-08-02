import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  render() {
    const { row, col, isStart, isFinish, isWall, onMouseDown, onMouseOver, onMouseUp } = this.props;
    const cssClass = isStart ? "border border-danger bg-danger" : isFinish ? "border border-success bg-success": isWall ? "border border-secondary bg-secondary" : "border border-secondary";

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
