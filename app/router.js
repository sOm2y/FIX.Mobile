import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Button, Text, Icon, Footer, FooterTab } from "native-base";

import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import Jobs from './screens/Jobs';
import CreateJob from './screens/CreateJob';
import Profile from './screens/Profile';
import Notifications from './screens/Notifications';
import Customer from './screens/registration/Customer';
import Tradie from './screens/registration/Tradie';

  
export const JobNavigator = StackNavigator(
  { 
    Jobs:{
      screen: Jobs,
      navigationOptions: {
        
      }
    },
    CreateJob:{
      screen: CreateJob,
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
      screen: Customer,
      navigationOptions: {
        
      }
    },
    Tradie:{
      screen: Tradie,
      navigationOptions: {
        
      }
    }
  
  },{
    headerMode: 'none',
    animationEnabled: true,
    gesturesEnabled:true,
    initialRouteName : 'SignUp',
  });
    

export const HomeNavigator = TabNavigator(
  {
    Jobs: { screen: JobNavigator},
    Notifications: { screen: Notifications},
    Profile: { screen: Profile}
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

export const AppStartNavigator = StackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      
    }
  },
  SignUp: {
    screen: RegistrationNavigator,
    navigationOptions:{}
  },
 
},{
  headerMode: 'none',
  initialRouteName: 'SignIn'
});

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: HomeNavigator,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: AppStartNavigator,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: 'none',
      mode: 'modal',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  );
};