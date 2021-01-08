const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
//const browsersync = require('browser-sync').create();
const del = require('del');

function clean(){
	return del(['dist']);
}

//sass task
function sassTask(){
	return src(['src/css/**/*.scss' , 'src/css/**/*.css' ] , { sourcemaps : false })
	//.pipe(sass()).pipe(postcss([cssnano()]))
	.pipe(sass()).pipe(postcss([]))
	.pipe(dest('dist/css', { sourcemaps: '.' } ));
}

//Javascript task
function jsTask(){
	return src('src/js/**/*.js' , { sourcemaps : false })
	.pipe(terser())
	.pipe(dest('dist/js' , { sourcemaps : '.' }))
}

//fonts task
function fontsTask(){
	return src('src/css/font/**/*.{ eot,otf,ttf,woff,woff2 }')
	.pipe(dest('dist/css/font'))
}

//images
function imagesTask(){
	return src('src/images/**/*.{jpg,png}')
	.pipe(dest('dist/images'))
}

//htmls
function htmlTask(){
	return src('*.html').pipe(dest('dist'))
}

//browsersync task
function browsersyncServe(cb){
	/* browsersync.init({
		server : {
			baseDir : '.'
		}
	});
	cb(); */
	cb();
}

function browsersyncReload(cb){
	//browsersync.reload();
}

function watchTask(){
	//watch('*.html' , browsersyncReload);
	//watch(['src/css/**/*.scss' , 'src/js/**/*.js'], series(sassTask, jsTask, browsersyncReload));
}

//default task
//exports.default = series( clean , parallel(sassTask , jsTask , browsersyncServe , watchTask) );
exports.default = series( clean , parallel(sassTask , jsTask , imagesTask , fontsTask , htmlTask) );