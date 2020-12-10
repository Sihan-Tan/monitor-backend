const gulp = require('gulp');
const copy = require('gulp-copy');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const del = require('del');
const replace = require('gulp-replace');

const entry = ['src/**/*', '!src/logs/**'];
const lintEntry = ['src/**/*.ts'];
const copyEntry = ['pm2.json', 'package.json'];
const cleanEntry = ['./typings'];

async function clean() {
  return await del(['dist/**/*', '!dist/node_modules/**']);
}

function buildLint() {
  return gulp
    .src(lintEntry)
    .pipe(
      eslint({
        fix: true,
      })
    )
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

//上线环境
function buildProd() {
  return gulp
    .src(entry)
    .pipe(
      babel({
        ignore: cleanEntry,
      })
    )
    .pipe(replace('.ts', '.js'))
    .pipe(gulp.dest('dist'));
}

function copyFile() {
  return gulp.src(copyEntry).pipe(copy('dist'));
}

let prod = gulp.series(clean, buildLint, buildProd, copyFile);
let lint = gulp.series(buildLint);

gulp.task('default', lint);
gulp.task('lint', lint);
gulp.task('prod', prod);
