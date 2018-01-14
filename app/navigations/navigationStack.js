import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
import { Button, Text, Icon, Footer, FooterTab } from "native-base";

import SignUp from '../screens/SignUpScreen';
import SignIn from '../screens/SignInScreen';
import Jobs from '../screens//jobs/JobsScreen';
import CreateJobScreen from '../screens/jobs/CreateJobScreen';
import JobFinderScreen from '../screens/jobs/JobFinderScreen';
import CustomerRegister from '../screens/registration/CustomerScreen';
import TradieRegister from '../screens/registration/TradieScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import Profile from '../screens/ProfileScreen';

export const JobNavigator = StackNavigator(
  { 
    Jobs:{
      screen: Jobs,
      navigationOptions: {
        
      }
    },
    CreateJob:{
      screen: CreateJobScreen,
      navigationOptions: {
        
      }
    },
    JobFinder:{
      screen: JobFinderScreen,
      navigationOptions: {
        
      }
    }
  },{
    headerMode: 'none',
    animationEnabled: true,
    gesturesEnabled:true,
    initialRouteName : 'Jobs',
  });
   
export const RegistrationNavigator = StackNavigator(
  { 
    SignUp:{
      screen: SignUp,
      navigationOptions: {
        
      }
    },
    Customer:{
      screen: CustomerRegister,
      navigationOptions: {
        
      }
    },
    Tradie:{
      screen: TradieRegister,
      navigationOptions: {
        
      }
    }
  
  },{
    headerMode: 'none',
    animationEnabled: true,
    gesturesEnabled:true,
    initialRouteName : 'SignUp',
  });

export const HomeTabNavigator = TabNavigator(
  {
    Jobs: { 
      screen: JobNavigator,
      navigationOptions: {
        
      }
    },
    Notifications: { 
      screen: NotificationsScreen,
      navigationOptions: {
        
      }
    },
    Profile: { 
      screen: Profile,
      navigationOptions: {
        
      }
    }
  },
  {
    tabBarPosition: "bottom",
    initialRouteName : 'Jobs',
    animationEnabled: true,
    // tabBarOptions: {
    //   activeTintColor: '#e91e63',
    // },
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("Jobs")}
              style={{backgroundColor:'transparent'}}>
              <Icon ios='ios-home-outline' android="md-home" />
              <Text>Jobs</Text>
            </Button> 
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Notifications")}
              style={{backgroundColor:'transparent'}}>
              <Icon ios='ios-notifications-outline' android="md-notifications" />
              <Text>Messages</Text>
            </Button>

            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("Profile")}
              style={{backgroundColor:'transparent'}}>
              <Icon ios='ios-settings-outline' android="md-settings" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);

const AppRootNavigator =  StackNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SignUp: {
      screen: RegistrationNavigator,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Home: {
      screen: HomeTabNavigator,
      navigationOptions: {
        gesturesEnabled: false,
        headerLeft: null
      }
    }
  },
  {
    headerMode: 'none',
    mode: 'modal'
  }
);

export default AppRootNavigator;