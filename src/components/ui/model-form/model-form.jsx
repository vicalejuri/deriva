'use strict';
import React from 'react';
import utils from 'utils';
import classNames from 'classnames';

import _ from 'lodash';
import {browserHistory} from 'react-router';

import  MODEL_FORM_TAGS  from './inputs.jsx'

require('styles/ui/model-form.scss');

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
    return _.filter(MODEL_FORM_TAGS, c => (c.tag == input_matches[0]))[0];
  },
  
                                
  render(){
    let { fields, order, ...options} = this.props;
    
    /* if has options.type, render it as 'type', 
        otherwise automatically detect type and render it
        */
    let has_type     = _.get(options,'type') || false;
    let input_type   = (has_type
                          ? _.filter(MODEL_FORM_TAGS, (t) => t.type == has_type.type )[0]
                          : this.autodetectInputTag() );
    
    
    /*
     * Create element with fields + ...options
     */
    try {
      options = _.omit( _.merge(options, has_type), ['type'] );
      var mprops = Object.assign({}, fields, {className: "form-control", ...options});
      var tag = React.createElement( input_type.tag, mprops );
    
      return (<div className={classNames("form-group", input_type.type)} style={order} >
                  <label for={fields.label}>{fields.label}</label>
                  {tag}
              </div>);
    } catch( e ){
      console.log('ETA', e );
      return (<div></div>);
    }
  }
});



/*
 * A html form on the 'model' type, 
 *              filled by 'content', 
 *        customized by the Model._form
 *            or by 'order' and 'type' fields
 */
let ModelFormComponent = React.createClass({
  propTypes: {
    model: React.PropTypes.object.isRequired,
    data: React.PropTypes.object,
    type: React.PropTypes.object,
    order: React.PropTypes.object,
  },
  
  getDefaultProps() {
    return {model: {}, data: new Map(), 
            /* Order fields */
            order: {id: 0},
            /* Type fields */
            type: {"rev": {type: "hidden"}}
           }
  },
  
  value(){
    return {};
  },

  // get input order value
  getInputOrder( fields ){
    return {order: ( _.has(this.props.order, fields.label ) ? this.props.order[fields.label] : 100 )};
  },
  
  // get input type from type or `Model._form` parameters
  getInputType( fields ) {
    let form_params = _.get(this.props.model, `_form.${fields.label}`); 
    return  (_.get(this.props.type, fields.label) || form_params );
  },

  render() {
    let { model, data, exclude, className} = this.props;
    let rows = _.map( data, (value,label) => { return {label,value} } );
    console.log(data);
    return (<form className={classNames("model-form", this.props.className)} >          
              { _.map( rows , (fields) => {
                  return (<FormGroup type={this.getInputType(fields)} 
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
