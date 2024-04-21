import {sort} from './mergedsort.mjs';

function Node (val) {
    let value = val, left = '', right = '';
    let getValue = () => value;
    let getLeft = () => left;
    let getRight = () => right;
    let setValue = (newval) => value = newval;
    let setLeft = (newl) => left = newl;
    let setRight = (newr) => right = newr;
    return {getValue, getLeft, getRight, setValue, setLeft, setRight};
}

function Tree (mainarray) {
    let root = buildTree(mainarray);
    let getRoot = () => root;
    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.getRight() !== null) {
          prettyPrint(node.getRight(), `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.getValue()}`);
        if (node.getLeft() !== null) {
          prettyPrint(node.getLeft(), `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
    function buildTree(array) {
        if (array.length < 1) {
            return null;
        }
        else {
            let arr = array.slice();
            arr = sort(arr);
            arr = [...new Set(arr)];
            let mid = arr.length === 2 ? 0 : Math.floor((arr.length - 1) / 2);
            let x = Node(arr[mid]);
            mid === 0 ? x.setLeft(null) : x.setLeft(buildTree(arr.slice(0, mid)));
            arr.length > 1 ? x.setRight(buildTree(arr.slice(mid + 1))) : x.setRight(null);
            return x;
        }
    }
    return {getRoot, prettyPrint};
}



let example = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// let example = [3, 1, 6, 7, 1, 2, 2, 4, 8, 9, 5];
let main = Tree(example);
main.prettyPrint(main.getRoot());
