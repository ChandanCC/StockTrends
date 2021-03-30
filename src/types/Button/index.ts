import {TextStyle, ViewStyle} from 'react-native';

export interface IButtonProps {
  onPress: () => void;
  title: string;
  buttonStyles?: ViewStyle;
  buttonTextStyles?: TextStyle;
  disabled?: boolean;
}
