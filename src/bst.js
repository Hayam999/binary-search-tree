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
    this.root = buildTree(arr);
  }
  insert(value) {
    insertHelper(this.root, value);
    return this.root;
  }
  deleteItem(value) {
    findAndDeleteItem(this.root, value, null, "");
    return this.root;
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
      node,
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
function getAndHandleInorderSucessor(node, parentNode, direction, basicNode) {
  if (node.right) {
    basicNode.right = node.right;
  }
  return getInorderSuccessor(node, parentNode, direction);
}

function getInorderSuccessor(node, parentNode, direction) {
  if (node.left == null) {
    dropLeaf(parentNode, direction);
    return node.data;
  } else {
    getInorderSuccessor(node.left, node, "left");
  }
}
function dropLeaf(parentNode, direction) {
  if (direction == "right") {
    parentNode.right = null;
  } else if (direction == "left") {
    parentNode.left = null;
  }
}

export { Tree };
