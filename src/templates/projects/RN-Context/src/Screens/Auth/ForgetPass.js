import React, { useReducer, useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';
import { Surface, TextInput, HelperText, useTheme, Theme, Caption, Colors, Button, Title, Text } from 'react-native-paper';
import api from '../../utils/APICONST';
import MainContext from '../../Context/mainContext';
import AppStyle from '../../Styles/AppStyle';
import { forgetPass } from '../../utils/UsersAPI';

const MAX_LENGTH = 20;

// type Props = {
//   theme: Theme;
// };

const ForgetPass = ({ navigation }) => {
  const theme = useTheme();
  const [contextState, contextDispatch] = useContext(MainContext);

  const form = {
    isPassword: true,
    iceEye: 'eye-off',
    userPassword: '',
    userEmail: '',
    UserName: '',
    userPhone: '',
    maxLengthName: 20,
  };

  const [state, dispatch] = useReducer(formReducer, form);
  const [User, setUser] = useState({ error: '', results: [], loading: false });

  const _isUsernameValid = (name: string) => /^[a-zA-Z]*$/.test(name);
  const { width, height } = Dimensions.get('window');
  const { colors } = theme;

  const loggedUser = async () => {
    const { results } = User;
    console.log('User is Logging');
    const fcmToken = null;
    if ('accessToken' in results) {
      console.log(results);
      const type = results.type ? results.type : 'Bearer';
      const token = `${type} ${results.accessToken}`;
      const { mqtt } = results;
      console.log(mqtt);
      api.setHeaders({
        authorization: token,
        Accept: "application/json",
        "Content-type": "application/json",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        fcmToken: fcmToken ? fcmToken : undefined,
      });
      const U = { user: results, token };
      await AsyncStorage.setItem('userToken', JSON.stringify(U));
      console.log('Welcome USER');
      await contextDispatch({ type: 'LogUser', payload: results });
      // navigation.reset({ index: 0, routes: [{ name: 'App' }], });
      // navigation.navigate('App');
    }
    return null;
  };

  useEffect(() => {
    loggedUser();
  }, [User.results]);

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/background.jpg')}
        style={[{ paddingHorizontal: 5, flex: 1, justifyContent: 'flex-end' }]}>

        <SafeAreaView />
        <Image style={AppStyle.headImage} source={require('../../assets/images/logoMain.png')} />
        <Surface style={AppStyle.boxMain}>
          <Title style={AppStyle.MainText}>Forget Password</Title>

          <Caption>Please write down your email and check your
inbox to reset your password linked with your account.</Caption>
          <TextInput
            mode="outlined"
            dense
            style={AppStyle.Input}
            autoCompleteType="email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            selectionColor={theme.colors.selectionColor}
            name={'user_email'}
            placeholder="example@domain.com"
            value={state.userEmail}
            onChangeText={e => dispatch({ type: 'user_email', payload: e })}
          />
          <HelperText visible={(User.error || '').length}>
            {User.error}
          </HelperText>
          <Button
            mode="contained"
            uppercase={false}
            style={{ backgroundColor: colors.accent, width: '40%', height: 37, alignSelf: 'center', marginBottom: 10, justifyContent: 'center' }}
            onPress={() => forgetPass([state, User, setUser])}
            loading={User.loading}
            dark
            disabled={User.loading}>
            Reset Password
        </Button>
        </Surface>
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20, justifyContent: 'center' }}>
          <Button
            mode="contained"
            style={{ width: '65%', marginBottom: 50 }}
            onPress={() => navigation.navigate('SignIn')}>
            Sign In
              </Button>
        </View>
      </ImageBackground>
    </>
  );
};


export default ForgetPass;
