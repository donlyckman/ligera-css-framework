var gulp = require( 'gulp' );
var concat = require( 'gulp-concat' );
var include = require( 'gulp-include' );
var sass = require( 'gulp-sass' );
var cssnano = require( 'gulp-cssnano' );
var sourcemaps = require( 'gulp-sourcemaps' );
var autoprefixer = require( 'gulp-autoprefixer' );
var rename = require( 'gulp-rename' );
var uglify = require( 'gulp-uglify' );
var imagemin = require( 'gulp-imagemin' );

var src = '_src';
var dst = '_dst';

// TASK: SCSS
gulp.task( 'scss', function () {
    return gulp.src( src + '/scss/_includes.scss')
        .pipe(concat('styles.scss'))
        .pipe( sass() )
        .pipe( sourcemaps.init() )
        .pipe( autoprefixer( 'last 2 version' ) )
        .pipe( cssnano() )
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe( gulp.dest( dst + '/css' ) );
} );

// TASK: JS
gulp.task( 'js', function () {
    return gulp.src( src + '/js/_main.js' )
        .pipe( include() )
        .on( 'error', console.log )
        .pipe( sourcemaps.init() )
        //.pipe( uglify() )
        .pipe( concat( 'main.min.js' ) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest( dst + '/js' ) );
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
        .pipe( gulp.dest( dst + '/images' ) );
} );
// TASK: HTML
gulp.task( 'html', function() {
    return gulp.src( src + '/**/*.html' )
        .pipe( gulp.dest( dst ) );
} );

gulp.task('clean', function () {
    return gulp.src( dst + '/*', {read: false})
        .pipe(clean());
});

gulp.task( 'default', gulp.series('js', 'scss', 'images', 'html'), function () {
    gulp.watch( src + '/js/**/*.js', ['js'] );
    gulp.watch( src + '/scss/**/*.scss', ['scss'] );
    gulp.watch( src + '/images/**/*.{gif,jpg,png,svg}', ['images'] );
    gulp.watch( src + '/**/*.html', ['html'] );
} );