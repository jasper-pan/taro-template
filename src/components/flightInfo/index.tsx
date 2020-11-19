import React, { useState } from 'react';
import { Text, View } from '@tarojs/components';
import { AtIcon, AtFloatLayout } from 'taro-ui';
import { t } from '@/i18n';
import TripCard from '@/components/tripCard';
import {TripInfoInterface} from '@/pages/booking/services/getFlightInfo';
import './index.scss';

interface TripInfoProps {
  flightInfo: TripInfoInterface;
}
const TripInfo = (props: TripInfoProps) => {
  const { flightInfo } = props;
  const [segmentDetailShow, setSegmentDetailShow] = useState(false);
  return <View className='flight-info'>
    <View className='title'>
      <View className='segment-info'>
        <Text className='direction'>{ flightInfo.title.direction }</Text>
        <Text className='segment'>
          { flightInfo.title.date.departure + (flightInfo.title.direction !== '单程' ? (' - ' + flightInfo.title.date.arrival) : '') }
        </Text>
        {flightInfo.title.direction === '单程' && <Text className='departure-week'>{flightInfo.title.departureWeek}</Text>}
        <Text className='get-detail-more' onClick={() => {setSegmentDetailShow(true);}}>
           {t('order.detail')}
          <AtIcon value='chevron-right'/>
        </Text>
      </View>
      <View className='segment-cabin'>
        {
          flightInfo.title.cabins && flightInfo.title.cabins.map((cabin: any, cabinIndex) => {
            return <Text key={cabinIndex} className='segment'>
              <Text className='type'>
                {flightInfo.title.direction !== '单程' ? cabin.segmentType : (flightInfo.title.time?.departure + ' - ' + flightInfo.title.time?.arrival)}
              </Text>
              <Text className='cabin'>{cabin.name}</Text>
            </Text>;
          })
        }
      </View>
    </View>
    <AtFloatLayout
      className='segments-info'
      isOpened={segmentDetailShow}
      onClose={() => {setSegmentDetailShow(false);}}
    >
      {
        flightInfo.segments.map((segment: any, segmentIndex: number) => {
          return <TripCard flightCard={segment} tag={segment.type} key={segmentIndex}/>;
        })
      }
    </AtFloatLayout>
  </View>;
};

export default TripInfo;

