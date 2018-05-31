import './index.less';
import template from './index.html';

/**
 * 左侧导航nav
 */
vapour.directive('navBox', ($rootScope,$location,$T, $ajax) => {
    return {
        template: template,
        replace: true,
        scope: {
            rooturl: '='
        },
        link: function ($scope) {
            $scope.showTab =  $scope.rooturl;
            $scope.$watch('rooturl', function (newValue, oldValue) {
                $scope.showTab =  newValue;
                switch ($scope.rooturl){
                    case '/DailyMarketDemand':
                    case '/report/MarketDemandTrends':
                    case '/report/CompSetOTBAnalysis':
                    case '/report/DailyMarketDemandIndex':
                    case '/report/DailyMarketBookingPace':
                    case '/report/DailyCompSetOTBAnalysis':
                    case '/report/DailyCompSetBookingPaceAnalysis':
                        $scope.showTab = 'MarketDemand';
                        break;
                    case '/Pickup':
                    case '/report/MarketPickUp':
                    case '/report/PickUpForCompSet':
                        $scope.showTab = 'Pickup';
                        break;
                    default:
                        $scope.showTab = $rootScope.rootUrl;
                        break
                }
            });
            $scope.navDirectory= [
                {
                    id: 1,
                    url: '#/MarketDemand',
                    name: $T.T('100006'),//市场需求分析,
                    setUrl: 'MarketDemand',
                    foldIcon: false,
                    cid:'10310'
                },
                {
                    id: 2,
                    url: '#/Hotevents',
                    name: $T.T(100007),//热点事件,
                    setUrl: 'Hotevents',
                    foldIcon: false,
                    cid:'10311'
                },
                {
                    id: 3,
                    url: '#/Pickup',
                    name: $T.T(100008),//新增预订,
                    setUrl: 'Pickup',
                    foldIcon: false,
                    cid:'10711'
                }
            ];
            //切换报表左侧的菜单展开关闭
            $scope.changeSub = ($event,url, foldIcon, setUrl, cid)=>{
                $scope.showTab = setUrl;
                //$location.path(url);
                window.location.href = url;
                _getQuest($event, null , cid);
            };
            $ajax({
                url:  '/demand/get-header',
                type: 'post',
                api: 'http://'+location.host,
                jsonpCallback: 'callbacknav'
            }).then((res) =>{
                let _data = res;
                $('.spanIndex').find('a').attr('href', _data.logourl + '/Summary');
                if(_data.helpCenterUrl !== ''){

                    var _helpCenterUrl = '<a class="tutorialbtn" href="'+_data.helpCenterUrl+'" class="hover" ></a>';
                    $('.bw_nav_box').append(_helpCenterUrl);
                }
            });
        }
    };
});