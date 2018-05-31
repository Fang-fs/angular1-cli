import './index.less';
import template from './index.html';

/**
 * 左侧导航nav
 */
vapour.directive('checkListBox', ($rootScope, $location) => {
    return {
        template: template,
        replace: true,
        scope: {
            data: '=',
            notData: '='
        },
        link: function ($scope) {
            $scope.$watch('data', function (newValue, oldValue) {
                $scope.data = newValue;
            });
        }
    };
});