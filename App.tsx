import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import LoadingScreen from './src/screens/LoadingScreen';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';

import {RootStackParamList} from './src/screens/types';

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null);
  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged((_user) => {
      console.log('App user', _user);
      setUser(_user);
      setLoading(false);
    });
    return subscriber;
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
