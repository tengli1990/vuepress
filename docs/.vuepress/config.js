module.exports = {
  title: '学无止境',
  description: '我的个人网站',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  serviceWorker: true,
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    nav:[ // 导航栏配置
      {text: '博客', link: '/blog/' },
      {text: '每日一题', link: '/daily/' },
      {text: '算法', link: '/algorithm/'},
      {text: '阅读', link: '/books/'},
      {text: 'GitHub', link: 'https://github.com/tengli1990/vuepress'}      
    ],
    sidebar: {
      '/blog/': [
        {
          title: '网络协议',   // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          children: [
            'network-http',
            'network-https',
            'network-tcp',
            'network-safe',
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
      ],
      '/daily/':[{
        title:'答案解析', 
        path:'/daily/answer'
      }],
    },
    sidebarDepth: 1, // 侧边栏显示2级
  }
};