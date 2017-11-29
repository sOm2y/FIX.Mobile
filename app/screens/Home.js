import React from "react";
import { StyleSheet, Image } from 'react-native';
import { translate } from 'react-i18next';
import { Container,Header, Body, Title, Content, List, ListItem, Button, Text, Card, CardItem, Thumbnail, Left, Icon } from "native-base";

@translate(['home', 'common'], { wait: true })

export default class Home extends React.Component {
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
        <Content>
        <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={require('../resource/images/xero.png')} />
                <Body>
                  <Text>Job 1</Text>
                  <Text note>Requested on April 15, 2017</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={require('../resource/images/tradie.jpg')} style={{ flex: 1}}/>
                <Text style={{ flex: 1}}>
                Looking at data one piece at a time is more efficient when you consider people you might want to date, restaurants, streaming music, or local events you might want to check out. NativeBase Deck Swiper helps you evaluate one option at a time, instead of selecting from a set of options.
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        <Text>{t('title')}</Text>
          <List>
            <ListItem style={[styles.listItem]}>
              <Button block
              onPress={() => { i18n.changeLanguage('cn') }}>
              <Text>{t('title')}</Text>
              </Button>
            </ListItem>
            <ListItem style={[styles.listItem]}>
              <Button block
              onPress={() => { i18n.changeLanguage('en') }}>
              <Text>{t('title')}</Text>
              </Button>
            </ListItem>
          </List>
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