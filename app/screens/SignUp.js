import React from "react";
import { StyleSheet } from 'react-native';
import { translate } from 'react-i18next';
import { Container,Header, Body, Title, Content, List, ListItem, Button, Text, Left, Right, Icon } from "native-base";

@translate(['home', 'common'], { wait: true })

export default class SignUp extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('home:title')
  });

  render(){
    const { t, i18n, navigation } = this.props;

    return (
      <Container>
        <Header>
        <Left>
            <Button transparent onPress={() => navigation.navigate("SignIn")}>
                <Icon name="arrow-back" />
            </Button>
            </Left>
          <Body>
            <Title>Address</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
            <Button block primary
                style={{ marginTop: 10 }}
                onPress={() => { navigation.navigate("Customer"); }}>
            <Text>Goto Customer</Text>
            </Button>
            <Button block primary
                style={{ marginTop: 10 }}
                onPress={() => { navigation.navigate("Tradie"); }}>
            <Text>Goto Tradie</Text>
            

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