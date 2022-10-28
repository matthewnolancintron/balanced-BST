const nodeFactory = (data) => {
  /**
   * Build a Node class / factory.
   * It should have an attribute for the data it stores
   * as well as its left and right children.
   */
  return {
    data: data,
    left: null,
    right: null,
  };
};

const TreeFactory = (array) => {
  /**
   * Build a Tree class / factory
   * which accepts an array when initialized.
   * The Tree class should have a root attribute
   * which uses the return value of buildTree which
   * you’ll write next.
   */
  return {
    root: buildTree(array, 0, array.length - 1), // set to return value of buildTree
  };
};

function buildTree(array, start, end) {
  if (start > end) {
    return null;
  }
  //remove duplicates, using "sets" and sort with array.sort()
  let sortedArray = [...new Set(array)].sort();
  // console.log(sortedArray, "sortedArray");
  // console.log(start, "start");
  // console.log(end, "end");
  let mid = parseInt((start + end) / 2);
  // console.log(mid, "mid");
  let node = nodeFactory(sortedArray[mid]);
  node.left = buildTree(array, start, mid - 1);
  node.right = buildTree(array, mid + 1, end);
  return node;
}

//take a value v and inserts it as node into tree t
function insertNode(v, t) {
  if (v < t.data) {
    if (t.left != null) {
      return insertNode(v, t.left);
    } else {
      t.left = nodeFactory(v);
      return;
    }
  } else {
    if (t.right != null) {
      return insertNode(v, t.right);
    } else {
      t.right = nodeFactory(v);
      return;
    }
  }
}

//find value in tree t
function find(value, t) {
  if (t.data === value) {
    return t;
  } else if (t.data < value) {
    if (t.right != null) {
      return find(value, t.right);
    } else {
      return "value not in tree";
    }
  } else if (t.data > value) {
    if (t.left != null) {
      return find(value, t.left);
    } else {
      return "value not in tree";
    }
  }
}

//
function deleteNode(v, t) {
  //checking node
  // console.log(t, "current node");
  // if root node is node to be deleted
  if (t.data === v) {
    // is a leaf node, a node with no children
    if (t.right == null && t.left == null) {
      //just remove the node
      // console.log("leaf Node");
      t.data = null;
      return;
    }

    //has only one child
    if ( (t.left != null && t.right == null) ||
    (t.right != null && t.left == null)) {
      // console.log("has one child");
      // set current node as child node
      //and delete child node
      if (t.left == null) {
        let temp = t.right;
        t.right = null;
        t = temp;
      } else {
      
        let temp = t.left;
        let tempNewLeft;
        let tempNewRight;

        t.data = t.left.data;

        // console.log(t.left.left, "t.left.left");

        if (t.left.left != null) {
          tempNewLeft = t.left.left;
        } else {
          tempNewLeft = null;
        }

        // console.log(t.left, "t.left");

        // console.log(t.left.right, "t.left.right");
        if (t.left.right != null) {
          tempNewRight = t.left.right;
        } else {
          tempNewRight = null;
        }

        t.left = tempNewLeft;
        t.right = tempNewRight;
        // console.log(t, "t");
        return;
      }
    }

    //has two children
    if (t.right != null && t.left != null) {
      /**
       * Find inorder successor of the node.
       * Copy contents of the inorder successor to the node
       * and delete the inorder successor.
       *
       * Note that inorder predecessor can also be used.
       *
       * node with the smallest key greater than the input node
       */
      let rightSubTree = t.right;
      let minInRightSubTree = rightSubTree;

      // console.log(rightSubTree, "rightSubTree");
      // console.log(minInRightSubTree, "minInRightSubTree");

      // console.log(rightSubTree.right, "rightSubTree.right");
      // console.log(minInRightSubTree, "minInRightSubTree");
      let leftSide = rightSubTree.left;
      // console.log(leftSide, "leftSide");
      while (leftSide != null) {
        // console.log(leftSide, "leftSide");
        // console.log(minInRightSubTree, "minInRightSubTree");
        if (leftSide.data < minInRightSubTree.data) {
          // console.log("found smaller value");
          minInRightSubTree = leftSide;
          // console.log(leftSide, "leftSide");
          // console.log(minInRightSubTree, "minInRightSubTree");
        }
        leftSide = leftSide.left;
        // console.log('not found');
        // console.log(leftSide, "leftSide.");
      }

      // console.log(rightSubTree, "rightSubTree");
      rightSubTree.left = null;
      if (
        minInRightSubTree.right !== null &&
        minInRightSubTree.data !== rightSubTree.data
      ) {
        minInRightSubTree.right = rightSubTree;
      }

      // console.log(rightSubTree.right, "rightSubTree.right");
      // console.log(rightSubTree, "rightSubTree.");
      if (minInRightSubTree.data === t.right.data) {
        t.right = minInRightSubTree.right;
      }

      t.data = minInRightSubTree.data;

      // minInRightSubTree = null;
      // console.log(t, "t");
      return;
    }
  } else if (t.left != null && t.left.data === v) {
    let nodeToDelete = t.left;
    //if node to the left is node to be deleted
    // console.log("node left of current node");

    /**
     * check if node is a leaf node
     */
    if (nodeToDelete.left == null && nodeToDelete.right == null) {
      t.left = null;
      return;
    }

    /**
     * check if node has at least one child
     */
    if (
      (nodeToDelete.left != null && nodeToDelete.right == null) ||
      (nodeToDelete.right != null && nodeToDelete.left == null)
    ) {
      // set current node as child node
      //and delete child node
      if (nodeToDelete.left == null) {
        let temp = nodeToDelete.right;
        nodeToDelete.right = null;
        nodeToDelete = temp;
      } else {
        let temp = nodeToDelete.left;
        let tempNewLeft;
        let tempNewRight;
        nodeToDelete.data = nodeToDelete.left.data;

        if (nodeToDelete.left.left != null) {
          tempNewLeft = nodeToDelete.left.left;
        } else {
          tempNewLeft = null;
        }

        if (nodeToDelete.left.right != null) {
          tempNewRight = nodeToDelete.left.right;
        } else {
          tempNewRight = null;
        }

        nodeToDelete.left = tempNewLeft;
        nodeToDelete.right = tempNewRight;
        return;
      }
    }

    /**
     * check if node has two children
     */
    if (nodeToDelete.left != null && nodeToDelete.right != null) {
      let rightSubTree = nodeToDelete.right;
      let minInRightSubTree = rightSubTree;
      let leftSide = rightSubTree.left;

      while (leftSide != null) {
        if (leftSide.data < minInRightSubTree.data) {
          minInRightSubTree = leftSide;
        }
        leftSide = leftSide.left;
      }
      rightSubTree.left = null;
      if (
        minInRightSubTree.right !== null &&
        minInRightSubTree.data !== rightSubTree.data
      ) {
        minInRightSubTree.right = rightSubTree;
      }

      // console.log(rightSubTree.right, "rightSubTree.right");
      // console.log(rightSubTree, "rightSubTree.");
      if (minInRightSubTree.data === nodeToDelete.right.data) {
        nodeToDelete.right = minInRightSubTree.right;
      }

      nodeToDelete.data = minInRightSubTree.data;

      // minInRightSubTree = null;
      // console.log(nodeToDelete, "t");
      return;
    }
  } else if (t.right != null && t.right.data === v) {
    //if node to the right is node to be deleted
    // console.log("node right of current node");
    /**
     * check if node to the right is a
     * leaf node or has at least one child or
     * has two children
     */

    //node to the right of the current node
    let nodeToTheRight = t.right;

    //leaf node
    if (nodeToTheRight.right == null && nodeToTheRight.left == null) {
      //just remove the node
      //not sure how to delete nodes
      t.right = null;
      return;
    }

    //has only one child
    if (
      (nodeToTheRight.left != null && nodeToTheRight.right == null) ||
      (nodeToTheRight.right != null && nodeToTheRight.left == null)
    ) {
      // set current node as child node
      //and delete child node
      if (nodeToTheRight.left == null) {
        let temp = nodeToTheRight.right;
        nodeToTheRight.right = null;
        nodeToTheRight = temp;
      } else {
        let temp = nodeToTheRight.left;
        let tempNewLeft;
        let tempNewRight;
        nodeToTheRight.data = nodeToTheRight.left.data;

        if (nodeToTheRight.left.left != null) {
          tempNewLeft = nodeToTheRight.left.left;
        } else {
          tempNewLeft = null;
        }

        if (nodeToTheRight.left.right != null) {
          tempNewRight = nodeToTheRight.left.right;
        } else {
          tempNewRight = null;
        }

        nodeToTheRight.left = tempNewLeft;
        nodeToTheRight.right = tempNewRight;
        return;
      }
    }

    //has two children
    if (nodeToTheRight.right != null && nodeToTheRight.left != null) {
      let rightSubTree = nodeToTheRight.right;
      let minInRightSubTree = rightSubTree;
      let leftSide = rightSubTree.left;

      while (leftSide != null) {
        if (leftSide.data < minInRightSubTree.data) {
          minInRightSubTree = leftSide;
        }
        leftSide = leftSide.left;
      }
      rightSubTree.left = null;
      if (
        minInRightSubTree.right !== null &&
        minInRightSubTree.data !== rightSubTree.data
      ) {
        minInRightSubTree.right = rightSubTree;
      }
      if (minInRightSubTree.data === nodeToTheRight.right.data) {
        nodeToTheRight.right = minInRightSubTree.right;
      }

      nodeToTheRight.data = minInRightSubTree.data;
      

      // minInRightSubTree = null;
  
      return;
    
    }

  } else {
    // check other side of the tree based on v
    //and the current node's value

    // if the value is less than the current node's value
    if (v < t.data) {
      //the value could only be if at all on the left
      //side of the tree,
      //also that's if the left side isn't null
      if (t.left != null) {
        //recursively call delete node on the left side
        //of the tree.
        return deleteNode(v, t.left);
      }
    } else {
      // the value is greater than current node's value
      //the value could only be somewhere in the right
      //side of the tree if in the tree at all and
      //if the node to the right of the current
      // node isn't null
      if (t.right != null) {
        //recursively call delete node on the right side
        //of the tree.
        return deleteNode(v, t.right);
      }
    }
  }
}

//function from the odin project
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// let arr1 = [1,2,3,4];
// let tree1 = TreeFactory(arr1);
// console.log(tree1,'tree1');
// console.log('before delete')
// prettyPrint(tree1.root);
// deleteNode(2,tree1.root); // removing root node
// // deleteNode(4,tree1.root); // removing leaf node
// console.log('after delete');
// console.log(tree1,'tree1');
// prettyPrint(tree1.root);

let arr2 = [2, 3, 4, 5, 6, 7, 8];
let tree2 = TreeFactory(arr2);
// console.log(tree2, "tree2");
console.log("before delete");
prettyPrint(tree2.root);
// deleteNode(5,tree2.root); // removing root node with right side that has two children notes
// deleteNode(6,tree2.root); // remove next root with right side that has one child
// deleteNode(7,tree2.root); //remove next root with right side that has no children
// deleteNode(8,tree2.root); // remove next root with no right side
// deleteNode(3, tree2.root); // remove left child node that has two children nodes
// prettyPrint(tree2.root);
// deleteNode(4, tree2.root); // remove left child node that has one child
// prettyPrint(tree2.root);
// deleteNode(2,tree2.root); // remove left child that is a leaft node
// deleteNode(7,tree2.root); // remove right child that has two children
// prettyPrint(tree2.root);
// deleteNode(8,tree2.root); // remove right child that has one child
// prettyPrint(tree2.root);
// deleteNode(6,tree2.root); // remove right child that is a leaf node
console.log("after delete");
// console.log(tree2, "tree2");
prettyPrint(tree2.root);

// let arr3 = [1,2,3,4,5];
// let tree3 = TreeFactory(arr3);
// console.log(tree3,'tree3');
// console.log('before delete');
// prettyPrint(tree3.root);
// deleteNode(3,tree3.root); // removing root node
// console.log('after delete');
// console.log(tree3,'tree2');
// prettyPrint(tree3.root);

// deleteNode(4,tree3.root); // removing root node
// console.log('after delete');
// console.log(tree3,'tree2');
// prettyPrint(tree3.root);

//console.log(tree);
//console.log(tree.root)
// prettyPrint(tree.root);
//console.log(tree.root.data)
//let foundNode = find(5,tree.root);
//console.log(foundNode,'foundNode');

//todo fix insertNode, should not allow duplicates in the tree.
//insertNode(8, tree.root);

//insertNode(3, tree.root);
//insertNode(4, tree.root);

// console.log(tree.root.data)
// deleteNode(6,tree.root); ////removing root node

// deleteNode(4, tree.root); //leaf node deleation
//deleteNode(7,tree.root); //has a single child node
// deleteNode(8,tree.roott)

// console.log(tree.root,'tree.root');

// prettyPrint(tree.root);

//remove node with one child
//deleteNode(7,tree.root);

//remove sub trees or leaf nodes
// deleteNode(7,tree.root);
// deleteNode(5,tree.root)

//prettyPrint(tree.root);
