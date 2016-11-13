'use strict';
import React from 'react';
import utils from 'utils';
import classNames from 'classnames';

import _ from 'lodash';
import {browserHistory} from 'react-router';

import models from 'models';
import Select from 'components/ui/_select';

import ReactTagsInput from 'react-tagsinput'

require('styles/ui/model-form.scss');

/*
 * Individual Inputs
 */
let NumberInput = React.createClass({
  statics: {match(l,v){
    return _.isNumber(v);
  }},
  render(){
    let { label, value , className, ...options} = this.props;    
    return <input type="number" className={className} ref={label} value={value} {...options}></input>
  }
});
let ColorInput = React.createClass({
  statics: {match(l,v){ return _.isString(v) && v.match(/#?[A-F0-9]{6}/); }},
  render(){
    let { label, value, className, ...options} = this.props;
    let bg_color = {backgroundColor: '#' + value};
    return (<div className="color-input">
              <span className="color-picker" style={bg_color}></span>
              <input type="text" ref={label} value={value} />
            </div>)
  }
});
let SelectInput = React.createClass({
  statics: {match(l,v) { return false; }},
  render(){
    let { label , value, className, ...options} = this.props;
    return <Select ref={label} className={className} value={value} {...options}/>;
  }
});
let TagsInput = React.createClass({
  statics: {match(l,v){
    return _.isArray(v) && _.every(v, _.isString);
  }},
  getInitialState(){ return {value: this.props.value}; },
  onChange(v2){ this.setState({value: v2}); },
  render(){
    let { label, value , className, ...options} = this.props;
    return <ReactTagsInput className={classNames("tags",className)} ref={label} value={this.state.value} onChange={this.onChange} {...options}/>
  }
});
let TextInput = React.createClass({
  statics: {match(l,v){
    return _.isString(l,v);
  }},
  render(){
    let { label, value, className, ...options} = this.props;
    console.log(options);
    return <input type="text" className={className} ref={label} value={value} {...options} ></input>
  }
});

var MODEL_FORM_TAGS = [
  {type: 'number', tag: NumberInput},
  {type: 'color', tag: ColorInput},
  {type: 'select', tag: SelectInput},
  {type: 'tags', tag: TagsInput}, 
  {type: 'text', tag: TextInput},
];



/*
 * Render single items autodetecting input_types
 */
let FormGroup = React.createClass({
  
  autodetectInputTag( ) {
    let { fields , type } = this.props;
                                      
    // for every model-form in MODEL_FORM_TAGS, call match of its Tag Element
    //    return only matched elements
    let input_matches = _.filter( _.map( MODEL_FORM_TAGS , c => c.tag ),  
                                  _.method('match', fields.label, fields.value) );
    return input_matches;
  },
  
                                
  render(){
    let { fields, order, ...options} = this.props;
    
    /* if has options.type, render it as 'type', 
        otherwise automatically detect type and render it
        */
    let type  = _.get(options,'type') || false;
    let input_type   = (type
                          ? _.filter(MODEL_FORM_TAGS, (t) => t.type == type.type )
                          : this.autodetectInputTag()[0] ) ;
    
    if(type && input_type.length > 0){
      input_type = input_type[0].tag;
    }
    if(! input_type){
      console.error(`No input type for <input ${fields.label} ${fields.value} ... `, this.props);
      debugger;

      return <div className="error"></div>;
    }
    
    /*
     * Create element with fields + ...options
     */
    options = _.omit( _.merge(options, type), ['type'] );
        
    var mprops = Object.assign({}, fields, {className: "form-control", ...options});
    var tag = React.createElement( input_type, mprops );

    return (<div className="form-group" style={order} >
                <label for={fields.label}>{fields.label}</label>
                {tag}
              </div>);
  }
});



/*
 * A html form on the 'model' type, 
 *              filled by 'content', 
 *        customized by the Model._form
 *            or by 'exclude', 'order' and 'type' fields
 */
let ModelFormComponent = React.createClass({
  propTypes: {
    model: React.PropTypes.object.isRequired,
    data: React.PropTypes.object,
    exclude: React.PropTypes.object,
    type: React.PropTypes.object
  },
  
  getDefaultProps() {
    return {model: models.Doc, data: new Map(), 
            /* Exclude fields */
            exclude: {rev: true, type: true},
            /* Order fields */
            order: {id: 0},
            type: {}
           }
  },

  // get input order value
  getInputOrder( fields ){
    return {order: ( _.has(this.props.order, fields.label ) ? this.props.order[fields.label] : 100 )};
  },
  
  // get input type from type or `Model._form` parameters
  getInputType( fields ) {
    let form_params = _.get(this.props.model, `_form.${fields.label}`); 
    return  (_.get(this.props.type, fields.label) || form_params || false );
  },

  /*
   * Exclude inputs from data
   */
  excludeInputs( exclude, data ){
    let exclude_labels = _.keys(exclude);
    return _.filter( 
                _.map( data, (value, label) => {
                  let is_allowed = (exclude_labels.indexOf(label) == -1) 
                  return ( is_allowed ? {label, value} : false );
                }));
  },
  
  onChange(ev,e){
    console.log(ev,e);
  },
  
  render() {
    let { model, data, exclude, className} = this.props;
    let rows = this.excludeInputs( exclude, data );
    
    return (<form className={classNames("model-form", this.props.className)} >          
              { _.map( rows , (fields) => {
                  return (<FormGroup type={this.getInputType(fields)} 
                                      merda="alo"
                                     fields={fields} 
                                     order={this.getInputOrder(fields)}
                                      />)
              }) }              
              {this.props.children}
            </form>
    );
  }
});
ModelFormComponent.displayName = 'Deriva.ui.ModelFormComponent';



export default ModelFormComponent;
