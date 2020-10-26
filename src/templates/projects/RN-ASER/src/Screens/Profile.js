import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Keyboard,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList
} from 'react-native';
import {
  List,
  withTheme,
  Title,
  Button,
} from 'react-native-paper';
import Svg, { LinearGradient, Rect, SvgXml, Stop, G, Defs, Ellipse } from 'react-native-svg';
import MainContext from '../Context/mainContext';
// import { getDevices, getPlaces, getAssets } from '../service/Devices';
import api from '../utils/APICONST';
import AppStyle from '../Styles/AppStyle';
import Tooltip from 'react-native-walkthrough-tooltip';
import { translate as T } from '../utils/LangHelper';
import * as DataBase from '../utils/AsyncStorage';
import TankCard from '../Components/TankCard';

const { width, height } = Dimensions.get('window');

const Profile = ({ theme, navigation, previous, route }) => {
  const { colors } = theme;
  const [contextState, contextDispatch] = useContext(MainContext);

  const _signOutAsync = async () => {
    try {
      DataBase.removeItem('language');
      DataBase.removeItem('walkThrough');
      DataBase.removeItem('userToken');
    } catch (e) {
      console.log('Error Clearing Sorage', e);
    }
    api.setHeaders({});
    // navigation.navigate('Auth');
    contextDispatch({ type: 'LogOutUser' });
  };
  const xml = `
	<!-- This is a linear column gauge. -->
 <svg >
	<defs>
	<linearGradient id="TankFill1" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0%" stop-color="blue" />
		<stop id="TFill1A" offset="70%" stop-color="blue" />
		<stop id="TFill1B" offset="80%" stop-color="white" />
		<stop offset="100%" stop-color="white" />
	</linearGradient>
	</defs>

	<!-- Display tank 1. -->
  <g transform="scale(.10) translate(10,10)">
		<rect x="0" y="0" width="125" height="300" rx="62" fill="url(#TankFill1)" 
			stroke="gray" stroke-width="8"/>
  </g>
  </svg>
  `;

  return (
    <>
      <View
        source={require('../assets/images/background.jpg')}
        style={[AppStyle.container]}>
        <SafeAreaView />
        <View style={style.header}>
          <Title>Test</Title>
        </View>
        {/* <SvgXml xml={xml} width="40" height="40" scale={.3} /> */}
        <Svg width="140" height="340">
          <Defs>
            <LinearGradient id="TankFill1" x1="0" y1="1" x2="0" y2="0" >
              <Stop offset="0%" stop-color="blue" />
              <Stop id="TFill1A" offset="60%" stop-color="blue" />
              <Stop id="TFill1B" offset="80%" stop-color="white" />
              <Stop offset="100%" stop-color="white" />
            </LinearGradient>
          </Defs>
          <G transform="translate(10,10)">
            <Rect x="0" y="0" width="125" height="300" rx="62" fill="url(#TankFill1)"
              stroke="gray" stroke-width="20" />
          </G>
        </Svg>
        <Button
          uppercase={false}
          color={theme.colors.error}
          mode="text"
          labelStyle={{}}
          dense={true}
          onPress={() => _signOutAsync()}>
          {T('SettingScreen.sign_out')}
        </Button>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row-reverse',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 2,
    borderRadius: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default withTheme(Profile);
