$(function(){
    function pageLoad(){
        $('#tooltip-enabled, #max-length').tooltip();
        $('.selectpicker').selectpicker();
    }
    pageLoad();
    SingApp.onPageLoad(pageLoad);
});