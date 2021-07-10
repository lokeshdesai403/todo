import React from 'react';
import {Image, TouchableOpacity, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import {AppTabNavigation, DrawerContent} from './';
import {SettingsScreen} from '../screens';
import {Constants} from '../constants';
import Theme from '../theme/Theme';
import styles from './styles';

const Drawer = createDrawerNavigator();

function HamburgerIcon({navigation}: {navigation: any}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}>
      <Image
        style={styles.menuIconStyle}
        resizeMode={'contain'}
        source={Theme.icons.ic_menu_drawer}
      />
    </TouchableOpacity>
  );
}

export default function AppDrawerNavigation({navigation}: {navigation: any}) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name={Constants.HOME_SCREEN}
        component={AppTabNavigation}
        options={({}) => ({
          headerShown: true,
          headerStyle: {backgroundColor: Theme.colors.white},
          headerTitle: () => (
            <Text style={styles.textTopHeader}>{Constants.HOME_SCREEN}</Text>
          ),
          headerLeft: () => <HamburgerIcon navigation={navigation} />,
          headerTitleAlign: 'left',
        })}
      />
      <Drawer.Screen
        name={Constants.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={({}) => ({
          headerShown: true,
          headerStyle: {backgroundColor: Theme.colors.white},
          headerTitle: () => (
            <Text style={styles.textTopHeader}>
              {Constants.SETTINGS_SCREEN}
            </Text>
          ),
          headerLeft: () => <HamburgerIcon navigation={navigation} />,
          headerTitleAlign: 'left',
        })}
      />
    </Drawer.Navigator>
  );
}
