import {
  TradieFinder,
  RefreshJobs,
  RefreshJobsFailed,
  RefreshJobsSuccess,
  JobDetail,
  JobDetailSuccess,
  JobDetailFailed,
  SubmitJobDetail,
  SubmitJobDetailSuccess,
  SubmitJobDetailFailed,
  Logout
} from '../actions/actionTypes';

const initialState = { searchResult: {}, jobResult: {}, isRefreshing: true };

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case RefreshJobs:
      return { ...state, isRefreshing: true };

    case RefreshJobsSuccess:
      return { ...state, isRefreshing: false, jobsResult: action.payload };

    case RefreshJobsFailed:
      return { ...state, isRefreshing: false, errorResult: action.payload };

    case SubmitJobDetail:
      return { ...state, isVisible: true };

    case SubmitJobDetailSuccess:
      return { ...state, isJobSubmitted: true, jobDetail: action.payload };

    case SubmitJobDetailFailed:
      return { ...state, isJobSubmitted: false, errorResult: action.payload };

    case TradieFinder:
      return { ...state, searchResult: action.payload };

    case JobDetail:
      return { ...state, isRefreshing: true };

    case JobDetailSuccess:
      return { ...state, isRefreshing: false, jobResult: action.payload };

    case JobDetailFailed:
      return { ...state, isRefreshing: false, errorResult: action.payload };

    case Logout:
      return { ...state, isRefreshing: false, jobResult: {} };
      
    default:
      return state;
  }
};

export default jobReducer;
