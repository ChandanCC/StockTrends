import {ALPHAVANTAGE_API_KEY} from '../config/keys';

const getStockData = async () => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=HT_TRENDLINE&symbol=IBM&interval=daily&series_type=close&apikey=${ALPHAVANTAGE_API_KEY}`,
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

const getCurrentStockPrice = async () => {
  try {
    const response = await fetch(
      'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=IBM',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            'd7ffdc4dfemsh400f13d00f9c6f2p14f28fjsn01ecdca81fa0',
          'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
        },
      },
    );
    const jsonResponse = await response.json();
    return jsonResponse.quoteResponse;
  } catch (err) {
    console.log(err, '<<<Error in api call>>>');
    return {error: err};
  }
};

export {getStockData, getCurrentStockPrice};
