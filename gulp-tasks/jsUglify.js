module.exports = function (gulp, plugins, param) {
    return function () {
        let url = './' + param + '/static/';
        let exp = /(['"])default\1/g;
        gulp.src(url+'**.js')
            .pipe(plugins.through2({objectMode: true, allowHalfOpen: true}, function (chunk, enc, callback) {
                var contents = chunk.contents.toString();
                contents = contents.replace(exp, "'_default'");
                chunk.contents = Buffer(contents);
                this.push(chunk);
                callback();
            }))
            .pipe(plugins.uglify())
            .pipe(gulp.dest(url));
    };
};