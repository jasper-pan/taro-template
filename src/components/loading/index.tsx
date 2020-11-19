import React from 'react';
import { View, Image } from '@tarojs/components';
// @ts-ignore
import loadingGif from '@/assets/img/loading.gif';
import './index.scss';

const Loading = (props: { isOpened: boolean }) => {
  const { isOpened } = props;

  return (
    <View>
      {isOpened &&
        <View className='m-loading'>
          <View className='m-loading_overlay' />
          <Image className='m-loading_bady' src={loadingGif} />
        </View>
      }
    </View>
  );
};

export default Loading;
