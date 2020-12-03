import React from 'react';
import { View } from '@tarojs/components'
import { loginRequest } from '@/apis/servers'

 

const Home = () => {

 const login = async() =>{
  const res = await loginRequest({})
  console.log(res)
 }
 
  return (
    <View onClick={login}>1111</View>
  )
};

export default Home;
