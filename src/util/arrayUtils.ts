import isEmpty from 'lodash/isEmpty';

/**
 * 获取数组中的元素重复的个数
 * @param list 数组  [a,b,b,c]
 * @return object 对象
 */
export const getRepeatNum = (list: string[]) => {
  return list.reduce(function (prev: { [x: string]: number }, next: string | number) {
    prev[next] = (prev[next] + 1) || 1;
    return prev;
  }, {});
};
// 清空表单中value值为空的key
export const clearEmptyValue = (obj: any) => {
  Object.keys(obj).map(key => {
    if (obj[key] === null || obj[key] === '' || !obj[key] || isEmpty(obj[key])) {
      delete obj[key];
    }
  });
  return obj;
};

/**
 * 数组价格之和
 * @param arr
 */
export const priceArr = (arr: []) => {
  let sum = 0;
  arr.forEach((item: string) => {
    sum += (parseInt(String((parseFloat(item) * 100))) / 100);
  });
  return sum;
};
