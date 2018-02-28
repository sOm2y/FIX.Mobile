import React from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
import { Button, Text, Icon, Footer, FooterTab } from "native-base";

import SignUp from '../screens/SignUpScreen';
import SignIn from '../screens/SignInScreen';
import Jobs from '../screens//jobs/JobsScreen';
import CreateJobScreen from '../screens/jobs/CreateJobScreen';
import JobsOnMap from '../screens/jobs/JobsOnMapScreen';
import TradieFinderScreen from '../screens/jobs/TradieFinderScreen';
import CustomerRegister from '../screens/registration/CustomerScreen';
import TradieRegister from '../screens/registration/TradieScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FooterBottomTab from '../components/FooterBottomTab';

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
    TradieFinder:{
      screen: TradieFinderScreen,
      navigationOptions: {
        
      }
    }
  },
  {
    headerMode: 'none',
    animationEnabled: true,
    gesturesEnabled:true,
    initialRouteName : 'Jobs',
  }
);
   
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
  },
  {
    headerMode: 'none',
    animationEnabled: true,
    gesturesEnabled:true,
    initialRouteName : 'SignUp',
  }
);

export const HomeTabNavigator = TabNavigator(
  {
    JobsOnMap:{
      screen: JobsOnMap,
      navigationOptions: {
        
      }
    },
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
      screen: ProfileScreen,
      navigationOptions: {
        
      }
    }
  },
  {
    tabBarPosition: "bottom",
    animationEnabled: false,
    tabBarOptions: {
     // activeTintColor: '#e91e63',
    },
    tabBarComponent: ({navigationState, navigation}) => <FooterBottomTab navigation={navigation} navigationState={navigationState} />
  }
);

export const NotificationNavigator = StackNavigator(
  {
    Customer: {
      screen: CustomerMessenger,
      navigationOptions: {
        
      }
    },
    Tradie: {
      screen: TradieMessenger,
      navigationOptions: {
        
      }
    }
  },
  {
    headerMode: 'none',
    animationEnabled: true,
    gesturesEnabled:true,
    initialRouteName : 'Notification',
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
      }
    }
  },
  {
    headerMode: 'none',
    mode: 'modal'
  }
);

const styles = StyleSheet.create({
  tabText: {
    fontSize: 10,
  },
});

export default AppRootNavigator;