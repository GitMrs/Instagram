import React from 'react';
import Style from './index.scss';
import { Button,Form,Input,Icon,notification } from 'antd';
const FormItem = Form.Item;
import API from '@common/api.js';
class signUp extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields(async (err,values) =>{
      if(!err){
        // console.log(values)
        let response = await API.register(values)
        console.log(response)
        notification[response.data.flag ? 'success' : 'error']({
          message:response.message
        })
       setTimeout(()=>{
        this.props.toggleSign()
       },2000)

      }
    })
  }
  onchangHandler(type,e){
    this.setState({
      [type + 'Empty']:e.target.value
    })
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    return (
      <section className={Style.signup}>
        <h1 className='header'>
          <span className='instagram'></span>
        </h1>
        <h2 className='slogan'> 注册instagram分享精彩视界</h2>
        <Button className='facebook-login' type='primary' htmlType='submit'>实用Facebook登陆</Button>
        <div className='or-line'>
          <span className='line'></span>
          <span className='name'>或</span>
          <span className='line'></span>
        </div>
        <Form className='register-form' onSubmit={this.handleSubmit.bind(this)}>
          <FormItem>
            {
              getFieldDecorator('email',{
                rules:[{required:true,message:'邮箱不能为空！'}]
              })(
                <div className={`form-input ${this.state.emailEmpty && 'active'}`} onChange={this.onchangHandler.bind(this,'email')} >
                  <label htmlFor='label-email'>邮箱</label>
                  <Input id='label-email' prefix={<Icon type='mail' style={{color:'rgba(0,0,0,.25)'}} />} />
                </div>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('username',{
                rules:[{required:true,message:'用户名不能为空！'}]
              })(
                <div className={`form-input ${this.state.emailEmpty && 'active'}`} onChange={this.onchangHandler.bind(this,'username')}>
                  <label htmlFor='label-username'>用户名</label>
                  <Input id='label-username' prefix={<Icon type='user' style={{color:'rgba(0,0,0,.25)'}} />} />
                </div>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('password',{
                rules:[{required:true,message:'密码不能为空！'}]
              })(
                <div className={`form-input ${this.state.emailEmpty && 'active'}`} onChange={this.onchangHandler.bind(this,'lock')}>
                  <label htmlFor='label-lock'>密码</label>
                  <Input id='label-lock' prefix={<Icon type='lock' style={{color:'rgba(0,0,0,.25)'}} />} type='password' />
                </div>
              )
            }
          </FormItem>
          <FormItem>
            <Button className='register-form-button' type='primary' htmlType='submit'>注册 </Button>
          </FormItem>
        </Form>
      </section>
    )
  }
}
const WrappedNormalLoginForm = Form.create()(signUp);
export default WrappedNormalLoginForm;