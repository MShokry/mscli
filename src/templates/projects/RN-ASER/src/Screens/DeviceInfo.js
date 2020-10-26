import React, { useState } from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
import {
  Caption,
  Paragraph,
  Subheading,
  Title,
  withTheme,
} from 'react-native-paper';
import Svg, { SvgXml } from 'react-native-svg';
import AppStyle from '../Styles/AppStyle';
import { translate as T } from '../utils/LangHelper';

const DeviceInfo = ({ theme, navigation, }) => {
  return (
    <View
      source={require('../assets/images/background.jpg')}
      style={[AppStyle.container, { backgroundColor: theme.colors.background1, }]}>
      <Caption>mmmm</Caption>
    </View>
  );
};

export default withTheme(DeviceInfo);

const styles = StyleSheet.create({
});
