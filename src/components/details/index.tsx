import React, { useState, useEffect } from 'react';
import { AtFloatLayout } from 'taro-ui';
import { View } from '@tarojs/components';

import './index.scss';

interface DetailsProps {
  isDetailsOpen: boolean;
  renderData?: DataItem[];
  setIsDetailsOpen: (x) => void;
}

export interface DataItem {
  // 成人，儿童
  type: string;
  // 货币类型 ￥ $
  currencyCode: string;
  // 货币数量
  amount: number;
  // 人数
  count?: string;
}

const Details = (props: DetailsProps) => {
  const { renderData, isDetailsOpen, setIsDetailsOpen } = props;
  // 控制’明细‘是否展示
  const [isOpen, setIsOpen] = useState(false);
  const data: any = renderData || {};

  useEffect(() => {
    setIsOpen(isDetailsOpen);
  }, [isDetailsOpen]);

  return (
    <View className='details'>
      <View className='details-content'>
        <AtFloatLayout isOpened={isOpen} onClose={() => {
          setIsOpen(false);
          setIsDetailsOpen(false);
        }}>
          <View className='details-container'>
            {data && data.map((item, index) => {
              return (
                <View key={index} className='at-row details-item'>
                  <View className='at-col at-col-9 details-item-left'>
                    {item.type}
                    <View className='at-col at-col-2 details-item-left-right'>
                      {
                        item?.count ? `( x${item?.count} )` : ''
                      }
                    </View>
                  </View>
                  <View className='at-col at-col-3 details-item-center'>
                    <View className='at-row'>
                      <View className='at-col at-col-5 details-item-center-left'>{item.currencyCode}</View>
                      <View className='at-col at-col-7 details-item-center-right'>{item.amount}</View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </AtFloatLayout>
      </View>
    </View>
  );
};

export default Details;
