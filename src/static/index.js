require('./base/reset.css');
require('./base/layout.less');
const language = window.LANGUAGES = window.cookie.get('felangague') || 'Zh';
import lang_cn from './lang/cn';
import lang_en from './lang/en';
import './utils/index';
const ngModule = angular.module('myApp', ['vapour']);
require('./config/api.host')(ngModule);
require('./module/ajax')(ngModule);
/**
 * 系统级，常用方法
 * */
require('./server/translate')(ngModule);
require('./server/system')(ngModule);



const crumbsObj = {
    home: {
        name: '100004' //首页
    }
};
ngModule.filter('T', function () {
    return function (key) {
        if(NODE_EMBED){
            return lang_cn[key];
        }
        if (language === 'En') {
            return lang_en[key]
        }
        return lang_cn[key];
    }
});

//转义html
ngModule.filter('trustHtml', ['$sce',function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
}]);
ngModule.run(($rootScope, $location, $ajax, $timeout, $log)=> {
    //$rootScope.NODE_EMBED = NODE_EMBED;
    //加载时路径，做默认选择
    urlChange();

    $rootScope.$on('$stateChangeStart', (e, toState) => {
        $log.info('[$stateChangeStart]-[tostate]', toState);
        //导航路径数组
        let currentAry = toState.name.split('_');
        //加载时路径，做默认选择
        urlChange(toState.url);
        $rootScope.crumbsData = getCrumbsAry(currentAry);
        //todo:每次切换页面，清空所有的body时间， 各个页面事件有冲突，统一成指令，可去掉
        angular.element(document.body).unbind('click');
    });
    //视图切换成功
    $rootScope.$on('$viewContentLoaded', (e, toState) => {
        $log.info('[$stateChangeStart]-[tostate]', toState);
    });
    /**
     * 路径存储
     * @loactionUrl 'summary/index'
     * @rootUrl 'summary'
     * @subUrl 'index'
     * */
    function urlChange (url) {
        let _url = url || $location.$$url;
        let _urlAry = _url.split(/[/?]/);
        $rootScope.locationUrl = _url;
        $rootScope.rootUrl = _urlAry[1];
        $rootScope.subUrl = _urlAry[1];
    }
    //获取导航路径数组
    function getCrumbsAry(ary) {
        let data = [];
        let parent = crumbsObj[ary[0]] || {};
        parent.name&&data.push(parent.name);
        if(typeof parent.children === 'object'){
            data.push(parent.children[ary[1]]);
        }
        return data;
    }
});
require('./config/route.conf.js')(ngModule);