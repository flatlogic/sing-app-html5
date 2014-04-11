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

    function initMap(){
        var $map = $('#map'),
            state;
        $map.mapael({
            map:{
                name : "usa_states",
                defaultArea : {
                    attrsHover : {
                        fill : '#242424',
                        animDuration : 100
                    },
                    tooltip: {
                        content: function(){
                            return state;
                        }
                    },
                    eventHandlers: {
                        mouseover: function(e, id){
                            state = id;
                        }
                    }
                },
                defaultPlot:{
                    size: 17,
                    attrs : {
                        fill : Sing._brandWarning,
                        stroke : "#fff",
                        "stroke-width" : 0,
                        "stroke-linejoin" : "round"
                    },
                    attrsHover : {
                        "stroke-width" : 1,
                        animDuration : 100
                    }
                },
                zoom : {
                    enabled : true,
                    step : 0.75
                }
            },
            plots:{
                'ny' : {
                    latitude: 40.717079,
                    longitude: -74.00116,
                    tooltip: {content : "New York"}
                },
                'on' : {
                    latitude: 33.145235,
                    longitude: -83.811834,
                    size: 18,
                    tooltip: {content : "Oconee National Forest"}
                },
                'sf' : {
                    latitude: 37.792032,
                    longitude: -122.394613,
                    size: 12,
                    tooltip: {content : "San Francisco"}
                },
                'la' : {
                    latitude: 26.935080,
                    longitude: -80.851766,
                    size: 26,
                    tooltip: {content : "Lake Okeechobee"}
                },
                'gc' : {
                    latitude: 36.331308,
                    longitude: -83.336050,
                    size: 10,
                    tooltip: {content : "Grainger County"}
                },
                'cc' : {
                    latitude: 36.269356,
                    longitude: -76.587477,
                    size: 22,
                    tooltip: {content : "Chowan County"}
                },
                'll' : {
                    latitude: 30.700644,
                    longitude: -95.145249,
                    tooltip: {content : "Lake Livingston"}
                },
                'tc' : {
                    latitude: 34.546708,
                    longitude: -90.211471,
                    size: 14,
                    tooltip: {content : "Tunica County"}
                },
                'lc' : {
                    latitude: 32.628599,
                    longitude: -103.675115,
                    tooltip: {content : "Lea County"}
                },
                'uc' : {
                    latitude: 40.456692,
                    longitude: -83.522688,
                    size: 11,
                    tooltip: {content : "Union County"}
                },
                'lm' : {
                    latitude: 33.844630,
                    longitude: -118.157483,
                    tooltip: {content : "Lakewood Mutual"}
                }
            }
        });
    }

    /* Inspired by Lee Byron's test data generator. */
    function _stream_layers(n, m, o) {
        if (arguments.length < 3) o = 0;
        function bump(a) {
            var x = 1 / (.1 + Math.random()),
                y = 2 * Math.random() - .5,
                z = 10 / (.1 + Math.random());
            for (var i = 0; i < m; i++) {
                var w = (i / m - y) * z;
                a[i] += x * Math.exp(-w * w);
            }
        }
        return d3.range(n).map(function() {
            var a = [], i;
            for (i = 0; i < m; i++) a[i] = o + o * Math.random();
            for (i = 0; i < 5; i++) bump(a);
            return a.map(function(d, i) {
                return {x: i, y: Math.max(0, d)};
            });
        });
    }

    function testData(stream_names, pointsCount) {
        var now = new Date().getTime(),
            day = 1000 * 60 * 60 * 24, //milliseconds
            daysAgoCount = 60,
            daysAgo = daysAgoCount * day,
            daysAgoDate = now - daysAgo,
            pointsCount = pointsCount || 45, //less for better performance
            daysPerPoint = daysAgoCount / pointsCount;
        return _stream_layers(stream_names.length, pointsCount, .1).map(function(data, i) {
            return {
                key: stream_names[i],
                values: data.map(function(d,j){
                    return {
                        x: daysAgoDate + d.x * day * daysPerPoint,
                        y: Math.floor(d.y * 100) //just a coefficient,
                    }
                })
            };
        });
    }

    function initBigChart(){

        nv.addGraph(function() {
            var chart = nv.models.lineChart()
                .useInteractiveGuideline(true)
                .showXAxis(true)
                .showYAxis(true)
                .margin({left: 28})
                .color([Sing._brandDanger, Sing._brandWarning, Sing._brandSuccess]);

            chart.xAxis
                .showMaxMin(false)
                .tickFormat(function(d) { return d3.time.format('%b %d')(new Date(d)) });

            chart.yAxis
                .showMaxMin(false)
                .ticks(0)
                .tickFormat(d3.format(',f'));

            d3.select('#chart svg')
                .datum(testData(['Search', 'Referral', 'Direct'], 150).map(function(el, i){
//                    el.area = true;
                    return el;
                }))
                .transition().duration(500)
                .call(chart)
            ;


            SingApp.onResize(chart.update);

            return chart;
        });
    }

    function pjaxPageLoad(){
        initSimpleChart();
        initChangesChart();
        initChangesYearChart();
        initSalesChart();
        initMap();
//        initBigChart();
    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);

    SingApp.onResize(initSimpleChart);
});