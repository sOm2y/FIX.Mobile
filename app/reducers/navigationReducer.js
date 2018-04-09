import { NavigationActions } from "react-navigation";

import AppRootNavigator from "../navigations/navigationStack";
import {
  Login,
  Logout,
  Register,
  CustomerRegister,
  TradieRegister,
  TradieFinder,
  RegisterSuccess,
  NavigateToLogoutScreen,
  NavigateToJobs,
  NavigateToCreateJob,
  JobDetailSuccess,
  NavigationBackForLoggedIn,
  NavigationBackForLoggedOut

} from "../actions/actionTypes";

const ActionForLoggedOut = AppRootNavigator.router.getActionForPathAndParams('SignIn');

const ActionForLoggedIn = AppRootNavigator.router.getActionForPathAndParams('Home');

const stateForLoggedOut = AppRootNavigator.router.getStateForAction(
  ActionForLoggedOut
);

const stateForLoggedIn = AppRootNavigator.router.getStateForAction(
  ActionForLoggedIn,
  stateForLoggedOut
);

const initialState = { stateForLoggedOut, stateForLoggedIn, job:{} };

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

    case CustomerRegister:
      return {
        ...state,
        stateForLoggedOut: AppRootNavigator.router.getStateForAction(
          AppRootNavigator.router.getActionForPathAndParams("SignUp/Customer"),
          stateForLoggedOut
        )
      };
    
    case TradieRegister:
      return {
        ...state,
        stateForLoggedOut: AppRootNavigator.router.getStateForAction(
          AppRootNavigator.router.getActionForPathAndParams("SignUp/Tradie"),
          stateForLoggedOut
        )
      };

    case TradieFinder:
      return {
        ...state,
        stateForLoggedIn: AppRootNavigator.router.getStateForAction(
          AppRootNavigator.router.getActionForPathAndParams("Home/TradieFinder"),
          stateForLoggedIn
        )
      };

    case NavigateToJobs:
      return {
        ...state,
        stateForLoggedIn: AppRootNavigator.router.getStateForAction(
          AppRootNavigator.router.getActionForPathAndParams("Home/Jobs"),
          stateForLoggedIn
        )
      };
    
    case JobDetailSuccess:
      return {
        ...state,
        stateForLoggedIn: AppRootNavigator.router.getStateForAction(
          AppRootNavigator.router.getActionForPathAndParams("Home/JobDetail"),
          stateForLoggedIn
        )
      };

    case NavigateToCreateJob:
      return {
        ...state,
        stateForLoggedIn: AppRootNavigator.router.getStateForAction(
          AppRootNavigator.router.getActionForPathAndParams("Home/CreateJob"),
          stateForLoggedIn
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

    case NavigationBackForLoggedIn:
      return {
        ...state,
        stateForLoggedIn: AppRootNavigator.router.getStateForAction(
          NavigationActions.back(),
          stateForLoggedIn
        )
      };
    
    case NavigationBackForLoggedOut:
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