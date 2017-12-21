import React from "react";
import { StyleSheet } from "react-native";
import { withNavigation } from 'react-navigation';
import { Container, Content, Card, CardItem, Header, Body, Title, Button, Text, List, ListItem, Icon, Left, Right, Switch } from "native-base";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onSignOut } from "../services/authService";
import { logout } from "../actions/actionCreator";

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  });
  render(){
    
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

       {/* <Text>{t('title')}</Text>
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
          </List> */}

        <Button
          style = {{margin:10}}
          block
          onPress={this.props.logout}
        >
        <Text>SIGN OUT</Text>
        </Button>

        </Content>
      </Container>
     
    );
  }
}

const mapDispatchToProps = {
  logout
};
const Profile = connect(null, mapDispatchToProps)(ProfileScreen);
export default Profile;

const styles = StyleSheet.create({
  listItem:{
    marginLeft: 0, 
    paddingLeft: 17
  }
});