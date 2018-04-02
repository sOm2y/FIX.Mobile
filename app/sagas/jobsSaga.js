import { RefreshJobs, RefreshJobsSuccess, RefreshJobsFailed, SubmitJobDetail, SubmitJobDetailSuccess, SubmitJobDetailFailed } from "../actions/actionTypes";
import { call, put, fork, takeEvery, takeLatest } from 'redux-saga/effects'
import { getJobs, postJob } from '../services/jobService';

function* postJobSaga(action) {
  try {
    const job = yield call(postJob, action.payload);
    yield put({type: SubmitJobDetailSuccess, payload:job});
  } catch (error) {
    yield put({type: SubmitJobDetailFailed, payload: error});
  }
}

function* getJobsSaga(action) {
  try {
    const jobs = yield call(getJobs);
    yield put({type: RefreshJobsSuccess, payload: jobs});
  } catch (error) {
    yield put({type: RefreshJobsFailed, payload: error});
  }
}

function* jobsSaga() {
    yield takeLatest(RefreshJobs, getJobsSaga);
    yield takeEvery(SubmitJobDetail, postJobSaga);
}

export default jobsSaga;