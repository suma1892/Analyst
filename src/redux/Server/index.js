import axios from 'axios';
import {PASSWORD} from '../../config';
import {store} from '../stores';
// import * as URL from '../../config';
import {submitLogout, handleFingerPrint} from '../actions';
import Toast from 'react-native-simple-toast';

const ERR_TOKEN = 500;
const TOKEN_IS_EXPIRED = 'Token is expired';
export const instance = async config => {
  let Axios = axios.create({
    headers: {
      // 'Content-Type': 'application/json',
      // "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json"
    },
  });

  Axios.interceptors.request.use(
    request => {
      try {
        // const token = store?.getState()?.loginData?.token;
        let BASE_URL = store?.getState()?.server?.server;
        console.log('base urtl = ', store?.getState()?.server?.server);
        let USERNAME = store?.getState()?.loginData?.CLIENT_KEY;
        console.log('user nmae = ', USERNAME);
        console.log(JSON.stringify(BASE_URL));
        request.baseURL = `${BASE_URL}/`;
        // request.auth.username = USERNAME;
        // request.auth.password = PASSWORD;
        request.auth = {
          username: USERNAME,
          password: PASSWORD,
        };
        console.log('auth = ', request.auth);
        // request.headers['Content-Type'] = 'application/x-www-form-urlencoded", Accept: "application/json';
        request._countError = (request._countError || 0) + 1;
        request.timeout = 7000;
        console.log('url = ', BASE_URL);
        return request;
      } catch (error) {
        console.log(error);
      }
    },
    error => {
      return Promise.reject(error);
    },
  );

  Axios.interceptors.response.use(
    function (successRes) {
      return successRes;
    },
    function (error) {
      // if (error.config && error.response && error.response.status === 404) {
      try {
        console.log('err = ', error);
        if (error?.response?.status === 401) {
          // const isFingerprint = useSelector(state => state?.loginData?.isFingerprint) || false;
          const isFingerprint =
            store?.getState()?.loginData?.isFingerprint || false;
          Toast.showWithGravity(
            'Token expired, silahkan login kembali',
            Toast.LONG,
            Toast.BOTTOM,
          );
          store.dispatch(submitLogout());
          if (isFingerprint) {
            store.dispatch(handleFingerPrint());
          }
        }

        // if (error?.config?._countError < 3) {
        //   return Axios.request(error.config);
        // }

        return Promise.reject(error);
      } catch (e) {
        //
      }
    },
  );

  const res = await Axios(config);

  return res;
};
