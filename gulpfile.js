"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const rename = require("gulp-rename");
const hb = require("gulp-hb");
const layouts = require("handlebars-layouts");

const srcPaths = {
  scripts: ["./src/js/**/*"],
  fonts: ["./src/fonts/**/*"],
  images: ["./src/img/**/*"],
  styles: ["./src/sass/*.scss"],
  cssEntries: [
    "./src/sass/application.scss",
    "./src/sass/application-dark.scss"
  ],
  static: ["./src/demo/**/*"],
  templates: ["src/*.hbs", "src/pages/**/*.hbs"],
  partials: ["./src/partials/*.hbs"],
  helpers: [
    "./node_modules/handlebars-layouts/index.js",
    "./src/helpers/index.js"
  ]
};

hb.handlebars.registerHelper(layouts(hb.handlebars));

function clean() {
  return require("node:fs/promises").rm("dist", { recursive: true, force: true });
}

// Copy demo, img, js, fonts folders from src to dist
function copy() {
  return gulp
    .src([...srcPaths.static, ...srcPaths.images, ...srcPaths.fonts], {
      base: "./src", encoding: false
    })
    .pipe(gulp.dest("dist"));

}

function copyJS() {
  return gulp.src(srcPaths.scripts).pipe(gulp.dest("dist/js"));
}

// Handle handlebars
function hbs() {
  // gulp.task("hbs", function() {
  return gulp
    .src(srcPaths.templates)
    .pipe(
      hb({
        partials: srcPaths.partials,
        helpers: srcPaths.helpers
      })
    )
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("dist"));
}

// Handle sass
function styles() {
  return gulp
    .src(srcPaths.styles, { sourcemaps: true })

    .pipe(
      sass({
        precision: 10,
        outputStyle: "compressed"
      })
    )
    .pipe(rename({ suffix: ".min" }))

    .pipe(gulp.dest("./dist/css", { sourcemaps: "./maps" }));
}

// Development
exports.watch = function watch() {
  gulp.watch(srcPaths.scripts, gulp.series(copyJS));
  gulp.watch(srcPaths.styles, gulp.series(styles));
  gulp.watch([...srcPaths.templates, ...srcPaths.partials], gulp.series(hbs));
  gulp.watch(
    [...srcPaths.static, ...srcPaths.images, ...srcPaths.fonts],
    gulp.series(copy)
  );
};

function modernCharts() {
  return require("esbuild").build({
    stdin: { contents: 'export * from "d3v7"', resolveDir: __dirname },
    bundle: true,
    format: "iife",
    globalName: "SingD3",
    minify: true,
    outfile: "dist/js/charts/d3-modern.js"
  });
}

const build = gulp.parallel(hbs, styles, copy, copyJS, modernCharts);
exports.build = build;
exports.default = gulp.series(clean, build);
