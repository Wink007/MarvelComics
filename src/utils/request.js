import axios from 'axios';

const request = (url, params = {}) => {
  const {
    method = 'get',
    ...requestParams
  } = params;

  return axios({
    url,
    method,
    ...requestParams,
  }).then(response => ({
    result: response.data,
  })).catch(error => ({
    error,
  }));
};

export default request;
