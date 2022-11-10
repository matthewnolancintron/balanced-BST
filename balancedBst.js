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
  if (v == t.data) {
    // console.log('already in tree');
    //don't add node that's already in tree
    /**
     * couldn't find info on if duplicates occuring from
     * insert were allowed or not so I decided to make it not allowed
     */
    return;
  }
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
    if (
      (t.left != null && t.right == null) ||
      (t.right != null && t.left == null)
    ) {
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

// takes as input another function as a parameter
function levelOrder(root, someFunction) {
  /**
   * should traverse the tree in breadth-first level order
   * and provide each node as argument ot the provided function
   * can be done via iteration or recursion (try both)
   *

   *
   * tip:
   * use an array acting as a queue to keep track of all the
   * child nodes that you yet to traverse and add new ones to the list
   *
   */
  if (root == null) {
    return;
  } else {
    //shift to remove first element in the array
    //push to add element to the end of the array
    //(FIFO)
    let queue = [];
    let storage = [];
    queue.push(root);

    let visitedNode;

    while (queue.length != 0) {
      visitedNode = queue.shift();

      //should return an array of values if no function is given
      if (someFunction == undefined) {
        //save node into the storage to be returned later
        storage.push(visitedNode);
      } else {
        //call function with visted node passed into it
        someFunction(visitedNode);
      }

      //if left or right child are not null add node to the queue
      if (visitedNode.left != null) {
        queue.push(visitedNode.left);
      }

      if (visitedNode.right != null) {
        queue.push(visitedNode.right);
      }

      // console.log(visitedNode.data);
    }

    if (storage.length != 0) {
      // console.log(storage);
      return storage;
    }
  }
}

/**
 * inorder, preorder, and postorder functions
 * that accept an optional function as a parameter.
 *
 * Each of these functions should
 * traverse the tree in their respective
 * depth-first order and yield each node
 * to the provided function given as an argument.
 * The functions should return
 * an array of values if no function is given.
 */

/**
 * Inorder traversal
 * traverse left subtree
 * then visit root or closest parent to left most node
 * traverse right substree of closest parent to left node
 */
function inorder(root, someFunction) {
  let stack = [];
  let visitedNodes = [];
  stack.push(root);

  let node = root;
  //repeat steps while there  are nodes left in the stack
  while (stack.length != 0) {
    console.log(node, "node");
    while (node.left != null) {
      node = node.left;
      stack.push(node);
    }

    visit = stack.pop();
    console.log(visit, "vist");
    console.log(visit.right, "visit.right");
    visitedNodes.push(visit);
    console.log(visitedNodes, "visitedNodes");

    if (visit.right != null) {
      console.log("?");
      node = visit.right;
      console.log(node, "node from right");
      stack.push(node);
    }
  }

  if (someFunction != undefined) {
    visitedNodes.forEach(someFunction);
  } else {
    return visitedNodes;
  }
}

/**
 *
 * preorder traversal
 * traverse the root
 * then traverse the leftsubtree
 * then traverse the rightsubtree
 * root to left subtree to right subtree
 * root,left,right
 *
 * 2, 3, 4, 5, 6, 7, 8
 *
 * 5,3,2,4,7,6,8
 *
 */
function preorder(root, someFunction) {
  let node = root;
  let stack = [];
  let visitedNodes = [];
  stack.push(root);
  visitedNodes.push(root);

  while (stack.length != 0) {
    // console.log(node.data,'node.data');
    while (node.left != null) {
      node = node.left;
      stack.push(node);
      visitedNodes.push(node);
    }

    // console.log(node.data,stack.map(x=>x.data),'before pop');
    node = stack.pop();
    // console.log(node.data,stack.map(x=>x.data),'after pop');

    if (node.right != null) {
      node = node.right;
      stack.push(node);
      visitedNodes.push(node);
    }

    // console.log(visitedNodes.map(x=>x.data),'visitedNodes');
  }
  
  if (someFunction != undefined) {
    visitedNodes.forEach(someFunction);
  } else {
    return visitedNodes;
  }

  // a recursive method
  // if (node === null) {
  //   return;
  // } else {
  //   console.log(node.data);
  //   preorder(node.left);
  //   preorder(node.right);
  //   return node;
  // }
}

// postorder
/**
 * traverse left subtree
 * then right subtree
 * then visit the root
 *
 * left subtree to right subtree then root.
 *
 * left,right,root
 */
function postorder(root, someFunction) {
  /**
   *
   */
  let stack = [];
  let visitedNodes = [];
}

function printNodeData(node) {
  console.log(node.data);
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
// console.log(tree2);
prettyPrint(tree2.root);
preorder(tree2.root, printNodeData);
// let arrayOfLevelOrderNodes = levelOrder(tree2.root) //level order with out function
// console.log(arrayOfLevelOrderNodes);
// levelOrder(tree2.root,printNodeData) // level order with function
//inorder(tree2.root, printNodeData); // 2 3 4 5 6 7 8
//let inorderTree2 = inorder(tree2.root);
//console.log(inorderTree2);

//"testing" insert
// insertNode(8, tree2.root);
// insertNode(9,tree2.root);
// prettyPrint(tree2.root);

//"testing" delete
// console.log(tree2, "tree2");
// console.log("before delete");
// prettyPrint(tree2.root);
// // deleteNode(5,tree2.root); // removing root node with right side that has two children notes
// // deleteNode(6,tree2.root); // remove next root with right side that has one child
// // deleteNode(7,tree2.root); //remove next root with right side that has no children
// // deleteNode(8,tree2.root); // remove next root with no right side
// // deleteNode(3, tree2.root); // remove left child node that has two children nodes
// // prettyPrint(tree2.root);
// // deleteNode(4, tree2.root); // remove left child node that has one child
// // prettyPrint(tree2.root);
// // deleteNode(2,tree2.root); // remove left child that is a leaft node
// // deleteNode(7,tree2.root); // remove right child that has two children
// // prettyPrint(tree2.root);
// // deleteNode(8,tree2.root); // remove right child that has one child
// // prettyPrint(tree2.root);
// // deleteNode(6,tree2.root); // remove right child that is a leaf node
// console.log("after delete");
// // console.log(tree2, "tree2");
// prettyPrint(tree2.root);

// let arr3 = [1,2,3,4,5];
// let tree3 = TreeFactory(arr3);
// console.log(tree3,'tree3');
// console.log('before delete');
// prettyPrint(tree3.root);
// deleteNode(3,tree3.root); // removing root node
// console.log('after delete');
// console.log(tree3,'tree2');
// prettyPrint(tree3.root);
