const formReducer = (state, action) => {
  switch (action.type) {
    case 'user_name':
      return { ...state, userName: action.payload }
    case 'user_first_name':
      return { ...state, userFirstName: action.payload }
    case 'user_last_name':
      return { ...state, userLastName: action.payload }
    case 'user_email':
      return { ...state, userEmail: action.payload }
    case 'user_password':
      return { ...state, userPassword: action.payload }
    case 'user_password1':
      return { ...state, userPassword1: action.payload }
    case 'user_phone':
      return { ...state, userPhone: action.payload }
    case 'change_PWD_type':
      return { ...state, isPassword: !state.isPassword, iceEye: state.isPassword ? "eye" : "eye-off" }
    default:
      return state;
  }
};

export default formReducer;
