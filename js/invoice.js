$(function(){

    function pageLoad(){
        $('#print').click(function(){
            window.print();
        })
    }

    pageLoad();
    LetItApp.onPageLoad(pageLoad);

});