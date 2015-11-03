var gutil = require('gulp-util'),
    path = require('path'),
    Stream = require('stream'),
    common = require('./common.js');

function getContinuousStream(opts){
  var buffer = {},
      firstFile = null,
      stream = new Stream.Transform({ objectMode: true }),
      headerFooterTemplateContext = {
        'module': opts.module,
        'standalone': opts.standalone,
        'file': new gutil.File({})
      },
      header = gutil.template(opts.header, headerFooterTemplateContext),
      footer = gutil.template(opts.footer, headerFooterTemplateContext);

  stream._transform = function(file, enc, cb){
    if(file.isNull()) return cb();
    if(file.isStream()) {
      common.error('Streaming not supported.');
      return cb();
    }
    if(!firstFile) firstFile = file;
    if(file.event === 'unlink') delete buffer[file.path];
    else buffer[file.path] = opts.indent + common.getTemplateJs(file, opts);
    compileTemplates(file);
    cb();
  }

  function compileTemplates(file){
    if(Object.keys(buffer).length === 0) return;
    var chunks = [], moduleContent;
    chunks.push(header);
    for(var i in buffer){
      chunks.push(buffer[i]);
    }
    chunks.push(footer);
    moduleContent = opts.transformModule(chunks.join(opts.newLine));
    var newFile = new gutil.File({
      'cwd': firstFile.cwd,
      'base': firstFile.base,
      'path': path.join(firstFile.base, opts.filename),
      'contents': new Buffer(moduleContent)
    });
    newFile.event = file.event;
    stream.push(newFile);
  }

  return stream;
}

module.exports = getContinuousStream;
