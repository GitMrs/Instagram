import React from 'react';
import Nav from '@component/nav';
import Recommend from './components/recommend';
import Style from './index.scss';
import update from 'react-addons-update';
import DynamicList from './components/dynamic_list';
import API from '@common/api.js';
import PostTopic from './components/post_topic';
import {connect} from 'react-redux';
@connect(store => {
  return {
    topicList: store.topicList
  }
},dispatch => {
  return {
    addTopicList:info => {
      dispatch({
        type:'ADD_TOPICLIST',
        info:info
      })
    }
  }
})
class Detail extends React.Component{
  constructor(props){
    super(props)
    this.state={
      followList:[],
      showPostTopic:false
    }
    this.initfollowList(); //获取推荐关键用户
    this.initTopicList(); //获取用户发文
  }
  async initTopicList (){
    let response = await API.findTopicList();
    this.props.addTopicList(response.data)
  }
  async initfollowList(){
    let response = await API.friendList()
    let followList = response.data.map(item => {
      item.hasFollow = false
      return item;
    })
    this.setState({
      followList
    })
  }
  togglePostTopic = async() => {
    this.setState({
      showPostTopic:!this.state.showPostTopic
    })
  }
  setFollowStatus = async(index,status) =>{
    let followList = this.state.followList;
    await API.followUser({
      userId:followList[index].userId,
      status:status ? 1 : 0
    })
    this.setState({
      followList:update(this.state.followList,{
        [index]:{
          hasFollow:{$set:status}
        }
      })
    })
  }
  render(){
    return(
      <main>
        <Nav />
        {
          this.state.showPostTopic ? 
          <PostTopic togglePostTopic={this.togglePostTopic} />
          :''
        }
        <div className='page-container'>
          <span className='loading'></span>
          <span className={Style['home-detail']}>
          <DynamicList />
            <Recommend followList={this.state.followList} setFollowStatus={this.setFollowStatus} togglePostTopic={this.togglePostTopic} />
          </span>
        </div>
      </main>
    )
  }
}
export default Detail;