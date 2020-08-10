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
    title: '工程化',   // 必要的
    collapsable: false,
    children: [
      'engineering',
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
  },
  {
    title: 'CSS',
    collapsable: false,
    children: [
      'css-houdini',
      'css-matrix',
    ]
  }
]

// 编程基础
const basic = [{
  title: 'Javascript',
  collapsable: false,
  children: [
    {
      title:'手写部分',
      path:'/basic/js-write'
    },
    {
      title:'设计模式',
      path:'/basic/js-design-pattern'
    }
  ]
},{
  title: "CSS",
  collapsable: false,
  children: [
    {
      title:'手写部分',
      path:'/basic/css-next'
    }
  ]
},{
  title: '算法',
  collapsable: false,
  children: [
    'algorithm-search',
    'algorithm-sort'
  ]
}]

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

// 实战

const practice = [{
  title: '技术相关',
  collapsable: false,
  children: [
    'bff-simple',
  ]
}]




const sidebar = {
  '/blog/': blog,
  '/basic/': basic,
  '/daily/': daily,
  '/books/': books
}

module.exports = sidebar