import axios from 'axios';
import {instance as axiosServer} from '../../Server';
import {
  approvalConstant,
  procurementConstant,
  detaiProcurementConstant,
  postConstant,
} from '../../constants';
import {GET_APPROVAL, GET_PROCUREMENT} from '../../../config';
import {store} from '../../stores';
import SimpleToast from 'react-native-simple-toast';
import moment from 'moment';
export const getsApproval = callback => {
  const USER = store.getState().loginData;
  console.log('user = ', USER);
  const config = {
    method: 'post',
    url: GET_APPROVAL,
    data: {
      APPROVAL: {
        ACTION: 'get_os_approval',
        USER_ID: USER?.userProfile?.[0]?.USER_ID,
        SESSION_LOGIN_ID: USER?.SESSION_LOGIN_ID,
      },
    },
  };

  return async dispatch => {
    dispatch({type: approvalConstant.LOADING});

    axiosServer(config)
      .then(response => {
        const res = response?.data;
        console.log('obj res', res);
        if (callback) {
          callback();
        }
        dispatch({type: approvalConstant.SUCCESS, payload: res});
      })
      .catch(function (error) {
        if (callback) {
          callback();
        }
        SimpleToast.show(
          'Terjadi kesalahan ketika mengambil info dari server',
          SimpleToast.LONG,
          SimpleToast.BOTTOM,
        );
        dispatch({
          type: approvalConstant.ERROR,
          payload: error,
        });
      });
  };
};

export const getProcurement = data => {
  const USER = store.getState().loginData;
  console.log('user = ', USER);
  const config = {
    method: 'post',
    url: `${GET_PROCUREMENT}${data?.PARAMETER}.cfm`,
    data: {
      [`${data?.PARAMETER}`]: {
        ACTION: 'list_data',
        COMPANY_ID: data?.COMPANY_ID,
        SITE_ID: data?.SITE_ID,
        USER_ID: USER?.userProfile?.[0]?.USER_ID,
        SESSION_LOGIN_ID: USER?.SESSION_LOGIN_ID,
        FILTER_APPROVAL_STATUS: '1',
        FILTER_BULAN: '',
        FILTER_TAHUN: moment(new Date()).format('YYYY'),
        FILTER_FIELD: '',
        FILTER_VALUE: '',
        ORDER_BY:
          data?.PARAMETER === 'SR'
            ? 'SR_DATE'
            : data?.PARAMETER === 'PR'
            ? 'PURCHASE_REQ_DATE'
            : 'PO_DATE',
        ORDER_TYPE: 'DESC',
      },
    },
  };
  console.log('config = ', config.data);
  return async dispatch => {
    dispatch({type: procurementConstant.LOADING});

    axiosServer(config)
      .then(response => {
        const res = response?.data;
        console.log('obj res', res);
        dispatch({type: procurementConstant.SUCCESS, payload: res});
      })
      .catch(function (error) {
        SimpleToast.show(
          'Terjadi kesalahan ketika mengambil info dari server',
          SimpleToast.LONG,
          SimpleToast.BOTTOM,
        );
        dispatch({
          type: procurementConstant.ERROR,
          payload: error,
        });
      });
  };
};

export const getDetailProcurement = data => {
  const USER = store.getState().loginData;
  console.log('user = ', USER);
  const config = {
    method: 'post',
    url: `${GET_PROCUREMENT}${data?.PARAMETER}.cfm`,
    data: {
      [`${data?.PARAMETER}`]: {
        ACTION: 'detail_transaction',
        USER_ID: USER?.userProfile?.[0]?.USER_ID,
        SESSION_LOGIN_ID: USER?.SESSION_LOGIN_ID,
        COMPANY_ID: data?.COMPANY_ID,
        SITE_ID: data?.SITE_ID,
        ROW_ID: data?.ROW_ID,
      },
    },
  };
  console.log('config dtail = ', config.data);
  return async dispatch => {
    dispatch({type: detaiProcurementConstant.LOADING});

    axiosServer(config)
      .then(response => {
        const res = response?.data;
        console.log('obj detail', res);
        dispatch({type: detaiProcurementConstant.SUCCESS, payload: res});
      })
      .catch(function (error) {
        SimpleToast.show(
          'Terjadi kesalahan ketika mengambil info dari server',
          SimpleToast.LONG,
          SimpleToast.BOTTOM,
        );
        dispatch({
          type: detaiProcurementConstant.ERROR,
          payload: error,
        });
      });
  };
};

export const approveReject = (data, callback) => {
  const USER = store.getState().loginData;
  console.log('user = ', USER);

  let temp = {};
  if (data?.PARAMETER === 'SR') {
    temp = {
      SR_ID: data?.SR_ID || '',
      NOTE_TRX: data?.NOTE_TRX || '',
      USER_ID_DELEGATE: data?.USER_ID_DELEGATE || '',
      IP_ADDRESS: '1.1.1',
    };
  } else if (data?.PARAMETER === 'PR') {
    temp = {
      NOTE_TRX: data?.NOTE_TRX || '',
      USER_ID_DELEGATE: data?.USER_ID_DELEGATE || '',
      IP_ADDRESS: '1.1.1',
      PURCHASE_REQ_ID: data?.PURCHASE_REQ_ID || '',
    };
  } else {
    temp = {
      NOTE_TRX: data?.NOTE_TRX || '',
      USER_ID_DELEGATE: data?.USER_ID_DELEGATE || '',
      IP_ADDRESS: '1.1.1',
      PO_ID: data?.PO_ID || '',
    };
  }
  const config = {
    method: 'post',
    url: `${GET_PROCUREMENT}${data?.PARAMETER}.cfm`,
    data: {
      [`${data?.PARAMETER}`]: {
        ACTION: 'process_approved',
        USER_ID: USER?.userProfile?.[0]?.USER_ID,
        SESSION_LOGIN_ID: USER?.SESSION_LOGIN_ID,
        COMPANY_ID: data?.COMPANY_ID,
        SITE_ID: data?.SITE_ID,
        CODE_STATUS: data?.CODE_STATUS,
        ...temp,
      },
    },
  };
  console.log('config appr = ', config.data);
  return async dispatch => {
    dispatch({type: postConstant.LOADING});
    axiosServer(config)
      .then(response => {
        const res = response?.data;
        console.log('obj appr ', res);
        dispatch({type: postConstant.SUCCESS, payload: res});
        callback();
      })
      .catch(function (error) {
        console.log(error?.response);
        SimpleToast.show(
          'Terjadi kesalahan ketika mengambil info dari server',
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
