import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'

import {  Link , browserHistory} from 'react-router';
import classNames from 'classnames';

let Isotope = require('isotope-layout')
import Gallery from './docs/Gallery.js';


/*
 * Home Page
 */
let Home = React.createClass({
  getInitialState() {
    return {isotope: false}
  },

  componentWillMount( ) {
    this.props.actions.set_ui_property('header.floated', false );
    this.props.actions.list_all_channel();
    /*
    this.props.actions.list_all_doc().then( (docs) => {
      console.log('list_all_doc', docs, docs.length);
    });
    */
  },


  componentDidMount() {
    require('styles/deriva/Home.scss');
  },

  render() {

    return (<div className="home-page">
              <section className="theather">
                <div className="player">
                  <h3>STAFF PICKS</h3>
                </div>
              </section>

              <div className="page">
                <section className="subscribed">
                  subscribed...
                </section>
                <section className="channels">
                  <Gallery/>
                </section>
              </div>
          </div>
    );
  }
});

Home.displayName = 'Deriva.Home';

// Connect to redux store
import actions from 'actions'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

Home = connect( (state) => {
  return {docs: state.data.docs }
}, (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
})(Home);


export default Home;
module.exports = Home
