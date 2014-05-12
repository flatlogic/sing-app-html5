$(function(){
    function pageLoad(){
        $('.widget').widgster();
        $('.chzn-select').select2();
        $("#destination").inputmask({mask: "99999"});
        $("#credit").inputmask({mask: "9999-9999-9999-9999"});
        $("#expiration-date").datetimepicker({
            pickTime: false
        });
        $('#wizard').bootstrapWizard({
            onTabShow: function($activeTab, $navigation, index) {
                var $total = $navigation.find('li').length;
                var $current = index + 1;
                var $percent = ($current/$total) * 100;
                var $wizard = $("#wizard");
                $wizard.find('.progress-bar').css({width: $percent + '%'});

                if($current >= $total) {
                    $wizard.find('.pager .next').hide();
                    $wizard.find('.pager .finish').show();
                    $wizard.find('.pager .finish').removeClass('disabled');
                } else {
                    $wizard.find('.pager .next').show();
                    $wizard.find('.pager .finish').hide();
                }

                //setting done class
                $navigation.find('li').removeClass('done');
                $activeTab.prevAll().addClass('done');
            }
        })
            //setting fixed height so wizard won't jump
            .find('.tab-pane').css({height: 444});
    }
    pageLoad();
    SingApp.onPageLoad(pageLoad);
});