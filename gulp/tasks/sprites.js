var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename'),
    del = require('del');

var config = { // Config for the package svgSprite must be an object literal
  mode: {
    css: {
      sprite: 'sprite.svg', // rename sprite file to remove .css from file name
      render: { // have the package generate the css for the sprites!
        css: { // could use sass, less or stylus in lieu
          template: './gulp/templates/sprite.css'  // where it will be saved
        }
      }
    }
  }
}

gulp.task('beginClean', function(){
  return del(['./app/temp/sprite/', './app/assets/images/sprites/']);
});

gulp.task('createSprite', ['beginClean'], function(){
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('copySpriteGraphic', ['createSprite'], function(){
  return gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites/'));
    // above pipe copies to the folder path in the .dest
});

gulp.task('copySpriteCSS', ['createSprite', 'copySpriteGraphic'], function(){
    return gulp.src('./app/temp/sprite/css/*.css')
      .pipe(rename('_sprite.css'))
      .pipe(gulp.dest('./app/assets/styles/modules/'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function(){
  return del('./app/temp/sprite/');
});

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteCSS', 'endClean']);
