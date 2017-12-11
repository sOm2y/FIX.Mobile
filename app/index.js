import React from "react";
import { Platform, Text, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fingerprint } from 'expo';
import { I18nextProvider, translate } from 'react-i18next';
import { Root } from "native-base";
import { createRootNavigator } from "./router";
import { isSignedIn } from "./services/authService";
import { Toast} from "native-base";
import i18n from '../i18n';

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasFingerprintAuth: null,
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentWillMount() {
    Fingerprint.hasHardwareAsync().then(hasHardware => {
      hasHardware &&
        Fingerprint.isEnrolledAsync().then(hasFingerprintAuth => {
          this.setState({ hasFingerprintAuth });
          if( Platform.OS === 'android'){
            Alert.alert('Place your finger to scan.')
          }
          this.authFunction();
        });
    });
  
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

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const RootLayout = createRootNavigator(signedIn);

    const WrappedStack = () => {
      return (
        <RootLayout screenProps={{ t: i18n.getFixedT() }}/> 
        );
    }

    const ReloadAppOnLanguageChange = translate('common', {
      bindI18n: 'languageChanged',
      bindStore: false
    })(WrappedStack);

    return (
      <Root>
        <I18nextProvider i18n={ i18n }>
          <ReloadAppOnLanguageChange />
        
        </I18nextProvider>
      </Root>
    );
  }
}