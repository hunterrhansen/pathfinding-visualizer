export function recursiveDivisionMaze(grid) {
  const rowStart = 0;
  const rowEnd = grid.length - 1;
  const colStart = 0;
  const colEnd = grid[0].length - 1;
  const visitedNodesInOrder = [];
  
  const middleCol = Math.floor((colStart + colEnd) / 2);
  for (let i = 0; i < grid.length; i++) {
    visitedNodesInOrder.push(grid[i][middleCol]);
  }

  return visitedNodesInOrder;
}
