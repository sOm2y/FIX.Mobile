import {
  ShowQuoteModal,
  HideQuoteModal,
  ShowQuoteDetailModal,
  HideQuoteDetailModal,
  SetUserData,
  SetUserType,
  Logout,
  SubmitQuoteSuccess,
  SubmitQuote,
  SubmitQuoteFailed,
  UpdateQuote,
  UpdateQuoteSuccess,
  UpdateQuoteFailed
} from '../actions/actionTypes';

const initialState = {
  isQuoteModalOpened: false,
  isQuoteDetailModalOpened: false,
  isUpdating: false,
  errorResult: '',
  quoteDetail: {}
};

const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ShowQuoteModal:
      return { ...state, isQuoteModalOpened: true };
    case HideQuoteModal:
      return { ...state, isQuoteModalOpened: false };

    case ShowQuoteDetailModal:
      return {
        ...state,
        isQuoteDetailModalOpened: true,
        quoteDetail: action.payload
      };
    case HideQuoteDetailModal:
      return { ...state, isQuoteDetailModalOpened: false };

    case UpdateQuote:
      return { ...state, isUpdating: true };
    case UpdateQuoteSuccess:
      return { ...state, isUpdating: false, isQuoteDetailModalOpened: false };
    case UpdateQuoteFailed:
      return {
        ...state,
        isUpdating: false,
        errorResult: action.payload,
        isQuoteDetailModalOpened: true
      };

    case SubmitQuote:
      return { ...state };
    case SubmitQuoteSuccess:
      return { ...state, isQuoteModalOpened: false };
    case SubmitQuoteFailed:
      return {
        ...state,
        isQuoteModalOpened: true,
        errorResult: action.payload
      };

    default:
      return state;
  }
};

export default quoteReducer;
