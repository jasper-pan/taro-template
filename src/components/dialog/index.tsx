import React from 'react';
import { View, Text } from '@tarojs/components';
import {  AtModal, AtButton } from 'taro-ui';
import cx from 'classnames';

import './index.scss';

interface DialogProps {
  className?: string;
  isOpened: boolean;
  icon: string;
  title?: string;
  content: string | React.ReactChild;
  confirmText?: string;
  cancellText?: string;
  onClose: () => void;
  onConfirm?: () => void;
  onCancell?: () => void;
}

const Dialog = (props: DialogProps) => {
  const { className, isOpened, icon, title, content, confirmText, cancellText, onClose, onConfirm, onCancell } = props;

  const confirmClick = () => {
    // 确认事件
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const cancellClick = () => {
    // 取消事件
    if (onCancell) {
      onCancell();
    }
    onClose();
  };

  return (
    <AtModal className={cx('customize-at-model', className)} isOpened={isOpened} onClose={() => {onClose();}}>
      <View className='modal-icon'><Text className={cx('icon', icon)} /></View>
      {
        title && <View className='modal-title'>{title}</View>
      }
      <View className='modal-content'>{content}</View>
      <AtButton className='to-home' onClick={confirmClick}>{confirmText}</AtButton>
      {
        cancellText && <AtButton className='to-close' onClick={cancellClick}>{cancellText}</AtButton>
      }
    </AtModal>
  );
};

export default Dialog;