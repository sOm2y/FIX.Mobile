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
import { toastShow } from '../services/toastService';
import { TextHolder } from '../constants/textHolder';

function* postQuoteSaga(action) {
  try {
    yield call(postQuote, action.payload);
    yield put({ type: SubmitQuoteSuccess });
    yield call(toastShow, {
      text: TextHolder.POST_QUOTE_SUCCESSFUL,
      type: 'success',
      buttonText: 'Dismiss',
      duration: 2000
    });
  } catch (error) {
    yield put({ type: SubmitQuoteFailed, payload: error });
    yield call(toastShow, {
      text: TextHolder.POST_QUOTE_FAILED,
      type: 'danger',
      buttonText: 'Dismiss',
      duration: 2000
    });
  }
}


function* updateQuoteSaga(action) {
  try {
    yield call(updateQuoteStatus, action.payload);
    yield put({ type: UpdateQuoteSuccess });
    yield call(toastShow, {
      text: TextHolder.UPDATE_QUOTE_SUCCESSFUL,
      type: 'success',
      buttonText: 'Dismiss',
      duration: 2000
    });
  } catch (error) {
    yield put({ type: UpdateQuoteFailed, payload: error });
    yield call(toastShow, {
      text: TextHolder.UPDATE_QUOTE_FAILED,
      type: 'danger',
      buttonText: 'Dismiss',
      duration: 2000
    });
  }
}


function* quotesSaga() {
  yield takeEvery(SubmitQuote, postQuoteSaga);
  yield takeEvery(UpdateQuote, updateQuoteSaga)
}

export default quotesSaga;
