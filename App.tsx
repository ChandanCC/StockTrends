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
import React, {useEffect} from 'react';

import Navigation from './src/navigation';
import {RootSiblingParent} from 'react-native-root-siblings';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Text} from 'react-native';

GoogleSignin.configure();

const App = () => {
  useEffect(() => {
    let oldRender = Text.render;
    Text.render = function (...args: any) {
      let origin = oldRender.call(this, ...args);
      return React.cloneElement(origin, {
        style: [{fontFamily: 'Arial'}, origin.props.style],
      });
    };
  }, []);

  return (
    <RootSiblingParent>
      <Navigation />
    </RootSiblingParent>
  );
};

export default App;
