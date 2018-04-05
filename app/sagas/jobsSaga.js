import {
  RefreshJobs,
  RefreshJobsSuccess,
  RefreshJobsFailed,
  NavigateToCreateJob,
  JobDetail,
  JobDetailSuccess,
  JobDetailFailed,
  SubmitJobDetail,
  SubmitJobDetailSuccess,
  SubmitJobDetailFailed
} from '../actions/actionTypes';
import {
  call,
  put,
  take,
  fork,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';
import {
  getJobs,
  postJob,
  getJobById,
  getAssignedJobs
} from '../services/jobService';

function* postJobSaga(action) {
  try {
    const job = yield call(postJob, action.payload);
    yield put({ type: SubmitJobDetailSuccess, payload: job });
  } catch (error) {
    yield put({ type: SubmitJobDetailFailed, payload: error });
  }
}

function* getJobsSaga(action) {
  try {
    let jobs = null;
    if (action.payload === 'Customer') {
      jobs = yield call(getJobs);
    } else if (action.payload === 'Tradie') {
      jobs = yield call(getAssignedJobs);
    }
    console.log('jobs: ' + jobs);
    //Change the name of parameter to payload as reducer defined
    const payload = jobs;
    yield put({ type: RefreshJobsSuccess, payload });
  } catch (error) {
    const payload = error;
    yield put({ type: RefreshJobsFailed, payload });
  }
}

function* getJobByIdSaga(action) {
  try {
    const job = yield call(getJobById, action.payload.jobId);
    //Change the name of parameter to payload as reducer defined
    console.log('job: ' + job);
    const payload = job;
    yield put({ type: JobDetailSuccess, payload });
  } catch (error) {
    const payload = error;
    yield put({ type: JobDetailFailed, payload });
  }
}

function* jobsSaga() {
  yield takeLatest(RefreshJobs, getJobsSaga);
  yield takeEvery(SubmitJobDetail, postJobSaga);
  yield takeLatest(JobDetail, getJobByIdSaga);
}

export default jobsSaga;
