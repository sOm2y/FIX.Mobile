import {
  SubmitQuote,
  SubmitQuoteSuccess,
  SubmitQuoteFailed
} from '../actions/actionTypes';
import {
  call,
  put,
  take,
  fork,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';
import { postQuote } from '../services/quoteService';

function* postJobSaga(action) {
  try {
    yield call(postQuote, action.payload);
    yield put({ type: SubmitQuoteSuccess });
  } catch (error) {
    yield put({ type: SubmitQuoteFailed, payload: error });
  }
}

function* quotesSaga() {
  yield takeEvery(SubmitQuote, postJobSaga);
}

export default quotesSaga;
