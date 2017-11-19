import React from "react";
import { StyleSheet } from 'react-native';
import { translate } from 'react-i18next';
import { Container,Header, Body, Title, Content, List, ListItem, Button, Text, Left, Icon, Right} from "native-base";
import axios from 'axios';
import qs from 'qs';
import { PersonalCredential } from './PersonalCredential';
import PersonalDetailForm from '../../components/forms/PersonalDetailForm'


@translate(['home', 'common'], { wait: true })

export default class PersonalDetail extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('home:title')
  });

  onSubmit = (values, dispatch, navigation) => {
    console.log(values);
    axios.defaults.baseURL = 'http://fixwebapi.azurewebsites.net';
    axios.defaults.headers.common['Authorization'] = '';
    axios({
      method: 'post',
      url: '/api/users',
      headers: {
        'Content-Type': 'application/json'
      },
      data: values
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
        <Content padder>
        <PersonalDetailForm onSubmit={(values,dispatch) => this.onSubmit(values, dispatch, navigation)} />

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