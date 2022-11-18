/**
    1.Create a binary search tree from an array of random numbers. You can create a function if you want that returns an array of random numbers each time you call it.
    
    2. Confirm that the tree is balanced by calling isBalanced
    
    3. Print out all elements in level, pre, post, and in order
    
    4. Unbalance the tree by adding several numbers > 100
    
    5.Confirm that the tree is unbalanced by calling isBalanced
    
    6.Balance the tree by calling rebalance
    
    7.Confirm that the tree is balanced by calling isBalanced
    
    8.Print out all elements in level, pre, post, and in order
 */
import * as bst from './balancedBst.js';

//random array from 0 to 9 elements 
//value 0 to 100 or maybe up to just 99... whatever
//using set constructor to remove duplicate values or
//end up with undefined nodes
let randomNumberArray = [... new Set(Array.from(Array(Math.floor(Math.random()*9)).keys(),x=>Math.round(Math.random()*100)))];
console.log(randomNumberArray,'random size array max length of 9 and random values of up to 100');

let randomTree = bst.TreeFactory(randomNumberArray);
if(randomTree.root){
    bst.prettyPrint(randomTree.root);
} else {
    console.log('empty tree');
}