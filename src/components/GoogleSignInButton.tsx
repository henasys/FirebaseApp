import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
// @ts-ignore
import {REACT_APP_GOOGLE_WEB_CLIENT_ID} from 'react-native-dotenv';

GoogleSignin.configure({
  webClientId: REACT_APP_GOOGLE_WEB_CLIENT_ID,
});

export default function GoogleSignInButton() {
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Light}
      onPress={() => {
        onGoogleButtonPress()
          .then(() => {
            console.log('Signed in with Google!');
          })
          .catch((e) => {
            console.log(e);
          });
      }}
    />
  );
}

async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
