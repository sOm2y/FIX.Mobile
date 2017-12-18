import React from "react";
import { StyleSheet } from 'react-native';
import { Container,Header, Body, Title, Content, List, ListItem, Button, Text, Left, Right, Icon } from "native-base";
export default class SignUp extends React.Component {
  static navigationOptions = ({ navigation }) => ({

  });

  render(){
    const { navigation } = this.props;

    return (
      <Container>
        <Header>
        <Left>
            <Button transparent onPress={() => navigation.navigate("SignIn")}>
                <Icon name="arrow-back" />
            </Button>
            </Left>
          <Body>
            <Title>Sign Up</Title>
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