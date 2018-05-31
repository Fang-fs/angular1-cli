export default function (){
    const module = angular.module('homeApp',[]);
    import './index.less';
    require('./index')(module);
    require('./server')(module);
}
