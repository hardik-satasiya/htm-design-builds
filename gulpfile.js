/*****************************************/
/*****Do not change this config file  ****/
/****  Author : Hardik Satasiya 	  ****/
/*****************************************/

var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var prettify = require('gulp-prettify');
//var gutil = require('gulp-util');
var fs = require('fs');
var browserSync = require('browser-sync').create();


var assets_path = "assets/";

/*****************************************/
/*****Templates pre-rendering function****/
/*****************************************/
function preTemplateChanges() {

    nunjucksRender.nunjucks.configure(['templates/'], { watch: false });
    // use !(_)*.html to exclude rendering of the files with prefix "_" (underscore)
    return gulp.src(['templates/**/!(_)*.html', '!templates/**/*?copy?.html', '!templates/**/*-*Copy.html'])
        .pipe(nunjucksRender({
            css_path: assets_path + "css/",
            js_path: assets_path + "js/",
            lib_path: assets_path + "libs/",
            img_path: assets_path + "images/",
            fs: fs,
            /* The below setting is used to hide ".html" extension in url paths */
            /* It will generate a folder with file's name and insert the content in index.html file */
            /* Example: if you pass "home.html", it will compile to "home/index.html" */
            // ext: '/index.html'
        }))
        .on('error', function(error){
            //gutil.log(error.message);
        })
        .pipe(prettify({indent_size: 4}))
        // .on('error', swallowError)
        .pipe(gulp.dest('site'));
}

// Watches changes of templates
function watchChanges(){
    preTemplateChanges();

    gulp.watch(['templates/**/*.html'],['change-templates']);
    gulp.watch(['templates/**/*.html'],['reload']);
    gulp.watch(['site/assets/js/*.js'],['reload']);

    // Static server
	browserSync.init({
        server: {
            baseDir: "./site/"
        }
    });
}

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('reload', ['change-templates'], function (done) {
    browserSync.reload();
    done();
});

// Tasks
gulp.task('change-templates', preTemplateChanges);
gulp.task('watch', watchChanges);
//
// gulp.task('watch', myfunction);

// function myfunction() {
// 	gulp.watch(['./*.js'],function(event){
// 		delete require.cache[require.resolve('./test')]
// 		var data = require('./test');
// 		data.testing();
// 	});
// }
