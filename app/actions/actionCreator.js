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
  RefreshJobs,
  NavigateToCreateJob,
  SubmitJobDetail,
  NavigateToJobs,
  JobDetail,
  ShowBusinessModal,
  HideBusinessModal,
  ShowChangePasswordModal,
  HideChangePasswordModal,
  SetUserData,
  SetUserType,
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

const registerSuccess = (jobs) => ({
  type: RegisterSuccess,
  payload: jobs
});
// const registerSuccess = (jobs) => ({
//   type: RegisterSuccess,
//   payload: jobs
// });


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

const refreshJobs = (value) => ({
  type: RefreshJobs,
  payload: value
});

const navigateToCreateJob = () => ({
  type: NavigateToCreateJob
});

const submitJobDetail = (job) => ({
  type: SubmitJobDetail,
  payload: job
});

const navigateToJobs = () => ({
  type: NavigateToJobs
});

const jobDetail = ( jobId ) => ({
  type: JobDetail,
  payload: {
    jobId
  }
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

const setUserType = (userType) => ({
  type: SetUserType,
  payload: userType
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
  refreshJobs,
  navigateToCreateJob,
  submitJobDetail,
  navigateToJobs,
  jobDetail,
  showBusinessModal,
  hideBusinessModal,
  showChangePasswordModal,
  hideChangePasswordModal,
  setUserData,
  setUserType,
  loginAsCustomer,
  loginAsTradie
};