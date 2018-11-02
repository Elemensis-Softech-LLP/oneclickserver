import axios from 'axios';
import Config from '../../server/config';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || Config.port}/api`) :
  '/api';

export default function callApi(endpoint, method = 'get', body) {
  return axios({
    url: `${API_URL}/${endpoint}`,
    headers: { 'content-type': 'application/json' },
    method,
    data: body,
  })
  .then(response => {
    if (response.statusText !== 'OK') {
      return Promise.reject(response);
    }
    return response.data;
  })
  .catch(error => {
    if (error.response) {
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  });
}
