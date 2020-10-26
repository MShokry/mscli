import React, { useState } from 'react';
import { StyleSheet, View, Image, Platform, TouchableOpacity, I18nManager } from 'react-native';
import {
  Caption,
  Paragraph,
  Subheading,
  Title,
} from 'react-native-paper';
import Svg, { SvgXml } from 'react-native-svg';
import AppStyle from '../Styles/AppStyle';
import { translate as T } from '../utils/LangHelper';

const TankCard = ({ navigation, theme, item }) => {
  const xml = `
	<!-- This is a linear column gauge. -->
 <svg >
	<defs>
	<linearGradient id="TankFill1" x1="0" y1="1" x2="0" y2="0">
    <stop offset="0%" stop-color="#3575cc" />
		<stop id="TFill1A" offset="${item.level - 3}%" stop-color="#3575cc" />
		<stop id="TFill1B" offset="${item.level}%" stop-color="#e5edf8" />
		<stop offset="100%" stop-color="#e5edf8" />
	</linearGradient>
	</defs>

	<!-- Display tank 1. -->
  <g transform="scale(.30) translate(130,15)">
    <rect x="0" y="0" width="140" height="300" rx="50" fill="url(#TankFill1)" 
    stroke="#659dea" stroke-width="15" />
    <text x="25" y="150" fontWeight="bold" fill="#02296b" fontSize="50">${item.level}%</text>
  </g>
  </svg>
  `;

  return (
    <TouchableOpacity
      onPress={() => { navigation.navigate('DeviceInfo', { name: item.name, item }) }}>
      <View style={[{ marginTop: 10, backgroundColor: '#fff', borderRadius: 10, }, I18nManager.isRTL ? { flexDirection: 'row-reverse'}:{ flexDirection: 'row'}]}>
        <View
          style={{ padding: 1, flex: 0.25, backgroundColor: '#f4f4f4', margin: 10, borderRadius: 4, justifyContent: 'center', alignItems: 'center', }}>
          <SvgXml xml={xml} width="120" height="92" />
          {item.alert_type == 'yellow' ?
            <Image
              style={{ position: 'absolute', right: 5, top: 5 }}
              source={require('../assets/images/tank/errorIcon.png')}
            />
            : null}
        </View>
        <View style={{ padding: 1, flex: 0.60, marginLeft: 10, justifyContent: 'center', alignItems: 'flex-start', }}>
            <Title>{item.name}</Title>
            <Subheading>{item.type}</Subheading>
            <Paragraph>
              status{' '}
              <Paragraph style={{ color: item.alert_type }}>{item.status}</Paragraph>
            </Paragraph>
            <Caption>last update {item.last_update}</Caption>
          </View>
        <View style={[styles.circle, item.connected ? { backgroundColor: '#6dd400' } : { backgroundColor: '#b3b5b8' }]} />
      </View>
    </TouchableOpacity>
  );
};

export default TankCard;

const styles = StyleSheet.create({
  circle: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    position: 'absolute',
    margin: 16,
    top: 0,
    right: 0,
  },
});
