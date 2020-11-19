import dayjs from 'dayjs';
import { t } from '@/i18n';

/**
 * 时间格式化
 * @param date 时间日期
 * @param format 格式
 */
export const formatDate = (date: Date | string, format: string) => (dayjs(date).format(format));

/**
 * 时间格式化 国际化
 * @param date
 * @param format
 */
export const formatDateI18n = (date: Date | string, format: string): string => {
  const result = formatDate(date, format);
  switch (format) {
    // 周几
    case 'd': {
      return t('common.weekdaysShort')[result];
    }
    // 月
    case 'M': {
      return t('common.monthsShort')[result];
    }
    // 几月几日
    case 'MMDD': {
      return formatDateI18n(date, 'M') + formatDateI18n(date, 'DD') + t('common.date.day');
    }
    // 年月日
    case 'YYYY-MM-DD': {
      return t('common.monthsShort')[result];
    }
    default: {
      return result;
    }
  }
};

/**
 * 将飞行时长格式化
 * @param str HH：mm
 */
export const formatToHHmm = (str: string) => {
  if (str) {
    return str.replace(':', t('common.time.hour')) + t('common.time.minute');
  } else {
    return '';
  }
};

/**
 * 将分钟数格式化为时分
 * @param minute 分钟数
 */
export const mToStr = (minute: number) => {
  const hour = Math.floor(minute / 60);
  minute -= hour * 60;
  return (hour ? hour + t('common.date.hour') : '') + (minute ? minute + t('common.date.minute') : '');
};

/**
 * 获取月日
 * @param date
 */
export const getMonthAndDay = (date: Date | string) => {
  return formatDate(date, 'MM') + t('common.date.month') + formatDate(date, 'DD') + t('common.date.day');
};
/**
 * 格式化航班时长
 * @param duration
 */
export const getDuration = (duration: string) => {
  return duration.replace(':', 'h') + 'm';
};
/**
 * 获取两个时间的时间差
 * @param begin 开始时间
 * @param end 结束时间
 */
export const diffDay = (begin: string, end: string) => {
  return dayjs(begin).diff(dayjs(end), 'day');
};
