import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Button, Text, Icon, Footer, FooterTab } from "native-base";

import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import Home from './screens/Home';
import Profile from './screens/Profile';
import PersonalDetail from './screens/registration/PersonalDetail';
import PersonalCredential from './screens/registration/PersonalCredential';
import Address from './screens/registration/Address';
import Confirmation from './screens/registration/Confirmation';
import ChooseTradieOrCustomer from './screens/registration/ChooseTradieOrCustomer';

//Registration



export const RegistrationNavigator = StackNavigator({
  ChooseTradieOrCustomer: {
    screen: ChooseTradieOrCustomer,
    navigationOptions:{}
  },
  PersonalDetail: {
    screen:  PersonalDetail,
    navigationOptions: {
      
    }
  },
  PersonalCredential: {
    screen:  PersonalCredential,
    navigationOptions: {
      
    }
  },
  // BusinessDetail: {
  //   screen:  Address,
  //   navigationOptions: {
      
  //   }
  // },
  // BusinessCredential: {
  //   screen:  Confirmation,
  //   navigationOptions: {
      
  //   }
  // },
  Address: {
    screen:  Address,
    navigationOptions: {
      
    }
  },
  Confirmation:{
    screen:  Confirmation,
    navigationOptions: {
      
    }
  }
},{
  headerMode: 'none',
  animationEnabled: true,
  gesturesEnabled:true,
  initialRouteName : 'PersonalDetail',
});

export const HomeNavigator = TabNavigator(

  {
    Home: { screen: Home},
    Profile: { screen: Profile}
  },
  {
    tabBarPosition: "bottom",
    initialRouteName : 'Home',
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
              onPress={() => props.navigation.navigate("Home")}>
              <Icon name="bowtie" />
              <Text>Jobs</Text>
            </Button> 
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Profile")}>
              <Icon name="briefcase" />
              <Text>Notifications</Text>
            </Button>

            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Profile")}>
              <Icon name="briefcase" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);
export const AppStartNavigator = StackNavigator({
  SignUp: {
    screen: RegistrationNavigator,
    navigationOptions: {
     
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      
    }
  }
 
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