# 常用插件
### 配置别名

``` javascript
const { resolve } = require('path')
module.exports = {
    resolve: {
        alias: {
            '@': resolve('src')
        }
    }
};
```