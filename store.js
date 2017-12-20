import { AsyncStorage } from "react-native";
import { createStore, combineReducers } from "redux";
import {
  persistCombineReducers,
  persistStore,
  persistReducer
} from "redux-persist";

import counterReducer from "./app/reducers/countReducer";
import navigationReducer from "./app/reducers/navigationReducer";
import authReducer from "./app/reducers/authReducer";

// config to not persist the *counterString* of the CounterReducer's slice of the global state.
const config = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["counterString"]
};

const config1 = {
  key: "primary",
  storage: AsyncStorage
};

// Object of all the reducers for redux-persist
const reducer = {
    counterReducer,
    navigationReducer,
    authReducer
};

// This will persist all the reducers, but I don't want to persist navigation state, so instead will use persistReducer.
// const rootReducer = persistCombineReducers(config, reducer)

// We are only persisting the counterReducer and loginRducer


// combineReducer applied on persisted(counterReducer) and NavigationReducer
const rootReducer = combineReducers({
  CounterReducer : persistReducer(config, counterReducer),
  AuthReducer : persistReducer(config1, authReducer),
  navigationReducer,
 // LoginReducer
});

function configureStore() {
  let store = createStore(rootReducer);
  let persistor = persistStore(store);
  return { persistor, store };
}

export default configureStore;