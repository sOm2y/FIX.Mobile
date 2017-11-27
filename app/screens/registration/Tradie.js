import React from "react";
import { StyleSheet } from 'react-native';
import { translate } from 'react-i18next';
import { reset } from 'redux-form';
import { Container,Header, Body, Title, Content, Button, Text, Left, Icon, Right} from "native-base";
import { postUserAccount } from '../../services/authService';
import { toastShow } from '../../services/toastService';
import CredentialForm from '../../components/forms/SignUp/CredentialForm'


@translate(['home', 'common'], { wait: true })

export default class Tradie extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('home:title')
  });

  onSubmit = (values, dispatch, navigation) => {
    console.log(values);
    return postUserAccount(values)
    .then(res => {
      navigation.navigate("Home");
      dispatch(reset('PersonalDetailForm'));
      toastShow("SignIn Successfully", "success", 3000); 
    }).catch( err => {
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
            <Left>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" />
                </Button>
            </Left>
          <Body>
            <Title>Personal Detail</Title>
          </Body>
          <Right />
        </Header>
        <Content padder keyboardShouldPersistTaps={'always'}>
        <CredentialForm onSubmit={(values,dispatch) => this.onSubmit(values, dispatch, navigation)} />

        <Button block primary
                style={{ marginTop: 10 }}
                onPress={() => navigation.navigate("PersonalCredential")}>
            <Text>Goto PersonalCredential</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

//TODO: Bug from nativebase
const styles = StyleSheet.create({
  listItem:{
    marginLeft: 0, 
    paddingLeft: 17
  }
 
});