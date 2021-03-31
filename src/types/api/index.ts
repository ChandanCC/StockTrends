export enum ERROR_MESSAGES {
  DEFAULT = 'Something went wrong!',
  SIGN_IN_CANCELLED = 'Sign In Cancelled',
  ERROR_IN_FETCHING_STOCKS = 'Unable to fetch stock data',
  PLAY_SERVICES_NOT_AVAILABLE = 'Google Play Services not available',
}

export type IApiData = {
  'Meta Data': {
    '1: Symbol': string;
    '2: Indicator': string;
    '3: Last Refreshed': string;
    '4: Interval': string;
    '5: Series Type': string;
    '6: Time Zone': string;
  };
  'Technical Analysis: HT_TRENDLINE': {
    [date: string]: {
      HT_TRENDLINE: string;
    };
  };
};
