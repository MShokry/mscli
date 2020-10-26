import React, {useEffect, useContext} from 'react';
import {
  ActivityIndicator,
  View,
  Image,
  Dimensions,
} from 'react-native';

import api from '../utils/APICONST.js';
import MainContext from '../Context/mainContext';
import * as DataBase from '../utils/AsyncStorage';
// import * as Lang from '../utils/LangHelper';

const {width, height} = Dimensions.get('window');

const AuthLoading = ({navigation}) => {
  const [contextState, contextDispatch] = useContext(MainContext);

  // Fetch the token from storage then navigate to our appropriate place
  const _bootstrapAsync = async () => {
    let T = '';
    console.log('Loading Storage');
    // const U = await AsyncStorage.getItem('userToken');
    const langSymbol = (await DataBase.getItem('language')) || 'en';
    contextDispatch({type: 'SetLang', payload: langSymbol});
    console.log('langSymbol', langSymbol);
    const walkThrough = await DataBase.getItem('walkThrough');
    if (walkThrough === 'Done') {
      contextDispatch({type: 'walkThrough', payload: 0});
    } else {
      contextDispatch({type: 'walkThrough', payload: 1});
    }
    // const token = await DataBase.getItem("accessToken");
    const U = await DataBase.getItem('userToken');
    console.log('U', U);
    if (U !== undefined && U !== null) {
      console.log('Finding Token');
      try {
        const {token, user} = JSON.parse(U);
        T = token;
        if (T) {
          console.log('token', T);
          api.setHeaders({
            authorization: T,
            Accept: 'application/json',
            'Content-type': 'application/json',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            'Accept-Language': langSymbol,
          });
          contextDispatch({type: 'LogUser', payload: user});
        }
      } catch (e) {
        console.log('user', e);
      }
    }
    console.log('Auth NAvigate');
    contextDispatch({type: 'StopLoading'});
  };

  useEffect(() => {
    try {
      setTimeout(_bootstrapAsync, 500);
    } catch (error) {
      contextDispatch({type: 'StopLoading'});
      console.log('Error', error);
    }
  }, []);
  const image = require('../assets/images/background.jpg');
  return (
    <>
      <View
        source={image}
        colors={['#eadccf', '#526b7d']}
        style={{flex: 1, alignContent: 'center', alignItems: 'center'}}>
        <Image
          style={{flex: 1, width: width*.5}}
          resizeMode="contain"
          source={require('../assets/images/logoMain.png')}
        />
        <ActivityIndicator />
      </View>
    </>
  );
};

export default AuthLoading;
