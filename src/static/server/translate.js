export default function (ngModel) {
    return ngModel.factory('$T', ($filter) => {
        return {
            T: function (key, str) {
                if(key){
                    if(str){
                        return $filter('T')(key).replace('{{key}}',str);
                    }
                    return $filter('T')(key);
                }
                return key;
            }
        };
    });
}