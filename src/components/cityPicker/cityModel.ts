// 区域
export interface StateModel {
  code: string;
  name?: string;
}

// 国家
export interface CountryModel {
  code: string;
  name?: string;
}

// 位置
export interface CoordinatesModel {
  // 位置纬度
  latitude: number;
  // 位置经度
  longitude: number;
}

// 位置名
export interface LocationNameModel {
  // 位置名称的说明
  description: string;
  language: string;
  // 位置的名称
  name: string;
}

export interface LocationModel {
  // 位置的替代名称列表
  altNames?: LocationNameModel[];
  categories?: string[];
  // 此位置的城市名称。如果该位置是城市或城市的后代，则会出现此选项。
  city?: string;
  // 位置代码，如城市或伦敦
  code: string;
  coordinates?: CoordinatesModel;
  country: CountryModel;
  // 国际航空运输协会机场代码
  iataCode?: string;
  // 此位置的显示名称
  name: string;
  // 为此位置配置的主网关。这是国际航空运输协会的代码
  primaryGateway: string;
  state?: StateModel;
  // 这个位置所在的时区
  timeZone: string;
  // 'CONTINENT' | 'DESTINATION' | 'AIRPORT' | 'PLACE' | 'STATE' | 'COUNTY' | 'COUNTRY' | 'REGION' | 'RESORT' | 'RAIL'
  //     | 'CITY' | 'NEIGHBOURHOOD' | 'DISTRICT' | 'INTEREST' | 'PORT'
  type: string;
}

// 所有城市列表
export interface LocationsModel {
  locations: LocationModel[];
  totalResults: number;
}

// 热门城市
export interface HotCitiesModel {
  // 国内
  domestic?: string[];
  // 国际
  international?: string[];
}

// 按首字母分类的城市model
export interface InitialsCitiesModel {
  title: string;
  key: string;
  items: LocationModel[];
}

export interface AllCityModel {
  domestic: {
    hotCities?: LocationModel[];
    cities: InitialsCitiesModel[];
  };
  international: {
    hotCities?: LocationModel[];
    cities: InitialsCitiesModel[];
  };
}

export interface SelectedCityModel {
  name: string;
  code: string;
  iataCode?: string;
}
