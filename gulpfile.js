'use strict';

const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const rename = require ('gulp-rename');
const hb = require('gulp-hb');
const layouts = require('handlebars-layouts');
const runSequence = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');

const srcPaths = {
    scripts: ['./src/js/**/*'],
    fonts: ['./src/fonts/**/*'],
    images: ['./src/img/**/*'],
    styles: ['./src/sass/*.scss'],
    cssEntries: ['./src/sass/application.scss', './src/sass/application-dark.scss'],
    static: ['./src/demo/**/*'],
    templates: [
        'src/*.hbs',
        'src/pages/**/*.hbs'
    ],
    partials: ['./src/partials/*.hbs'],
    helpers: [
        './node_modules/handlebars-layouts/index.js',
        './src/helpers/index.js'
    ]
};

hb.handlebars.registerHelper(layouts(hb.handlebars));

gulp.task('clean', () => {
   return del(['dist/*']);
});

// Copy demo, img, js, fonts folders from src to dist
gulp.task('copy', ['copy:js'], function () {
    return gulp.src([...srcPaths.static, ...srcPaths.images, ...srcPaths.fonts], {base: './src'})
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:js', function () {
    return gulp.src(srcPaths.scripts)
        .pipe(gulp.dest('dist/js'));
});

// Handle handlebars
gulp.task('hbs', function () {
    return gulp.src(srcPaths.templates)
        .pipe(hb({
            partials: srcPaths.partials,
            helpers: srcPaths.helpers
        }))
        .pipe(rename({extname: ".html"}))
        .pipe(gulp.dest('dist'));
});

// Handle sass
gulp.task('styles', function () {
    return gulp.src(srcPaths.styles)
        .pipe(sourcemaps.init())
        .pipe(sass({
            precision: 10,
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'));
});

// Development
gulp.task('watch', ['build'], function () {
    gulp.watch(srcPaths.scripts, ['copy:js']);
    gulp.watch(srcPaths.styles, ['styles']);
    gulp.watch([...srcPaths.templates, ...srcPaths.partials], ['hbs']);
    gulp.watch([...srcPaths.static, ...srcPaths.images, ...srcPaths.fonts], ['copy']);
});

gulp.task('build', ['hbs', 'styles', 'copy']);

// Default Task
gulp.task('default', function(callback) {
    return runSequence('clean', 'build', callback);
});