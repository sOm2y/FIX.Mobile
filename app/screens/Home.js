import React from "react";
import { translate } from 'react-i18next';
import { Text, Linking, View } from "react-native";
import { Card, Button } from "native-base";

@translate(['home', 'common'], { wait: true })

export default class Home extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('home:title')
  });

  render(){

    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;

    return (
      <View style={{ flex: 1 }}>
        <Text>{t('title')}</Text>
      </View>
    );
  }
  
}