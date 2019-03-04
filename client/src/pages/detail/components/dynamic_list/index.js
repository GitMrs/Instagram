import React from 'react';
import Avatar from '@component/avatar';
import Carousel from '@component/carousel';
import Comments from '@component/comments';
import {connect} from 'react-redux';
import Style from './index.scss';
@connect(
  store => {
    return {
      DynamaicTopicList:store.topicList,
      userInfo:store.userInfo
    }
  },
  dispatch => {
    return {}
  }
)
class DynamicList extends React.Component{
  
  render(){
    const {DynamaicTopicList} = this.props;
    // console.log(eval(JSON.stringify({'name':'1'})))
    return (
      <div className={Style['dynamic-list']}>
        {
          DynamaicTopicList.map((item,index) => {
            let imageList = []
            if(item.topic.topicImgList.length !== 0){
               imageList = eval(JSON.parse(item.topic.topicImgList));
            }else{
              return ;
            }
            // 
            console.log(imageList)
            // let imageList = []
            return (
              <article className="article" key={index}>
                  <header className="header">
                      <Avatar userInfo={item.userInfo}/>
                  </header>
                  
                  <div className="container">
                      <Carousel imageList={imageList}></Carousel>
                  </div>

                  {/* 评论区 */}
                   <div className="comments-content">
                       {/* <Comments 
                          topicLikeFn={this.props.topicLikeFn}
                           addComments={this.props.addComments}
                           topicIndex={index}
                           createdAt={item.topic.created_at}
                           discuss={item.discuss} 
                           topicId={item.topic.topicId} 
                           topicLike={item.topic.topicLike}
                           dotCounts={item.topic.topicLikeCounts}>
                       </Comments> */}
                   </div>
               </article>
              )
          })
        }
      </div>
    )
  }
}

export default DynamicList;