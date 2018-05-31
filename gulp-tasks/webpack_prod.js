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
        var ngAnnotatePlugin = plugins.ngAnnotatePlugin;
        function chunkList(){
            this.plugin('done', function(stats) {
                // 获取文件列表
                var filemaps = stats.toJson();
                var filemapsStr = JSON.stringify(filemaps.assetsByChunkName);
                // 生成编译文件的maps
                plugins.fs.writeFileSync(plugins.path.join(plugins.__dirname, param.url, 'assets.json'), filemapsStr);
            });
        }
        myConfig.output = {
            path: plugins.path.join(plugins.__dirname, url),
            filename: '[name].[chunkhash:6].js',
            publicPath: '../static/'
        };
        myConfig.plugins = myConfig.plugins.concat(
            new plugins.webpack.DefinePlugin({
                "process.env": env
            }),
            new plugins.webpack.optimize.DedupePlugin(),
            chunkList,
            new ngAnnotatePlugin({
                add: true
            })
        );
        // run webpack
        plugins.webpack(myConfig, function(err, stats) {
            if(err)
                return console.log(err);
            console.log(stats.toString({
                colors: true
            }));
            callback();
        });
    };
};