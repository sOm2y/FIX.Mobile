import axios from 'axios';

export const postQuote = quote => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/api/quotes',
      headers: {
        'Content-Type': 'application/json'
      },
      data: quote
    })
      .then(res => {
        if (res.status === 400 || res.status === 403) {
          reject(res);
        }
        console.log(res);
        resolve(res);
      })
      .catch(err => {
        console.log(err);
        reject(err.response);
      });
  });
};

export const updateQuoteStatus = quoteStatus => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/api/quotes/updateQuoteStatus',
      headers: {
        'Content-Type': 'application/json'
      },
      data: quoteStatus
    })
      .then(res => {
        if (res.status === 400 || res.status === 403) {
          reject(res);
        }
        console.log(res);
        resolve(res);
      })
      .catch(err => {
        console.log(err);
        reject(err.response);
      });
  });
};
