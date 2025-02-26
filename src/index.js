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

const tree1 = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);

prettyPrint(tree1.root);
tree1.insert(40);
prettyPrint(tree1.root);
tree1.deleteItem(40);
prettyPrint(tree1.root);
//tree1.deleteItem(5);
tree1.deleteItem(2);
prettyPrint(tree1.root);
