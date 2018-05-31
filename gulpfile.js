var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var sequence = require('run-sequence');
var webpack = require("webpack");
var jadeRev = require('gulp-jade-static-rev');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var through2 = require('through2');
var webpackConfig = require("./webpack.config.js");
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var plugins = {
    fs:fs,
    path:path,
    _:_,
    __dirname: __dirname,
    imagemin: imagemin,
    sequence: sequence,
    jadeRev: jadeRev,
    uglify: uglify,
    rename:rename,
    through2: through2,
    webpack: webpack,
    ngAnnotatePlugin: ngAnnotatePlugin,
    require: require,
    webpackConfig: webpackConfig
};
function getTask(task,param) {
    return require('./gulp-tasks/' + task)(gulp,plugins, param);
}

gulp.task('build:htmlCope', getTask('htmlCope', 'build'));

gulp.task('build:htmlMD5', getTask('htmlMD5', 'build'));


gulp.task('build:jsUglify', getTask('jsUglify', 'build'));

gulp.task('TEST:build_webpack', getTask('webpack', {url:'build',env:'test'}));
gulp.task('DEV:build_webpack', getTask('webpack', {url:'build',env:'dev'}));
gulp.task('UAT:build_webpack', getTask('webpack_prod', {url:'build',env:'uat'}));
gulp.task('PROD:build_webpack', getTask('webpack_prod', {url:'build',env:'prod'}));

// 本地环境使用
gulp.task('test', function (cb) {
    sequence(
        ['TEST:build_webpack'],
        ['build:htmlCope'],
        cb
    );
});

/**
 *  本地 监听文件变化
 */
gulp.task('watch', function () {
    gulp.watch(
        [
            './src/**/*.*',
            './src/view/*.html',
            './src/static/lang/*.json'
        ],
        ['TEST:build_webpack','build:htmlCope']
    );
});


// 测试环境使用
gulp.task('dev', function (cb) {
    sequence(
        ['DEV:build_webpack','build:htmlCope'],
        cb
    );
});


// uat环境使用
gulp.task('uat', function (cb) {
    sequence(
        ['UAT:build_webpack'],
        ['build:jsUglify'],
        ['build:htmlMD5'],
        cb
    );
});

// 生产环境使用
gulp.task('prod', function (cb) {
    sequence(
        ['PROD:build_webpack'],
        ['build:jsUglify'],
        ['build:htmlMD5'],
        cb
    );
});