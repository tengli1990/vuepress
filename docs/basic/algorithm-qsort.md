# 快速排序

``` js
function qSrot(dataStore){
  var dataStore = dataStore||[9,3,5,8,2,3,4,2,1]
  var minor = []
  var larger = []
  var basic = dataStore[0]

  for(var i = 1; i < dataStore.length;i++){
    if(dataStroe[i]< basic){
      minor.push(dataStroe[i])
    }else{
      larger.push(dataStroe[i])
    }
  }
  return qSort(minor).concat(qSort(larger))
}
```