const path = require('path')
const gulp = require('gulp')
const eslint = require('gulp-eslint')
const babel = require('gulp-babel')
const del = require('del')
const srcFiles = path.resolve(__dirname, './src/**/*.js')
const distPath = path.resolve(__dirname, './dist')

gulp.task('clean', () => {
  return del([distPath])
})

gulp.task('lint', () => {
  return gulp.src(srcFiles)
    .pipe(eslint())
    .pipe(eslint.format())
  .pipe(eslint.failAfterError())
})

gulp.task('build', ['clean', 'lint'], () => {
  return gulp.src(srcFiles)
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['build'])
