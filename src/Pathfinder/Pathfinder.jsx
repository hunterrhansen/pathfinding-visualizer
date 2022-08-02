import React, { Component } from "react";
import Node from "./node/Node";
import "./Pathfinder.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const NUM_ROWS = 11;
const NUM_COLS = 20;
const START_NODE_ROW = 5;
const START_NODE_COL = 3;
const FINISH_NODE_COL = 16;
const FINISH_NODE_ROW = 5; 

export default class Pathfinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseIsPressed: false,
      grid: [],
      startNode: { row: START_NODE_ROW, col: START_NODE_COL },
      finishNode: { row: FINISH_NODE_ROW, col: FINISH_NODE_COL },
      algorithm: "BFS",
      object: "Wall"
    };
  }

  componentDidMount() {
    const grid = initGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    this.setState({ mouseIsPressed: true });
    this.handleMouseOver(row, col);
  }

  handleMouseOver(row, col) {
    if (!this.state.mouseIsPressed) {
      return
    }

    const { grid } = this.state;
    const newGrid = grid.slice();
    const newNode = newGrid[row][col];

    if (this.state.object === "Wall") {
      newNode.isWall = true;
    }

    if (this.state.object === "Start") {
      const oldStart = this.state.startNode;
      newGrid[oldStart.row][oldStart.col].isStart = false;

      newNode.isStart = true;
      this.setState({ startNode: {row, col} });
    }

    if (this.state.object === "End") {
      const oldFinish = this.state.finishNode;
      newGrid[oldFinish.row][oldFinish.col].isFinish = false;

      newNode.isFinish = true;
      this.setState({ finishNode: {row, col} });
    }

    this.setState({ newGrid });
  }

  handleMouseUp(row, col) {
    this.setState({ mouseIsPressed: false });
    this.handleMouseOver(row, col);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <ButtonGroup>
              <Button
                variant="outline-secondary"
                onClick={() => this.setState({ object: "Wall"})}
                active={this.state.object === "Wall"}
              >
                Wall
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => this.setState({ object: "Start"})}
                active={this.state.object === "Start"}
              >
                Start
              </Button>
              <Button
                variant="outline-success"
                onClick={() => this.setState({ object: "End"})}
                active={this.state.object === "End"}
              >
                End
              </Button>
            </ButtonGroup>
          </Col>
          <Col>
            <ButtonToolbar>
              <DropdownButton
                variant="light"
                className="mx-2"
                id="algorithm-dropdown"
                title={this.state.algorithm}
              >
                <Dropdown.Item onClick={() => this.setState({ algorithm: "BFS" })}>
                  Breadth First Search
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.setState({ algorithm: "DFS" })}>
                  Depth First Search
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.setState({ algorithm: "Dijkstra" })}>
                  Dijkstra
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.setState({ algorithm: "A*" })}>
                  A*
                </Dropdown.Item>
              </DropdownButton>
              <Button variant="dark" onClick={() => console.log(this.state.algorithm)}>
                Visualize
              </Button>
            </ButtonToolbar>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="grid">
              {this.state.grid.map((row, rowIdx) => {
                return (
                  <div key={rowIdx} className="grid-row">
                    {row.map((node, nodeIdx) => {
                      const { row, col, isStart, isFinish, isWall } = node;
                      return (
                        <Node
                          key={nodeIdx}
                          row={row}
                          col={col}
                          isStart={isStart}
                          isFinish={isFinish}
                          isWall={isWall}
                          onMouseDown={() => this.handleMouseDown(rowIdx, nodeIdx)}
                          onMouseUp={() => this.handleMouseUp(rowIdx, nodeIdx)}
                          onMouseOver={() =>
                            this.handleMouseOver(rowIdx, nodeIdx)
                          }
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>            
          </Col>
        </Row>

      </Container>
    );
  }
}

function initGrid() {
  const grid = [];

  for (let row = 0; row < NUM_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < NUM_COLS; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }

  return grid;
}

function createNode(row, col) {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isWall: false,
  };
}
