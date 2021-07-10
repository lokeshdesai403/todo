/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, Animated, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Constants } from '../../../constants';
import Theme from '../../../theme/Theme';
import styles from './styles';

var slideAnimationValue = new Animated.Value(0);

export default function SplashScreen(_props: any) {
  // ##### Main States #####
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState('');
  // #####

  // ##### Use Effect #####
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber();
  }, []);
  // #####

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;

  if (!user) {
    Animated.parallel([
      Animated.timing(slideAnimationValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        _props.navigation.replace(Constants.LOGIN_SCREEN);
      }, 2000);
    })
  } else {
    Animated.parallel([
      Animated.timing(slideAnimationValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        _props.navigation.reset({
          index: 0,
          routes: [{
            name: Constants.HOME_SCREEN,
          }],
        });
      }, 2000);
    })
  }

  return (
    <>
      <StatusBar backgroundColor={Theme.colors.appBgColor} />
      <SafeAreaView style={styles.mainContainerStyle}>
        <Animated.View
          style={{
            transform: [
              {
                translateY: slideAnimationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [800, 0],
                }),
              },
            ],
            flex: 1,
            height: 250,
            width: 200,
            borderRadius: 12,
          }}>
          <View style={styles.mainview}>
            <View style={styles.copyRightMain} />
            <View style={styles.iconMain}>
              <Text style={styles.textAppTitle}>{'Make My List'}</Text>
              <Text style={styles.subTextAppTitle}>
                {'India’s latest list app'}
              </Text>
            </View>
            <View style={styles.copyRightMain}>
              <Text style={styles.textCopyRight}>
                {'© 2021 TLC. All rights reserved.'}
              </Text>
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
    </>
  );
}
