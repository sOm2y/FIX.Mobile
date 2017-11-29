import React from "react";
import { View } from "react-native";
import { Container, Content, Card, CardItem, Header, Body, Title, Button, Text } from "native-base";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onSignOut } from "../services/authService";
import { increment, decrement } from '../actions/index.js';

class Notifications extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('home:title')
  });
  render(){

    const { t, i18n, navigation, count } = this.props;
    const { navigate } = navigation;
    
    return (  
      <Container>
        <Header>
          <Body>
            <Title>Notifications</Title>
          </Body>
        </Header>
        <Content padder>
       
        <Card>
          <CardItem>
            <Text style = {{fontSize: 20, fontWeight: 'bold'}}>
              {count}
            </Text>
          </CardItem>
        </Card>
        <Button dark bordered onPress= {() => this.props.increment()}>
          <Text>Increment</Text>
        </Button>
        <Button dark bordered onPress= {() => this.props.decrement()}>
          <Text>Decrement</Text>
        </Button>

        <Button
          style = {{marginTop:20}}
          block
          onPress={() => onSignOut().then(() => navigation.navigate("SignedOut"))}
        >
        <Text>SIGN OUT</Text>
        </Button>

        </Content>
      </Container>
     
    );
  }
}

function mapStateToProps(state){
    return{
    count : state.count
    };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({increment: increment, decrement: decrement}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(Notifications);