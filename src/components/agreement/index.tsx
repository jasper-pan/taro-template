import React, { ReactNode } from 'react';
import { t } from '@/i18n';
import { View } from '@tarojs/components';
import Item from './Item';

import './index.scss';

interface AgreementProps {
 [x: string]: ReactNode;
}

const Agreement = (props: AgreementProps) => {
  return (
    <View className='agreement'>
      {t('booking.agreement')['tips1']}
      {
        props.children
      }
    </View>
  );
};

Agreement.Item = Item;
export default Agreement;
