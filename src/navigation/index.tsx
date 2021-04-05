import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SignIn';
import BiometricScreen from '../screens/Biometric';
import StockGraphScreen from '../screens/StockGraph';
import HomeScreen from '../screens/Home';
import {RootStackParamList} from '../types/Navigation';
import {useAppSelector} from '../redux/hooks';

const RootStack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  const loggedInUser = useAppSelector(state => state.loggedInUser);
  console.log(loggedInUser);
  if (loggedInUser.token) {
    return (
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName={'BiometricScreen'}
          headerMode="none">
          <RootStack.Screen
            name="BiometricScreen"
            component={BiometricScreen}
          />
          <RootStack.Screen name="HomeScreen" component={HomeScreen} />
          <RootStack.Screen
            name="StockGraphScreen"
            component={StockGraphScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
  console.log('Sda');
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={'SignInScreen'} headerMode="none">
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
