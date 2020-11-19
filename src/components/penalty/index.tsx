import React from "react";
import {AtFloatLayout} from "taro-ui";
import {SegmentPenaltyModel} from "@/pages/order/orderDetail/orderDetailModel";
import {View} from "@tarojs/components";
import {t} from "@/i18n";
import './index.scss';

interface PenaltyInterface {
  domesticPenalty?: SegmentPenaltyModel;
  internationalPenalty?: string[];
  isAncillary?: boolean;
  layOutShow: boolean;
  closeLayOut: () => void;
}
const Penalty = (props: PenaltyInterface) => {
  const { domesticPenalty, internationalPenalty, isAncillary, closeLayOut, layOutShow } = props;

  /**
   * 国内航段退改签规则
   */
  const getDomesticPenalty = () => {
    return domesticPenalty?.titles && domesticPenalty?.titles.length
      // 国内有退改规则
      ? <View className='penalty-table at-row'>
        <View className='descriptions at-col-5'>
          <View className='every-description'/>
          {
            domesticPenalty?.titles.map((title: string, titleIndex: number) => {
              return <View className='every-description' key={titleIndex}>{title}</View>;
            })
          }
        </View>
        <View className='cancellations at-col-2'>
          <View className='cancellation-title'>
            <View>{t('order.refundPrice')}</View>
            <View>{t('order.everyTime')}</View>
          </View>
          {
            domesticPenalty?.cancellations.map((cancellation: number, cancellationIndex: number) => {
              return <View className='every-cancellation' key={cancellationIndex}>{cancellation + '%'}</View>;
            })
          }
        </View>
        <View className='amendments at-col-2'>
          <View className='amendment-title'>
            <View>{t('order.changePrice')}</View>
            <View>{t('order.everyTime')}</View>
          </View>
          {
            domesticPenalty?.amendments.map((amendment: number, amendmentIndex: number) => {
              return <View className='every-amendment' key={amendmentIndex}>{amendment + '%'}</View>;
            })
          }
        </View>
        <View className='vol at-col-3'>
          <View className='voluntary-title'>{t('order.voluntarySign')}</View>
          {
            domesticPenalty?.voluntary && <View className='voluntary'>
              <View className='content'>{domesticPenalty?.voluntary}</View>
            </View>
          }
        </View>
      </View>
      // 国内没有退改规则
      : <View className='domestic-no-penalty'>
        <View className='content'>{domesticPenalty?.voluntary}</View>
      </View>;
  };
  /**
   * 附加服务退改签规则
   */
  const getAncillaryPenalty = () => {
    // 附加服务
    return <View className='ancillary-penalty'>
      <View className='ancillary-penalty-title'>{t('ancillary.adRuleA')}</View>
      <View className='ancillary-penalty-detail'>{t('ancillary.adRuleB')}</View>
      <View className='ancillary-penalty-detail'>{t('ancillary.adRuleC')}</View>
      <View className='ancillary-penalty-title'>{t('ancillary.adRuleD')}</View>
      <View className='ancillary-penalty-detail'>{t('ancillary.adRuleE')}</View>
      <View className='ancillary-penalty-title'>{t('ancillary.adRuleF')}</View>
      <View className='ancillary-penalty-detail'>{t('ancillary.adRuleG')}</View>
      <View className='ancillary-penalty-detail'>{t('ancillary.adRuleH')}</View>
    </View>;
  };
  /**
   * 获取退改签规则的内容
   */
  const getPenaltyContent = () => {
    if (isAncillary) {
      // 附加服务
      return getAncillaryPenalty();
    } else if (internationalPenalty) {
      // 国际航班
      return <View className='international-penalty'>
        {
          internationalPenalty?.map((penaltyText: string, penaltyIndex: number) => {
            return <View className='content' key={penaltyIndex}>{penaltyText}</View>;
          })
        }
      </View>;
    } else if (domesticPenalty) {
      // 国内航班
      return getDomesticPenalty();
    }
  };
  return (
    <AtFloatLayout isOpened={layOutShow} onClose={() => {closeLayOut();}} className='penalty-detail'>
      <View className='lay-out-header at-row'>
        <View className='title at-col-6'>{t('order.penalty')}</View>
        <View className='icon-close at-col-6' onClick={() => {closeLayOut();}}/>
      </View>
      {getPenaltyContent()}
    </AtFloatLayout>
  );
};

export default Penalty;
