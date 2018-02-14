import { ShowBusinessForm } from "../actions/actionTypes";

const initialState = { isBusinessFormShowed: false };

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case ShowBusinessForm:
      return { ...state, isBusinessFormShowed: true };

    default:
      return state;
  }
};

export default businessReducer;