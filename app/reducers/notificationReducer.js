import {
  RefreshNotifications,
  RefreshNotificationsSuccess,
  RefreshNotificationsFailed,
  Logout
} from '../actions/actionTypes';

const initialState = {
  isRefreshing: false,
  notifications: []
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case RefreshNotifications:
      return { ...state, isRefreshing: true };
      
    case RefreshNotificationsSuccess:
      return { ...state, isRefreshing: false, notifications: action.payload };

    case RefreshNotificationsFailed:
      return { ...state, isRefreshing: false, errorResult: action.payload };

    case Logout:
      return { ...state, isRefreshing: false, notifications: [] };
      
    default:
      return state;
  }
};

export default notificationReducer;
