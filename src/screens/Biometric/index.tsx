import {StackScreenProps} from '@react-navigation/stack';
import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  AppState,
  AppStateStatus,
  StatusBar,
  Platform,
  BackHandler,
} from 'react-native';
import Toast from 'react-native-root-toast';

import FingerprintScanner from 'react-native-fingerprint-scanner';
import Button from '../../components/Button';
import FingerprintPopup from '../../components/FingerprintPopup';
import colors from '../../config/colors';
import {RootStackParamList} from '../../types/Navigation';
import styles from './styles';

type BiometricScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  'BiometricScreen'
>;

export default class Biometric extends Component<
  BiometricScreenNavigationProp,
  {
    errorMessage: any;
    biometric: any;
    popupShowed: boolean;
    appState: any;
    toastVisible: boolean;
  }
> {
  description: any;
  constructor(props: any) {
    super(props);
    this.state = {
      errorMessage: undefined,
      biometric: undefined,
      popupShowed: false,
      toastVisible: false,
      appState: null,
    };
  }

  handleFingerprintShowed = () => {
    this.setState({popupShowed: true});
  };

  handleFingerprintDismissed = () => {
    this.setState({popupShowed: false});
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    // Get initial fingerprint enrolled
    this.detectFingerprintAvailable();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  showToast = () => {
    this.setState({toastVisible: true}, () => {
      setTimeout(() => {
        this.setState({toastVisible: false});
      }, 2000);
    });
  };

  detectFingerprintAvailable = () => {
    FingerprintScanner.isSensorAvailable().catch(error =>
      this.setState(
        {errorMessage: error.message, biometric: error.biometric},
        () => {
          this.showToast();
        },
      ),
    );
  };

  handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      this.state.appState &&
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      FingerprintScanner.release();
      this.detectFingerprintAvailable();
    }
    this.setState({appState: nextAppState});
  };
  render() {
    const {errorMessage, biometric, popupShowed} = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.white}> </StatusBar>

        <Image
          source={require('../../assets/face-id.png')}
          style={styles.faceIdImage}
          resizeMode="contain"
        />
        <View style={{alignItems: 'center'}}>
          <Text style={styles.loginText}>{`Log in with ${
            Platform.OS === 'ios' ? 'Face ID' : 'Fingerprint'
          }`}</Text>
          <Text style={styles.loginTextSecondary}>
            Use your Face ID for faster, easier access to sign in
          </Text>
        </View>

        {errorMessage && (
          <Toast
            visible={this.state.toastVisible}
            position={-50}
            shadow={false}
            animation={false}
            hideOnPress={true}>
            {Platform.OS === 'android' ? biometric : errorMessage}
          </Toast>
        )}

        {popupShowed && (
          <FingerprintPopup
            style={styles.popup}
            handlePopupDismissed={this.handleFingerprintDismissed}
            onAuthenticate={() => this.props.navigation.navigate('HomeScreen')}
          />
        )}
        <View>
          <Button
            onPress={this.handleFingerprintShowed}
            disabled={!!errorMessage}
            title={`Use ${Platform.OS === 'ios' ? 'Face Id' : 'Fingerprint'}`}
          />
          <Button
            onPress={() => {
              BackHandler.exitApp();
            }}
            title="Not Now"
            buttonTextStyles={{color: colors.primaryBackground}}
            buttonStyles={styles.notNowButton}
          />
        </View>
      </View>
    );
  }
}
