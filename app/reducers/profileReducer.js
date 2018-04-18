import {
  ShowChangePasswordModal,
  HideChangePasswordModal,
  SetUserData,
  SetUserAuth,
  Logout
} from '../actions/actionTypes';

const initialState = {
  isPasswordModalOpened: false,
  user: {},
  userType: undefined,
  access_token: undefined
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ShowChangePasswordModal:
      return { ...state, isPasswordModalOpened: true };
    case HideChangePasswordModal:
      return { ...state, isPasswordModalOpened: false };
    case SetUserData:
      return { ...state, user: action.payload };
    case SetUserAuth:
      return {
        ...state,
        userType: action.payload.userType,
        access_token: action.payload.access_token
      };
    case Logout:
      return { ...state, userType: undefined, user: {}, access_token: undefined };
    default:
      return state;
  }
};

export default profileReducer;
