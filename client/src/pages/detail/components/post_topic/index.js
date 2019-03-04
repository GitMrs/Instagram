import React from 'react';
import Avatar from '@component/avatar';
import Carousel from '@component/carousel';
import Upload from '@component/upload'
import {notification} from 'antd';
import { connect } from 'react-redux';
import API from '@common/api';
import Style from './index.scss';
import { } from 'antd';
let ImgUpload = ({uploadImgSuccess, changeUploadstatus}) => {
  return (
    <section className='image-upload'>
      <div>
        <span className='icon camera'></span>
        <span>
          <Upload successCb={uploadImgSuccess} className={'placeholder'} >上传图片</Upload>
        </span>
      </div>
      <div>
        <span className='icon network' onClick={() => { changeUploadstatus(1) }}></span>
        <span>从网络上传</span>
      </div>
    </section>
  )
}

@connect(store => {
  return {
    userInfo: store.userInfo
  }
})
class PostTopic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadStatus: 0,
      topicDescript: '',
      imageList:[]
    }
  }
  uploadImgSuccess = (url) => {
    this.setState({
      imageList:[...this.state.imageList,url],
      uploadStatus:2
    })
  }
  uploadStatus = () => {

  }
  handelChangeTextArea = (e) => {
    this.setState({
      topicDescript: e.target.value
    }
    )
  }
  postTopic = async() => {
    if(this.state.imageList.length === 0){
      notification({
        message:'请选择图片'
      })
      return
    }
    let response = await API.addTopic({
      topicImg:this.state.imageList,
      topicTitile:this.state.topicDescript
    });
    notification['success']({
      message:response.message
    })
    this.togglePostTopic()
  }
  closeInputUrl = async() =>{

  }
  render() {
    const { userInfo } = this.props;
    const avatarStyle = {
      width: '40px',
      height: '40px'
    }
    let ImgUpList = () => {
      return (
        <section className='input-url' key={2}>
        <div className='notice'>
          <span className='close-cricle' onClick={this.closeInputUrl}></span>
          <i className='icon'>
            <span>
              <Upload successCb={this.uploadImgSuccess} className='placeholder' />
            </span>
            添加另一张
          </i>
        </div>
        </section>
      )
    }
    let UploadPlaceholder = () => {
      return (
        <div>
          {
            this.state.uploadStatus === 2 ? <ImgUpList /> : ''
          }
          {
            this.state.uploadStatus === 0 ?
              <ImgUpload uploadImgSuccess={this.uploadImgSuccess} uploadStatus={this.uploadStatus} />
              : ''
          }
        </div>
      )
    }
    return (
      <div className={Style['post-topic']}>
        <section className="topic-content">
          <header>
            <Avatar userInfo={userInfo} avatarStyle={avatarStyle} />
          </header>

          {
            this.state.imageList.length > 0 ?
              (
                <section className="image-list">
                  <Carousel imageList={this.state.imageList} delectPhoto={this.delectPhoto} showCloseBtn={true} showSlickDot={false}></Carousel>
                </section>
              )
              :
              ""
          }

          {/* 上次占位图 */}
          <div className="upload-style">
            <UploadPlaceholder successCb={this.uploadImgSuccess} />

          </div>

          <div className="descript">
            <textarea value={this.state.topicDescript} onChange={this.handelChangeTextArea} rows="4" cols="50" placeholder="愿意的话可以添加说明"></textarea>
          </div>

          <footer className="footer">
            <span className="close" onClick={() => this.props.togglePostTopic()}>关闭</span>
            <span className="post" onClick={this.postTopic}>发帖</span>
          </footer>
        </section>
      </div>
    )
  }
}
export default PostTopic;