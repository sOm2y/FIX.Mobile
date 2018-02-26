import {ShowChangePasswordModal, HideChangePasswordModal, SetUserData} from "../actions/actionTypes";

const initialState = { isPasswordChanged: false,
                       user:{
                         
                       } };

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ShowChangePasswordModal:
      return { ...state, isPasswordChanged: true };
    case HideChangePasswordModal:
      return { ...state, isPasswordChanged: false };
    case SetUserData:
      return { ...state, user:action.user}
    default:
      return state;
  }
};

export default profileReducer;