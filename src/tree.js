import { Node } from "./node.js";

function getMidIndex(array) {
  return Math.floor((array.length - 1) / 2);
}

function getSuccessor(node) {
  let currNode = node.right;

  while (currNode && currNode.left) {
    currNode = currNode.left;
  }

  return currNode;
}

export function Tree(array, sorted = false) {
  if (array && array.length > 1 && !sorted) {
    array = array.filter((el, index) => array.lastIndexOf(el) === index);
    array.sort((x, y) => x - y);
  }

  let root = buildTree(array);

  function includes(value, node = root) {
    if (value > node.value) {
      if (!node.right) {
        return false;
      }

      if (node.right.value === value) {
        return true;
      }

      return includes(value, node.right);
    } else if (value < node.value) {
      if (!node.left) {
        return false;
      }

      if (node.left.value === value) {
        return true;
      }

      return includes(value, node.left);
    }
  }

  function buildTree(array) {
    if (!array || array.length <= 0) {
      return;
    }

    if (array.length === 1) {
      let rootNode = Node(array[0]);

      return rootNode;
    }

    let midIndex = getMidIndex(array);
    let rootNode = Node(array[midIndex]);

    let leftSideArray = array.slice(0, midIndex);
    let rightSideArray = array.slice(midIndex + 1);

    let leftTree = Tree(leftSideArray, true);
    let rightTree = Tree(rightSideArray, true);

    rootNode.left = leftTree.root;
    rootNode.right = rightTree.root;

    return rootNode;
  }

  function insert(value, node) {
    if (includes(value)) {
      return;
    }

    let newNode = Node(value);

    if (node === undefined) {
      return newNode;
    }

    if (value < node.value) {
      node.left = insert(value, node.left);
    } else {
      node.right = insert(value, node.right);
    }

    return node;
  }

  function deleteItem(value, node) {
    if (node.value > value) {
      node.left = deleteItem(value, node.left);
    } else if (node.value < value) {
      node.right = deleteItem(value, node.right);
    }

    if (node.value === value) {
      if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }

      let successor = getSuccessor(node);

      node.value = successor.value;

      deleteItem(successor.value, node.right);
    }

    return node;
  }

  function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }

  function levelOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback function is required");
    }

    let queue = [root];

    while (queue.length > 0) {
      let node = queue[0];

      callback(node);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }

      queue.shift();
    }
  }

  function inOrderForEach(callback, node = root) {
    if (node.left) {
      preOrderForEach(callback, node.left);
    }

    callback(node);

    if (node.right) {
      preOrderForEach(callback, node.right);
    }
  }

  function preOrderForEach(callback, node = root) {
    callback(node);

    if (node.left) {
      preOrderForEach(callback, node.left);
    }

    if (node.right) {
      preOrderForEach(callback, node.right);
    }
  }

  function postOrderForEach(callback, node = root) {
    callback(node);

    if (node.right) {
      preOrderForEach(callback, node.right);
    }

    if (node.left) {
      preOrderForEach(callback, node.left);
    }
  }

  function getNodeWithValue(value, node = root) {
    if (node.value > value) {
      return getNodeWithValue(value, node.left);
    } else if (node.value < value) {
      return getNodeWithValue(value, node.right);
    } else {
      return node;
    }
  }

  function height(value, node = getNodeWithValue(value)) {
    if (!node) {
      return;
    }

    if (!node.left && !node.right) {
      return 0;
    }

    let leftHeight = 0;
    let rightHeight = 0;

    if (node.left) {
      leftHeight += 1;
      leftHeight += height(null, node.left);
    }

    if (node.right) {
      rightHeight += 1;
      rightHeight += height(null, node.right);
    }

    return Math.max(leftHeight, rightHeight);
  }

  function depth(value, node = root, currDepth = 0) {
    if (!node) {
      return;
    }

    if (node.value > value) {
      if (!node.left) {
        return;
      }

      return depth(value, node.left, currDepth + 1);
    } else if (node.value < value) {
      if (!node.right) {
        return;
      }

      return depth(value, node.right, currDepth + 1);
    } else {
      return currDepth;
    }
  }

  function isBalanced(node) {
    if (!node) {
      return true;
    }

    let leftHeight = node.left ? height(null, node.left) + 1 : 0;
    let rightHeight = node.right ? height(null, node.right) + 1 : 0;

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    let isLeftBalanced = isBalanced(node.left);
    let isRightBalanced = isBalanced(node.right);

    if (!isLeftBalanced || !isRightBalanced) {
      return false;
    }

    return true;
  }

  function toArray(node) {
    if (!node) {
      return;
    }

    let array = [];

    preOrderForEach((node) => array.push(node.value));

    return array;
  }

  function rebalance() {
    if (isBalanced(root)) {
      return;
    }

    let treeValues = toArray(root);

    root = buildTree(treeValues);
  }

  return {
    includes,
    prettyPrint: () => prettyPrint(root),
    insert: (value) => insert(value, root),
    deleteItem: (value) => {
      root = deleteItem(value, root);
    },
    levelOrderForEach,
    inOrderForEach,
    preOrderForEach,
    postOrderForEach,
    rebalance,

    isBalanced: () => isBalanced(root),
    height,
    depth,
    root,
  };
}
