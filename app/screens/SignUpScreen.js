import React from "react";
import { StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { Container,Header, Body, Title, Content, List, ListItem, Button, Text, Left, Right, Icon } from "native-base";
import { navigationBack, tradieSignup, customerSignup } from "../actions/actionCreator";

class SignUpScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({

  });

  render(){
    const { navigation } = this.props;

    return (
      <Container>
        <Header>
        <Left>
            <Button transparent onPress={this.props.navigationBack}>
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
                onPress={this.props.customerSignup}>
            <Text>Goto Customer</Text>
            </Button>
            <Button block primary
                style={{ marginTop: 10 }}
                onPress={this.props.tradieSignup}>
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

const mapDispatchToProps = {
  navigationBack,
  customerSignup,
  tradieSignup
};

const SignUp = connect(null, mapDispatchToProps)(SignUpScreen);

export default SignUp;