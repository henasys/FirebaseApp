import * as React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../screens/types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: NavigationProp;
};

export default function MainScreen({navigation}: Props) {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>();
  React.useEffect(() => {
    const {currentUser} = auth();
    setUser(currentUser);
  }, []);
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.replace('Loading');
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <View style={styles.container}>
      <Text>{user ? user.email : ''}</Text>
      <View style={styles.spacer} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    padding: 5,
  },
});
