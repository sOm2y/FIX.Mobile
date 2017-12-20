import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
import { Button, Text, Icon, Footer, FooterTab } from "native-base";

import SignUpScreen from '../screens/SignUpScreen';
import SignIn from '../screens/SignInScreen';
import JobsScreen from '../screens/JobsScreen';
import CreateJobScreen from '../screens/CreateJobScreen';
import CustomerScreen from '../screens/registration/CustomerScreen';
import TradieScreen from '../screens/registration/TradieScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import Profile from '../screens/ProfileScreen';


  
export const JobNavigator = StackNavigator(
  { 
    Jobs:{
      screen: JobsScreen,
      navigationOptions: {
        
      }
    },
    CreateJob:{
      screen: CreateJobScreen,
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
      screen: SignUpScreen,
      navigationOptions: {
        
      }
    },
    Customer:{
      screen: CustomerScreen,
      navigationOptions: {
        
      }
    },
    Tradie:{
      screen: TradieScreen,
      navigationOptions: {
        
      }
    }
  
  },{
    headerMode: 'none',
    animationEnabled: true,
    gesturesEnabled:true,
    initialRouteName : 'SignUp',
  });

  export const LoginNavigator = StackNavigator(
    { 
      SignIn:{
        screen: SignIn,
        navigationOptions: {
          
        }
      },
      SignUp:{
        screen: SignUpScreen,
        navigationOptions: {
          
        }
      }
    },{
      headerMode: 'none',
      animationEnabled: true,
      gesturesEnabled:true,
      initialRouteName : 'SignIn',
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