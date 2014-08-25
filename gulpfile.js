var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var paths = {
	src: "./src",
	build: "./build"
};

gulp.task('manifest', function() {
	gulp.src(paths.src + '/manifest.json')
		.pipe(gulp.dest(paths.build));
});
gulp.task('scripts', function() {
	gulp.src(paths.src + '/*.js')
		.pipe($.uglify({ mangle: true }))
		.pipe(gulp.dest(paths.build));
});
gulp.task('markup', function() {
	gulp.src(paths.src + '/*.html')
		.pipe(gulp.dest(paths.build));
});
gulp.task('images', function() {
	gulp.src(paths.src + '/images/**')
		.pipe($.imagemin())
		.pipe(gulp.dest(paths.build));
})

gulp.task('build', ['manifest', 'scripts', 'markup', 'images']);
gulp.task('default', ['build']);