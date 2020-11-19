/**
 * 所有正则规则文件
 */

// 身份证校验
export const identityReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
// 手机号校验(13，14，15，17，18开头,11位)
export const mobileReg = /^1[3,4,5,7,8]{1}[0-9]{9}$/;
// 邮箱检验
export const emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
// 全数字
export const allNumReg = /^\d{1,}$/;
// 1-50个字符,中/英文,数字的组合,不分大小写
export const nameReg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,50}$/;
// 4-10位数字
export const postCodeReg = /^\d{4,10}$/;
// 10位数字
export const tenNumReg = /^[0-9]{10}$/;
// 全中文
export const allCharacterReg = /^[\u4e00-\u9fa5]$/;
// 全英文
export const allEnReg = /^[a-zA-Z]/;
// 特殊字符
export const specialCharReg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
// 生僻字校验词典
export const rawWords = ['屗', '曢', '朑', '毜', '毝', '毮', '烪', '焑', '燞', '癷', '稥', '聁', '艈', '蒊', '虲', '蝊', '袰', '鍂', '鐢', '闧', '霻', '兀',
  '嗀', '﨎', '﨏', '﨑', '﨓', '﨔', '礼', '﨟', '蘒', '﨡', '﨣', '﨤', '﨧', '﨨', '﨩', ''];
// 日期格式(yyyy-mm-dd)
export const dateReg = /^([0-9]{4})-([0-1][0-9])-([0-3][0-9])$/;
// 2-3位数字(区号)
export const areaCodeReg = /0\d{2,3}$/;
// 7-8位数字(固定电话)
export const telephoneReg = /^\d{7,8}$/;
// 4-50位数字或者4-50位数字、字母组合
export const credReg = /^[a-zA-Z0-9]{4,50}$/;
// 1-10位英文
export const surnameReg1 = /^[a-zA-Z]{1,10}$/;
// 1-10位中文
export const surnameReg2 = /^[\u4e00-\u9fa5]{1,10}$/;
// 2-10位中/英文，数字的组合
export const provinceReg = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,20}$/;
// 6位数字
export const pwdReg = /^[0-9]{6}$/;
// 前两位2位中文，后6位数字、字母组合
export const gmjcReg = /^[\u4E00-\u9FA5]{2}[A-Za-z0-9]{6}$/;
// pnr正则，6为数字或字母组合
export const pnrReg = /^[a-zA-Z0-9]{6}$/;
// 包含'/'的正则
export const hasSlashReg = /\//g;
// 军警残凭证格式为“2位汉字”+“1位大写字母”+“6位数字”
export const disableReg = /^[\u4E00-\u9FA5]{2}[A-Z][0-9]{6}$/;
// 用户名：字母开头的6-20位字母数字组合
export const usernameReg = /^[a-zA-Z]{1}[a-zA-Z0-9]{5,19}/;
// 密码：英文大小写，特殊字符，数字
export const passwordReg = /^[a-zA-Z0-9_]+[^a-zA-Z0-9_]+/;
// 邮政编码
export const zipReg = /^[0-9]{6}$/;
