import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Card from '@/components/card';
import { TripCardDataType, TripCenterType } from '@/pages/flight/flightList/serves';
// @ts-ignore
import logo from '@/assets/img/mu.png';
import './index.scss';

interface TripCardProps {
  tag: string;
  flightCard: TripCardDataType;
}

/**
 * 航班信息简介
 * @param props
 * @constructor
 */
const TripCard = (props: TripCardProps) => {
  const { tag, flightCard } = props;

  /**
   * 航班信息
   * @param flight
   */
  const flightInfoNode = (flight: TripCenterType) => {
    return <View className='at-row line'>
      <View className='flight'>
        {flight.marketing && <View className='row'>
          <Image className='airLogo at-row__justify--center' src={logo}/>
          <Text>{flight.marketing.flight}</Text>
          <Text className='cabin-name'>{flight.cabinName}</Text>
          <Text className='cabin-class'>{flight.cabinClass}</Text>
        </View>}
        {flight.operating && <View className='row'>
          <Image className='airLogo at-row__justify--center' src={logo}/>
          <Text>{flight.operating.flight}</Text>
          <Text style={{ marginLeft: '8px' }}>承运</Text>
        </View>}
        <View className='row'>
          <Text className='flightType'>{flight.flightType}</Text>
          <Text className='icon-checked-baggage additional-icon'/>
          <Text className='icon-hand-baggage additional-icon'/>
          {flight.hasMeal && <Text className='icon-food additional-icon'/>}
          <Text className='icon-integral additional-icon'/>
        </View>
      </View>
    </View>;
  };
  /**
   * 经停
   * @param flight
   */
  const stopNode = (flight: TripCenterType) => {
    return flight.numberOfStops > 0 && <View className='at-row line'>
      <Text className='circle'/>
      <View className='stopOrConnection'>
        <Text>经停</Text>
        {flight.stops.map((stop) => (
          <Text className='cityName' key={stop.name}>{stop.name}</Text>
        ))}
      </View>
    </View>;
  };

  /**
   * 中转
   * @param flight
   */
  const connectionNode = (flight: TripCenterType) => {
    return flight.connection && <View className='at-row line'>
      <View className='circle'/>
      <View className='stopOrConnection'>
        <Text>中转</Text>
        <Text className='cityName'>{flight.connection.duration}</Text>
        <Text className='cityName'>{flight.connection.name}</Text>
      </View>
    </View>;
  };

  return (<Card className='trip-card'>
    <View className='at-row'>
      <Text className='tag'>{tag}</Text>
      <View className='at-col'>
        <Text className='date'>{flightCard.departureDate}</Text>
        <Text className='date'>{flightCard.departureDay}</Text>
      </View>
    </View>
    <View className='at-row airport at-row__align--center'>
      <Text className='time'>{flightCard.departureTime}</Text>
      <Text className='point'/>
      <Text className='name'>{flightCard.departureAir}</Text>
    </View>
    <View className='at-row at-row__align--center trip-card-center'>
      <Text className='duration'>{flightCard.duration}</Text>
      <View>
        {flightCard.tripCenter && flightCard.tripCenter.map((flight) => {
          return (
            <React.Fragment key={flight.id}>
              {flightInfoNode(flight)}
              {stopNode(flight)}
              {connectionNode(flight)}
            </React.Fragment>
          );
        })}
      </View>
    </View>
    <View className='at-row airport at-row__align--center'>
      <Text className='time'>{flightCard.arrivalTime}</Text>
      <Text className='point'/>
      <Text className='name'>{flightCard.arrivalAir}</Text>
    </View>
  </Card>);
};

export default TripCard;
