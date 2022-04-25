# 查找算法

### 二分查找算法

给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。  
来源：力扣（LeetCode）  
链接：https://leetcode-cn.com/problems/binary-search  

```js
function search(nums, target){
  let left = 0
  let right = nums.length-1

  while(left>=right){
    const mid = left+Math.floor((right-left)/2))

    if(nums[mid] === target){
      return mid
    }else if(nums[mid] < target){
      left = mid + 1
    }else if(nums[mid] > target>){
      right = mid - 1
    }
  }
  return -1
}
```

::: tip  说明
 二分查找法的时间复杂度为：O(log n)
:::