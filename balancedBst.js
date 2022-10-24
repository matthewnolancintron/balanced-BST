const node = (data) =>{
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

const Tree = (array) =>{
    /**
     * Build a Tree class / factory
     * which accepts an array when initialized.
     * The Tree class should have a root attribute
     * which uses the return value of buildTree which
     * you’ll write next.
     */
    return {
        root:'', // set to return value of buildTree
    }
}

function buildTree(array){
    
}