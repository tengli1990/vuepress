# 二叉树

二叉查找树

### 先（根）序遍历
> 先遍历根节点然后按照左子树的根节点进行递归遍历，所有的左子树的左子节点遍历完成后在遍历左子树的右子节点，左子树遍历完成后，按照遍历左子树的方式在进行遍历右子树

![img](/basic/algorithm/binary-tree.preorder.png)

``` js

```

### 中（根）序遍历

![img](/basic/algorithm/binary-tree.middle-preorder.png)
``` js
function inOrder(node){
  if(node){
    inOrder(node.left)
    console.log(node.val)
    inOrder(node.right)
  }
}
```

### 后（根）序遍历
![img](/basic/algorithm/binary-tree.afterword.png)
``` js

```

<!-- ### 按层遍历 -->


### 完整示例

``` js
function Node(val,left,right){
  this.val = val;
  this.left = left;
  this.right = right;
}

function BST(){
  this.root = null;
  this.insert = insert;
  this.inOrder = inOrder;
  this.remove = remove;
  this.getMin = getMin;
  this.getMax = getMax;
}

function insert(val){
  var n = new Node(val,null,null);

  if(this.root == null){
    this.root = n
  }else{
    var current = this.root;
    var parent

    while(true){
      parent = current;
      if(val < current.val){
        current = current.left;
        if(current == null){
          parent.left = n;
          break
        }
      }else{
        current = current.right;
        if(current == null){
          parent.right = n;
          break
        }
      }
    }
  }
}

// 中序遍历
function inOrder(node){
  var current = this.root || node
  if(node){
    inOrder(node.left)
    console.log(node.val)
    inOrder(node.right)
  }
}

function getMin(node){
  var current = this.root || node
  while(current.left != null){
    current = current.left
  }
  return current
}

function getMax(node){
  var current = this.root || node
  while(current.right != null){
    current = current.right
  }
  return current
}

// 删除
function remove(val){
  this.root = removeNode(this.root,val)
}

function removeNode(node,val){
  if(node == null){
    return null
  }
  if(val == node.val){
    if(node.left == null && node.right==null){
      return null
    }
    if(node.left == null){
      return node.right
    }
    if(node.right == null){
      return node.left
    }
    var tmp = getMin(node.right)
    node.val = tmp.val
    node.right = removeNode(node.right,tmp.val)
    return node
  }else if(val < node.val){
    node.left = removeNode(node.left,val)
    return node
  }else{
    node.right = removeNode(node.right,val)
    return node
  }
}

var nums = new BST()
nums.insert(23)
nums.insert(45)
nums.insert(11)
nums.insert(5)
nums.insert(33)
nums.insert(9)
nums.remove(5)
nums.inOrder(nums.root)
nums.getMin(nums.root)
nums.getMax(nums.root)
```