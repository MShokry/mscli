import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Keyboard,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  List,
  withTheme,
  Banner,
  Appbar,
  Avatar,
  Title,
  Button,
  Text,
  TouchableRipple,
  Searchbar,
} from 'react-native-paper';
import MainContext from '../Context/mainContext';
// import { getDevices, getPlaces, getAssets } from '../service/Devices';
import api from '../utils/APICONST';
import AsyncStorage from '@react-native-community/async-storage';
import AppStyle from '../Styles/AppStyle';
import Tooltip from 'react-native-walkthrough-tooltip';
import {translate as T} from '../utils/LangHelper';
import * as DataBase from '../utils/AsyncStorage';

const {width, height} = Dimensions.get('window');

const Home = ({theme, navigation, previous, route}) => {
  const {colors} = theme;
  const [contextState, contextDispatch] = useContext(MainContext);
  const {error, user, loading} = contextState.user;
  // console.log('Context State Main', contextState);
  const [Tip, setTip] = useState(contextState.walkThrough);
  const [Bannar, setBannar] = useState(false);
  const [search, setSearch] = useState('');

  const cols = theme.AppColumns;
  const Action = (route.params || {}).Action ? route.params.Action : 'ADD';

  const mqttLog = (topic, action, msg) => {
    // console.log(topic, action, msg);
    contextDispatch({type: 'mqtt', topic, action, payload: msg});
  };

  const _signOutAsync = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log('Error Clearing Sorage', e);
    }
    api.setHeaders({});
    // navigation.navigate('Auth');
    contextDispatch({type: 'LogOutUser'});
  };
  const _onRefresh = () => {
    // getPlaces([Places, setPlaces]);
    // getDevices([Devices, setDevices]);
    // getAssets([Assets, setAssets]);
  };
  const _searchByName = (name) => {
    let filter = {};
    // searchApi({ filter, state, dispatch })
  };
  return (
    <>
      <View
        source={require('../assets/images/background.jpg')}
        style={[AppStyle.container]}>
        <SafeAreaView />
        <View style={style.header}>
          <Searchbar
            placeholder="ابحث"
            onChangeText={(query) => {
              setSearch(query);
            }}
            value={search}
            onSubmitEditing={() => {
              Keyboard.dismiss();
              _searchByName(search);
            }}
            onIconPress={() => {
              Keyboard.dismiss();
              _searchByName(search);
            }}
          />
        </View>

        <Banner
          visible={Bannar}
          actions={[
            {
              label: 'Fix it',
              onPress: () => _signOutAsync(),
            },
            {
              label: 'Learn more',
              onPress: () => setBannar(false),
            },
          ]}
          icon={({size}) => (
            <Image
              source={{
                uri:
                  'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
              }}
              style={{
                width: size,
                height: size,
              }}
            />
          )}>
          There was a problem processing a transaction on your credit card.
        </Banner>

        <Tooltip
          isVisible={Tip === 1}
          content={<Text>Check this out!</Text>}
          placement="top"
          onClose={() => {
            setTip(Tip + 1);
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <Title style={AppStyle.headLineBold}> Rooms</Title>
          </View>
        </Tooltip>
        <View style={{height: 70}} />
        <Tooltip
          isVisible={Tip === 2}
          content={<Text>And This!</Text>}
          placement="top"
          onClose={() => {
            setTip(0);
            contextDispatch({type: 'walkThrough', payload: false});
            DataBase.setItem('walkThrough', 'Done');
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
            <Title style={AppStyle.headLineBold}> Rooms</Title>
          </View>
        </Tooltip>
        {/* <List.Section>
        </List.Section> */}
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
          <Title style={AppStyle.headLineBold}> Assets</Title>
        </View>
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
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default withTheme(Home);
