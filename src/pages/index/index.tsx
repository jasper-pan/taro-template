import React, { useState } from 'react';
import Taro from '@tarojs/taro'
import { AtButton, AtBadge, AtTimeline, AtTabBar } from 'taro-ui'
import { Button, View } from '@tarojs/components'
import './index.scss'
import Stores from '../../store';

type PageStateProps = {
  store: {
    counterStore: {
      counter: number,
      increment: Function,
      decrement: Function,
      incrementAsync: Function
    }
  }
}

interface Index {
  props: PageStateProps;
}

const Index = () => {
  // Do not destructure data!
  const stores = Stores.useContainer();
  console.log(stores)
  const { counter } = stores
  const jump = () => {
    Taro.navigateTo({
      url: '/pages/ss/index'
    })
  }
  const [current, setCurrent] = useState(0)
  const handleClick = (value) => {
    setCurrent(value)
  }
  return (
    <View>
      <AtBadge dot>
        <AtButton size='small'>按钮</AtButton>
      </AtBadge>
      <AtTimeline
        items={[
          { title: '刷牙洗脸' },
          { title: '吃早餐' },
          { title: '上班' },
          { title: '睡觉' }
        ]}
      >
      </AtTimeline>
      <AtButton type='primary'>按钮文案</AtButton>
      <Button onClick={counter.increment}>increment</Button>
      <Button onClick={jump}>111</Button>
      {counter.count} has order {counter.count}
      <AtTabBar
        tabList={[
          { title: '待办事项', iconType: 'bullet-list', text: 'new' },
          { title: '拍照', iconType: 'camera' },
          { title: '文件夹', iconType: 'folder', text: '100', max: 99 }
        ]}
        onClick={handleClick}
        current={current}
      />
    </View>

  )
}


export default Index
