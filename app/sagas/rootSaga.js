import { call, takeEvery, fork, all } from 'redux-saga/effects'
import jobsSaga from './jobsSaga'
import quotesSaga from './quotesSaga';
import notificationsSaga from './notificationsSaga'

export default function* rootSaga() {
    yield all([
        fork(jobsSaga), // saga1 can also yield [ fork(actionOne), fork(actionTwo) ]
        fork(quotesSaga),
        fork(notificationsSaga)
    ])
}