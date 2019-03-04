import { combineReducers } from 'redux';
import userInfo from './userInfo';
import topicList from './topList';
export default combineReducers({
  userInfo,
  topicList
})