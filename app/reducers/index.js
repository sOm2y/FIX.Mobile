import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import countReducer from './countReducer.js';
import wizardPaginationReducer from './wizardPaginationReducer.js';
import navigationReducer from './wizardPaginationReducer.js';
import authReducer from './wizardPaginationReducer.js';

const allReducers= combineReducers({
  count: countReducer,
  form: formReducer,
  page: wizardPaginationReducer,
  nav: navigationReducer,
  auth: authReducer
});
export default allReducers;