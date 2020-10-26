import React from 'react';
import { createStackNavigator, useRoute } from '@react-navigation/stack';
import AuthLoading from '../Screens/AuthLoading';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './AomeNavigation';

const MainStack = createStackNavigator();

export default ({ contextState }) => {
  return (
    <MainStack.Navigator
      initialRouteName="App"
      screenOptions={{ gestureEnabled: false, headerShown: false }}>
      {contextState.loading ?
        <MainStack.Screen name="AuthLoading" component={AuthLoading} /> : null}
      {((contextState.user || {}).user || {}).accessToken ?
        <MainStack.Screen name="App" component={HomeNavigation} options={{ animationEnabled: false }} /> :
        <MainStack.Screen name="Auth" component={AuthNavigation} options={{ animationEnabled: false }} />
      }
    </MainStack.Navigator>
  );
};
