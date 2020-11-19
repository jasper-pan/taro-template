import React from 'react';
import { LocationModel } from '@/components/cityPicker/cityModel';
import { View } from '@tarojs/components';

interface FilterCityInterface {
  filterCities: LocationModel[];
  onClick: (code: string, name: string, iataCode?: string) => void;
}

const CitySearch = (props: FilterCityInterface) => {
  const { filterCities, onClick } = props;

  /**
   * 选择机场
   * @param code
   * @param name
   * @param iataCode
   */
  const handleCityItemClick = (code: string, name: string, iataCode?: string) => {
    onClick(code, name, iataCode);
  };

  return (
    <View className='filter-cities'>
      {
        filterCities.length > 0 ?
          filterCities.map((filterCity, cityIndex) => {
            return <View
              className='filter-cities-city'
              key={cityIndex}
              onClick={() => {
                handleCityItemClick(filterCity.code, filterCity.name, filterCity.iataCode);
              }}
            >
              <View className='filter-cities-city-airport'>{filterCity.name}</View>
              <View className='filter-cities-city-iata-code'>{filterCity.iataCode}</View>
            </View>;
          }) :
          <View className='filter-cities-no'>无结果</View>
      }
    </View>
  );
};

export default CitySearch;
