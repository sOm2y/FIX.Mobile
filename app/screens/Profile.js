import React from "react";
import { View } from "react-native";
import { Content, Button, Text } from "native-base";
import { onSignOut } from "../services/auth";

export default class SignUp extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('home:title')
  });
  render(){

    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
    
    return (  
      <Content>
        <Button
          block
          onPress={() => onSignOut().then(() => navigation.navigate("SignedOut"))}
        >
        <Text>SIGN OUT</Text>
        </Button>
      </Content>
    );
  }
}