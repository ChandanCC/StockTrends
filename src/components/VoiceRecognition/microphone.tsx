import React, {Component, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  LayoutAnimation,
  Image,
  ScrollView,
  Animated,
} from 'react-native';

const Microphone = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [animated, setAnimated] = useState(new Animated.Value(0));
  const [opacityA, setOpacityA] = useState(new Animated.Value(0));

  const runAnimation = () => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(animated, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityA, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  // const stopAnimation = () => {
  //   Animated.loop(
  //     Animated.parallel([
  //       Animated.timing(animated, {
  //         toValue: 20,
  //       }),
  //       Animated.timing(opacityA, {
  //         toValue,
  //       }),
  //     ]),
  //   ).stop();
  // };
  const onPress = () => {
    setIsPressed(!isPressed);
  };
  const micButton = () => {
    if (!isPressed) {
      //some function
        ();
      return (
        <Animated.View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            // backgroundColor: 'rgba(153,0,0,0.4)',
            opacity: opacityA,
            transform: [
              {
                scale: animated,
              },
            ],
          }}>
          <Image
            style={styles.button}
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
            }}
          />
        </Animated.View>
      );
    } else {
      //some function
      return (
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            // backgroundColor: 'rgba(153,0,0,0.4)',
          }}>
          <Image
            style={styles.button}
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
            }}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>{micButton()}</TouchableOpacity>
    </View>
  );
};

export default Microphone;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  button: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
