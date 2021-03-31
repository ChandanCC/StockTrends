import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SignIn';
import BiometricScreen from '../screens/Biometric';
import StockGraphScreen from '../screens/StockGraph';
import HomeScreen from '../screens/Home';
import {RootStackParamList} from '../types/Navigation';
import {getDataFromAsyncStore} from '../helpers/asyncStorage';

const RootStack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const retrievedToken = await getDataFromAsyncStore();
      setToken(retrievedToken);
    };
    getToken();
  }, []);
  // if (token) {
  //   return (
  //     <NavigationContainer>
  //       <RootStack.Navigator initialRouteName="SignInScreen" headerMode="none">
  //         <RootStack.Screen name="SignInScreen" component={SignInScreen} />
  //       </RootStack.Navigator>
  //     </NavigationContainer>
  //   );
  // }
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={!token ? 'BiometricScreen' : 'SignInScreen'}
        headerMode="none">
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
        <RootStack.Screen name="BiometricScreen" component={BiometricScreen} />
        <RootStack.Screen name="HomeScreen" component={HomeScreen} />
        <RootStack.Screen
          name="StockGraphScreen"
          component={StockGraphScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
