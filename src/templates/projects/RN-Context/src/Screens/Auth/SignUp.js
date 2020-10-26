import React, { useReducer, useState, useContext, useRef } from 'react';
import {
  ImageBackground,
  View,
  Image,
  SafeAreaView
} from 'react-native';
import { Surface, TextInput, HelperText, withTheme, Theme, Caption, Colors, Button, Title, Text } from 'react-native-paper';
import formReducer from '../../Context/FormReducer';
import MainContext from '../../Context/mainContext';
import AppStyle from '../../Styles/AppStyle';
import { registerUser } from '../../utils/UsersAPI';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { translate as T } from '../../utils/LangHelper';

const MAX_LENGTH = 20;
type Props = {
  theme: Theme;
};

const SignUp = ({ navigation, theme }) => {
  const [contextState, contextDispatch] = useContext(MainContext);
  const form = {
    isPassword: true,
    iceEye: 'eye-off',
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    userPhone: '',
    userPassword: '',
    userPassword1: '',
    maxLengthName: 20,
  };
  const [state, dispatch] = useReducer(formReducer, form);
  const [User, setUser] = useState({ error: '', results: [], loading: false })

  const _isUsernameValid = (name: string) => /^[a-zA-Z]*$/.test(name);

  const { colors } = theme;
  // const image = require('../../assets/images/background.jpg');

  const lastNameRef = useRef();
  const eMailRef = useRef();
  const PwdRef = useRef();
  const rPwdRef = useRef();

  return (
    <View
      source={require('../../assets/images/background.jpg')}
      style={[{ marginHorizontal: theme.AppMargin, paddingHorizontal: 5, flex: 1 }]}>
      <SafeAreaView>
        <KeyboardAwareScrollView>
          <Image style={[AppStyle.headImage,]} source={require('../../assets/images/logoMain.png')} />
          <Title style={{ marginVertical: 30, fontSize: 24, color: 'black' }}>{T('registerScreen.title')}</Title>
          <View style={{}}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  style={AppStyle.Input}
                  mode="outlined"
                  dense={true}
                  label={T('registerScreen.username')}
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => lastNameRef.current.focus()}
                  autoCorrect={false}
                  value={state.userFirstName}
                  onChangeText={e => dispatch({ type: 'user_first_name', payload: e })}
                />
              </View>
              <View style={{ flex: 1, paddingHorizontal: 5 }}>
                <TextInput
                  ref={lastNameRef}
                  style={AppStyle.Input}
                  mode="outlined"
                  label={T('registerScreen.username')}
                  dense={true}
                  returnKeyType="next"
                  onSubmitEditing={() => eMailRef.current.focus()}
                  autoCapitalize="words"
                  autoCorrect={false}
                  value={state.userLastName}
                  onChangeText={e => dispatch({ type: 'user_last_name', payload: e })}
                />
              </View>
            </View>
            <TextInput
              ref={eMailRef}
              onSubmitEditing={() => PwdRef.current.focus()}
              selectionColor={theme.colors.selectionColor}
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
              returnKeyType="next"
              placeholder="example@domain.com"
              value={state.userEmail}
              label={T('registerScreen.email')}
              onChangeText={e => dispatch({ type: 'user_email', payload: e })}
            />
            {/* <Caption style={AppStyle.headLine}>{T('registerScreen.password')}</Caption> */}
            <TextInput
              ref={PwdRef}
              mode="outlined"
              style={[AppStyle.Input, {}]}
              secureTextEntry
              dense={true}
              label={T('registerScreen.password')}
              returnKeyType="next"
              onSubmitEditing={() => rPwdRef.current.focus()}
              selectionColor={theme.colors.selectionColor}
              value={state.userPassword}
              onChangeText={(e) => dispatch({ type: 'user_password', payload: e })}
            />
            {/* <Caption style={AppStyle.headLine}>{T('registerScreen.password_confirm')}</Caption> */}
            <TextInput
              ref={rPwdRef}
              mode="outlined"
              dense={true}
              style={[AppStyle.Input, {}]}
              secureTextEntry
              label={T('registerScreen.password_confirm')}
              selectionColor={theme.colors.selectionColor}
              value={state.userPassword1}
              onSubmitEditing={() => registerUser([state, User, setUser])}
              onChangeText={(e) => dispatch({ type: 'user_password1', payload: e })}
            />
            <HelperText visible={(User.error || '').length}>
              {User.error}
            </HelperText>
            <Button
              mode="contained"
              dark
              style={{ height: 47, marginVertical: 10, justifyContent: 'center' }}
              onPress={() => registerUser([state, User, setUser])}
              loading={User.loading}
              disabled={User.loading}>
              Sign up
            </Button>

            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20, justifyContent: 'center' }}>
              <Button
                mode="text"
                uppercase={false}
                style={{ width: '65%', marginBottom: 50 }}
                onPress={() => navigation.navigate('SignIn')}>
                Sign in
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default withTheme(SignUp);
