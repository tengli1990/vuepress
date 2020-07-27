const  scssFile = './components/**/*.scss';

module.exports = {
  title: '学无止境',
  description: '',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  serviceWorker: true,
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    nav: [ // 导航栏配置
      { text: '博客', link: '/blog/' },
      { text: '每日一题', link: '/daily/' },
      { text: '算法', link: '/algorithm/' },
      { text: '阅读', link: '/books/' },
      // {text: 'GitHub', link: 'https://github.com/tengli1990/vuepress'}      
    ],
    sidebar: {
      '/blog/': [
        {
          title: '函数式编程',
          collapsable: false,
          children: [
            'fp'
          ]
        },
        {
          title: '网络协议',   // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            'network-http',
            'network-https',
            'network-tcp',
            'network-safe',
          ]
        },
        {
          title: '项目工程化',   // 必要的
          collapsable: false,
          children: [
            'engineering'
          ]
        },
        {
          title: '性能优化',   // 必要的
          collapsable: false,
          children: [
            'performance-basic',
            'performance-browser'
          ]
        },
      ],
      '/daily/': [
        {
          title: 'javascript',
          path: '/daily/javascript'
        },
        {
          title: 'css',
          path: '/daily/css'
        },
        {
          title: 'vue',
          path: '/daily/vue'
        },
      ],
    },
    postcss: [require('autoprefixer')],
    sass: { indentedSyntax: true },
    scss:scssFile,
    sidebarDepth: 2, // 侧边栏显示1级
    smoothScroll: true, // 启用页面滚动效果
    repo: 'https://github.com/tengli1990/vuepress',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新时间',
    configureWebpack: (config, isServer) => {
      console.log(11111,config)
      if (!isServer) {
        // 修改客户端的 webpack 配置
      }
    }
  }
};