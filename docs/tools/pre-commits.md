# Git pre-commits
再多人开发项目时，难免会存在不按照规范提交代码的。当你拉下别人写的代码时，启动项目之后，看到那一大片报红的eslint的错误，是不是感觉崩溃了。那么如何避免这种困境呢，那就是使用pre-commits解决。  
安装pre-commits之后，可以很好的避免代码不规范提交问题。
<!-- https://blog.csdn.net/sinat_41747081/article/details/102767457 -->

## 第一步、初始化eslint 
[eslint使用](/tools/eslint.html)
``` shell
npx eslint --init 
```
执行之后 根据选项选择需要的配置

安装完成后查看package.json依赖是否存在以下代码：

``` json 
"@typescript-eslint/eslint-plugin": "^4.0.1", // 安装typescript时自动安装
"@typescript-eslint/parser": "^4.0.1",  // 安装typescript时自动安装
"eslint": "^7.8.1",
"eslint-config-standard": "^14.1.1",
"eslint-plugin-import": "^2.22.0",
"eslint-plugin-node": "^11.1.0",
"eslint-plugin-promise": "^4.2.1",
"eslint-plugin-react": "^7.20.6",
"eslint-plugin-standard": "^4.0.1",
```

## 第二步、安装lint-staged、husky、pre-commit

``` shell
npm install --save-dev lint-staged husky pre-commit
```

## 第三步、配置package.json
将以下代码加到package.json中
``` json
{
  "scripts": {
    "start": "react-scripts start",
    "lint-fix": "eslint --fix --ext .js --ext .tsx --ext src/", // 自动修复格式
    "lint-staged":"lint-staged" 
  },
  "husky":{
    "hooks":{
      "pre-commit":"yarn lint-staged" // cimmit 执行前钩子
    }
  },
  "lint-staged":{
    "./src/**/*.{js,jsx,tsx,ts}":"eslint --ext .js,.jsx,.tsx,.ts"
  }
}
```

## 验证

``` js
rules:{
  "semi": 'error',        // 语句强制不使用分号结尾
  "semi": [2, 'always'],  // 语句强制不使用分号结尾
}
```
我们可以通过结尾是否加分号来进行验证，以上规则配置其中的一项，然后在检查的项目中书写返例并执行
``` shell
git add . && git commit -m "test"
```
``` shell
husky > pre-commit (node v12.18.2)
$ lint-staged
✔ Preparing...
⚠ Running tasks...
  ❯ Running tasks for ./src/**/*.{js,jsx,tsx,ts}
    ✖ eslint --ext .js,.jsx,.tsx,.ts [FAILED]
↓ Skipped because of errors from tasks. [SKIPPED]
✔ Reverting to original state because of errors...
✔ Cleaning up... 

✖ eslint --ext .js,.jsx,.tsx,.ts:

/Users/liteng/Documents/github/react/my-after-sales/src/index.tsx
  1:26  error  Extra semicolon  semi
  2:33  error  Extra semicolon  semi
  3:21  error  Extra semicolon  semi
  4:24  error  Extra semicolon  semi
  5:49  error  Extra semicolon  semi

✖ 5 problems (5 errors, 0 warnings)
  5 errors and 0 warnings potentially fixable with the `--fix` option.

error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
husky > pre-commit hook failed (add --no-verify to bypass)
```

未通过的都会显示并提示出来。
