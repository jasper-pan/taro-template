import React, { useState, useEffect, useCallback } from 'react';
import Taro from '@tarojs/taro';
import { AtFloatLayout, AtInput } from 'taro-ui';
import cx from 'classnames';
import { t } from '@/i18n';
import Apis from '@trp/apis';
import { hotCities } from '@/assets/js/config';
import { Label, View } from '@tarojs/components';
import Store from '@/store';
import { processCities, searchCities, findCityByLocation } from './services';
import { AllCityModel, LocationModel, SelectedCityModel, InitialsCitiesModel } from './cityModel';
import HotCity from './hotCity';
import CityIndexes from './cityIndexes';
import CitySearch from './citySearch';
import './index.scss';

interface CityPickerInterface {
  type?: 'normal' | 'subnormal';
  onChange: (location: { cityCode: string; name: string; iataCode?: string }) => void;
  value?: string;
  placeHolder?: string;
}

const tabList = [{ title: t('common.domestic') }, { title: t('common.international') }];

const CityPicker = (props: CityPickerInterface) => {
  const { type = 'normal', placeHolder, value, onChange } = props;
  const { baseStore } = Store.useContainer();

  const [selectedCity, setSelectedCity] = useState<SelectedCityModel>({ name: '', code: '', iataCode: '' });
  // 渲染的城市数据
  const [renderCityData, setRenderCityData] = useState<AllCityModel | null>(null);
  const [layOutShow, setLayOutShow] = useState(false);
  const [filterCities, setFilterCities] = useState<LocationModel[]>([]);
  const [filterValue, setFilterValue] = useState('');

  // tab index
  const [tabIndex, setTabIndex] = useState<number>(0);
  // 定位显示的文案
  const [locationTxt, setLocationTxt] = useState<string>('点击获取位置');
  // 定位信息
  const [showLocation, setShowLocation] = useState<SelectedCityModel | null>(null);
  // 展示的数据信息
  const [showList, setShowList] = useState<{ city: InitialsCitiesModel[]; hot: LocationModel[] } | null>(null);
  // 是否展示城市列表，用于关闭后让Dom一直存在
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (baseStore.cityData) {
      setRenderCityData(processCities(baseStore.cityData, hotCities));
    }
  }, [baseStore.cityData]);

  /**
   * 根据查询添加过滤城市
   * @param param
   */
  const handleFilterCity = useCallback((param: string) => {
    if (baseStore.cityData) {
      setFilterCities(searchCities(param, baseStore.cityData, type));
    }
  }, [baseStore.cityData, type]);

  /**
   * 选择城市
   * @param code
   * @param name
   * @param iataCode
   */
  const handleSelectCity = useCallback((code: string, name: string, iataCode?: string) => {
    setSelectedCity({ name: name, code: code, iataCode: iataCode });
    setLayOutShow(false);
    setFilterValue('');
    onChange && onChange({ cityCode: code, name: name, iataCode: iataCode });
  }, [onChange]);

  /**
   * 查询条件改变的时候动态过滤
   */
  useEffect(() => {
    filterValue ? handleFilterCity(filterValue) : setFilterCities([]);
  }, [filterValue, handleFilterCity]);

  /**
   * 根据外部传入的机场三字码获取机场、城市信息
   */
  useEffect(() => {
    if (value) {
      const valueCity: LocationModel = baseStore.cityData && Apis.util.jsonPath(baseStore.cityData, '$..[?(@.iataCode == \'' + value.toUpperCase() + '\')]');
      valueCity && setSelectedCity({ name: valueCity.name, code: valueCity.code, iataCode: valueCity.iataCode });
    }
  }, [baseStore.cityData, value]);

  const floatLayoutClose = () => {
    setLayOutShow(false);
    setFilterValue('');
  };

  useEffect(() => {
    const key = tabIndex == 1 ? 'international' : 'domestic';
    if (renderCityData) {
      setShowList({ city: renderCityData[key].cities, hot: renderCityData[key]?.hotCities ?? [] });
    }
  }, [renderCityData, tabIndex]);

  useEffect(() => {
    if (layOutShow) {
      setIsShow(true);
    }
  }, [layOutShow]);
  /**
   * 查询条件变更
   * @param key
   */
  const inputKeyChange = (key: string) => {
    setFilterValue(key);
  };

  /**
   * 国内国际切换
   * @param index
   */
  const tabClick = (index) => {
    setTabIndex(index);
  };

  /**
   * 定位
   */
  const getLocation = () => {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      // H5
      if (navigator.geolocation) {
        setLocationTxt('获取定位中');
        navigator.geolocation.getCurrentPosition((position) => {
          setShowLocation(findCityByLocation(position.coords.longitude, position.coords.latitude, showList?.city));
          setLocationTxt('获取成功');
        }, () => {
          setLocationTxt('获取位置信息失败');
        });
      }
    } else {
      setLocationTxt('获取定位中');
      // 小程序 及微信公众号
      Taro.getLocation({}).then(res => {
        setShowLocation(findCityByLocation(res.longitude, res.latitude, showList?.city));
        setLocationTxt('获取成功');
      }).catch(() => {
        setLocationTxt('获取位置信息失败');
      });
    }
  };

  /**
   * 国内外切换 TabNode
   */
  const tabNode = useCallback(() => {
    if (type === 'normal') {
      return <View className='c-tab-List'>
        {tabList.map((tab, index) => (
          <View key={index} className={cx('c-tab-List-item', { 'c-tab-List-item-on': tabIndex === index })}
                onClick={() => tabClick(index)}>{tab.title}</View>))}
      </View>;
    } else {
      return null;
    }
  }, [tabIndex, type]);

  return (<View className='city-picker'>
    <View className='selected-city' onClick={() => {
      setLayOutShow(true);
    }}>
      {!selectedCity.name && <Label className='place-holder'>{placeHolder}</Label>}
      <View className='airport'>{selectedCity.name}</View>
    </View>
    <AtFloatLayout scrollY={false} isOpened={layOutShow} onClose={floatLayoutClose}>
      <View className='cityList-wrap'>
        <View>
          <View className='cityList-wrap-header'>
            <View className='cityList-wrap-header_text'>
              {t('common.please') + t('common.select') + t('common.city')}
            </View>
            <View className='cityList-wrap-header_close icon-close' onClick={floatLayoutClose}/>
          </View>
          <View className='at-row at-row__align--center city-filter'>
            <View className='icon-search'/>
            <AtInput name='filterCity' clear value={filterValue} placeholder={t('cityPicker.cityFilter')}
                     onChange={inputKeyChange}/>
          </View>
          {
            filterValue && <CitySearch filterCities={filterCities} onClick={handleSelectCity}/>
          }
          {tabNode()}
        </View>
        {(showList && isShow) &&
        <CityIndexes cities={showList.city} selectedCity={selectedCity} onClick={handleSelectCity} filterValue={filterValue}>
          <React.Fragment>
            <View>
              <View id='定位' className='c-list-title'>定位</View>
              <View>
                {
                  showLocation ?
                    <View className='city-button'
                          onClick={() => setSelectedCity(showLocation)}>{showLocation.name}</View> :
                    <View className='location-txt' onClick={getLocation}>{locationTxt}</View>
                }
              </View>
            </View>
            <HotCity id='热门' hotCities={showList.hot} selectedCity={selectedCity} onClick={handleSelectCity}/>
          </React.Fragment>
        </CityIndexes>}
      </View>
    </AtFloatLayout>
  </View>);
};

export default CityPicker;
