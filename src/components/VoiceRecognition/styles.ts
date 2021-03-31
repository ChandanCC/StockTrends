import {Platform, StyleSheet} from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  micBtn: {
    backgroundColor: colors.primaryTextColor,
    padding: 20,
    borderRadius: 50,
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.primaryTextColor,
    lineHeight: 30,
    fontWeight: '400',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  action: {
    backgroundColor: colors.primaryTextColor,
    borderRadius: 500,
    padding: 5,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 80 : 20,
    right: 20,
    marginHorizontal: 20,
    alignSelf: 'flex-end',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: colors.white,
    marginBottom: 1,
    marginTop: 30,
  },
});
