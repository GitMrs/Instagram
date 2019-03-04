import React from 'react';
import { Menu, Dropdown ,notification} from 'antd';
import {Link,withRouter} from 'react-router-dom';
import Style from './index.scss';
import API from '@common/api.js'
import {connect} from 'react-redux';
@withRouter
@connect(
  store => {
    return {
      userInfo: store.userInfo
    }
  },
  dispatch => {
    return {
      addUserInfo:info => {
        dispatch({
          type:'ADD_USERINFO',
          info
        })
      }
    }
  }
)
class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle:true
    }
  }
  handleChange(){
      
  }
  focusSearchInput(){

  }
  componentDidMount(){
    if(!this.props.userInfo.userId){
      API.getUserInfo().then(response => {
        // console.log(response)
        this.props.addUserInfo(response.data);
      })
    }
  }
  async signOut(){
    const response = await API.signOut();
    notification['success']({
      message:response.message
    })
    setTimeout(()=>{
      const {history} = this.props;
      history.push('/login')
    },500)

  }
  render() {
    const aboutMenu = (
      <Menu>
        <Menu.Item>关于我</Menu.Item>
        <Menu.Item onClick={this.signOut.bind(this)}>退出</Menu.Item>
      </Menu>
    )
    return (
      <div className={Style['page-header']}>
        <div className={`header ${this.state.toggle ? '' : 'toggle'}`} ref='header' >
          <div className='logo-space'>
            {
              this.state.toggle ?
                <Link className='instagram' to='/'></Link>
                : <Link className='icon' to='/'></Link>
            }
          </div>
          <div className='search'>
            {
              this.state.focusStatus ?
                <div className='search-content'>
                  <input
                    className='search-input'
                    type='txet'
                    onKeyPress={this.searchContent}
                    placeholder='搜索'
                    onChange={this.handleChange.bind(this)}
                    autoFocus={this.state.focusStatus}
                    onBlur={this.focusSearchInput.bind(this)}
                  />
                  <span className='icon'></span>
                </div>
                :<div className='search-block' onClick={this.focusSearchInput.bind(this)}>
                  <span className='block-icon'></span>
                  <span className='block-text'>搜索</span>
                </div>
            }
          </div>
          <div className='navigate'>
            <Link className='explore' to={'/'} ></Link>
            <Link className='love' to={'/'} ></Link>
            <Dropdown overlay={aboutMenu}>
              <Link className='user' to={'/about'}></Link>
            </Dropdown>
          </div>
        </div>
      </div>
    )
  }
}
export default Nav;