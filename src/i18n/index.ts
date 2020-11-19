//i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en';
import zh from './zh';

const resources = {
  'en_US': { translation: en },
  'zh_CN': { translation: zh }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    //引入资源文件
    resources,
    //选择默认语言，选择内容为resources中的key
    lng: 'zh_CN',
    fallbackLng: 'zh_CN',
    debug: false,
    interpolation: {
      // react already safes from xss
      escapeValue: false
    }
  });
export const t = (key, options = { returnObjects: true }) => {
  return i18n.t(key, options);
};
export default i18n;

