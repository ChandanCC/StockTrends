// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {StatusBar, SafeAreaView, ActivityIndicator} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Toast from 'react-native-root-toast';

import colors from '../../config/colors';
import {RootStackParamList} from '../../types/Navigation';
import styles from './styles';
import HighChart from '../../components/Highchart';
import getStockData from '../../helpers/apiCall';

type HomeScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  'HomeScreen'
>;

enum ERROR_MESSAGES {
  DEFAULT = 'Something went wrong!',
  SIGN_IN_CANCELLED = 'Sign In Cancelled',
  PLAY_SERVICES_NOT_AVAILABLE = 'Google Play Services not available',
}

type IApiData = {
  'Meta Data': {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Output Size': string;
    '5. Time Zone': string;
  };
  'Time Series (Daily)': {
    [date: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. adjusted close': string;
      '6. volume': string;
      '7. dividend amount': string;
      '8. split coefficient': string;
    };
  };
};

const Home = ({navigation}: HomeScreenNavigationProp) => {
  const [visible, setVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<ERROR_MESSAGES>(
    ERROR_MESSAGES.DEFAULT,
  );

  const [chartData, setChartData] = useState<Array<Array<string>>>([]);
  const transformData = (data: IApiData) => {
    const transformedData = [];
    Object.keys(data['Time Series (Daily)']).forEach((date: string) => {
      transformedData.push([
        new Date(date).getTime(),
        Number(data['Time Series (Daily)'][date]['1. open']),
        Number(data['Time Series (Daily)'][date]['2. high']),
        Number(data['Time Series (Daily)'][date]['3. low']),
        Number(data['Time Series (Daily)'][date]['4. close']),
      ]);
    });
    return transformedData.reverse();
  };
  useEffect(() => {
    const getGraphData = async () => {
      const rawData = await getStockData();
      if (rawData.error) {
        console.log(rawData.error);
        setToastMessage('Unable to fetch stock data');
        setToastVisible();
      } else {
        const transformedData = transformData(rawData);
        setChartData(transformedData);
      }
    };
    getGraphData();
  });

  const setToastVisible = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  var conf = {
    rangeSelector: {
      selected: 1,
      buttons: [
        {
          type: 'month',
          count: 1,
          text: 'Day',
          title: 'View daily',
          dataGrouping: {
            forced: true,
            units: [['day', [1]]],
          },
        },
        {
          type: 'year',
          count: 1,
          text: 'Month',
          title: 'View monthly',
          dataGrouping: {
            forced: true,
            units: [['month', [1]]],
          },
        },
        {
          type: 'all',
          text: 'Year',
          title: 'View yearly',
          dataGrouping: {
            forced: true,
            units: [['year', [1]]],
          },
        },
      ],
    },
    title: {
      text: 'Time Series (Daily)',
    },
    legend: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    series: [
      {
        type: 'candlestick',
        name: 'Time Series (Daily)',
        data: chartData,
        dataGrouping: {
          units: [
            [
              'week', // unit name
              [1], // allowed multiples
            ],
            ['month', [1, 2, 3, 4, 6]],
          ],
        },
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      {chartData.length ? (
        <HighChart style={styles.chart} config={conf} stock={true} />
      ) : (
        <ActivityIndicator size="large" color={colors.primaryBackground} />
      )}
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

export default Home;
