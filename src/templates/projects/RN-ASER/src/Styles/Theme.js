import React from 'react';

import { DefaultTheme, DarkTheme, configureFonts } from 'react-native-paper';
import { Platform } from 'react-native';

const fontConfig = {
  default: {
    egular: {
      fontFamily: 'Poppins-Regular',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Poppins-Bold',
      fontWeight: 'bold',
    },
    medium: {
      fontFamily: 'Poppins-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Poppins-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Poppins-Light',
      fontWeight: '100',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Poppins-Regular',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Poppins-Bold',
      fontWeight: 'bold',
    },
    medium: {
      fontFamily: 'Poppins-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Poppins-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Poppins-Light',
      fontWeight: '100',
    },
  },
};

export const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#000',
    primary: 'rgb(46,43,124)',
    primary3: 'rgba(46,43,124,.1)',
    accent: "#2e2b7c",
    text: '#000',
    text1: '#EBEBEB',
    disabled: '#29000000',
    underlineColor: 'transparent',
    placeholder: '#43434340',
    background1: 'rgb(245,249,255)',
    background: '#fff',
    background2: '#343434',
    surface: '#EBEBEB',
    // surface: 'rgba(142, 142, 147, 0.1)',
    selectionColor: '#434343',
    surface1: '#526B7D',
    connected: '#7AB18B',
    error: '#e02020',
  },
  AppMargin: 20,
  AppColumns: 3,
  AppPadding: 20,
};
// fonts: Platform.OS === 'ios' ? fontConfig.ios : fontConfig.default,

export const themeDark = {
  ...DarkTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    accent: '#EBEBEB',
    primary: '#434343',
    background: '#434343',
    surface: '#EBEBEB',
    text: '#EBEBEB',
    text1: '#434343',
    placeholder: '#749094',
    background2: '#343434',
    surface1: '#C4B1A1',
    connected: '#7AB18B',
    error: '#CC5A5A',
  },
  AppMargin: 5,
  AppColumns: 3,
  AppPadding: 10,
  fonts: Platform.OS === 'ios' ? fontConfig.ios : fontConfig.default,
};

let themeOs = theme;

export default themeOs;
