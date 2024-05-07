import {sort} from './mergedsort.mjs';

function Node (val) {
    let value = val, left = null, right = null;
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
    const insert = (value) => {
            let target = root;
            let toggle = 0;
            while (toggle === 0) {
                if (value === target.getValue()) {
                    toggle = 1;
                }
                else if (value < target.getValue()) {
                    if (target.getLeft() !== null) {
                        target = target.getLeft();
                    }
                    else {
                        toggle = 1;
                        let x = new Node(value);
                        target.setLeft(x);
                    }
            }
                else if (value > target.getValue()) {
                    if (target.getRight() !== null) {
                        target = target.getRight();
                    }
                    else {
                        toggle = 1;
                        let x = new Node(value);
                        target.setRight(x);
                    }
                 }
            }
    } 
    const deleteItem = (value) => {
        let current = root;
        let parent;
        let rel;
        let curtoggle = 0;
        while (curtoggle === 0) {
            if (current.getValue() === value) {
                // console.log('One');
                curtoggle = 1;
            }
            else if (current.getValue() > value) {
                parent = current;
                rel = 'left';
                current = current.getLeft();
                // console.log('Two');
            }
            else if (current.getValue() < value) {
                parent = current;
                rel = 'right';
                current = current.getRight();
                // console.log('Three');
            }
        }
        if (current.getLeft() === null && current.getRight() === null) {
            if (rel === 'left') {
                parent.setLeft(null);
                // console.log('Four');
            }
            else {
                parent.setRight(null);
                // console.log('Five');
            }
        }
        else if (current.getRight() === null) {
            let child = current.getLeft();
            if (rel === 'left') {
                parent.setLeft(child);
                // console.log('Six');
            }
            else {
                parent.setRight(child);
                // console.log('Seven');
            }
        }
        else if (current.getLeft() === null) {
            let child = current.getRight();
            if (rel === 'left') {
                parent.setLeft(child);
                // console.log('Eight');
            }
            else {
                parent.setRight(child);
                // console.log('Nine');
            }
        }
        else {
            let toggle = 0;
            let child = current.getRight();
            let cparent = current;
            while (toggle === 0) {
                if (child.getLeft() === null) {
                    toggle = 1;
                    // console.log('Ten');
                }
                else {
                    cparent = child;
                    child = child.getLeft();  
                    // console.log('Eleven');  
                }
            }
            if (rel === 'left') {
                parent.setLeft(child);
                // console.log('Twelve');
            }
            else if (rel === 'right') {
                parent.setRight(child);
                // console.log('Thirteen');
            }
            else {
                root = child;
            }
            child.setLeft(current.getLeft());   
            if (current.getRight().getValue() !== child.getValue()) {
                cparent.setLeft(child.getRight());
                child.setRight(current.getRight());    
                // console.log('Fourteen');
            }
        }
    }
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

    function find(value) {
        let toggle = 0;
        let current = root;
        while (toggle === 0) {
            if (current.getValue() === value) {
                toggle = 1;
            }
            else if (current.getValue() > value) {
                current = current.getLeft();
            }
            else if (current.getValue() < value) {
                current = current.getRight();
            }
        }
        return current;
    }

    function levelOrder (callback) {
            let queue = [root];
            let result = [];
            while (queue.length > 0) {
                if (typeof callback === 'function') {
                     queue.forEach((ele) => callback(ele));
                }
                let oldqueue = queue.slice();
                oldqueue.forEach((ele) => result.push(ele.getValue()));
                queue = [];
                oldqueue.forEach((ele) => {
                if (ele.getLeft() !== null) {
                    queue.push(ele.getLeft());
                }
                if (ele.getRight() !== null) {
                    queue.push(ele.getRight());
                }
            });
        };
        if (typeof callback !== 'function') {
            return result;
        }
    }
    return {getRoot, prettyPrint, insert, deleteItem, find, levelOrder};
}

function seven(para) {
    console.log('Value: ' + para.getValue());
}

let example = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// let example = [3, 1, 6, 7, 1, 2, 2, 4, 8, 9, 5];
let main = Tree(example);
main.insert(10);
//   
main.deleteItem(8);
main.prettyPrint(main.getRoot());
// console.log(main.find(9).getRight().getValue());
main.levelOrder(seven);
console.log(main.levelOrder());
