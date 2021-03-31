import {StyleSheet} from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  micBtn: {
    backgroundColor: colors.primaryTextColor,
    padding: 20,
    borderRadius: 50,
  },
  buttonTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.primaryTextColor,
    lineHeight: 30,
    fontWeight: '400',
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: colors.primaryTextColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
});
