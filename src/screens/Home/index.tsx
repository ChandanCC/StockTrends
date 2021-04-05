import React, {useState} from 'react';
import {SafeAreaView, StatusBar, View, Text} from 'react-native';
import colors from '../../config/colors';
import {HomeScreenNavigationProp} from '../../types/Navigation';
import styles from './styles';
import Button from '../../components/Button';
import TextToSpeech from '../../components/VoiceRecognition';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useAppDispatch} from '../../redux/hooks';
import {updateLoggedInUser} from '../../redux/actions/loggedInUser';

const Home = ({navigation}: HomeScreenNavigationProp) => {
  const [voiceRecognition, setVoiceRecognition] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.primaryBackground}
        barStyle="dark-content"
      />

      <TextToSpeech
        visible={voiceRecognition}
        setVisible={(visible: boolean) => {
          setVoiceRecognition(visible);
        }}
        navigateToTrendsScreen={() => {
          navigation.navigate('StockGraphScreen');
        }}
      />
      <View style={styles.mainBtnContainer}>
        <Text style={styles.textStyle}>
          {
            'Try Voice Commands :-\n 1 - Current stock price \n 2 - Stock trends'
          }
        </Text>
        <Button
          title="Voice search"
          onPress={() => {
            setVoiceRecognition(true);
          }}
          buttonTextStyles={styles.buttonTextStyle}
          buttonStyles={{...styles.buttonStyle, marginBottom: 30}}
        />
        <Text style={styles.textStyle}>
          {'Check Stock trends of IBM directly :-'}
        </Text>
        <Button
          title="Graph data"
          onPress={() => {
            navigation.navigate('StockGraphScreen');
          }}
          buttonTextStyles={styles.buttonTextStyle}
          buttonStyles={styles.buttonStyle}
        />
      </View>
      <Button
        title="Logout"
        onPress={async () => {
          dispatch(updateLoggedInUser({token: null}));
          await GoogleSignin.signOut();
        }}
        buttonTextStyles={styles.buttonTextStyle}
        buttonStyles={styles.buttonStyle}
      />
    </SafeAreaView>
  );
};

export default Home;
