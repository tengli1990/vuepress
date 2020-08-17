
# 树

## 求根到叶子节点数字之和

给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。  
例如，从根到叶子节点路径 1->2->3 代表数字 123。  
计算从根到叶子节点生成的所有数字之和。  

说明: 叶子节点是指没有子节点的节点。  
输入: [1,2,3,4,5] 
```
      1
     / \
    2   3
   / \
  4   5
```
输出: 262  
解释:  
从根到叶子节点路径 1->2->4 代表数字 124.  
从根到叶子节点路径 1->2->5 代表数字 125.  
从根到叶子节点路径 1->3 代表数字 13.  
因此，数字总和 = 124 + 125 + 13 = 262.  

递归方法
``` javascript 
var sumNumbers = function(root){
   if(!root) return 0
   var sum = 0
   add(root,0)

   return sum
   function add(root, cur){
     cur = cur*10 + root.val
     if(!root.left && !root.right) sum += cur
     if(root.left) add(root.left, cur)
     if(root.right) add(root.right, cur)
   }
}
```


