import { t } from '@/i18n';
import { Base64 } from 'js-base64';
import isEmpty from 'lodash/isEmpty';

/**
 * 判断机型
 * @param equipmentType
 * @returns {*}
 */
export const showFlightType = (equipmentType: string) => {
  if (equipmentType.startsWith('7')) {
    return t('common.boeing') + equipmentType;
  } else if (equipmentType.startsWith('3') || equipmentType.startsWith('AB6')) {
    return t('common.airbus') + equipmentType;
  } else {
    return equipmentType;
  }
};

/**
 * 获取货币前缀
 * @param currencyCode
 */
export const getCurrencyTxt = (currencyCode: string) => {
  if (currencyCode === 'CNY') {
    return '¥';
  } else {
    return '$';
  }
};

/**
 * 获取路由参数，适用于对象
 * @param params
 */
export const getUrlParams = (params: string) => {
  if (params) {
    return JSON.parse(Base64.decode(params));
  }
};


/**
 * 设置路由参数，适用于对象
 * 对象转换为加密的json字符串
 * @param params
 */
export const setUrlParams = (params: object) => {
  if (params && !isEmpty(params)) {
    return Base64.encode(JSON.stringify(params));
  }
  return '';
};

/**
 * 参数转换
 * @param param 参数对象
 * @param key URL参数字符串的前缀
 * @param encode 是否进行URL编码,默认为true
 */
export const urlEncode = function (param, key: string | null = null, encode = true) {
  if (param == null) return '';
  let paramStr = '';
  const type = typeof (param);
  if (type == 'string' || type == 'number' || type == 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (const i in param) {
      const k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
};

/**
 * 判断是不是中文
 * @param val
 * @returns {boolean}
 */
export const checkNameChinese = (val: string) => {
  const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
  return reg.test(val);
};

/**
 * 获取全名
 * @param firstName {string} 名
 * @param surName {string} 姓
 * @returns {*|string}
 */
export const splicingPassengerName = (firstName: string, surName: string): string => {
  let name = '';
  // 如果联系人姓名是英文
  if (!checkNameChinese(firstName) && !checkNameChinese(surName)) {
    name = surName + '/' + firstName;
  } else {
    name = surName + (firstName || '');
  }
  return name;
};
