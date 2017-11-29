import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Card, CardItem, Header, Body, Title, Button, Text, List, ListItem, Thumbnail, Left, Right } from "native-base";
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
        <Content>
       
        <List>
            <ListItem avatar style={styles.listItem}>
                <Left>
                    <Thumbnail source={require('../resource/images/xero.png')} />
                </Left>
                <Body>
                    <Text>Kumar Pratik</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                </Body>
                <Right>
                    <Text note>3:43 pm</Text>
                </Right>
            </ListItem>

            <ListItem avatar style={styles.listItem}>
                <Left>
                    <Thumbnail source={require('../resource/images/xero.png')} />
                </Left>
                <Body>
                    <Text>Kumar Pratik</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                </Body>
                <Right>
                    <Text note>3:43 pm</Text>
                </Right>
            </ListItem>

            <ListItem avatar style={styles.listItem}>
                <Left>
                    <Thumbnail source={require('../resource/images/xero.png')} />
                </Left>
                <Body>
                    <Text>Kumar Pratik</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                </Body>
                <Right>
                    <Text note>3:43 pm</Text>
                </Right>
            </ListItem>

            <ListItem avatar style={styles.listItem}>
                <Left>
                    <Thumbnail source={require('../resource/images/xero.png')} />
                </Left>
                <Body>
                    <Text>Kumar Pratik</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                </Body>
                <Right>
                    <Text note>3:43 pm</Text>
                </Right>
            </ListItem>

            <ListItem avatar style={styles.listItem}>
                <Left>
                    <Thumbnail source={require('../resource/images/xero.png')} />
                </Left>
                <Body>
                    <Text>Kumar Pratik</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                </Body>
                <Right>
                    <Text note>3:43 pm</Text>
                </Right>
            </ListItem>

            <ListItem avatar style={styles.listItem}>
                <Left>
                    <Thumbnail source={require('../resource/images/xero.png')} />
                </Left>
                <Body>
                    <Text>Kumar Pratik</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                </Body>
                <Right>
                    <Text note>3:43 pm</Text>
                </Right>
            </ListItem>
        </List>

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

const styles = StyleSheet.create({
    listItem:{
      marginLeft: 0, 
      paddingLeft: 17
    }
  });