import React from "react";
import { StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { reset } from 'redux-form';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';
import { Container, Header, Body, Title, Text, Button, Content, Toast} from "native-base";

import { loginUserAccount } from '../services/authService';
import { toastShow } from '../services/toastService';
import LoginForm  from '../components/forms/LoginForm';
import { login, register } from "../actions/actionCreator";


class SignInScreen extends React.Component {
  static navigationOptions = ({ navigation}) => ({
    title: 'title'
  });

  onSubmit = (values, dispatch, navigation) => {
    console.log(values);
    values = Object.assign({grant_type:'password'},values);
    return loginUserAccount(values)
      .then(res => {
        console.log(res)
        dispatch(reset('LoginForm'));
        this.props.login();
        toastShow("SignIn Successfully", "success", 3000);   
      })
      .catch(err => {
        console.log(err);
        toastShow("SignIn Unsuccessfully", "danger", 3000);   
      });
}

  render(){
    const { navigation } = this.props;
    const { navigate } = navigation;
    
    return (
      <Container>
        <Header>
          <Body>
            <Title>{I18n.t('signin')}</Title>
          </Body>
        </Header>
        <Content padder keyboardShouldPersistTaps={'always'}>
          <LoginForm onSubmit={(values,dispatch) => this.onSubmit(values, dispatch, navigation)} />
            <Button style={styles.button}
              block 
              bordered
              onPress={this.props.register}
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

SignInScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  login,
  register
};

const SignIn = connect(null, mapDispatchToProps)(SignInScreen);

export default SignIn;