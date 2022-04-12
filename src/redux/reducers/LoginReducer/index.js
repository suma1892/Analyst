import {loginConstant as lc} from '../../constants/index';

const userData = {
  userData: {},
  loggedIn: false,
  isLoading: false,
  isFingerprint: false,
  isPin: false,
  userProfile: {},
};

const LoginReducer = (state = userData, action) => {
  //
  switch (action.type) {
    case lc.SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        isLoading: false,
        userProfile: action?.payload,
      };
    }
    case lc.LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        isLoading: false,
        userProfile: {},
      };
    }
    case lc.ERROR_LOGOUT: {
      return {
        ...state,
        // loggedIn: false,
        isLoading: false,
        // userProfile: {},
      };
    }
    case lc.ERROR: {
      return {
        ...state,
        // loggedIn: false,
        isLoading: false,
      };
    }
    case lc.SESSION: {
      return {
        ...state,
        SESSION_LOGIN_ID: action?.payload,
        isLoading: false,
      };
    }
    case lc.CLIENT_KEY: {
      return {
        ...state,
        CLIENT_KEY: action?.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default LoginReducer;
