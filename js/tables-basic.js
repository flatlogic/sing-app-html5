$(function(){
    function pageLoad(){
        $('.widget').widgster();
        $('.sparkline').each(function(){
            $(this).sparkline('html',$(this).data());
        });
    }
    pageLoad();
    SingApp.onPageLoad(pageLoad);
});