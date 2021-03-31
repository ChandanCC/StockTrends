// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableHighlight,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Voice from '@react-native-community/voice';
import colors from '../../config/colors';

import IonIcons from 'react-native-vector-icons/Ionicons';
import {ms} from '../../config/scale';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import styles from './styles';
import {getCurrentStockPrice} from '../../helpers/apiCall';
const STOCK_TRENDS_EXPECTED_RESULTS = [
  'stock trends of ibm',
  'stock trend of ibm',
  'stock trend',
  'stock trends',
];
const CURRENT_PRICE_EXPECTED_RESULTS = [
  'current prices of ibm',
  'current price of ibm',
  'current stock price of ibm',
  'current stock prices of ibm',
  'current stock price',
];

export default function TextToSpeech({
  visible,
  setVisible,
  navigateToTrendsScreen,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  navigateToTrendsScreen: () => void;
}) {
  const [started, setStarted] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [currentStockPrice, setCurrentStockPrice] = useState('');

  useEffect(() => {
    function onSpeechStart() {
      setStarted('√');
    }
    function onSpeechEnd() {
      setStarted('');
    }

    function onSpeechError(e: SpeechErrorEvent) {
      setError(JSON.stringify(e.error));
    }
    function onSpeechResults(e) {
      setResults(e.value);

      if (
        STOCK_TRENDS_EXPECTED_RESULTS.includes(String(e.value).toLowerCase())
      ) {
        stopRecognizing();
        setVisible(false);
        navigateToTrendsScreen();
      } else if (
        CURRENT_PRICE_EXPECTED_RESULTS.includes(String(e.value).toLowerCase())
      ) {
        stopRecognizing();
        getCurrentStockPrice()
          .then(stockData => {
            if (!stockData.error) {
              setCurrentStockPrice(stockData.result[0].postMarketPrice);
            }
          })
          .catch(error => {
            setError(JSON.stringify(error.error));
          });
      }
    }
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [setVisible, navigateToTrendsScreen]);
  const startRecognizing = async () => {
    setCurrentStockPrice(null);
    setError('');
    setStarted('');
    setResults([]);
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    setCurrentStockPrice(null);
    setError('');
    setStarted('');
    setResults([]);
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal animationType="slide" visible={visible}>
      <SafeAreaView style={styles.container}>
        <TouchableHighlight
          onPress={() => {
            setVisible(false);
          }}
          style={styles.action}>
          <IonIcons name="close" color={colors.white} size={ms(30)} />
        </TouchableHighlight>
        <Text style={styles.welcome}>
          {'Ask Jarvix any question \nabout your business'}
        </Text>
        <ScrollView style={{maxHeight: 200}}>
          {results.map((result, index) => {
            return (
              <Text key={`result-${index}`} style={styles.stat}>
                {`"${result}"`}
              </Text>
            );
          })}
        </ScrollView>
        {currentStockPrice ? (
          <Text
            style={{
              color: colors.white,
            }}>{`Current stock price for IBM is: ${currentStockPrice}`}</Text>
        ) : null}
        <TouchableOpacity
          onPress={!started ? startRecognizing : stopRecognizing}
          style={styles.micBtn}>
          {!started ? (
            <SimpleLineIcons name="microphone" color={colors.white} size={50} />
          ) : (
            <IonIcons name="close" color={colors.white} size={ms(50)} />
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}
