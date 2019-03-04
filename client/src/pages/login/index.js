import React from 'react';
import Style from "./index.scss";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isSignUp:true
    }
  }
  toggleSign (){
    this.setState({
      isSignUp: !this.state.isSignUp
    })
  }
  render(){
    return(
      <main className={Style.login}>
        <article className='login_info'>
          <section className='descript'>
            <div className='photo'></div>
          </section>
          <section className='login_dialog'>
            {
              this.state.isSignUp ? 
              <SignIn />
              : <SignUp toggleSign={this.toggleSign.bind(this)} /> 
            }
            <div className='toggle_ways'> 
              {
                this.state.isSignUp 
                ? <span>没有账号？<a className='notice' onClick={this.toggleSign.bind(this)}>注册</a></span>
                : <span>有了账号？<a className='notice' onClick={this.toggleSign.bind(this)}>立即登陆</a></span>
              }
            </div>
          </section>
        </article>
      </main>
    )
  }
}
export default Login; 