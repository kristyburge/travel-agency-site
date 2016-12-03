var gulp = require('gulp'),
    webpack = require('webpack');

gulp.task('scripts', ['modernizr'], function(callback){
  webpack(require('../../webpack.config.js'), function(err, stats){
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    callback();
    /*callback ensures that gulp is aware when webpack completes by passing callback into the function and then run the function in webpack's function */
  });
});
