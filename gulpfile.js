'use strict';

var gulp = require('gulp');

var sass = require('gulp-sass');

var rename = require ('gulp-rename');

var clean = require('gulp-clean');

gulp.task('styles', function () {

    gulp.src('./sass/application.scss')
        .pipe(sass({
            precision: 10
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css'));

    gulp.src('./sass/application.scss')
        .pipe(sass({
            precision: 10,
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
    gulp.watch('./sass/*.scss', ['styles']);
});

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('copy', ['clean'], function () {
    gulp.src('./*.html')
        .pipe(gulp.dest('./dist'));
    gulp.src('./css/**/*')
        .pipe(gulp.dest('./dist/css'));
    gulp.src('./demo/**/*')
        .pipe(gulp.dest('./dist/demo'));
    gulp.src('./js/**/*')
        .pipe(gulp.dest('./dist/js'));
    gulp.src('./img/**/*')
        .pipe(gulp.dest('./dist/img'));
    gulp.src('./vendor/**/*')
        .pipe(gulp.dest('./dist/vendor'));
});

gulp.task('build', ['styles', 'copy']);