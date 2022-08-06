import { getTraversableNeighbors } from ".";

export function breadthFirstSearch(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  
  const queue = [startNode];
  while (queue.length > 0) {
    const node = queue.shift();

    if (node.isVisited) continue;
    if (node === finishNode) return visitedNodesInOrder;

    visitedNodesInOrder.push(node);
    node.isVisited = true;

    const neighbors = getTraversableNeighbors(node, grid);
    for (const neighbor of neighbors) {
      neighbor.previousNode = node;
      queue.push(neighbor);
    }
  }
  return visitedNodesInOrder;
}