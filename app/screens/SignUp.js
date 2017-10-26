import React from "react";
import { View } from "react-native";
import { Text, Button, Content, Form, Item, Input, Label } from "native-base";
import { onSignIn } from "../services/auth";

export default class SignUp extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('home:title')
  });
  render(){
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
    
    return (
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input />
          </Item>
          <Button 
            block  
            onPress={() => {
              onSignIn().then(() => navigation.navigate("SignedIn"));
            }}
          >
            <Text>SIGN UP</Text>
          </Button>
    
          <Button
            block
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text>SIGN IN</Text>
          </Button>
        </Form>
      </Content>
    );
  }
}
