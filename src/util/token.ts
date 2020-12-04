import Taro from '@tarojs/taro';
import { TOKEN_NAME } from '@/assets/js/config';
 

/**
 * 设置 token
 * @param token
 */
export const setToken = (token: string) => {
  try {
    Taro.setStorageSync(TOKEN_NAME, token);
  } catch (e) {
    throw 'set token error';
  }
};

/**
 * 获取token
 */
export const getToken = ():string => {
  return Taro.getStorageSync(TOKEN_NAME);
};

/**
 * 移除token
 */
export const removeToken = () => {
  Taro.removeStorageSync(TOKEN_NAME);
};

/**
 * clear all
 */
export const clearStorage = () => {
  Taro.clearStorageSync();
};
