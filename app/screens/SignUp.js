import React from "react";
import { StyleSheet } from 'react-native';
import { translate } from 'react-i18next';
import { Container,Header, Body, Title, Content, List, ListItem, Button, Text, Left, Right, Icon } from "native-base";
import { Confirmation } from './Confirmation';
import { RegistrationNavigator } from '../router'; 


@translate(['home', 'common'], { wait: true })

export default class SignUp extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('home:title')
  });

  constructor(props) {
    super(props);

    this.state = {
      isCustomer: false,
    };
  }

  componentWillMount() {
    
  }

  render(){
    const { isCustomer } = this.state;
    const { t, i18n, navigation } = this.props;
    const Registration = RegistrationNavigator(isCustomer);

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
        <Content>
            <Button full rounded primary
                style={{ marginTop: 10 }}
                onPress={() => { navigation.setParams({isCustomer: false}); navigation.navigate("PersonalDetail"); }}>
            <Text>Goto Tradie</Text>
            </Button>
            <Button full rounded primary
                style={{ marginTop: 10 }}
                onPress={() => { navigation.setParams({isCustomer: true}); navigation.navigate("PersonalDetail"); }}>
            <Text>Goto Customer</Text>
            

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