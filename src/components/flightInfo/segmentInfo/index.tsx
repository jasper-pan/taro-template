import React from 'react';
import { Text, View } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import { t } from '@/i18n';
import './index.scss';

interface SegmentInfoInterface {
  segmentInfo?: any;
}
const SegmentInfo = (props: SegmentInfoInterface) => {
  const { segmentInfo } = props;
  return <View className='segment-info'>
    <View className='title'>
      <Text className='type'>{segmentInfo.type}</Text>
      <Text className='departure-date'>{segmentInfo.departureDate}</Text>
      <Text className='week'>{segmentInfo.week}</Text>
    </View>
    <View className='details'>
      <View className='departure'>
        <Text className='time'>{segmentInfo.departureTime}</Text>
        <Text className='airport'>{segmentInfo.departureAirport}</Text>
      </View>
      <View className='detail'>
        <View className='duration'>{segmentInfo.duration}</View>
        <View className='info'>
          <View className='marketing'>
            <AtIcon value='image'/>
            <Text className='flight-number'>{segmentInfo.marketing}</Text>
            <Text className='cabin-name'>{segmentInfo.cabinName}</Text>
            <Text className='cabin-class'>{segmentInfo.cabinClass}</Text>
          </View>
          <View className='equipment'>
            <Text>{t('common.equipmentType') + segmentInfo.equipmentType}</Text>
          </View>
        </View>
      </View>
      {
        segmentInfo.stops && <View className='stops'>
          {
            segmentInfo.stops.map((stopCity: any, stopIndex: number) => {
              return <Text className='city' key={stopIndex}>{stopCity.city}</Text>
            })
          }
        </View>
      }
      <View className='arrival'>
        <Text className='time'>{segmentInfo.arrivalTime}</Text>
        <Text className='airport'>{segmentInfo.arrivalAirport}</Text>
      </View>
    </View>
  </View>;
};

export default SegmentInfo;
