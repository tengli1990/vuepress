const blog = [
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
      'network-dns',
      'network-tcp',
      'network-safe',
    ]
  },
  {
    title: 'CSS',
    collapsable: false,
    children: [
      'css-houdini',
      'css-matrix'
    ]
  },
  {
    title: '进阶',
    collapsable: false,
    children: [
      'advance-webassembly',
      'advance-js-stack'
    ]
  },
  {
    title: 'Framework',
    collapsable: false,
    children: [
      'framework-vue2.x',
      'framework-react16.13.0',
      'framework-redux',
      'framework-vuex',
      'framework-vue-cli',
      'framework-ioc',
      'framework-ioc.di.aop'
    ]
  },
  {
    title: 'Webpack',
    collapsable: false,
    children: [
      'webpack-plugins',
      'webpack-principle',
      'webpack-loader'
    ]
  },
  {
    title: '工程化',   // 必要的
    collapsable: false,
    children: [
      'engineering',
      'engineering-docker',
      'engineering-sonarqube',
      'engineering-jenkins',
      'engineering-nexus'
    ]
  },
  {
    title: '性能优化',   // 必要的
    collapsable: false,
    children: [
      'performance-basic',
      'performance-browser',
      'performance-h5',
      'performance-node'
    ]
  }
]
// 编程基础
const basicCollapsable = true
const basic = [
  {
    title: 'TypeScript',
    collapsable: basicCollapsable,
    children: [
      'ts-tsconfig',
      {
        title: '基础总结',
        path:'/basic/ts-basic-all',
        collapsable: basicCollapsable,
        children: [
          'ts-types',
          'ts-declare',
          'ts-genericity',
          'ts-enum'
        ]
      }
    ]
  }, {
    title: 'JavaScript',
    collapsable: basicCollapsable,
    children: [
      'js-write',
      'js-tail-recursive'
    ]
  }, {
    title: "CSS",
    collapsable: basicCollapsable,
    children: [
      {
        title: '手写部分',
        path: '/basic/css-next'
      }
    ]
  }, {
    title: '设计模式',
    collapsable: basicCollapsable,
    children: [
      'design-pattern-solid'
    ]
  }, {
    title: '常用Web Api',
    collapsable: basicCollapsable,
    children: [
      'webapi-CustomEvent'
    ]
  }, {
    title: '算法',
    collapsable: basicCollapsable,
    children: [
      'algorithm-list',
      'algorithm-stack',
      'algorithm-linked-list',
      'algorithm-binary-tree',
      'algorithm-sort',
      'algorithm-search',
      
    ]
  }
]
//daily 
const daily = [
  {
    title: 'javascript',
    path: '/daily/javascript'
  },
  {
    title: 'css',
    path: '/daily/css'
  },
  {
    title: 'html',
    path: '/daily/html'
  },
  {
    title: 'vue',
    path: '/daily/vue'
  },
  {
    title: '工程化',
    path: '/daily/engineering'
  }
]
// 阅读
const books = [{
  title: '技术相关',
  collapsable: false,
  children: [
    'javascript-01',
    'javascript-02',
    'javascript-03',
  ]
}]

// 工具
const tools = [
  {
    title:'文件解压/压缩',
    collapsable: false,
    children: [
      "compress-rar",
      "eslint.md",
      "pre-commits"
    ]
  }
]

// 实战
const practice = [{
  title: '实战项目',
  collapsable: false,
  children: [
    'vue-ssr',
    'bff-simple',
  ]
}]


const sidebar = {
  '/blog/': blog,
  '/basic/': basic,
  '/daily/': daily,
  '/books/': books,
  '/tools/': tools,
  '/practice/':practice
}

module.exports = sidebar