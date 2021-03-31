import React, {useState} from 'react';
import {SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';
import colors from '../../config/colors';
import {HomeScreenNavigationProp} from '../../types/Navigation';
import styles from './styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Button from '../../components/Button';
import TextToSpeech from '../../components/VoiceRecognition';

const Home = ({navigation}: HomeScreenNavigationProp) => {
  const [voiceRecognition, setVoiceRecognition] = useState(false);

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

      <TouchableOpacity
        onPress={() => {
          setVoiceRecognition(true);
        }}
        style={styles.micBtn}>
        <SimpleLineIcons name="microphone" color={colors.white} size={50} />
      </TouchableOpacity>
      <Button
        title="Graph data"
        onPress={() => {
          navigation.navigate('StockGraphScreen');
        }}
        buttonTextStyles={styles.buttonTextStyle}
        buttonStyles={styles.buttonStyle}
      />
    </SafeAreaView>
  );
};

export default Home;
