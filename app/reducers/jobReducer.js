import { TradieFinder } from "../actions/actionTypes";

const initialState = { searchResult: {} };

const jobReducer = (state = initialState, action) => {
  switch (action.type) {

    case TradieFinder:
      return { ...state, searchResult: action.payload };

    default:
      return state;
  }
};

export default jobReducer;