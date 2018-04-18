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
  SubmitJobDetailFailed,
  Logout
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
import { toastShow } from '../services/toastService';
import { TextHolder } from '../constants/textHolder';

function* postJobSaga(action) {
  try {
    const job = yield call(postJob, action.payload);
    yield put({ type: SubmitJobDetailSuccess, payload: job });
    yield call(toastShow, {
      text: TextHolder.POST_JOB_SUCCESSFUL,
      type: 'success',
      buttonText: 'Dismiss',
      duration: 3000
    });
  } catch (error) {
    yield put({ type: SubmitJobDetailFailed, payload: error });
    yield call(toastShow, {
      text: TextHolder.POST_JOB_FAILED,
      type: 'danger',
      buttonText: 'Dismiss',
      duration: 3000
    });
  }
}

function* getJobsSaga(action) {
  try {
    let jobs = null;
    console.log(action);
    if (action.payload === 'Customer') {
      jobs = yield call(getJobs);
    } else if (action.payload === 'Tradie') {
      jobs = yield call(getAssignedJobs);
    }
    const payload = jobs;

    yield put({ type: RefreshJobsSuccess, payload });
  } catch (error) {
    const payload = error;
    // if (error.status === 401) {
    //   yield put({ type: Logout });
    //   yield call(toastShow, {
    //     text: 'Token expired, please try login again',
    //     type: 'danger',
    //     buttonText: 'Dismiss',
    //     duration: 3000
    //   });
    // }
    yield put({ type: RefreshJobsFailed, payload });

    yield call(toastShow, {
      text: TextHolder.FETCH_JOBS_FAILED,
      type: 'danger',
      buttonText: 'Dismiss',
      duration: 3000
    });
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
    yield call(toastShow, {
      text: TextHolder.FETCH_JOBS_BY_ID_FAILED,
      type: 'danger',
      buttonText: 'Dismiss',
      duration: 2000
    });
  }
}

function* jobsSaga() {
  yield takeLatest(RefreshJobs, getJobsSaga);
  yield takeEvery(SubmitJobDetail, postJobSaga);
  yield takeLatest(JobDetail, getJobByIdSaga);
}

export default jobsSaga;
