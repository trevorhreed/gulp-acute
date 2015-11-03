var gutil = require('gulp-util'),
    path = require('path'),
    getContinuousStream = require('./src/continuousStream.js'),
    getTerminatingStream = require('../src/terminatingStream.js');

function pluginFn(opts){
  opts = common.getOptions(opts);
  if(opts.continuous){
    return getContinuousStream(opts);
  }else{
    return getTerminatingStream(opts);
  }
}

module.exports = pluginFn;
