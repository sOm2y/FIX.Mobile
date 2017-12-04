import React from "react";
import { StyleSheet, Image, Dimensions } from 'react-native';
import { translate } from 'react-i18next';
import { Container,Header, Body, Title, Content, List, ListItem, Button, Text, Card, CardItem, Thumbnail, Left, Icon } from "native-base";

const deviceWidth = Dimensions.get("window").width;

const logo = require("../resource/images/xero.png");
const cardImage = require("../resource/images/tradie.jpg");

@translate(['home', 'common'], { wait: true })

export default class Jobs extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('home:title')
  });

  render(){

    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;

    return (
      <Container>
        <Header>
          <Body>
            <Title>{t('title')}</Title>
          </Body>
        </Header>
        <Content padder>
        <Button style={styles.button}
              block 
              primary
              onPress={() => navigation.navigate("CreateJob")}
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