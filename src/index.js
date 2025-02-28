import { Tree } from "./bst.js";
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree1 = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const callback = function (node) {
  console.log(node.data);
};
tree1.preOrder(callback);
prettyPrint(tree1.root);

const tree2 = new Tree([1, 2]);
const tree2Height = tree2.height(tree2.root);
const tree1Height = tree1.height(tree1.root);
const tree3 = new Tree([89, 38, 4, 0, 89, 30, 787, 4, 20, 498, 9]);
const tree4 = new Tree([
  89, 38, 4, 0, 89, 30, 787, 4, 20, 498, 9, 50, 40, 88, 102, 86, 56, 90, 104,
  98,
]);

tree4.deleteItem(88);
tree4.deleteItem(30);
tree4.deleteItem(0);
tree4.deleteItem(9);
console.log(tree4.isBalanced());
prettyPrint(tree4.root);
let newTree = tree4.rebalance();
console.log(newTree.isBalanced());
prettyPrint(newTree.root);
