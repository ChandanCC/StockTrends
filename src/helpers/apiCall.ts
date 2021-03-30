import {ALPHAVANTAGE_API_KEY} from '../config/keys';

const getStockData = async () => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=000002.SHZ&outputsize=full&apikey=${ALPHAVANTAGE_API_KEY}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {
    console.log(err, '<<<Error in api call>>>');
    return {error: err};
  }
};
export default getStockData;
