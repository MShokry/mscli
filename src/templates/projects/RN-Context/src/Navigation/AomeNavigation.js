import React from 'react';
import { createStackNavigator, useRoute } from '@react-navigation/stack';


const AppStack = createStackNavigator();
export default AppStackNav = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <AppStack.Screen name="Home" component={Home} options={{ title: 'My app' }} />
    </AppStack.Navigator>
  );
};
