import {
  NextPage,
  PreviousPage,
  Login,
  Logout,
  Register,
  RegisterSuccess,
  NavigateToLogoutScreen,
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
  ShowQuoteModal,
  HideQuoteModal,
  ShowQuoteDetailModal,
  HideQuoteDetailModal,
  ShowChangePasswordModal,
  HideChangePasswordModal,
  SetUserData,
  SetUserType,
  LoginAsCustomer,
  LoginAsTradie,
  NavigationBackForLoggedIn,
  NavigationBackForLoggedOut,
  SubmitQuote,
  UpdateQuote
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

const navigationBackLoggedIn = () => ({
  type: NavigationBackForLoggedIn
});

const navigationBackLoggedOut = () => ({
  type: NavigationBackForLoggedOut
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


const showQuoteModal = () => ({
  type: ShowQuoteModal
});

const hideQuoteModal = () => ({
  type: HideQuoteModal
});

const showQuoteDetailModal = (quote) => ({
  type: ShowQuoteDetailModal,
  payload: quote
});

const hideQuoteDetailModal = () => ({
  type: HideQuoteDetailModal
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

/* Quote Action */
const submitQuote = (quote) => ({
  type:SubmitQuote,
  payload: quote
});

const updateQuote = quoteStatus => ({
  type: UpdateQuote,
  payload: quoteStatus
})

export {
  nextPage,
  previousPage,
  login,
  logout,
  register,
  registerSuccess,
  navigateToLogoutScreen,
  navigationBackLoggedIn,
  navigationBackLoggedOut,
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
  showQuoteModal,
  hideQuoteModal,
  showQuoteDetailModal,
  hideQuoteDetailModal,
  showChangePasswordModal,
  hideChangePasswordModal,
  setUserData,
  setUserType,
  loginAsCustomer,
  loginAsTradie,
  submitQuote,
  updateQuote
};