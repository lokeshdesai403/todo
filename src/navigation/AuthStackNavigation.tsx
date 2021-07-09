import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Constants} from '../constants';
import {SplashScreen} from '../screens';
import {AppDrawerNavigation} from './';

const Stack = createStackNavigator();

export default function AuthStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={Constants.SPLASH_SCREEN}
      screenOptions={({}) => ({})}>
      <Stack.Screen
        name={Constants.SPLASH_SCREEN}
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Constants.HOME_SCREEN}
        component={AppDrawerNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
