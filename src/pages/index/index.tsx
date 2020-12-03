import React from 'react';
import { View } from '@tarojs/components'
import { loginRequest } from '@/apis/servers'
import HeaderBar from '@/components/headerBar'

import './index.scss';


const Index = () => {

 const login = async() =>{
  const res = await loginRequest({})
  console.log(res)
 }
 
  return (
    <View className='index-wrap'>
       <View style={{display:'none'}} onClick={login}></View>
       <HeaderBar leftText='sdlfkjsdlfkj'></HeaderBar>
       <View>1111111111</View>
    </View>
   
  )
};

export default Index;
