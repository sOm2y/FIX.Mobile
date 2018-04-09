import {
  ShowQuoteModal,
  HideQuoteModal,
  SetUserData,
  SetUserType,
  Logout,
  SubmitQuoteSuccess,
  SubmitQuote,
  SubmitQuoteFailed
} from '../actions/actionTypes';

const initialState = {
  isQuoteModalOpened: false,
  errorResult: ''
};

const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ShowQuoteModal:
      return { ...state, isQuoteModalOpened: true };
    case HideQuoteModal:
      return { ...state, isQuoteModalOpened: false };

    case SubmitQuote:
      return { ...state };
    case SubmitQuoteSuccess:
      return { ...state, isQuoteModalOpened: false };
    case SubmitQuoteFailed:
      return { ...state, isQuoteModalOpened: true, errorResult: action.payload };

    default:
      return state;
  }
};

export default quoteReducer;
