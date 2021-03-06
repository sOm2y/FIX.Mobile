import { AsyncStorage } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import wizardPaginationReducer from './app/reducers/wizardPaginationReducer';
import {
  persistCombineReducers,
  persistStore,
  persistReducer
} from 'redux-persist';
import { middleware } from './app/navigations/index';
import navigationReducer from './app/reducers/navigationReducer';
import authReducer from './app/reducers/authReducer';
import businessReducer from './app/reducers/businessReducer';
import profileReducer from './app/reducers/profileReducer';
import jobReducer from './app/reducers/jobReducer';
import quoteReducer from './app/reducers/quoteReducer';
import notificationReducer from './app/reducers/notificationReducer';

// config to not persist the *counterString* of the CounterReducer's slice of the global state.
const config = {
  key: 'auth',
  storage: AsyncStorage
};

const config1 = {
  key: 'profile',
  storage: AsyncStorage
};

const config2 = {
  key: 'form',
  storage: AsyncStorage
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Object of all the reducers for redux-persist
// const reducer = {
//     counterReducer,
//     authReducer,
//     navigationReducer,
//     formReducer,
//     wizardPaginationReducer,
// };

// This will persist all the reducers, but I don't want to persist navigation state, so instead will use persistReducer.
//  const rootReducer = persistCombineReducers(config, reducer)

// combineReducer applied on persisted(counterReducer) and NavigationReducer
const rootReducer = combineReducers({
  //CounterReducer : persistReducer(config, counterReducer),
  AuthReducer: persistReducer(config, authReducer),
  BusinessReducer: businessReducer,
  JobReducer: jobReducer,
  NavigationReducer: navigationReducer,
  form: formReducer,
  page: wizardPaginationReducer,
  ProfileReducer: persistReducer(config1, profileReducer),
  QuoteReducer: quoteReducer,
  NotificationReducer: notificationReducer,
});

function configureStore() {
  let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(middleware, sagaMiddleware))
  );

  // store.subscribe(() => {
  //   console.log(store.getState());
  // });
  let persistor = persistStore(store);
  return { persistor, store, sagaMiddleware };
}

export default configureStore;
