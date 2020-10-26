import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Button, Caption, Checkbox, Subheading, Title} from 'react-native-paper';
import AppStyle from '../Styles/AppStyle';
import {translate as T} from '../utils/LangHelper';

const Check = ({theme, navigation, title, data, state, setState}) => {
  return (
    <>
      <Title>{title}</Title>
      {data.map((item) => {
        return (
          <View key={item} style={{flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox.Android
              status={
                state?.[title]?.indexOf(item) > -1 ? 'checked' : 'unchecked'
              }
              onPress={() => {
                if (state?.[title]?.indexOf(item) > -1) {
                  const idx = state[title].indexOf(item);
                  let Checked = state[title];
                  Checked.splice(idx, 1);
                  // console.log(state[title], '$$UChecked$$',Checked);
                  setState({...state, [title]: Checked});
                } else {
                  let Checked = state[title] ? state[title] : [];
                  Checked.push(item);
                  // console.log(state[title], '$$Checked$$', Checked);
                  setState({ ...state, [title]: Checked});
                }
              }}
            />
            <Subheading> {item}</Subheading>
          </View>
        );
      })}
    </>
  );
};

const Filters = ({theme, navigation}) => {
  const [type, setType] = useState({});

  return (
    <View
      source={require('../assets/images/background.jpg')}
      style={[AppStyle.container]}>
      <SafeAreaView />
      <Caption>ddd</Caption>
      <Check
        title="Type"
        data={['Level Meter', 'Tamam']}
        state={type}
        setState={setType}
      />
      <Check
        title="Connection"
        data={['Connected', 'Not Connected']}
        state={type}
        setState={setType}
      />
      <Check
        title="Warning"
        data={['All', 'High Water Consumbtion', 'underflow', 'overflow']}
        state={type}
        setState={setType}
      />
      <Check
        title="Error"
        data={[
          'All',
          'Pressure Sensor Malfunction',
          'Tank Depth',
          'Floaters Malfunction',
          'Pump Failure',
        ]}
        state={type}
        setState={setType}
      />
      <Button
        mode="contained"
        style={{ height: 47, marginVertical: 10, justifyContent: 'center' }}
        onPress={() => {
          console.log(type);
        }}
        loading={false}
        dark
        disabled={false}>
        {T('Button.filter')}
      </Button>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({});
