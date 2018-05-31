module.exports = function (gulp, plugins, param) {
    return function () {
        let url = './src/views/**/' + param + '.html';
        if (param === 'build') {
            url = './src/views/**/index.html'
        }
        gulp.src(url)
            .pipe(plugins.rename('index.html'))
            .pipe(gulp.dest('./'+param+'/views/'));
    };
};