
import { NavigationActions } from 'react-navigation';
import { AppRootNavigator } from '../router';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppRootNavigator.router.getActionForPathAndParams('SignedIn');
const tempNavState = AppRootNavigator.router.getStateForAction(firstAction);
const secondAction = AppRootNavigator.router.getActionForPathAndParams('SignedOut');
const initialNavState = AppRootNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

export function navigation(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = AppRootNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case 'Logout':
      nextState = AppRootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'SignedOut' }),
        state
      );
      break;
    default:
      nextState = AppRootNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}