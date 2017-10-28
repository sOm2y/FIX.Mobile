import React from "react";
import { Container, Header, Body, Title, Text, Button, Content, Form, Item, Input, Label } from "native-base";
import { onSignIn } from "../services/auth";

export default class SignUp extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('home:title')
  });
  render(){
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
    
    return (
      <Container>
        <Header>
          <Body>
            <Title>Sign Up</Title>
          </Body>
        </Header>
        <Content>
          <Form>
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
      </Container>
    );
  }
}
