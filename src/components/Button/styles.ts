import {StyleSheet} from 'react-native';
import colors from '../../config/colors';
import {DeviceWidth, hs, ms, vs} from '../../config/scale';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hs(25),
    justifyContent: 'space-between',
  },
  buttons: {
    backgroundColor: colors.primaryBackground,
    height: vs(40),
    alignItems: 'center',
    justifyContent: 'center',
    width: DeviceWidth * 0.85,
  },
  buttonText: {
    fontSize: ms(14),

    fontWeight: '600',
    color: colors.white,
  },
});
