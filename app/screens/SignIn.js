import React from "react";
import { StyleSheet } from 'react-native';
import { reset } from 'redux-form';
import { Container, Header, Body, Title, Text, Button, Content, Toast} from "native-base";
import { loginUserAccount } from '../services/authService';
import { toastShow } from '../services/toastService';
import LoginForm  from '../components/forms/LoginForm';



export default class SignIn extends React.Component {
  static navigationOptions = ({ navigation}) => ({
    title: 'SignIn'
  });

  onSubmit = (values, dispatch, navigation) => {
    console.log(values);
    values = Object.assign({grant_type:'password'},values);
    return loginUserAccount(values)
      .then(res => {
        console.log(res)
        navigation.navigate("Home");
        dispatch(reset('LoginForm'))
        toastShow("SignIn Successfully", "success", 3000);   
      })
      .catch(err => {
        console.log(err);
        toastShow("SignIn Unsuccessfully", "danger", 3000);   
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
        <Content padder keyboardShouldPersistTaps={'always'}>
          <LoginForm onSubmit={(values,dispatch) => this.onSubmit(values, dispatch, navigation)} />
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