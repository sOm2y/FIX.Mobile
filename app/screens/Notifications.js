import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Card, CardItem, Header, Body, Title, Button, Text, List, ListItem, Thumbnail, Left, Right } from "native-base";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onSignOut } from "../services/authService";
import { increment, decrement } from '../actions/index.js';

const pratik = require("../resource/images/xero.png");
const sanket = require("../resource/images/xero.png");
const megha = require("../resource/images/xero.png");
const atul = require("../resource/images/xero.png");
const saurabh = require("../resource/images/xero.png");
const varun = require("../resource/images/xero.png");

const datas = [
    {
      img: pratik,
      text: "Kumar Pratik",
      note: "Its time to build a difference . .",
      time: "3:43 pm"
    },
    {
      img: sanket,
      text: "Kumar Sanket",
      note: "One needs courage to be happy and smiling all time . . ",
      time: "1:12 pm"
    },
    {
      img: megha,
      text: "Megha",
      note: "Live a life style that matchs your vision",
      time: "10:03 am"
    },
    {
      img: atul,
      text: "Atul Ranjan",
      note: "Failure is temporary, giving up makes it permanent",
      time: "5:47 am"
    },
    {
      img: saurabh,
      text: "Saurabh Sahu",
      note: "The biggest risk is a missed opportunity !!",
      time: "11:11 pm"
    },
    {
      img: varun,
      text: "Varun Sahu",
      note: "Wish I had a Time machine . .",
      time: "8:54 pm"
    }
  ];
class Notifications extends React.Component {
  static navigationOptions = ({ navigation }) => ({
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
       
        <List
        dataArray={datas}
        renderRow={data =>
          <ListItem avatar  style={styles.listItem}>
            <Left>
              <Thumbnail small source={data.img} />
            </Left>
            <Body>
              <Text>{data.text}</Text>
              <Text numberOfLines={1} note>{data.note}</Text>
            </Body>
            <Right>
              <Text note>{data.time}</Text>
            </Right>
          </ListItem>}
      />

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