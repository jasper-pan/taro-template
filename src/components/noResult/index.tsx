import React from 'react';
import { Image, View } from '@tarojs/components';
import cx from 'classnames';
// @ts-ignore
import noResultImg from '@/assets/img/noResult.png';
import './index.scss';

interface NoResultModel {
  type?: string;
  tipsText: string;
}
function NoResultTip (props: NoResultModel) {
  const { type, tipsText } = props;
  return (
    <View className='empty'>
      <View className={cx('empty-info', {'empty-marge': type !== 'price'})}>
        <View className='at-row'>
          <View className='at-col'/>
          <View className='at-col'>
            <Image className='empty-image' src={noResultImg} />
          </View>
          <View className='at-col' />
        </View>
        <View className='at-row'>
          <View className='at-col'/>
          <View className='at-col'>
            <View className='info-text'>
              {tipsText}
            </View>
          </View>
          <View className='at-col' />
        </View>
      </View>
    </View>
  );
};

export default NoResultTip;
