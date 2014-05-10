$(function(){

    function initPointSparkline($el, data){
        $el.sparkline(data, {
            type: 'line',
            width: '100%',
            height: '60',
            lineColor: 'transparent',
            fillColor: 'transparent',
            spotRadius: 5,
            spotColor: Sing.colors['gray-light'],
            valueSpots: {'0:':Sing.colors['gray-light']},
            highlightSpotColor: Sing.colors['gray-light'],
            highlightLineColor: 'transparent',
            minSpotColor: Sing.colors['gray-light'],
            maxSpotColor: Sing.colors['gray-light'],
            tooltipFormat: new $.SPFormatClass('<span style="color: white">&#9679;</span> {{prefix}}{{y}}{{suffix}}'),
            chartRangeMin: _(data).min() - 1
        });

        $el.sparkline(data, {
            composite: true,
            type: 'line',
            lineColor: Sing.colors['gray-light'],
            lineWidth: 1,
            fillColor: 'transparent',
            spotRadius: 4.1,
            spotColor: Sing.colors['white'],
            valueSpots: {'0:': Sing.colors['white']},
            highlightSpotColor: Sing.colors['gray-lighter'],
            highlightLineColor: 'transparent',
            minSpotColor: Sing.colors['white'],
            maxSpotColor: Sing.colors['white'],
            tooltipFormat: new $.SPFormatClass(''),
            chartRangeMin: _(data).min() - 1
        });
    }

    function initSimpleChart(){
        initPointSparkline($("#chart-simple"), [4,6,5,7,5]);
        SingApp.onResize(function(){
            initPointSparkline($("#chart-simple"), [4,6,5,7,5]);
        });
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
                color: Sing.lighten(Sing.colors['brand-success'], .09),
                renderer: 'bar'
            }, {
                name: 'humidity',
                data: seriesData.shift().map(function(d) { return { x: d.x, y: d.y * (Math.random()*0.1 + 1.1) } }),
                renderer: 'line',
                color: Sing.colors['white']
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
            barColor: Sing.colors['gray-lighter'],
            barWidth: 7,
            barSpacing: 5,
            chartRangeMin: _(data).min(),
            tooltipFormat: new $.SPFormatClass('')
        });

        $el.sparkline(data,{
            composite: true,
            type: 'bar',
            barColor: Sing.colors['brand-success'],
            barWidth: 7,
            barSpacing: 5
        });
    }

    function initSalesChart(){

        //todo rewrite
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
            data: data_com, showLabels: true, label: "Visitors", labelPlacement: "below", canvasRender: true, cColor: "#FFFFFF"
        },{
            data: data_com2, showLabels: true, label: "Test Visitors", labelPlacement: "below", canvasRender: true, cColor: "#FFFFFF"
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
            colors: [Sing.darken(Sing.colors['gray-lighter'],.05), Sing.colors['brand-danger']]
        });
    }

    function initRealTime1(){
        "use strict";

        var seriesData = [ [], [] ];
        var random = new Rickshaw.Fixtures.RandomData(30);

        for (var i = 0; i < 30; i++) {
            random.addData(seriesData);
        }

        var graph = new Rickshaw.Graph( {
            element: document.getElementById("realtime1"),
            height: 130,
            renderer: 'area',
            series: [
                {
                    color: Sing.colors['gray-dark'],
                    data: seriesData[0],
                    name: 'Uploads'
                }, {
                    color: Sing.colors['gray'],
                    data: seriesData[1],
                    name: 'Downloads'
                }
            ]
        } );

        function onResize(){
            graph.configure({
                width: $('#realtime1').width()
            });
            graph.render();
        }

        SingApp.onResize(onResize);
        onResize();


        var hoverDetail = new Rickshaw.Graph.HoverDetail( {
            graph: graph,
            xFormatter: function(x) {
                return new Date(x * 1000).toString();
            }
        } );

        setInterval( function() {
            random.removeData(seriesData);
            random.addData(seriesData);
            graph.update();

        }, 1000 );
    }

    function initYearsMap(){

        var $map = $('#map-years-mapael');
        $map.css('height', 394).css('margin-bottom', -15)
            .find('.map').css('height', parseInt($map.parents('.widget').css('height')) - 40);
        $map.mapael({
            map:{
                name : "world_countries",
                defaultArea : {
                    attrs : {
                        fill: Sing.colors['gray-lighter']
                        , stroke : Sing.colors['gray']
                    },
                    attrsHover : {
                        fill : Sing.colors['gray-light'],
                        animDuration : 100
                    }
                },
                defaultPlot:{
                    size: 17,
                    attrs : {
                        fill : Sing.colors['brand-warning'],
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
                    step : 1,
                    maxLevel: 10
                }
            }
            ,legend : {
                area : {
                    display : false,
                    slices : [
                        {
                            max :5000000,
                            attrs : {
                                fill : Sing.lighten(Sing.colors['gray-lighter'],.04)
                            },
                            label :"Less than 5M"
                        },
                        {
                            min :5000000,
                            max :10000000,
                            attrs : {
                                fill : Sing.colors['gray-lighter']
                            },
                            label :"Between 5M and 10M"
                        },
                        {
                            min :10000000,
                            max :50000000,
                            attrs : {
                                fill : Sing.colors['gray-lighter']
                            },
                            label :"Between 10M and 50M"
                        },
                        {
                            min :50000000,
                            attrs : {
                                fill : Sing.darken(Sing.colors['gray-lighter'],.1)
                            },
                            label :"More than 50M"
                        }
                    ]
                }
            },
            areas: fakeWorldData[2009]['areas']
        });
        var coords = $.fn.mapael.maps["world_countries"].getCoords(59.599254, 8.863224);
        $map.trigger('zoom', [6, coords.x, coords.y]);

        $map.find('.map-controls > li > a').on('click', function(){
            $('.map-controls > li').removeClass('active');
            $(this).parents('li').addClass('active');
            $map.trigger('update', [fakeWorldData[$(this).data('years-map-year')], {}, {}, {animDuration : 300}]);
            return false;
        });
        /**
         * Reattach map tooltips to body, as they use position:fixed, which doesn't work properly inside of
         * translated elements (.content-wrap uses transform: translate;).
         * See https://code.google.com/p/chromium/issues/detail?id=20574
         */
        $('body').append($(".mapTooltip").detach());
    }

    function pageLoad(){
        initSimpleChart();
        initChangesChart();
        initChangesYearChart();
        initSalesChart();
        initRealTime1();
        initYearsMap();
    }

    pageLoad();
    SingApp.onPageLoad(pageLoad);

});