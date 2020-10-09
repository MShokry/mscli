import React, { useState, useEffect, useContext } from 'react';
import { View, ImageBackground, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView, InteractionManager } from 'react-native';
import { Caption, List, withTheme, Chip, Banner, Appbar, Avatar, ActivityIndicator, HelperText, IconButton, Portal, Dialog, Title, Button, Text, TouchableRipple } from 'react-native-paper';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import MainContext from '../service/Context';
import { getDevices, getPlaces, getAssets } from '../service/Devices';
import api from '../service/APICONST';
import AsyncStorage from '@react-native-community/async-storage';
import AppStyle from '../style/AppStyle';
import Place from '../components/Place';
import Device from '../components/Device';
// import { useFocusEffect } from '@react-navigation/native';
import Asset from '../components/Asset';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

let mqtt1 = require('mqtt/dist/mqtt');
// let mqtt1 = require('@taoqf/react-native-mqtt');
let client;

const Home = ({ theme, navigation, previous, route }) => {
  const { colors } = theme;
  const [contextState, contextDispatch] = useContext(MainContext);
  const { error, user, loading } = contextState.user;
  // console.log('Context State Main', contextState);
  const [Places, setPlaces] = useState({ error: '', results: [], loading: false });
  const [Devices, setDevices] = useState({ error: '', results: [], loading: false });
  const [Assets, setAssets] = useState({ error: '', results: [], loading: false });
  const [Bannar, setBannar] = useState(false);
  const [Ipdail, setIpdail] = useState(false);
  const [Ip, setIp] = useState('test');
  const [MqttStatus, setMqttStatus] = useState(false);
  const cols = theme.AppColumns;
  const mr = theme.AppMargin;
  const Action = (route.params || {}).Action ? route.params.Action : 'ADD';

  const mqttLog = (topic, action, msg) => {
    // console.log(topic, action, msg);
    contextDispatch({ type: 'mqtt', topic, action, payload: msg });
  };

  const _signOutAsync = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log('Error Clearing Sorage', e);
    }
    api.setHeaders({});
    // navigation.navigate('Auth');
    contextDispatch({ type: 'LogOutUser', });
  };
  const _onRefresh = () => {
    getPlaces([Places, setPlaces]);
    getDevices([Devices, setDevices]);
    getAssets([Assets, setAssets]);
  };
  useEffect(() => {
    getPlaces([Places, setPlaces]);
    getDevices([Devices, setDevices]);
    getAssets([Assets, setAssets]);
    const { mqtt } = user;
    if (mqtt && mqtt.username) {
      const us = {
        clientId: 'RN_' + Math.random().toString(16).substr(2, 8),
        username: mqtt.username,
        password: mqtt.password,
        protocolId: 'MQIsdp',
        protocolVersion: 3,
        keepalive: 30,
      };
      // client = mqtt1.connect('ws://192.168.1.16:1883/', us);
      client = mqtt1.connect('ws://xmqtt.xiot.cloud:3000/', us);
      // let client = mqtt1.connect('mqtt://xmqtt.xiot.cloud:1883/', us);
      client.on('connect', function () {
        console.log('#MQTT connecting');
        setMqttStatus(true);
      });
      client.on('reconnecting', function () {
        console.log('#MQTT re-connecting');
      });
      client.on('message', function (topic, message) {
        const subTopic = topic.split('/');
        if (subTopic.length === 4) {
          // console.log('Message Recived', message.toString(), subTopic);
          const cmand = subTopic[1];
          const device = subTopic[2];
          const action = subTopic[3];
          let msg = {};
          try {
            msg = JSON.parse(message);
          } catch {
            msg = message.toString();
          }
          console.log('#MQTT Command', subTopic, msg);
          switch (cmand) {
            case 'stat':
              mqttLog(device, action, msg);
              break;
            case 'cmnd':
              // do something
              break;
            case 'tele':
              mqttLog(device, action, msg);
              break;
          }
        }
      });
      client.on('error', function (topic, message) {
        console.log('#MQTT MMMMMMError', topic);
      });
      client.on('close', function () {
        console.log('#MQTT disconnect');
        setMqttStatus(false);
      });
      return () => { client.end(); }
    } else {
      _signOutAsync();
    }
  }, [navigation, Action]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     let isActive = true;
  //     const fetchUser = async () => {
  //       try {
  //         if (isActive) {
  //           getPlaces([Places, setPlaces]);
  //           getDevices([Devices, setDevices, isConfigured]);
  //           getAssets([Assets, setAssets]);
  //         }
  //       } catch (e) {
  //         // Handle error
  //       }
  //     };
  //     fetchUser();
  //     return () => {
  //       isActive = false;
  //     };
  //   }, [Action])
  // );

  useEffect(() => {
    if (MqttStatus && Devices.results.length) {
      for (let i = 0; i < Devices.results.length; i++) {
        const sub = `/stat/${Devices.results[i].name}/#`;
        try {
          client.subscribe(sub, function (err) {
            if (!err) {
              // console.log('#MQTT Suscribed To ', sub);
              const subReq = `/cmnd/${Devices.results[i].name}/STATUS`;
              // client.publish(subReq, '00');
              if (Devices.results[i].name.startsWith("xChip") && !Devices.results[i].isConfigured) {
                console.log("Adding Device");
                client.publish(subReq, '00');
                setTimeout(() => {
                  _onRefresh();
                }, 1000);
              } else {
                client.publish(subReq, '10');
                client.publish(subReq, '11');
              }
            }
          });
        } catch (error) {
          console.log("unable to subscribe", error);
        }

        const subT = `/tele/${Devices.results[i].name}/#`;
        client.subscribe(subT, function (err) {
          if (!err) {
            // console.log('#MQTT Suscribed To ', subT);
          }
        });
      }
    }
  }, [MqttStatus, Devices.results]);

  // const SensorFilter = Assets.results.filter(item => {
  //   return (item.type !== 'sensor');
  // });
  // console.log('##mqtt##', contextState.mqtt);
  const P = Places.results.find(it => (it || {}).initial === true);
  let Placess = { results: [] }
  if (P && P.places) {
    Placess.results = (P || {}).places;
  }
  return (
    <>
      <ImageBackground source={require('../assets/images/background.jpg')} style={[AppStyle.container]}>
        <SafeAreaView />
        <View style={style.header}>
          <TouchableOpacity onPress={() => { navigation.push('Profile', { Places, setPlaces, Assets, setAssets, Devices, setDevices }) }}>
            <Avatar.Image
              size={45}
              source={{ uri: 'https://xiot-assets.s3.me-south-1.amazonaws.com/generic/png/xiot-generic-2.png', }}
            />
          </TouchableOpacity>
          <Title> Hi, {(user.user || {}).firstName}   </Title>
          {previous ? (
            <Appbar.BackAction onPress={navigation.pop} color={theme.colors.primary} />
          ) : null}
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
          icon={({ size }) => <Image
            source={{ uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4' }}
            style={{
              width: size,
              height: size,
            }}
          />
          }>There was a problem processing a transaction on your credit card.</Banner>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <Title style={AppStyle.headLineBold}>  Rooms</Title>
        </View>
        <List.Section>
          <Place Places={Placess} client={client} />
        </List.Section>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <Title style={AppStyle.headLineBold}>  Assets</Title>
        </View>
        <Asset Assets={Assets} client={client} onRefresh={_onRefresh} Places={Placess} />
        <View style={[{ height: 3, width: '100%', }, MqttStatus ? { backgroundColor: 'green' } : { backgroundColor: 'red' }]}></View>

      </ImageBackground>
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
