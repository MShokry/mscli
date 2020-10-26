import React from 'react';
import { createStackNavigator, useRoute } from '@react-navigation/stack';
import SignIn from '../Screens/Auth/SignIn';
import SignUp from '../Screens/Auth/SignUp';
import ForgetPass from '../Screens/Auth/ForgetPass';

const AuthStack = createStackNavigator();
export default () => {
  return (
    <AuthStack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <AuthStack.Screen name="SignIn" component={SignIn} options={{ title: 'My app' }} />
      <AuthStack.Screen name="SignUp" component={SignUp} options={{ title: 'My app' }} />
      <AuthStack.Screen name="ForgetPass" component={ForgetPass} options={{ title: 'My app' }} />
    </AuthStack.Navigator>
  );
};

