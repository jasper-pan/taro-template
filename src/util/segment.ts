import { t } from '@/i18n';
import Apis from '@trp/apis';
import { OrderDetailModel } from '@trp/apis/lib/booking/model/orderDetailModel';

/**
 * 获取航段类型
 * @param direction
 * @param flightSegmentId
 */
export const getSegmentType = (direction: string, flightSegmentId: string | number) => {
  let segmentType = t('common.segmentTypes.multi')[0];
  if (direction === 'RETURN') {
    if (flightSegmentId === '1') {
      segmentType = t('common.segmentTypes.return.go');
    } else {
      segmentType = t('common.segmentTypes.return.back');
    }
  } else if (direction === 'MULTI_CITY') {
    segmentType = t('common.segmentTypes.multi')[Number(flightSegmentId) - 1];
  }
  return segmentType;
};

/**
 * 处理状态
 * @param status
 */
export const processStatus = (status: string) => {
  const segmentStatus = {
    status: t('order.segmentStatus')[status] || status,
    statusClassName: ''
  };
  switch (status) {
    // 出票成功/改升出票成功
    case 'TICKET_SUCCESS':
    case 'TICKET_SUCCESS_CHANGE':
      segmentStatus.statusClassName = 'success';
      break;
    // 已取消
    case 'CANCELLED':
      segmentStatus.statusClassName = 'cancelled';
      break;
    // 等待支付/出票
    case 'PENDING_PAYMENT':
    case 'PENDING_PAYMENT_CHANGE':
    case 'PENDING_TICKET':
    case 'PENDING_TICKET_CHANGE':
      segmentStatus.statusClassName = 'pending';
      break;
    // 退票
    case 'REFUNDED':
    case 'REFUNDING':
      segmentStatus.statusClassName = 'refund';
      break;
    default:
      segmentStatus.statusClassName = '';
      break;
  }
  return segmentStatus;
};

/**
 * 获取航线的出发到达
 * @param bookingDetail
 * @param flightSegmentId
 */
export const getOriginAndDestination = (bookingDetail: OrderDetailModel, flightSegmentId?: string) => {
  const result = { origin: '', destination: '' };
  const condition = flightSegmentId ? `$..flightProducts[0].flightBounds..[?(@.id=='${flightSegmentId}')]` : '$..flightProducts[0].flightBounds[0]';
  const flightBounds = bookingDetail && Apis.util.jsonPath(bookingDetail, condition);
  result.origin = flightBounds.departure.city;
  result.destination = flightBounds.arrival.city;
  return result;
};
