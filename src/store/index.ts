import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { BaggageParaModel } from '@/pages/ancillary/model/baggageModel';
import { CustomerModel } from '@trp/apis/lib/booking/model/orderDetailModel';
import { AvailabilitiesModel } from '@trp/apis/lib/ancillary/model/availabilitiesModel';
import { ProfileType, profileViewType } from '@/store/model/profileViewType';
import { FlightSearchFormType } from '@/pages/index/model/flightSearchFormType';
import { LocationModel } from '@/components/cityPicker/cityModel';


const useStore = () => {
  const [loginState, setLoginState] = useState<boolean>(false);
  // 登录注入的用户中心数据
  const [userInfo, setUserInfo] = useState<ProfileType>({} as ProfileType);
  const [profileView, setProfileView] = useState<profileViewType>({} as profileViewType);

  // 选择的乘机人
  const [selectPassenger, setSelectPassenger] = useState<CustomerModel[]>([]);

  // 可购买的附加服务
  const [checkAncillary, setCheckAncillary] = useState<AvailabilitiesModel>({});
  // 航班查询条件
  const [flightSearchForm, setFlightSearchForm] = useState<FlightSearchFormType>();

  // 已经选择的免费餐食
  const [selectFreeMeal, setSelectFreeMeal] = useState({});

  // 已经选择的付费餐食
  const [selectPaidMeal, setSelectPaidMeal] = useState({});

  // 已选择的行李
  const [selectedBaggage, setSelectedBaggage] = useState<BaggageParaModel[]>([]);

  // 已选择的保险
  const [selectInsurance, setSelectInsurance] = useState({});
  // 购物车中的乘客信息
  const [customers, setCustomers] = useState<CustomerModel[]>([]);

  // 城市数据
  const [cityData, setCityData] = useState<LocationModel[]>([]);

  const userStore = { loginState, setLoginState, userInfo, setUserInfo, profileView, setProfileView };
  // city
  const baseStore = { cityData, setCityData };

  const passengers = { selectPassenger, setSelectPassenger };
  const freeMeal = { selectFreeMeal, setSelectFreeMeal };
  const paidMeal = { selectPaidMeal, setSelectPaidMeal };
  // 购买行李选择的行李
  const baggageStore = { selectedBaggage, setSelectedBaggage };
  const insurance = { selectInsurance, setSelectInsurance };
  // 乘客
  const customersStore = { customers, setCustomers };
  const checkAncillaryStore = { checkAncillary, setCheckAncillary };

  const searchParams = { flightSearchForm, setFlightSearchForm };


  return {
    baseStore,
    searchParams,
    userStore,
    passengers,
    freeMeal,
    paidMeal,
    baggageStore,
    insurance,
    loginState,
    customersStore,
    checkAncillaryStore
  };
};

const Stores = createContainer(useStore);

export default Stores;
