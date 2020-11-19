import trpApi, { Http, Ajax } from '@trp/apis';
import Taro from '@tarojs/taro';
import { t } from '@/i18n';
import { getToken, removeToken, clearStorage } from '@/util/token';

const headers = {
  'Accept-Language': 'zh-CN',
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '',
  'Access-Control-Allow-Credentials': '',
  'Market-Country-Code': 'CN',
  'Device-Id': '1',
  'IP-Address': '1.1.1.1',
  'Sales-Channel': 'IBE',
  'Tenant': 'GS'
};

Ajax.defaults.timeout = 300000;
Ajax.defaults.headers = headers;
Ajax.interceptors.request.use((config) => {

  // Token
  if (!config.headers['User-Token']) {
    const userToken = getToken();
    if (userToken) {
      config.headers['User-Token'] = userToken;
    }
  }
  // 语言
  if (!config.headers['Accept-Language']) {
    const system = Taro.getSystemInfoSync();
    const langType = system.language;
    const marketCountryCode = langType.substr(
      langType.length - 2,
      langType.length
    );
    config.headers['Accept-Language'] = langType;
    config.headers['Market-Country-Code'] = marketCountryCode;
  }

  // 全渠道订单查询 手机短信验证码
  const mfaMeta: any = {};
  if (config.url?.endsWith('/mfa/mobile') || config.url?.endsWith('/profile/authentication')) {
    // 将图片验证码设置到请求头
    Taro.getStorage({ key: 'captcha' }).then(res => {
      mfaMeta.captcha = res.data;
      config.headers['mfaMeta'] = JSON.stringify(mfaMeta);
    });
  }
  if (config.url?.endsWith('/external/bookings/flights/retrieval')) {
    Taro.getStorage({ key: 'sms' }).then(res => {
      mfaMeta.sms = res.data;
      config.headers['mfaMeta'] = JSON.stringify(mfaMeta);
    });
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

Ajax.interceptors.response.use((response) => {
  return response.data || response;
}, async (error) => {
  const tokenUnable = error?.response?.status === 401;
  if (tokenUnable) {
    const errorMessage = t('user.tokenInfoInvalid');
    Taro.showModal({
      title: t('common.notice'),
      content: errorMessage,
      cancelText: t('common.cancel'),
      confirmText: t('common.confirm'),
      success: (result) => {
        if (result.confirm) {
          removeToken();
          clearStorage();
          Taro.redirectTo({
            url: '/pages/index/index'
          });
        }
      }
    });
    return;
  }
  return Promise.reject(error);
});


const getApiUrl = (url: string) => {
  let apiURL = '';
  if (url?.startsWith('/tRtApi')) {
    apiURL = 'http://10.225.64.92/mhtest/api/tRetailAPI' + url?.replace('/tRtApi', '');
  }
  if (url?.startsWith('/authApi')) {
    apiURL = 'http://10.225.64.92/mhtest/api/uc/v1/user' + url?.replace('/authApi', '');
  }
  if (url?.startsWith('/profileApi')) {
    apiURL = 'http://10.225.64.92/mhtest/api/uc/v1/profile' + url?.replace('/profileApi', '');
  }
  if (url?.startsWith('/locations')) {
    apiURL = 'http://10.225.6.43:8280/LocationAPI' + url?.replace('/locations', '');
  }
  return apiURL;
};

if (process.env.TARO_ENV === 'weapp') {
  // 需要根据 /tRtApi 修改 baseURL的值
  // Ajax.defaults.baseURL = process.env.APIURL;
  Ajax.defaults.adapter = (config) => {
    return new Promise((resolve, reject) => {
      const data = config.method === 'get' ? config.params : config.data;
      const apiURL = getApiUrl(`${config?.url}`);

      // @ts-ignore
      wx.request({
        url: apiURL,
        method: config.method,
        data: data,
        header: config.headers,
        success: (res: any) => {
          return resolve(res);
        },
        fail: (err: any) => {
          return reject(err);
        }
      });
    });
  };
}

export default {
  ...trpApi,
  Http
};
