import {
  approvalConstant,
  procurementConstant,
  detaiProcurementConstant,
} from '../../constants';

const initState = {
  approval: [],
  isLoading: false,
  procurement: [],
  detailProcurement: [],
};

const HomeReducer = (state = initState, action) => {
  switch (action.type) {
    case approvalConstant.SUCCESS: {
      return {
        ...state,
        approval: action.payload,
        isLoading: false,
      };
    }
    case approvalConstant.LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case approvalConstant.ERROR: {
      return {
        ...state,
        isLoading: false,
        approval: {},
      };
    }

    case procurementConstant.SUCCESS: {
      return {
        ...state,
        procurement: action.payload,
        isLoading: false,
      };
    }
    case procurementConstant.LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case procurementConstant.ERROR: {
      return {
        ...state,
        isLoading: false,
        procurement: {},
      };
    }

    case detaiProcurementConstant.SUCCESS: {
      return {
        ...state,
        detailProcurement: action.payload,
        isLoading: false,
      };
    }
    case detaiProcurementConstant.LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case detaiProcurementConstant.ERROR: {
      return {
        ...state,
        isLoading: false,
        detailProcurement: {},
      };
    }
    default: {
      return state;
    }
  }
};

export default HomeReducer;
