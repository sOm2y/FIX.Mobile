import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import countReducer from './countReducer.js';
import wizardPaginationReducer from './wizardPaginationReducer.js';

const allReducers= combineReducers({
  count: countReducer,
  form: formReducer,
  page: wizardPaginationReducer
});
export default allReducers;