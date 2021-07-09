import React, {useEffect} from 'react';
import {Text, SafeAreaView} from 'react-native';
import styles from './styles';

export default function SettingsScreen(_props: any) {
  // ##### Use Effect #####
  useEffect(() => {
    //
  }, []);
  // #####

  return (
    <SafeAreaView style={styles.mainview}>
      <Text style={styles.textAppTitle}>{'Settings'}</Text>
    </SafeAreaView>
  );
}
