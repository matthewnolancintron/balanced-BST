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


//
function insertNode(value){

}

//
function deleteNode(value){

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



let arr = [1,1,2,3,5,4,6,7];
let tree = TreeFactory(arr);
//console.log(tree);
prettyPrint(tree.root);

