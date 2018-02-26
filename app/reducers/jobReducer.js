import { TradieFinder } from "../actions/actionTypes";

const initialState = { businessList: [] };

const jobReducer = (state = initialState, action) => {
  switch (action.type) {

    case TradieFinder:
      return { ...state, businessList: action.payload };

    default:
      return state;
  }
};

export default jobReducer;