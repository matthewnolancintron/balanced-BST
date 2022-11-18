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

  //todo fix sorting not sorting correctly

  //remove duplicates, using "sets" and sort with array.sort()
  let sortedArray = [...new Set(array)].sort((a,b)=>a-b); 
  let mid = parseInt((start + end) / 2);
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
 * Inorder traversal
 * traverse left subtree
 * then visit root or closest parent to left most node
 * traverse right substree of closest parent to left node
 */
function inorder(root, someFunction) {
  let stack = [];
  let visitedNodes = [];
  let visit;
  
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
 * preorder traversal
 * traverse the root
 * then traverse the leftsubtree
 * then traverse the rightsubtree
 * root to left subtree to right subtree
 * root,left,right
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
 *
 * 2,3,4,5,6,7,8
 * postOrder:2,4,3,6,8,7,5
 */
function postorder(root, someFunction) {
  /**
   * thanks to this site's tutorial:
   * https://www.digitalocean.com/community/tutorials/js-tree-traversal
   *
   * I was able to understand how to use recursion
   * within the function rather than rely on a stack
   * and an itterative process
   *
   * by making a function within postorder function
   * and using recursion with the nested function.
   *
   * my first attemps were to have postorder call itself
   * and it worked to simply traverse the tree but
   * when trying to keep track of the nodes it traversed
   * the visitedNodes array would be set back to a fresh
   * array on each recursive call.
   *
   * now I can see more uses for recursion and myself using it more.
   *
   */
  let visitedNodes = [];
  let current = root;

  let traverse = (node) => {
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
    visitedNodes.push(node);
  };

  traverse(current);

  if (someFunction != undefined) {
    visitedNodes.forEach(someFunction);
  } else {
    return visitedNodes;
  }
}

function height(node) {
  let numEdgesRightSide = 0;
  let numEdgesLeftSide = 0;

  let traverseRight = (node) => {
    if (node.right) {
      numEdgesRightSide++;
      traverseRight(node.right);
    }
  };

  let traverseLeft = (node) => {
    if (node.left) {
      numEdgesLeftSide++;
      traverseLeft(node.left);
    }
  };

  traverseRight(node);
  traverseLeft(node);

  console.log(numEdgesLeftSide);
  console.log(numEdgesRightSide);

  return numEdgesLeftSide > numEdgesRightSide
    ? numEdgesLeftSide
    : numEdgesRightSide;
}

/**
 * depth traverses every path in the tree
 * starting from the root.
 * it count up every edge traversed while
 * looking for a match with the input node
 * if match is found the value counted up so far
 * in the path is stored into an array depthOfNode
 * if no match is found by time the end of path is reached
 * a leaf node then the count is reset and the next path
 * is then searched, repeating the process until done.
 */
function depth(node, root) {
  //tracks number of edges in a given path
  let numEdgesInPath = 0;

  //used to store the number of edges when traversed to
  //the matching node
  let depthOfNode = [];

  //recursivly traverses the tree from the input node n
  let traverseTree = (n) => {
    if (n.left) {
      numEdgesInPath++;
      // console.log(n.data, "node");
      // console.log(numEdgesInPath,'edges in path');
      if (n.data === node.data) {
        depthOfNode.push(numEdgesInPath);
      }
      traverseTree(n.left);
    }

    if (n.right) {
      numEdgesInPath++;
      // console.log(n.data, "node");
      // console.log(numEdgesInPath,'edges in path');
      if (n.data === node.data) {
        depthOfNode.push(numEdgesInPath);
      }
      traverseTree(n.right);
    }

    if (!n.right & !n.left) {
      numEdgesInPath++;
      // console.log(n.data, "leaf");
      // console.log(numEdgesInPath,'edges in path');
      if (n.data === node.data) {
        depthOfNode.push(numEdgesInPath);
      } else {
        numEdgesInPath = 0;
      }
    }
  };

  //check right side of tree
  if (root.right) {
    traverseTree(root.right);
  }

  //check left side of tree
  if (root.left) {
    traverseTree(root.left);
  }

  // return first element of depth of node.
  return depthOfNode[0];
}

//takes root node and checks if tree is balanced
//returns true or false.
function isBalanced(root) {

  /**
   * TraverseAndCheck
   * recursive DFS traversal sub function:
   * 
   * //base case:
   *  null node with height of -1
   *  and balance status of true
   * 
   * //recursive step:
   *  check if it has a left node
   *  if it does ask that node for it's height
   *  and it's balance status via recursion
   *  do the same for the right side of the tree
   *  
   *  after a response from base case is reached
   *  exection going back up the call stack will
   *  the nodes will recieve the results of it's
   *  left and right sub trees knowing if they are
   *  balanced and the heights
   *  it will use the heights to calculate it's
   *  own height and it's own balance status
   *  to pass on to it's parent node until
   *  finally reaching the root node
   *  where the root will know if it's
   *  trees are balanced or not.
   *  and it's own height
   *   
   *  
   * 
   * 
   */
  let traverseAndCheck = (n) => {
      //recursive step when it's not a leaf node
      let leftSubTreeBalanceStatusAndHeight;
      let rightSubTreeBalanceStatusAndHeight;
      let heightOfCurrentNode;
      let balanceStatus;

      //recursive steps
      //ask left sub tree if it's sub trees are balanced and what
      //it's height is
      if (n.left) {
        leftSubTreeBalanceStatusAndHeight = traverseAndCheck(n.left);
      } else {
        leftSubTreeBalanceStatusAndHeight = {
          height: -1,
          isBalanced: true,
        };
      }

      if (n.right) {
        rightSubTreeBalanceStatusAndHeight = traverseAndCheck(n.right);
      } else {
        rightSubTreeBalanceStatusAndHeight = {
          height: -1,
          isBalanced: true,
        };
      }

      heightOfCurrentNode =
        Math.max(
          leftSubTreeBalanceStatusAndHeight.height,
          rightSubTreeBalanceStatusAndHeight.height
        ) + 1;
      
      if(
        leftSubTreeBalanceStatusAndHeight.isBalanced
        &&
        rightSubTreeBalanceStatusAndHeight.isBalanced
      ){
        balanceStatus =
          Math.abs(
            leftSubTreeBalanceStatusAndHeight.height -
              rightSubTreeBalanceStatusAndHeight.height
          ) <= 1;
      } else {
        balanceStatus = false;
      }

      return {
        height: heightOfCurrentNode,
        isBalanced: balanceStatus,
      };
  };
  return traverseAndCheck(root).isBalanced;
}

//start a #11 write a rebalance function
function rebalance(root){
  let nodes = [];
  let traverse = n => {
  
    nodes.push(n.data);
    if(n.left){
      traverse(n.left)
    }

    if(n.right){
      traverse(n.right);
    }
  }
  traverse(root);

  let rebalancedTree = TreeFactory(nodes);
  return rebalancedTree;
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

export {TreeFactory,levelOrder,find,deleteNode,depth,height,prettyPrint,isBalanced,preorder,postorder,inorder,insertNode,rebalance,printNodeData};