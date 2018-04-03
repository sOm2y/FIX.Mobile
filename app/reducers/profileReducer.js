import {
  ShowChangePasswordModal,
  HideChangePasswordModal,
  SetUserData,
  SetUserType,
  Logout
} from "../actions/actionTypes";

const initialState = {
  isPasswordChanged: false,
  user: {},
  userType: ""
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ShowChangePasswordModal:
      return { ...state, isPasswordChanged: true };
    case HideChangePasswordModal:
      return { ...state, isPasswordChanged: false };
    case SetUserData:
      return { ...state, user: action.payload };
    case SetUserType:
      return { ...state, userType: action.payload };
    case Logout:
      return { ...state, userType: '', user: {} };
    default:
      return state;
  }
};

export default profileReducer;
