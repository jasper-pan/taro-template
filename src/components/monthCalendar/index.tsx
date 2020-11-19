import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, Button } from '@tarojs/components';
import { t } from '@/i18n';
import cx from 'classnames';
import dayjs from 'dayjs';
import { formatDateI18n } from '@/util/dateUtils';
import makeCalendars, { MonthModel, DayModel, DayModelWrap } from './makeCalendar';

import './index.scss';

interface DateArg {
  start: string;
  end: string;
}

interface MonthCalendarPropsModel {
  title?: string;
  curDate: DateArg | string;
  isMultiSelect?: boolean;
  isShow?: boolean;
  onChange?: (date: DateArg | string) => void;
  trigger?: string | React.ReactNode;
  onClose?: () => void;
  priceObj?: {};
  // 最小的可选时间
  minDate?: string;
  // 最大的可选时间
  maxDate?: string;
  className?: string;
  holiday?: {};
}


const MonthCalendar = (props: MonthCalendarPropsModel) => {

  const { title = '选择日期', curDate, isShow = false, onChange, holiday, priceObj, className = '', isMultiSelect, trigger, minDate, maxDate, onClose } = props;
  const [selectDate, setSelectDate] = useState(curDate);
  const [show, setShow] = useState(isShow);
  const [calendars, setCalendars] = useState<MonthModel[]>([]);
  const [scrollTop, setScrollTop] = useState(0);
  const todayDom = useRef();

  useEffect(() => {
    setSelectDate(curDate);
  }, [curDate]);

  useEffect(() => {
    if (show) {
      setScrollTop(todayDom.current.offsetTop);
    }

  }, [show]);

  useEffect(() => {
    setCalendars(makeCalendars());
  }, []);


  // 格式化每个月的title
  const formatTitle = (date: string) => {
    return `${dayjs(date).year()}年${dayjs(date).month() + 1}月`;
  };


  const formatDate = (date: string) => {
    return `${dayjs(date).month() + 1}月${dayjs(date).date()}日 ${formatDateI18n(date, 'd')}`;
  };
  const hasEnd = () => {
    const { end } = selectDate as DateArg;
    return !!end;
  };

  const isForbidden = (item: DayModel) => {
    return item.isPass || (minDate && dayjs(item.date).diff(minDate) < 0) || (maxDate && dayjs(item.date).diff(maxDate) > 0);
  };

  const getDateClass = (item: DayModel, isAble: boolean): string => {
    if (isMultiSelect) {
      const { start, end } = selectDate as DateArg;
      return cx('col-cell', {
        'forbidden-day': !isAble,
        'cur-date': item && !isMultiSelect && curDate === item.date,
        'start-date-cell': item && isMultiSelect && start === item.date,
        'end-date-cell': item && isMultiSelect && end === item.date,
        'inner-date-cell': item && isMultiSelect && dayjs(item.date).diff(start) > 0 && dayjs(item.date).diff(end) < 0
      });
    }
    else {
      return cx('col-cell', {
        'forbidden-day': !isAble,
        'cur-date': item && selectDate === item.date,
      });
    }
  };

  const close = () => {
    setShow(false);
    onClose && onClose();
  };

  //时间选择
  const dateSelect = (date) => {
    setSelectDate(date);
    close();
    if (typeof onChange === 'function') {
      onChange(date);
    }
  };

  //范围时间选择函数
  const rangeSelect = (date) => {
    const { start, end } = selectDate as DateArg;
    if (start && end) {
      setSelectDate({ start: date, end: '' });
    }
    else if (start && !end) {
      if (dayjs(date).diff(start) >= 0) {
        setSelectDate({ ...(selectDate as DateArg), end: date });
      }
      else if (dayjs(date).diff(start) < 0) {
        setSelectDate({ start: date, end: start });
      }
    };
  };

  const rangeComfire = () => {
    if (hasEnd()) {
      if (typeof onChange === 'function') {
        onChange(selectDate);
      }
      close();
    }
  };

  const handelClick = (date) => {
    if (!isMultiSelect) {
      dateSelect(date);
    }
    else {
      rangeSelect(date);
    }
  };

  const rendarDateItem = (calendar: MonthModel, item: DayModelWrap, i) => {
    const curDay = typeof curDate === 'string' ? curDate as string : (curDate as DateArg).start;

    if (!item) {
      return (<View className='col-cell' key={calendar.title + i} />);
    } else {
      const isAble = !isForbidden(item);
      if(item.date===curDay){
        return(<View
          ref={todayDom}
          key={calendar.title + i}
          className={getDateClass(item, isAble)}
          onClick={() => { handelClick(item.date); }}
        >
          {holiday && <View className='holiday'>{holiday[dayjs(item.date).format('MM-DD').replace('-', '')]}</View>}
          <View className='day-num'>{item.day}</View>
          {priceObj && <View className='price'>{priceObj[item.date]}</View>}
        </View>);
      }
      return (
        isAble ? <View
          key={calendar.title + i}
          className={getDateClass(item, isAble)}
          onClick={() => { handelClick(item.date); }}
        >
          {holiday && <View className='holiday'>{holiday[dayjs(item.date).format('MM-DD').replace('-', '')]}</View>}
          <View className='day-num'>{item.day}</View>
          {priceObj && <View className='price'>{priceObj[item.date]}</View>}
        </View> :
          <View className={getDateClass(item, isAble)} key={calendar.title + i} >
            {holiday && <View className='holiday'>{holiday[dayjs(item.date).format('MM-DD').replace('-', '')]}</View>}
            <View className='day-num'>{item.day}</View>
            {priceObj && <View className='price'>{priceObj[item.date]}</View>}
          </View>
      );
    }

  };

  return (
    <React.Fragment>
      <View className='calendar-trigger' onClick={() => { setShow(true); }}>
        {trigger ? <React.Fragment>{trigger}</React.Fragment> :
          <React.Fragment>
            <View className='icon-calendar-fill' />
            <View className='icon-down' />
          </React.Fragment>
        }
      </View>

      <View className={cx('month-calendar', className, { 'calendar-multi': isMultiSelect, 'month-calendar--active': show })}>
        <View className='month-calendar-overlay' onClick={close}></View>
        <View className='month-calendar-container'>
          <View className='month-calendar-title at-row at-row__justify--around at-row__align--center'>
            <Text className='at-col title-text'>{title}</Text>
            <Text className='at-col month-calendar-close icon-close' onClick={close}></Text>
          </View>

          {isMultiSelect && <React.Fragment>
            <View className='month-calendar-range-title at-row at-row__justify--around at-row__align--center'>
              <View className='at-col'>
                <View className='date-title start-title'>去程日期</View>
                <View className='start-date'>{formatDate((selectDate as DateArg).start)}</View>
              </View>

              <View className='at-col'>
                <View className='date-title end-title'>返程日期</View>
                <View className={cx('end-date', { 'no-date': !(selectDate as DateArg).end })}>{(selectDate as DateArg).end ? formatDate((selectDate as DateArg).end) : '请选择'}</View>
              </View>
            </View>
          </React.Fragment>
          }
          <View className='month-calendar-week-bar at-row at-row__justify--around'>
            <View className='at-col'>日</View>
            <View className='at-col'>一</View>
            <View className='at-col'>二</View>
            <View className='at-col'>三</View>
            <View className='at-col'>四</View>
            <View className='at-col'>五</View>
            <View className='at-col'>六</View>
          </View>
          {show && <ScrollView className='month-calendar-body'
            scrollY
            scrollTop={scrollTop}
          >
            {
              calendars.map((calendar) => {
                return (
                  <View key={calendar.title} className='month-calendar-per'>
                    <View className='month-calendar-per-title'>{formatTitle(calendar.title)}</View>
                    <View className='month-calendar-content'>
                      {
                        calendar.calendar.map((item, i) => {
                          return rendarDateItem(calendar, item, i);
                        })
                      }
                    </View>
                  </View>
                );
              })
            }
          </ScrollView>}
          {isMultiSelect &&
            <View className='calendar-button'>
              <Button className={cx('range-confirm-btn', { 'disable-btn': !hasEnd() })} onClick={rangeComfire}>{t('common.confirm')}</Button>
            </View>
          }
        </View>
      </View>
    </React.Fragment>
  );
};

export default MonthCalendar;
