const gulp 				= require('gulp');
const babel 			= require('gulp-babel');
const watch 			= require('gulp-watch');
const postcss 			= require('gulp-postcss');
const prefixer 			= require('autoprefixer');
const position 			= require('postcss-short-position');
const mediaQuery 		= require('css-mqpacker');
const rename 			= require('gulp-rename');
const pixrem 			= require('pixrem');
const precss 			= require('precss');
const csscomb 			= require('gulp-csscomb');
const livereload 		= require('gulp-livereload');
const styleDown 		= require('gulp-styledown');
const colorFunction 	= require('postcss-color-function');
const at2x 				= require('postcss-at2x');
const cssFor			= require('postcss-for');

const  procs = [
	prefixer({browsers: ['last 6 versions']}),
	precss,
	cssFor,
	position,
	pixrem,
	at2x,
	colorFunction,
	mediaQuery
];



gulp.task('css', () => {

	gulp.src(['src/css/imports.css'])
		.pipe(postcss(procs))
		.pipe(csscomb())
		.pipe(rename('styles.css'))
		.pipe(gulp.dest('build/css/'))
		.pipe(livereload());

});


gulp.task('watch', () => {

	gulp.watch('src/css/**/*.css', ['css']);
	gulp.watch('src/js/**/*.js', ['js']);
	livereload.listen();

});


gulp.task('js', () => {

    gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('build/js/'))

});

gulp.task('default', ['css', 'js', 'watch']);