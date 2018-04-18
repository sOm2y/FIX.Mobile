import {
  RefreshNotifications,
  RefreshNotificationsSuccess,
  RefreshNotificationsFailed
} from '../actions/actionTypes';
import {
  call,
  put,
  take,
  fork,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';

import { toastShow } from '../services/toastService';
import { TextHolder } from '../constants/textHolder';
import { getNotifications } from '../services/notificationService';

function* getNotificationsSaga(action) {
  try {
    const notifications = yield call(getNotifications);

    const payload = notifications;

    yield put({ type: RefreshNotificationsSuccess, payload });
  } catch (error) {
    const payload = error;

    yield put({ type: RefreshNotificationsFailed, payload });

    yield call(toastShow, {
      text: TextHolder.FETCH_JOBS_FAILED,
      type: 'danger',
      buttonText: 'Dismiss',
      duration: 2000
    });
  }
}

function* notificationsSaga() {
  yield takeLatest(RefreshNotifications, getNotificationsSaga);
}

export default notificationsSaga;
