$(function () {
    function pageLoad() {
        removeActiveClass();
        setActiveClass();
    }

    function removeActiveClass() {
        var li = $('.dropdown').parent('.nav-tabs').find('.nav-item');
        li.on('click', function () {
            var a = $('.nav-tabs').find('.dropdown-menu').find('a.active');
            if(a.length) {
                a.removeClass('active');
            }
        });
    }

    function setActiveClass() {
        var li = $('.nav-tabs').find('.dropdown-menu').find('li');
        li.on('click', function(event) {
            var a = $(event.currentTarget).parent('.dropdown-menu').parent().children('a');
            a.addClass('active');
        });
    }

    pageLoad();
    SingApp.onPageLoad(pageLoad);
});