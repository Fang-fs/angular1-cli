export default function (ngModel) {
    return ngModel.factory('$HOST', ($rootScope) => {
        let NODE_ENV = process.env.NODE_ENV;
        let HOST_OBJ = null;
        switch (NODE_ENV){
            case 'prod': //生产
                HOST_OBJ = {
                    URL: ''
                };
                break;
            case 'uat': //uat
                HOST_OBJ = {
                    URL: ''
                };
                break;
            case 'dev': //测试
                HOST_OBJ = {
                    URL: ''
                };
                break;
            case 'test': //本地
                HOST_OBJ = {
                    URL: ''
                };
                break;
        }
        return HOST_OBJ;
    });
}