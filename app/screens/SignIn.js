import React from "react";
import { StyleSheet } from 'react-native';
import { Container, Header, Body, Title, Text, Button, Content, Form, Item, Input, Label } from "native-base";
import axios from 'axios';
import qs from 'qs';
import { onSignIn } from '../services/authService';
import LoginForm  from '../components/forms/LoginForm';



export default class SignIn extends React.Component {
  static navigationOptions = ({ navigation}) => ({
    title: 'SignIn'
  });

  onSubmit = (values, dispatch, navigation) => {
    axios.defaults.baseURL = 'http://fixwebapi.azurewebsites.net';
    axios.defaults.headers.common['Authorization'] = '';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    console.log(values);
    values = Object.assign({grant_type:'password'},values);
    axios({
      method: 'post',
      url: '/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(values)
    })
    .then(result => {
      navigation.navigate("Home");
    }).catch( error => {
        console.log(error);
    });
}

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
          <LoginForm onSubmit={(values,dispatch) => this.onSubmit(values, dispatch, navigation)} />
          {/* <Button
              block primary
              onPress={() => navigation.navigate("Home")}
            >
              <Text>Log In</Text>
            </Button> */}

            <Button style={styles.button}
              block 
              onPress={() => navigation.navigate("SignUp")}
            >
             <Text>Sign Up</Text>
            </Button>
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