export function breadthFirstSearch(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  
  const queue = [startNode];
  while (queue.length > 0) {
    const node = queue.shift();

    if (!node.isVisited) {
      visitedNodesInOrder.push(node);
      node.isVisited = true;
    }

    const neighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of neighbors) {
      neighbor.previousNode = node;
      queue.push(neighbor);
      if (neighbor === finishNode) {
        return visitedNodesInOrder;
      }
    }
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.shift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}