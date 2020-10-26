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
  Banner,
  Caption,
  Subheading,
  Title,
  Button,
  Text,
  TouchableRipple,
  Searchbar,
  ActivityIndicator
} from 'react-native-paper';
import MainContext from '../Context/mainContext';
import { useNavigation } from '@react-navigation/native';

// import { getDevices, getPlaces, getAssets } from '../service/Devices';
import api from '../utils/APICONST';
import AppStyle from '../Styles/AppStyle';
import Tooltip from 'react-native-walkthrough-tooltip';
import { translate as T } from '../utils/LangHelper';
import * as DataBase from '../utils/AsyncStorage';
import TankCard from '../Components/TankCard';
import { createFilter } from 'react-native-search-filter';
import { FAB } from 'react-native-paper';

const { width, height } = Dimensions.get('window');
const KEYS_TO_FILTERS = ['name', 'type', 'level', 'status'];

const Home = ({ theme, previous, route }) => {
  const { colors } = theme;
  const [contextState, contextDispatch] = useContext(MainContext);
  const [Tip, setTip] = useState(contextState.walkThrough);
  const [Bannar, setBannar] = useState(false);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const cols = theme.AppColumns;
  const Action = (route.params || {}).Action ? route.params.Action : 'ADD';

  const mqttLog = (topic, action, msg) => {
    // console.log(topic, action, msg);
    contextDispatch({ type: 'mqtt', topic, action, payload: msg });
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
  const TanksDataJson = require('../data/Tanks.json');
  const TanksData = TanksDataJson.filter(createFilter(search, KEYS_TO_FILTERS));
  return (
    <>
      <View
        source={require('../assets/images/background.jpg')}
        style={[AppStyle.container, { backgroundColor: theme.colors.background1,}]}>
        <SafeAreaView />
        <View style={style.header}>
          <Searchbar
            style={{ borderRadius: 30, }}
            placeholder={T('searchScreen.title')}
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
        <View
          style={{
            borderBottomWidth: 1,
            width: width,
            marginTop:3,
            opacity: 0.1,
            borderColor: "#000000",
          }} />
        <Banner
          visible={Bannar}
          actions={[
            {
              label: 'Confirm',
              onPress: () => _signOutAsync(),
            },
            {
              label: 'Cancel',
              onPress: () => setBannar(false),
            },
          ]}
          icon={({ size }) => (
            <Image
              source={{
                uri:
                  'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
              }}
              style={{ width: size, height: size, }}
            />
          )}>
          <View style={{ flexDirection: 'column' }}>
            <Subheading>4298642r74_Level</Subheading>
            <Caption>Level meter</Caption>
          </View>
        </Banner>
        <FlatList
          data={TanksData}
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{ opacity: 1, backgroundColor: theme.colors.background1 }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={tag => tag.name}
          renderItem={({ item, index }) => { return (<TankCard item={item} navigation={navigation} />) }}
          ListEmptyComponent={() => {
            return (<Caption>    No Devices HERE</Caption>);
          }}
        />
        <FAB
          style={style.fab}
          icon="plus"
          onPress={() => console.log('Pressed')}
        />
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default withTheme(Home);
