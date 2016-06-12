import { Doc , Channel } from './docs.js';
let bkp = require('./doxx_fb.json');

let dataModels = {};

dataModels.Doc = Doc;
dataModels.DoxList = bkp;

export default dataModels;
