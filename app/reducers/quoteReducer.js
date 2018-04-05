import {
    ShowQuoteModal,
    HideQuoteModal,
    SetUserData,
    SetUserType,
    Logout
  } from "../actions/actionTypes";
  
  const initialState = {
    isQuoteModalOpened: false,
    user: {},
    userType: ""
  };
  
  const quoteReducer = (state = initialState, action) => {
    switch (action.type) {
      case ShowQuoteModal:
        return { ...state, isQuoteModalOpened: true };
      case HideQuoteModal:
        return { ...state, isQuoteModalOpened: false };
     
      default:
        return state;
    }
  };
  
  export default quoteReducer;
  