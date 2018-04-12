import React from 'react';
import { StyleSheet, ImageBackground, Image } from 'react-native';
import { BlurView } from 'expo';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { reset } from 'redux-form';
import PropTypes from 'prop-types';
import I18n from 'ex-react-native-i18n';
import {
  Container,
  Header,
  Body,
  Title,
  Text,
  Button,
  Content,
  Toast
} from 'native-base';

import { loginUserAccount, postDeviceInfo } from '../services/authService';
import { toastShow } from '../services/toastService';
import LoginForm from '../components/forms/LoginForm';
import { login, register, setUserType } from '../actions/actionCreator';

class SignInScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'title'
  });

  onSubmit = (values, dispatch) => {
    console.log(values);
    // values = Object.assign({grant_type:'password'},values);
    return loginUserAccount(values);
  };

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
      <Container>
        <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill}>
          <ImageBackground
            source={require('../resource/images/login_bg.jpg')}
            style={{ height: '100%', width: '100%' }}
          >
            {/* <Header>
          <Body>
            <Title>{I18n.t("signin")}</Title>
          </Body>
        </Header> */}
            <Content
              style={{
                paddingTop: '40%'
              }}
              padder
              keyboardShouldPersistTaps={'always'}
            >
              <Image
                style={{
                  resizeMode: 'contain',
                  alignSelf: 'center'
                }}
                source={require('../resource/images/logo.png')}
              />
              <LoginForm
                onSubmit={(values, dispatch) => {
                  return this.onSubmit(values, dispatch)
                    .then(res => {
                      dispatch(reset('LoginForm'));

                      this.props.setUserType(res.data.usertype);
                      this.props.login();

                      toastShow('SignIn Successfully', 'success', 3000);
                    })
                    .catch(err => {
                      console.log(err);
                      toastShow('SignIn Unsuccessfully', 'danger', 3000);
                    });
                }}
              />
              <Button
                style={styles.button}
                block
                bordered
                light
                onPress={this.props.register}
              >
                <Text>Sign Up</Text>
              </Button>
            </Content>
          </ImageBackground>
        </BlurView>
      </Container>
    );
  }
}

//TODO: Bug from nativebase
const styles = StyleSheet.create({
  button: {
    marginTop: 20
  }
});

SignInScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  login,
  register,
  setUserType
};

const SignIn = connect(null, mapDispatchToProps)(SignInScreen);

export default SignIn;
