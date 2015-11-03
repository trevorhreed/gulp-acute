var es = require('event-stream'),
    concat = require('gulp-concat'),
    header = require('gulp-header'),
    footer = require('gulp-footer'),
    common = require('./common.js');

function getTemplateStreamFn(opts){
  return function(file, cb){
    if(file[common.PROCESSED_TAG]) return cb(null, file);
    file.contents = new Buffer(opts.indent + common.getTemplateJs(file, opts));
    file[common.PROCESSED_TAG] = true;
    cb(null, file);
  }
}

function getModuleStreamFn(opts){
  return function(file, cb){
    var newContents = opts.transformModule(file.contents);
    file.contents = new Buffer(newContents);
    cb(null, file);
  }
}

function getTerminatingStream(opts){
  headerFooterTemplateContext = {
    'module': opts.module,
    'standalone': opts.standalone
  }
  return es.pipeline(
    es.map(getTemplateStreamFn(opts)),
    concat(opts.filename, {newLine: opts.newLine}),
    header(opts.header + opts.newLine, headerFooterTemplateContext),
    footer(opts.newLine + opts.footer, headerFooterTemplateContext),
    es.map(getModuleStreamFn(opts))
  );
}

module.exports = getTerminatingStream;
