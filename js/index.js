function initPointSparkline($el, data){
    $el.sparkline(data, {
        type: 'line',
        width: '100%',
        height: '60',
        lineColor: 'transparent',
        fillColor: 'transparent',
        spotRadius: 5,
        spotColor: Sing._grayLight,
        valueSpots: {'0:':Sing._grayLight},
        highlightSpotColor: Sing._grayLight,
        highlightLineColor: Sing._grayLight,
        minSpotColor: Sing._grayLight,
        maxSpotColor: Sing._grayLight,
        tooltipFormat: new $.SPFormatClass('<span style="color: white">&#9679;</span> {{prefix}}{{y}}{{suffix}}'),
        chartRangeMin: _(data).min() - 1
    });

    $el.sparkline(data, {
        composite: true,
        type: 'line',
        lineColor: Sing._grayLight,
        lineWidth: 1,
        fillColor: 'transparent',
        spotRadius: 4.1,
        spotColor: Sing._white,
        valueSpots: {'0:': Sing._white},
        highlightSpotColor: Sing._stateDanger,
        highlightLineColor: Sing._stateDanger,
        minSpotColor: Sing._stateDanger,
        maxSpotColor: Sing._stateSuccess,
        tooltipFormat: new $.SPFormatClass(''),
        chartRangeMin: _(data).min() - 1
    });
}

function initSimpleChart(){
    initPointSparkline($("#chart-simple"), [4,6,5,7,5,6]);
}

function pjaxPageLoad(){
    initSimpleChart();
}

$(function(){
    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);

    SingApp.onResize(initSimpleChart);
});