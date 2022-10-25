const nodeFactory = (data) =>{
    /**
     * Build a Node class / factory.
     * It should have an attribute for the data it stores
     * as well as its left and right children.
     */
    return {
        data:data,
        left:null,
        right:null,
    }
}

const TreeFactory = (array) =>{
    /**
     * Build a Tree class / factory
     * which accepts an array when initialized.
     * The Tree class should have a root attribute
     * which uses the return value of buildTree which
     * you’ll write next.
     */
    return {
        root:buildTree(array), // set to return value of buildTree

    }
}

function buildTree(array){
    if(array.length === 0){
        return null;
    }
    //remove duplicates, using "sets" and sort with array.sort()
    let sortedArray = [... new Set(array)].sort();
    console.log(sortedArray);
    let mid = Math.floor(sortedArray.length/2);
    console.log(mid);
    let node = nodeFactory(sortedArray[mid]);
    node.left = buildTree(sortedArray.slice(0,mid));
    node.right = buildTree(sortedArray.slice(mid+1,sortedArray.length));
    return node;
}


//take a value v and inserts it as node into tree t
function insertNode(v,t){
    if(v < t.data){
        if(t.left != null){
            return insertNode(v,t.left);
        } else {
            t.left = nodeFactory(v);
            return;
        }
    } else {
        if(t.right != null){
            return insertNode(v,t.right);
        } else {
            t.right = nodeFactory(v);
            return;
        }
    }

    
}

//find value in tree t
function find(value,t){
    if(t.data === value){
        return t;
    } else if (t.data < value){
        if(t.right != null){
            return find(value,t.right);
        } else {
            return 'value not in tree';
        }
    } else if (t.data>value) {
        if(t.left != null){
            return find(value,t.left); 
        } else {
            return 'value not in tree';
        }
    } 
}

//
function deleteNode(value,tree){

}

//function from the odin project
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

let arr = [1,1,5,6,7];
let tree = TreeFactory(arr);
//console.log(tree);
//console.log(tree.root)
prettyPrint(tree.root);
//console.log(tree.root.data)
//let foundNode = find(5,tree.root);
//console.log(foundNode,'foundNode');
insertNode(8,tree.root);
insertNode(3,tree.root);
insertNode(4,tree.root);
prettyPrint(tree.root);