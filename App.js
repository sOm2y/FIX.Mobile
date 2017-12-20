import React from 'react';
import Expo from 'expo';

import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';
import { createStore } from 'redux';
import Index from './app/index';
import { Root } from 'native-base';
import AppNavigation from './app/navigations/index';
import allReducers from './app/reducers/index'


export default class App extends React.Component {
  store = createStore(allReducers);
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
      <Provider store= {this.store}>
        <Root>
          <AppNavigation/> 
        </Root>
      </Provider>
    );
  }
}

