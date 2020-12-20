const gulp = require( 'gulp' );
const concat = require( 'gulp-concat' );
const include = require( 'gulp-include' );
const sass = require( 'gulp-sass' );
const cssnano = require( 'gulp-cssnano' );
const sourcemaps = require( 'gulp-sourcemaps' );
const autoprefixer = require( 'gulp-autoprefixer' );
const rename = require( 'gulp-rename' );
const uglify = require( 'gulp-uglify' );
const imagemin = require( 'gulp-imagemin' );
const gutil = require('gulp-util');
const clean = require('gulp-clean');
const { watch, series } = require('gulp');

var src = '_src';
var dst = '_dst';

// TASK: SCSS
gulp.task( 'scss', function () {
    return gulp.src( src + '/scss/_includes.scss' )
        .pipe( concat('ligera.scss') )
        .pipe( sass() )
        .pipe( sourcemaps.init() )
        .pipe( autoprefixer( 'last 2 version' ) )
        .pipe( cssnano() )
        .pipe( rename({ suffix: '.min' }) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest( dst + '/css' )
        .on('end', function() {
            gutil.log('-----/ SCSS Complete /-----');
          } ) );
} );

// TASK: JS
gulp.task( 'js', function () {
    return gulp.src( src + '/js/_ligera.js' )
        .pipe( include() )
        .on( 'error', console.log )
        .pipe( sourcemaps.init() )
        //.pipe( uglify() )
        .pipe( concat( 'ligera.min.js' ) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest( dst + '/js' )
        .on('end', function() {
            gutil.log('-----/ JS Complete /-----');
          } ) );
} );

// TASK: Images
gulp.task( 'images', function () {
    return gulp.src( src + '/images/**/*.{gif,jpg,png,svg}' )
        .pipe( imagemin( [
            imagemin.gifsicle( {
                interlaced: true
            } ),
            imagemin.mozjpeg( {
                progressive: true
            } ),
            imagemin.optipng( {
                optimizationLevel: 5
            } ),
            imagemin.svgo( {
                plugins: [{
                    removeViewBox: true
                }]
            } )
        ] ) )
        .pipe( gulp.dest( dst + '/images' )
        .on('end', function() {
            gutil.log('-----/ IMAGES Complete /-----');
          } ) );
} );

// TASK: HTML
gulp.task( 'html', function() {
    return gulp.src( src + '/**/*.html' )
        .pipe( gulp.dest( dst )
        .on('end', function() {
            gutil.log('-----/ HTML Complete /-----');
        }));
} );

// function html( function() {
//     return gulp.src( src + '/**/*.html' )
//         .pipe( gulp.dest( dst )
//         .on('end', function() {
//             gutil.log('-----/ HTML Complete /-----');
//         }));
// } );


// TASK: Clean DST folder
gulp.task('clean', function () {
    return gulp.src( dst, {read: false})
        .pipe(clean()
        .on('end', function() {
            gutil.log('-----/ DST Cleaned /-----');
        }));
});

// TASK: Watch
// gulp.task( 'watch', gulp.series('js', 'scss', 'images', 'html'), function () {
//     gulp.watch( src + '/js/**/*.js', ['js'] );
//     gulp.watch( src + '/scss/**/*.scss', ['scss'] );
//     gulp.watch( src + '/images/**/*.{gif,jpg,png,svg}', ['images'] );
//     gulp.watch( src + '/**/*.html', ['html'] );
// } );

// exports.default = function() {
//     watch( src + '/js/**/*.js', ['js'] );
//     watch( src + '/scss/**/*.scss', ['scss'] );
//     watch( src + '/images/**/*.{gif,jpg,png,svg}', ['images'] );
//     watch( src + '/**/*.html', ['html'] );
//   };

// gulp.task( 'default', gulp.series('js', 'scss', 'images', 'html'), function () {
//     gulp.watch( src + '/js/**/*.js', ['js'] );
//     gulp.watch( src + '/scss/**/*.scss', ['scss'] );
//     gulp.watch( src + '/images/**/*.{gif,jpg,png,svg}', ['images'] );
//     gulp.watch( src + '/**/*.html', ['html'] );
// } );


gulp.task('default', gulp.series('js', 'scss', 'images', 'html', (done) => {

    // image changes
    //gulp.watch(imgConfig.src, gulp.series('images'));

    // CSS changes
    //gulp.watch(cssConfig.watch, gulp.series('css'));

    gulp.watch( src + '/js/**/*.js', gulp.series('js') );
    gulp.watch( src + '/scss/**/*.scss', gulp.series('scss') );
    gulp.watch( src + '/images/**/*.{gif,jpg,png,svg}', gulp.series('images') );
    gulp.watch( src + '/**/*.html', gulp.series('html') );

    done();

  }));