import AsyncStorage from '@react-native-async-storage/async-storage';

export enum AsyncStoreKeys {
  LOGIN_TOKEN = 'login_token',
}

export const storeDataToAsyncStore = async (
  key = AsyncStoreKeys.LOGIN_TOKEN,
  value: any,
) => {
  try {
    if (typeof value === 'object') {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } catch (error) {
    console.log(error, '<<<Error in storing data in async storage>>>');
  }
};

export const getDataFromAsyncStore = async (
  key = AsyncStoreKeys.LOGIN_TOKEN,
) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log(error, '<<<Error in retrieving data from async storage>>>');
    return null;
  }
};

export const clearDataFromAsyncStore = async (
  key = AsyncStoreKeys.LOGIN_TOKEN,
) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error, '<<<Error in clearing data from async storage>>>');
  }
};
