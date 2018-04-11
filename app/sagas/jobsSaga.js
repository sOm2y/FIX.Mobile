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
  ToastSuccess,
  ToastError
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
import { 
  FETCH_JOBS_SUCCESSFUL,
  FETCH_JOBS_FAILED,
  FETCH_JOBS_BY_ID_FAILED,
  POST_JOB_SUCCESSFUL,
  POST_JOB_FAILED
} from "../helpers/textHolder";

function* postJobSaga(action) {
  try {
    const job = yield call(postJob, action.payload);
    yield put({ type: SubmitJobDetailSuccess, payload: job });
    yield put({ type: ToastSuccess, text: POST_JOB_SUCCESSFUL});
  } catch (error) {
    yield put({ type: SubmitJobDetailFailed, payload: error });
    yield put({ type: ToastError, text: POST_JOB_FAILED});
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
    yield put({ type: RefreshJobsSuccess, payload:jobs });
    yield put({ type: ToastSuccess, text: FETCH_JOBS_SUCCESSFUL});
  } catch (error) {
    yield put({ type: RefreshJobsFailed, payload:error });
    yield put({ type: ToastError, text: FETCH_JOBS_FAILED});
  }
}

function* getJobByIdSaga(action) {
  try {
    const job = yield call(getJobById, action.payload.jobId);
    yield put({ type: JobDetailSuccess, payload:job });
  } catch (error) {
    yield put({ type: JobDetailFailed, payload:error });
    yield put({ type: ToastError, text: FETCH_JOBS_BY_ID_FAILED});
  }
}

function* jobsSaga() {
  yield takeLatest(RefreshJobs, getJobsSaga);
  yield takeEvery(SubmitJobDetail, postJobSaga);
  yield takeLatest(JobDetail, getJobByIdSaga);
}

export default jobsSaga;
