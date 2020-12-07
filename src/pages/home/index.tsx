import React from 'react';
import { View } from '@tarojs/components'
import { loginRequest } from '@/apis/servers'
import Store from '@/store'

 

const Home = () => {
const {counter} = Store.useContainer()
 const login = async() =>{
  const res = await loginRequest({})
  console.log(res)
 }
 
  return (
    <View onClick={login}>{counter.count}</View>
  )
};

export default Home;
