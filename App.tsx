/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';

import Navigation from './src/navigation';
import {RootSiblingParent} from 'react-native-root-siblings';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

const App = () => {
  return (
    <RootSiblingParent>
      <Navigation />
    </RootSiblingParent>
  );
};

export default App;
