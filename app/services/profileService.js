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
  