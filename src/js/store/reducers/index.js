import user from './user'
import stock from './stock'
import modal from './modal'
import { combineReducers } from 'redux'

export default combineReducers({
    stock,
    user,
    modal,
});