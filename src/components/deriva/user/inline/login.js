import React , {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import {  Link } from 'react-router';
import classNames from 'classnames';

require('styles/deriva/user/login.scss');
let LoginComponent = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    classNames: PropTypes.string
  },

//  getDefaultProps(){
//    return {active: false}
//  },

  focus() {
    ReactDOM.findDOMNode(this.refs.username).focus();
  },

  login(ev) {
    let credentials = {u: this.refs.username.value, p: this.refs.password.value};

    ev.preventDefault();
    this.props.actions.user.login(credentials);
  },

  componentDidUpdate() {
    if(this.props.active){
      this.focus()
    }
  },

  componentDidMount() {
    console.log( this.props, this.props );
    this.props.dispatch( actions.user.rememberme() );
  },

  render() {
    let login_failed = this.props.user.error;
    let login_success = this.props.user.authenticated;
    let login_classes = {'success': login_success, 'failed': login_failed};

    return (<form ref="form" className={classNames('login-component box',login_classes)} onSubmit={this.login}>
              <div className="title">
                <h1>LOGIN</h1>
              </div>
              <div className="sub-box flex-column">
               <div className="form-group">
                    <label htmlFor="username">username</label>
                    <input type="text" ref="username" className="form-control" id="username" placeholder="Usuário" autoFocus={true} />
               </div>
               <div className="form-group">
                  <label htmlFor="password">password</label>
                  <input type="password" ref="password" className="form-control" id="password" placeholder="Senha"/>
               </div>
               <div className="message">{this.props.user.message}</div>
             </div>
              <div className="submit">
                <button type="submit" ref="submit" value="Acessar" className="btn btn-primary btn-rounded left" >OK</button>
             </div>
            </form>);
  }
});

LoginComponent.displayName = 'Deriva.user.LoginComponent';


// Connect to redux store
import actions from 'actions'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import { login as Login } from 'actions';

LoginComponent = connect( (state) => {
  return {user: state.data.user}
})(LoginComponent);


export default LoginComponent;
