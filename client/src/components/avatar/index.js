import React from 'react';
import Style from './index.scss';
import PropType from 'prop-type';
class Avatar extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const {userInfo, avatarStyle} = this.props;
    return (
      <div className={Style['avatar-content']}>
        <div className='avatar' style={{...avatarStyle,'backgroundImage':'https://user-gold-cdn.xitu.io/2016/11/29/1f8696de1b039644cd832953cca8f38d?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'}}>
          <div className='user_abstract'>
            <div className={`username ${userInfo.username && 'clear-bg'} `} style={{...this.props.usernameStyle}}>{userInfo.username}</div>
            <div className={`abstract ${userInfo.username && 'clear-bg'} `} style={{...this.props.abstractStyle,display:'none'}}>{userInfo.abstract}</div>
          </div>
        </div>
      </div>
    )
  }
}
Avatar.defaultProps = {
  userInfo:{
    abstract:false
  },
  avatarStyle:{
    width:'32px',
    height:'32px'
  },
  usernameStyle:{
    fontWight:600,
    fontSize:'14px',
    width:'140px',
    paddingLeft:'44px'  
  },
  abstractStyle:{
    fontSize:'14px',
    width:'auto',
    paddingLeft:'44px'  
  }
}
export default Avatar;