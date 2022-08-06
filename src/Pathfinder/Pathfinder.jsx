import React, { Component } from "react";
import Node from "./node/Node";
import { dijkstra } from "../algorithms/dijkstra";
import { breadthFirstSearch } from "../algorithms/breadthfirstsearch";
import { depthFirstSearch } from "../algorithms/depthfirstsearch";
import { astar } from "../algorithms/astar";
import { greedyBestFirstSearch } from "../algorithms/bestfirstsearch";
import { getNodesInShortestPathOrder } from "../algorithms/index";

import "./Pathfinder.css";
import { FaWeightHanging, FaFlag, FaPlay, FaRedo, FaArrowDown } from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const NUM_ROWS = 20;
const NUM_COLS = NUM_ROWS * 2;
const START_NODE_ROW = Math.ceil(NUM_ROWS / 2) - 1;
const START_NODE_COL = Math.ceil(NUM_COLS / 10);
const FINISH_NODE_ROW = START_NODE_ROW;
const FINISH_NODE_COL = NUM_COLS - START_NODE_COL - 1;

export default class Pathfinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseIsPressed: false,
      grid: [],
      startNode: { row: START_NODE_ROW, col: START_NODE_COL },
      finishNode: { row: FINISH_NODE_ROW, col: FINISH_NODE_COL },
      algorithm: "Dijkstra",
      object: "Wall",
    };
  }

  componentDidMount() {
    const grid = initGrid();
    this.setState({ grid: grid });
  }

  resetGrid() {
    const grid = initGrid();
    resetVisitedNodes(grid);
    this.setState({
      mouseIsPressed: false,
      grid: grid,
      startNode: { row: START_NODE_ROW, col: START_NODE_COL },
      finishNode: { row: FINISH_NODE_ROW, col: FINISH_NODE_COL },
    });
  }

  handleMouseDown(row, col) {
    this.setState({ mouseIsPressed: true });
    if (this.state.object === "Wall") {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    } else if (this.state.object === "Weight") {
      const newGrid = getNewGridWithWeightToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    } else if (this.state.object === "Start") {
      const newNode = { row, col };
      const newGrid = getNewGridWithStartToggled(
        this.state.grid,
        newNode,
        this.state.startNode
      );
      this.setState({ grid: newGrid, startNode: { row, col } });
    } else if (this.state.object === "Finish") {
      const newNode = { row, col };
      const newGrid = getNewGridWithFinishToggled(
        this.state.grid,
        newNode,
        this.state.finishNode
      );
      this.setState({ grid: newGrid, finishNode: { row, col } });
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;

    if (this.state.object === "Wall") {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    } else if (this.state.object === "Weight") {
      const newGrid = getNewGridWithWeightToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    } else if (this.state.object === "Start") {
      const newNode = { row, col };
      const newGrid = getNewGridWithStartToggled(
        this.state.grid,
        newNode,
        this.state.startNode
      );
      this.setState({ grid: newGrid, startNode: { row, col } });
    } else if (this.state.object === "Finish") {
      const newNode = { row, col };
      const newGrid = getNewGridWithFinishToggled(
        this.state.grid,
        newNode,
        this.state.finishNode
      );
      this.setState({ grid: newGrid, finishNode: { row, col } });
    }
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  handleVisualize() {
    const { grid, startNode, finishNode, algorithm } = this.state;
    const start = grid[startNode.row][startNode.col];
    const finish = grid[finishNode.row][finishNode.col];

    if (algorithm === "BFS") {
      this.visualizeBFS(grid, start, finish);
    } else if (algorithm === "DFS") {
      this.visualizeDFS(grid, start, finish);
    } else if (algorithm === "Dijkstra") {
      this.visualizeDijkstra(grid, start, finish);
    } else if (algorithm === "A*") {
      this.visualizeAStar(grid, start, finish);
    } else if (algorithm === "GBFS") {
      this.visualizeGreedyBestFirstSearch(grid, start, finish);
    }
  }

  visualizeDijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeBFS(grid, startNode, finishNode) {
    const visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDFS(grid, startNode, finishNode) {
    const visitedNodesInOrder = depthFirstSearch(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeAStar(grid, startNode, finishNode) {
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeGreedyBestFirstSearch(grid, startNode, finishNode) {
    const visitedNodesInOrder = greedyBestFirstSearch(
      grid,
      startNode,
      finishNode
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <ButtonGroup>
              <Button
                variant="outline-secondary"
                onClick={() => this.setState({ object: "Wall" })}
                active={this.state.object === "Wall"}
              >
                <GiBrickWall />
                Wall
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => this.setState({ object: "Weight" })}
                active={this.state.object === "Weight"}
              >
                <FaWeightHanging />
                Weight
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => this.setState({ object: "Start" })}
                active={this.state.object === "Start"}
              >
                <FaArrowDown />
                Start
              </Button>
              <Button
                variant="outline-success"
                onClick={() => this.setState({ object: "Finish" })}
                active={this.state.object === "Finish"}
              >
                <FaFlag />
                Finish
              </Button>
            </ButtonGroup>
          </Col>
          <Col>
            <ButtonToolbar>
              <DropdownButton
                variant="outline-dark"
                className="mx-1"
                id="algorithm-dropdown"
                title={this.state.algorithm}
              >
                <Dropdown.Item
                  onClick={() => this.setState({ algorithm: "BFS" })}
                >
                  Breadth First Search
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.setState({ algorithm: "DFS" })}
                >
                  Depth First Search
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.setState({ algorithm: "Dijkstra" })}
                >
                  Dijkstra
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.setState({ algorithm: "A*" })}
                >
                  A* Search
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.setState({ algorithm: "GBFS" })}
                >
                  Greedy Best First Search
                </Dropdown.Item>
              </DropdownButton>
              <Button
                variant="dark"
                className="mx-1"
                onClick={() => this.resetGrid()}
              >
                <FaRedo />
                Reset
              </Button>
              <Button
                variant="success"
                className="mx-1"
                onClick={() => this.handleVisualize()}
              >
                <FaPlay />
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
                      const { row, col, isStart, isFinish, isWall, weight } = node;
                      return (
                        <Node
                          key={nodeIdx}
                          row={row}
                          col={col}
                          isStart={isStart}
                          isFinish={isFinish}
                          isWall={isWall}
                          weight={weight}
                          onMouseDown={() =>
                            this.handleMouseDown(rowIdx, nodeIdx)
                          }
                          onMouseUp={() => this.handleMouseUp(rowIdx, nodeIdx)}
                          onMouseOver={() =>
                            this.handleMouseEnter(rowIdx, nodeIdx)
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

function resetVisitedNodes() {
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      if (row === START_NODE_ROW && col === START_NODE_COL) {
        document.getElementById(`node-${row}-${col}`).className =
          "node node-start";
        continue;
      }

      if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
        document.getElementById(`node-${row}-${col}`).className =
          "node node-finish";
        continue;
      }

      document.getElementById(`node-${row}-${col}`).className = "node";
    }
  }
}

function createNode(row, col) {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isVisited: false,
    distance: Infinity,
    heuristic: Infinity,
    isWall: false,
    weight: 1,
    previousNode: null,
  };
}

function getNewGridWithWallToggled(grid, row, col) {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

function getNewGridWithWeightToggled(grid, row, col) {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    weight: node.weight === 1 ? 2 : 1,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

function getNewGridWithStartToggled(grid, newNode, oldNode) {
  const newGrid = grid.slice();

  const oldStart = newGrid[oldNode.row][oldNode.col];
  const changedOld = {
    ...oldStart,
    isStart: false,
  };
  newGrid[oldNode.row][oldNode.col] = changedOld;

  const { row, col } = newNode;
  const newStart = newGrid[row][col];
  const changedNew = {
    ...newStart,
    isStart: true,
  };
  newGrid[row][col] = changedNew;

  return newGrid;
}

function getNewGridWithFinishToggled(grid, newNode, oldNode) {
  const newGrid = grid.slice();

  const oldFinish = newGrid[oldNode.row][oldNode.col];
  const changedOld = {
    ...oldFinish,
    isFinish: false,
  };
  newGrid[oldNode.row][oldNode.col] = changedOld;

  const { row, col } = newNode;
  const newFinish = newGrid[row][col];
  const changedNew = {
    ...newFinish,
    isFinish: true,
  };
  newGrid[row][col] = changedNew;

  return newGrid;
}
