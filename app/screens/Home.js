import React from "react";
import { StyleSheet } from 'react-native';
import { translate } from 'react-i18next';
import { Container,Header, Body, Title, Content, List, ListItem, Button, Text } from "native-base";

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
            <Title>Header</Title>
          </Body>
        </Header>
        <Content>
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