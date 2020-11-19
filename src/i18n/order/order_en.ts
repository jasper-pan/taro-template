export const order = {
  order: 'Order ',
  detail: 'Detail ',
  flightInformation: 'Flight information',
  segmentStatus: {
    TICKET_SUCCESS: 'Ticket Success',
    PENDING_TICKET: 'Pending Ticket',
    CANCELLED: 'Cancelled',
    REFUNDED: 'Refunded',
    PENDING_PAYMENT: 'Pending Payment',
    REFUNDING: 'Refunding',
    PENDING_PAYMENT_CHANGE: 'Pending Payment Change',
    PENDING_TICKET_CHANGE: 'Pending Ticket Change',
    TICKET_SUCCESS_CHANGE: 'Ticket Success Change',
    BOOKED: 'Normal State'
  },
  penalty: 'Rules For Retrogression',
  docType: {
    RESIDENCE_PERMIT_HK_MO_TW: 'RESIDENCE_PERMIT_HK_MO_TW ',
    PASSPORT: 'PASSPORT ',
    OTHER: 'OTHER ',
    SOLDIER_ID: 'SOLDIER_ID ',
    OFFICER_ID: 'OFFICER_ID ',
    POLICE_ID: 'POLICE_ID ',
    PRC_IDENTITY_CARD: 'PRC_IDENTITY_CARD ',
    MAINLAND_TRAVEL_PERMIT_FOR_HK_AND_MO: 'MAINLAND_TRAVEL_PERMIT_FOR_HK_AND_MO ',
    POLICE_WITH_DISABILITY: 'POLICE_WITH_DISABILITY ',
    MILITARY_WITH_DISABILITY: 'MILITARY_WITH_DISABILITY '
  },
  reference: 'Reference ',
  paymentStatus: { CONFIRMED: 'CONFIRMED ', FAILED: 'FAILED ' },
  transactionType: { DEBIT: 'DEBIT ', CREDIT: 'CREDIT ' },
  refund: 'Refund ',
  upgrade: 'Upgrade ',
  ticketedNumber: 'Ticket number issued',
  ticketNumber: 'TicketNumber',
  bookingReference: 'BookingReference',
  price: 'Total tax included',
  flightOrder: 'Air ticket order',
  screen: {
    threeDay: 'Within three days',
    month: 'Within a week',
    threeMonth: 'Within three months',
    thirteenMonth: 'Within 13 months'
  },
  timeFrame: 'Please select a time range',
  empty: 'Empty',
  ticketSuccess: 'Reservation successful',
  noResultTip: 'Order not found',
  // 退改签规则
  changePrice: 'Modification',
  refundPrice: 'Refund',
  everyTime: '(every)',
  voluntarySign: 'voluntary sign',
  noVoluntarySign: 'not voluntary sign',
  ruleOne: 'Departure time: Before Trip4 hours (not included)',
  ruleTwo: 'Departure time: Before Trip4 (with) before',
  ruleThree: 'Departure time: Before Trip4 hours (included)',
  ruleFour: 'Departure time: Before Trip',
  beforeHour: 'hours (included)',
  hourTo: 'hours (included) to',
  hour: 'hours (not included)',
  orderOperation: {
    refund: 'Refund ',
    payment: 'To Payment ',
    cancel: 'Cancel Order ',
    ticket: 'Want To Ticket',
    upgrade: 'Upgrade'
  },
  myOrder: 'go to my order',
  myOrderToPay: '前往我的订单支付',
  payFailed: '支付失败',
  payTips: '请前往我的订单，进行支付！',
  orderButtons: {
    refund: 'Refund',
    upgrade: 'Upgrade',
    cancel: 'Cancel Order',
    ticket: 'Want To Ticket',
    pay: 'To Pay'
  },
  buttonOperationModal: {
    success: {
      cancel: 'Order Cancel Success'
    },
    failed: {
      cancel: 'Order Cancel Failed'
    }
  }
};
