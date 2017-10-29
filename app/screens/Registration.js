import React from "react";
import { StyleSheet } from 'react-native';
import { translate } from 'react-i18next';
import { PersonalDetail } from "../components/registration/PersonalDetail"
import { Container,Header, Body, Title, Content, List, ListItem, Button, Text } from "native-base";


@translate(['home', 'common'], { wait: true })

export default class Registration extends React.Component {
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
            <Title>Personal Detail</Title>
          </Body>
        </Header>
        <Content>
            <PersonalDetail />
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