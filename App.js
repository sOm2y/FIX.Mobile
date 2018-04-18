import React from 'react';
import Expo from 'expo';

import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';
import { PersistGate } from 'redux-persist/es/integration/react';
import I18n from 'ex-react-native-i18n';
import { Root } from 'native-base';

import AppNavigation from './app/navigations/index';
import configureStore from './store';
import { getAccessToken } from './app/services/authService';
import rootSaga from './app/sagas/rootSaga';

const { store, persistor, sagaMiddleware } = configureStore();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
      Entypo: require('@expo/vector-icons/fonts/Entypo.ttf'),
      FontAwesome: require('@expo/vector-icons/fonts/FontAwesome.ttf'),
      MaterialCommunityIcons: require('@expo/vector-icons/fonts/MaterialCommunityIcons.ttf')

    });

    await Promise.all([
      I18n.initAsync(),
      Expo.Util.getCurrentDeviceCountryAsync(),
      Expo.Util.getCurrentTimeZoneAsync()
    ]);
    const deviceLocale = I18n.locale;

    I18n.fallbacks = true;

    // // general Chinese
    // zh

    // // Traditional Chinese
    // zh-Hant

    // // Simplified Chinese
    // zh-Hans

    // // Traditional Chinese + Locale
    // zh-Hant-TW
    // zh-Hant-SG
    // zh-Hant-HK
    // zh-Hant-CN

    // // Simplified Chinese + Locale
    // zh-Hans-TW
    // zh-Hans-SG
    // zh-Hans-HK
    // zh-Hans-CN

    I18n.translations = {
      en: require('./app/locales/en'),
      zh: require('./app/locales/zh-Hans')
    };
    sagaMiddleware.run(rootSaga);
    this.setState({ isReady: true });
  
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <Root>
          <PersistGate persistor={persistor}>
            <AppNavigation />
          </PersistGate>
        </Root>
      </Provider>
    );
  }
}
