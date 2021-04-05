// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
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
  'current price',
];

enum RESULT_TYPES {
  NO_MATCH_FOUND = 'NO_MATCH_FOUND',
  CURRENT_STOCK_PRICE = 'CURRENT_STOCK_PRICE',
  STOCK_TRENDS = 'STOCK_TRENDS',
}

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
  const [loading, setLoading] = useState(false);
  const [currentStockPrice, setCurrentStockPrice] = useState('');

  const setVoiceResult = (result: Array<string> | string | null) => {
    console.log(result);
    if (result) {
      if (typeof result === 'object') {
        setResults(result);
      } else {
        setResults([result]);
      }
    }
  };

  const matchResult = (result: Array<string> | string | null) => {
    if (result) {
      if (typeof result === 'object') {
        let foundResult = RESULT_TYPES.NO_MATCH_FOUND;
        result.forEach(value => {
          if (
            STOCK_TRENDS_EXPECTED_RESULTS.includes(String(value).toLowerCase())
          ) {
            foundResult = RESULT_TYPES.STOCK_TRENDS;
          }
          if (
            CURRENT_PRICE_EXPECTED_RESULTS.includes(String(value).toLowerCase())
          ) {
            foundResult = RESULT_TYPES.CURRENT_STOCK_PRICE;
          }
        });
        return foundResult;
      } else {
        if (
          STOCK_TRENDS_EXPECTED_RESULTS.includes(String(result).toLowerCase())
        ) {
          return RESULT_TYPES.STOCK_TRENDS;
        }
        if (
          CURRENT_PRICE_EXPECTED_RESULTS.includes(String(result).toLowerCase())
        ) {
          return RESULT_TYPES.CURRENT_STOCK_PRICE;
        }
      }
      return RESULT_TYPES.NO_MATCH_FOUND;
    } else {
      return RESULT_TYPES.NO_MATCH_FOUND;
    }
  };

  useEffect(() => {
    function onSpeechStart() {
      setError(null);
      setStarted('√');
    }
    function onSpeechEnd() {
      setStarted('');
    }

    async function onSpeechResults(e) {
      console.log(e);
      setVoiceResult(e.value);
      try {
        await Voice.stop();
      } catch {
        setError('Something went wrong!');
      }

      const result = matchResult(e.value);
      console.log(result);
      if (result === RESULT_TYPES.STOCK_TRENDS) {
        setVisible(false);
        navigateToTrendsScreen();
      } else if (result === RESULT_TYPES.CURRENT_STOCK_PRICE) {
        setLoading(true);
        getCurrentStockPrice()
          .then(stockData => {
            setLoading(false);
            if (!stockData.error) {
              setResults([]);
              setCurrentStockPrice(stockData.result[0].regularMarketPrice);
            }
          })
          .catch(() => {
            setLoading(false);
            setResults([]);
            setError('Something went wrong!');
          });
      }
    }
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [setVisible, navigateToTrendsScreen]);

  const startRecognizing = async () => {
    setCurrentStockPrice(null);
    setError(null);
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
    setError(null);
    setStarted('');
    setResults([]);
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => setVisible(false)}>
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
        {console.log(results, '(()()()')}
        {results.length ? (
          <Text key={'result'} style={styles.stat}>
            {`"${results[0]}"`}
          </Text>
        ) : null}
        {currentStockPrice ? (
          <Text
            style={{
              color: colors.white,
            }}>{`Current stock price for IBM is: ${currentStockPrice}`}</Text>
        ) : null}
        {error ? (
          <Text
            style={{
              color: colors.red,
            }}>
            {error}
          </Text>
        ) : null}
        <TouchableOpacity
          onPress={!started ? startRecognizing : stopRecognizing}
          style={styles.micBtn}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.primaryBackground} />
          ) : !started ? (
            <SimpleLineIcons name="microphone" color={colors.white} size={50} />
          ) : (
            <IonIcons name="close" color={colors.white} size={ms(50)} />
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
}
