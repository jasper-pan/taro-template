import React, {useState} from 'react';
import Taro from '@tarojs/taro';
import {View} from '@tarojs/components';
import {AtIcon, AtFloatLayout, AtList, AtListItem} from 'taro-ui';
import { t } from '@/i18n';
import Store from '@/store';
import cx from 'classnames';
import './index.scss';


interface HeaderBarModel {
  // 是否展示HeaderBar
  isShowHeaderBar?: boolean;
  // 是否展示返回icon
  isShowBack?: boolean;
  // 返回上一级点击事件
  onClickBack?: () => void;
  isProlate?: boolean;
  // 标题中心内容
  content?: string | React.ReactNode;
}

const HeaderBar = (props: HeaderBarModel) => {
  const {isShowHeaderBar, isShowBack, onClickBack, isProlate=true, content } = props;
  // 控制点击菜单后的浮动弹层
  const [show, setShow] = useState(false);
  // 获取登录状态，未登录时点击菜单提示去登陆，已登录时展示个人中心、我的订单。
  const { userStore } = Store.useContainer();
  console.log(userStore,'xxxx')
  // Taro判断环境  "ALIPAY" "JD" "QQ" "RN" "SWAN" "TT"  "WEAPP" "WEB"
  const environment = Taro.getEnv();
  // 是否展示title
  const isShowTitle = isShowHeaderBar || environment === 'WEB' || environment === 'RN';

  return (
    <View>
      <View className='header-bar'>
        {isShowTitle &&
          <View className='title at-row'>
            {
              isShowBack ?
                <View className='at-col at-col-2' onClick={onClickBack}>
                  <AtIcon value='chevron-left' />
                </View> :
                <View className='at-col at-col-2' />
            }
            <View className='at-col at-col-8'>{content}</View>
          </View> 
        }
        {isProlate?<View className={cx('placeholder',{'placeholder-top':!isShowTitle})}/>:''}
      </View>
      {/* 点击菜单后的浮层 */}
      <AtFloatLayout isOpened={show} scrollY onClose={()=>{setShow(false);}} >
        {
          userStore.loginState ?
            <AtList>
              {/** '我的订单' */}
              <AtListItem title={t('common.myOrder')}
                extraText={t('common.linkTo')}
                arrow='right'
                iconInfo={{size: 25, color: '#FF4949', value: 'bookmark',}}
                onClick={()=>{
                  setShow(false);
              Taro.navigateTo(
                {url: '/pages/displayBooking/index'});}}
              />
              {/** '个人中心' */}
              <AtListItem title={t('common.profile')}
                extraText={t('common.linkTo')}
                arrow='right'
                iconInfo={{size: 25, color: '#FF4949', value: 'user',}}
                onClick={()=>{
                  setShow(false);
              Taro.navigateTo(
                {url: '/pages/profile/index'});}}
              />
              {/** '退出登录' */}
              <AtListItem title={t('common.logout')}
                arrow='right'
                iconInfo={{size: 25, color: '#FF4949', value: 'bookmark',}}
                onClick={()=>{setShow(false);}}
              />
        </AtList> :
            <AtList>
              {/* '去登陆' */}
              <AtListItem title={t('common.login')}
                extraText={t('common.linkTo')}
                arrow='right'
                iconInfo={{size: 25, color: '#78A4FA', value: 'calendar',}}
                onClick={()=>{
                  setShow(false);
                  Taro.navigateTo(
                    {url: '/pages/login/index'});}}
              />
            </AtList>
        }
      </AtFloatLayout>
    </View>
  );
};

HeaderBar.defaultProps = {
  isShowHeaderBar: false,
  isShowBack: true,
  onClickBack: null,
  content: null
};

export default HeaderBar;
