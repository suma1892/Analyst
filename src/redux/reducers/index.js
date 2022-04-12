import {combineReducers} from 'redux';

import AlertReducer from './AlertReducer';
import LoginReducer from './LoginReducer';
import ServerAddressReducer from './ServerAddressReducer';
import HomeReducer from './HomeReducer';

const reducers = combineReducers({
  loginData: LoginReducer,
  alert: AlertReducer,
  server: ServerAddressReducer,
  home: HomeReducer,
});

export default reducers;
