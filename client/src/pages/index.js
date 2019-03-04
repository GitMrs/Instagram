import React from "react";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from './login';
import Detail from './detail';
import '@scss/base.scss'
import './index.scss'
class Instargram extends React.Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path='/' component={Detail}></Route>
          <Route exact path='/login' component={Login}></Route>
        </Switch>
      </Router>
    )
  }
}
export default Instargram;