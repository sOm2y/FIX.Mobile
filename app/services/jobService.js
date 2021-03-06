import { AsyncStorage } from "react-native";
import axios from 'axios';
import qs from 'qs';
import USER_KEY from './authService';

export const inviteTradies = ( tradies ) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/api/jobs/inviteTradies',
      headers: {
        'Content-Type': 'application/json'
      },
      data: tradies
    })
    .then(res => {
      if(res.status === 400 || res.status === 403){
        reject(res);
      }
      resolve(res.data);
    
    })
    .catch(err => {
      reject(err.response);
    });
  });
}

export const postJob = ( job ) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/api/jobs',
      headers: {
        'Content-Type': 'application/json'
      },
      data: job
    })
    .then(res => {
      if(res.status === 400 || res.status === 403){
        reject(res);
      }
      resolve(res.data);
    
    })
    .catch(err => {
      reject(err.response);
    });
  });
}

export const getJobs = ( ) =>{
  return new Promise((resolve, reject) => {

      axios({
        method: 'get',
        url: '/api/jobs/',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if(res.status === 400 || res.status === 403){
          reject(res);
        }
        console.log(res);
        resolve(res.data);
      
      })
      .catch(err => {
        reject(err.response);
      });
    });
}

export const getAssignedJobs = ( ) =>{
  return new Promise((resolve, reject) => {

      axios({
        method: 'get',
        url: '/api/jobs/get-assigned-jobs',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if(res.status === 400 || res.status === 403){
          reject(res);
        }
        console.log(res);
        resolve(res.data);
      
      })
      .catch(err => {
        reject(err.response);
      });
    });
}


export const getJobById = ( jobId ) =>{
  return new Promise((resolve, reject) => {

      axios({
        method: 'get',
        url: '/api/jobs/'+jobId,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if(res.status === 400 || res.status === 403){
          reject(res);
        }
        console.log(res);
        resolve(res.data);
      
      })
      .catch(err => {
        reject(err.response);
      });
    });
}

