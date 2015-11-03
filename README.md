# gulp-acute

[![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://npmjs.org/package/gulp-acute)
[![NPM version](http://img.shields.io/npm/v/gulp-acute.svg?style=flat)](https://npmjs.org/package/gulp-acute)
[![NPM version](http://img.shields.io/npm/dm/gulp-acute.svg?style=flat)](https://npmjs.org/package/gulp-acute)

> Compiles HTML content into an AngularJS module using the $templateCache service.
> Provides to modes: `terminating` and `continuous`
> - `Terminating Mode` captures HTML content until an `end` event is fired on the pipe; it then compiles the HTML code into a JavaScript file and sends that new file down the pipe.
> - `Continuous Mode` captures HTML content, caches it internally, and immediately compiles the HTML content into a JavaScript file and sends that new file down the pipe. If additional HTML content comes down the pipe, it adds it to the cache, recompiles the JavaScript file, and sends it down the pipe.

***

## Install

```
npm install --save-dev gulp-acute
```


## Usage

```js
var acute = require('acute');

gulp.task('default', function () {
  return gulp.src('templates/**/*.html')
    .pipe(acute())
    .pipe(gulp.dest('public'));
});
```

#### API
