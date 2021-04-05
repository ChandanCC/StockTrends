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
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Text} from 'react-native';
import store, {persister} from './src/redux/configureStore';

GoogleSignin.configure({
  webClientId:
    '958386309025-2juuj60fbukn707imcl0mnqhu6j7tr2j.apps.googleusercontent.com',
});

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <RootSiblingParent>
          <Navigation />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};

export default App;
