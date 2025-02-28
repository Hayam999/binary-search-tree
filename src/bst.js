import { mergeSort } from "./mergeSort.js";
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    if (Array.isArray(arr)) {
      this.root = buildTree(arr);
    } else {
      this.root = arr;
    }
  }
  insert(value) {
    insertHelper(this.root, value);
    return this.root;
  }
  deleteItem(value) {
    findAndDeleteItem(this.root, value, null, "");
    return this.root;
  }
  find(value) {
    return findHelper(this.root, value);
  }
  levelOrder(callback) {
    if (typeof callback != "function") {
      throw new Error("parameter is not a function");
    }
    return levelOrderHelper([this.root], callback, []);
  }
  inOrder(callback) {
    if (typeof callback != "function") {
      throw new Error("parameter is not a function");
    }
    return inOrderHelper(this.root, callback);
  }
  preOrder(callback) {
    if (typeof callback != "function") {
      throw new Error("parameter is not a function");
    }
    return preOrderHelper(this.root, callback);
  }
  postOrder(callback) {
    if (typeof callback != "function") {
      throw new Error("parameter is not a function");
    }
    return postOrderHelper(this.root, callback);
  }
  height(node) {
    return heightHelper(node);
  }
  depth(node) {
    return depthHelper(this.root, node);
  }
  isBalanced() {
    return isBalancedHelper(this.root);
  }
  rebalance() {
    if (this.isBalanced()) {
      return this;
    } else {
      let balancedTree = rebalanceHelper(this);
      return balancedTree;
    }
  }
}

function buildTree(arr) {
  const removeDuplications = [...new Set(arr)];
  const sortedArray = mergeSort(removeDuplications);
  return buildTreeHelper(sortedArray, 0, sortedArray.length - 1);
}

function buildTreeHelper(arr, start, end) {
  if (start > end) {
    return null;
  }

  let mid = start + Math.floor((end - start) / 2);

  let root = new Node(arr[mid]);
  root.left = buildTreeHelper(arr, start, mid - 1);
  root.right = buildTreeHelper(arr, mid + 1, end);

  return root;
}
function insertHelper(node, value) {
  if (node.data > value) {
    if (node.left) {
      insertHelper(node.left, value);
    } else {
      node.left = new Node(value);
    }
  } else if (node.data < value) {
    if (node.right) {
      insertHelper(node.right, value);
    } else {
      node.right = new Node(value);
    }
  } else {
    return;
  }
}
// walk through tree and start deleting if item is found
function findAndDeleteItem(node, value, parentNode, direction) {
  if (!node) {
    return;
  } else if (node.data == value) {
    handleNodeDeletion(node, parentNode, direction);
  } else if (node.data > value) {
    findAndDeleteItem(node.left, value, node, "left");
  } else {
    findAndDeleteItem(node.right, value, node, "right");
  }
}
// handle 3 cases of nodes, having no childre, having 1 child, having 2 children. And delete it the right way
function handleNodeDeletion(node, parentNode, direction) {
  // node is leaf
  if (!node.right && !node.left) {
    if (parentNode) {
      dropLeaf(parentNode, direction);
    }
    node.data = null;
  }
  // node have 2 leaves
  else if (node.right && node.left) {
    let InorderSucessor = getAndHandleInorderSucessor(
      node.right,
      node,
      "right",
    );
    node.data = InorderSucessor;
  }
  // node have 1 child on the right
  else if (node.right) {
    let child = node.right.data;
    node.data = child;
    dropLeaf(node, "right");
  }
  // node has 1 child on the left
  else if (node.left) {
    let child = node.left.data;
    node.data = child;
    dropLeaf(node, "left");
  }
}
function getAndHandleInorderSucessor(node, parentNode, direction) {
  if (!node.left) {
    if (node.right) {
      parentNode.right = node.right;
    }
    if (direction == "right") {
      dropLeaf(node, direction);
    } else {
      dropLeaf(parentNode, direction);
    }

    return node.data;
  } else {
    return getAndHandleInorderSucessor(node.left, node, "left");
  }
}

function dropLeaf(parentNode, direction) {
  if (direction == "right") {
    parentNode.right = null;
  } else if (direction == "left") {
    parentNode.left = null;
  }
}

function findHelper(node, value) {
  if (node.data == value) {
    return node;
  } else if (node.data > value) {
    return findHelper(node.left, value);
  } else {
    return findHelper(node.right, value);
  }
}

function levelOrderHelper(queue, callback, result) {
  if (queue.length == 0) {
    return result;
  } else {
    let currentNode = queue.shift();
    if (currentNode) {
      result.push(callback(currentNode));
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    return levelOrderHelper(queue, callback, result);
  }
}

function inOrderHelper(node, callback) {
  if (node.left) {
    inOrderHelper(node.left, callback);
  }
  callback(node);
  if (node.right) {
    inOrderHelper(node.right, callback);
  }
}
function preOrderHelper(node, callback) {
  callback(node);
  if (node.left) {
    preOrderHelper(node.left, callback);
  }
  if (node.right) {
    preOrderHelper(node.right, callback);
  }
}
function postOrderHelper(node, callback) {
  if (node.left) {
    postOrderHelper(node.left, callback);
  }
  if (node.right) {
    postOrderHelper(node.right, callback);
  }
  callback(node);
}

function heightHelper(node) {
  let rightNode = subtreeHight(node.right, 0);
  let leftNode = subtreeHight(node.left, 0);
  if (rightNode > leftNode) {
    return rightNode;
  } else {
    return leftNode;
  }
}

function subtreeHight(node, acc) {
  if (!node) {
    return acc;
  } else {
    let leftNode = subtreeHight(node.left, acc + 1);
    let rightNode = subtreeHight(node.right, acc + 1);
    if (leftNode > rightNode) {
      return leftNode;
    } else {
      return rightNode;
    }
  }
}

function depthHelper(upperNode, lowerNode) {
  if (upperNode === lowerNode) {
    return 0;
  }
  let leftDepth = subtreeDepth(upperNode, lowerNode, 0);
  let rightDepth = subtreeDepth(upperNode, lowerNode, 0);

  if (leftDepth) {
    return leftDepth;
  } else if (rightDepth) {
    return rightDepth;
  } else {
    throw new Error("Node dosen't exist");
  }
}
function subtreeDepth(upperNode, lowerNode, acc) {
  if (upperNode === lowerNode) {
    return acc;
  } else if (!upperNode) {
    return null;
  } else {
    let leftDepth = subtreeDepth(upperNode.left, lowerNode, acc + 1);
    let rightDepth = subtreeDepth(upperNode.right, lowerNode, acc + 1);
    if (leftDepth) {
      return leftDepth;
    } else {
      return rightDepth;
    }
  }
}
function isBalancedHelper(node) {
  if (!node) {
    return true;
  } else {
    let rightHight = subtreeHight(node.right, 0);
    let leftHight = subtreeHight(node.left, 0);

    if (Math.abs(rightHight - leftHight) > 1) {
      return false;
    } else return isBalancedHelper(node.left) && isBalancedHelper(node.right);
  }
}

function rebalanceHelper(tree) {
  let treeToArray = tree.levelOrder(extractData);
  let newTree = new Tree(buildTree(treeToArray));
  return newTree;
}

const extractData = function (node) {
  return node.data;
};

export { Tree, Node };
