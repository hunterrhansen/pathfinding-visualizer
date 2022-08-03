export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  startNode.heuristic = manhattanDistanceToFinish(startNode, finishNode);

  const unvisitedNodes = getAllNodes(grid);

  while (!!unvisitedNodes.length) {
    sortNodesByDistanceAndHeuristic(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid, finishNode);
  }
}

function sortNodesByDistanceAndHeuristic(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => {
    const distanceA = nodeA.distance + nodeA.heuristic;
    const distanceB = nodeB.distance + nodeB.heuristic;
    return distanceA - distanceB;
  });
}

function manhattanDistanceToFinish(currentNode, finishNode) {
  const xDistance = Math.abs(currentNode.col - finishNode.col);
  const yDistance = Math.abs(currentNode.row - finishNode.row);
  return xDistance + yDistance;
}

function updateUnvisitedNeighbors(node, grid, finishNode) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

  let closestNode = null;
  let closest = Infinity;

  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
    let currentHeuristic = manhattanDistanceToFinish(neighbor, finishNode);
    if (currentHeuristic < closest) {
      closest = currentHeuristic;
      closestNode = neighbor;
    }
  }

  if (closestNode !== null) {
    closestNode.heuristic = closest;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}