import {
  NextPage,
  PreviousPage,
  Login,
  Logout,
  Register,
  RegisterSuccess,
  NavigateToLogoutScreen,
  NavigationBack,
  CustomerRegister,
  TradieRegister,
  Jobs,
  CreateJob
} from "./actionTypes";

export const increment = () => {
    return{
      type: "Increment"
    };
  }
  
export const decrement = () => {
  return{
    type: "Decrement"
  };
}
const nextPage = () => ({
  type: NextPage
});

const previousPage = () => ({
  type: PreviousPage
});

const login = () => ({
  type: Login
});

const logout = () => ({
  type: Logout
});

const register = () => ({
  type: Register
});

const registerSuccess = () => ({
  type: RegisterSuccess
});

const navigateToLogoutScreen = () => ({
  type: NavigateToLogoutScreen
});

const navigationBack = () => ({
  type: NavigationBack
});

const customerRegister = () => ({
  type: CustomerRegister
});

const tradieRegister = () => ({
  type: TradieRegister
});

const jobs = () => ({
  type: Jobs
});

const createJob = () => ({
  type: CreateJob
});


export {
  nextPage,
  previousPage,
  login,
  logout,
  register,
  registerSuccess,
  navigateToLogoutScreen,
  navigationBack,
  customerRegister,
  tradieRegister,
  jobs,
  createJob
};