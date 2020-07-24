module.exports = {
  title: 'Knowledge is infinite',
  description: '我的个人网站',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  serviceWorker: true,
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav:[ // 导航栏配置
      {text: '基础', link: '/basic/' },
      {text: '博客', link: '/blog/' },
      {text: '算法', link: '/algorithm/'},
      {text: '阅读', link: '/books/'},
      {text: 'github', link: 'https://github.com/tengli1990/vuepress'}      
    ],
    sidebar: {
      '/basic/':[
        {
          title:'基础',
          collapsable: false,
          children:['js']
        }
      ],
      '/blog/': [
        {
          title: '网络协议',   // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            'http',
            'https'
          ]
        },
        {
          title: '项目工程化',   // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            'engineering'
          ]
        },
        {
          title: '性能优化',   // 必要的
          collapsable: false, // 可选的, 默认值是 true,
          children: [
            'performance'
          ]
        },
      ]
    },
    sidebarDepth: 2, // 侧边栏显示2级
  }
};