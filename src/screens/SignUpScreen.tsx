import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Text, TextInput, View, Button, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../screens/types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

type Props = {
  navigation: NavigationProp;
};

export default function SignUpScreen({navigation}: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const handleSignUp = () => {
    if (!email || email.length === 0) {
      setError('no email');
      return;
    }
    if (!password || password.length === 0) {
      setError('no password');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((e) => {
        console.log(e.code);
        console.log(e.message);
        setError(e.message);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {error && <Text style={styles.error}>{error}</Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
        />
        <View style={styles.spacer} />
        <Button title="Sign Up" onPress={handleSignUp} />
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.link}>Do have an account already? Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacer: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
  error: {
    color: 'red',
  },
  linkContainer: {
    alignItems: 'center',
  },
  link: {
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
