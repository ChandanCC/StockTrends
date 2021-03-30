import {StyleSheet} from 'react-native';
import colors from '../../config/colors';
import {hs, ms, vs} from '../../config/scale';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    width: '100%',
    height: 400,
  },
  signInButton: {
    paddingVertical: vs(15),
    paddingHorizontal: hs(25),
    borderRadius: 30,
    backgroundColor: 'rgb(114,105,144)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  signInText: {
    color: colors.white,
    marginLeft: hs(10),
    fontWeight: '600',
    fontSize: ms(18),
  },
});
