import { Jobs } from "../actions/actionTypes";
import { put, take, call } from 'redux-saga/effects';
import { getJobs } from '../services/jobService';

export default function* jobsSaga() {
  try {
    yield take(Jobs);
    const flights = yield call(getJobs); //1
   // yield put({type: 'FLIGHTS_LOADED', flights}); //2
  } catch(error) {
   // yield put({type: 'FLIGHTS_LOADED_FAILED', error});
  }
}