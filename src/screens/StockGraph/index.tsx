import React, {useEffect, useState} from 'react';
import {StatusBar, SafeAreaView, ActivityIndicator, View} from 'react-native';
import Toast from 'react-native-root-toast';

import colors from '../../config/colors';
import {StockGraphScreenNavigationProp} from '../../types/Navigation';
import styles from './styles';
import HighChart from '../../components/Highchart';
import {getStockData} from '../../helpers/apiCall';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ERROR_MESSAGES, IApiData} from '../../types/api';

const StockGraph = ({navigation}: StockGraphScreenNavigationProp) => {
  const [visible, setVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<ERROR_MESSAGES>(
    ERROR_MESSAGES.DEFAULT,
  );

  const [chartData, setChartData] = useState<
    Array<Array<string | number | Date>>
  >([]);
  const transformData = (data: IApiData) => {
    const transformedData: Array<Array<number>> = [];
    Object.keys(data['Technical Analysis: HT_TRENDLINE']).forEach(
      (date: string) => {
        transformedData.push([
          new Date(date).getTime(),
          Number(data['Technical Analysis: HT_TRENDLINE'][date].HT_TRENDLINE),
        ]);
      },
    );
    return transformedData.reverse();
  };
  useEffect(() => {
    const getGraphData = async () => {
      const rawData = await getStockData();
      if (rawData.error) {
        setToastMessage(ERROR_MESSAGES.ERROR_IN_FETCHING_STOCKS);
        setToastVisible();
      } else {
        const transformedData = transformData(rawData);
        setChartData(transformedData);
      }
    };
    getGraphData();
  }, []);

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
      text: 'IBM trends',
    },
    legend: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    series: [
      {
        type: 'spline',
        name: 'IBM trends',
        data: chartData,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={[styles.backButton]}>
        <Icon
          name="reply"
          size={34}
          color={colors.white}
          onPress={() => navigation.goBack()}
        />
      </View>
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

export default StockGraph;
