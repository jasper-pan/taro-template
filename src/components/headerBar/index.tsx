import React, { useState, useEffect } from 'react';
import Taro, { usePageScroll } from '@tarojs/taro'
import _ from 'lodash'
import { AtNavBar } from 'taro-ui'
import { View } from '@tarojs/components'
import './index.scss'

const HeaderBar = (props) => {
   
    const [height, setHeight] = useState(0)
    const [navigatorBarHeight,setNavigatorBarHeight] = useState(46)
    const [opacity, setOpacity] = useState<Number>(0)
    usePageScroll((res) => {
        let top = res.scrollTop
        let barHeight = navigatorBarHeight + height
        console.log(top <= barHeight)
        if (top <= barHeight) {
            setOpacity(Number(top/barHeight))
        }else{
            if(opacity!==1){
                setOpacity(1)
            } 
        }
    })

    const pageScrollFn = _.throttle((e) => {
        let top = e.target.scrollTop
        let barHeight = navigatorBarHeight + height
       
        if (top <= barHeight) {
            setOpacity(Number(top/barHeight))
        }else{
            setOpacity(1)
        }
    }, 200)

    useEffect(() => {
        let wrap: HTMLElement | null = document.querySelector('.taro-tabbar__panel')
        if (process.env.TARO_ENV === 'h5') {

            wrap && wrap.addEventListener('scroll', pageScrollFn)
        }
        return () => {
            wrap && wrap.removeEventListener('scroll', pageScrollFn)
        }
    }, [pageScrollFn])

    Taro.getSystemInfo().then(res => {
        if (process.env.TARO_ENV !== 'h5') {
        const menuInfo = Taro.getMenuButtonBoundingClientRect()
        res.statusBarHeight && setHeight(res.statusBarHeight)
        if(menuInfo.top){
            let offsetTop = menuInfo.top - res.statusBarHeight
            setNavigatorBarHeight(menuInfo.height+offsetTop*2)
        }
    }
    })
    return (
        <View className='header-wrap' style={{opacity: Number(opacity).toFixed(2) }}>
            <View  style={{ height: `${height}px` }}>
            </View>
             <View style={{height:`${navigatorBarHeight}px`}} className='header-main'></View>
        </View>

    )
}


export default HeaderBar