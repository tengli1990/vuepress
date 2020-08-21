# 开发loader

创建一个目录
``` shell
mkdir myProject && cd myProject
npm init -y
```
然后建目录
``` text
├── loaders             // 开发的loaders文件夹
│   └── babel-loader.js 
├── plugins             // 开发的plugins文件夹
├── src
│   └── index.js        // 默认打包入口文件
├── webpack.config.js   // 自定义webpack配置文件
├── package.json        
└── yarn.lock     
```

/src/index.js
``` javascript
const data = '测试数据'
const text = data
console.log(text)
```

/loaders/const-loader.js
``` javascript 
const { getOptions } = require('loader-utils')
const acorn = require('acorn')
const walk = require('acorn-walk')
const MagicString = require('magic-string')
/**
 * @param ${String} context 文件内容
*/
module.exports = function (context) {
  //  获取loader的配置信息
  const options = getOptions(this)
  // 获取文件内容 ast 语法树
  const ast = acorn.parse(context)
  const code = new MagicString(context)
  console.log(options)
  walk.simple(ast, {
    VariableDeclaration(node) {
      const { start } = node
      // 将const重写为 var
      code.overwrite(start, start + 5, 'var')
    }
  })
  return code.toString()
}
```

webpack.config.js
``` javascript 
module.exports = {
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[{
          loader: path.resolve(__dirname, 'loaders/babel-loader.js'),
          options:{
            data:"自定义配置项"
          }
        }]
      }
    ]
  }
}
```

package.json
``` json
"scripts":{
  "dev": "webpack --mode development"
}
```

执行
``` shell
yarn dev  # 或使用 npm  run dev
```




