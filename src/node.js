export function Node(value) {
  let leftChild;
  let rightChild;

  function setLeftChild(child) {
    leftChild = child;
  }

  function setRightChild(child) {
    rightChild = child;
  }

  function getLeftChild(child) {
    return leftChild;
  }

  function getRightChild(child) {
    return rightChild;
  }

  function getValue() {
    return value;
  }

  return {
    setLeftChild,
    setRightChild,
    getLeftChild,
    getRightChild,
    getValue,
  };
}
