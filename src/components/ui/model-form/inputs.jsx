import React from 'react';
import classNames from 'classnames';

import _ from 'lodash';

import models from 'models';
import Select from 'components/ui/_select';

import ReactTagsInput from 'react-tagsinput'

/*
 * Individual Inputs
 */
let NumberInput = React.createClass({
  statics: {match(l,v){ return _.isNumber(v); }},
  render(){
    let { label, value , className, ...options} = this.props;    
    return <input type="number" className={className} id={label} value={value} {...options}></input>
  }
});

let ColorInput = React.createClass({
  statics: {match(l,v){ return _.isString(v) && v.match(/#?[A-F0-9]{6}/); }},
  value(){ return this.props.value; },
  render(){
    let { label, value, className, ...options} = this.props;
    let bg_color = {backgroundColor: '#' + value};
    return (<div className={classNames("color-input",className)}>
              <span className="color-picker" style={bg_color}></span>
              <input type="text" id={label} value={value} />
            </div>)
  }
});

let SelectInput = React.createClass({
  statics: {match(l,v) { return false; }},
  getInitialState(){ return {value: this.props.value}; },
  onChange(v2){ this.setState({value: v2})},
  value(){ return this.state.value; },
  render(){
    let { label , value, className, ...options} = this.props;
    return <Select id={label} className={className} value={this.state.value} onChange={this.onChange} multi={true} joinValues={true} {...options}/>;
  }
});
let TagsInput = React.createClass({
  statics: {match(l,v){ return _.isArray(v) && _.every(v, _.isString); }},
  getInitialState(){ return {value: this.props.value}; },
  onChange(v2){ this.setState({value: v2}); },
  value(){ return this.state.value; },  
  render(){
    let { label, value , className, ...options} = this.props;
    return <ReactTagsInput id={label} className={classNames("tags",className)} value={this.state.value} onChange={this.onChange} {...options}/>
  }
});

let HiddenInput = React.createClass({
  statics: { match(l,v){ return false; }},
  render(){
    let { label, value, className, ...options} = this.props;
    return (<input type="hidden" className={className} id={label} value={value} {...options}></input>);
  }
});
let TextInput = React.createClass({
  statics: {match(l,v){
    return _.isString(l,v);
  }},
  render(){
    let { label, value, className, ...options} = this.props;
    return <input type="text" className={className} id={label} value={value} {...options} ></input>
  }
});

var MODEL_FORM_TAGS = [
  {type: 'number', tag: NumberInput},
  {type: 'color', tag: ColorInput},
  {type: 'select', tag: SelectInput},
  {type: 'tags', tag: TagsInput},
  {type: 'text', tag: TextInput},
  {type: 'hidden', tag: HiddenInput},
];



export default MODEL_FORM_TAGS;