import React from 'react';
import { StyleSheet, Modal } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  Container,
  Content,
  Card,
  CardItem,
  Header,
  Body,
  Title,
  Button,
  Text,
  List,
  ListItem,
  Icon,
  Left,
  Right,
  Switch
} from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onSignOut, USER_KEY } from '../services/authService';
import { fetchUserData } from '../services/profileService';
import {
  logout,
  showChangePasswordModal,
  hideChangePasswordModal,
  setUserData
} from '../actions/actionCreator';

import CustomAnimatedHeader from '../components/headers/CustomAnimatedHeader';
import { ChangePasswordModal } from '../components/modals/ChangePasswordModal';

export class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({});

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
      })
      .catch(err => {
        if(err.status === 401)
          this.props.logout();
        console.log(err);
      });
  }

  render() {
    const { isPasswordModalOpened, user } = this.props;
    return (
      <Container>
        {/* <Header>
          <Body>
            <Title>Profile</Title>
          </Body>
        </Header> */}
        <ChangePasswordModal
          showModal={isPasswordModalOpened}
          closeModal={this.props.hideChangePasswordModal}
        />
        <CustomAnimatedHeader {...this.props} />
     
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    isPasswordModalOpened: state.ProfileReducer.isPasswordModalOpened,
    user: state.ProfileReducer.user
  };
};

const mapDispatchToProps = {
  logout,
  showChangePasswordModal,
  hideChangePasswordModal,
  setUserData
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0,
    paddingLeft: 17
  }
});
