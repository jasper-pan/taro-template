export type profileViewType = {
  accountsInfo: AccountsInfoType;
  beneficiaryInfos: [BeneficiaryInfoType];
  flightPassengerInfo: FlightPassengerInfoType;
  mailAddressInfo: MailAddressType;
  memberCertificateInfo: GetUserDocumentResponseType;
  memberInfo: MemberInfoType;
  memberLevelInfos?: MemberLevelInfosType;
  memberRightsInfos: MemRightsResponseType;
  profileContactInfo: ProfileContactInfoType;
  thirdPartyInfos?: ThirdPartyInfosType;
}

export type AccountsInfoType = {
  /**
   * 绑定金鹏卡 0-unBindJinPeng 1-bindJinPeng
   */
  bindJinpengMemberStatus: '0' | '1';
  /**
   * 0-unCertification 1-certification
   */
  certificationStatus: '0' | '1';
  /**
   * 0-Limited 1-unlimited 2-all
   */
  limitedAttribute: '0' | '1' | '2';
  /**
   * 0-完全禁用 1-禁用购票 2-启用
   */
  memberCardStatus: '0' | '1' | '2';
  /**
   * 0-not receive 1-receive
   */
  receiveMarketingInfo: '0' | '1';
}

export type BeneficiaryInfoType = {
  beneficiaryDocuments: [DocumentType];
  /**
   * the unique ID of the beneficiary
   */
  beneficiaryId: string;
  beneficiaryName: PersonNameType;
  beneficiaryType: 'ADT' | 'CHD' | 'INF';
  birthday?: string;
  email?: string;
  phones: [PhoneType];
  /**
   * 1-father,2-grandfather，3-mother，4-spouse，5-grandmother，6-child，7-friend，8-other
   */
  relationship?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  sex: 'MALE' | 'FEMALE';
  validState: string;
  validTime: string;
}

export type DocumentType = {
  additionalDocument: AdditionalDocumentType;
  /**
   * ISO 3166 two letter country code ,
   */
  country?: string;
  docId: string;
  /**
   *  Identify the type of operation.
   */
  docType: 'PASSPORT' | 'PRC_IDENTITY_CARD' | 'OFFICER_ID' | 'POLICE_ID' | 'SOLDIER_ID' | 'MAINLAND_TRAVEL_PERMIT_FOR_HK_AND_MO' | 'RESIDENCE_PERMIT_HK_MO_TW' | 'RESIDENCE_PERMIT_TAIWAN' | 'RESIDENCE_PERMIT_FOREIGNERS' | 'FOREIGN_PERMANENT_RESIDENT_IDENTITY_CARD' | 'EXIT_ENTRY_PERMIT_TAIWAN' | 'HOME_RETURN_PERMIT' | 'OTHER';
  expiryDate?: string;
  gender?: 'MALE' | 'FEMALE';
  /**
   * ISO 3166 two letter country code
   */
  nationality?: string;
}
export type AdditionalDocumentType = {
  docId?: string;
  docType?: 'MILITARY_WITH_DISABILITY' | 'POLICE_WITH_DISABILITY';
}
export type PersonNameType = {
  CNFirstName?: string;
  CNLastName?: string;
  CNName?: string;
  ENFirstName?: string;
  ENLastName?: string;
  firstName?: string;
  middleName?: string;
  surname?: string;
  title?: 'MRS' | 'MISS' | 'MS' | 'MR' | 'MASTER' | 'MX';
}
export type PhoneType = {
  areaCode?: string;
  countryCode?: string;
  number: string;
  phoneType: string;
}

export type FlightPassengerInfoType = {
  domesticPassenger: [DomesticPassengerType];
  internationalPassenger: [InternationalPassengerType];
}

export type DomesticPassengerType = {
  birthday: string;
  email?: string;
  frequentFliers?: [FrequentFlierType];
  /**
   * domesticPassenger unique identify ,
   */
  id: string;
  name: PersonNameType;
  phones: [PhoneType];
  travelerDocument: [DocumentType];
  travelerType: 'ADT' | 'CHD' | 'INF';
}

export type FrequentFlierType = {
  airlineCode: string;
  /**
   * Passenger's frequent flier number
   */
  frequentFlierNumber: string;
}

export type InternationalPassengerType = {
  birthday: string;
  destinationAddress?: [AddressType];
  frequentFliers?: [FrequentFlierType];
  gender: 'MALE' | 'FEMALE';
  id: string;
  name: PersonNameType;
  nationality: string;
  phones: [PhoneType];
  presentAddress?: [AddressType];
  travelerDocument: [DocumentType];
  travelerType: 'ADT' | 'CHD' | 'INF';
}

export type AddressType = {
  /**
   * City name
   */
  city: string;
  /**
   * Country name
   */
  country: string;
  /**
   * county in the address
   */
  county: string;
  /**
   * fullAddress of the address
   */
  fullAddress: string;
  /**
   * Post Code in the address
   */
  postCode: string;
  /**
   * State Name in the address
   */
  state: string;
  /**
   * Street Number of the address.
   */
  streetNmbr: string;
}

export type MailAddressType = {
  addressee: AddressType;
  customerId: string;
  id: string;
}

export type GetUserDocumentResponseType = {
  customerId: string;
  userDocumentInfos: [UserDocumentInfoType];
}

export type UserDocumentInfoType = {
  additionalDocument?: AdditionalDocumentType;
  /**
   * table key
   */
  certificateId: string;
  /**
   * ISO 3166 two letter country code
   */
  country: string;
  /**
   * The document's unique identifying number
   */
  docId: string;
  /**
   *  Identify the type of operation
   */
  docType: 'PASSPORT' | 'PRC_IDENTITY_CARD' | 'OFFICER_ID' | 'POLICE_ID' | 'SOLDIER_ID' | 'MAINLAND_TRAVEL_PERMIT_FOR_HK_AND_MO' | 'RESIDENCE_PERMIT_HK_MO_TW' | 'RESIDENCE_PERMIT_TAIWAN' | 'RESIDENCE_PERMIT_FOREIGNERS' | 'FOREIGN_PERMANENT_RESIDENT_IDENTITY_CARD' | 'EXIT_ENTRY_PERMIT_TAIWAN' | 'HOME_RETURN_PERMIT' | 'OTHER';
  expiryDate: string;
  gender: 'MALE' | 'FEMALE';
  /**
   * ISO 3166 two letter country code
   */
  nationality: string;
  userInfoType: string;
}

export type MemberInfoType = {
  //  Customer ID
  customerID: string;
  // 0-not bind 1-bound
  emailBindStatus: '0' | '1';
  frequentFliers: [FrequentFlierType];
  isComplete: string;
  phoneBindStatus: '0' | '1';
  profile: ProfileType;
}

export type ProfileType = {
  address: NewAddressType;
  dateOfBirth: string;
  email: string;
  emailPromotion?: boolean;
  extension: ExtensionType;
  gender: 'MALE' | 'FEMALE';
  id: string;
  name: NewPersonNameType;
  password: string;
  phones: [PhoneType];
  preferences: PreferencesType;
  travelDocuments: [DocumentType];
  uniqueId: string;
  uniqueIdType: string;
  userName: string;
  userType: 'REGISTERED' | 'UNREGISTERED';
};

export type NewAddressType = {
  // 详细地址
  addressLines?: [string];
  // 城市
  city?: string;
  // 国家
  country?: CountryType;
  // 区/县
  county?: string;
  // 邮编
  postCode?: string;
  // 省份
  state?: string;
  streetNmbr?: string;
}
export type CountryType = {
  code: string;
  name: string;
}

export type ExtensionType = {
  authenticationStatusList: [AuthenticationStatusType];
  securityQuestionCode?: 'BIRTH_CITY' | 'MOTHER_NAME' | 'FIRST_CAR_TYPE';
}
export type AuthenticationStatusType = {
  authenticationType: 'MOBILE' | 'EMAIL' | 'FREQUENT_FLYER_CARD' | 'REAL_NAME';
  id?: string;
  isAuthenticated: boolean;
}

export type NewPersonNameType = {
  firstName: string;
  middleName: string;
  surname: string;
  title: 'MRS' | 'MISS' | 'MS' | 'MR' | 'MASTER' | 'MX';
}
export type PreferencesType = {
  carType: string;
  interests: [string];
  mealPreference: string;
  prefferedLanguage: string;
  seatingPreference: string;
  smokingPreference: 'SMOKING' | 'NON_SMOKING';
  starRating: string;
  transmission: 'MANUAL' | 'AUTOMATIC';
}

export type MemberLevelInfosType = {
  gradedGrowthValue: string;
  gradedNeedGrowthValue: string;
  hierarchicalGrowthValue: string;
  hierarchicalNeedGrowthValue: string;
  memberlevleId: string;
}

export type MemRightsResponseType = {
  /**
   * all user Rights
   */
  UserRightsList: [ProfileRightsType];
  /**
   * member Rights
   */
  memberRightsList?: [MemberRightsType];
}

export type ProfileRightsType = {
  beginDate?: string;
  endDate?: string;
  /**
   *  profileRights id
   */
  id: string;
  memberRightsList?: [MemberRightsType];
  placeHolderRightsLis?: [PlaceHolderRightsType];
  placeHolderSize?: number;
  /**
   * rights name
   */
  rightsName: string;
  /**
   * rights type:1-Fixed Rights;2-Nonfixed Rights
   */
  rightsType: '1' | '2';
}

export type MemberRightsType = {
  memberLevel: string;
  memberLevelId: string;
  rightsContent: string;
  rightsId: string;
}

export type PlaceHolderRightsType = {
  placeHolderId: string;
  rightsContent: string;
}

export type ProfileContactInfoType = {
  /**
   * list of one or more profile contact
   */
  profileContacts: [ContactType];
}

export type ContactType = {
  /**
   *  Profile Contact ID
   */
  contactId: string;
  /**
   * The email for FrequentcontactInfo
   */
  email: string;
  name: PersonNameType;
  phones: [PhoneType];
}

export type ThirdPartyInfosType = {
  thirdPartyInfos: ThirdPartyInfoType;
}

export type ThirdPartyInfoType = {
  /**
   * access token
   */
  accessToken: string;
  /**
   *  nick name
   */
  nickName: string;
  /**
   * openId
   */
  openId: string;
  /**
   * thirdPartyId key
   */
  thirdPartyId: string;
  /**
   * 1-QQ; 2-WeChat; 3-Alipay; 4-MicroBlog
   */
  thirdPartyType: '1' | '2' | '3' | '4';
}
