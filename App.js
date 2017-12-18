import React from 'react';
import Expo from 'expo';
import allReducers from './app/reducers/index.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';
import Index from './app/index';
import { Root } from "native-base";
import AppWithNavigationState from "./app/router";


const store = createStore(allReducers);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Provider store= {store}>
     
          <AppWithNavigationState/> 
       
      </Provider>
    );
  }
}

