import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { AuthStackNavigation } from './src/navigation';
import Theme from './src/theme/Theme';

const App: () => React$Node = () => {

  useEffect(() => {
    requestUserPermission()

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // console.log('Message handled in the background!', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // console.log( 'CLICK NOTIFICATION 2' );
          // console.log('TT = '+ navigationRef.current)
        }
      });

    messaging().onNotificationOpenedApp(remoteMessage => {
      // console.log('CLICK NOTIFICATION')
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(JSON.stringify(remoteMessage));

      let message: any = remoteMessage;
      let title: string = message.notification.title;
      let body: string = message.notification.body;
      
      Alert.alert(
        title,
        body
      );


    });

    return unsubscribe;
  }, [])

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken()
      // console.log('Authorization status:', authStatus);
    }
  }

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      storeData(fcmToken)
      // console.log("TOKEN === " + fcmToken);
      // console.log("Your Firebase Token is:", fcmToken);
    } else {
      // console.log("Failed", "No token received");
    }
  }

  const storeData = async (fcmToken: any) => {
    // console.log("TOKEN" + fcmToken);
    try {
      await AsyncStorage.setItem( 'fcmToken', fcmToken );
      retrieveData()
    } catch (error) {
      // Error saving data
    }
  }

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('fcmToken');
      if (value !== null) {
        // console.log("TOKEN" + value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />
      <NavigationContainer>
        <AuthStackNavigation />
      </NavigationContainer>
    </>
  );
};

export default App;
