import React from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  StackNavigator,
  TabNavigator,
  addNavigationHelpers
} from 'react-navigation';
import { Button, Text, Icon, Footer, FooterTab } from 'native-base';

import SignUpScreen from '../screens/SignUpScreen';
import SignIn from '../screens/SignInScreen';
import JobsScreen from '../screens/jobs/JobsScreen';
import CreateJobScreen from '../screens/jobs/CreateJobScreen';
import JobsOnMap from '../screens/jobs/JobsOnMapScreen';
import TradieFinderScreen from '../screens/jobs/TradieFinderScreen';
import CustomerRegister from '../screens/registration/CustomerScreen';
import TradieRegister from '../screens/registration/TradieScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FooterBottomTab from '../components/FooterBottomTab';
import JobDetailScreen from '../screens/jobs/JobDetailScreen';

// export const JobNavigator = StackNavigator(
//   {
//     Jobs:{
//       screen: JobsScreen,
//       navigationOptions: {

//       }
//     }
//   },{
//     headerMode: 'none',
//     animationEnabled: true,
//     gesturesEnabled:true,
//     // initialRouteName : 'Jobs'
//   });

export const RegistrationNavigator = StackNavigator(
  {
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {}
    },
    Customer: {
      screen: CustomerRegister,
      navigationOptions: {}
    },
    Tradie: {
      screen: TradieRegister,
      navigationOptions: {}
    }
  },
  {
    headerMode: 'none',
    animationEnabled: true,
    gesturesEnabled: true,
    initialRouteName: 'SignUp'
  }
);

export const HomeTabNavigator = TabNavigator(
  {
    Jobs: {
      screen: JobsScreen,
      navigationOptions: {}
    },
    JobsOnMap: {
      screen: JobsOnMap,
      navigationOptions: {}
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {}
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {}
    }
  },
  {
    initialRouteName: 'Jobs',
    tabBarPosition: 'bottom',
    animationEnabled: false,
    tabBarOptions: {
      // activeTintColor: '#e91e63',
    },
    tabBarComponent: ({ navigationState, navigation }) => (
      <FooterBottomTab
        navigation={navigation}
        navigationState={navigationState}
      />
    )
  }
);

export const HomeStackNavigator = StackNavigator(
  {
    Jobs: {
      screen: HomeTabNavigator,
      navigationOptions: {}
    }
    ,
    JobDetail: {
      screen: JobDetailScreen,
      navigationOptions: {}
    },
    CreateJob: {
      screen: CreateJobScreen,
      navigationOptions: {}
    },
    TradieFinder: {
      screen: TradieFinderScreen,
      navigationOptions: {}
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Jobs'
  }
);

const AppRootNavigator = StackNavigator(
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
      screen: HomeStackNavigator,
      navigationOptions: {
        gesturesEnabled: false
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
    fontSize: 10
  }
});

export default AppRootNavigator;
