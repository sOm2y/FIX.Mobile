import React from "react";
import { StyleSheet } from 'react-native';
import { Container, Header, Body, Title, Text, Button, Content, Form, Item, Input, Label } from "native-base";
import { onSignIn } from "../services/authService";

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
        <Content padder>
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
              block primary
              onPress={() => navigation.navigate("Home")}
            >
              <Text>Log In</Text>
            </Button>

            <Button style={styles.button}
              block 
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text>SignUp</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

//TODO: Bug from nativebase
const styles = StyleSheet.create({
  button:{
    marginTop: 20
  }
 
});