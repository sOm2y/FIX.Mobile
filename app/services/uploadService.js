import { AsyncStorage } from "react-native";
import axios from 'axios';
import qs from 'qs';

export const uploadService = ( image ) => {

    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: '/api/upload',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        data: image
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
    });
  }
  