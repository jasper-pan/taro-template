import Taro from '@tarojs/taro';

/**
 * MfaHeader
 * @param type key值
 * @param captcha 数据
 */
export const setMfaHeader = (type: string, captcha: any) => {
  Taro.setStorage({ key: type, data: captcha });
};