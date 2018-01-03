import { NavigationActions } from "react-navigation";

import AppRootNavigator, { Tabs, RegistrationNavigator } from "../navigations/navigationStack";
import {
  Login,
  Logout,
  Register,
  RegisterSuccess,
  NavigateToLogoutScreen,
  CustomerSignup,
  TradieSignup
} from "../actions/actionTypes";

const ActionForLoggedOut = AppRootNavigator.router.getActionForPathAndParams('SignIn');

const ActionForLoggedIn = AppRootNavigator.router.getActionForPathAndParams('Home');

const ActionForTraide = AppRootNavigator.router.getActionForPathAndParams('Tradie');

const ActionForCustomer = AppRootNavigator.router.getActionForPathAndParams('Customer');

const stateForLoggedOut = AppRootNavigator.router.getStateForAction(
  ActionForLoggedOut
);

const stateForLoggedIn = AppRootNavigator.router.getStateForAction(
  ActionForLoggedIn,
  stateForLoggedOut
);

const initialState = { stateForLoggedOut, stateForLoggedIn };

const navigationReducer = (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case Login:
      return {
        ...state,
        stateForLoggedIn: AppRootNavigator.router.getStateForAction(
          ActionForLoggedIn,
          stateForLoggedOut
        )
      };

    case Register:
      return {
        ...state,
        stateForLoggedOut: AppRootNavigator.router.getStateForAction(
          AppRootNavigator.router.getActionForPathAndParams("SignUp"),
          stateForLoggedOut
        )
      };

    case RegisterSuccess:
      return {
        ...state,
        stateForLoggedIn: AppRootNavigator.router.getStateForAction(
          NavigationActions.reset({
            index: 2,
            actions: [
              NavigationActions.navigate({ routeName: 'SignIn' }),
              NavigationActions.navigate({ routeName: 'SignUp' }),
              NavigationActions.navigate({ routeName: 'Home' })
            ]
          })
        )
      };

    /* Another option for RegisterSuccess
        nextState = {
          ...state,
          stateForLoggedIn: AppNavigator.router.getStateForAction(
            ActionForLoggedIn,
            AppNavigator.router.getStateForAction(
              AppNavigator.router.getActionForPathAndParams("signup"),
              stateForLoggedOut
            )
          )
        };
      */

    case "Navigation/BACK":
      return {
        ...state,
        stateForLoggedOut: AppRootNavigator.router.getStateForAction(
          NavigationActions.back(),
          stateForLoggedOut
        )
      };

    case Logout:
      return {
        ...state,
        stateForLoggedOut: AppRootNavigator.router.getStateForAction(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
          })
        )
      };

    /* Other logic for logging out, more cleaner but unlike the above isn't telling the reader 
           that navigation is reset, that's why I chose the *reset* one for the article. I prefer
           this one, what about you?
        
        case 'LOGOUT':
            nextState = { ...state, initialStateForLoggedIn, initialStateForLoggedOut}
            break;
    */

    case NavigateToLogoutScreen:
      return {
        ...state,
        stateForLoggedIn: {
          ...state.stateForLoggedIn,
          routes: state.stateForLoggedIn.routes.map(
            route =>
              route.routeName === 'Home'
                ? { ...route, index: 2 }
                : { ...route }
          )
        }
      };
    
    case CustomerSignup:
      console.log(state+'  '+AppRootNavigator.router.getActionForPathAndParams("Home")+NavigationActions.navigate({ routeName: 'Home' }));
      return {
        ...state,
        stateForLoggedIn: AppRootNavigator.router.getStateForAction(
          RegistrationNavigator.router.getActionForPathAndParams("Customer"),
          state.stateForLoggedOut
       
        )
      };

    case TradieSignup:
      return {
        ...state,
        stateForLoggedIn: AppRootNavigator.router.getStateForAction(
          ActionForTraide,
          state.stateForLoggedOut
        )
      };

    default:
      return {
        ...state,
        stateForLoggedIn: AppRootNavigator.router.getStateForAction(
          action,
          state.stateForLoggedIn
        )
      };
  }
};

export default navigationReducer;