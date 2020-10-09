import React from 'react';

import { DefaultTheme, DarkTheme, configureFonts } from 'react-native-paper';
import { Platform } from 'react-native';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Futura-Demi',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Futura-Bold',
      fontWeight: 'bold',
    },
    medium: {
      fontFamily: 'Futura-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Futura-Book',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Futura-Light',
      fontWeight: '100',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Futura-Dem',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Futura-Bold',
      fontWeight: 'bold',
    },
    medium: {
      fontFamily: 'Futura-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Futura-Boo',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Futura-Lig',
      fontWeight: '100',
    },
  },
};

export const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(46,43,124)',
    primary3: 'rgba(46,43,124,.1)',
    accent: "#0c0",
    text: '#00c',
    text1: '#EBEBEB',
    disabled: '#29000000',
    underlineColor: 'transparent',
    placeholder: '#43434340',
    background: '#fff',
    background1: 'rgba(235, 235, 235, 0.9)',
    background2: '#343434',
    surface: '#b00',
    selectionColor: '#434343',
    surface1: '#526B7D',
    connected: '#7AB18B',
    error: '#e02020',
  },
  AppMargin: 20,
  AppColumns: 3,
  AppPadding: 10,
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
