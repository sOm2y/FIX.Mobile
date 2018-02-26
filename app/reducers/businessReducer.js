import { ShowBusinessModal, HideBusinessModal } from "../actions/actionTypes";

const initialState = { isBusinessModalShowed: false };

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case ShowBusinessModal:
      return { ...state, isBusinessModalShowed: true };
    
    case HideBusinessModal:
      return { ...state, isBusinessModalShowed: false };

    default:
      return state;
  }
};

export default businessReducer;