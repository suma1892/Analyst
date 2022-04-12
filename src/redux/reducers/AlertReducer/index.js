const initialState = {
  isShow:false
};

export default function AlertReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        ...state,
        isShow: action.payload?.isShow,
        title: action.payload?.title,
        desc: action.payload?.desc,
        buttons: action.payload?.buttons
      };
    default:
      return state;
  }
}
