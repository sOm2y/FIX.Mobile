import { RefreshJobs, RefreshJobsSuccess, RefreshJobsFailed, CreateJob } from "../actions/actionTypes";
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { getJobs, postJob } from '../services/jobService';

function* postJobSaga(action) {
  // console.log("postJobSaga");
  // const job = yield call(postJob, action.payload);
  // yield put({type: "USER_FETCH_SUCCEEDED", job: job});
}

function* getJobsSaga(action) {
  try {
    const jobs = yield call(getJobs);
    //Change the name of parameter to payload as reducer defined
    const payload = jobs;
    yield put({type: RefreshJobsSuccess, payload});
  } catch (error) {
    const payload = error;
    yield put({type: RefreshJobsFailed, payload});
  }
}

function* jobsSaga() {
    yield takeEvery(RefreshJobs, getJobsSaga);
    yield takeEvery(CreateJob, postJobSaga);
}

export default jobsSaga;