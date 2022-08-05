import { getTraversableNeighbors } from ".";

export function depthFirstSearch(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  const stack = [startNode];
  while (stack.length > 0) {
    const node = stack.pop();

    if (node.isVisited) continue;
    if (node === finishNode) return visitedNodesInOrder;

    visitedNodesInOrder.push(node);
    node.isVisited = true;

    const neighbors = getTraversableNeighbors(node, grid);
    for (const neighbor of neighbors) {
      neighbor.previousNode = node;
      stack.push(neighbor);
    }
  }
  return visitedNodesInOrder;
}