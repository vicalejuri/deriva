'use strict';

import React from 'react';
import classNames from 'classnames';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Emoji from './emoji.jsx';

/*
 * A nice select
 */
let SelectComponent = React.createClass({
  propTypes: {
    options: React.PropTypes.array
  },

  getInitialState(){
    return {selected: ''}
  },

  render() {
    let { options , className, ...otherProps} = this.props;
    let { emojified_options } = options.map( (opt,i) => {
      return {label: <Emoji>{opt.label}</Emoji>, value: opt.value}
    });

    return (<Select className={classNames('select-component', className)}
              options={emojified_options}
              noResultsText={<Emoji>🚧 Offline</Emoji>}
              {...otherProps} >
            </Select>
    );
  }
});


export default SelectComponent;
