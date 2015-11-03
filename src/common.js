var gutil = require('gulp-util'),
    path = require('path'),
    jsStrEsc = require('js-string-escape');

function _error(msg){
  this.emit('error', new gutil.PluginError(PLUGIN_NAME, msg))
}

function _getTemplateJs(file, opts){
  var url = file.path.substr(file.base.length);
  url = path.normalize(url);
  if(process.platform === 'win32') url = url.replace(/\\/g, '/');
  url = opts.transformUrl(url, file);
  return gutil.template(opts.body, {
    'url': url,
    'contents': jsStrEsc(file.contents),
    'file': file
  });
}

function _getTransformModuleFn(moduleTemplate){
  return function(moduleContent){
    return gutil.template(moduleTemplate, {
      'module': moduleContent,
      'file': gutil.newFile({})
    });
  }
}

var PLUGIN_NAME = 'gulp-angular-template',
    PROCESSED_TAG = 'PROCESSED_BY_' + PLUGIN_NAME;
    DEFAULT_MODULE = 'templates',
    DEFAULT_FILENAME = 'templates.js',
    DEFAULT_TEMPLATE_HEADER = 'angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {',
    DEFAULT_TEMPLATE_BODY = '$templateCache.put("<%= url %>","<%= contents %>");';
    DEFAULT_TEMPLATE_FOOTER = '}]);',
    DEFAULT_MODULE_TEMPLATE = 'none',
    MODULE_TRANSFORM_TEMPLATES = {
      requirejs: 'define([\'angular\'], function(angular) { \'use strict\'; return\n  <%= module %>\n});',
      browserify: '\'use strict\'; module.exports = <%= module %>',
      es6: 'import angular from \'angular\'; export default\n<%= module %>',
      iife: '(function(){\n  <%= module %>\n})();',
      none: '<%= module %>'
    },
    DEFAULT_URL_TRANSFORM_STRATEGY = 'none',
    URL_TRANSFORM_STRATEGIES = {
      filenameOnly: function(url, file){
        var start = url.lastIndexOf(path.sep) + 1,
            end = url.lastIndexOf('.');
        if(start < 0) start = 0;
        if(end < 0) end = url.length;
        return url.substring(start, end);
      },
      hyphenatedPath: function(url, file){
        var start = 0,
            end = url.lastIndxOf('.');
        if(end < 0) end = url.length;
        return url.substring(start, end).replace(path.sep, '-');
      },
      none: function(url, file){
        return url;
      }
    };

function _getOptions(opts){
  opts = opts || {};
  opts.newLine = opts.newLine || gutil.linefeed;
  opts.indent = opts.indent || '';
  opts.module = opts.module || DEFAULT_MODULE;
  opts.filename = opts.filename || DEFAULT_FILENAME;
  opts.standalone = opts.standalone ? ',[]' : '';
  opts.header = opts.header || DEFAULT_TEMPLATE_HEADER;
  opts.body = opts.body || DEFAULT_TEMPLATE_BODY;
  opts.footer = opts.footer || DEFAULT_TEMPLATE_FOOTER;
  opts.moduleTemplate = opts.moduleTemplate || DEFAULT_MODULE_TEMPLATE;
  opts.transformModule = opts.transformModule || _getTransformModuleFn(opts.moduleTemplate);
  opts.urlTransformStrategy = opts.urlTransformStrategy || DEFAULT_URL_TRANSFORM_STRATEGY;
  opts.transformUrl = opts.transformUrl || URL_TRANSFORM_STRATEGIES[opts.urlTransformStrategy];
  opts.continuous = opts.continuous || false;
  return opts;
}

module.exports = {
  'PLUGIN_NAME': PLUGIN_NAME,
  'error': _error,
  'getTemplateJs': _getTemplateJs,
  'getOptions': _getOptions
}
