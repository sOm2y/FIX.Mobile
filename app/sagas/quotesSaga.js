import {
  UpdateQuote,
  UpdateQuoteSuccess,
  UpdateQuoteFailed,
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
import { postQuote, updateQuoteStatus } from '../services/quoteService';

function* postQuoteSaga(action) {
  try {
    yield call(postQuote, action.payload);
    yield put({ type: SubmitQuoteSuccess });
  } catch (error) {
    yield put({ type: SubmitQuoteFailed, payload: error });
  }
}


function* updateQuoteSaga(action) {
  try {
    yield call(updateQuoteStatus, action.payload);
    yield put({ type: UpdateQuoteSuccess });
  } catch (error) {
    yield put({ type: UpdateQuoteFailed, payload: error });
  }
}


function* quotesSaga() {
  yield takeEvery(SubmitQuote, postQuoteSaga);
  yield takeEvery(UpdateQuote, updateQuoteSaga)
}

export default quotesSaga;
