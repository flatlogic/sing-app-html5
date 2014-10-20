$(function(){
    function pageLoad(){
        $('.widget').widgster();
    }
    pageLoad();
    LetItApp.onPageLoad(pageLoad);
});