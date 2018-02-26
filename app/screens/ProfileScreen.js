import React from "react";
import { StyleSheet, Modal } from "react-native";
import { withNavigation } from 'react-navigation';
import { Container, Content, Card, CardItem, Header, Body, Title, Button, Text, List, ListItem, Icon, Left, Right, Switch } from "native-base";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onSignOut, USER_KEY } from "../services/authService";
import { fetchUserData } from "../services/profileService";
import { logout, showChangePasswordModal, hideChangePasswordModal, setUserData } from "../actions/actionCreator";
import { ChangePasswordModal } from "../components/modals/ChangePasswordModal";

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  });

  // constructor() {
  //   super();
  //   this.state = {
  //     user: {

  //     }
  //   }
  // }

  componentDidMount() {
    fetchUserData()
    .then(res => {
      // this.setState({user:res.data});  
      this.props.setUserData(res.data);
    }).catch(err => {
      console.log(err);
    })
    
}

  render(){
    const { isPasswordChanged, user } = this.props;
    return (  
      <Container>
        <Header>
          <Body>
            <Title>Profile</Title>
          </Body>
        </Header>
        <Content>

        <ChangePasswordModal showModal={isPasswordChanged} 
                             closeModel={this.props.hideChangePasswordModal} />
        

        <List>
        <ListItem icon style={styles.listItem}>
          <Left>
            <Icon name="person" />
          </Left>
          <Body>
            <Text>User Name: {user.userName}</Text>
          </Body>
        </ListItem>
        <ListItem icon style={styles.listItem}>
          <Left>
            <Icon name="mail" />
          </Left>
          <Body>
            <Text>Email: {user.email}</Text>
          </Body>
        </ListItem>


        <Button
          style = {{margin:10}}
          block
          onPress={this.props.showChangePasswordModal}
        >
        <Text>CHANGE PASSWORD</Text>
        </Button>


        {/* <ListItem icon style={styles.listItem}>
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
        </ListItem> */}
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

const mapStateToProps = (state, props) =>{
  return{
    isPasswordChanged : state.ProfileReducer.isPasswordChanged,
    user : state.ProfileReducer.user
  };
}

const mapDispatchToProps = {
  logout,
  showChangePasswordModal,
  hideChangePasswordModal,
  setUserData
};
const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
export default Profile;

const styles = StyleSheet.create({
  listItem:{
    marginLeft: 0, 
    paddingLeft: 17
  }
});