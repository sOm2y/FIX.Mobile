import React from 'react';
import Expo, {Fingerprint} from 'expo';
import { Platform, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';
import { PersistGate } from "redux-persist/es/integration/react";
import I18n from 'ex-react-native-i18n';
import { Root } from 'native-base';

import AppNavigation from './app/navigations/index';
import configureStore from "./store";
import { isSignedIn } from "./app/services/authService";

const { store, persistor } = configureStore();



export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      hasFingerprintAuth: null,
      signedIn: false,
      checkedSignIn: false
    };
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    await Promise.all([
      I18n.initAsync(),
      Expo.Util.getCurrentDeviceCountryAsync(),
      Expo.Util.getCurrentTimeZoneAsync(), 
    ]);
    const deviceLocale = I18n.locale;


    I18n.fallbacks = true

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
      'en': require('./app/locales/en'),
      'zh': require('./app/locales/zh-Hans')
    }
    Fingerprint.hasHardwareAsync().then(hasHardware => {
      if(hasHardware){
        Fingerprint.isEnrolledAsync().then(hasFingerprintAuth => {
          if(hasFingerprintAuth){
            if( Platform.OS === 'android'){
              Alert.alert('Place your finger to scan.')
            }
            this.authFunction();
          }else{
            this.setState({ signedIn: false, checkedSignIn: false});
          }
          this.setState({ hasFingerprintAuth });
        });
      }else{
        this.setState({ signedIn: false, checkedSignIn: false});
      }
        
    });
  

    this.setState({ isReady: true });
  }

  authFunction = async () => {
    try {
      let result =
        Platform.OS === 'ios'
          ? await Fingerprint.authenticateAsync('Show me your finger')
          : await Fingerprint.authenticateAsync();

      if (result.success) {
          isSignedIn()
          .then(res => this.setState({ signedIn: result.success, checkedSignIn: result.success }));
      } else {
        this.setState({ signedIn: result.success, checkedSignIn: result.success });
        console.log('Fingerprint Auth Failed', result);
      }
    } catch (err) {
      console.log('authFunction Error', err);
    }
  };

  getAuthStatement = () => {
    return (
      Alert.alert('Place your finger to scan.')
    );
  };

  render() {
    const { checkedSignIn, signedIn } = this.state;

    if (!this.state.isReady) {
      return <AppLoading />;
    }
    
    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }
    
    return (
      <Provider store= {store}>
        <Root>
          <PersistGate persistor={persistor}>
            <AppNavigation/> 
          </PersistGate>
        </Root>
      </Provider>
    );
  }
}

