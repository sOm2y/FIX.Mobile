import React from "react";
import { StyleSheet, Image, Dimensions } from 'react-native';
import { connect } from "react-redux";
import { Container,Header, Body, Title, Content, List, ListItem, Button, Text, Card, CardItem, Thumbnail, Left, Right, Icon } from "native-base";
import { createJob, navigationBack } from '../../actions/actionCreator';
import {getAccessToken} from '../../services/authService';

const deviceWidth = Dimensions.get("window").width;

const logo = require("../../resource/images/xero.png");
const cardImage = require("../../resource/images/tradie.jpg");

class JobsScreen extends React.Component {
  componentDidMount(){
    getAccessToken();
  }

  static navigationOptions = ({ navigation }) => ({
  });

  render(){

    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
      <Container>
        <Header>
       
          <Body>
            <Title>Jobs</Title>
          </Body>
         
        </Header>
        <Content padder>
        <Button style={styles.button}
              block 
              primary
              onPress={this.props.createJob}
            >
             <Text>Add new Job</Text>
            </Button>
        <Card style={styles.mb}>
          <CardItem bordered>
            <Left>
              <Thumbnail source={logo} />
              <Body>
                <Text>NativeBase</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>

          <CardItem>
            <Body>
              <Image
                style={{
                  alignSelf: "center",
                  height: 150,
                  resizeMode: "cover",
                  width: deviceWidth / 1.18,
                  marginVertical: 5
                }}
                source={cardImage}
              />
              <Text>
                NativeBase is a free and source framework that enable
                developers to build high-quality mobile apps using React
                Native with a fusion of ES6. NativeBase builds a layer on
                top of React Native that provides you with basic set of
                components for mobile application development.
              </Text>
            </Body>
          </CardItem>
          <CardItem style={{ paddingVertical: 0 }}>
            <Left>
              <Button transparent>
                <Icon name="logo-github" />
                <Text>4,923 stars</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>

        <Card style={styles.mb}>
          <CardItem bordered>
            <Left>
              <Thumbnail source={logo} />
              <Body>
                <Text>NativeBase</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>

          <CardItem>
            <Body>
              <Image
                style={{
                  alignSelf: "center",
                  height: 150,
                  resizeMode: "cover",
                  width: deviceWidth / 1.18,
                  marginVertical: 5
                }}
                source={cardImage}
              />
              <Text>
                NativeBase is a free and source framework that enable
                developers to build high-quality mobile apps using React
                Native with a fusion of ES6. NativeBase builds a layer on
                top of React Native that provides you with basic set of
                components for mobile application development.
              </Text>
            </Body>
          </CardItem>
          <CardItem style={{ paddingVertical: 0 }}>
            <Left>
              <Button transparent>
                <Icon name="logo-github" />
                <Text>4,923 stars</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
        
        </Content>
      </Container>
    );
  }
}

//TODO: Bug from nativebase
let {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  listItem:{
    marginLeft: 0, 
    paddingLeft: 17
  },
  button:{
    marginBottom: 20
  },
  image:{
   width: width,
   flex: 1,
   height:200
  }
});

const mapDispatchToProps = {
  navigationBack,
  createJob
};

const Jobs = connect(null, mapDispatchToProps)(JobsScreen);

export default Jobs;