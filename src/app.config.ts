export default {
  pages: [
    'pages/index/index',
    'pages/ss/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      {
        text: "首页",
        pagePath: "pages/index/index",

      },
      {
        text: "分类",
        pagePath: "pages/index/index",
       
      },
      {
        text: "购物车",
        pagePath: "pages/index/index",
       
      },
      {
        text: "我的",
        pagePath: "pages/index/index",
       
      }
    ]
  }
}
