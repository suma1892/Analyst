import axios from 'axios';
import {instance as axiosServer} from '../../Server';
import {serverAddressConstant} from '../../constants';
import {API_ADDRESS_AUTH, CLIENT_ID, SERVER_ID} from '../../../config';
import {store} from '../../stores';
import SimpleToast from 'react-native-simple-toast';

export const serverAddress = data => {
  const config = {
    method: 'get',
    url: API_ADDRESS_AUTH,
    params: {
      SERVER_ID: SERVER_ID,
      CLIENT_ID: CLIENT_ID,
    },
  };
  return async dispatch => {
    dispatch({type: serverAddressConstant.LOADING});

    axios(config)
      .then(response => {
        const res = response?.data;
        console.log('obj res', res);
        dispatch({
          type: serverAddressConstant.SUCCESS,
          payload: res[0]?.SERVER_END_POINT,
        });
      })
      .catch(function (error) {
        SimpleToast.show(
          'Terjadi kesalahan ketika mengambil info dari server',
          SimpleToast.LONG,
          SimpleToast.BOTTOM,
        );
        dispatch({
          type: serverAddressConstant.ERROR,
          payload: error,
        });
      });
  };
};

export const changeServerAddress = data => {
  return async dispatch => {
    dispatch({
      type: serverAddressConstant.SUCCESS,
      payload: data,
    });
  };
};
