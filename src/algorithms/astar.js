import { getAllNodes, getTraversableNeighbors } from ".";

export function astar(grid, startNode, endNode) {
  const visitedNodesInOrder = []; // closed list
  const unvisitedNodes = getAllNodes(grid); // open list
  startNode.distance = 0; // g-cost, distance from start node to current node
  startNode.heuristic = heuristic(startNode, endNode); // h-cost, distance from current node to end node

  while (!!unvisitedNodes.length) {
    sortNodesByFCost(unvisitedNodes);
    const closestNode = unvisitedNodes.shift(); // grab next node from open list (lowest f-cost and h-cost)
    if (closestNode.distance === Infinity) return visitedNodesInOrder; // if we encounter a node with distance of infinity, we must be trapped and should therefore stop
    closestNode.isVisited = true; // add to closed list
    visitedNodesInOrder.push(closestNode); // add to path
    if (closestNode === endNode) return visitedNodesInOrder; // if we reach the end node, we're done
    updateUnvisitedNeighbors(closestNode, grid, endNode); // update unvisited neighbors
  }
}

function heuristic(node, endNode) {
  const {row: row1, col: col1} = node;
  const {row: row2, col: col2} = endNode;
  const rowDistance = Math.abs(row1 - row2);
  const colDistance = Math.abs(col1 - col2);
  return rowDistance + colDistance;
}

// sort nodes by f-cost and h-cost
function sortNodesByFCost(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => {
    const f1 = nodeA.distance + nodeA.heuristic;
    const f2 = nodeB.distance + nodeB.heuristic;
    if (f1 === f2) {
      const h1 = nodeA.heuristic;
      const h2 = nodeB.heuristic;
      return h1 - h2;
    }
    return f1 - f2;
  });
}

function updateUnvisitedNeighbors(node, grid, endNode) {
  const traversableNeighbors = getTraversableNeighbors(node, grid);
  for (const neighbor of traversableNeighbors) {
    if (heuristic(neighbor, endNode) < neighbor.heuristic) {
      neighbor.heuristic = heuristic(neighbor, endNode);
      neighbor.previousNode = node;
      neighbor.distance = node.distance + 1;
    }
  }
}