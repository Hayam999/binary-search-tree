import { Tree } from "./bst.js";

let arr1 = makeNumArray();
let tree1 = new Tree(arr1);
console.log(tree1.isBalanced());

const printData = function (node) {
  console.log(node.data);
};

console.log("//////////////Level Order Traversal//////////////");
tree1.levelOrder(printData);

console.log("//////////////Pre  Order Traversal//////////////");
tree1.preOrder(printData);

console.log("//////////////Post Order Traversal//////////////");
tree1.postOrder(printData);

console.log("//////////////In  Order Traversal//////////////");
tree1.inOrder(printData);

tree1.insert(940);
tree1.insert(200);
tree1.insert(103);
tree1.insert(873);

tree1.rebalance();

console.log(tree1.isBalanced());

function makeNumArray() {
  let randomNum = Math.floor(Math.random() * 100);
  let arr = [];

  for (let i = 0; i <= randomNum; i++) {
    arr[i] = i;
  }
  return arr;
}
