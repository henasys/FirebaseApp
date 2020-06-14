/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import {RootStackParamList} from '../screens/types';

type LoadingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Loading'
>;

type Props = {
  navigation: LoadingScreenNavigationProp;
};

export default function LoadingScreen({navigation}: Props) {
  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      console.log('user', user);
      navigation.replace(user ? 'Main' : 'Login');
    });
    return subscriber;
  }, []);
  return (
    <View style={styles.container}>
      <Text>Loading</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});