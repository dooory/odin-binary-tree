import { Node } from "../node.js";

describe("Node methods", () => {
  test("Assigns value to node", () => {
    let testNode = Node("Test");

    expect(testNode.getValue()).toBe("Test");
  });

  test("Assigns children to node", () => {
    let parentNode = Node("Parent");
    let leftChild = Node("left");
    let rightChild = Node("right");

    parentNode.setLeftChild(leftChild);
    parentNode.setRightChild(rightChild);

    expect(parentNode.getLeftChild()).toBe(leftChild);
    expect(parentNode.getRightChild()).toBe(rightChild);
  });
});
