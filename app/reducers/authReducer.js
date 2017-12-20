import { Login, Logout, RegisterSuccess } from "../actions/actionTypes";

const initialState = { isLoggedIn: false };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Login:
      return { ...state, isLoggedIn: true };

    case Logout:
      return { ...state, isLoggedIn: false };

    case RegisterSuccess:
      return { ...state, isLoggedIn: true };

    default:
      return state;
  }
};

export default authReducer;