import memoize from 'lodash/memoize';
import Apis from '@trp/apis';
import {
  AllCityModel,
  HotCitiesModel,
  InitialsCitiesModel,
  LocationModel,
  LocationNameModel,
  SelectedCityModel
} from '../cityModel';

/**
 * 将城市按中文名的首字母分类
 * @param cities
 */
export const sortCitiesByInitials = (cities: LocationModel[]) => {
  const citiesMap = new Map<string, LocationModel[]>();
  cities.forEach((city) => {
    if (city.altNames) {
      const char = city.altNames[0].name.substr(0, 1).toLocaleUpperCase();
      if (citiesMap.has(char)) {
        (citiesMap.get(char) ?? []).push(city);
      } else {
        citiesMap.set(char, [city]);
      }
    }
  });

  const cityList: InitialsCitiesModel[] = [];
  citiesMap.forEach((value, key) => {
    cityList.push({ title: key, key: key, items: value });
  });
  cityList.sort((a, b) => (a.key.localeCompare(b.key)));
  return cityList;
};
/**
 * 处理城市列表数据
 * @param cityData
 * @param hotCities
 */
export const processCities = memoize((cityData: LocationModel[], hotCities?: HotCitiesModel) => {
  const allCity: AllCityModel = {
    international: {
      hotCities: [],
      cities: []
    },
    domestic: {
      hotCities: [],
      cities: []
    }
  };
  // 国内热门城市
  const domesticHotCities: LocationModel[] = [];
  // 国际热门城市
  const internationalHotCities: LocationModel[] = [];
  // 国内城市
  const domesticCities: LocationModel[] = [];
  // 国际城市
  const internationalCities: LocationModel[] = [];
  cityData?.forEach((city) => {
    if (city.type === 'AIRPORT') {
      if (city.country.code === 'CN') {
        domesticCities.push(city);
        if (city.iataCode && (hotCities?.domestic ?? []).includes(city.iataCode)) {
          domesticHotCities.push(city);
        }
      } else {
        internationalCities.push(city);
        if (city.iataCode && (hotCities?.international ?? []).includes(city.iataCode)) {
          internationalHotCities.push(city);
        }
      }
    }
  });
  // 热门城市
  allCity.domestic.hotCities = domesticHotCities;
  allCity.international.hotCities = internationalHotCities;
  // 国内、国际
  allCity.domestic.cities = sortCitiesByInitials(domesticCities);
  allCity.international.cities = sortCitiesByInitials(internationalCities);
  return allCity;
});

/**
 * 根据查询条件查询机场
 * @param value
 * @param cityData
 * @param type
 */
export const searchCities = (value: string, cityData: LocationModel[], type: string) => {
  // 将输入的字母转为小写，为了不区分大小写
  const lowValue = value.toLowerCase();
  // 军警残的需要排除港澳台
  const locations = type !== 'disabled' ? cityData : Apis.util.jsonPath(cityData, '$..[?(@.country.code == \'CN\')]', true);
  return locations.filter((location: LocationModel) => {
    const valueLocation = location.altNames?.filter((altName: LocationNameModel) => {
      return altName.name.toLowerCase().includes(lowValue);
    });
    // 机场名、机场三字码、城市名的中文或全拼包含查询条件就返回
    return (valueLocation && valueLocation.length > 0) || location.name.toLowerCase().includes(lowValue) ||
      location.iataCode?.toLowerCase().includes(lowValue) || location.city?.toLowerCase().includes(lowValue);
  });
};

/**
 * 根据经纬度匹配附件机场信息
 * @param longitude 经度，范围为 -180~180，负数表示西经
 * @param latitude 纬度，范围为 -90~90，负数表示南纬
 * @param city
 */
// todo:根据定位获取最近机场
export const findCityByLocation = (longitude: number, latitude: number, city: InitialsCitiesModel[] = []): SelectedCityModel | null => {
  if (city.length === 0) {
    return null;
  }
  return null;
};
