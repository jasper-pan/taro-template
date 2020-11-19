export const ac = {
  docTitle: '凭证号类型',
  // 凭证类型
  documentType: [
    { label: '身份证', value: 'PRC_IDENTITY_CARD' },
    { label: '护照', value: 'PASSPORT' },
    { label: '票号', value: 'FLIGHT_TICKET' },
    { label: '台胞证', value: 'RESIDENCE_PERMIT_HK_MO_TW' }
  ],
  name: '订票人姓名',
  documentId: '凭证号码',
  authCode: '验证码',
  mobile: '手机号码',
  namePlaceholder: '请输入姓名',
  authCodeEmpty: '请输入正确的验证码',
  docIdPlaceholder: '请输入号码',
  mobilePlaceholder: '请输入手机号',
  authCodePlaceholder: '请输入验证码',
  sendSuccess: '短信验证码发送成功',
  documentTypeTip: '请选择凭证类型'
};
