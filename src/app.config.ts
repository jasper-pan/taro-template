export default {
  pages: [
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#000000",
    selectedColor: "#04304b",
    backgroundColor: "#fff",
    list: [
      {
        text: "首页",
        pagePath: "pages/index/index",
        iconPath: "./assets/img/homePage1.png",
        selectedIconPath: "./assets/img/homePage.png",
      },
      {
        text: "首页",
        pagePath: "pages/index/index",
        iconPath: "./assets/img/homePage1.png",
        selectedIconPath: "./assets/img/homePage.png",
      },
      // {
      //   text: "品类",
      //   pagePath: "pages/classification/index",
      //   iconPath: "./assets/img/pickupCode1.png",
      //   selectedIconPath: "./img/category.png"
      // },
      // {
      //   text: "购物车",
      //   pagePath: "pages/shoppingCart/index",
      //   iconPath: "./assets/img/shopping1.png",
      //   selectedIconPath: "./img/shopping.png"
      // },
      // {
      //   text: "取货码",
      //   pagePath: "pages/certificates/index",
      //   iconPath: "./assets/img/category1.png",
      //   selectedIconPath: "./img/pickupCode.png"
      // },
      // {
      //   text: "我的",
      //   pagePath: "pages/mine/index",
      //   iconPath: "./assets/img/my1.png",
      //   selectedIconPath: "./img/my.png"
      // }
    ]
  }

}
