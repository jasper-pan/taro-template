export const ancillary = {
  types: {
    seat: 'Seat',
    insurance: 'Insurance',
    baggage: 'Baggage',
    meal: 'Meal',
    welfare: 'Welfare',
    lounge: 'Lounge'
  },
  status: {
    BOOKED: 'BOOKED',
    PENDING_TICKET: 'Pending Ticket',
    REFUNDED: 'Refunded',
    REFUNDING: 'Refunding',
    PENDING_PAYMENT: 'Pending Payment',
    CANCELLED: 'Cancelled',
    FAILED_BOOKING: 'Failed Booking',
    UNCONFIRMED: 'Unconfirmed',
    PENDING_BOOKING: 'Pending Booking',
    'INSURANCE_BOOKING': 'Insurance Booking'
  },
  checkInStatus: {
    notCheckIn: 'Not CheckIn ',
    success: 'CheckIn Success ',
    failed: 'CheckIn Failed ',
    prepareCheckIn: 'Prepare CheckIn'
  },
  description: {
    selecting: 'Now Selected',
    able: 'Selectable',
    paid: 'Paid',
    selected: 'Other Selected',
    disabled: 'Disabled'
  },
  unit: { PIECE: 'PIECE', KILOGRAM: 'KILOGRAM', POUND: 'POUND' },
  mealTyp: {
    FREEMEAL: 'FREEMEAL',
    FOOD: 'FOOD',
    FOOD1: 'FOOD1',
    CHINESEMEAL: 'CHINESEMEAL',
    CHILDRENMEAL: 'CHILDRENMEAL'
  },
  copies: 'copies',
  noMeal: 'There is no alternative meal',
  selectMealTip: 'Pay meals and free meals cannot be selected at the same time',
  unselectedMeals: 'Unselected meals, confirm submission?',
  unUpdateMeal: 'The selected meal has not been modified, OK to return？',
  unselectedSeats: 'Unselected Seats',
  unselectedMeal: 'Unselected meal',
  continueSelection: 'Continue selection',
  modalMessage: 'There are still passengers who have not selected seats. Do you want to submit?',
  buyBaggageWarn: 'There are still passengers who have not selected baggages. Do you want to submit?',
  unselectedBaggage: 'Unselected baggage',
  unUpdateBaggage: 'unUpdate Baggage',
  exit: 'EXIT',
  titleTypes: {
    seat: 'Advance seat selection',
    insurance: 'Buy insurance',
    baggage: 'check-in baggage',
    meal: 'Fine meal'
  },
  tipsTypes: {
    seat: 'Travel with a partner, more convenient. Choose seats at intervals to protect you',
    insurance: 'Tianhang insurance will accompany you to travel safely',
    baggage: 'The price of checked baggage purchased in advance is guaranteed to be the lowest',
    meal: 'Meals, carefully customized for you'
  },
  tipsToPay: {
    tips1: 'Clicking "to pay" means I have read and agree',
    tips2: 'Instructions for purchase and insurance',
    tips3: 'Additional service rules'
  },
  toPay: 'Additional service rules',
  freeMeal: {
    'AVML': 'AVML',
    'BBML': 'BBML',
    'BLML': 'BLML',
    'CHML': 'CHML',
    'DBML': 'DBML',
    'FPML': 'FPML',
    'GFML': 'GFML',
    'HNML': 'HNML',
    'KSML': 'KSML',
    'LCML': 'LCML',
    'LFML': 'LFML',
    'LSML': 'LSML',
    'MOML': 'MOML',
    'NLML': 'NLML',
    'NOML': 'NOML',
    'RVML': 'RVML',
    'VGML': 'VGML',
    'VJML': 'VJML',
    'VLML': 'VLML',
    'VOML': 'VOML'
  },
  detail: 'Detail',
  deleteSeatFailed: 'Delete Seat Failed',
  bookedSuccess: 'Booked Success',
  bookingFailed: 'Booking Failed',
  selectSegment: 'Please Select Segment',
  selected: 'Selected: ',
  'CNY': '￥',
  specifications: 'Specifications ',
  checkIn: 'CheckIn ',
  seatNumber: 'Seat Number ',
  unsubscribe: 'Unsubscribe',
  wantToTicket: 'Want To Ticket ',
  noseatsAvailable: 'No Seats Available',
  noBaggageAvailable: 'No Baggage Available',
  noInsuranceAvailable: 'No Insurance Available',
  // 附加服务退改签里面的内容
  adRuleA: 'Refund',
  adRuleB: 'Voluntary refund：Products can be refunded without charge 48 hours before flight departure；Products cannot be refunded within 48 hours prior to flight departure and after flight departure;Passengers who do not meet the requirements due to their own reasons are entitled to refund under the circumstances of emergency exit and abnormal flight guarantee;',
  adRuleC: 'Involuntary refund：products can be refunded without charge；After the flight takes off, the product has not used, also may handle the refund.',
  adRuleD: 'DateChange',
  adRuleE: 'The website does not support rescheduling, please contact customer service for rescheduling.',
  adRuleF: 'Sign',
  adRuleG: 'Voluntary sign：Products can not be transacted in the website；',
  adRuleH: 'Involuntary sign：Products can be refunded in the website, do not charge fees, but not for signing。',
  ancillary: 'Ancillary ',
  purchased: 'Purchased ',
  free: 'Free ',
  choosed: 'Choosed ',
  noAncillary: 'This additional service is not scheduled ',
  seatOperationTypes: { print: 'Print ', checkIn: 'CheckIn', cancelCheckIn: 'Cancel CheckIn' },
  modalNotice: {
    main: ' Please go to the official website of Tianhang ',
    success: {
      checkIn: 'CheckIn Success',
      cancelCheckIn: 'Cancel CheckIn Success'
    },
    failed: {
      checkIn: 'CheckIn Failed',
      cancelCheckIn: 'Cancel CheckIn Failed'
    }
  },
  noSegmentAndCustomer: 'Please Select Segment And Customer',
  successfulPurchase: 'successfulPurchase',
  successfulFailed: 'successfulFailed',
  modificationSucceeded: 'modificationSucceeded',
  modificationFailed: 'modificationFailed',
  needToKnow: 'needToKnow',
  customerServiceTelephone: 'customerServiceTelephone',
  customerServiceTelephoneTips: '400-810-2688（客服值班时间8:30-21:00）',
  mockInsurance: {
    '退票险': '节省50%退改手续费',
    '航空意外险ASI': '节省50%500万意外保障',
    '航空综合险（分账保险勿改）': '航空综合险（分账保险勿改）,综合保障'
  },
  notPurchased1: 'You have not purchased any products with additional services. If you need to purchase, please continue to purchase on this page.',
  notPurchased2: 'Click OK to continue the purchase, click do not need to give up the purchase, directly enter the payment'
};
