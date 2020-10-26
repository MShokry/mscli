import {useEffect, useState} from 'react';
import api from './APICONST';

const handeResponse = (response) => {
  let error = '';
  let results = [];
  if (response.problem === 'NETWORK_ERROR') {
    error = 'No Internet Connection, Please Check';
  } else if (response.status >= 200 && response.status < 400) {
    results = response.data;
    if ('message' in response.data) {
      error = response.data.message;
    }
  } else if (response.status >= 400 && response.status < 500) {
    // if (response.status === 400) {
    console.log('type', typeof response.date, Array.isArray(response.data));
    if (typeof response.data === 'string' && !Array.isArray(response.data)) {
      console.log('string');
      error = response.data;
    } else if ('message' in response.data) {
      error = response.data.message;
    } else {
      error = 'Some Thing went Wrong';
    }
    // }
    if (response.status === 401) {
      error = 'Invalid email or password.';
    }
    if (response.status === 402) {
      error = response.data.message;
    }
    console.log('Server Replied with errors', response.data.length);
  } else if (response.status >= 500) {
    error = 'Server Error';
  }
  return [error, results];
};

export const registerUser = async ([user, state, setState]) => {
  try {
    setState({error: '', results: [], loading: true});
    const USER = {
      firstName: user.userFirstName, // "name": "Required|String",
      lastName: user.userLastName, // "name": "Required|String",
      email: user.userEmail, //"email": "Required|Unique",
      password: user.userPassword ? user.userPassword : undefined, //"password": "Required|Any",
      passwordConfirmation: user.userPassword1 ? user.userPassword1 : undefined, //"password": "Required|Any",
      phone: user.userPhone ? user.userPhone : undefined, //"phone": "Optional|Phone:EG"
    };
    const response = await api.post('/auth/signup', USER);
    console.log(response);
    const [error, results] = handeResponse(response);
    setState({results, error, loading: false});
  } catch (err) {
    console.log(err);
    setState({error: 'Some thing went wrong', results: [], loading: false});
  }
};

export const logUser = async ([user, state, setState]) => {
  try {
    setState({error: '', results: [], loading: true});
    const USER = {
      email: user.userEmail, // "email": "m.shokry@dasstack.com",
      password: user.userPassword, // "password": "secret"
    };
    const response = await api.post('/auth/login', USER);
    console.log('Server Response logUser', response);
    const [error, results] = handeResponse(response);
    setState({results, error, loading: false});
  } catch (err) {
    console.log(err);
    setState({error: 'Some Thing went Wrong', results: [], loading: false});
  }
};

export const logUserFB = async ([user, state, setState]) => {
  try {
    setState({error: '', results: [], loading: true});
    const USER = user;
    const response = await api.post('loginWith/facebook', USER);
    console.log('Server Response logUser', response);
    const [error, results] = handeResponse(response);
    setState({results, error, loading: false});
  } catch (err) {
    console.log(err);
    setState({error: 'Some Thing went Wrong', results: [], loading: false});
  }
};

export const logUserGoogle = async ([user, state, setState]) => {
  try {
    setState({error: '', results: [], loading: true});
    const USER = user;
    const response = await api.post('loginWith/google', USER);
    console.log('Server Response logUser', response);
    const [error, results] = handeResponse(response);
    setState({results, error, loading: false});
  } catch (err) {
    console.log(err);
    setState({error: 'Some Thing went Wrong', results: [], loading: false});
  }
};
export const logUserApple = async ([user, state, setState]) => {
  try {
    setState({error: '', results: [], loading: true});
    const USER = user;
    const response = await api.post('/loginWith/apple', USER);
    console.log('Server Response logUser', response);
    const [error, results] = handeResponse(response);
    setState({results, error, loading: false});
  } catch (err) {
    console.log('Error excep', err);
    setState({error: 'Some Thing went Wrong', results: [], loading: false});
  }
};

export const forgetPass = async ([user, state, setState]) => {
  try {
    setState({error: '', results: [], loading: true});
    const USER = {
      email: user.userEmail, // "email": "m.shokry@dasstack.com",
    };
    const response = await api.post('/auth/forget-password', USER);
    console.log('Server Response Forget', response);
    const [error, results] = handeResponse(response);
    setState({results, error, loading: false});
  } catch (err) {
    console.log(err);
    setState({error: 'Some Thing went Wrong', results: [], loading: false});
  }
};

export const updateUser = async ([user, state, setState]) => {
  try {
    setState({error: '', results: [], loading: true});
    const USER = {
      name: user.userName, // "name": "Required|String",
      email: user.userEmail, //"email": "Required|Unique",
      password: user.userPassword, //"password": "Required|Any",
      phone: user.userPhone, //"phone": "Optional|Phone:EG"
    };
    const response = await api.put('/auth/profile', USER);
    console.log(response);
    const [error, results] = handeResponse(response);
    setState({results, error, loading: false});
  } catch (err) {
    console.log(err);
    setState({error: 'Some Thing went Wrong', results: [], loading: false});
  }
};

export const POST = async (url = '', body = null, setState = () => {}) => {
  try {
    setState({error: '', results: [], loading: true});
    const response = await api.put(url, body);
    console.log(response);
    const [error, results] = handeResponse(response);
    setState({results, error, loading: false});
  } catch (err) {
    console.log(err);
    setState({error: 'Some Thing went Wrong', results: [], loading: false});
  }
};
