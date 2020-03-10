import user from './user'
import stock from './stock'
import { combineReducers } from 'redux'

export default combineReducers({
    stock,
    user,
});