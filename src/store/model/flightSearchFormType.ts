type FlightSearchFormType = {
  routeType: number;
  depCity: string;
  arriveCity: string;
  depCityName: string;
  arriveCityName: string;
  depCityIataCode: string;
  arriveCityIataCode: string;
  passengerCounts: [
    {
      count: number;
      passengerType: 'ADT' | 'CHD' | 'INF' | 'YTH' | 'DISABLED_MILITARY' | 'DISABLED_POLICE';
    }
  ];
  depDate: string;
  isDomestic: boolean;
  // 到达日期
  ariDate?: string;
  cabinClass: 'ECONOMY';
  isUSDest: boolean;
  currencyCode: string;
}
export default FlightSearchFormType;
