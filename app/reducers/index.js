import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import countReducer from './countReducer.js';
import wizardPaginationReducer from './wizardPaginationReducer.js';
import navigationReducer from "./navigationReducer";
import authReducer from "./authReducer";

const allReducers= combineReducers({
  count: countReducer,
  form: formReducer,
  page: wizardPaginationReducer,
  navigationReducer: navigationReducer,
  authReducer: authReducer
  

});
export default allReducers;