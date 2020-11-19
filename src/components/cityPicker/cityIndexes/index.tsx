import React, { useState, useLayoutEffect } from 'react';
import Taro, { SelectorQuery } from '@tarojs/taro';
import { ScrollView, View } from '@tarojs/components';
import { AtToast } from 'taro-ui';
import cx from 'classnames';
import { InitialsCitiesModel, SelectedCityModel } from '../cityModel';
import './index.scss';

interface CityIndexesInterface {
  cities: InitialsCitiesModel[];
  selectedCity?: SelectedCityModel;
  onClick: (code: string, name: string, iataCode?: string) => void;
  children?: React.ReactChild;
  filterValue?: string;
}

type MenRectType = {
  menuHeight: number;
  startTop: number;
  itemHeight: number;
}

/**
 * 城市列表展示选择
 * @param props
 * @constructor
 */
const CityIndexes = (props: CityIndexesInterface) => {
  const { cities, selectedCity, onClick, children, filterValue } = props;

  // 索引信息
  const [menRect, setMenRect] = useState<MenRectType | null>(null);
  // 当前被选中索引
  const [currentKey, setCurrentKey] = useState(null);
  // 控制点击后提示
  const [isOpened, setIsOpened] = useState(false);
  // 右侧快捷菜单点击后提示内容
  const [toastTxt, setToastTxt] = useState('');

  useLayoutEffect(() => {
    if (cities.length === 0) {
      return;
    }
    const selector: SelectorQuery = Taro.createSelectorQuery();
    selector.select('.city-indexes_menu').boundingClientRect().exec(rect => {
      const len = cities.length;
      const menuHeight = rect[0].height;
      const startTop = rect[0].top;
      const itemHeight = Math.floor(menuHeight / (len + 2));
      setMenRect({ menuHeight, startTop, itemHeight });
    });
  }, [cities.length]);

  const handleTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!menRect) {
      return;
    }
    const key = e.touches[0].target.innerHTML;
    if (key && key !== currentKey) {
      handleChangeIndex(key);
    }
    // setToastTxt(e.touches[0].target.innerHTML);
    // setIsOpened(true);
  };

  const handleTouchEnd = () => {
    setCurrentKey(null);
  };
  /**
   * 根据索引跳转到指定位置
   * @param key
   */
  const handleChangeIndex = (key) => {
    setCurrentKey(key);
    setToastTxt(key);
    setIsOpened(true);
    document.getElementById(key)?.scrollIntoView();
  };

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

    <ScrollView scrollY className='city-indexes'>
      <View className='city-indexes_body'>
        {children}
        {
          cities.map((city, cityIndex) => {
            return <View className='city-indexes_list' key={cityIndex}>
              <View className='c-list-title' id={city.title}>{city.title}</View>
              <View className='city-list'>
                {
                  city.items.map((item, index) => {
                    return <View
                      className={cx('city-list_item', { 'city-list_item-selected': item.iataCode === selectedCity?.iataCode })}
                      key={index}
                      onClick={() => {
                        handleCityItemClick(item.code, item.name, item.iataCode);
                      }}>
                      <View className='city-list_item-content'>{item.name}</View>
                      <View className='city-list_item-describe'>{item.iataCode}</View>
                    </View>;
                  })
                }
              </View>
            </View>;
          })
        }
      </View>
      <View className={cx('city-indexes_menu', { 'city-indexes_menu-hide': filterValue })} onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
        {
          ['定位', '热门'].map(key => {
            return <View className='city-indexes_menu-item' key={key}
                         onClick={() => handleChangeIndex(key)}>{key}</View>;
          })
        }
        {
          cities.map(city => {
            return <View className='city-indexes_menu-item' key={city.key}
                         onClick={() => handleChangeIndex(city.key)}>{city.key}</View>;
          })
        }
      </View>
      <AtToast isOpened={isOpened} text={toastTxt} duration={1000}/>
    </ScrollView>
  );
};

export default CityIndexes;
