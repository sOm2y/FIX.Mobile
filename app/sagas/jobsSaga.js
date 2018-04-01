import {
  RefreshJobs,
  RefreshJobsSuccess,
  RefreshJobsFailed,
  CreateJob,
  JobDetail,
  JobDetailSuccess,
  JobDetailFailed,
} from "../actions/actionTypes";
import { call, put, take, takeEvery, takeLatest } from "redux-saga/effects";
import { getJobs, postJob, getJobById, getAssignedJobs } from "../services/jobService";

function* postJobSaga(action) {
  // console.log("postJobSaga");
  // const job = yield call(postJob, action.payload);
  // yield put({type: "USER_FETCH_SUCCEEDED", job: job});
}

function* getJobsSaga(action) {
  try {
    let jobs = null;
    if(action.payload === 'Customer'){
      jobs = yield call(getJobs);
    }else if(action.payload === 'Tradie'){
      jobs = yield call(getAssignedJobs);
    }
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
    const job = yield call(getJobById,action.payload.jobId);
    //Change the name of parameter to payload as reducer defined
    console.log('job: '+job);
    const payload = job;
    yield put({ type: JobDetailSuccess, payload });
  } catch (error) {
    const payload = error;
    yield put({ type: JobDetailFailed, payload });
  }
}

function* jobsSaga() {
  yield takeEvery(RefreshJobs, getJobsSaga);
  yield takeEvery(CreateJob, postJobSaga);
  yield takeEvery(JobDetail, getJobByIdSaga);
}

export default jobsSaga;
