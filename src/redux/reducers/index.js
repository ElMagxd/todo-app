import { combineReducers } from "redux";
import userReducer from './user';
import userDataReducer from './userData';

const allReducers = combineReducers({
   user: userReducer,
   userData: userDataReducer
});

export default allReducers;