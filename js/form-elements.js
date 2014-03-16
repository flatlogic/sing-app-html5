$(function(){
    function pageLoad(){
        $('#tooltip-enabled, #max-length').tooltip()
    }
    pageLoad();
    SingApp.onPageLoad(pageLoad);
});