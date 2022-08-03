export function depthFirstSearch(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  const stack = [startNode];
  while (stack.length > 0) {
    const node = stack.pop();

    if (!node.isVisited) {
      visitedNodesInOrder.push(node);
      node.isVisited = true;
    }

    const neighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of neighbors) {
      neighbor.previousNode = node;
      stack.push(neighbor);
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