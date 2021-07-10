/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, Animated, SafeAreaView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {HelperText} from 'react-native-paper';
import {Constants, Validations} from '../../../constants';
import Theme from '../../../theme/Theme';
import {InterfaceLoginData} from '../';
import styles from './styles';

var slideAnimationValue = new Animated.Value(0);

export default function LoginScreen(_props: any) {

  const [textUserEmail, setTextUserEmail] = useState<InterfaceLoginData['email']>('');
  const [textUserPassword, setTextUserPassword] = useState<InterfaceLoginData['password']>('');

  const [showEmailError, setShowEmailError] = useState<boolean>(false);
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);

  // ##### Use Effect #####
  useEffect(() => {

  }, []);
  // #####

  // ##### Validation & Login #####
  const isAllValid = () => {
    let isValid = true;

    setShowEmailError(false)
    setShowPasswordError(false)

    if (!Validations.isValidEmail(textUserEmail)) {
      isValid = false;
      setShowEmailError(true)
    } else if (!Validations.isValidPassword(textUserPassword)) {
      isValid = false;
      setShowPasswordError(true)
    }

    return isValid;
  }

  const doLogin = () => {
    auth()
      .signInWithEmailAndPassword(textUserEmail, textUserPassword)
      .then((response: any) => {
        console.log('User account signed in! -- ' + JSON.stringify(response));
        storeData(response.user.email, response.user.uid)
        _props.navigation.reset({
          index: 0,
          routes: [{
            name: Constants.HOME_SCREEN,
          }],
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
    
        console.error(error);
      });
  }

  const storeData = async (email: string, uid: string) => {
    try {
      await AsyncStorage.setItem( 'userEmail', email );
      await AsyncStorage.setItem( 'userId', uid );
    } catch (error) {
      // Error saving data
    }
  }
  // #####

  return (
    <>
      <StatusBar backgroundColor={Theme.colors.appBgColor} />
      <SafeAreaView style={styles.mainContainerStyle}>
        <View style={styles.mainview}>
          <View style={{ marginHorizontal: 20, flex: 15, justifyContent: 'center' }}>
            <View>
              <Text style={styles.textTitleMain}>{'Email'}</Text>
              <View style={styles.textInputBg}>
                <TextInput
                  onChangeText={email => setTextUserEmail(email)}
                  style={styles.textInputStyle}
                  keyboardType={'email-address'}
                  autoCapitalize='none'
                  numberOfLines={1} />
              </View>
              {(showEmailError) ?
                <HelperText style={styles.errorStyle} type="error" visible={true}>
                  Email address is invalid!
                </HelperText> : null
              }
              <Text style={styles.textTitleMain}>{'Password'}</Text>
              <View style={styles.textInputBg}>
                <TextInput
                  onChangeText={pass => setTextUserPassword(pass)}
                  style={styles.textInputStyle}
                  keyboardType={'default'}
                  autoCapitalize='none'
                  maxLength={10}
                  secureTextEntry={true}
                  numberOfLines={1} />
              </View>
              {(showPasswordError) ?
                <HelperText style={styles.errorStyle} type="error" visible={true}>
                  Password must be alpha numeric!
                </HelperText> : null
              }
              <TouchableOpacity style={{ marginTop: 50 }} onPress={() => {
                if (isAllValid()) {
                  doLogin()
                }
              }}>
                <View style={styles.buttonStyle}>
                  <Text style={styles.textButtonStyle}>{'Login'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.viewBottomRegister}>
            <View style={{ flex: 4 }}>
              <Text style={styles.textRegisterStyle}>
                {'Don\'t have account?'}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                _props.navigation.navigate(Constants.REGISTER_SCREEN)
              }}>
                <View>
                  <Text style={styles.textRegisterStyleClick}>{'Register'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
