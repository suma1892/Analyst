import {store} from '../../stores';

export const AlertAction = (title, desc, buttons) => {
  const SHOW = store?.getState()?.alert?.isShow;
  return async dispatch => {
    dispatch({
      type: 'SHOW_ALERT',
      payload: {
        title,
        desc,
        buttons,
        isShow: !SHOW,
      },
    });
  };
};
