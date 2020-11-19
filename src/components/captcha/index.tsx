import React, { useState } from 'react';
import cx from 'classnames';
import { t } from '@/i18n';
import isEmpty from 'lodash/isEmpty';
import { AtModal, AtModalContent } from 'taro-ui';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { CaptchaModel, AnswerImage } from './captchaModel';

import './index.scss';

interface CaptchaProps {
  // 初始是否显示
  defaultOpen: boolean;
  setCaptchaOpen: (param: boolean) => void;
  // 验证码渲染数据
  data: CaptchaModel;
  // 回调
  getCaptchaId?: (captchaId: string, imgs: string[]) => void;
  // 刷新
  refreshCaptcha: () => void;
}

const Captcha = (props: CaptchaProps) => {
  const { data, getCaptchaId, defaultOpen, setCaptchaOpen, refreshCaptcha } = props;
  const [imgs, setImgs] = useState<string[]>([]);
  const titleImgUrl = data && !isEmpty(data) && `data:image/${data?.questionImage?.imageType};base64,${data?.questionImage?.content}`;

  // 选择/反选验证码
  const checkClick = (imgId: string) => {
    const temp = [...imgs];
    if (temp.includes(imgId)) {
      // 存在，反选
      temp.splice(temp.indexOf(imgId), 1);
    } else {
      // 不存在，添加
      temp.push(imgId);
    }
    setImgs(temp);
  };

  // 校验是否选择验证码，提交
  const onConfirm = () => {
    // 判断是否勾选了图片
    if (imgs.length !== 0) {
      if (getCaptchaId) {
        getCaptchaId(data.captchaId || '', imgs);
        setImgs([]);
      }
      setCaptchaOpen(false);
    } else {
      Taro.showToast({ icon: 'none', duration: 4000, title: t('signup.noCaptcha') });
    }
  };
  return (
    <AtModal isOpened={defaultOpen} className='captcha-model' onClose={() => { setCaptchaOpen(false); }}>
      <AtModalContent>
        <View className='captcha-wrap'>
          {
            data && !isEmpty(data) ?
              <View className='success-content'>
                <View className='tip'>
                  {t('common.captchaTip1')}
                  {titleImgUrl && <Image className='stress' src={titleImgUrl} />}
                  {t('common.captchaTip2')}
                </View>
                <View className='code-content'>
                  {
                    (data.answerImageList || []).map((img: AnswerImage, index: number) => {
                      const selectStyle = cx('code-wrap', imgs.includes(img.id) && 'has-select');
                      return (
                        <View key={index} className={selectStyle} onClick={() => { checkClick(img.id); }}>
                          <Image className='code-item' src={`data:image/${img.imageType};base64,${img.content}`} />
                          <Text className='icon-check' />
                        </View>
                      );
                    })
                  }
                </View>
              </View> : <View className='failed-content'>{t('common.captchaTip3')}</View>
          }
          <View className='actions'>
            <Text className='icon icon-close' onClick={() => {
              setCaptchaOpen(false);
              setImgs([]);
            }} />
            <Text className='icon icon-refresh' onClick={() => {
              refreshCaptcha();
              setImgs([]);
            }} />
            <Text className='confirm' onClick={onConfirm}>{t('common.confirm')}</Text>
          </View>
        </View>
      </AtModalContent>
    </AtModal>
  );
};

export default Captcha;
