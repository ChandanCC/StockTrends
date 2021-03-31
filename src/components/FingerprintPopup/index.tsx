import React, {Component} from 'react';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import ShakingText from '../../components/ShakingText';
import styles from './styles';

export default class FingerprintPopup extends Component<
  {
    style?: any;
    handlePopupDismissed?: (data: any) => void;
    onAuthenticate?: () => void;
    handlePopupDismissedLegacy?: () => void;
  },
  {
    errorMessageLegacy: any;
    biometricLegacy: any;
  }
> {
  description: any;
  constructor(props: any) {
    super(props);
    this.state = {
      errorMessageLegacy: undefined,
      biometricLegacy: undefined,
    };

    this.description = null;
  }
  componentDidMount() {
    if (Platform.OS === 'ios') {
      FingerprintScanner.authenticate({
        description: 'Scan your fingerprint on the device scanner to continue',
      })
        .then(() => {
          if (this.props.handlePopupDismissed) {
            this.props.handlePopupDismissed({success: true});
          }
        })
        .catch(error => {
          if (this.props.handlePopupDismissed) {
            this.props.handlePopupDismissed(error);
          }
        });
    } else {
      if (this.requiresLegacyAuthentication()) {
        this.authLegacy();
      } else {
        this.authCurrent();
      }
    }
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'android') {
      FingerprintScanner.release();
    }
  };

  requiresLegacyAuthentication() {
    return Platform.Version < 23;
  }

  authCurrent() {
    FingerprintScanner.authenticate({title: 'Log in with Biometrics'}).then(
      () => {
        if (this.props.onAuthenticate) {
          this.props.onAuthenticate();
        }
      },
    );
  }

  authLegacy() {
    FingerprintScanner.authenticate({
      onAttempt: this.handleAuthenticationAttemptedLegacy,
    })
      .then(() => {
        if (this.props.handlePopupDismissedLegacy) {
          this.props.handlePopupDismissedLegacy();
        }
        Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
      })
      .catch(error => {
        this.setState({
          errorMessageLegacy: error.message,
          biometricLegacy: error.biometric,
        });
        this.description.shake();
      });
  }

  handleAuthenticationAttemptedLegacy = (error: any) => {
    this.setState({errorMessageLegacy: error.message});
    this.description.shake();
  };

  renderLegacy() {
    const {errorMessageLegacy, biometricLegacy} = this.state;
    const {style, handlePopupDismissedLegacy} = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.contentContainer, style]}>
          <Image
            style={styles.logo}
            source={require('../../assets/finger_print.png')}
          />

          <Text style={styles.heading}>Biometric{'\n'}Authentication</Text>
          <ShakingText
            ref={instance => {
              this.description = instance;
            }}
            style={
              errorMessageLegacy ? styles.descriptionError : styles.description
            }>
            {errorMessageLegacy ||
              `Scan your ${biometricLegacy} on the\ndevice scanner to continue`}
          </ShakingText>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handlePopupDismissedLegacy}>
            <Text style={styles.buttonText}>BACK TO MAIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render = () => {
    if (Platform.OS === 'android') {
      if (this.requiresLegacyAuthentication()) {
        return this.renderLegacy();
      }

      // current API UI provided by native BiometricPrompt
      return null;
    }
    return false;
  };
}
