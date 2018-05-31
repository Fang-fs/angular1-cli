export default (ngModule) => {
    ngModule.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('home');
        //首页
        $stateProvider.state('home', {
            url: '/home',
            templateProvider: ['$q', function ($q) {
                let deferred = $q.defer();
                require.ensure([], function () {
                    let template = require('../app/home/index.html');
                    deferred.resolve(template);
                });
                return deferred.promise;
            }],
            controller: 'homeController',
            controllerAs: 'test',
            resolve: {
                foo: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                    let deferred = $q.defer();
                    require.ensure([], function () {
                        let module = require('../app/home/module.js')();
                        $ocLazyLoad.load({
                            name: 'homeApp'
                        });
                        deferred.resolve(module);
                    });

                    return deferred.promise;
                }]
            }
        });
    });
}