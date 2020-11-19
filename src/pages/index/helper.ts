/*
 * @Author: Jasper
 * @Date: 2020-11-18 16:47:33
 * @LastEditors: Jasper
 * @LastEditTime: 2020-11-18 16:47:41
 * @Description: Do not edit
 */
import Apis from '@trp/apis';
import { t } from '@/i18n';
import { cnNameValidator, docIdValidator, mobileValidator } from '@/util/validator';

export interface AcFormMode {
  documentId: string;
  documentType: string;
  name: string;
  mobile: string;
  authCode: string;
}

/**
 * 校验填写的信息
 * @param form
 */
export const acFormValidator = (form: AcFormMode) => {
  if (cnNameValidator(form.name)) {
    return cnNameValidator(form.name);
  } else if (docIdValidator(form.documentId, form.documentType)) {
    return docIdValidator(form.documentId, form.documentType);
  } else if (mobileValidator(form.mobile)) {
    return mobileValidator(form.mobile);
  } else if (form.authCode === '') {
    return t('ac.authCodeEmpty');
  }
  return '';
};

/**
 * 处理全渠道订单查询参数
 * @param form
 */
export const processAcSearchRequest = (form: AcFormMode) => {
  const name = Apis.util.name.splitName(form.name);
  return {
    'documentId': form.documentId,
    'documentType': form.documentType,
    'name': {
      'firstName': name.firstName,
      'surname': name.surName,
      'title': 'MRS'
    }
  };
};

/**
 * 处理全渠道订单导入参数
 * @param result
 */
export const processImportRequset = (result) => {
  return {
    'purchaseRequest': {
      'resultSetId': result.id,
      'reservationId': Apis.util.jsonPath(result.externalFlightBookings, '$..reservationId')
    }
  };
};
