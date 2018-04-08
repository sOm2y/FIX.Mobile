import { toastShow } from '../services/toastService';
import { ToastSuccess, ToastError } from "../actions/actionTypes";
import { takeEvery, call, put } from 'redux-saga/effects';

function* diplaySuccessToast(action) {
    try {
        const toast = yield call(toastShow, {
            text: action.text,
            type: "success",
            buttonText: "Dismiss",
            duration: 2000
        });       
      } catch (error) {
        //Display in console, should not show it to user
        console.log("Toast unsuccessful! Please check your code!");
      }
}

function* diplayErrorToast(action) {
    try {
        const toast = yield call(toastShow, {
            text: action.text,
            type: "danger",
            buttonText: "Dismiss",
            duration: 3000
        });   
      } catch (error) {
        console.log("Toast unsuccessful! Please check your code!");
      }
}

function* errorHandlerSaga() {
    yield takeEvery(ToastSuccess, diplaySuccessToast);
    yield takeEvery(ToastError, diplayErrorToast);
}

export default errorHandlerSaga;