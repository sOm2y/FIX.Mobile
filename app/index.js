import React from "react";
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
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => {
        Toast.show({
          text: err,
          type: "success",
          buttonText: "Dismiss",
          duration: 3000
         }); 
      });
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const RootLayout = createRootNavigator(signedIn);

    const WrappedStack = () => {
      return <RootLayout screenProps={{ t: i18n.getFixedT() }} />;
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