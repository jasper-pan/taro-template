import React, { useState, ReactNode } from 'react';
import { AtFloatLayout } from 'taro-ui';
import { View, Text } from '@tarojs/components';

import './index.scss';

interface AgreementItemProps {
 [x: string]: ReactNode;
 title: string;
 triger: string;
}

const Item = (props: AgreementItemProps) => {
  const [opened, setOpened] = useState(false);
  const {title,triger} = props;

  const handleClick = () => {
    setOpened(!opened);
  };

  const handleClose = () => {
    setOpened(!opened);
  };
  return (
    <React.Fragment>
      <Text className='agreement-trigger' onClick={handleClick}>{triger}</Text>
      <AtFloatLayout isOpened={opened} title={title} onClose={handleClose}>
        <View className='agreement-context'>
          {
            props.children
          }
        </View>
      </AtFloatLayout>
    </React.Fragment>
  );
};

export default Item;
