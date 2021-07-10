import React, {useEffect, useState} from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import { Drawer } from 'react-native-paper';
import { Constants } from '../constants';
import Theme from '../theme/Theme';
import styles from './styles';

export function DrawerContent(props: any) {
  const doLogOut = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want Logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Logout',
          onPress: () => {userLogout()},
        },
      ],
      {cancelable: true},
    );
  };

  const userLogout = () => {
    auth()
      .signOut()
      .then(() => {
        props.navigation.reset({
          index: 0,
          routes: [{
            name: Constants.SPLASH_SCREEN,
          }],
        });
        console.log('User signed out!')
      });
  }

  return (
    <View style={styles.flexStyle}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerMainContainer}>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <Image
              style={styles.drawerCloseIconStyle}
              resizeMode={'contain'}
              source={Theme.icons.ic_close_drawer}
            />
          </TouchableOpacity>
          <Image
            style={styles.drawerMainIconStyle}
            resizeMode={'contain'}
            source={Theme.icons.ic_icon_drawer}
          />
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            label="Home"
            labelStyle={styles.drawerLabelStyle}
            icon={({ size }) => (
              <Image
                resizeMode={'contain'}
                style={{ width: size, height: size }}
                source={Theme.icons.ic_icon_drawer}
              />
            )}
            onPress={() => {
              props.navigation.navigate(Constants.HOME_SCREEN);
            }}
          />
          <DrawerItem
            label={Constants.SETTINGS_SCREEN}
            labelStyle={styles.drawerLabelStyle}
            icon={({ size }) => (
              <Image
                resizeMode={'contain'}
                style={{ width: size, height: size }}
                source={Theme.icons.ic_icon_drawer}
              />
            )}
            onPress={() => {
              props.navigation.navigate(Constants.SETTINGS_SCREEN);
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.drawerLogoutBg}>
        <DrawerItem
          label="Logout"
          labelStyle={styles.logoutStyle}
          onPress={() => {
            doLogOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}
