import { PenaltyModel } from '@trp/apis/lib/booking/model/orderDetailModel';
import { sortByKey } from '@trp/apis/lib/utils/arrayUtil';
import { t } from '@/i18n';

/**
 * 单个处理退改签规则
 * @param penaltiesData
 */
export const processAmendmentsOrCancellations = (penaltiesData: PenaltyModel[]) => {
  const titles: string[] = [];
  const penaltyArray: number[] = [];
  // 根据时间重新排列退票或改升规则数据
  penaltiesData = sortByKey(penaltiesData, 'offsetAmount');
  for (let i = 0; i < penaltiesData.length; i++) {
    if (penaltiesData.length > 2) { // 存在多个时间段的规则
      if (i === 0) {
        //  离站时间前4小时（不含）之后
        titles.push(t('order.ruleOne'));
        penaltyArray.push(penaltiesData[i + 1].price.percentage || 0);
      } else if (i === penaltiesData.length - 1) {
        // 离站时间前n小时（含）之前
        titles.push(t('order.ruleFour') + penaltiesData[i].offsetAmount + t('order.beforeHour'));
        penaltyArray.push(penaltiesData[i - 1].price.percentage || 0);
      } else if (penaltiesData[i].rangeType === 'AFTER') {
        // 离站时间前n小时（含）至m（不含）小时
        titles.push(t('order.ruleFour') + penaltiesData[i].offsetAmount + t('order.hourTo') +
          penaltiesData[i + 1].offsetAmount + t('order.hour'));
        penaltyArray.push(penaltiesData[i + 2].price.percentage || 0);
      }
    } else { // 只存在4小时前后规则
      penaltyArray.push(penaltiesData[i].price.percentage || 0);
      if (i === 0) {
        // 离站时间前4小时（不含）之前
        titles.push(t('order.ruleTwo'));
      } else {
        // 离站时间前4小时（含）之后
        titles.push(t('order.ruleThree'));
      }
    }
  }
  return { titles, penaltyArray };
};
