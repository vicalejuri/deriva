'use strict';

import React from 'react';
import classNames from 'classnames';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Emoji from './Emoji.js';

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
            /*

            {(this.props.options.length > 0 ?
              (this.props.options.map( (opt, i) =>
                <option key={i} label={opt.label} value={opt.value}><Emoji>{opt.label}</Emoji></option>
              )) :
              (<option key="Empty" value="empty"><Emoji>🚧 Offline</Emoji></option>)
            )}
            */
    );
  }
});


export default SelectComponent;
