$(function(){

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
                            return '<strong>' + state + '</strong>';
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
        /**
         * Reattach map tooltips to body, as they use position:fixed, which doesn't work properly inside of
         * translated elements (.content-wrap uses transform: translate;).
         * See https://code.google.com/p/chromium/issues/detail?id=20574
         */
        $('body').append($(".mapTooltip").detach());
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
                .showXAxis(false)
                .showYAxis(true)
                .margin({left: 28, bottom: 0, right: 0})
                .color([Sing.colors['brand-danger'], Sing.colors['brand-warning'], Sing.colors['brand-success']]);

            chart.xAxis
                .showMaxMin(false)
                .tickFormat(function(d) { return d3.time.format('%b %d')(new Date(d)) });

            chart.yAxis
                .showMaxMin(false)
                .ticks(0)
                .tickFormat(d3.format(',f'));

            d3.select('#chart svg')
                .datum(testData(['Search', 'Referral', 'Direct'], 150).map(function(el, i){
                    (i == 0) && (el.area = true);
                    return el;
                }))
                .transition().duration(500)
                .call(chart)
            ;


            SingApp.onResize(chart.update);

            return chart;
        });
    }

    function initCalendar(){

        var monthNames = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];

        var dayNames = ["S", "M", "T", "W", "T", "F", "S"];

        var now = new Date(),
            month = now.getMonth() + 1,
            year = now.getFullYear();

        var events = [
            [
                    "2/"+month+"/"+year,
                'The flower bed',
                '#',
                Sing.colors['brand-primary'],
                'Contents here'
            ],
            [
                    "5/"+month+"/"+year,
                'Stop world water pollution',
                '#',
                Sing.colors['brand-warning'],
                'Have a kick off meeting with .inc company'
            ],
            [
                    "18/"+month+"/"+year,
                'Light Blue 2.2 release',
                '#',
                Sing.colors['brand-success'],
                'Some contents here'
            ],
            [
                    "29/"+month+"/"+year,
                'A link',
                'http://www.flatlogic.com',
                Sing.colors['brand-danger']
            ]
        ];
        var $calendar = $('#events-calendar');
        $calendar.calendar({
            months: monthNames,
            days: dayNames,
            events: events,
            popover_options:{
                placement: 'top',
                html: true
            }
        });
        $calendar.find('.icon-arrow-left').addClass('fa fa-arrow-left');
        $calendar.find('.icon-arrow-right').addClass('fa fa-arrow-right');
        function restyleCalendar(){
            $calendar.find('.event').each(function(){
                var $this = $(this),
                    $eventIndicator = $('<span></span>');
                $eventIndicator.css('background-color', $this.css('background-color')).appendTo($this.find('a'));
                $this.css('background-color', '');
            })
        }
        $calendar.find('.icon-arrow-left, .icon-arrow-right').parent().on('click', restyleCalendar);
        restyleCalendar();
    }

    function pjaxPageLoad(){
        initMap();
//        initBigChart();
        initCalendar();
    }

    pjaxPageLoad();
    SingApp.onPageLoad(pjaxPageLoad);

});