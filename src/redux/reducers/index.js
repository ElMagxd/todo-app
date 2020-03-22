import { combineReducers } from "redux";
import userReducer from './user';
import userDataReducer from './userData';
import currentListReducer from './currentList';

const allReducers = combineReducers({
   user: userReducer,
   userData: userDataReducer,
   currentList: currentListReducer

});

export default allReducers;