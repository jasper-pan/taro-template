import React, { useState } from 'react';
import { View } from '@tarojs/components';
import cx from 'classnames';
import './style.scss';

export type AccordionType = {
  className?: string;
  index: string | number;
  defaultIndex?: string | number;
  title: string | React.ReactChild;
  list?: string | React.ReactChild;
  onChange?: (index: string | number) => void;
}

/**
 * 手风琴，支持组件渲染
 * @param props
 * @constructor
 */
const Accordion = (props: AccordionType) => {
  const { className, index, title, list, onChange } = props;

  const [open, setOpen] = useState(false);
  const [listClassNames, setListClassNames] = useState('list-content');

  const handleClick = () => {
    if (onChange) {
      onChange(open ? '' : index);
    }
    setListClassNames(open ? 'list-content' : 'list-content list-content-active');
    setOpen(!open);
  };

  return (
    <View className={cx('cp-accord', { [`${className}`]: className })}>
      <View className={`${open ? 'card-active' : ''}`} onClick={handleClick}>{title}</View>
      {list && <View className={listClassNames}>{list}</View>}
    </View>
  );
};

export default Accordion;
