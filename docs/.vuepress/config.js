const scssFile = './components/**/*.scss';
const nav = require('./nav')
const sidebar = require('./sidebar')

module.exports = {
  title: 'Power',
  description: '',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  serviceWorker: true,
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav: nav,
    sidebar: sidebar,
    postcss: [require('autoprefixer')],
    sass: { indentedSyntax: true },
    scss:scssFile,
    sidebarDepth: 1, // 侧边栏显示1级
    smoothScroll: true, // 启用页面滚动效果
    repo: 'https://github.com/tengli1990/vuepress',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新时间',
    configureWebpack: (config, isServer) => {}
  }
};