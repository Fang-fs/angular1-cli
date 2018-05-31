import './index.less';
import template from './index.html';
vapour.directive('crumbs', ($rootScope,$T) => {
    return {
        template: template,
        replace: true,
        scope: {
            data: '='
        },
        link: function ($scope) {
            document.title = $T.T($rootScope.crumbsData[$rootScope.crumbsData.length-1]);
            $scope.crumbsData = $scope.data || $rootScope.crumbsData;
        }
    };
});