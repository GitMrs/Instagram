import React from 'react';
import { Form, Button, Input, Icon, notification } from 'antd';
import {withRouter} from 'react-router-dom';
import Style from './index.scss';
import API from '@common/api.js';
const FormItem = Form.Item;
class signIn extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async(err,values) => {
      if(!err){
        console.log(values)
        let response = await API.login(values)
        console.log(response)
        notification['success']({
          message:'登陆成功'
        })
        const {history} = this.props;
        setTimeout(()=>{
          history.push('/')
        },500)
      }else{

      }
    })
  }
  onChangHandler(type,e) {
    this.setState({
      [type + 'Empty'] : e.target.value !== ''
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <section className={Style.signIn}>
        <h1 className='header'>
          <span className='instagram'></span>
        </h1>
        <Form className='sign-form' onSubmit={this.handleSubmit.bind(this)}>
          <FormItem>
            {
              getFieldDecorator('email', {
                rules: [
                  { required: true, message: '请输入您的邮箱！' }
                ]
              })(
                <div className={`form-input ${this.state.emailEmpty && 'active'}`} onChange={this.onChangHandler.bind(this,'email')} >
                  <label htmlFor='label-phone'>邮箱</label>
                  <Input type='email' prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,0.25)' }} />} />
                </div>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('password', {
                rules:[
                  {required: true, message: '请输入您的密码！'}
                ]
              })(
                <div className={`form-input ${this.state.passwordEmpty && 'active'}`} onChange={this.onChangHandler.bind(this,'password')} >
                  <label htmlFor='label-phone'>密码</label>
                  <Input type='password' prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,0.25)' }} />} />
                </div>
              )
            }
          </FormItem>
          <FormItem>
            <Button type='primary' htmlType='submit' className='register-form-button'>登陆 </Button>
          </FormItem>
        </Form>
      </section>
    )
  }
}
const WrappedLoginForm = Form.create()(signIn)
export default withRouter(WrappedLoginForm);