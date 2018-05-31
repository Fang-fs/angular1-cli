window.bwChart = {
    addCharLine: function (obj) {
        var chart = $('#' + obj.id).highcharts();
        var charObj = {
            id:obj.getID,
            data: obj.data,
            color: obj.color,
            name: obj.name,
            dashStyle:obj.dashStyle
        };
        if(obj['type']){
            charObj['type'] = obj['type']
        }
        if(obj['yAxis']){
            charObj['yAxis'] = obj['yAxis']
        }
        if(obj['zIndex']){
            charObj['zIndex'] = obj['zIndex']
        }
        if(obj['borderColor']){
            charObj['borderColor'] = obj['borderColor']
        }
        if(obj['borderWidth']){
            charObj['borderWidth'] = obj['borderWidth']
        }
        chart.addSeries(charObj);
    },
    //清空图表线
    removeChar: function (obj) {
        if($('#' + obj.id).highcharts()){
            var seriesLength = $('#' + obj.id).highcharts().series.length;
            for (var i = 0; i < seriesLength; i++) {
                $('#' + obj.id).highcharts().series[0].remove();
            }
        }
    },
    //删除指定id图表线
    removeCharLine: function (obj)   {
        if($('#' + obj.id).highcharts()){
            var chart = $('#' + obj.id).highcharts();
            chart.get(obj.removeID).remove();
        }
    },
    reflowChart: function(arr){
        for(var i = 0; i<arr.length; i++){
            if($('#' + arr[i]).highcharts()){
                $('#' + arr[i]).highcharts().reflow();
            }
        }

    }

};