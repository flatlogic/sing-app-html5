$(function(){
    function pageLoad(){
        $('.widget').widgster();
        //init parsley for pjax requests
        $( '#validation-form' ).parsley();
    }
    pageLoad();
    LetItApp.onPageLoad(pageLoad);
});