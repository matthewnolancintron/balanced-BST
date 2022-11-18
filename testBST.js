/**
    1. Create a binary search tree from an array of random numbers.
    2. Confirm that the tree is balanced by calling isBalanced
    3. Print out all elements in level, pre, post, and in order
    4. Unbalance the tree by adding several numbers > 100
    5.Confirm that the tree is unbalanced by calling isBalanced
    6.Balance the tree by calling rebalance
    7.Confirm that the tree is balanced by calling isBalanced
    8.Print out all elements in level, pre, post, and in order
    9...
 */
import * as bst from './balancedBst.js';

//random array from 0 to 9 elements 
//value 0 to 100 or maybe up to just 99... whatever
//using set constructor to remove duplicate values or
//end up with undefined nodes
//not sure if the dots in this ... is the rest or spread opeartor
let randomNumberArray = [... new Set(Array.from(Array(Math.floor(Math.random()*9)).keys(),x=>Math.round(Math.random()*100)))];
console.log(randomNumberArray,'random size array max length of 9 and random values of up to 100');

let randomTree = bst.TreeFactory(randomNumberArray);
if(randomTree.root){
    bst.prettyPrint(randomTree.root);
    console.log();
    console.log('is tree balanced?')
    console.log(bst.isBalanced(randomTree.root));
    console.log();
    console.log('level order:');
    bst.levelOrder(randomTree.root,bst.printNodeData);
    console.log();
    console.log('in order:');
    bst.inorder(randomTree.root,bst.printNodeData);
    console.log();
    console.log('pre order:');
    bst.preorder(randomTree.root,bst.printNodeData);
    console.log();
    console.log('post order:');
    bst.postorder(randomTree.root,bst.printNodeData);
    console.log();

    console.log('tree before adding values');
    bst.prettyPrint(randomTree.root);
    console.log();
    console.log('adding values to the tree with insertNode');
    [... new Set(Array.from(Array(Math.floor(Math.random()*9)).keys(),x=>Math.round(Math.random()*100)))].forEach(x=>{
        bst.insertNode(x,randomTree.root);
    });
    console.log('tree after adding more random values to the tree');
    bst.prettyPrint(randomTree.root);

    console.log();
    console.log('is tree balanced?')
    console.log(bst.isBalanced(randomTree.root));
    console.log();

    console.log('rebalancing the tree');
    randomTree = bst.rebalance(randomTree.root);
    bst.prettyPrint(randomTree.root);

    console.log();
    console.log('is tree balanced?')
    console.log(bst.isBalanced(randomTree.root));
    console.log();

    console.log();
    console.log('level order again:');
    bst.levelOrder(randomTree.root,bst.printNodeData);
    console.log();
    console.log('in order again:');
    bst.inorder(randomTree.root,bst.printNodeData);
    console.log();
    console.log('pre order again:');
    bst.preorder(randomTree.root,bst.printNodeData);
    console.log();
    console.log('post order again:');
    bst.postorder(randomTree.root,bst.printNodeData);
    console.log();



} else {
    console.log('empty tree');
}

