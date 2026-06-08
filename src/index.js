import { Tree } from "./tree.js";

function randomArrayOfInts(amount, max = 100, min = 0) {
  let array = [];

  for (let i = 0; i < amount; i++) {
    let float = Math.random() * max + min;
    let int = Math.round(float);

    array.push(int);
  }

  return array;
}

let tree = Tree(randomArrayOfInts(5));
let randomInts = randomArrayOfInts(5, 200, 100);

console.log("\nUnmodified Tree:");
tree.prettyPrint();

for (let index = 0; index < randomInts.length; index++) {
  let int = randomInts[index];

  tree.insert(int);
}

console.log("\nModified Tree:");
tree.prettyPrint();

tree.rebalance();
console.log("\nBalanced Tree:");
tree.prettyPrint();
