/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StatusBar, View, Text, Animated, SafeAreaView} from 'react-native';
import {Constants} from '../../../constants';
import styles from './styles';

var slideAnimationValue = new Animated.Value(0);

export default function SplashScreen(_props: any) {
  // ##### Use Effect #####
  useEffect(() => {
    return Animated.parallel([
      Animated.timing(slideAnimationValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        _props.navigation.replace(Constants.HOME_SCREEN);
      }, 2000);
    });
  }, [_props.navigation]);
  // #####

  return (
    <>
      <StatusBar hidden />
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
