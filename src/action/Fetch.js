import axios from 'axios';

const defaultError500 = {
  code: 500,
  status: 'error',
  message: 'error fetch data',
};

export default function fetch(options) {
  return new Promise((resolve, reject) => {
    axios(options)
      .then(res => {
        resolve(res.data);
      })
      .catch(() => {
        reject(defaultError500);
      });
  });
}