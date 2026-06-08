export function Node(value) {
  let left;
  let right;

  function isLeaf() {
    return !left || !right;
  }

  return {
    left,
    right,
    value,
    isLeaf,
  };
}
