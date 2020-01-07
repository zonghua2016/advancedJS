const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const watchify = require('watchify');
const gutil = require('gulp-util');
// const uglify = require('gulp-uglify');
// const babel = require('gulp-babel');
// const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const connect = require("gulp-connect");
const browserSync = require('browser-sync').create();

const paths = {
    pages: ['src/*.html']
}

const watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
})).plugin(tsify);

function bundle() {
    return watchedBrowserify
        // .transform('babelify', {
        //     presets: ['es2015'],
        //     extensions: ['.ts']
        // })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        // .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
}

function copyHtml() {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
}

let port = process.env.PORT || 8888,
    path = `http://localhost:${port}/`;

function server() {
    return connect.server({
        root: "./dist",
        livereload: true,
        port: port
    });
}

gulp.task('default', gulp.parallel(copyHtml, bundle, server));
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', gutil.log);