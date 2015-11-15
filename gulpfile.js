/// <reference path="typings/gulp/gulp.d.ts" />

var gulp = require('gulp');
var uglify = require('gulp-minify-css');
var rename = require('gulp-rename');
var less = require('gulp-less');


gulp.task('less',function(){
	 return gulp.src('./bower_components/flat-ui/less/flat-ui.less')
	 .pipe(less())
	 .pipe(gulp.dest('./bower_components/flat-ui/dist/css'))
	 .pipe(uglify())
	 .pipe(rename('flat-ui.min.css'))
	 .pipe(gulp.dest('./bower_components/flat-ui/dist/css'));
});

gulp.task('watch', function(){
	gulp.watch('./bower_components/flat-ui/less/*.less', ['less']);
});

gulp.task('default',['less','watch']);