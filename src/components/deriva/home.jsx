import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'

import {  Link , browserHistory} from 'react-router';
import classNames from 'classnames';

let Isotope = require('isotope-layout')
import Gallery from './docs/gallery.jsx';

import actions from 'actions'

/*
 * Home Page
 */
let Home = React.createClass({
  getInitialState() {
    return {isotope: false}
  },

  componentWillMount( ) {
    this.props.dispatch( actions.ui.set_ui_property('header.floated', true ) );
    this.props.dispatch( actions.channels.find_all() );
  },


  componentDidMount() {
    require('styles/deriva/Home.scss');
  },

  render() {

    return (<div className="home-page">
              <section className="theather">
                <div className="info">
                  <h1>STAFF PICKS</h1>
                </div>
                <div className="background"
                  style={{"background-image":  "url(http://www.filippobello.com/assets/images/portfolio/joebrush/hero.jpg)" }} >
                </div>
              </section>

              <div className="page">
                <section className="subscribed">
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
import { connect } from 'react-redux'

Home = connect( (state) => {
  return {docs: state.data.docs }
})(Home);


export default Home;
module.exports = Home
