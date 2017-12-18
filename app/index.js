import React from "react";
import { Platform, Text, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fingerprint } from 'expo';
import { Root } from "native-base";
import AppWithNavigationState from "./router";
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

    return <AppWithNavigationState />
    
  }
}