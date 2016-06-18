import React , {PropTypes} from 'react';

import {  Link } from 'react-router';
import classNames from 'classnames';

require('styles/deriva/user/login.scss');
let LoginComponent = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  login(ev) {
    let credentials = {u: this.refs.username.value, p: this.refs.password.value};
    console.log("login", credentials.u, credentials.p);

    ev.preventDefault();
    this.props.actions.login(credentials);
  },

  componentDidMount() {
    //this.props.actions.rememberme();
  },

  render() {
    let login_failed = this.props.user.error;
    let login_success = this.props.user.authenticated;
    let login_classes = {'success': login_success, 'failed': login_failed};
    return (<form className={classNames('login-component box',login_classes)} onSubmit={this.login}>
             <div className="message">{this.props.user.message}</div>
             <div className="form-group">
                  <input type="text" ref="username" className="form-control" id="username" placeholder="Usuário"/>
             </div>
             <div className="form-group">
              <input type="password" ref="password" className="form-control" id="password" placeholder="Senha"/>
             </div>
             <div className="submit">
                <Link to={`/signup`} >Signup</Link>
                <button type="submit" ref="submit" value="Acessar" className="btn btn-primary left" >OK</button>
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
  return {user: state.user}
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(LoginComponent);


export default LoginComponent;
