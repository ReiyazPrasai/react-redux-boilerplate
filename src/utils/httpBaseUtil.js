import axios from 'axios';
import { push } from 'connected-react-router';

import {
  API_URL,
  ENFORCE_PASSWORD_CHANGE,
  ENFORCE_TYPE,
  JWT_TOKEN,
  LANGUAGE_KEY,
  LOGGED_IN_USER,
  MENU_KEY,
  PERMISSION_KEY,
  USER_DETAIL,
  USER_LOGIN_BRANCH,
  USER_LOGIN_DROPDOWN,
} from '../constants/appConfig';
import { http404Error, http500Error } from '../actions/httpErrorAction';
import configureStore from '../store/configureStore';
import { clearLocalStorage, getLocalStorage, setLocalStorage } from './storageUtil';

const store = configureStore();

export const httpBase = () => {
  const api = axios.create({
    baseURL: `${API_URL}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getLocalStorage(JWT_TOKEN),
      Lang: getLocalStorage(LANGUAGE_KEY),
    },
    responseType: 'json',
  });

  api.interceptors.response.use(
    response => {
      if (response.headers && response.headers['x-xsrf-token']) {
        setLocalStorage(JWT_TOKEN, response.headers['x-xsrf-token']);
      }
      return response;
    },
    error => {
      if (401 === error.response.status) {
        clearLocalStorage(JWT_TOKEN);
        clearLocalStorage(USER_DETAIL);
        clearLocalStorage(LOGGED_IN_USER);
        clearLocalStorage(PERMISSION_KEY);
        clearLocalStorage(MENU_KEY);
        clearLocalStorage(ENFORCE_PASSWORD_CHANGE);
        clearLocalStorage(ENFORCE_TYPE);
        clearLocalStorage(USER_LOGIN_DROPDOWN);
        clearLocalStorage(USER_LOGIN_BRANCH);
        store.dispatch(push('/'));
      }
      if (404 === error.response.status) {
        store.dispatch(http404Error());
        store.dispatch(push('/404'));
      }
      if (500 === error.response.status) {
        store.dispatch(http500Error());
        store.dispatch(push('/500'));
      }
      return Promise.reject(error);
    }
  );

  return api;
};
