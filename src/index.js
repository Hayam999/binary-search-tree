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
