import { Permissions, Notifications, Constants } from 'expo';
import axios from 'axios';

export const postDeviceToken = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );

  let finalStatus = existingStatus;
  let token = '';

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }
  if (Constants.isDevice) {
    token = await Notifications.getExpoPushTokenAsync();
  }

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/api/devices/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        description: Constants.deviceName,
        deviceToken: token,
        registrationDate: Date.now()
      }
    })
      .then(res => {
        if (res.status === 400 || res.status === 403) {
          reject(res);
        }
        console.log(res);
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response);
      });
  });
  
};

export const getNotifications = () => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/api/notifications/',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 400 || res.status === 403) {
          reject(res);
        }
        console.log(res);
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response);
      });
  });
};
