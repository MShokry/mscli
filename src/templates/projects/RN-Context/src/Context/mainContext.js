import React, { useReducer } from 'react';

const MainContext = React.createContext();

export const mainReducer = (state, action) => {
  // console.log('$$$$Main Context', action);
  switch (action.type) {
    case 'LogUser':
      return { ...state, user: { error: '', user: action.payload, loading: false } };
    case 'StopLoading':
      return { ...state, loading: false, };
    case 'LogOutUser':
      return { ...state, user: { error: '', user: [], loading: false } };
    case 'SetLang':
      return { ...state, Lang: action.payload };
    default:
      return state;
  }
};

export const initState = {
  user: { error: '', user: [], loading: false },
  updated: 0,
  Lang: '',
  theme: 'dark',
  loading: true,
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
