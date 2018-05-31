export default function (ngModel) {
    ngModel.factory('$ajax', ($rootScope, $http, $q, $log, $HOST) => {
        return function (config) {
            let _origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
            config.api = config.api || _origin;
            let deferred = $q.defer();
            config.url = config.api + config.url;

            $.ajax(config)
                .success((res) => {
                    let status = res.status;
                    if (res.result) {
                        deferred.resolve(res);
                    } else if (status.code === 200 || status.code === '200') {
                        res.data = res.data || {};
                        if(res.lang&&config.url.indexOf( 'check-login')>-1){
                            res.data['lang'] = res.lang;
                        }
                        deferred.resolve(res.data);
                    } else if (status.code <= 100) {
                        $log.error('[AJAX]', config.url, status.code, status.msg);
                    } else if(status.code >= 500){
                        $log.warn(JSON.stringify(config), res.status.msg);
                        deferred.resolve(res.data);
                    } else if(status.code == '111') {
                        window.location.href = res.data.Url;
                    } else {
                        $log.warn(JSON.stringify(config), res.status.msg);
                        deferred.reject(res.status.msg);
                    }
                })
                .error((error)=> {
                    deferred.reject('网络错误，请稍后重试！', error);
                });
            return deferred.promise;
        };
    });
}