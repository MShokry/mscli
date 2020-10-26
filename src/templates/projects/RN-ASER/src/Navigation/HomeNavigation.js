import React from 'react';
import { I18nManager} from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import DeviceInfo from '../Screens/DeviceInfo';
import DeviceEdit from '../Screens/DeviceEdit';
import Filters from '../Screens/Filters';
import ButtomNav from './ButtomNav';
import { HeaderBackButton } from '@react-navigation/stack';
import { Button } from 'react-native-paper';
import { translate as T } from '../utils/LangHelper';

const AppStack = createStackNavigator();
export default AppStackNav = () => {
  const theme = useTheme();
  return (
    <AppStack.Navigator
      initialRouteName="ButtomNav"
      screenOptions={{
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: theme.colors.background1,
        },
        headerTitleStyle: { alignSelf: 'center' },
      }}>
      <AppStack.Screen
        name="DeviceInfo"
        component={DeviceInfo}
        options={({ route, navigation }) => ({ 
          title: route.params.name,
          headerBackTitle: null,
          headerLeft: (props) => (
            <IconButton
              icon={I18nManager.isRTL ? "arrow-right":"arrow-left"}
              color="black"
              {...props}
              size={30}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: (props) => (
            <Button 
              mode="text" 
            onPress={() => navigation.navigate('DeviceEdit')}>
              {T('Button.edit')}
            </Button>
          ),
        })}
      />
      <AppStack.Screen
        name="DeviceEdit"
        component={DeviceEdit}
        options={({ route, navigation }) => ({ 
          title: T('Screens.deviceEdit'),
          headerBackTitle: null,
          headerLeft: (props) => (
            <IconButton
              icon={I18nManager.isRTL ? "arrow-right" : "arrow-left"}
              color="black"
              style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
              {...props}
              size={30}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: (props) => (
            <Button 
              mode="text" 
            onPress={() => navigation.navigate('DeviceEdit')}>
              {T('Button.edit')}
            </Button>
          ),
        })}
      />
      <AppStack.Screen
        name="Filters"
        component={Filters}
        options={({ navigation }) => ({
          title:  T('Screens.filter'),
          headerBackTitle: '',
          headerRight: (props) => (
            <IconButton
              icon="close"
              color="black"
              {...props}
              size={30}
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeft: null,
        })}
      />
      
      <AppStack.Screen
        name="ButtomNav"
        component={ButtomNav}
      />
    </AppStack.Navigator>
  );
};
