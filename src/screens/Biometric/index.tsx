import {StackScreenProps} from '@react-navigation/stack';
import React, {Component} from 'react';
import {View, Text, Platform} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {RootStackParamList} from '../../types/Navigation';

type BiometricScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  'BiometricScreen'
>;

export default class Biometric extends Component<BiometricScreenNavigationProp> {
  componentDidMount() {
    if (Platform.OS === 'ios') {
      FingerprintScanner.authenticate({
        description: 'Scan your fingerprint on the device scanner to continue',
      })
        .then(() => {
          this.handlePopupDismissed({success: true});
        })
        .catch(error => {
          this.handlePopupDismissed(error);
        });
    }
  }

  handlePopupDismissed = (data: any) => {
    console.log(data);
  };

  render() {
    if (Platform.OS === 'ios') {
      return (
        <View>
          <Text>Test Ios</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>Test Android</Text>
      </View>
    );
  }
}
