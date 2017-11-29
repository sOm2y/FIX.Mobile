import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Card, CardItem, Header, Body, Title, Button, Text, List, ListItem, Icon, Left, Right, Switch } from "native-base";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onSignOut } from "../services/authService";
import { increment, decrement } from '../actions/index.js';

class Profile extends React.Component {
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
            <Title>Header</Title>
          </Body>
        </Header>
        <Content>
       
        <List>
        <ListItem icon style={styles.listItem}>
          <Left>
            <Icon name="plane" />
          </Left>
          <Body>
            <Text>Airplane Mode</Text>
          </Body>
          <Right>
            <Switch value={false} />
          </Right>
        </ListItem>
        <ListItem icon style={styles.listItem}>
          <Left>
            <Icon name="wifi" />
          </Left>
          <Body>
            <Text>Wi-Fi</Text>
          </Body>
          <Right>
            <Text>GeekyAnts</Text>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem icon style={styles.listItem}>
          <Left>
            <Icon name="bluetooth" />
          </Left>
          <Body>
            <Text>Bluetooth</Text>
          </Body>
          <Right>
            <Text>On</Text>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      </List>

        <Button
          style = {{margin:10}}
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
export default connect(mapStateToProps, matchDispatchToProps)(Profile);

const styles = StyleSheet.create({
  listItem:{
    marginLeft: 0, 
    paddingLeft: 17
  }
});