import dayjs from 'dayjs';
import { t } from '@/i18n';
import {
  emailReg, usernameReg, passwordReg, allNumReg, rawWords, allCharacterReg,
  allEnReg, specialCharReg, mobileReg, identityReg, credReg, disableReg, zipReg
} from './rule';

// TODO 所有的正则表达式，用rule.ts中的，如果没有就增加到里面
// 国内 姓名校验 传入姓 或 名
export const cnNameValidator = (name: string) => {
  // 姓名校验
  if (!name) {
    // '姓名不能为空'
    return t('common.nameTip1');
  } else if (allCharacterReg.test(name)) { // 输入的是全中文
    if (name.length < 1 || name.length > 32) {
      // '总字符数不能超过32个字符'
      return t('common.nameTip2');
    }
  } else if (allEnReg.test(name)) { // 输入的是全英文
    // if (!name.includes('/')) {
    //   return '英文姓名必须包含\'/\'';
    // }
    // 判断姓的长度是否满足
    const lengthJudge = name.split('/')[0].length < 2 || name.split('/')[0].length > 14;
    // 判断名的长度是否满足
    // const suraneNameJudge = name.split('/')[1].length < 2 || name.split('/')[1].length > 14;
    if (lengthJudge) {
      // '英文姓和名长度分别都在2-14之间'
      return t('common.nameTip3');
    }
  } else {
    // 英文后面不能跟中文，姓名中不能含有数字，不是纯英文不能包含‘/’
    const number = new RegExp('[0-9]');
    // 不能包含特殊字符和空格
    if (name.indexOf('/') !== -1 ||
      (allEnReg.test(name.charAt(0)) && allCharacterReg.test('名字')) ||
      number.test(name) || specialCharReg.test(name)) {
      // '姓名不能包含特殊字符和空格'
      return t('common.nameTip5');
    }
  }
  if (name) {
    rawWords.forEach((index) => {
      if (name.indexOf(index) !== -1) {
        // 若姓名中包含生僻字，第一个字为生僻字，则姓名都用拼音代替；若第二个字为生僻字，则第一个字写汉字，之后都写拼音，以此类推
        return t('common.nameTip6');
      }
    });
  }
  return '';
};

/**
 * 用户名校验
 */
export const usernameValidator = (username: string, type?: string) => {
  if (!username) {
    // '请填写用户名'
    return t('common.usernameTip1');
  }
  // 登录用户名不用校验
  if (type !== 'login' && !usernameReg.test(username)) { // 字母开头的6-20位字母数字组合
    return t('common.usernameTip2');
  }

  return '';
};

// 密码校验
export const passwordValidator = (password: string, type?: string) => {

  if (!password) {
    // '密码不能为空'
    return t('common.passwordTip1');
  }
  // 登录不用校验
  if (type !== 'login' && password.length < 8) {
    return t('common.passwordTip2');
  }
  if (type !== 'login' && !passwordReg.test(password)) {
    return t('common.passwordTip5');
  }

  return '';
};

// 重复密码校验
export const rePasswordValidator = (password: string, rePassword: string) => {

  if (!rePassword) {
    // '重复密码不能为空'
    return t('common.passwordTip3');
  }

  if (password !== rePassword) {
    return t('common.passwordTip4');
  }

  return '';
};

/**
 * 电子邮箱校验
 */
export const emailValidator = (email: string) => {

  if (!email) {
    return '邮箱不能为空';
  }

  if (!emailReg.test(email)) {
    return '邮箱格式不对';
  }

  return '';
};

// 手机号码验证
export const mobileValidator = (mobile: string) => {
  if (!mobile) {
    // '手机号码不能为空'
    return t('common.mobileTip1');
  } else if (!mobileReg.test(mobile)) {
    // '请输入正确的手机号'
    return t('common.mobileTip2');
  }
  return '';
};

// 凭证号码验证
export const docIdValidator = (docId: string, docType: string, passengerType?: string) => {
  if (!docId) {
    // '凭证号码不能为空'
    return t('common.docIdTip1');
  }
  if (docType === 'RESIDENCE_PERMIT_HK_MO_TW') {
    // 截取证件号前6位
    const str = docId.substring(0, 6);
    if ((str !== '810000') && (str !== '820000') && (str !== '830000')) {
      return t('common.docIdTip4');
    } else if (!identityReg.test(docId)) {
      // '您输入的港澳台居民居住证不合法'
      return t('common.docIdTip4');
    } else {
      return gatTypeNoValidator(docId, passengerType);
    }
  } else if (docType === 'PRC_IDENTITY_CARD') {
    if (!identityReg.test(docId)) {
      // '身份证号码校验错误'
      return t('common.docIdTip2');
    } else {
      return gatTypeNoValidator(docId, passengerType);
    }
  } else if ((!credReg.test(docId)) && !(allEnReg.test(docId))) {
    // '凭证号码格式为4-50位数字或者4-50位数字、字母组合'
    return t('common.docIdTip3');
  }
  return '';
};

// 港澳台居民居住证和身份证是否与乘客类型匹配校验
const gatTypeNoValidator = (docId, passengerType) => {
  // 截取身份证得到的出生日期并且与乘客类型匹配
  const birthStr = docId.slice(6, 14).replace(/(.{4})(.{2})/, '$1-$2-');
  const diffYear = dayjs().diff(dayjs(birthStr), 'year');
  const diffDay = dayjs().diff(dayjs(birthStr), 'day');
  if (passengerType === 'CHD' && (diffYear >= 12 || diffYear < 2)) {
    return t('common.docIdTip7');
  } else if (passengerType === 'INF' && (diffYear >= 2 || diffDay <= 14)) {
    return t('common.docIdTip7');
  } else if (diffYear < 12) {
    return t('common.docIdTip7');
  }
  return '';
};

// 军残警残证件号验证
export const disableValidator = (value) => {
  if (!value) {
    return t('common.disableTip1');
  }
  if (value && !disableReg.test(value)) {
    return t('common.disableTip2');
  }
  return '';
};

// 出生日期验证
export const birthdayValidator = (dateOfBirth, passengerType, docId?: string) => {
  if (!dateOfBirth) {
    return t('common.birthdayTip1');
  } else {
    const diffYear = dayjs().diff(dayjs(dateOfBirth), 'year');
    const diffDay = dayjs().diff(dayjs(dateOfBirth), 'day');
    switch (passengerType) {
      case 'ADT':
      case 'DISABLED_MILITARY':
      case 'DISABLED_POLICE':
        if (diffYear < 12) {
          return t('common.birthdayTip4');
        } else if (docId && (dateOfBirth !== getBirthdayByIdCard(docId))) {
          return t('common.birthdayTip5');
        }
        break;
      case 'CHD':
        if (diffYear >= 12 || diffYear < 2) {
          return t('common.birthdayTip2');
        }
        break;
      case 'INF':
        if (diffYear >= 2 || diffDay <= 14) {
          return t('common.birthdayTip3');
        }
        break;
      default:
        return;
    }
  }
  return '';
};

// 国际姓验证
export const enSurnameValidator = (surname) => {
  // 为空判断
  if (!surname) {
    return t('common.surnameTip1');
  }
  // 姓校验
  if (!/^[a-zA-Z'、-]{2,14}$/.test(surname)) {
    return t('common.surnameTip2');
  }
  return '';
};

// 国际名验证
export const enFirstNameValidator = (firstName) => {
  // 为空判断
  if (!firstName) {
    return t('common.firstNameTip1');
  }
  // 名校验
  if (!/^[a-zA-Z'、-]{2,14}$/.test(firstName)) {
    return t('common.surnameTip2');
  }
  return '';
};

// 证件有效日期验证
export const expiryDateValidator = (expiryDate, depDate) => {
  // 为空判断
  if (!expiryDate) {
    return t('common.expiryDateTip1');
  }
  if (dayjs(expiryDate).diff(dayjs(depDate), 'day') < 180) {
    return t('common.expiryDateTip2');
  }
  return '';
};

// 护照号码验证
export const passportValidator = (passport: string) => {
  if (!passport) {
    return t('common.passportTip1');
  }
  if (!credReg.test(passport)) {
    return t('common.passportTip2');
  }
  return '';
};

// 会员登录卡号校验
export const cardValidator = (card: string) => {
  if (!card) {
    // '卡号不能为空'
    return '卡号不能为空';
  }
  return '';
};

// 手机/邮箱验证码校验
export const SMSCodeValidator = (code: string) => {
  if (!code) {
    // '验证码不能为空'
    return '验证码不能为空';
  }
  if (!allNumReg.test(code)) {
    return '验证码为数字';
  }
  return '';
};

// 密保答案判校验
export const pwdProtectionAnswerValidator = (answer: string) => {
  if (!answer) {
    // '验证码不能为空'
    return '答案不能为空';
  }
  return '';
};

// 邮政编码校验
export const zipValidator = (zip: string) => {
  if (!zip) {
    return t('common.enterZip');
  } else if (!zipReg.test(zip)) {
    return t('common.zipTips');
  }
};
/**
 * 根据身份证获取出生日期
 * @param idCard
 */
export const getBirthdayByIdCard = (idCard: string) => {
  let birthday = '';
  if (idCard !== null && idCard !== '') {
    if (idCard.length === 15) {
      birthday = '19' + idCard.substr(6, 6);
    } else if (idCard.length === 18) {
      birthday = idCard.substr(6, 8);
    }
    birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-');
  }
  return birthday;
};

export const nameValidator = (name: string) => {
  // 姓名校验
  if (!name) {
    // '姓名不能为空'
    return t('common.nameTip1');
  } else if (allCharacterReg.test(name)) { // 输入的是全中文
    if (name.length < 2 || name.length > 32) {
      // '总字符数不能超过32个字符'
      return t('common.nameTip2');
    }
  } else if (allEnReg.test(name)) { // 输入的是全英文
    // 输入姓名包含‘/’的次数
    const n = name.split('/').length - 1;
    if (n === 1) { // 包含'/'的次数等于1
      // 判断输入姓名的长度是否满足
      const lengthJudge = name.length > 29 || name.length < 5;
      // 判断姓的长度是否满足
      const firstNameJudge = name.split('/')[0].length < 2 || name.split('/')[0].length > 14;
      // 判断名的长度是否满足
      const suraneNameJudge = name.split('/')[1].length < 2 || name.split('/')[1].length > 14;
      if (lengthJudge || firstNameJudge || suraneNameJudge) {
        // '英文姓和名长度分别都在2-14之间'
        return t('common.nameTip3');
      }
    } else if (n !== 1) {
      // '英文姓和名必须且只能用一个‘/’隔开'
      return t('common.nameTip4');
    }
  } else {
    // 英文后面不能跟中文，姓名中不能含有数字，不是纯英文不能包含‘/’
    const number = new RegExp('[0-9]');
    // 不能包含特殊字符和空格
    if (name.indexOf('/') !== -1 ||
      (allEnReg.test(name.charAt(0)) && allCharacterReg.test('名字')) ||
      number.test(name) || specialCharReg.test(name)) {
      // '姓名不能包含特殊字符和空格'
      return t('common.nameTip5');
    }
  }
  if (name) {
    rawWords.forEach((index) => {
      if (name.indexOf(index) !== -1) {
        // 若姓名中包含生僻字，第一个字为生僻字，则姓名都用拼音代替；若第二个字为生僻字，则第一个字写汉字，之后都写拼音，以此类推
        return t('common.nameTip6');
      }
    });
  }
  return '';
};
