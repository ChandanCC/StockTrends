import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  SignInScreen: undefined;
  BiometricScreen: undefined;
  StockGraphScreen: undefined;
  HomeScreen: undefined;
};

export type HomeScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  'HomeScreen'
>;

export type StockGraphScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  'StockGraphScreen'
>;
