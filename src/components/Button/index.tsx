import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {IButtonProps} from '../../types/Button';
import styles from './styles';

export default function Button({
  onPress,
  title,
  buttonStyles,
  buttonTextStyles,
  disabled,
}: IButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.buttons, buttonStyles]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[styles.buttonText, buttonTextStyles]}>{title}</Text>
    </TouchableOpacity>
  );
}
