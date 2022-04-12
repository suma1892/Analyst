import axios from 'axios';
import {instance as axiosServer} from '../../Server';
import {serverAddressConstant} from '../../constants';
import {
  API_ADDRESS_AUTH,
  CLIENT_ID,
  GET_PROCUREMENT,
  SERVER_ID,
} from '../../../config';
import {store} from '../../stores';
import SimpleToast from 'react-native-simple-toast';

export const preview = (data, callback) => {
  const USER = store.getState().loginData;
  const config = {
    method: 'post',
    url: `${GET_PROCUREMENT}${data?.PARAMETER}.cfm`,
    data: {
      SR: {
        ACTION: 'print_transaction',
        COMPANY_ID: data?.COMPANY_ID,
        SITE_ID: data?.SITE_ID,
        USER_ID: USER?.userProfile?.[0]?.USER_ID,
        SESSION_LOGIN_ID: USER?.SESSION_LOGIN_ID,
        SR_ID: 'TEST-0001',
        // SR_ID: data?.SR_ID || '',
      },
    },
  };
  console.log(JSON.stringify(config));
  return new Promise((resolve, reject) => {
    axiosServer(config)
      .then(response => {
        const res = response?.data;
        // console.log('obj res', res);
        callback(res);
        resolve(res);
      })
      .catch(function (error) {
        console.log('err = ', error?.response?.data);
        SimpleToast.show(
          'Terjadi kesalahan ketika mengambil info dari server',
          SimpleToast.LONG,
          SimpleToast.BOTTOM,
        );
        reject(error);
      });
  });

  // };
};
