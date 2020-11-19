import React, { useState, useEffect, useReducer } from 'react';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { AtInput, AtButton, AtIcon, AtCountdown, AtRadio, AtFloatLayout } from 'taro-ui';
import Loading from '@/components/loading';
import { View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import Apis from '@/apis';
import { Http } from '@trp/apis'
import { t } from '@/i18n';
import { setUrlParams } from '@/util/blend';
import { setMfaHeader } from '@/util/mfaMeta';
import { reducer } from '@/util/reducer';
import { mobileValidator } from '@/util/validator';
import HeaderBar from '@/components/headerBar';
import Captcha from '@/components/captcha';
import { CaptchaModel } from '@/components/captcha/captchaModel';
import { acFormValidator, processImportRequset, processAcSearchRequest, AcFormMode } from './helper';

import './index.scss';

const documentTypeRange: any = t('ac.documentType');

const initAcForm: AcFormMode = {
  documentId: '',
  documentType: 'PRC_IDENTITY_CARD',
  name: '',
  mobile: '',
  authCode: ''
};

const AcBooking = () => {
  // 路由传过来的参数
  const router = useRouter();
  // type判断是从哪个入口过来的 值机/行李/餐食
  const type = router.params?.type;
  console.log('type', type);
  const [loading, setLoading] = useState(false);
  // 凭证类型
  const [docType, setDocType] = useState<{ label: string; value: string }>(documentTypeRange[0]);
  // 图片验证码弹框显示
  const [captchaOpen, setCaptchaOpen] = useState(false);
  // 图片验证码数据
  const [captchaData, setCaptchaData] = useState<CaptchaModel>();
  // 图片验证码id
  const [captchaId, setCaptchaId] = useState<string>('');
  // 倒计时是否显示
  const [coutDownShow, setCoutDownShow] = useState<boolean>(false);
  // mobileId
  const [mfaMobileId, setMfaMobileId] = useState<string>('');
  // 信息表单
  const [acForm, setAcForm] = useReducer(reducer, initAcForm);
  const [layoutOpen, setLayoutOpen] = useState(false);

  const btnStyle = cx('btn', !coutDownShow && 'show');

  // 点击发送验证码
  const sendVerificationCode = () => {
    // 获取验证码之前，先填手机号
    console.log(11111)
    const errorMsg = mobileValidator(acForm.mobile);
    if (errorMsg) {
      Taro.showToast({ icon: 'none', duration: 4000, title: errorMsg });
    } else {
      console.log(captchaId)
      
      if (!captchaId) {
        // 弹框选择图片验证码
        setCaptchaOpen(true);
      }
    }
  };

  const createCaptcha = async () => {
    const data = await Http.uc.profile.createCaptcha({ 'authenticationType': 'GENERAL_REGISTER' });
    setLoading(false);
    setCaptchaData(data);
  };

  useEffect(() => {
    createCaptcha();
  }, []);

  useEffect(() => {
    console.log('type', type);
  }, [type]);

  // 刷新图片验证码
  const refreshCaptcha = () => {
    createCaptcha();
  };

  // 确认选择图片验证码之后，获取短信验证码
  const getCaptchaId = (capId: string, imgIds: string[]) => {
    setCaptchaId(capId);
    if (capId && !isEmpty(imgIds)) {
      setMfaHeader('captcha', { id: capId, answers: imgIds });
      // 显示倒计时
      setCoutDownShow(true);
      const params = { 'mobile': acForm.mobile, 'authenticationType': 'EXTERNAL_BOOKING_SEARCH' };
      setLoading(true);
      Apis.Http.mfa._sendMobileAuthenticationCode(params).then(data => {
        setMfaMobileId(data.mfaMobileId);
        Taro.showToast({ icon: 'none', duration: 4000, title: t('ac.sendSuccess') }).then(() => {
          setLoading(false);
        });
      }).catch(e => {
        // 获取验证码失败
        setCoutDownShow(false);
        setCaptchaId('');
        setLoading(false);
        Taro.showToast({ icon: 'none', duration: 4000, title: e?.response?.data?.apiErrors[0]?.userMessage });
      });
    }
  };

  // 下一步，全渠道订单查询
  const externalBookingSearch = () => {
    // 校验信息是否填写正确
    const formErrorMsg = acFormValidator(acForm);
    if (formErrorMsg) {
      Taro.showToast({ icon: 'none', duration: 4000, title: formErrorMsg });
    } else {
      // 获取mobileId 和 authCode
      setMfaHeader('sms', { mobileId: mfaMobileId, authCode: acForm.authCode });
      const params = processAcSearchRequest(acForm);
      setLoading(true);
      Apis.Http.external._retrieveExternalFlightBookings(params).then(res => {
        const importRequset = processImportRequset(res);
        Apis.Http.external._createBookingWithExternalFlightBooking(importRequset).then(result => {
          // 路由跳转到选择航段页面
          const urlParam = setUrlParams({
            flightProductId: Apis.util.jsonPath(res.externalFlightBookings, '$..productId'),
            bookingId: result.bookingId,
            ancillaryType: 'AC'
          });
          setLoading(false);
          Taro.navigateTo({
            url: `/pages/ancillary/index?params=${urlParam}`,
          });
        }).catch(e => {
          Taro.showToast({ icon: 'none', duration: 4000, title: e?.response?.data?.apiErrors[0]?.userMessage }).then(() => {
            setLoading(false);
          });
        });
      }).catch(e => {
        Taro.showToast({ icon: 'none', duration: 4000, title: e?.response?.data?.apiErrors[0]?.userMessage }).then(() => {
          setLoading(false);
        });
      });
    }
  };

  const goBack = () => {
    Taro.redirectTo({
      url: '/pages/index/index'
    });
  };
  const documentTypeChange = (value: string) => {
    setDocType({ label: Apis.util.jsonPath(documentTypeRange, `$..[?(@.value=='${value}')].label`), value: value });
    setAcForm({ type: 'documentType', value: value });
    setLayoutOpen(false);
  };
  return (
    <View className='ac-booking'>
      <Loading isOpened={loading} />
      {/* <HeaderBar isShowHeaderBar onClickBack={goBack} content={t('index')[type]} /> */}
      {
        !loading && <React.Fragment>
          <View className='ac-form'>
            <AtInput name='name' title={t('ac.name')} type='text' placeholder={t('ac.namePlaceholder')} value={acForm.name}
              onChange={(value) => { setAcForm({ type: 'name', value: value }); }}
            />
            <View className='picker at-row' onClick={() => { setLayoutOpen(true); }}>
              <View className='label at-col at-col-3'>{t('ac.docTitle')}</View>
              <View className='value at-col at-col-8'>{docType.label}</View>
              <View className='icon at-col at-col-1'>
                <AtIcon value='chevron-right' />
              </View>
            </View>
            <AtFloatLayout className='customize-float-layout' isOpened={layoutOpen} title={t('ac.documentTypeTip')} onClose={() => { setLayoutOpen(false); }}>
              <View>
                <AtRadio options={documentTypeRange} value={docType.value} onClick={(value) => {
                  documentTypeChange(value);
                }}
                />
              </View>
            </AtFloatLayout>
            <AtInput name='name' title={t('ac.documentId')} type='text' placeholder={t('ac.docIdPlaceholder')} value={acForm.documentId}
              onChange={(value) => { setAcForm({ type: 'documentId', value: value }); }}
            />
            <AtInput name='phone' title={t('ac.mobile')} type='text' placeholder={t('ac.mobilePlaceholder')} value={acForm.mobile}
              onChange={(value) => { setAcForm({ type: 'mobile', value: value }); }} />
            <View className='phone-code'>
              <AtInput name='phone' title={t('ac.authCode')} type='text' placeholder={t('ac.authCodePlaceholder')} value={acForm.authCode}
                onChange={(value) => { setAcForm({ type: 'authCode', value: value }); }} />
              <View className={btnStyle} onClick={sendVerificationCode}>
                {t('common.sendCode')}
              </View>
              {
                coutDownShow && <AtCountdown
                  isShowDay={false}
                  isShowHour={false}
                  format={{ hours: ':', minutes: ':', seconds: '' }}
                  seconds={30}
                  onTimeUp={() => {
                    setCoutDownShow(false);
                    setCaptchaId('');
                  }}
                />
              }
            </View>
          </View>
          <View className='submit-bg'>
            <AtButton className='nextStep' onClick={externalBookingSearch}>{t('common.nextStep')}</AtButton>
          </View>
        </React.Fragment>
      }
      {
        captchaData &&
        <Captcha
          data={captchaData}
          defaultOpen={captchaOpen}
          setCaptchaOpen={setCaptchaOpen}
          getCaptchaId={getCaptchaId}
          refreshCaptcha={refreshCaptcha}
        />
      }
   
    </View>
  );
};

export default AcBooking;
