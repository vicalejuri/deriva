/*
 * OEMBED
 */
export const OEMBED = 'OEMBED';
export const OEMBED_SUCCESS = 'OEMBED_SUCCESS';
export const OEMBED_ERROR   = 'OEMBED_ERROR';

import utils from 'utils/index.js'

export const oembed = (url) => {
 return (dispatch) => {
   dispatch({type: OEMBED, data: url});
     return utils.oembed(url)
     .then( (results) => {
         dispatch({type: OEMBED_SUCCESS, data: results});
         return Promise.resolve(results)
     }).catch( (err) => {
         dispatch({type: OEMBED_ERROR, data: err });
         return Promise.reject(err)
     });
 }
};
