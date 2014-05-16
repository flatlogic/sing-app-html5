$(function(){

    function initFlot(){
        var data1 = [
            [1, 20],
            [2, 20],
            [3, 40],
            [4, 30],
            [5, 40],
            [6, 35],
            [7, 47]
        ],
            data2 = [
            [1, 20],
            [2, 10],
            [3, 30],
            [4, 15],
            [5, 30],
            [6, 25],
            [7, 27]
            ],
            $chart = $("#flot-main"),
            $tooltip = $('#flot-main-tooltip');

        $('body').append($tooltip.detach());

        var plot = $.plotAnimator($chart, [{
            label: "Traffic",
            data: data2,
            lines: {
                fill: 0.6,
                lineWidth: 0
            },
            color:['#F7653F']
        },{
            label: "Traffic",
            data: data1,
            animator: {steps: 60, duration: 1000, start:0},
            lines: {lineWidth:2},
            shadowSize:0,
            color: '#F7553F'
        },{
            label: "Traffic",
            data: data1,
            points: { show: true, fill: true, radius:6,fillColor:"#F7553F",lineWidth:3 },
            color: '#fff',
            shadowSize:0
        },{
            label: "Daylight",
            data: data2,
            points: { show: true, fill: true, radius:6,fillColor:"#FFA587",lineWidth:3 },
            color: '#fff',
            shadowSize:0
        }],{
            xaxis: {
                tickLength: 0,
                tickDecimals: 0,
                min:2,
                font :{
                    lineHeight: 13,
                    weight: "bold",
                    color: Sing.colors['gray-semi-light']
                }
            },
            yaxis: {
                tickDecimals: 0,
                tickColor: "#f3f3f3",
                font :{
                    lineHeight: 13,
                    weight: "bold",
                    color: Sing.colors['gray-semi-light']
                }
            },
            grid: {
                backgroundColor: { colors: [ "#fff", "#fff" ] },
                borderWidth:1,
                borderColor:"#f0f0f0",
                margin:0,
                minBorderMargin:0,
                labelMargin:20,
                hoverable: true,
                clickable: true,
                mouseActiveRadius:6
            },
            legend: false
        });

        $chart.on("plothover", function (event, pos, item) {
            if (item) {
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);

                $tooltip.html(item.series.label + " at " + x + ": " + y)
                    .css({
                        top: item.pageY + 5 - window.scrollY,
                        left: item.pageX + 5 - window.scrollX
                    })
                    .fadeIn(200);
            } else {
                $tooltip.hide();
            }
        });
    }

    function pageLoad(){
        $('.widget').widgster();
        $('.sparkline').each(function(){
            $(this).sparkline('html', $(this).data());
        });

        initFlot();
    }
    pageLoad();
    SingApp.onPageLoad(pageLoad);
});