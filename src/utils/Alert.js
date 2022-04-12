import {AlertAction} from '../redux/actions/AlertAction';
// import {useDispatch} from 'react-redux';
import {store} from '../redux/stores'

function Alert(title, desc, buttons) {
    store.dispatch(AlertAction(title, desc, buttons));
}

export default Alert;