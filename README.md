# DO NOT USE THIS CODE

> The following security alert was issued to the repository owner by Github:

```
Critical Severity

GHSA-mh6f-8j2x-4483 More information
critical severity
Vulnerable versions: > 3.3.4
Patched version: No fix
The NPM package flatmap-stream is considered malicious. A malicious actor added this package as a dependency to the NPM event-stream package in versions 3.3.6 and later. Users of event-stream are encouraged to downgrade to the last non-malicious version, 3.3.4.

Users of flatmap-stream are encouraged to remove the dependency entirely.
```

See here: https://github.com/dominictarr/event-stream/issues/116

# gulp-acute

[![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://npmjs.org/package/gulp-acute)
[![NPM version](http://img.shields.io/npm/v/gulp-acute.svg?style=flat)](https://npmjs.org/package/gulp-acute)
[![NPM version](http://img.shields.io/npm/dm/gulp-acute.svg?style=flat)](https://npmjs.org/package/gulp-acute)

> Compiles HTML content into an AngularJS module using the $templateCache service.
> Provides two modes: `terminating` and `continuous`
> - `Terminating Mode` captures HTML content until an `end` event is fired on the pipe; it then compiles the HTML code into a JavaScript file and sends that new file down the pipe.
> - `Continuous Mode` captures HTML content, caches it internally, and immediately compiles the HTML content into a JavaScript file and sends that new file down the pipe. If additional HTML content comes down the pipe, it adds it to the cache, recompiles the JavaScript file, and sends it down the pipe.

***

## Install

```
npm install --save-dev gulp-acute
```


## Usage

**gulpfile.js**

> Creates a file at `./public/templates.js`, which contains the AngularJS code to add the content of all HTML files under the current directory to the `[$templateCache](https://docs.angularjs.org/api/ng/service/$templateCache)`. The cached HTML content will be availabe in an Angular module named `templates`.

```js
var acute = require('acute');

gulp.task('default', function () {
  return gulp.src('./**/*.html')
    .pipe(acute())
    .pipe(gulp.dest('public'));
});
```

**/path/to/file.html**
```html
<h1>Hello World!</h1>
```

**main.js**

```html
<!doctype html>
<html>
  <body ng-app="app" ng-controller="main">
  
    <div ng-include="template"></div>
  
    <script src="angular.js"></script>
    <script src="templates.js"></script>
    <script>
      var app = angular.module('app', ['templates']);
      app.controller('main', function($scope){
        $scope.template = "/path/to/file.html";
      });
    </script>
  </body>
</html>
```

## API

Coming eventually. Ping me if you're impatient.
