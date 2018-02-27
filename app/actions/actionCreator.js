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
  TradieFinder,
  Jobs,
  CreateJob,
  ShowBusinessModal,
  HideBusinessModal,
  ShowChangePasswordModal,
  HideChangePasswordModal,
  SetUserData,
  LoginAsCustomer,
  LoginAsTradie
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

const tradieFinder = (businessList) => ({
  type: TradieFinder,
  payload: businessList
})

const jobs = () => ({
  type: Jobs
});

const createJob = () => ({
  type: CreateJob
});

const showBusinessModal = () => ({
  type: ShowBusinessModal
});

const hideBusinessModal = () => ({
  type: HideBusinessModal
});

const showChangePasswordModal = () => ({
  type: ShowChangePasswordModal
});

const hideChangePasswordModal = () => ({
  type: HideChangePasswordModal
});

const setUserData = (user) => ({
  type: SetUserData,
  payload: user
});

const loginAsCustomer = () => ({
  type: LoginAsCustomer
});

const loginAsTradie = () => ({
  type: LoginAsTradie
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
  tradieFinder,
  jobs,
  createJob,
  showBusinessModal,
  hideBusinessModal,
  showChangePasswordModal,
  hideChangePasswordModal,
  setUserData,
  loginAsCustomer,
  loginAsTradie
};