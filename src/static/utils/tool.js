let Util = window.Util = {
    getRequest: function (name) {
        let url = location.href;
        let paraString = url.substring(url.indexOf('?') + 1, url.length).split('&');
        let paraObj = {};
        for (let i = 0; i<paraString.length; i++) {
            let j = paraString[i];
            paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(j.indexOf('=') + 1, j.length);
        }
        var returnValue = paraObj[name.toLowerCase()];
        if (typeof (returnValue) == 'undefined') {
            return '';
        } else {
            return returnValue.replace(/#(\w+)$/,'');
        }
    },
    ellipsis: function(str, length, ellStr){
        if(str==null)return 'null';
        let rStr = '';
        let reg = /[\u4e00-\u9fa5]+/;
        length = length || (reg.test(str) ? 15 : 30);
        if(str.length > length){
            rStr=str.substr(0,length)+(ellStr||'...');
            return rStr.length-3 >= str.length ? str : rStr;
        }
        return str;
    },
    /**
     * 千位分隔符
     * @num Number 需要格式化的数字
     * @fixed Number 保留几位小数
     * */
    formatNumber: function(num, fixed){
        fixed = fixed || 2;
        let _formatNum = '';
        num = Number(num);
        if(isNaN(num)){
            _formatNum = '--';
        }else{
            _formatNum = num.toFixed (fixed).replace (/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        }
        return  _formatNum;
    },
    changeLeftHeight: function(num){
        num = num ? num : 126;
        $('.bw_nav_box').height($('.bw_content').height() + num);
    },
    objectToParam : function(obj){
        let arr = [];
        for(let item in obj){
            arr.push(`${item}=${obj[item]}`);
        }
        return arr.join('&');
    },
    isType: function (obj,type) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    }
};


Array.prototype.indexOf = function(el){
    for (let i = 0, n = this.length; i < n; i++){
        if (this[i] === el){
            return i;
        }
    }
    return -1;
};

