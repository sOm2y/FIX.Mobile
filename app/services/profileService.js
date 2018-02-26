import axios from 'axios';

export const fetchUserData = () => {

  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: '/api/users/current',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.status === 400 || res.status === 403){
        reject(res);
      }
      // console.log(res);
      resolve(res);
    
    })
    .catch(err => {
      reject(err.response);
    });
  });
}

export const postChangePassword = (pwd) => {

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/api/users/changePassword',
      headers: {
        'Content-Type': 'application/json'
      },
      data: pwd 
    })
    .then(res => {
      if(res.status === 400 || res.status === 403){
        reject(res);
      }
      // console.log(res);
      resolve(res);
    
    })
    .catch(err => {
      reject(err.response);
    });
  });
}



