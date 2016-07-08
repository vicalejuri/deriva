import { Doc , Channel } from './docs.js';

let dataModels = function( database ){

  // Setup indexes and shit
  Doc.setup(database);

  return {};
};

dataModels.Doc = Doc;

export default dataModels;
