import React, { useReducer } from 'react';

const MainContext = React.createContext();

export const mainReducer = (state, action) => {
  // console.log('$$$$Main Context', action);
  switch (action.type) {
    case 'LogUser':
      return { ...state, loading: false, user: { error: '', user: action.payload, loading: false } };
    case 'StopLoading':
      return { ...state, loading: false,};
    case 'mqtt':
      if (action.topic && action.action && action.payload) {
        return {
          ...state, mqtt: { ...state.mqtt, [action.topic]: { ...state.mqtt[action.topic], [action.action]: action.payload } }
        }
      } else {
        return state;
      }
    case 'LogOutUser':
      return { ...state, loading: true, user: { error: '', user: [], loading: false } };
    case 'UpdateFooterBadge':
      const { cart, notifications } = action.payload;
      if (state.notifications.cart === cart && state.notifications.notifications === notifications) {
        return state;
      } else {
        return { ...state, notifications: { ...state.notifications, cart: cart, notifications: notifications } };
      }
    case 'UpdateFooterBadgeCart':
      if (state.notifications.cart === action.payload) {
        return state;
      } else {
        return { ...state, notifications: { ...state.notifications, cart: action.payload } };
      }
    case 'UpdateFooterBadgeNotifi':
      if (state.notifications.notifications === action.payload) {
        return state;
      } else {
        return { ...state, notifications: { ...state.notifications, notifications: action.payload } };
      }
    default:
      return state;
  }
};

export const initState = {
  user: { error: '', user: { mqtt: {}, user:{}}, loading: false },
  notifications: { notifications: 4, cart: 3, loading: false },
  updated: 0,
  loading: true,
  mqtt: {},
};

export const MainProvider = props => {
  const [contextState, contextDispatch] = useReducer(mainReducer, initState);
  return (
    <MainContext.Provider value={[contextState, contextDispatch]}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContext;
