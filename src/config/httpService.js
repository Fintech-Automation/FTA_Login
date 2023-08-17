import axios from 'axios';
import notification from 'antd/es/notification';
import _ from 'lodash';
import {store} from '@redux/store';

axios.interceptors.request.use(function (config) {
  if (_.isEmpty(config.headers?.Authorization)) {
    config.headers.Authorization = 'Bearer ' + store.getState().Auth.meta;
  }
  if (_.isEmpty(config.baseURL)) {
    config.baseURL = store.getState().Auth.domain;
  }
  return config;
});

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response && error.response.status >= 400 && error.response.status < 500;
  if (!expectedError) {
    notification['error']({
      message: 'Expected Error',
      description: error.message,
    });
  } else {
    notification['error']({
      message: 'Unexpected Error',
      description: error.message,
    });
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export const jsforceResponse = (result, successMessage, openSuccess, openFailed, errorMessage) => {
  if (_.get(result, 'error') || _.get(result, 'errorCode')) {
    notification['error']({
      message: result.name,
      description: result.message,
    });
    return result;
  } else if (_.get(result, 'message') || _.get(result, 'errorMessage')) {
    notification['error']({
      message: 'Error',
      description: result.message ? result.message : result.errorMessage,
    });
    return result;
  } else {
    if (openSuccess) {
      notification['success']({
        message: successMessage,
        description: '',
      });
    }
    return result;
  }
};
