import Taro from '@tarojs/taro';
import { TOKEN_NAME } from '@/assets/js/config';
import cookie from 'react-cookies';

/**
 * 设置 token
 * @param token
 */
export const setToken = (token: string) => {
  try {
    Taro.setStorageSync(TOKEN_NAME, token);
    const exp = new Date();
    exp.setTime(exp.getTime() + 365 * 24 * 60 * 60 * 1000);
    const v = { expires: exp, path: '/', domain: document.domain };
    cookie.save('user-token',token, v);
    console.log('domain', document.domain);
  } catch (e) {
    throw 'set token error';
  }
};

/**
 * 获取token
 */
export const getToken = () => {
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
