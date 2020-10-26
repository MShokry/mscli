import React, { useState } from 'react';
import { Text, View, ImageBackground } from 'react-native';

import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
// if (Platform.OS == 'ios') {
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { logUser, logUserFB, logUserGoogle } from '../service/UsersAPI';
import { SafeAreaView } from 'react-native-safe-area-context';

// }
// GoogleSignin.configure({
//   "client_id": "146825875730-hb0ka3u4243g0bgftf35q8oprfg4jcao.apps.googleusercontent.com",
//   "project_id": "xiot-269920",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "redirect_uris": [
//     "urn:ietf:wg:oauth:2.0:oob",
//     "http://localhost"
//   ]
// });
const SignSel = ({params,}) => {
  const [User, setUser] = useState({ error: '', results: [], loading: false });

  // Somewhere in your code
  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Data', userInfo);
      console.log(userInfo.accessToken.toString());
      const gAccess = JSON.stringify({ 'access_token': userInfo.accessToken.toString() });
      logUserGoogle([gAccess, User, setUser]);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const signInFB = (error, result) => {
    try {
      console.log(error, result);
      if (error) {
        console.log('login has error: ' + result.error);
      } else if (result.isCancelled) {
        console.log('login is cancelled.');
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          console.log('Data', data);
          console.log(data.accessToken.toString());
          const fbAccess = JSON.stringify({ 'access_token': data.accessToken.toString() });
          logUserFB([fbAccess, User, setUser]);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={[{ paddingHorizontal: 5, flex: 1, justifyContent: 'center' }]} >
      <SafeAreaView>

      <Text>SignSel</Text>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")} />
          
      </SafeAreaView>
    </ImageBackground>
  );
}
export default SignSel;
