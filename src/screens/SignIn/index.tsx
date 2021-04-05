import React, {useState} from 'react';
import {StatusBar, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-root-toast';

import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

import colors from '../../config/colors';
import {ms} from '../../config/scale';
import {RootStackParamList} from '../../types/Navigation';
import styles from './styles';

import {useAppDispatch} from '../../redux/hooks';
import {updateLoggedInUser} from '../../redux/actions/loggedInUser';

type SignInScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  'SignInScreen'
>;

enum ERROR_MESSAGES {
  DEFAULT = 'Something went wrong!',
  SIGN_IN_CANCELLED = 'Sign In Cancelled',
  PLAY_SERVICES_NOT_AVAILABLE = 'Google Play Services not available',
}

const SignIn = ({navigation}: SignInScreenNavigationProp) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  const [toastMessage, setToastMessage] = useState<ERROR_MESSAGES>(
    ERROR_MESSAGES.DEFAULT,
  );

  const setToastVisible = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        dispatch(
          updateLoggedInUser({
            token: userInfo.idToken,
          }),
        );
        navigation.navigate('BiometricScreen');
      } else {
        throw new Error('Id token not found');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setToastMessage(ERROR_MESSAGES.SIGN_IN_CANCELLED);
        setToastVisible();
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setToastMessage(ERROR_MESSAGES.PLAY_SERVICES_NOT_AVAILABLE);
        setToastVisible();
      } else {
        setToastMessage(ERROR_MESSAGES.DEFAULT);
        setToastVisible();
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.primaryBackground}
        barStyle="dark-content"
      />
      <TouchableOpacity onPress={signIn} style={styles.signInButton}>
        <FontAwesomeIcons name="google" size={ms(20)} color={colors.white} />
        <Text style={styles.signInText}>Sign In with Google</Text>
      </TouchableOpacity>
      <Toast
        visible={visible}
        position={-50}
        shadow={false}
        animation={false}
        hideOnPress={true}>
        {toastMessage}
      </Toast>
    </SafeAreaView>
  );
};

export default SignIn;
