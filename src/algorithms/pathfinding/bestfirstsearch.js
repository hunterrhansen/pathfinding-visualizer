import { getAllNodes, getTraversableNeighbors, heuristic } from ".";

export function greedyBestFirstSearch(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const unvisitedNodes = getAllNodes(grid);
  startNode.heuristic = heuristic(startNode, finishNode);

  while (!!unvisitedNodes.length) {
    sortNodesByHeuristic(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.heuristic === Infinity) return visitedNodesInOrder;
    if (closestNode === finishNode) return visitedNodesInOrder;

    visitedNodesInOrder.push(closestNode);
    closestNode.isVisited = true;

    updateUnvisitedNeighbors(closestNode, grid, finishNode);
  }
}

function sortNodesByHeuristic(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.heuristic - nodeB.heuristic);
}

function updateUnvisitedNeighbors(node, grid, finishNode) {
  const unvisitedNeighbors = getTraversableNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.previousNode = node;
    neighbor.heuristic = heuristic(neighbor, finishNode);
  }
}