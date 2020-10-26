import React, {useContext, useEffect, useReducer, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Button,
  Caption,
  HelperText,
  Surface,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
import api from '../../utils/APICONST';
import MainContext from '../../Context/mainContext';
import formReducer from '../../Context/FormReducer';
import {
  logUser,
  logUserFB,
  logUserGoogle,
  logUserApple,
  POST,
} from '../../utils/UsersAPI';
import AppStyle from '../../Styles/AppStyle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {translate as T} from '../../utils/LangHelper';
import * as DataBase from '../../utils/AsyncStorage';
import SwitchSelector from 'react-native-switch-selector';

const SignIn = ({navigation}) => {
  const theme = useTheme();
  const [contextState, contextDispatch] = useContext(MainContext);
  const [lang, setlang] = React.useState(contextState.Lang);
  const [User, setUser] = useState({error: '', results: [], loading: false});

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

  const _isUsernameValid = (name: string) => /^[a-zA-Z]*$/.test(name);
  const {width, height} = Dimensions.get('window');
  const {colors} = theme;

  const loggedUser = async () => {
    const {results} = User;
    console.log('User is Logging');
    const fcmToken = null;
    if ('accessToken' in results) {
      console.log(results);
      const type = results.type ? results.type : 'Bearer';
      const token = `${type} ${results.accessToken}`;
      api.setHeaders({
        authorization: token,
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Accept-Language': lang,
        fcmToken: fcmToken ? fcmToken : undefined,
      });
      const U = {user: results, token};
      DataBase.setItem('userToken', JSON.stringify(U));
      console.log('Welcome USER');
      await contextDispatch({type: 'LogUser', payload: results});
    }
    return null;
  };

  const myRef = React.useRef(null);
  useEffect(() => {
    loggedUser();
  }, [User.results]);

  useEffect(() => {
    DataBase.setItem('language', lang);
    contextDispatch({type: 'SetLang', payload: lang});
  }, [lang]);
  const options = [
    {label: 'EN', value: 'en'},
    {label: 'AR', value: 'ar'},
  ];
  const pos = options
    .map((e) => {
      return e.value;
    })
    .indexOf(contextState.Lang);

  return (
    <>
      <View
        source={require('../../assets/images/background.jpg')}
        style={[{marginHorizontal: theme.AppMargin, flex: 1}]}>
        <SafeAreaView>
          <KeyboardAwareScrollView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View
              style={{
                width: 73,
                alignSelf: 'flex-end',
                marginBottom: 20,
                marginTop: 10,
              }}>
              <SwitchSelector
                options={options}
                value={pos}
                initial={pos}
                height={32}
                borderRadius={15}
                buttonColor={theme.colors.primary}
                backgroundColor={theme.colors.primary3}
                onPress={(value) => setlang(value)}
              />
            </View>
            <Image
              style={[AppStyle.headImage]}
              source={require('../../assets/images/logoMain.png')}
            />
            <Title style={{marginVertical: 30, fontSize: 24, color: 'black'}}>
              {T('loginScreen.title')}
            </Title>
            <TextInput
              mode="outlined"
              placeholderTextColor={theme.colors.connected}
              style={[AppStyle.Input]}
              autoCompleteType="email"
              dense={true}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              name={'user_email'}
              label={T('loginScreen.email')}
              returnKeyType="next"
              onSubmitEditing={() => myRef.current.focus()}
              placeholder="example@domain.com"
              value={state.userEmail}
              onChangeText={(e) => dispatch({type: 'user_email', payload: e})}
            />
            <TextInput
              mode="outlined"
              ref={myRef}
              label={T('loginScreen.password')}
              style={[AppStyle.Input, {}]}
              dense={true}
              secureTextEntry
              value={state.userPassword}
              onSubmitEditing={() => logUser([state, User, setUser])}
              onChangeText={(e) =>
                dispatch({type: 'user_password', payload: e})
              }
            />
            {User.error ? (
              <HelperText
                visible={(User.error || '').length}
                style={AppStyle.headLine}>
                {User.error}
              </HelperText>
            ) : null}
            <Button
              mode="contained"
              style={{height: 47, marginVertical: 10, justifyContent: 'center'}}
              onPress={() => {
                // setUser({ ...User, results: { accessToken: 'test' } })
                const USER = {
                  email: user.userEmail, // "email": "m.shokry@dasstack.com",
                  password: user.userPassword, // "password": "secret"
                };
                POST((url = 'auth'), (body = USER), (setState = setUser));
                //logUser([state, User, setUser])
              }}
              loading={User.loading}
              dark
              disabled={User.loading}>
              {T('loginScreen.login_button')}
            </Button>

            <Button
              compact
              uppercase={false}
              mode="text"
              labelStyle={[
                AppStyle.headLine,
                {color: colors.error, marginTop: 15},
              ]}
              onPress={() => navigation.push('Forget')}>
              {T('loginScreen.forget_password')}
            </Button>
            {/* <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}> */}
            <Button
              uppercase={false}
              mode="text"
              labelStyle={{}}
              dense={true}
              // style={{ width: '65%', marginBottom: 50, height: 37, justifyContent: 'center' }}
              onPress={() => navigation.push('SignUp')}>
              {T('registerScreen.signup_button')}
            </Button>
            {/* </View> */}
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>

      {/* </KeyboardAvoidingView> */}
    </>
  );
};

SignIn.navigationOptions = ({navigation}) => ({
  headerTitle: () => null,
  headerRight: () => null,
  headerLeft: () => null,
  headerShown: false,
});

export default SignIn;
