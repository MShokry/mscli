import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text, withTheme, Avatar, IconButton } from 'react-native-paper';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import Filters from '../Screens/Filters';
import { translate as T } from '../utils/LangHelper';

const ButtomNav = ({ theme, navigation, route }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'device', title: `${T('Buttom.device')}`, icon: 'battery' },
    { key: 'profile', title: `${T('Buttom.profile')}`, icon: 'face' },
    { key: 'contact', title: `${T('Buttom.contact')}`, icon: 'headphones' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    device: Home,
    profile: Profile,
    contact: Filters,
  });
  React.useLayoutEffect(() => {
    console.log(routes[index].title);
    if (index == 0) {
      navigation.setOptions({
        headerTitle: routes[index].title,
        headerRight: () => (
          <IconButton
            icon="filter-outline"
            color="black"
            size={30}
            onPress={() => navigation.navigate('Filters')}
          />
        ),
      });
    }else{
      navigation.setOptions({
      headerTitle: routes[index].title,
        headerRight: null,
      });
    }
  }, [index]);

  return (
    <BottomNavigation
      barStyle={{ backgroundColor: theme.colors.background }}
      activeColor={theme.colors.accent}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
export default withTheme(ButtomNav);
