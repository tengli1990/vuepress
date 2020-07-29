// blog
const blog  = { 
  text: '博客', 
  link: '/blog/' 
}

// 编程基础
const basic = { 
  text:'编程基础',
  link: '/basic/'
}

// 每日一题
const daily = { 
  text: '每日一题', 
  link: '/daily/' 
}

// more
const more = {
  text: '更多',
  ariaLabel: '菜单',
  items: [
    {
      text: '学习相关',
      items: [
        {text: '阅读', link: '/books/'},
        {text: '工具函数', link: '/tools/'}
      ]
    }
  ]
}


module.exports = [
  blog,
  basic,
  daily,
  more
]