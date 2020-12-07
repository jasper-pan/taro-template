import React, { useState } from 'react';
 
import Taro from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Button } from '@tarojs/components'
import { loginRequest } from '@/apis/servers'
import HeaderBar from '@/components/headerBar'
import Store from '@/store';

import bannerImg from '../../assets/img/54.png'


import './index.scss';
 

const Index = () => {
  const {counter} = Store.useContainer()
  const [height, setHeight] = useState(0)
  const [navigatorBarHeight, setNavigatorBarHeight] = useState(46)
  const login = async () => {
    const res = await loginRequest({})
    console.log(res)
  }

  Taro.getSystemInfo().then(res => {
    if (process.env.TARO_ENV !== 'h5') {
      const menuInfo = Taro.getMenuButtonBoundingClientRect()
      res.statusBarHeight && setHeight(res.statusBarHeight)
      if (menuInfo.top) {
        let offsetTop = menuInfo.top - res.statusBarHeight
        menuInfo && setNavigatorBarHeight(menuInfo.height + offsetTop * 2)
      }
    }


  })


  return (
    <View className='index-wrap'>
      <View style={{ display: 'none' }} onClick={login}></View>
      <HeaderBar leftText='sdlfkjsdlfkj'></HeaderBar>
      <Swiper
        className='test-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
      >
        <SwiperItem>
          <Image mode='aspectFit' src={bannerImg} />
        </SwiperItem>
        <SwiperItem>
          <Image mode='aspectFit' src={bannerImg} />
        </SwiperItem>
        <SwiperItem>
          <Image mode='aspectFit' src={bannerImg} />
        </SwiperItem>
      </Swiper>

      <View className='sub_bar' style={{ top: `${height + navigatorBarHeight}px` }}>
        {counter.count}
      </View>
      <Button onClick={counter.decrement}>-</Button>
      <Button onClick={counter.increment}>+</Button>
    </View>

  )
};

export default Index;
