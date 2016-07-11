import { Doc , Channel } from './docs.js';

let dataModels = function( database ){

  // Setup indexes and shit
  Doc.setup(database);
  Channel.setup(database);

  return {};
};

dataModels.Doc = Doc;
dataModels.Channel = Channel;

export default dataModels;
