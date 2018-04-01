import {
  TradieFinder,
  RefreshJobs,
  RefreshJobsFailed,
  RefreshJobsSuccess,
  JobDetail,
  JobDetailSuccess,
  JobDetailFailed,
} from "../actions/actionTypes";

const initialState = { searchResult: {}, jobResult: {}, isRefreshing: true };

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case RefreshJobs:
      return { ...state, isRefreshing: true };

    case RefreshJobsSuccess:
      return { ...state, isRefreshing: false, jobsResult: action.payload };

    case RefreshJobsFailed:
      return { ...state, isRefreshing: false, errorResult: action.payload };

    case TradieFinder:
      return { ...state, searchResult: action.payload };

    case JobDetail:
      return { ...state, isRefreshing: true };

    case JobDetailSuccess:
      return { ...state, isRefreshing: false, jobResult: action.payload };

    case JobDetailFailed:
      return { ...state, isRefreshing: false, errorResult: action.payload };

    default:
      return state;
  }
};

export default jobReducer;
