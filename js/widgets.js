$(function(){

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
        initRealTime1();
        initYearsMap();
    }

    pageLoad();
    SingApp.onPageLoad(pageLoad);

});