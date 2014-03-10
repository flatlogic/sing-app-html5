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
        highlightSpotColor: Sing._grayLighter,
        highlightLineColor: Sing._grayLighter,
        minSpotColor: Sing._white,
        maxSpotColor: Sing._white,
        tooltipFormat: new $.SPFormatClass(''),
        chartRangeMin: _(data).min() - 1
    });
}

function initSimpleChart(){
    initPointSparkline($("#chart-simple"), [4,6,5,7,5]);
}

function initChangesChart(){
    var chartHeight = 100;
    var seriesData = [ [], [], [], [], [] ];
    var random = new Rickshaw.Fixtures.RandomData(10000);

    for (var i = 0; i < 32; i++) {
        random.addData(seriesData);
    }

    var graph = new Rickshaw.Graph( {
        element: document.getElementById("chart-changes"),
        renderer: 'multi',
        height: chartHeight,
        series: [{
            name: 'pop',
            data: seriesData.shift().map(function(d) { return { x: d.x, y: d.y } }),
            color: Sing.lighten(Sing._brandSuccess, .09),
            renderer: 'bar'
        }, {
            name: 'humidity',
            data: seriesData.shift().map(function(d) { return { x: d.x, y: d.y * (Math.random()*0.1 + 1.1) } }),
            renderer: 'line',
            color: Sing._white
        }]
    } );

    function onResize(){
        graph.configure({
            width: $('#chart-changes').width(),
            gapSize: 0.5,
            min: 'auto',
            strokeWidth: 3
        });
        graph.render();
    }

    SingApp.onResize(onResize);
    onResize();

    var detail = new Rickshaw.Graph.HoverDetail({
        graph: graph
    });

    var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
        graph: graph
    });

    var yAxis = new Rickshaw.Graph.Axis.Y({
        graph: graph,
        ticksTreatment: 'hide',
        pixelsPerTick: chartHeight
    });

    yAxis.render();

}

function initChangesYearChart(){
    var $el = $('#chart-changes-year'),
        data = [3,6,2,4,5,8,6,8],
        dataMax = _(data).max(),
        backgroundData = data.map(function(){return dataMax});

    $el.sparkline(backgroundData,{
        type: 'bar',
        height: 26,
        barColor: Sing._grayLighter,
        barWidth: 7,
        barSpacing: 5,
        chartRangeMin: _(data).min(),
        tooltipFormat: new $.SPFormatClass('')
    });

    $el.sparkline(data,{
        composite: true,
        type: 'bar',
        barColor: Sing._brandSuccess,
        barWidth: 7,
        barSpacing: 5
    });
}

function pjaxPageLoad(){
    initSimpleChart();
    initChangesChart();
    initChangesYearChart();
}

$(function(){
    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);

    SingApp.onResize(initSimpleChart);
});