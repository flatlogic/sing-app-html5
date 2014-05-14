$(function(){
    function pageLoad(){
        $('.sparkline').each(function(){
            $(this).sparkline('html',$(this).data());
        });
    }
    pageLoad();
    SingApp.onPageLoad(pageLoad);
});