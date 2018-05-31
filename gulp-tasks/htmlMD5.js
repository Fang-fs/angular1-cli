module.exports = function (gulp, plugins, param) {
    return function () {
        let url = './src/views/**/' + param + '.html';
        let json = plugins.require('./' + param + '/assets.json');
        if (param === 'build') {
            url = './src/views/**/index.html'
        }
        gulp.src(url)
            .pipe(plugins.jadeRev({
                root: '../static/',
                assets: json
            }))
            .pipe(plugins.rename('index.html'))
            .pipe(gulp.dest('./'+param+'/views/'));
    };
};