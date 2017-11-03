import React from "react";
import { StyleSheet } from 'react-native';
import { translate } from 'react-i18next';
import { Container,Header, Body, Title, Content, List, ListItem, Button, Text, Left, Right, Icon } from "native-base";
import { Confirmation } from './Confirmation';


@translate(['home', 'common'], { wait: true })

export default class Address extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('home:title')
  });

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
            <Title>Address</Title>
          </Body>
          <Right />
        </Header>
        <Content>
            <Button full rounded primary
                style={{ marginTop: 10 }}
                onPress={() => navigation.navigate("Confirmation")}>
            <Text>Goto Confirmation</Text>
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