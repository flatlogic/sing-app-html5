'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require ('gulp-rename');
var hb = require('gulp-hb');
var layouts = require('handlebars-layouts');

hb.handlebars.registerHelper(layouts(hb.handlebars));

// Copy demo, img, js, fonts folders from src to dist
gulp.task('copy', function () {
    gulp.src('./src/demo/**/*')
        .pipe(gulp.dest('dist/demo'));
    
    gulp.src('./src/img/**/*')
        .pipe(gulp.dest('dist/img'));

    gulp.src('./src/js/**/*')
        .pipe(gulp.dest('dist/js'));
    
    gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

// Handle handlebars
gulp.task('hbs', function () {
    gulp.src(['src/*.hbs', 'src/components/*.hbs'])
        .pipe(hb({
            partials: './src/partials/*.hbs',
            helpers: [
                './node_modules/handlebars-layouts/index.js',
                './src/helpers/index.js'
            ]
        }))
        .pipe(rename({extname: ".html"}))
        .pipe(gulp.dest('dist'));
});

// Handle sass
gulp.task('styles', function () {
    gulp.src('./src/sass/application.scss')
        .pipe(sass({
            precision: 10
        }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
    gulp.src('./src/sass/application.scss')
        .pipe(sass({
            precision: 10,
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'));
});

// Development
gulp.task('watch', ['hbs', 'styles', 'copy'], function () {
    gulp.watch('./src/sass/*.scss', ['styles']);
    gulp.watch('./src/**/*.hbs', ['hbs']);
    gulp.watch('./src/**/*.js', ['copy']);
});

gulp.task('build', ['hbs', 'styles', 'copy']);