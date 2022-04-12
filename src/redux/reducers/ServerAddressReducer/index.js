import {serverAddressConstant} from '../../constants';

const initState = {
  server: {},
  isLoading: false,
};

const LoginReducer = (state = initState, action) => {
  switch (action.type) {
    case serverAddressConstant.SUCCESS: {
      return {
        ...state,
        server: action.payload,
        isLoading: false,
      };
    }
    case serverAddressConstant.LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case serverAddressConstant.ERROR: {
      return {
        ...state,
        isLoading: false,
        server: {},
      };
    }
    default: {
      return state;
    }
  }
};

export default LoginReducer;
