import React from 'react';
import { View } from '@tarojs/components';
import cx from 'classnames';
import { t } from '@/i18n';
import { LocationModel, SelectedCityModel } from '../cityModel';
import './index.scss';

interface HotCityInterface {
  id?: string;
  hotCities?: LocationModel[] | null;
  selectedCity: SelectedCityModel;
  onClick: (code: string, name: string, iataCode?: string) => void;
}

const HotCity = (props: HotCityInterface) => {
  const { id, hotCities, selectedCity, onClick } = props;

  /**
   * 选择机场
   * @param city
   */
  const handleCityItemClick = (city: LocationModel) => {
    onClick(city.code, city.name, city.iataCode);
  };

  if (hotCities) {
    return (
      <View className='hot-container' id={id}>
        <View className='c-list-title'>{t('cityPicker.hotCity')}</View>
        <View className='at-row at-row--wrap'>
          {
            hotCities.map((city,index) => {
              return <View key={index}
                           className={cx('city-button', { 'selected': selectedCity.iataCode === city.iataCode })}
                           onClick={() => handleCityItemClick(city)}>{city.city}
              </View>;
            })
          }
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default HotCity;
