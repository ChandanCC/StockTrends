import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../config/colors';
import {ms, vs} from '../../config/scale';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  faceIdImage: {height: 100, width: 100},
  loginText: {
    fontSize: ms(14),
    color: colors.primaryBackground,
  },
  notNowButton: {
    backgroundColor: colors.white,
    borderColor: colors.primaryBackground,
    borderWidth: 1,
    marginTop: vs(10),
  },
  loginTextSecondary: {
    fontSize: ms(10),
    color: colors.primaryBackground,
    marginTop: vs(5),
  },
  heading: {
    color: '#ffffff',
    fontSize: 22,
    marginTop: 30,
    marginBottom: 5,
  },
  subheading: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 30,
  },
  fingerprint: {
    padding: 20,
    marginVertical: 30,
  },
  errorMessage: {
    color: '#ea3d13',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 30,
  },
  popup: {
    width: width * 0.8,
  },
});
