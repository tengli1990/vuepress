#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e
# 生成静态文件
# npm run client:build
# 进入生成的文件夹
cd docs
git add -A
git commit -m 'blog update'
# 发布代码
git push -f https://github.com/tengli1990/tengli1990.github.io.git master
# cd -