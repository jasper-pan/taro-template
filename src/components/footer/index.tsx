import React from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { t } from '@/i18n';
import isEmpty from 'lodash/isEmpty';
import cx from 'classnames';
import Stores from '@/store';
import { INDEX_SKIP_URL, TOKEN_NAME } from '@/assets/js/config';
import './index.scss';


interface FooterInterface {
  activeType: string;
}

const Footer = (props: FooterInterface) => {
  const { activeType } = props;
  // 用户信息
  const { userStore } = Stores.useContainer();

  /**
   * 点击跳转路由
   * @param type
   */
  const goRoute = (type: string) => {
    switch (type) {
      case 'INDEX':
        Taro.navigateTo({
          url: '/pages/index/index'
        });
        break;
      case 'APP':
        // TODO 先写个路径占位
        Taro.navigateTo({
          url: INDEX_SKIP_URL.APP
        });
        break;
      case 'USER': {
        const token = Taro.getStorageSync(TOKEN_NAME);
        // 没有登陆和没有用户信息时跳转到登陆页面
        const url = (token && !isEmpty(userStore?.userInfo)) ? '/pages/user/index' : '/pages/login/index';
        Taro.navigateTo({
          url: url
        });
        break;
      }

      default:
        break;
    }
  };

  return (
    <View className='footer'>
      <View className={cx('at-col at-col-4 nub', { 'active': activeType === 'INDEX' })}
            onClick={() => goRoute('INDEX')}>
        <View className='icon icon-home'/>
        <View>{ t('common.index') }</View>
      </View>
      <View className={cx('at-col at-col-4 nub', { 'active': activeType === 'APP' })}
            onClick={() => goRoute('APP')}>
        <View className='icon icon-iphone'/>
        <View>{ t('common.tianHang') + 'APP' }</View>
      </View>
      <View className={cx('at-col at-col-4 nub', { 'active': activeType === 'USER' })}
            onClick={() => goRoute('USER')}>
        <View className='icon icon-passenger'/>
        <View>{ t('common.my') }</View>
      </View>
    </View>
  );
};

export default Footer;
