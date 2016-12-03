var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename'),
    del = require('del'),
    svg2png = require('gulp-svg2png');

var config = { // Config for the package svgSprite must be an object literal
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      variables: {
        replaceSvgWithPng: function(){
          return function(sprite, render){
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
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

gulp.task('createPngCopy', ['createSprite'], function(){
  return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css/'));
});

gulp.task('copySpriteGraphic', ['createPngCopy'], function(){
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
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

gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteCSS', 'endClean']);
