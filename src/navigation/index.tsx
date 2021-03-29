import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SignIn';
import BiometricScreen from '../screens/Biometric';
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
  if (token) {
    return (
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="SignInScreen" headerMode="none">
          <RootStack.Screen
            name="BiometricScreen"
            component={BiometricScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="SignInScreen" headerMode="none">
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
