import axios from 'axios';
import {instance as axiosServer} from '../../Server';
import {loginConstant, postConstant} from '../../constants';
import {CLIENT_KEY, LOGIN, CLIENT_ID} from '../../../config';
import {store} from '../../stores';
import SimpleToast from 'react-native-simple-toast';
import Alert from '../../../utils/Alert';

export const submitLogin = (data, callback) => {
  const config = {
    method: 'post',
    url: LOGIN,
    data: data,
  };
  console.log('config', config);
  return async dispatch => {
    dispatch({type: loginConstant.LOADING});
    axiosServer(config)
      .then(response => {
        const res = response?.data;
        console.log('res login ', res?.length);
        if (res?.length > 0) {
          dispatch({type: loginConstant.SUCCESS, payload: res});
        } else {
          Alert(
            'Peringatan',
            'Device belum terdaftar, silahkan Daftarkan device anda',
          );
        }

        callback();
      })
      .catch(function (error) {
        callback();
        console.log(error);
        SimpleToast.show(
          'Terjadi kesalahan ketika mengambil data',
          SimpleToast.LONG,
          SimpleToast.BOTTOM,
        );
        dispatch({
          type: loginConstant.ERROR,
          payload: error,
        });
      });
  };
};

export const submitRegister = (data, callback, callbackError) => {
  const config = {
    method: 'post',
    url: LOGIN,
    data: data,
  };
  console.log('config', config);
  return async dispatch => {
    dispatch({type: loginConstant.LOADING});
    axiosServer(config)
      .then(response => {
        const res = response?.data;
        console.log('res register ', res?.length);
        if (res?.[0]?.IS_FAILED === 1) {
          callbackError();
          dispatch({type: loginConstant.ERROR, payload: res});
          Alert(
            'Peringatan',
            res?.[0].MESSAGE || 'Terjadi kesalahan, silahkan coba kembali',
          );
        } else {
          dispatch({
            type: loginConstant.SESSION,
            payload: res?.[0].SESSION_LOGIN_ID,
          });
          callback(res?.[0]?.MESSAGE);
        }

        // callback();
      })
      .catch(function (error) {
        callback();
        console.log(error);
        SimpleToast.show(
          'Terjadi kesalahan ketika mengambil data',
          SimpleToast.LONG,
          SimpleToast.BOTTOM,
        );
        dispatch({
          type: postConstant.ERROR,
          payload: error,
        });
      });
  };
};

export const submitLogout = (data, callback, callbackError) => {
  const config = {
    method: 'post',
    url: LOGIN,
    data: data,
  };
  console.log('config', config);
  return async dispatch => {
    dispatch({type: loginConstant.LOADING});
    axiosServer(config)
      .then(response => {
        const res = response?.data;
        console.log('res logout ', res);
        if (res?.[0]?.IS_FAILED === 1) {
          callbackError();
          dispatch({type: loginConstant.ERROR_LOGOUT, payload: res});
          Alert(
            'Peringatan',
            res?.[0].MESSAGE || 'Terjadi kesalahan, silahkan coba kembali',
          );
        } else {
          dispatch({
            type: loginConstant.LOGOUT,
            // payload: res?.[0].SESSION_LOGIN_ID,
          });
          callback(res?.[0]?.MESSAGE);
        }

        // callback();
      })
      .catch(function (error) {
        callback();
        console.log(error);
        SimpleToast.show(
          'Terjadi kesalahan ketika mengambil data',
          SimpleToast.LONG,
          SimpleToast.BOTTOM,
        );
        dispatch({
          type: postConstant.ERROR,
          payload: error,
        });
      });
  };
};

export const generateClientKey = (data, callback, callbackError) => {
  const config = {
    method: 'post',
    url: CLIENT_KEY,
    data: {
      rqClientGetKey: {
        ACTION: 'get_client_key',
        CLIENT_ID: CLIENT_ID,
      },
    },
  };
  console.log('config', config);
  return async dispatch => {
    // dispatch({type: loginConstant.LOADING});
    axiosServer(config)
      .then(response => {
        const res = response?.data;
        console.log('res key ', res);
        if (res?.length > 0) {
          dispatch({
            type: loginConstant.CLIENT_KEY,
            payload: res?.[0]?.CLIENT_KEY,
          });
          // callback(res?.[0]?.MESSAGE);
        } else {
          // callbackError();
          dispatch({type: loginConstant.ERROR});
          Alert(
            'Peringatan',
            res?.[0]?.MESSAGE || 'Terjadi kesalahan, silahkan hubungi admin',
          );
        }

        // callback();
      })
      .catch(function (error) {
        // callback();
        console.log(error);
        SimpleToast.show(
          'Terjadi kesalahan ketika mengambil data',
          SimpleToast.LONG,
          SimpleToast.BOTTOM,
        );
        dispatch({
          type: postConstant.ERROR,
          payload: error,
        });
      });
  };
};
