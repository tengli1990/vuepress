# ESlint工具

<!-- https://blog.csdn.net/u012961419/article/details/107991794 -->

## ESlint 安装

- 安装 ESLint 模块为开发依赖 npm i eslint --save-dev or yarn add eslint --dev
- 通过 CLI 命令验证安装结果 npm run eslint -v or npx eslint -v or yarn eslint -v


## ESlint 初始化配置

``` shell
npx eslint --init
```

#### 如何使用ESLink
``` shell
How would you like to use ESLint? 
  To check syntax only # 只检查语法性错误
  To check syntax and find problems # 检查语法错误并且发现问题代码
> To check syntax, find problems, and enforce code style # 检查语法错误，发现问题代码，校验代码风格
```
项目开发中，建议选择第三种。

#### 项目代码中使用哪种模块发方式?
``` shell
What type of modules dos your project use? 
  JavaScript modules (import/export) # ESM：允许使用import/export
  CommonJS (require/exports) # CommonJS：允许使用require/exports
> None of these # 没有用到任何模块化
```
这个问题决定代码当中是否允许使用或调用指定的语法。

#### 当前项目使用的那款框架?
``` shell
Which framework does you project use?
  React
  Vue.js
> None of these
```

#### 项目是否使用了TypeScript，本例选择No?
``` shell
Does your project use TypeScript? No / Yes
```

#### 代码最终将运行在什么环境中?
``` shell
Where does you code run? # 多选
(*) Browser # 浏览器环境
(*) Node # node环境
```
根据运行环境，判断是否允许使用相应环境下的API，例如：
- 浏览器环境：window
- node环境：process.cwd()


#### 指定怎样定义项目的代码风格?
``` shell
How would you like to define a style for your project?
> Use a popular style guide # 使用一个市面上的主流风格
  Answer questions about your style # 通过回答问题，形成一个风格
  Inspect your JavaScript file(s) # 根据JS代码文件，推断代码风格 
```
一般选择一个市面上的主流风格，这样项目如果有新的成员加入，他会很快适应这个风格。

#### 选择上面的Use a popular style guide，ESLint提供3个风格选项：
``` shell
Which style guide do you want to follow? 
  Airbnb: https://github.com/airbnb/javascript
> Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
```
Airbnb和Google分别是这两个公司的具体编码规范。
Standard是开源社区的编码规范，它最大的特点是不用在语句的末尾添加分号;。

- 这里选择Standard

#### 指定配置文件的文件类型
``` shell
What format do you want your config file to be in? 
> JavaScript # 方便在配置文件中添加一些条件判断
  YAML
  JSON
```

#### 以上功能需要一些npm模块，这里提示是否安装它们?
``` shell
Would you like to install them now with npm?  No / Yes
```

<br>
--------------------------------------------- 配置结束 ----------------------------------------------

一切完成之后，项目根目录下就会生成一个.eslintrc.js的配置文件。

## 执行检测
我们创建一个index.js 然后输入js代码来执行验证
``` shell
npx eslint index.js
```

## 总结

- ESLint 可以找出代码中的问题，问题包括：
  - 语法错误
  - 代码不合理
  - 风格不统一
- ESLint 可以自动修复代码中的绝大多数的问题 `--fix`
  ``` json
  // package.json
  {
    "scripts": {
      "lint-fix": "eslint --fix --ext .js,.tsx src",
    }
  }
  ```