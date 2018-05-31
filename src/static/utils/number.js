class $Number {
    isDiff(numA, numB) {
        if (Number(numA) + '' === 'NaN') {
            return false;
        }
        if (Number(numB) + '' === 'NaN') {
            return false;
        }
        if(numA === null || numB === null){
            return false;
        }
        if (numB === 0) {
            return false;
        }
        return true;
    }
    is(num){
        if ((Number(num) + '' === 'NaN') || num === null) {
            return false;
        }
        return true
    }
}
//number方法
window.$Number = new $Number();