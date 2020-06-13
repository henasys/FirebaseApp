import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userState) => {
      setUser(userState);
      if (initializing) {
        setInitializing(false);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <View>
        <Text>Login required</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

export default App;
