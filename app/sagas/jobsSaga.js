import { RefreshJobs, RefreshJobsSuccess, RefreshJobsFailed } from "../actions/actionTypes";
import { put, take, call } from 'redux-saga/effects';
import { getJobs } from '../services/jobService';

export default function* jobsSaga() {
  try {
    yield take( RefreshJobs );
    const jobs = yield call(getJobs); //1
   yield put({type: RefreshJobsSuccess, jobs}); //2
  } catch(error) {
   yield put({type: RefreshJobsFailed, error});
  }
}