import React from "react";
import { Container, Header, Body, Title, Text, Button, Content, Form, Item, Input, Label } from "native-base";
import { onSignIn } from "../services/auth";

export default class SignIn extends React.Component {
  static navigationOptions = ({ navigation}) => ({
    title: 'SignIn'
  });

  render(){
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;
    
    return (
      <Container>
        <Header>
          <Body>
            <Title>Sign In</Title>
          </Body>
        </Header>
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
              onPress={() => navigation.navigate("Home")}
            >
              <Text>Log In</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
