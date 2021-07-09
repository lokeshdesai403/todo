import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, TasksScreenMain, SettingsScreen} from '../screens';
import {Constants} from '../constants';
import Theme from '../theme/Theme';
import styles from './styles';

const Tab = createBottomTabNavigator();

export default function AppTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={Constants.HOME_SCREEN}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;

          if (route.name === Constants.HOME_SCREEN) {
            iconName = focused
              ? Theme.icons.ic_today_selected
              : Theme.icons.ic_today_unselected;
          } else if (route.name === Constants.TASKS_SCREEN) {
            iconName = focused
              ? Theme.icons.ic_tasks_selected
              : Theme.icons.ic_tasks_unselected;
          } else if (route.name === Constants.SETTINGS_SCREEN) {
            iconName = focused
              ? Theme.icons.ic_settings_selected
              : Theme.icons.ic_settings_unselected;
          }

          return (
            <Image
              source={iconName}
              resizeMode={'contain'}
              style={styles.tabBottomImage}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: Theme.colors.appGreen,
        inactiveTintColor: Theme.colors.appGray,
      }}>
      <Tab.Screen name={Constants.HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={Constants.TASKS_SCREEN} component={TasksScreenMain} />
      <Tab.Screen name={Constants.SETTINGS_SCREEN} component={SettingsScreen} />
    </Tab.Navigator>
  );
}
