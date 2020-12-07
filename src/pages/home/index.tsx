import React, { useEffect } from 'react';
import Taro from '@tarojs/taro'
import { View, Map } from '@tarojs/components'
import { loginRequest } from '@/apis/servers'
import Store from '@/store'

import './index.scss'


const Home = () => {
  const { counter } = Store.useContainer()
  const login = async () => {
    const res = await loginRequest({})
    console.log(res)
  }
 const getBaiDuMap = () =>{
  
  const { BMap } = window

  var map = new BMap.Map("allmap");    // 创建Map实例

  let geolocation = new BMap.Geolocation()
  geolocation.getCurrentPosition(function (r) {
    let mk = new BMap.Marker(r.point);
    // getAddress(r.point);
    console.log(mk, r)
    let poi = new BMap.Point(r.longitude, r.latitude)
    console.log(poi)
    map.centerAndZoom(poi, 15)
    map.addOverlay(mk)
    map.panTo(r.point)
    let centerPixel = map.pointToOverlayPixel(map.getCenter())
    console.log(centerPixel)
    map.setCenter(map.overlayPixelToPoint({ x: centerPixel.x, y: centerPixel.y }))
    let mkn
    map.addEventListener('dragend', function () {
      map.removeOverlay(mk)
      map.removeOverlay(mkn)
      let pixel = map.pointToOverlayPixel(map.getCenter());
      let Point = map.overlayPixelToPoint({ x: pixel.x, y: pixel.y });
      mkn = new BMap.Marker(Point);
      map.addOverlay(mkn);
    })
  })
 }
  useEffect(() => {
    Taro.getEnv() === Taro.ENV_TYPE.WEB && getBaiDuMap()

  }, [])
  return (
    <View onClick={login} className='index-wrap'>

     
      {
        Taro.getEnv() === Taro.ENV_TYPE.WEB && <View id='allmap'></View>
      }
      {
        Taro.getEnv() === Taro.ENV_TYPE.WEAPP && <Map  longitude={121.59347778} latitude={38.94870994} />
      }
    </View>
  )
};

export default Home;
