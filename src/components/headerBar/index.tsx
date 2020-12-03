import React, { useState } from 'react';
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

const HeaderBar = (props) => {
    const { leftText } = props
    const [height, setHeight] = useState(58)
    Taro.getSystemInfo().then(res=>{
        console.log(res)
    })
    return (
        <View className='header-wrap' style={{ height: `${height}px` }}>
            {leftText}
        </View>
    )
}


export default HeaderBar