const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
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
	//.pipe(terser())
	.pipe(dest('dist/js' , { sourcemaps : '.' }))
}

//fonts task
function fontsTask(){
	return src('src/css/font/**/*.*')
	.pipe(dest('dist/css/font'))
}

//images
function imagesTask(){
	return src('src/images/**/*.{jpg,png}')
	.pipe(dest('dist/images'))
}

function pluginTask(){
	return src('src/plugins/**/*.{css,js}').pipe(dest('dist/plugins'))
}

//htmls
function htmlTask(){
	return src('src/**/*.html').pipe(dest('dist'))
}

//browsersync task
function browsersyncServe(cb){
	browsersync.init({
		server : {
			baseDir : './dist'
		}
	});
	cb();
	//cb();
}

function browsersyncReload(cb){
	browsersync.reload();
	cb();
}

function watchTask(){
	//watch('*.html' , browsersyncReload);
	watch(['*.html' , 'src/css/**/*.scss' , , 'src/css/**/*.css' , 'src/js/**/*.js'], series(htmlTask , sassTask, jsTask , browsersyncReload));
}

//default task
//exports.default = series( clean , parallel(sassTask , jsTask , browsersyncServe , watchTask) );
exports.default = series( clean , parallel(sassTask , jsTask , imagesTask , fontsTask , pluginTask , htmlTask , browsersyncServe , watchTask) );