# Redux 实现

redux 是[函数式编程](/blog/fp)的经典实现。  
首先，函数式编程得有一个container容器，用map接收一个变形关系作用于每个value，因为有很多菡子并且函数式编程讲究纯，所以需要把所有的东西进行包裹，通过IO菡子来解决异步和脏操作的问题。  
那么在redux中，store就是我们的容器，使用reducer接收action更新currentState，middleware中间件就是IO菡子，可以用来处理异步和脏操作。

## 概念
- Action
- Reducer
- Store

**Action** 表示应用中的各类动作或操作，不同的操作会改变应用相应的state状态，说白了就是一个带type属性的对象。  
**Reducers** 指定了应用状态的变化如何响应 actions 并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。  
**Store** 则是我们储存state的地方。我们通过redux当中的createStore方法来创建一个store。  


## 目录
```
├── actions                           // 操作 
├── middlewares                       // 中间件
│   ├── exceptiontimeMiddleware.js
│   ├── loggerMiddleware.js
│   └── timeMiddleware.js
├── reducers                          // 函数式编程中我们称之为Fold折叠 ，接收旧的 state 和 action，返回新的 state。
│   ├── combineReducers.js            // 处理合并reducer
│   ├── counter.js                    
│   └── info.js
└── redux
    ├── applyMiddleware.js            // 处理合并中间件
    ├── bindActionCreators.js         // 实现简化操作，将单个或多个ActionCreator转化为dispatch(action)的函数集合形式
    ├── compose.js                    // 执行所有中间件
    ├── createStore.js                // 创建store 容器，存储state
    └── index.js                      // 模块导出文件
```

## 实现
### 1、简版

- createStore
- combineReducers

#### redux/createStore.js
::: details 查看
``` js
export default function createStore(reducer,initState){
  // 初始化状态
  let state = initState
  
  // 创建电话本，存储订阅者
  let listeners = []

  // 获取状态接口
  function getState(){
    return state
  }

  //实现订阅方法 
  function subscribe(listener){
    listeners.push(listener)
    // 这里我们返回一个取消订阅的方法
    return function unsubscribe(){
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  // 派发动作
  // 每执行一次dspatch，所有的reducer都会执行
  function dispatch(action){
    // reducer 接收一个action动作 并且返回新的state
    state = reducer(state,action)
    // 状态改变之后通知所有订阅者
    for(let listener of listeners){
      listener()
    }
    return action
  }

  // 替换reducer
  function replaceReducer(newReducer){
    reducer = newReducer
    // 当调用reducer发生了变化时，需要重新初始化store的数据结构及默认数据
    dispath({type: Symbol()})
  }

  // 初始化整个store的数据结构，同时获取reducer中的默认数据
  dispath({type: Symbol()})

  return {
    getState,
    subscribe,
    dispatch
  }
}

```
:::

#### redux/index.js 
::: details 查看  
``` js   
import createStore from 'redux/index.js'
import combineReducers from '../reducers/combineReducers.js'

export default {
  createStore,
  combineReducers
}
```
:::

#### reducers/combineReducers.js
::: details 查看  
``` js
export default function combineReducers(reducers){
  return (state={}, action)=>{
    return Object.keys(reducers).reduce((nextState,key)=>{
       // reducers: 单个reducer
       // state[key]：上一次的状态
       // nextState：更新之后的 
       nextState[key] = reducers[key](state[key],action)
       return nextState
    },{})
  }
}
```
:::

#### reducers/
::: details 查看  
infoReducer.js
``` js
const initState = {
  name:''
}
export default function infoReducer(state,action){
  if(!state){
    state = initState
  }
  // 接收一个state 和 action 并返回新的state
  switch(action.type){
    case "SET_NAME":
      return {
        ...state,
        name:action.name
      }
    default :
      return state
  }
}
```

counterReducer.js
``` js
const initState = {
  count:0,
  name:''
}
export default function infoReducer(state,action){
  if(!state){
    state = initState
  }
  // 接收一个state 和 action 并返回新的state
  switch(action.type){
    case "INCREMENT":
      return {
        ...state,
        count:++state.count
      }
    case "DECREMENT":
      return {
        ...state,
        count:--state.count 
      }
    default :
      return state
  }
}
```
:::

一个简版的redux 就完成了。

#### 在index.html中调用方法

``` html 
<body>
  <script type="module">
    import { createStore, combineReducers} from  './redux/index.js';
    import infoReducer from './reducers/infoReducer.js'
    import counterReducer from './reducers/counterReducer.js'
    const reducer = combineReducers({
      info:infoReducer,
      counter:counterReducer
    })
    const store = createStore(reducer)

    store.subscribe(()=>{
      //  订阅：当状态改变的时候，则会执行当前函数
      console.log('currentState',store.getState())
    })

    // 手动执行dispatch 改变数据
    store.dispatch({
      type: 'INCREMENT'
    })
    store.dispatch({
      type: 'SET_NAME',
      name:'Lili'
    })
  </script>
</body>
```

### 2、基于简版实现中间件

- middlewares
- applyMiddleware
- compose

在这里，为了方便查看 我将多个middleware写到了一个文件中。  
#### middlewares/index.js  
::: details 查看
``` js 
export function exceptionTimeMiddleware(store){
  return (next)=>(action)=>{
    console.log('1')
    try{
    next(action)
    }catch(e){
      console.error('程序出错',e)
    }
  }
}
export function timeMiddleware(store){
  return (next)=>(action)=>{
    console.log('2',Date.now(),store.getState())
    next(action)
  }
}
export function loggerMiddleware(store){
  return (next)=>(action)=>{
    console.log('3','log')
    next(action)
  }
}
```
:::

#### redux/applyMiddleware.js
::: details 查看
``` js
import compose from './compose.js'
// 首先看 middlewares 参数 是 [exceptionTimeMiddleware,timeMiddleware,loggerMiddleware]
export default function applyMiddleware(middlewares){
  // 第一层函数是通过 rewriteCreateStoreFn(createStore) 执行 传递oldCreateStore
  return function(oldCreateStore){
    // 第二层函数是通过 newCreateStoreFn(reducer,initState) 执行，正好接收reducer和 initState
    return function(reducer,initState){
      const store = oldCreateStore(reducer,initState)
      // 中间件的函数也是柯里化函数，以下操作执行了middleware(store)
      // 那么chain = [fn,fn,fn] fn是中间件函数执行返回的第一层函数 即：(next)=>(action)=>{}
      const chain = middlewares.map((middleware=>middleware(store)))
      // compose 就是执行中间件的过程，执行完成以后并返回了 dispatch 即：(action)=>{}
      const dispatch = compose(...chain)(store.dispatch)
      return {
        ...store,
        dispath
      }
    }
  }
}
```
:::

#### redux/compose.js
::: details 查看
``` js 
export default function compose(...funcs){
  if(funcs.length){
    return (args)=>args
  }

  if(funcs.length === 1){
    return func[0]
  }
  return funcs.reduce((a,b)=>(...args)=>a(b(args)))
}
```
:::

::: warning
在redux/index.js中引入 applyMiddleware.js并导出 applyMiddleware方法
:::

修改redux/createStore.js中的createStore方法
```js {2-5}
function createStore(reducer,initState,rewriteCreateStoreFn){
  // 如果中间件存在 那么就需要重写createStore
  if(rewriteCreateStoreFn){
    const newCreateStoreFn = rewriteCreateStoreFn(createStore)
    return newCreateStoreFn(reducer,initState)
  }

  let state = initState
  // ....
}
```

``` html 
<body>
  <script type="module">
    import { createStore, combineReducers, applyMiddleware} from  './redux/index.js';
    import infoReducer from './reducers/infoReducer.js'
    import counterReducer from './reducers/counterReducer.js'
    import { exceptionTimeMiddleware,timeMiddleware, loggerMiddleware } from './middlewares/index.js'
    const reducer = combineReducers({
      info:infoReducer,
      counter:counterReducer
    })

    const rewriteCreateStoreFn = applyMiddleware(exceptionTimeMiddleware,timeMiddleware,loggerMiddleware)
    // 将 middlewares传入 createStore
    const store = createStore(reducer,{},rewriteCreateStoreFn)

    store.subscribe(()=>{
      //  订阅：当状态改变的时候，则会执行当前函数
      console.log('currentState',store.getState())
    })

    // 手动执行dispatch 改变数据
    store.dispatch({
      type: 'INCREMENT'
    })
  </script>
</body>
```

## 实现 bingActionCreators

#### actions/info.js
``` js 
export function setName(){
  return {
    type:'SET_NAME',
    name:'虎子'
  }
}
```

#### actions/counter.js
``` js 
export function increment(){
  return {
    type:'INCREMENT'
  }
}
```
#### redux/bindActionCreators.js
``` js
function bindActionCreator(action,dispatch){
  return function(){
    // 返回一个dispatch 并将action函数的this指向到 actionsCreators上
    return dispatch(action.apply(this,arguments))
  }
}
export default function bindActionCreators(actions, dispatch){
    var actionsCreators = {}
    for(var key in actions){
      const actionKey = actions[key]
      if(typeof actionKey === 'function'){
        actionsCreators[key] = bindActionCreator(actionKey,dispatch)
      }
    }
    return actionsCreators
}
```

``` html {23-25}
<body>
  <script type="module">
    import { createStore, combineReducers, applyMiddleware} from  './redux/index.js';
    import infoReducer from './reducers/infoReducer.js'
    import counterReducer from './reducers/counterReducer.js'
    import { exceptionTimeMiddleware,timeMiddleware, loggerMiddleware } from './middlewares/index.js'
    import { setName } from './actions/info.js'
    import { increment } from './actions/counter.js'
    const reducer = combineReducers({
      info:infoReducer,
      counter:counterReducer
    })

    const rewriteCreateStoreFn = applyMiddleware(exceptionTimeMiddleware,timeMiddleware,loggerMiddleware)
    // 将 middlewares传入 createStore
    const store = createStore(reducer,{},rewriteCreateStoreFn)

    store.subscribe(()=>{
      //  订阅：当状态改变的时候，则会执行当前函数
      console.log('currentState',store.getState())
    })
    // 将action传入到函数
    const actions = bindActionCreators({setName, increment}, store.dispatch)
    actions.increment()  // 执行增加
    actions.setName()
  </script>
</body>
```




