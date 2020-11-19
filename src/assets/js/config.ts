/**
 * token key
 */
export const TOKEN_NAME = 'om-token';

/**
 * cities
 */
export const CITIES_KEY = 'CITIES-DATA';

/**
 * 白名单路径，无需登录
 */
export const WHITE_LIST = [
  '/pages/index/index',
  '/pages/index/specialTypeBooking/index',
  '/pages/index/multiDestination/index',
  '/pages/login/index',
  '/pages/login/retrievePasswordForm',
  '/pages/signup/index',
  '/pages/flight/index',
  '/pages/flight/sevenCalendar/index'
];

/**
 * 登录路由还原黑名单
 */

export const BLACK_LIST = [
  'pages/booking/index',
  'pages/booking/selectPassenger/index',
  'pages/booking/addPassenger/index',
  'pages/ancillary/index',
  'pages/ancillary/insurance/index',
  'pages/ancillary/baggage/index',
  'pages/ancillary/meal/index',
  'pages/ancillary/selectSegment/index',
  'pages/ancillary/seat/index',
  'pages/pay/index'
];


/**
 * 用户信息查询条件
 */
export const PROFILE_VIEW_SEARCH_OPTIONS = {
  'isIncludeAccountsInfo': 'Y',
  'isIncludeAddress': 'N',
  'isIncludeAdvancedTag': 'N',
  'isIncludeBaseTag': 'N',
  'isIncludeBeneficiary': 'N',
  'isIncludeContact': 'N',
  'isIncludeMemRights': 'N',
  'isIncludeMemberCertificates': 'N',
  'isIncludeMemberInfo': 'Y',
  'isIncludeMemberLevel': 'N',
  'isIncludeMileage': 'N',
  'isIncludeOrderInfo': 'Y',
  'isIncludeRelationPassenger': 'Y'
};

/**
 * 城市信息查询条件
 */
export const LOCATION_PARAMS = {
  params: {
    searchableOnly: false,
    locationType: 'AIRPORT'
  }
};

/**
 * 首页跳转链接
 */
export const INDEX_SKIP_URL = {
  'APP': '/pages/index/index',
  'specialTicketPurchase': '/pages/index/specialTypeBooking/index',
  'moreServices': '/pages/index/index'
};

/**
 * 热门城市
 */
export const hotCities = {
  domestic: ['PEK', 'HAK', 'SZX', 'DLC', 'XMN', 'FOC', 'CAN', 'KWE', 'KWL', 'HRB'],
  international: ['ALA', 'BKK', 'BRU', 'BUD', 'ORD', 'SVO', 'IKT', 'CDG', 'LED', 'GMP']
};

/**
 * 是否展示区县
 */
export const SHOW_COUNTY = false;
