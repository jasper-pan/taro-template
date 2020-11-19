import React from 'react';
import { View } from '@tarojs/components';
import cx from 'classnames';
import './index.scss';

type CardPropsType = {
  children?: React.ReactNodeArray | React.ReactNode;
  className?: string;
}

const Card = (props: CardPropsType) => {
  const classNames = cx('cp-card', {[`${props.className}`]: props.className});

  return (
    <View className={classNames}>
      {props.children}
    </View>
  );
};

export default Card;
