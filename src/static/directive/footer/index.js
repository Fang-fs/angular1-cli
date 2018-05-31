import './index.less';
import template from './index.html';

/**
 * ͷfooter
 */
vapour.directive('footerBox', () => {
    return {
        template: template,
        replace: true
    };
});