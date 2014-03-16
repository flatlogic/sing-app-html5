$(function(){
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
            highlightLineColor: 'transparent',
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
            highlightLineColor: 'transparent',
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

    function initSalesChart(){

        function randValue() {
            return (Math.floor(Math.random() * (1 + 50 - 20))) + 10;
        }
        var data_com2 = [
            [1, randValue()],
            [2, randValue()],
            [3, 2 + randValue()],
            [4, 3 + randValue()],
            [5, 5 + randValue()],
            [6, 10 + randValue()],
            [7, 15 + randValue()],
            [8, 20 + randValue()],
            [9, 25 + randValue()],
            [10, 30 + randValue()],
            [11, 35 + randValue()],
            [12, 25 + randValue()],
            [13, 15 + randValue()],
            [14, 20 + randValue()],
            [15, 45 + randValue()],
            [16, 50 + randValue()],
            [17, 65 + randValue()],
            [18, 70 + randValue()],
            [19, 54 + randValue()],
            [20, 65 + randValue()],
            [21, 75 + randValue()],
            [22, 85 + randValue()],
            [23, 54 + randValue()]
        ];
        var data_com = [
            [1, randValue()],
            [2, randValue()],
            [3, 10 + randValue()],
            [4, 15 + randValue()],
            [5, 20 + randValue()],
            [6, 25 + randValue()],
            [7, 30 + randValue()],
            [8, 35 + randValue()],
            [9, 40 + randValue()],
            [10, 45 + randValue()],
            [11, 50 + randValue()],
            [12, 55 + randValue()],
            [13, 60 + randValue()],
            [14, 70 + randValue()],
            [15, 75 + randValue()],
            [16, 80 + randValue()],
            [17, 85 + randValue()],
            [18, 90 + randValue()],
            [19, 95 + randValue()],
            [20, 100 + randValue()],
            [21, 110 + randValue()],
            [22, 120 + randValue()],
            [23, 130 + randValue()]
        ];
        $.plot($("#chart-stats-simple"), [{
            data: data_com, showLabels: true, label: "New Visitors", labelPlacement: "below", canvasRender: true, cColor: "#FFFFFF"
        },{
            data: data_com2, showLabels: true, label: "Old Visitors", labelPlacement: "below", canvasRender: true, cColor: "#FFFFFF"
        }
        ], {
            series: {
                lines: {
                    show: true,
                    lineWidth: 1,
                    fill: false,
                    fillColor: { colors: [{ opacity:1 }, { opacity: 1}] }
                },
                points: {
                    show: false,
                    fill: true
                },
                shadowSize: 0
            },
            legend:{
                show: false
            },
            grid: {
                show:false,
                margin: 0,
                labelMargin: 0,
                axisMargin: 0,
                hoverable: true,
                clickable: true,
                tickColor: "rgba(255,255,255,1)",
                borderWidth: 0
            },
            colors: [Sing.darken(Sing._grayLighter,.05), Sing._brandDanger]
        });
    }

    function pjaxPageLoad(){
        initSimpleChart();
        initChangesChart();
        initChangesYearChart();
        initSalesChart();
    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);

    SingApp.onResize(initSimpleChart);
});