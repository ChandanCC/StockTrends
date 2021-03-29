import { Dimensions } from 'react-native';
// import { hasNotch } from 'react-native-device-info';

const { width: DeviceWidth, height: DeviceHeight } = Dimensions.get('window');

const DESIGN_HEIGHT = 896;
const DESIGN_WIDTH = 414;

// const height = hasNotch() ? DeviceHeight - 58 : DeviceHeight;
const height = DeviceHeight;
const horizontalScale = (size: number) => (DeviceWidth / DESIGN_WIDTH) * size;
const verticalScale = (size: number) => (height / DESIGN_HEIGHT) * size;
const moderateScale = (size: number, factor: number = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export {
  horizontalScale as hs,
  verticalScale as vs,
  moderateScale as ms,
  DeviceWidth,
  DeviceHeight
};
