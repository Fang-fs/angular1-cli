module.exports = function (gulp, plugins, param) {
    return function (callback) {
        let url = '/' + param.url + '/static/';
        let env = {
            "NODE_ENV": JSON.stringify(param.env),
            "NODE_EMBED": false
        };
        if(param.url === 'embed'){
            env['NODE_EMBED'] = true;
        }
        var myConfig = Object.create(plugins.webpackConfig);
        myConfig.output = {
            path: plugins.path.join(plugins.__dirname, url),
            filename: '[name].js',
            publicPath: '../static/'
        };
        myConfig.plugins = myConfig.plugins.concat(
            new plugins.webpack.DefinePlugin({
                "process.env": env
            })
        );
        // run webpack
        plugins.webpack(
            // configuration
            myConfig,
            function (err, stats) {
                callback();
            }
        );
    };
};